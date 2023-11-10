module.exports = {
  mongo: 'mongodb://127.0.0.1:27017/backend',
  directions: [
    { text: 'Qiwi', value: 'qiwi', currency: 'RUB' },
    { text: 'Яндекс.деньги', value: 'yandex', currency: 'RUB' },
    { text: 'Альфа банк', value: 'alphabank', currency: 'RUB' },
    { text: 'Сбербанк', value: 'sberbank', currency: 'RUB' },
    { text: 'Тинькофф', value: 'tinkoff', currency: 'RUB' },
    { text: 'Privat24', value: 'privat24', currency: 'UAH' },
  ],
  arbitrageAccount: '0x',
  salt: 'sdfsdfsdf',
  actionDeadlines: {
    start: 1000 * 60 * 10,
    mePaid: 1000 * 60 * 30,
    arbitrage: 1000 * 60 * 60 * 48,
  },
  proUsers: (() => {
    let users = [
      '0xe0Cda158eFCfC35CEd807295243BD44ee8eCf863',
      '0xbAC5d3d5c173119b4dabD215592B0Dd15E5d8EE1',
      '0xbAC5d3d5c173119b4dabD215592B0Dd15E5d8EE1',
      '0xB8f8C40fE7aA64cFC1b2c2907E5c606c29309A0c',
      '0x850f18E64Ba77AB98334D3056274b14F256a8b7b'
    ]
    return users.map(user => user.toLowerCase())
  })(),
  reactionSpeedRanges: {
    slow: {
      lowLimit: 6,
    },
    normal: {
      lowLimit: 3,
    },
    fast: {
      lowLimit: 0,
    },
  }
};
