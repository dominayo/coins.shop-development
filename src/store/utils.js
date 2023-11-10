import * as util from 'ethereumjs-util';
// import _ from 'lodash';

export const getSigner = ({request, signature}) => {
  const prefix = Buffer.from("\x19Ethereum Signed Message:\n");
  const messageBuffer = Buffer.from(request);
  const prefixedMsg = util.keccak256(
    Buffer.concat([prefix, new Buffer(String(messageBuffer.length)), messageBuffer])
  );

  const res = util.fromRpcSig(signature);
  const pubKey = util.ecrecover(prefixedMsg, res.v, res.r, res.s);
  const addrBuf = util.pubToAddress(pubKey);
  const signer = util.bufferToHex(addrBuf);
  return signer;
};

export const roundAmount = (amount, isCrypto) => {
  const digits = Math.pow(10, isCrypto ? 6 : 0);
  return Math.round(amount * digits) / digits;
};

export const defineBrowser = () => {

  let BrowserDetect = {
    init: function () {
      this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    },
    searchString: function (data) {
      for (let i = 0; i < data.length; i++) {
        let dataString = data[i].string;
        let dataProp = data[i].prop;
        if (dataString) {
          if (dataString.indexOf(data[i].subString) !== -1)
            return data[i].identity;
        } else if (dataProp)
          return data[i].identity;
      }
    },
    dataBrowser: [
      {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
      },
      {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
      },
      {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
      },
      {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
      },
      {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
      },
      {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
      },
      {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
      },
      {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
      },
      {
        /* For Newer Netscapes (6+) */
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
      },
      {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Internet Explorer",
        versionSearch: "MSIE"
      },
      {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
      },
      {
        /* For Older Netscapes (4-) */
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
      }
    ]
  };
  BrowserDetect.init();
  return BrowserDetect.browser
}