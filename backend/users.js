//const mongoose = require('mongoose');
const config = require('./config');
const util = require('ethereumjs-util');
const _ = require('lodash');
const UserModel = require('./usersModel')

const startTime = Date.now();

module.exports = class Users {
  constructor({models}) {
    this._anySocket = null;
    this._models = models;
    models.Users = this;
    this.dependencies = [];
  }

  find(...params) {
    return UserModel.find(...params);
  }

  registerDependency(cb) {
    this.dependencies.push(cb);
  }

  async updated(params) {
    for (let i = 0; i < this.dependencies.length; i++) {
      await this.dependencies[i](params);
    }
  }

  // это от предыдущих программистов, пока не используется
  validateUserStats(userStats) {
    let validatedUserStats = {
      transactions: Math.round(userStats.transactions),
      transactionSums: {
        eth: parseFloat(userStats.transactionSums.eth.toFixed(8)),
        usdt: parseFloat(userStats.transactionSums.usdt.toFixed(2)),
        btc: parseFloat(userStats.transactionSums.btc.toFixed(8))
      },
      disputes: Math.round(userStats.disputes),
      disputeDefeats: Math.round(userStats.disputeDefeats),
      dealsCancelled: Math.round(userStats.dealsCancelled),
      reactionSpeed: Math.round(userStats.reactionSpeed),
      userRating: (() => {
        if(userStats.userRating < -100) return -100
        else if(userStats.userRating > 100) return 100
        else return userStats.userRating
      })()
    }
    console.log(validatedUserStats)
  }

  async findByIds(accounts) {
    const users = {};
    _.forEach(await this._models.Users.find({account: {$in: accounts}}),
      user => {
        if ((user.online !== null) && (user.online < startTime)) {
          user.online = null;
        }
        users[user.account] = user;
      });

    _.forEach(accounts, account => {
      if (!users[account]) {
        users[account] = this.defaultValue(account);
      }
    });

    return users;
  }

  getToken(signer) {
    return util.keccak256(`${signer}${config.salt}`).toString('hex');
  }

  async logged(account, token) {
    if (token === this.getToken(account)) {
      const record = (await UserModel.findOne({account}) || (await UserModel.create(this.defaultValue(account))));
      record.online = Date.now();
      await record.save();
      await this.updated(account);

      this.emitFavoriteUsers(account);
      this.emitBlockedUsers(account);

      return true;
    }
    return false;
  }

  async checkProUser(account, token) {
    if (account && token === this.getToken(account)) {
      if (config.proUsers.includes(account)) return true
    }
    return false;
  }

  async disconnect(account) {
    const record = (await UserModel.findOne({account}) || (await UserModel.create(this.defaultValue(account))));
    record.online = null;
    await record.save();
    await this.updated(account);
  }

  defaultValue(account) {
    return {
      account,
      rating: 0,
      name: `${account.substr(0, 6)}...${account.substr(38)}`,
      verified: false,
    };
  }

  async emitFavoriteUsers(account) {
    this._anySocket.emit('favoriteUsers', await this.getFavorites(account));
  }

  async emitBlockedUsers(account) {
    const blockedUsers = await this.getBlockedUsers(account);
    this._anySocket.emit('blockedUsers', blockedUsers);
  }

  async getFavorites(account) {
    const { favorites } = await UserModel.findOne({ account }, { favorites: 1 });
    return favorites;
  }

  async getBlockedUsers(account) {
    const { blockedUsers } = await UserModel.findOne({ account }, { blockedUsers: 1 });
    return blockedUsers;
  }

  async changeFavorite({ account, favoriteId, action }) {
    try {
      let record = await UserModel.findOne({ account }, { favorites: 1 });
      const { _id: userId } = await UserModel.findOne({ _id: favoriteId }, { _id: 1 });
      action === 'remove' ? record.favorites.pull(userId) : record.favorites.addToSet(userId);
      await record.save();
      this.emitFavoriteUsers(account);
    } catch (e) {
      console.log(e);
    }
  }

  async changeBlocked({ account, blockedId, action }) {
    try {
      let record = await UserModel.findOne({ account }, { blockedUsers: 1 });
      const { _id: userId } = await UserModel.findOne({ _id: blockedId }, { _id: 1 });
      action === 'remove' ? record.blockedUsers.pull(userId) : record.blockedUsers.addToSet(userId);
      await record.save();
      this.emitBlockedUsers(account);
    } catch (e) {
      console.log(e);
    }
  }

  async onConnect(socket) {
    this._anySocket = socket;
    this._anySocket.on('changeFavorite', async ({ account, favoriteId, action }, ack) => {
      await this.changeFavorite({ account, favoriteId, action });
      ack(true);
    });
    this._anySocket.on('changeBlocked', async ({ account, blockedId, action }, ack) => {
      // await new Promise(r => setTimeout(r, 1000));
      await this.changeBlocked({ account, blockedId, action });
      ack(true);
    });
  }
};
