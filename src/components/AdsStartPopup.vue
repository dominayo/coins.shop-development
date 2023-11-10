<template>
  <popup :active="active" @close="$emit('close', $event)" classes="window-open_02" closeButton>
    <h2>
      Обменять {{ ad.from }} на {{ ad.to }}
      <br />у пользователя
      <span>{{ ad.user.name }}</span>
    </h2>
    <div class="popup-wrap-block">
      <div class="popup-exchange-block">
        <div class="popup-course popup-exchange-decor">
          <div class="popup-course__icon">
            <span class="icon-course"></span>
          </div>
          <div class="popup-course__info">
            <div class="popup-text">Курс обмена</div>
            <div
              class="popup-course__number"
            >1 {{ ad.currency }} = {{ ad.rateText }} через {{ ad.paymentMethod }}</div>
          </div>
        </div>
        <div class="popup-changing">
          <div class="popup-changing__wrap">
            <div class="popup-text">Меняю</div>
            <div class="popup-changing__input">
              <span :class="`popup-changing__icon popup-changing__icon_${currencyFrom}`"></span>
              <input
                type="text"
                v-model="fromAmount"
                @focus="sourceIsFrom = true"
                @input="checkFromAmount"
                @blur="checkFromAmount"
              />
            </div>
            <template v-if="$v.fromAmount.$error">
              <div class="error" v-if="!$v.fromAmount.required">Заполните поле</div>
              <div class="error" v-else-if="!$v.fromAmount.float">Укажите число</div>
              <div
                class="error"
                v-else-if="!$v.fromAmount.minValue"
              >Число должно быть больше или равно {{ $v.fromAmount.$params.minValue.min }}</div>
              <div
                class="error"
                v-else-if="!$v.fromAmount.minValueExclusive"
              >Число должно быть больше {{ $v.fromAmount.$params.minValueExclusive.min }}</div>
              <div
                class="error"
                v-else-if="!$v.fromAmount.maxValue"
              >Число должно быть меньше или равно {{ $v.fromAmount.$params.maxValue.max }}</div>
            </template>
            <div
              class="popup-changing__small"
              v-if="!isTypeBuy"
            >Лимит {{ ad.limits.min }} - {{ ad.limits.max }} руб.</div>
            <div
              class="popup-changing__small"
              v-if="isTypeBuy"
              style="cursor:pointer"
              @click="sourceIsFrom = true; fromAmount = cryptoBalance"
            >Доступный баланс {{ cryptoBalance }}</div>
          </div>
          <div class="popup-changing__wrap">
            <div class="popup-text">На</div>
            <div class="popup-changing__input">
              <span :class="`popup-changing__icon popup-changing__icon_${currencyTo}`"></span>
              <input
                type="text"
                v-model="toAmount"
                @focus="sourceIsFrom = false"
                @input="checkToAmount"
                @blur="checkToAmount"
              />
            </div>
            <template v-if="$v.toAmount.$error">
              <div class="error" v-if="!$v.toAmount.required">Заполните поле</div>
              <div class="error" v-else-if="!$v.toAmount.float">Укажите число</div>
              <div
                class="error"
                v-else-if="!$v.toAmount.minValueExclusive"
              >Число должно быть больше {{ $v.toAmount.$params.minValueExclusive.min }}</div>
              <div
                class="error"
                v-else-if="!$v.toAmount.minValue"
              >Число должно быть больше или равно {{ $v.toAmount.$params.minValue.min }}</div>
              <div
                class="error"
                v-else-if="!$v.toAmount.maxValue"
              >Число должно быть меньше или равно {{ $v.toAmount.$params.maxValue.max }}</div>
            </template>
            <div
              class="popup-changing__small"
              v-if="isTypeBuy"
            >Лимит {{ ad.limits.min }} - {{ ad.limits.max }} руб.</div>
          </div>
        </div>
        <!-- v-if give fiat -->
        <payment-details v-if="isTypeBuy" :method="ad.direction" :changeable="true" v-model="paymentDetails" />
        <div class="popup-btn">
          <a
            href="#"
            class="btn"
            :class="{ disabled: $v.$invalid || !paymentDetailsValid }"
            @click.prevent.stop="startContact"
          >Предложить обмен</a>
          <div class="popup-btn__text">
            Текст который говорит о том, что сделка безопасна, условия гарантируются
            смартконтрактом и т.д.
          </div>
        </div>
      </div>
      <div class="popup-exchange-block">
        <user-info-card classes="popup-exchange-decor" :user="ad.user" />
        <div
          v-if="ad.comment"
          class="popup-comments popup-exchange-decor"
        >
          <div class="popup-comments__quote">
            <div class="popup-comments__icon">
              <span class="icon-quote"></span>
            </div>
            <div class="popup-comments__title">Комментарий</div>
          </div>
          <div class="popup-comments__text">
            <p v-text="ad.comment" />
          </div>
        </div>
      </div>
    </div>
  </popup>
</template>

<script>
import Popup from "@/components/Popup";
import UserInfoCard from "@/components/UserInfoCard";
import PaymentDetails from "@/components/PaymentDetails";
import { mapGetters, mapActions } from "vuex";
import {
  required,
  minValue,
  maxValue,
  helpers
} from "vuelidate/lib/validators";

const float = value => !helpers.req(value) || !isNaN(parseFloat(value));

const minValueExclusive = min =>
  helpers.withParams(
    { type: "minValueExclusive", min },
    value => !helpers.req(value) || +value > +min
  );

export default {
  props: {
    adId: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({ getAdById: "getAdById", getBalances: "getBalances", getAuth: "getAuth"}),
    ad() {
      return this.getAdById(this.adId);
    },
    isTypeBuy() {
      return this.ad && this.ad.type === "buy";
    },
    currencyFrom() {
      return (
        this.ad && (!this.isTypeBuy ? this.ad.direction : this.ad.currency)
      );
    },
    currencyTo() {
      return this.ad && (this.isTypeBuy ? this.ad.direction : this.ad.currency);
    },
    paymentDetailsValid() {
      return !this.isTypeBuy || (this.paymentDetails && this.paymentDetails.isValid);
    },
    cryptoBalance() {
      if (!this.ad) {
        return null;
      }
      const balances = this.getBalances;
      return (
        balances[this.ad.currency] &&
        balances[this.ad.currency].balance &&
        balances[this.ad.currency].balance.available
      );
    }
  },
  components: {
    Popup,
    UserInfoCard,
    PaymentDetails
  },
  methods: {
    ...mapActions(["sendSignedRequest"]),
    startContact() {
      const serialized = {
        text: "Предложен обмен",
        model: "contact",
        rate: this.ad && this.ad.rateNumber,
        type: this.ad && this.ad.type,
        currency: this.ad && this.ad.currency,
        direction: this.ad && this.ad.direction,
        amount: this.sourceIsFrom ? this.fromAmount : this.toAmount,
        source: this.sourceIsFrom ? "from" : "to",
        ad: this.adId,
        action: "start",
      };
      if (this.isTypeBuy) {
        serialized.details = this.paymentDetails;
      }
      if (this.getAuth.accountDelegate != this.getAuth.account) {
        serialized.delegate = this.getAuth.accountDelegate;
      }
      this.sendSignedRequest(serialized).then(() => {
        this.$emit('close', false);
      });
    },
    roundAmount(amount, isCrypto) {
      const digits = Math.pow(10, isCrypto ? 0 : 6);
      return Math.round(amount * digits) / digits;
    },
    recalc() {
      const rate = this.ad.rateNumber;
      const isBuy = this.ad.type === "buy";
      if (this.sourceIsFrom) {
        this.toAmount = this.roundAmount(
          isBuy ? this.fromAmount * rate : this.fromAmount / rate,
          isBuy
        );
      } else {
        this.fromAmount = this.roundAmount(
          !isBuy ? this.toAmount * rate : this.toAmount / rate,
          !isBuy
        );
      }
    },
    checkFromAmount() {
      this.$v.fromAmount.$touch();
      this.$v.toAmount.$touch();
    },
    checkToAmount() {
      this.$v.toAmount.$touch();
      this.$v.fromAmount.$touch();
    }
  },
  model: {
    prop: "active",
    event: "close"
  },
  data() {
    return {
      fromAmount: 0,
      toAmount: 0,
      sourceIsFrom: true,
      paymentDetails: {}
    };
  },
  validations: {
    fromAmount: {
      required,
      float,
      minValue(value) {
        return minValue(this.ad.limits.min)(value) || this.isTypeBuy;
      },
      minValueExclusive(value) {
        return minValueExclusive(0)(value) || !this.isTypeBuy;
      },
      maxValue(value) {
        if (this.isTypeBuy) {
          return maxValue(this.cryptoBalance)(value);
        } else {
          return maxValue(this.ad.limits.max)(value);
        }
      }
    },
    toAmount: {
      required,
      float,
      minValueExclusive(value) {
        return minValueExclusive(0)(value);
      },
      minValue(value) {
        return minValue(this.ad.limits.min)(value) || !this.isTypeBuy;
      },
      maxValue(value) {
        return maxValue(this.ad.limits.max)(value) || !this.isTypeBuy;
      }
    },
  },
  watch: {
    fromAmount() {
      this.sourceIsFrom && this.recalc();
    },
    toAmount() {
      this.sourceIsFrom || this.recalc();
    },
    ad() {
      this.recalc();
    }
  }
};
</script>
