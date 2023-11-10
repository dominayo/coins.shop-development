import { InvalidNetworkError } from './errors';
import ls from './ls';
import config from '../config';

const targetAccountIndex = 0;

const api = {
  account: null,
  accountDelegate: null,
  hasExternalConfirmation: true,
  auth: async () => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('metamask not installed');
    }
    window.ethereum.autoRefreshOnNetworkChange = false;

    const accounts = await window.ethereum.enable();
    api.account = accounts[targetAccountIndex];

    if (window.ethereum.networkVersion !== config.networks[config.targetNetwork]) {
      throw new InvalidNetworkError(`should be on ${config.targetNetwork}`);
    }

    await ls.auth('unattended_privkey');
    api.accountDelegate = ls.account;
  },

  signMessage: async (msg) => {
    return await new Promise((res, rej) => {
      window.ethereum.sendAsync({
        method: 'personal_sign',
        params: [msg, api.account],
        from: api.account,
      }, (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result && result.result);
        }
      });
    });
  },

  signMessageUnattended: (msg) => ls.signMessageUnattended(msg),

  onLogout: (cb) => {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (api.account !== accounts[targetAccountIndex]) cb();
    });
    window.ethereum.on('networkChanged', cb);
  },
};

export default api;
