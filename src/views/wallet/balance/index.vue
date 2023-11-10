<template>
  <section class="section section-balance section-balance_mb">
    <div class="wrapper">
      <h2>Баланс</h2>
      <div class="table balance-table">
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
          v-for="(item, name, index) in getBalances"
          :key="index"
        >
          <div class="td">
            <!-- Криптовалюта -->
            <div class="td-inner">
              <crypto-icon
                :currency="item.currency"
                full
              />
            </div>
          </div>
          <div class="td">
            <!-- Баланс -->
            <div class="td-inner">
              <div class="balance">{{ item.balance.all }}</div>
            </div>
          </div>
          <div class="td">
            <!-- Доступный баланс -->
            <div class="td-inner">
              <div class="balance-available">{{ item.balance.available }}</div>
            </div>
          </div>
          <div class="td">
            <!-- В сделках -->
            <div class="td-inner">
              <div class="balance-deal">{{ item.balance.deals }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import CryptoIcon from '@/components/CryptoIcon';

export default {
  components: {
    CryptoIcon,
  },
  data: () => ({
    headers: ['Криптовалюта', 'Баланс', 'Доступный баланс', 'В сделках'],
  }),
  computed: {
    ...mapGetters(['getBalances']),
  },
};
</script>
