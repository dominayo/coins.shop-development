<template>
  <section class="section section-qr">
    <div class="wrapper">
      <div class="qr-block">
        <div class="qr-left">
          <h2>Пополнить баланс</h2>
          <ul class="balance-crypto__list">
            <li
              class="balance-crypto__item"
              :class="{ active: item === currency }"
              v-for="(item, index) in currencies"
              :key="index"
              @click.prevent="currency = item"
            >
              <a href="#">
                <crypto-icon :currency="item" full classes="balance-crypto__link" />
              </a>
            </li>
          </ul>
          <ul class="balance-crypto__cont">
            <li>
              <div>Баланс</div>
              <div>{{ getBalances[currency].balance.all }}</div>
            </li>
            <li>
              <div>В сделках</div>
              <div>{{ getBalances[currency].balance.deals }}</div>
            </li>
            <li>
              <div>Доступный баланс</div>
              <div>{{ getBalances[currency].balance.available }}</div>
            </li>
          </ul>
          <div class="balance-crypto__adrress">
            <div class="balance-crypto__input-wrap">
              <div class="balance-crypto__input">
                <label for="balanceCrypto" class="text">{{ caption[currency] }} Адрес</label>
                <input type="text" :value="getBalances[currency].depositAddress" id="balanceCrypto" />
              </div>
            </div>
            <div class="balance-crypto__small-text">
              Отправляйте только {{ caption[currency] }} на этот адрес для депозита.
              <br />Отправка
              монеты или токена,
              кроме {{ caption[currency] }} по этому адресу может привести к потере вашего депозита.
            </div>
          </div>
        </div>
        <div class="qr-right">
          <h2>QR Код</h2>
          <div class="qr-pic">
            <img src="@/img/main/qr-code.jpg" alt="img" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import CryptoIcon from "@/components/CryptoIcon";

export default {
  components: {
    CryptoIcon
  },
  data() {
    return {
      currency: "btc",
      currencies: ["btc", "eth"],
      caption: {
        btc: "BTC",
        eth: "ETH"
      }
    };
  },
  computed: {
    ...mapGetters(["getBalances"])
  }
};
</script>
