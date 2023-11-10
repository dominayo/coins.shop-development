<template>
  <div>
    <div class="popup-card" v-if="['sberbank', 'aplhabank'].indexOf(method) >=0">
      <div class="popup-card__text">Номер карты</div>
      <div class="popup-card__input">
        <input
          type="text"
          v-mask="'#### #### #### ?#?#?#?# ?#?#'"
          v-model="number"
          @input="$v.number.$touch"
          @blur="$v.number.$touch"
          :readonly="!changeable"
        />
      </div>
      <template v-if="$v.number.$error">
        <div class="error" v-if="!$v.number.required">Заполните поле</div>
        <div class="error" v-else-if="!$v.number.creditCard">Неверный номер карты</div>
      </template>
      <div class="popup-card__text" style="margin-top: 15px">Имя и Фамилия</div>
      <div class="popup-card__input">
        <input
          type="text"
          v-model="holder"
          @input="$v.holder.$touch"
          @blur="$v.holder.$touch"
          :readonly="!changeable"
          placeholder="CARD HOLDER"
        />
      </div>
      <template v-if="$v.holder.$error">
        <div class="error" v-if="!$v.holder.required">Заполните поле</div>
      </template>
    </div>

    <div class="popup-card" v-if="method === 'qiwi'">
      <div class="popup-card__row popup-card__row_mod">
        <div class="popup-card__icon">
          <span class="icon-qiwi"></span>
        </div>
        <div class="popup-card__text">Перевод на Qiwi кошелек</div>
      </div>
      <div class="popup-card__text">Номер кошелька</div>
      <div class="popup-card__input">
        <input
          type="text"
          v-mask="'+# (###)-###-####'"
          placeholder="+7 (999)-999-9999"
          v-model="number"
          :readonly="!changeable"
          @input="$v.number.$touch"
          @blur="$v.number.$touch"
        />
      </div>
      <template v-if="$v.number.$error">
        <div class="error" v-if="!$v.number.required">Заполните поле</div>
        <div class="error" v-else-if="!$v.number.phoneNumber">Неверный номер кошелька</div>
      </template>
    </div>

    <div class="popup-card" v-if="method === 'yandex'">
      <div class="popup-card__row popup-card__row_mod">
        <div class="popup-card__icon">
          <span class="icon-yandex_money">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
          </span>
        </div>
        <div class="popup-card__text">Перевод через Яндекс.Деньги</div>
      </div>
      <div class="popup-card__text">Номер кошелька</div>
      <!-- 11 to 20 digits -->
      <div class="popup-card__input">
        <input
          type="text"
          v-mask="'###########?#?#?#?#?#?#?#?#?#'"
          v-model="number"
          placeholder="12345678912345678912"
          :readonly="!changeable"
          @input="$v.number.$touch"
          @blur="$v.number.$touch"
        />
      </div>
      <template v-if="$v.number.$error">
        <div class="error" v-if="!$v.number.required">Заполните поле</div>
        <div class="error" v-if="!$v.number.minLength || !$v.number.maxLength">Неверный номер кошелька</div>
      </template>
    </div>
  </div>
</template>

<script>
import {
  required,
  helpers,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import creditCard from "creditcard";
import phoneNumber from "awesome-phonenumber";

export default {
  props: {
    method: {
      type: String,
      required: true,
    },
    changeable: {
      type: Boolean,
      required: true,
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      number: this.value.number,
      holder: this.value.holder,
    };
  },
  computed: {
    cardNumberRequired() {
      return ['sberbank', 'aplhabank'].indexOf(this.method) >=0;
    },
    phoneNumberRequired() {
      return this.method === 'qiwi';
    }
  },
  validations: {
    number: {
      required,
      creditCard(value) {
        return !this.cardNumberRequired || !helpers.req(value) || creditCard.validate(value);
      },
      phoneNumber(value) {
        return !this.phoneNumberRequired || !helpers.req(value) || phoneNumber(value).isValid();
      },
      minLength: minLength(11),
      maxLength: maxLength(20),
    },
    holder: {
      required(value) {
        return !this.cardNumberRequired || required(value);
      },
    },
  },
  methods: {
    emitValue() {
      if (this.changeable) {
        this.$emit("input", { number: this.number, holder: this.holder, isValid: !this.$v.$invalid });
      }
    }
  },
  watch: {
    holder() {
      this.emitValue();
    },
    number() {
      this.emitValue();
    },
  },
};
</script>