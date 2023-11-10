const mongoose = require('mongoose');
const {getSigner} = require('./utils');
const config = require('./config');
const _ = require('lodash');
const {ValidationError} = require('./error');
const UserModel = require('./usersModel')

const AdSchema = new mongoose.Schema({
  data: String,
  signature: String,
  isOpen: {
    type: Boolean,
    default: true,
    index: true,
  },
  notDeleted: {
    type: Boolean,
    default: true,
    index: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel
  },
});

const AdsModel = mongoose.model('Ad', AdSchema);

const isValidNumber = (x) => {
  return parseFloat(x)
    .toString() === x.toString();
};

module.exports = class Ads {
  constructor({models}) {
    this._data = null;
    this._anySocket = null;
    this._models = models;
    models.Ads = this;
    models.Users.registerDependency(() => {
      this.updated();
    });
  }

  invalidate() {
    this._data = null;
  }

  async findById(id) {
    const rawData = await AdsModel
      .findOne({_id: id})
      .populate('user');
    return {
      ...rawData.toObject(),
      ...JSON.parse(rawData.data),
    };
  }

  validate(data) {
    if (['buy', 'sell'].indexOf(data.type) < 0) {
      throw new ValidationError('type: validation error');
    }
    if (['btc', 'eth', 'usdt'].indexOf(data.currency) < 0) {
      throw new ValidationError('currency: validation error');
    }
    if (_.find(config.directions, i => i.value === data.currency)) {
      throw new ValidationError('currency direction: validation error');
    }
    if (['fixed', 'dynamic'].indexOf(data.rateType) < 0) {
      throw new ValidationError('rateType: validation error');
    }
    if (data.rateType === 'fixed') {
      const rate = parseFloat(data.rate);
      if (isNaN(rate)) {
        throw new ValidationError('rate: validation error');
      }
      if (rate <= 0) {
        throw new ValidationError('rate: validation error');
      }
    } else {
      const rateSpread = parseFloat(data.rateSpread);
      if (!isValidNumber(data.rateSpread)) {
        throw new ValidationError('rateSpread validation error');
      }
      if ((rateSpread < -50) || (rateSpread > 100)) {
        throw new ValidationError('rateSpread: validation error');
      }
    }

    if (!isValidNumber(data.limits.min) || !isValidNumber(data.limits.max)) {
      throw new ValidationError('limits: validation error');
    }
    if (parseFloat(data.limits.min) < 0) {
      throw new ValidationError('limits: validation error');
    }
    if (parseFloat(data.limits.max) < 0) {
      throw new ValidationError('limits: validation error');
    }
    if (parseFloat(data.limits.min) > parseFloat(data.limits.max)) {
      throw new ValidationError('limits: validation error');
    }
  }

  async updated() {
    this.invalidate();
    const data = await this.getData();
    this._anySocket.emit(this.constructor.name, data);
    this._anySocket.broadcast.emit(this.constructor.name, data);
  }

  async parseSignedMessage({request, signature}) {
    const decoded = JSON.parse(request);
    const account = getSigner({request, signature});
    const user = await UserModel.findOne({ account });
    switch (decoded.action) {
      case 'create': {
        this.validate(decoded);
        await AdsModel.create({data: request, signature, user: user._id});
        await this.updated();
        break;
      }
      case 'update': {
        this.validate(decoded);
        const record = await AdsModel.findOne({_id: decoded.id});
        if (!record) {
          throw new ValidationError('record not found');
        }
        if (record.account !== user.account) {
          throw new ValidationError('not your ad');
        }
        record.set({data: request, signature, account});
        await record.save();
        await this.updated();
        break;
      }
      case 'archive': {
        const record = await AdsModel.findOne({_id: decoded.id});
        if (!record) {
          throw new ValidationError('record not found');
        }
        if (record.account !== user.account) {
          throw new ValidationError('not your ad');
        }
        record.notDeleted = false;
        await record.save();
        await this.updated();
        break;
      }
      case 'setIsOpen': {
        const record = await AdsModel.findOne({_id: decoded.id});
        if (!record) {
          throw new ValidationError('record not found');
        }
        if (record.account !== user.account) {
          throw new ValidationError('not your ad');
        }
        record.isOpen = decoded.value;
        await record.save();
        await this.updated();
        break;
      }
    }
  }

  async getData() {
    if (!this._data) {
      const ads = await AdsModel
        .find({notDeleted: {$ne: false}}, {}, {_id: 1})
        .populate('user');
      this._data = [...ads];
    }
    return this._data;
  }

  async onConnect(socket) {
    this._anySocket = socket;
    socket.emit(this.constructor.name, await this.getData());
  }

};
