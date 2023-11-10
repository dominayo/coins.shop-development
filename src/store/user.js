import jsonBeautify from 'json-beautify';
import MetamaskAuth from './metamask';
import LSAuth from './ls';
import { InvalidNetworkError, ConnectionTimedOutError } from './errors';
import { defineBrowser } from './utils';
import config from '../config';

let modalPopupAccept = null;
let modalPopupReject = null;

export default {
  state: {
    auth: null,
    isProUser: false,
    night: false,
    showModalPopup: false,
    invalidNetworkPopup: false,
    socket: null,
    favouriteUsers: null,
    blockedUsers: null,
    balances: {
      total: 40,
      btc: {
        currency: 'btc',
        balance: {
          all: 0.0001234,
          available: 0.0000541,
          deals: 0.0000541,
        },
        depositAddress: '4562531LqD8L79intRNXUgjRo',
      },
      eth: {
        currency: 'eth',
        balance: {
          all: 0.0001234,
          available: 0.0001234,
          deals: 0.0000541,
        },
        depositAddress: '0x4562531LqD8L79intRNXUgjRo',
      },
      usdt: {
        currency: 'usdt',
        balance: {
          all: 100.23,
          available: 50,
          deals: 15,
        },
        depositAddress: "0x4562531LqD8L79intRNXUgjRo"
      }
    },
  },
  getters: {
    getLoggedIn: state => !!state.auth,
    getNight: state => state.night,
    getShowModalPopup: state => state.showModalPopup,
    getInvalidNetworkPopup: state => state.invalidNetworkPopup,
    getSocket: state => state.socket,
    getAuth: state => state.auth,
    getMyAddress: state => state.auth ? state.auth.account : null,
    getUsername: state => state.auth ? `${state.auth.account.substr(0, 6)}...${state.auth.account.substr(38)}` : null,
    getBalances: state => state.balances,
    isProUser: state => state.isProUser,
    favouriteUsers: state => Array.isArray(state.favouriteUsers) ? state.favouriteUsers : [],
    blockedUsers: state => Array.isArray(state.blockedUsers) ? state.blockedUsers : [],
    isFavorite: (state, getters) => id => getters.favouriteUsers.includes(id),
  },
  mutations: {
    toggleNight: state => state.night = !state.night,
    setAuth: (state, val) => state.auth = val,
    setProUser: (state, val) => state.isProUser = val,
    showModalPopup: (state, val) => state.showModalPopup = val,
    setInvalidNetworkPopup: (state, val) => state.invalidNetworkPopup = val,
    setSocket: (state, val) => state.socket = val,
    setFavorites: (state, val) => state.favouriteUsers = val,
    setBlockedUsers: (state, val) => state.blockedUsers = val,
    updateToken: (state, val) => localStorage.setItem(`onlineToken_${val.account}`, val.token),
  },
  actions: {
    onLogin({ getters, commit }) {
      const userAddress = getters.getMyAddress;
      if (userAddress) {
        getters.getSocket.emit('logged', {account: userAddress}, (isPro) => {
          commit('setProUser', isPro);
        });
      }
    },
    onSocketConnect({commit, dispatch}, socket) {
      commit('setSocket', socket);
      dispatch('onLogin');
    },
    acceptModalPopup({commit}) {
      commit('showModalPopup', false);
      return modalPopupAccept && modalPopupAccept();
    },
    rejectModalPopup({commit}) {
      commit('showModalPopup', false);
      return modalPopupReject && modalPopupReject(new Error('user declined'));
    },
    modalDialog({commit}, {title, text, hasReject, buttonAcceptText}) {
      commit('showModalPopup', {title, text, hasReject, buttonAcceptText});
      return new Promise((res, rej) => {
        modalPopupAccept = res;
        modalPopupReject = hasReject ? rej : res;
      });
    },
    authLS({dispatch, commit}) {
      dispatch('modalDialog', {
        title: 'Быстрый вход',
        text: 'При использовании опции "быстрый вход" Ваш секретный ключ будет храниться в локальном хранилище браузера.' +
          'Утеря ключа (например в случае очистки кеша) приведет к безвозвратной потере всех Ваших средств. Используйте эту опцию только если Вы не можете воспользоваться плагином Metamask.',
        hasReject: true,
      })
        .then(LSAuth.auth())
        .then(() => {
          commit('setAuth', LSAuth);
          dispatch('onLogin');
        })
        .catch(() => {
        });
    },
    forceAuth({ dispatch }, text) {
      dispatch('modalDialog', {
        title: 'Требуется авторизация',
        text,
        hasReject: false,
        buttonAcceptText: 'Понятно'
      })
    },
    authMetamask({commit, dispatch}) {
      if (window.ethereum && window.ethereum.isMetaMask) {
        MetamaskAuth.auth()
          .then(() => {
            commit('setAuth', MetamaskAuth);
            dispatch('onLogin');
            MetamaskAuth.onLogout(() => dispatch('logout'));
          })
          .catch(e => {
            if (e instanceof InvalidNetworkError) {
              commit('setInvalidNetworkPopup', true);
            }
          });
      } else {
        let browser = defineBrowser()
        let link;
        switch (browser) {
          case 'Chrome' :
            link = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
            break;
          case 'Firefox':
            link = 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/?src=search'
            break;
          case 'Opera':
            link = 'https://addons.opera.com/sr-me/extensions/details/metamask/'
            break;
          default :
            link = 'https://metamask.io/'
        }
        dispatch('modalDialog', {
          title: 'Metamask не установлен',
          text: 'Чтобы использовать этот метод авторизации, установите расширение Metamask для вашего браузера, можете перейти к дополнениям вашего браузера по ссылке снизу',
          hasReject: true,
          buttonAcceptText: 'Перейти',
          parameter: link
        }).then(() => {
          window.open(link, '_blank');
        }).catch(() => {
        });
      }
    },
    logout({commit, getters}) {
      commit("setAuth", null);
      const socket = getters.getSocket;
      if (socket) {
        socket.emit('logout');
      }
    },
    sendSignedRequest({getters}, request) {
      const auth = getters.getAuth;
      if (!auth) {
        throw new Error('auth required');
      }
      const requestString = jsonBeautify(request, null, 2, 1);
      return auth.signMessage(requestString)
        .then(signature => {
          getters.getSocket.emit('signed', {
            request: requestString,
            signature,
          })
        });
    },
    async changeFavorite({ state, getters }, { favoriteId, action = 'add' }) {
      const socket = getters.getSocket;
      if (socket) {
        const answer = await new Promise((resolve, reject) => {
          setTimeout(() => reject(new ConnectionTimedOutError('ack timeout')), config.socketAckTimeout);
          socket.emit('changeFavorite', { account: state.auth.account, favoriteId, action }, (answer) => resolve(answer));
        });
        return answer;
      }
      return false;
    },
    async changeBlocked({ state, getters }, { blockedId, action = 'add' }) {
      const socket = getters.getSocket;
      if (socket) {
        const answer = await new Promise((resolve, reject) => {
          setTimeout(() => reject(new ConnectionTimedOutError('ack timeout')), config.socketAckTimeout);
          socket.emit('changeBlocked', { account: state.auth.account, blockedId, action }, (answer) => resolve(answer));
        });
        return answer;
      }
      return false;
    },
  }
};
