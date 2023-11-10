import Web3 from 'web3';
import * as util from 'ethereumjs-util';

const web3 = new Web3();
let privkey = null;

const api = {
  account: null,
  accountDelegate: null,
  hasExternalConfirmation: false,
  auth: async (lskey = 'privkey') => {
    privkey = localStorage.getItem(lskey);
    if (!privkey || privkey.length != 66) {
      const t = web3.eth.accounts.create();
      privkey = t.privateKey;
      localStorage.setItem(lskey, privkey);
    }
    api.account = web3.eth.accounts.privateKeyToAccount(privkey)
      .address
      .toLowerCase();
    api.accountDelegate = api.account;
  },
  signMessage: async (message) => {
    const hash = util.hashPersonalMessage(Buffer.from(message));
    const sig = util.ecsign(hash, Buffer.from(privkey.substr(2), 'hex'));
    const sign = util.toRpcSig(sig.v, sig.r, sig.s);
    return sign;
  },
  signMessageUnattended: (msg) => api.signMessage(msg),
};

export default api;
