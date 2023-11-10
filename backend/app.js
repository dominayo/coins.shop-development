const express = require('express');
const app = new express();
const cors = require('cors');

const config = require('./config');
const mongoose = require('mongoose');

const server = require('http').Server(app);
const io = require('socket.io')(server);
const _ = require('lodash');
const { getSigner } = require('./utils');

const models = {};

const Ads = require('./ads');
const Tickers = require('./tickers');
const Users = require('./users');
const Contacts = require('./contacts');

mongoose.connect(config.mongo, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', (e) => {
  console.error(`DB connection error: ${e}`);
});
db.once('open', () => {
  console.log('Connected to DB');
});

const publicModels = {
  users: new Users({ models }),
  ad: new Ads({ models }),
  tickers: new Tickers({ models }),
};

const privateModels = {
  contact: new Contacts({ models }),
};

server.listen(8090);

const identified = ({ account, socket }) => {
  _.forEach(privateModels, cl => cl.addInstance({ account, socket }));
};

const logout = (account) => {
  if (account) {
    _.forEach(privateModels, cl => cl.removeInstance(account));
    publicModels.users.disconnect(account);
  }
};

const processMessage = async(message) => {
  const decoded = JSON.parse(message.request);
  const model = publicModels[decoded.model] || privateModels[decoded.model];
  if (model) {
    await model.parseSignedMessage(message);
  }
};

const saveMessage = (message) => {
};

app.use(cors());

io.use((socket, next) => {
  // if (isValid(socket.request)) {
  //   next();
  // } else {
  //   next(new Error('invalid'));
  // }
  next();
});

io.on('connection', async(socket) => {
  let account;

  const onSignedMessage = (message, byDelegate) => {
    try {
      const signer = getSigner(message);
      if ((account !== signer) && !byDelegate) {
        account = signer;
        const token = publicModels.users.getToken(signer);
        publicModels.users.logged(signer, token);
        socket.emit('token', { account, token });
        identified({ account, socket });
      }

      processMessage(message)
        .catch(e => socket.emit('Error', e.toJSON ? e.toJSON() : e.message));

      saveMessage(message);
    }
    catch (e) {
      socket.emit('Error', e.toJSON ? e.toJSON() : e.message);
    }
  };

  socket.on('signed', (message) => onSignedMessage(message, false));
  socket.on('signedByDelegate', (message) => onSignedMessage(message, true));

  socket.on('logged', (message, ack) => {
    const token = publicModels.users.getToken(message.account);
    let account = message.account
    socket.emit('token', { account, token });
    publicModels.users.logged(account, token)
      .then(res => {
        if (res) {
          identified({ account, socket });
        }
      });
    publicModels.users.checkProUser(account, token)
      .then(isPro => {
        ack(isPro)
      });
  });

  socket.on('disconnect', () => logout(account));
  socket.on('logout', () => logout(account));

  for (let m of Object.values(publicModels)) {
    m.onConnect && (m.onConnect(socket));
  }
});
