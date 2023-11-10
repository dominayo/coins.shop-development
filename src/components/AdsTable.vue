<template>
  <div>
    <!-- open on login click -->
    <user-info-popup
      v-model="userInfoPopup"
      v-if="userInfoPopup"
      :user="currentAdUser"
    />
    <!-- open on start deal button click -->
    <ads-start-popup
      v-model="startDealPopup"
      v-if="startDealPopup"
      :ad-id="currentAdId"
    />

    <section class="section section-barter">
      <div class="wrapper">
        <h2 v-if="!main">Доска объявлений</h2>
        <div class="barter">
          <div class="barter-wrap barter-wrap_mr">
            <div class="barter-item barter-item_decor">
              <h6>Отдаю</h6>
              <select-currency
                v-model="currencyFrom"
                :items="currenciesFrom"
              />
            </div>
            <div class="barter-item">
              <h6>Получаю</h6>
              <select-currency
                v-model="currencyTo"
                :items="currenciesTo"
              />
            </div>
          </div>
          <div
            class="chek-block"
            :class="{ 'chek-block_mr': getLoggedIn }"
          >
            <input
              type="checkbox"
              class="checkbox"
              id="checkbox"
              v-model="onlyVerified"
            />
            <label for="checkbox">Только проверенные пользователи</label>
          </div>
          <div
            class="chek-block"
            v-if="getLoggedIn"
          >
            <input
              type="checkbox"
              class="checkbox"
              id="checkbox2"
              v-model="onlyFavorites"
            />
            <label for="checkbox2">
              Только избранные
              пользователи
            </label>
          </div>
        </div>
        <div class="table barter-table">
          <div class="table-row table-head">
            <div
              class="th"
              v-for="(item, index) in headers"
              :key="index"
            >{{ item }}
            </div>
          </div>
          <div
            class="table-row"
            v-for="(item, index) in itemsPage"
            :key="index"
          >
            <div class="td">
              <!-- Пользователь -->
              <table-user-info
                @click.native.stop="showUserInfoPopup(item)"
                classes="td-inner"
                :user="item.user"
                style="cursor: pointer"
              />
            </div>
            <div class="td">
              <!-- Способ оплаты (BTC) -->
              <payment-pic
                classes="td-inner"
                :method="item.direction"
              />
            </div>
            <div class="td">
              <div class="hide-td">Курс (RUB/BTC)</div>
              <div class="td-inner">
                <div
                  class="course"
                  :class="item.rateType === 'dynamic' ? 'course_decor': ''"
                >{{ item.rateText }}
                </div>
              </div>
            </div>
            <div class="td">
              <div class="hide-td">Лимиты (RUB)</div>
              <div class="td-inner">
                <div class="limits">{{ item.limits.min }} - {{ item.limits.max }}</div>
              </div>
            </div>
            <div class="td">
              <div class="td-inner">
                <a
                  href="#"
                  class="btn btn_border"
                  v-if="item.user.account !== getMyAddress"
                  @click.prevent.stop="showAdsStartPopup(item)"
                >Начать сделку
                </a>
                <div v-else>Это Ваше объявление</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-pagination section-pagination_mod">
      <div class="wrapper">
        <table-pagination
          :length="pagesNumber"
          v-model="pageNumber"
          :perPage="perPage"
          @perPageChange="perPageChanged"
          @load="() => null"
        />
      </div>
      <!-- <div class="t-center btn-main-row" v-if="main">
        <a href="#" class="btn btn_flex btn_pluse">
          <span class="icon-pluse"></span>
          <span>Создать объявление</span>
        </a>
      </div>-->
    </section>
  </div>
</template>

<script>
import _ from 'lodash';
import UserInfoPopup from '@/components/UserInfoPopup';
import AdsStartPopup from '@/components/AdsStartPopup';
import SelectCurrency from '@/components/SelectCurrency';
import TableUserInfo from '@/components/TableUserInfo';
import PaymentPic from '@/components/PaymentPic';
import TablePagination from '@/components/TablePagination';
import { mapGetters, mapActions } from 'vuex';
import { pagination } from '@/mixins/table';

export default {
  mixins: [pagination],
  props: {
    main: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    UserInfoPopup,
    AdsStartPopup,
    SelectCurrency,
    TableUserInfo,
    PaymentPic,
    TablePagination,
  },
  data() {
    return {
      currentAdUser: null,
      currentAdId: null,
      userInfoPopup: false,
      startDealPopup: false,
      currencyFrom: 'btc',
      currencyTo: 'any',
      onlyVerified: false,
      onlyFavorites: false,
      headers: ['Пользователь', 'Способ оплаты', 'Курс', 'Лимиты'],
    };
  },
  computed: {
    ...mapGetters(['getLoggedIn', 'getAds', 'getMyAddress', 'isFavorite']),
    currenciesFrom() {
      const currencies = [
        { key: 'any', text: 'Любая' },
        { key: 'btc', text: 'BTC' },
        { key: 'eth', text: 'ETH' },
        { key: 'usdt', text: 'USDT' },
      ];
      _.forEach(this.$store.getters.getDirections, d =>
        currencies.push({ text: d.text, key: d.value }),
      );
      return currencies;
    },
    currenciesTo() {
      const currencies = [];
      if (['btc', 'eth', 'usdt'].indexOf(this.currencyFrom) < 0) {
        currencies.push({ key: 'btc', text: 'BTC' });
        currencies.push({ key: 'eth', text: 'ETH' });
        currencies.push({ key: 'usdt', text: 'USDT' });
      } else {
        currencies.push({ key: 'any', text: 'Любая' });
        _.forEach(this.$store.getters.getDirections, d =>
          currencies.push({ text: d.text, key: d.value }),
        );
      }
      return currencies;
    },
    items() {
      return _.filter(this.getAds, item => {
        const currencyCrypto = item.currency;
        const currencyPeer = item.direction;
        const itemCurrencyFrom = item.type === 'sell' ? currencyCrypto : currencyPeer;
        const itemCurrencyTo = item.type === 'buy' ? currencyCrypto : currencyPeer;
        return (
          (!this.onlyVerified || !!item.user.verified) &&
          (!this.onlyFavorites || this.isFavorite(item.user._id)) &&
          ((this.currencyFrom === 'any') || (itemCurrencyFrom === this.currencyFrom)) &&
          ((this.currencyTo === 'any') || (itemCurrencyTo === this.currencyTo)) &&
          item.isOpen === true
        );
      });
    },
  },
  methods: {
    ...mapActions(['forceAuth']),
    showUserInfoPopup(ad) {
      this.currentAdUser = ad.user;
      this.userInfoPopup = true;
    },
    async showAdsStartPopup(ad) {
      if (!this.getLoggedIn) return this.forceAuth('Для начала сделки требуется авторизация.');
      this.currentAdId = ad._id;
      this.startDealPopup = true;
    },
  },
  watch: {
    currenciesTo(val) {
      if (val.indexOf(this.currencyTo) < 0) {
        this.currencyTo = val[0].key;
      }
    },
  },
};
</script>
