import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import userModule from './user';
import { SocketPlugin } from './socket';
import ads from './ads';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    userModule,
    ads,
  },
  state: {
    user: {
      rating: 60,
      username: "Sonjar91",
      telegram: "Sonjar91",
      decentralizedJudging: false,
      dealsNumber: 12,
      dealsVol: "$1000",
      disputeDefeats: 25,
      dealsCancel: 12,
      disputeNumber: 51,
      reaction: "Быстро",
      gateway: 1
    },
    walletHistory: [
      {
        type: "deposit",
        status: "await",
        time: 1580981547183,
        currency: "btc",
        info: "3FkenCiXpSLqD8L79intRNXUgjRo",
        amount: 15000
      },
      {
        type: "withdraw",
        status: "success",
        time: 1580981557183,
        currency: "eth",
        info: "4562531LqD8L79intRNXUgjRo",
        amount: 20000
      },
      {
        type: "convert",
        status: "cancel",
        time: 1580981567183,
        currency: "usdt",
        info: "3FkenCiXpSLqD8L79intRNXUgjRo",
        amount: 60000
      }
    ],
    operationsHistory: [
      {
        id: 1,
        time: 1580981567183,
        type: "Блокировка залога",
        amount: 1455,
        info: "4562531LqD8L79intRNXUgjRo"
      },
      {
        id: 2,
        time: 1580982567183,
        type: "Отмена залога",
        amount: 1234,
        info: "4562531LqD8L79intRNXUgjRo"
      },
      {
        id: 3,
        time: 1580983567183,
        type: "Вознаграждение за работу",
        amount: 300,
        info: "4562531LqD8L79intRNXUgjRo"
      }
    ],
    disputes: [
      {
        operation: "Обмен BTC на RUB",
        opened: 1580981567183,
        status: {
          value: "open",
          left: "",
          percent: 10
        },
        sideLost: 2,
        notifications: 2,
        duration: "Спор длился 2 дня и 13 часов",
        side1Amount: "0.2 BTC",
        side2Amount: "1500 RUB",
        messages: [
          {
            type: "text",
            text: "Здравствуйте. Есть вопрос по обмену",
            time: 1580981567183,
            name: "Сторона 1"
          },
          {
            type: "file",
            fileName: "test.png",
            thumb: "https://via.placeholder.com/100",
            url: "https://via.placeholder.com/100",
            text: "Здравствуйте. Есть вопрос по обмену",
            time: 1580981567183,
            name: "Сторона 1"
          },
          {
            type: "text",
            text: "Здравствуйте. У меня есть ответ.",
            time: 1580981567183,
            name: "Сторона 2"
          },
          {
            type: "text",
            text: "Я считаю что спор может быть закончен на том что…",
            time: 1580981567183,
            name: "Судья 1",
            side: "answer"
          },
          {
            type: "file",
            fileName: "test.png",
            url: "https://via.placeholder.com/100",
            text: "Я считаю что спор может быть закончен на том что…",
            time: 1580981567183,
            name: "Судья 1",
            side: "answer"
          }
        ]
      },
      {
        operation: "Обмен BTC на RUB",
        opened: 1580983567183,
        status: {
          value: "success",
          left: "",
          percent: 10
        },
        sideLost: 2,
        notifications: 2,
        duration: "Спор длился 2 дня и 13 часов",
        side1Amount: "0.2 BTC",
        side2Amount: "1500 RUB",
        messages: [
          {
            type: "text",
            text: "Здравствуйте. Есть вопрос по обмену",
            time: 1580981567183,
            name: "Сторона 1"
          },
          {
            type: "file",
            fileName: "test.png",
            thumb: "https://via.placeholder.com/100",
            url: "https://via.placeholder.com/100",
            text: "Здравствуйте. Есть вопрос по обмену",
            time: 1580981567183,
            name: "Сторона 1"
          },
          {
            type: "text",
            text: "Здравствуйте. У меня есть ответ.",
            time: 1580981567183,
            name: "Сторона 2"
          },
          {
            type: "text",
            text: "Я считаю что спор может быть закончен на том что…",
            time: 1580981567183,
            name: "Судья 1",
            side: "answer"
          },
          {
            type: "file",
            fileName: "testFile.png",
            thumb: "https://via.placeholder.com/100/333399/C4C4C4",
            url: "https://via.placeholder.com/100",
            text: "Я считаю что спор может быть закончен на том что…",
            time: 1580981567183,
            name: "Судья 1",
            side: "answer"
          }
        ]
      },
      {
        operation: "Обмен BTC на RUB",
        opened: 1580981567183,
        status: {
          value: "await",
          left: "",
          percent: 10
        },
        remainingTime: "31:05",
        remainingPercent: 40,
        notifications: 20,
        duration: "Спор длится 2 дня и 13 часов",
        side1Amount: "0.2 BTC",
        side2Amount: "1500 RUB"
      },
      {
        operation: "Обмен BTC на RUB",
        opened: 1580981567183,
        status: {
          value: "open",
          left: "",
          percent: 10
        },
        remainingTime: "31:05",
        remainingPercent: 40,
        notifications: 20,
        duration: "Спор длится 2 дня и 13 часов",
        side1Amount: "0.2 BTC",
        side2Amount: "1500 RUB"
      },
      {
        operation: "Обмен BTC на RUB",
        opened: 1580981567183,
        status: {
          value: "success",
          left: "",
          percent: 10
        },
        sideLost: 1,
        notifications: 2,
        duration: "Спор длился 2 дня и 13 часов",
        side1Amount: "0.2 BTC",
        side2Amount: "1500 RUB"
      },
      {
        operation: "Обмен BTC на RUB",
        opened: 1580981567183,
        status: {
          value: "success",
          left: "",
          percent: 10
        },
        sideLost: 1,
        notifications: 0,
        duration: "Спор длился 2 дня и 13 часов",
        side1Amount: "0.2 BTC",
        side2Amount: "1500 RUB"
      },
      {
        operation: "Обмен BTC на RUB",
        opened: 1580981567183,
        status: {
          value: "success",
          left: "",
          percent: 10
        },
        sideLost: 1,
        notifications: 5,
        duration: "Спор длился 2 дня и 13 часов",
        side1Amount: "0.2 BTC",
        side2Amount: "1500 RUB"
      },
      {
        operation: "Обмен BTC на RUB",
        opened: 1580981567183,
        status: {
          value: "success",
          left: "",
          percent: 10
        },
        sideLost: 1,
        notifications: 2,
        duration: "Спор длился 2 дня и 13 часов",
        side1Amount: "0.2 BTC",
        side2Amount: "1500 RUB"
      },
      {
        operation: "Обмен BTC на RUB",
        opened: 1580981567183,
        status: {
          value: "success",
          left: "",
          percent: 10
        },
        sideLost: 1,
        notifications: 2,
        duration: "Спор длился 2 дня и 13 часов",
        side1Amount: "0.2 BTC",
        side2Amount: "1500 RUB"
      }
    ],
    affiliate: {
      balance: {
        eth: 0.03941234,
        btc: 0.00032123
      },
      link: "Cryptom_ref01656",
      statistics: {
        refs: 8,
        amount: 125,
        cashback: 50,
        activeRefs: 5
      },
      operations: [
        {
          time: 1580981547183,
          type: "Реферал",
          amount: "0.25",
          id: "tx"
        },
        {
          time: 1580982117183,
          type: "Реферал",
          amount: "0.25",
          id: "tx"
        },
        {
          time: 1580952541183,
          type: "Реферал",
          amount: "0.25",
          id: "tx"
        },
        {
          time: 1580982246183,
          type: "Реферал",
          amount: "0.25",
          id: "tx"
        },
        {
          time: 1580882537183,
          type: "Реферал",
          amount: "0.25",
          id: "tx"
        },
        {
          time: 1580912547183,
          type: "Реферал",
          amount: "0.25",
          id: "tx"
        }
      ],
      refs: [
        {
          level: 1,
          key: "dfg4A56GDF14G1DF32S1H65FSH41GNS6SF",
          activity: 1580982647183,
          amount: 0.25,
          amountType: "in",
          id: 5
        },
        {
          level: 1,
          key: "dfg4A56GDF14G1DF32S1H65FSH41GNS6SF",
          activity: 1580982647183,
          amount: 0.25,
          amountType: "out",
          id: 5
        },
        {
          level: 2,
          key: "dfg4A56GDF14G1DF32S1H65FSH41GNS6SF",
          activity: 1580982547183,
          amount: 0.25,
          amountType: "in",
          id: 5
        },
        {
          level: 2,
          key: "dfg4A56GDF14G1DF32S1H65FSH41GNS6SF",
          activity: 1580982447183,
          amount: 0.25,
          amountType: "in",
          id: 5
        },
        {
          level: 3,
          key: "dfg4A56GDF14G1DF32S1H65FSH41GNS6SF",
          activity: 1580982347183,
          amount: 0.25,
          amountType: "in",
          id: 5
        },
        {
          level: 3,
          key: "dfg4A56GDF14G1DF32S1H65FSH41GNS6SF",
          activity: 1580982247183,
          amount: 0.25,
          amountType: "in",
          id: 5
        }
      ],
      chartData: [
        {x: new Date(1581727257402), y: 75},
        {x: new Date(1581728257402), y: 130},
        {x: new Date(1581729257402), y: 120},
        {x: new Date(1581730257402), y: 200},
      ]
    },
    cashbackHistory: [
      {
        time: 1580982347183,
        amount: 0.25,
        type: "in"
      },
      {
        time: 1580982357183,
        amount: 1.25,
        type: "out"
      },
      {
        time: 1580982327183,
        amount: 1.05,
        type: "in"
      }
    ]
  },
  mutations: {
    toggleMenu: (state) => (state.menu = !state.menu),
    /*    toggleUserFavorite: (state, id) => {
          state.users[id].favorite = !state.users[id].favorite
        },
        toggleUserBlocked: (state, id) =>
          (state.users[id].blocked = !state.users[id].blocked),*/
    setDecentralizedJudging: (state, value) =>
      (state.user.decentralizedJudging = value),
    setGateway: (state, id) => (state.user.gateway = id)
  },
  actions: {},
  getters: {
    getUserInfo: state => state.user,
    getMenu: state => state.menu,
    getUserById: state => id => state.users[id],
    getWalletHistory: state => state.walletHistory,
    getGateways: state => state.gateways,
    getOperationsHistory: state => state.operationsHistory,
    getOpenDisputes: state =>
      state.disputes.filter(item => {
        return item.status.value !== "success";
      }),
    getClosedDisputes: state =>
      state.disputes.filter(item => {
        return item.status.value === "success";
      }),
    getFavorites: state =>
      _.filter(state.users, item => {
        return item.favorite;
      }),
    getAffiliate: state => state.affiliate,
    getCashbackHistory: state => _.orderBy(state.cashbackHistory, ["time"], ["desc"]),
    getRefsChartData: state => state.affiliate.chartData
  },
  plugins: [
    SocketPlugin(),
  ],
});

export default store;