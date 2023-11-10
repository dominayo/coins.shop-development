<template>
  <popup
    :active="value"
    closeButton
    :secondaryPopup="secondaryPopup"
    classes="window-open_create window-open_create_1"
    @close="$emit('input', false)"
  >
    <ModalWindow
      @dialogOpen="secondaryPopup = true"
      :dialog = "isNotificationOpened"
      @dialogAccept="confirmNegativeSpread"
      @dialogClose="popupDelay"
      confirmBtn="создать с текущими настройками"
      declineBtn="продолжить редактирование"
      title="Отрицательный спред"
      text="Указанный Вами плавающий курс в объявлении ниже, чем текущий базовый курс.
      Если Вы уверены что все ввели верно, подтвердите свой выбор"
    />
    <h2 v-text="isNew ? 'Создать объявление' : 'Редактировать объявление'" />
    <div class="balance-crypto__input-wrap balance-crypto__input-wrap_mb">
      <div class="balance-crypto__input">
        <div
          v-show="!isNew"
          class="disable-overlay"
        />
        <div class="text">Тип объявления</div>
        <div class="st-profile-refereeing">
          <ul class="refereeing__list">
            <li
              v-for="(value, name, index) in types"
              :key="index"
              :class="['refereeing__item', { active: name === type }]"
              @click.prevent="type = name"
            >
              <a
                href="#"
                class="refereeing__link"
                v-text="value"
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="balance-crypto__input">
        <div
          v-show="!isNew"
          class="disable-overlay"
        />
        <div class="text">Тип объявления</div>
        <div class="st-profile-refereeing">
          <ul class="refereeing__list">
            <li
              v-for="(value, index) in currencies"
              :key="index"
              :class="['refereeing__item', { active: value === currency }]"
              :style="`width: ${Math.floor(100/currencies.length)}%`"
              @click.prevent="currency = value"
            >
              <a
                href="#"
                class="refereeing__link"
              >
                <crypto-icon :currency="value" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="balance-crypto__input">
        <div
          v-show="!isNew"
          class="disable-overlay"
        />
        <div class="text">Направления обмена</div>
        <select-direction
          v-model="direction"
          :items="getDirections"
        />
      </div>
      <div class="balance-crypto__input">
        <div class="text">Курс</div>
        <div class="st-profile-refereeing">
          <ul class="refereeing__list">
            <li
              v-for="(value, name, index) in rateTypes"
              :key="index"
              :class="['refereeing__item', { active: name === rateType }]"
              @click.prevent="rateType = name"
            >
              <a
                href="#"
                class="refereeing__link"
                v-text="value"
              />
            </li>
          </ul>
        </div>
      </div>
      <template>
        <div
          v-if="rateType === 'dynamic'"
          class="balance-crypto__input"
        >
          <!-- <input v-model="rateSpread" type="text" placeholder="Спред от базового курса (%)" /> -->
          <input
            v-model="rateSpread"
            type="number"
            max="100"
            @input="$v.rateSpread.$touch()"
            @blur="$v.rateSpread.$touch()"
            placeholder="Спред от базового курса (%)"
          />
          <Errors
            v-if="$v.rateSpread.$error"
            :errors="$v.rateSpread"
          />
        </div>
        <div
          v-if="rateType === 'dynamic'"
          class="balance-crypto__input"
        >
          <div class="balance-crypto__radio-wrap balance-crypto__radio-wrap_part">
            <div class="balance-crypto__radio">
              <input
                id="radio"
                type="radio"
                class="radio"
                name="radio"
                checked
              />
              <label for="radio">
                <span class="text-1 d-block">база: Binance</span><br>
                <span
                  class="text-2 d-block"
                  v-text="getTickerPriceText"
                />
              </label>
            </div>
            <div class="balance-crypto__radio disabled">
              <input
                id="radio2"
                type="radio"
                class="radio"
                name="radio"
              />
              <label for="radio2">
                <span class="text-1 d-block">база: Bitfinex</span>
                <span class="text-2 d-block">Скоро</span>
              </label>
            </div>
          </div>
        </div>
        <div
          v-if="rateType === 'dynamic'"
          class="balance-crypto__input"
        >
          <input
            v-model="calculatedRate"
            type="text"
            placeholder="Курс обмена (текущий)"
            readonly
          />
        </div>
        <div
          v-else
          class="balance-crypto__input"
        >
          <!-- <input v-model="rate" type="text" placeholder="Введите курс обмена" /> -->
          <input
            v-model="rate"
            type="text"
            @input="$v.rate.$touch()"
            @blur="$v.rate.$touch()"
            placeholder="Введите курс обмена"
          />
          <Errors
            v-if="$v.rate.$error"
            :errors="$v.rate"
          />
        </div>
      </template>
      <div class="balance-crypto__input">
        <div class="text">Лимиты</div>
        <div class="balance-crypto__limits">
          <div class="balance-crypto-limit">
            <div class="balance-crypto-limit__text">Мин.</div>
            <input
              v-model="limits.min"
              type="text"
              @input="$v.limits.min.$touch()"
              @blur="$v.limits.min.$touch()"
            />
            <Errors
              v-if="$v.limits.min.$error"
              :errors="$v.limits.min"
            />
          </div>
          <div class="balance-crypto-limit">
            <div class="balance-crypto-limit__text">Макс.</div>
            <input
              v-model="limits.max"
              type="text"
              @input="$v.limits.max.$touch()"
              @blur="$v.limits.max.$touch()"
            />
            <Errors
              v-if="$v.limits.max.$error"
              :errors="$v.limits.max"
            />
          </div>
        </div>
        <div
          v-if="$v.limits.$error && !$v.limits.min.$error && !$v.limits.max.$error && !$v.limits.check"
          class="error"
        >
          Минимальное значение не должно быть больше максимального
        </div>
      </div>
      <div class="balance-crypto__input">
        <div class="text">Дополнительные условия</div>
        <input
          v-model="comment"
          type="text"
        />
      </div>
    </div>
    <div class="st-profile-btn st-profile-btn_full">
      <a
        href="#"
        class="btn"
        :class="{ disabled: $v.$invalid }"
        @click.prevent="createAd"
        v-text="isNew ? 'Создать' : 'Изменить'"
      />
    </div>
  </popup>
</template>

<script>
import _ from 'lodash';
import Popup from '@/components/Popup';
import ModalWindow from '@/components/ModalWindow';
import CryptoIcon from '@/components/CryptoIcon';
// import BaseSelect from "@/components/BaseSelect";
import SelectDirection from '@/components/SelectDirection';
import { mapActions, mapGetters } from 'vuex';
import { helpers, integer, maxValue, required } from 'vuelidate/lib/validators';

const float = value => !isNaN(parseFloat(value));

const minValueExclusive = min =>
  helpers.withParams(
    { type: 'minValueExclusive', min },
    value => !helpers.req(value) || +value > +min,
  );

export default {
  name: 'AdsCreatePopUp',
  components: {
    Popup,
    CryptoIcon,
    // BaseSelect,
    SelectDirection,
    ModalWindow,
    Errors: () => import(/* webpackChunkName: "components/errors" */ '@/components/Errors'),
  },
  props: {
    value: {
      type: Boolean,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
    startData: {
      type: Object,
    },
  },
  data() {
    const direction = this.$store.getters.getDirections[0];
    return {
      type: 'buy',
      direction,
      currency: 'btc',
      secondaryPopup: false,
      isNotificationOpened: false,
      rateType: 'fixed',
      rate: null,
      rateSpread: null,

      limits: {
        min: null,
        max: null,
      },
      comment: null,

      types: {
        buy: 'Покупка',
        sell: 'Продажа',
      },
      currencies: ['btc', 'eth', 'usdt'],
      rateTypes: {
        fixed: 'Фиксированный',
        dynamic: 'Плавающий',
      },
    };
  },
  computed: {
    ...mapGetters(['getTickers', 'getDirections', 'getAuth']),
    getTickerPrice() {
      const tickerName = `${this.currency.toUpperCase()}${
        this.direction.currency
      }`;
      return this.getTickers[tickerName];
    },
    getTickerPriceText() {
      const val = this.getTickerPrice;
      return val
        ? `${Math.round(val).toLocaleString('ru-RU')} ${this.direction.currencySmall}`
        : '';
    },
    calculatedRate() {
      const tickerPrice = this.getTickerPrice;
      const spread = this.rateSpread / 100;
      if ( !tickerPrice || this.rateSpread === null || this.rateSpread === '' || isNaN(spread)) return null;
      return Math.ceil(tickerPrice * (1 + spread)).toLocaleString('ru-RU');
    },
  },
  watch: {
    startData: {
      handler(val) {
        if (val) {
          this.type = val.type;
          this.direction = _.find(
            this.$store.getters.getDirections,
            d => d.value === val.direction,
          );
          this.currency = val.currency;
          this.rateType = val.rateType;
          this.rate = val.rate;
          this.rateSpread = val.rateSpread;
          this.limits = val.limits || {};
          this.comment = val.comment;
        }
      },
      immediate: true,
    },
  },
  validations: {
    rateSpread: {
      required(value) {
        return required(value) || this.rateType !== 'dynamic';
      },
      float(value) {
        return float(value) || this.rateType !== 'dynamic';
      },
      minValueExclusive(value) {
        return minValueExclusive(-100)(value) || this.rateType !== 'dynamic';
      },
      maxValue(value) {
        return maxValue(100)(value) || this.rateType !== 'dynamic';
      },
    },
    rate: {
      required(value) {
        return required(value) || this.rateType !== 'fixed';
      },
      float(value) {
        return float(value) || this.rateType !== 'fixed';
      },
      minValueExclusive(value) {
        return minValueExclusive(0)(value) || this.rateType !== 'fixed';
      },
    },
    limits: {
      check(value) {
        return +value.min <= +value.max;
      },
      min: {
        required,
        integer,
        minValueExclusive: minValueExclusive(0),
      },
      max: {
        required,
        integer,
        minValueExclusive: minValueExclusive(0),
      },
    },
  },
  methods: {
    ...mapActions(['sendSignedRequest']),
    confirmNegativeSpread(){
      this.secondaryPopup = false;
      this.isNotificationOpened = false;
      this.create();
    },
    createAd () {
      if (this.rateSpread && this.rateSpread < 0){
        this.secondaryPopup = true;
        this.isNotificationOpened = true;
      } else {
        this.create()
      }
    },
    popupDelay () {
      this.isNotificationOpened = false;
      setTimeout( () => {this.secondaryPopup = false}, 100)
    },
    create() {
      this.$v.$touch();
      if ( !this.$v.$invalid) {
        const serialized = {
          text: this.isNew ? 'Создать объявление' : 'Изменить объявление',
          model: 'ad',
          action: this.isNew ? 'create' : 'update',
          type: this.type,
          currency: this.currency,
          direction: this.direction.value,
          rateType: this.rateType,
          limits: this.limits,
          comment: this.comment,
        };
        if (this.rateType === 'fixed') {
          serialized.rate = this.rate;
        } else {
          serialized.rateBase = 'binance';
          serialized.rateSpread = this.rateSpread;
        }
        if ( !this.isNew) {
          serialized.id = this.startData._id;
        }
        if (this.getAuth.accountDelegate !== this.getAuth.account) {
          serialized.delegate = this.getAuth.accountDelegate;
        }
        this.sendSignedRequest(serialized)
          .then(() => {
            this.$emit('input', false);
          });
      }
    },
  },
};
</script>

<style lang="stylus">
  .disable-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: not-allowed;
    z-index: 1;
  }
</style>
