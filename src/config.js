export default {
  socketLink: 'http://localhost:8090',
  socketAckTimeout: 5000,
  directions: [
    { text: 'Qiwi', value: 'qiwi', currency: 'RUB', currencySmall: 'руб', img: require('@/img/icons/qiwi.svg') },
    { text: 'Яндекс.деньги', value: 'yandex', currency: 'RUB', currencySmall: 'руб', img: require('@/img/icons/yandex_money.svg') },
    { text: 'Альфа банк', value: 'alphabank', currency: 'RUB', currencySmall: 'руб', img: require('@/img/icons/alphabank.svg') },
    { text: 'Сбербанк', value: 'sberbank', currency: 'RUB', currencySmall: 'руб', img: require('@/img/icons/sberbank.svg') },
    { text: 'Тинькофф', value: 'tinkoff', currency: 'RUB', currencySmall: 'руб', img: require('@/img/icons/tinkoff.svg'), picClass: 'payment-pic_tinkoff' },
    { text: 'Privat24', value: 'privat24', currency: 'UAH', currencySmall: 'грн', img: require('@/img/icons/privat24.svg') },
  ],
  progressText: {
    start: 'Сделка начата, ожидаем оплату',
  },
  targetNetwork: 'ropsten',
  networks: {
    mainnet: '1',
    ropsten: '3',
    kovan: '42'
  },
  reactionSpeedTexts: {
    slow: 'медленно',
    normal: 'стандартно',
    fast: 'быстро',
  },
  ratingImpacts: {
    reactionSpeed: {
      slow: -10,
      normal: 2.5,
      fast: 5,
    },
    dealsVolume: {
      amount: 1e4,
      k: 1,
    },
    deals: 0.1,
    disputeDefeats: -50,
    dealsCancelled: -5,
  }
}