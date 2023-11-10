const util = require('ethereumjs-util')

module.exports = {
    getSigner: ({ request, signature }) => {
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
    }
}