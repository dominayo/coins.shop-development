<template>
  <main class="main">
    <section class="section section-refferrals">
      <div class="wrapper">
        <div class="refferrals-wrap">
          <div class="refferrals-left">
            <div class="refferrals-alphabet">
              <h2>Аффилиат</h2>
              <div class="text">Аффилиат</div>
              <div class="alphabet-counts">
                <div>{{ data.balance.btc }} BTC</div>
                <div>{{ data.balance.btc }} ETH</div>
              </div>
              <a href="#" class="btn">Вывести деньги</a>
            </div>
            <a href="#" class="refferrals-link">
              <div class="refferrals-link__top">
                <span>Рефральная ссылка</span>
                <span class="icon-copy"></span>
              </div>
              <div class="reefferrals-link__code">{{ data.link }}</div>
            </a>
            <div class="refferrals-soc">
              <div class="text">Расшарить в соц. сети</div>
              <ul class="refferrals-soc__list">
                <li>
                  <a href="#" target="_blank" style="font-size: 18px;">
                    <span class="icon-facebook"></span>
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" style="font-size: 10px;">
                    <span class="icon-vk"></span>
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" style="font-size: 15px;">
                    <span class="icon-twitter"></span>
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" style="font-size: 20px;">
                    <span class="icon-instagram"></span>
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" style="font-size: 18px;">
                    <span class="icon-telegram"></span>
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" style="font-size: 18px;">
                    <span class="icon-whatsapp"></span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="refferrals-stats">
              <div class="text">Cтатистика</div>
              <ul class="refferrals-stats__list">
                <li>
                  <div class="refferrals-stats-wrap">
                    <div class="refferrals-stats__count">{{ data.statistics.refs }}</div>
                    <div class="refferrals-stats__text">Всего прямых рефералов</div>
                  </div>
                  <div class="refferrals-stats-wrap">
                    <div class="refferrals-stats__count">{{ data.statistics.amount }}$</div>
                    <div class="refferrals-stats__text">Заработанная сумма</div>
                  </div>
                </li>
                <li>
                  <div class="refferrals-stats-wrap">
                    <div class="refferrals-stats__count">{{ data.statistics.activeRefs }}</div>
                    <div class="refferrals-stats__text">Активные рефералы</div>
                  </div>
                  <div class="refferrals-stats-wrap">
                    <div class="refferrals-stats__count">{{ data.statistics.cashback }}$</div>
                    <div class="refferrals-stats__text">Cashback заработал</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="refferrals-right">
            <div class="refferrals-top">
              <div class="refferrals-box">
                <div class="refferrals-box__top">
                  <span class="icon-all_ref"></span>
                  <h3>Всего рефералов</h3>
                </div>
                <div class="chart">
                  <!-- <canvas id="myChart"></canvas> -->
                  <affiliate-chart cssClasses="chart" />
                </div>
              </div>
              <affiliate-operations :operations="data.operations" />
            </div>
            <div class="refferrals-bottom">
              <affiliate-refs :refs="data.refs" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import AffiliateChart from "./chart";
import AffiliateOperations from "./operations";
import AffiliateRefs from "./refs";

export default {
  components: {
    AffiliateChart,
    AffiliateOperations,
    AffiliateRefs
  },
  computed: {
    ...mapGetters(["getAffiliate"]),
    data() {
      return this.getAffiliate;
    }
  }
};
</script>
