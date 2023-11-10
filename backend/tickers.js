const axios = require('axios');
const _ = require('lodash');

class Tickers {
  constructor({ models }) {
    this._anySocket = null;
    this._models = models;
    models.Tickers = this;

    this._fetchInterval = setInterval(async() => {
      if (this._anySocket) {
        const data = await this.constructor.getBinanceTicker();
        this._anySocket.emit(this.constructor.name, data);
        this._anySocket.broadcast.emit(this.constructor.name, data);
      }
    }, 60000);
  }

  async onConnect(socket) {
    const ticker = await this.constructor.getBinanceTicker();
    socket.emit(this.constructor.name, ticker);
    this._anySocket = socket;
  }

   static async getBinanceTicker() {
        if (Date.now() - this.constructor.binanceTickerTime < 60000) {
            return this.constructor.binanceTicker;
        }
        const tickersResp = await axios.get('https://api.binance.com/api/v1/ticker/allPrices');
        const resp = tickersResp && tickersResp.data;
        const privateResp = await axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
        const privat = privateResp && privateResp.data;
        if (resp && privat) {
            const uRecord = privat.find(i => (i.ccy === 'USD') && (i.base_ccy === 'UAH'));
            const ret = {};
            _.forEach(resp, i => {
                // TODO let currencies = ['BTCRUB', 'ETHRUB', 'USDTRUB' ] .... if currencies.includes(i.symbol)
                if ((i.symbol === 'BTCRUB') || (i.symbol === 'ETHRUB') || (i.symbol === 'USDTRUB')) {
                    ret[i.symbol] = parseFloat(i.price);
                }
                if ((i.symbol === 'BTCUSDT') || (i.symbol === 'ETHUSDT')) {
                    ret[i.symbol] = parseFloat(i.price);
                    if (uRecord) {
                        const UAH2USD = (parseFloat(uRecord.buy) + parseFloat(uRecord.sale)) / 2;
                        ret[i.symbol.replace('USDT', 'UAH')] = i.price * UAH2USD;
                    }
                }
            });
            this.constructor.binanceTicker = ret;
            this.constructor.binanceTickerTime = Date.now();
        }
        return this.constructor.binanceTicker;
    }
}

Tickers.binanceTicker = {};
Tickers.binanceTickerTime = 0;

module.exports = Tickers;