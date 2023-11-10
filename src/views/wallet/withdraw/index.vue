<template>
  <section class="section section-qr">
    <div class="wrapper">
      <div class="qr-block qr-block_info">
        <div class="qr-left">
          <h2>Вывести деньги</h2>
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
          <div class="balance-crypto__adrress balance-crypto__adrress_mod">
            <div class="balance-crypto__input-wrap balance-crypto__input-wrap_mb">
              <div class="balance-crypto__input">
                <label for="balanceCrypto2" class="text">Адрес для вывода</label>
                <input type="text" id="balanceCrypto2" />
              </div>
              <div class="balance-crypto__input">
                <label for="balanceCrypto3" class="text">Сумма</label>
                <input type="text" id="balanceCrypto3" />
              </div>
            </div>
            <a href="#" class="btn">Вывести</a>
            <div class="balance-crypto__small-text center">Минимальная сумма вывода: {{ minAmount[currency] }}</div>
          </div>
        </div>
        <div class="qr-right">
          <a href="#" class="qr-info">
            <span class="icon-info"></span>
          </a>
          <div class="qr-text">
            <p>
              Теперь вы можете покупать, продавать и обменивать биткойны, Ethereum и более 20+ различных криптовалют в
              любом месте
            </p>
            <p>
              В любое время, с кем угодно, используя более 250 различных методов оплаты в более чем 190 странах мира,
              без необходимости проходить KYC.
            </p>
            <p>
              Теперь вы можете покупать, продавать и обменивать биткойны, Ethereum и более 20+ различных криптовалют в
              любом месте
            </p>
            <div class="qr-commission">
              <div class="text">Комиссия за транзакцию:</div>
              <div class="text text_color">{{ fee }} {{ captions[currency] }}</div>
            </div>
            <div class="qr-commission qr-commission_no-mb">
              <div class="text">Вы получите:</div>
              <div class="text text_color">{{ amount }} {{ captions[currency] }}</div>
            </div>
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
      currencies: ["btc", "eth", "usdt"],
      minAmount: {
        btc: "0.00100000",
        eth: "0.0100000",
        usdt: "1"
      },
      captions: {
        btc: "BTC",
        eth: "ETH",
        usdt: "USDT"
      },
      fee: "0.0005",
      amount: "0.00000000"
    };
  },
  computed: {
    ...mapGetters(["getBalances"])
  }
};
</script>
