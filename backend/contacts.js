const mongoose = require('mongoose');
const config = require('./config');
const { getSigner } = require('./utils');
const _ = require('lodash');
const { NotFoundError, PermissionError } = require('./error');
const UserModel = require('./usersModel')

const ContactSchema = new mongoose.Schema({
  accountFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel
  },
  accountTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel
  },
  type: {
    type: String,
  },
  chat: String,
  actions: String,
  adDelegate: String,
});

const ContactsModel = mongoose.model('Contact', ContactSchema);

const mergeAction = (actions, message) => {
  const actionsDecoded = actions ? JSON.parse(actions) : [];
  actionsDecoded.push({
    message,
    time: Date.now(),
  });
  return JSON.stringify(actionsDecoded);
};

module.exports = class Contacts {
  constructor({ models }) {
    this.instanceByAccount = {};
    this._models = models;
    models.Users.registerDependency(account => this.updated(account));
  }

  async parseSignedMessage(message) {
    const { Ads } = this._models;
    const account = getSigner(message);
    const user = await UserModel.findOne({ account });
    const decoded = JSON.parse(message.request);

    if (decoded.action === 'start') {
      const ad = await Ads.findById(decoded.ad);
      if (ad) {
        // todo validate
        await ContactsModel.create({
          accountFrom: ad.user._id,
          accountTo: user._id,
          actions: mergeAction(null, message),
          type: ad.type,
          adDelegate: ad.delegate,
        });
        await this.updated(account);
      }
    }
    if (['mePaid', 'meDenied', 'arbitrage', 'peerPaid', 'setDetails'].indexOf(decoded.action) >= 0) {
      // todo validate
      const contact = await ContactsModel.findOne({ _id: decoded.contactId });
      if ( !contact) {
        throw new NotFoundError();
      }
      contact.actions = mergeAction(contact.actions, message);
      await contact.save();
      await this.updated(contact.accountFrom);
      await this.updated(contact.accountTo);
    }
    if (decoded.action === 'addChatMessage') {
      const contact = await ContactsModel
        .findOne({ _id: decoded.contactId })
        .populate('accountFrom')
        .populate('accountTo');
      if (!contact) {
        throw new NotFoundError();
      }
      const contactExtended = (this.calculateStates(account, [contact]))[0];
      // todo validate
      console.log('account is', account);
      console.log('adDelegate is', contact.adDelegate);
      if ((account !== contact.accountFrom.account)
          && (account !== contact.accountTo.account)
          && (account !== contact.adDelegate)
          && (account !== contactExtended.delegate)
          && (account !== config.accountArbitrage)) {
        throw new PermissionError('unknown account');
      }
      const chatArray = contact.chat ? JSON.parse(contact.chat) : [];
      chatArray.push({ ...message, time: Date.now() });
      contact.chat = JSON.stringify(chatArray);
      await contact.save();
      await this.updated(contact.accountFrom.account);
      await this.updated(contact.accountTo.account);
    }
  }

  addInstance({ socket, account }) {
    this.instanceByAccount[account] = this.instanceByAccount[account] || {
      socket,
    };
    console.log('attached contacts for', account);
    this.updated(account);
  }

  removeInstance(account) {
    this.instanceByAccount[account] = null;
    console.log('detached contacts for', account);
  }

  async getData(account) {
    const user = await UserModel.findOne({ account });
    const contacts = await ContactsModel.find({
      $or: [
        { accountFrom: user._id },
        { accountTo: user._id },
      ],
    });
    return await this.expandUsers(this.calculateStates(account, contacts));
  }

  async expandUsers(contacts) {
    const accounts = {};
    _.forEach(contacts, contact => {
      accounts[contact.accountFrom] = true;
      accounts[contact.accountTo] = true;
    });

    const users = await this._models.Users.findByIds(_.keys(accounts));
    return _.map(contacts, contact => ({
      ...contact,
      accountFrom: users[contact.accountFrom],
      accountTo: users[contact.accountTo],
    }));
  }

  calculateStates(account, contacts) {
    return _.map(contacts, contact => {
      const actions = JSON.parse(contact.actions);
      const takerPaymentDetails = _.find(actions, action => {
        const decoded = JSON.parse(action.message.request);
        if (decoded.action === 'setDetails') {
          return true;
        }
      });
      const lastAction = actions[actions.length - 1];
      const lastActionDecoded = JSON.parse(lastAction.message.request);
      const period = config.actionDeadlines[lastActionDecoded.action];
      const isFiatPayer = (account === contact.accountTo) === (contact.type === 'buy');
      return {
        ...contact.toObject(),
        chat: contact.chat ? JSON.parse(contact.chat) : contact.chat,
        canStartArbitrage: (lastActionDecoded.action !== 'arbitrage') && (lastActionDecoded.action !== 'peerPaid'),
        canCancelContact: (lastActionDecoded.action === 'start') && isFiatPayer,
        canFinalizeContact: !isFiatPayer && (['start', 'setDetails', 'mePaid'].indexOf(lastActionDecoded.action) >= 0),
        canMarkAsPaid: isFiatPayer && (['start', 'setDetails', 'mePaid'].indexOf(lastActionDecoded.action) >= 0),
        isFiatPayer,
        paymentChangeable: !isFiatPayer && !takerPaymentDetails,
        takerPaymentDetails,
        status: {
          value: lastActionDecoded.action,
          deadline: lastAction.time + period,
          period,
        },
      };
    });
  }

  async updated(account) {
    if (this.instanceByAccount[account]) {
      const socket = this.instanceByAccount[account].socket;
      socket.emit(this.constructor.name, await this.getData(account));
    }
  }
};
