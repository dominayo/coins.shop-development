import io from 'socket.io-client';
import config from '../config';

const models = {
  Ads: 'updateAds',
  Tickers: 'updateTickers',
  token: 'updateToken',
  Contacts: 'updateContacts',
};

const socket = io(config.socketLink);

export const SocketPlugin = () => {
  return (store) => {
    socket.on('connect', () => {
      store.dispatch('onSocketConnect', socket);
    });
    socket.on('error', (e) => {
      console.log(e);
    });
    for (let [name, method] of Object.entries(models)) {
      socket.on(name, (data) => {
        store.commit(method, data);
      });
    }
    socket.on('favoriteUsers', (data) => {
      store.commit('setFavorites', data);
    });
    socket.on('blockedUsers', (data) => {
      store.commit('setBlockedUsers', data);
    });
    // store.subscribe(mutation => {
    //   if (mutation.type === 'UPDATE_DATA') {
    //     socket.emit('update', mutation.payload)
    //   }
    // })
  }
}
