<template>
  <li class="detail__item">
    <div class="detail-top">
      <div class="detail-icon">
        <span class="icon-credit_card_icon"></span>
      </div>
      <h3>{{ !isFiatPayer && changeable ? 'Укажите реквизиты' : 'Реквизиты' }}</h3>
    </div>
    <div v-if="!noDetails || changeable">
      <payment-details v-model="paymentDetails" :method="method" :changeable="changeable" />
      <div class="popup-btn" v-if="changeable">
        <a href="#" class="btn" :class="{disabled: !value.isValid}" @click.prevent="onSetDetails">Задать реквизиты</a>
      </div>
      <div class="popup-btn" v-else-if="onCommit">
        <a href="#" class="btn" @click.prevent="onCommit">Перевести {{ currency }}</a>
      </div>
      <div class="popup-btn" v-else-if="onMePaid">
        <a href="#" class="btn" @click.prevent="onMePaid">Я заплатил</a>
      </div>
    </div>
    <div v-else>Ожидаем реквизиты от продавца</div>
  </li>
</template>

<script>
import PaymentDetails from "@/components/PaymentDetails";

export default {
  components: {
    PaymentDetails
  },
  props: {
    onCommit: {
      type: Function,
      required: false,
    },
    onMePaid: {
      type: Function,
      required: false,
    },
    onSetDetails: {
      type: Function,
      required: false,
    },
    typeIsBuy: {
      type: Boolean,
      required: false,
    },
    isFiatPayer: {
      type: Boolean,
      required: false,
    },
    method: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    changeable: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    paymentDetails: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    noDetails() {
      return (Object.keys(this.paymentDetails).length === 0);
    },
  },
};
</script>