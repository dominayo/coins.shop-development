const mongoose = require('mongoose');
const config = require('./config');
const Tickers = require('./tickers');

const userModelName = 'User';

const UserSchema = new mongoose.Schema({
  account: {
    type: String,
    unique: true,
    required: [true, 'Where is an account?'],
  },
  name: String,
  verified: {
    type: Boolean,
    default: false,
  },
  online: Date,
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: userModelName
  }],
  blockedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: userModelName
  }],
  deals: {
    type: Number,
    default: 0,
  },
  dealsVolumes: {
    eth: {
      type: Number,
      default: 0,
    },
    usdt: {
      type: Number,
      default: 0,
    },
    btc: {
      type: Number,
      default: 0,
    }
  },
  disputes: {
    type: Number,
    default: 0,
  },
  disputeDefeats: {
    type: Number,
    default: 0,
  },
  dealsCancelled: {
    type: Number,
    default: 0,
  },
  reactionTime: {
    type: Number,
    default: 5,
  },
}, { toJSON: { virtuals: true } });

UserSchema.virtual('reactionSpeed').get(function () {
  const speed = this.reactionTime;
  for (let [key, { lowLimit }] of Object.entries(config.reactionSpeedRanges)) {
    if (speed > lowLimit) {
      return key;
    }
  }
  return null;
});

module.exports = mongoose.model(userModelName, UserSchema);