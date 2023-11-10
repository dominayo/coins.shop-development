<template>
  <section class="section section-qr">
    <div class="wrapper">
      <div class="qr-block qr-block_info qr-block_convert">
        <div class="qr-left">
          <h2>Конвертировать</h2>
          <div class="balance-crypto__adrress balance-crypto__adrress_mod">
            <div class="balance-crypto__input-wrap balance-crypto__input-wrap_mb2">
              <div class="balance-crypto__input balance-crypto__input_mod">
                <label for="balanceCrypto2" class="text">Меняю</label>
                <input type="text" id="balanceCrypto2" :value="amountFrom" />
                <ul class="balance-crypto__list">
                  <li
                    class="balance-crypto__item"
                    :class="{ active: item === from }"
                    v-for="(item, index) in currencies"
                    :key="index"
                    @click.prevent="from = item"
                  >
                    <a href="#">
                      <crypto-icon :currency="item" classes="balance-crypto__link" />
                    </a>
                  </li>
                </ul>
                <div class="balance-crypto__small-text right">Вам доступно {{ getBalances[from].balance.available }} {{ captions[from] }}</div>
              </div>
              <div class="balance-crypto__input balance-crypto__input_mod">
                <label for="balanceCrypto3" class="text">На</label>
                <input type="text" id="balanceCrypto3" :value="amountTo" />
                <ul class="balance-crypto__list">
                  <li
                    class="balance-crypto__item"
                    :class="{ active: item === to }"
                    v-for="(item, index) in currencies"
                    :key="index"
                    @click.prevent="to = item"
                  >
                    <a href="#">
                      <crypto-icon :currency="item" classes="balance-crypto__link" />
                    </a>
                  </li>
                </ul>
                <div class="balance-crypto__small-text right">1 {{ captions[from] }} ~ {{ rate }} {{ captions[to] }}</div>
              </div>
            </div>
            <div class="balance-crypto__check">
              <input type="checkbox" class="checkbox" id="checkbox" />
              <label for="checkbox">С условиями обмена согласен</label>
            </div>
            <a href="#" class="btn">Вывести</a>
            <div class="balance-crypto__small-text center">Минимальная сумма вывода: {{ minAmount[from] }}</div>
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
            <p>
              В любое время, с кем угодно, используя более 250 различных методов оплаты в более чем 190 странах мира,
              без необходимости проходить KYC .
            </p>
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
      from: "btc",
      to: "usdt",
      currencies: ["btc", "eth", "usdt"],
      amountFrom: 0.01,
      amountTo: 125000,
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
      amount: "0.00000000",
      rate: 0.1
    };
  },
  computed: {
    ...mapGetters(["getBalances"])
  }
};
</script>
