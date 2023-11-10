<template>
  <div :class="classes">
    <div class="crypto-icon" :class="{ 'crypto-icon_small': small }">
      <span class="icon-bitcoin" v-if="currency === 'btc'"></span>
      <span class="icon-ethereum" v-if="currency === 'eth'">
        <span class="path1"></span>
        <span class="path2"></span>
        <span class="path3"></span>
        <span class="path4"></span>
        <span class="path5"></span>
        <span class="path6"></span>
      </span>
      <span class="icon-tether" v-if="currency === 'usdt'">
        <span class="path1"></span>
        <span class="path2"></span>
      </span>
    </div>
    <div v-if="!full">{{ captions[currency] }}</div>
    <div v-else>{{ fullCaptions[currency] }}</div>
  </div>
</template>

<script>
export default {
  props: {
    currency: {
      type: String,
      default: "btc"
    },
    small: {
      type: Boolean,
      default: false
    },
    full: {
      type: Boolean,
      default: false
    },
    classes: {
      type: String,
      default: "crypto"
    }
  },
  data() {
    return {
      captions: {
        btc: "BTC",
        eth: "ETH",
        usdt: "USDT"
      },
      fullCaptions: {
        btc: "BTC - Bitcoin",
        eth: "ETH - Ethereum",
        usdt: "USDT - Tether"
      }
    };
  }
};
</script>