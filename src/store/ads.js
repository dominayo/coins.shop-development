import _ from "lodash";
import moment from 'moment';
import config from "../config";
import { getSigner, roundAmount } from './utils';

export default {
    state: {
        tickers: {},
        ads: [],
        contacts: [],
        directions: config.directions,
    },
    mutations: {
        updateAds: (state, val) => state.ads = _.map(val, item => ({
            ...item,
            ...JSON.parse(item.data),
            account: getSigner({ request: item.data, signature: item.signature }),
        })),
        updateTickers: (state, val) => state.tickers = val,
        updateContacts: (state, val) => state.contacts = val,
    },
    actions: {
        sendChatMessage({ getters }, { contactId, text, file }) {
            const serialized = JSON.stringify({
                model: 'contact',
                action: 'addChatMessage',
                contactId,
                text,
                file,
            });
            return getters.getAuth.signMessageUnattended(serialized)
                .then(signature => {
                    getters.getSocket.emit('signedByDelegate', {
                        request: serialized,
                        signature,
                    });
                });
        },
        startArbitrage({ dispatch }, item) {
            if (Date.now() < item.status.deadline) {
                return dispatch('modalDialog', {
                    title: 'Арбитраж',
                    text: `У сторон есть время до ${moment(item.status.deadline).format('HH:mm DD-MM-YYYY')}, чтобы разрешить спорную ситуацию без участия
                    арбитража. В арбитраж можно обращаться только после этого времени`,
                })
            } else {
                const serialized = {
                    text: 'Начать арбитраж по сделке',
                    model: 'contact',
                    action: 'arbitrage',
                    contactId: item._id,
                };
                return dispatch('sendSignedRequest', serialized);
            }
        },
        commitContact({ dispatch }, item) {
            const serialized = {
                text: 'Оплату подтверждаю',
                model: 'contact',
                action: 'peerPaid',
                contactId: item._id,
            };
            return dispatch('sendSignedRequest', serialized);
        },
        cancelContact({ dispatch }, item) {
            const serialized = {
                text: 'Отмена сделки',
                model: 'contact',
                action: 'meDenied',
                contactId: item._id,
            };
            return dispatch('sendSignedRequest', serialized);
        },
        markAsPaid({ dispatch }, item) {
            const serialized = {
                text: 'Я заплатил',
                model: 'contact',
                action: 'mePaid',
                contactId: item._id,
            };
            return dispatch('sendSignedRequest', serialized);
        },
        setPaymentDetails({ dispatch }, { contactId, details }) {
            const serialized = {
                text: 'Задать детали платежа',
                model: 'contact',
                action: 'setDetails',
                contactId,
                details,
            };
            delete serialized.details.isValid;
            return dispatch('sendSignedRequest', serialized);
        }
    },
    getters: {
        getTickers: state => state.tickers,
        getDirections: state => state.directions,
        getAds: (state, getters) => {
            const adsUnsorted = _.map(state.ads, item => {
                const directionCurrency = _.find(config.directions, i => i.value === item.direction);
                const directionCurrencySmall = directionCurrency.currencySmall;
                let rateNumber = item.rate;
                let rateText = item.rate ? `${parseFloat(item.rate).toLocaleString('ru-RU')} ${directionCurrencySmall}` : '...';
                if (item.rateType === 'dynamic') {
                    const tickerName = `${item.currency.toUpperCase()}${directionCurrency.currency}`;

                    const currencyRate = getters.getTickers[tickerName];
                    if (!isNaN(currencyRate)) {
                        // const rateShift = item.type === 'buy' ? item.rateSpread : -item.rateSpread;
                        const rateShift = item.rateSpread;
                        rateNumber = Math.ceil(currencyRate * (1 + rateShift / 100));
                        rateText = `${rateNumber.toLocaleString('ru-RU')} ${directionCurrencySmall}`;
                    } else {
                        rateText = '...';
                    }
                }
                const directionDesc = `${directionCurrency.text} (${directionCurrency.currency})`;
                return {
                    ...item,
                    from: item.type === 'buy' ? directionDesc : item.currency.toUpperCase(),
                    to: item.type === 'sell' ? directionDesc : item.currency.toUpperCase(),
                    paymentMethod: directionCurrency.text,
                    rateText,
                    rateNumber,
                };
            });
            const adsSorted = [];
            _.forEach(adsUnsorted, ad => ad.user && ad.user.online && adsSorted.push(ad));
            _.forEach(adsUnsorted, ad => !(ad.user && ad.user.online) && adsSorted.push(ad));
            return adsSorted;
        },
        getAdById: (state, getters) => id =>
            _.find(getters.getAds, item => item._id === id),
        getAdsByUser: (state, getters) => id =>
            _.filter(getters.getAds, item => item.user.id === id),
        getMyAds: (state, getters) => _.filter(getters.getAds, ad => ad.account === getters.getMyAddress),
        getContacts: (state, getters) => {
            const myAddress = getters.getMyAddress;
            const myDelegate = getters.getAuth.accountDelegate;
            return _.map(state.contacts, contact => {
                const actions = JSON.parse(contact.actions);
                const decodedActions = _.map(actions, action => ({
                    ...JSON.parse(action.message.request),
                    time: action.time,
                }));
                const startAction = decodedActions[0];
                const lastAction = decodedActions[decodedActions.length - 1];
                const sourceIsFrom = startAction.source === 'from';
                const isBuy = startAction.type === 'buy';
                const direction = _.find(config.directions, d => d.value === startAction.direction);
                const directionCurrency = direction && direction.currencySmall;

                const takerPaymentDetails = contact.takerPaymentDetails
                    && (JSON.parse(contact.takerPaymentDetails.message.request)).details;
                const chat = [];
                _.forEach(contact.chat, chatItem => {
                    const chatItemDecoded = JSON.parse(chatItem.request);
                    const chatItemAccount = getSigner(chatItem);
                    const side = ((chatItemAccount === myAddress) || (chatItemAccount === myDelegate)) ? 'my' : 'answer';
                    if (!chatItemDecoded.file) {
                        chat.push({
                            type: 'text',
                            text: chatItemDecoded.text,
                            time: chatItem.time,
                            side,
                        });
                    } else {
                        chat.push({
                            type: 'file',
                            thumb: chatItemDecoded.file.match(/^data:image/) ? chatItemDecoded.file : null,
                            fileName: chatItemDecoded.text,
                            url: chatItemDecoded.file,
                            time: chatItem.time,
                            side,
                        });
                    }
                });
                return {
                    ...contact,
                    message: undefined,
                    chat,
                    peerUser: (contact.accountFrom.account === myAddress) ? contact.accountTo : contact.accountFrom,
                    ...startAction,
                    text: lastAction.text,
                    takerPaymentDetails,
                    fromAmount: sourceIsFrom ? startAction.amount : roundAmount(
                        isBuy ? startAction.amount * startAction.rate : startAction.amount / startAction.rate,
                        isBuy),
                    currencyFrom: isBuy ? startAction.currency : directionCurrency,
                    toAmount: !sourceIsFrom ? startAction.amount : roundAmount(
                        isBuy ? startAction.amount * startAction.rate : startAction.amount / startAction.rate,
                        !isBuy
                    ),
                    currencyTo: !isBuy ? startAction.currency : directionCurrency,
                    history: decodedActions,
                };
            });
        }
    },
}