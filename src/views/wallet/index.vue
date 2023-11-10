<template>
  <main class="main">
    <section class="section section-advert">
      <div class="wrapper">
        <div class="advert-row">
          <ul class="advert__list advert__list_mod">
            <router-link
              :to="{ name: 'wallet.balance'}"
              v-slot="{ href, route, navigate, isActive }"
            >
              <li class="advert__item" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <span>Баланс</span>
                </a>
              </li>
            </router-link>
            <router-link
              :to="{ name: 'wallet.deposit'}"
              v-slot="{ href, route, navigate, isActive }"
            >
              <li class="advert__item" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <span>Ввод</span>
                </a>
              </li>
            </router-link>
            <router-link
              :to="{name: 'wallet.withdraw'}"
              v-slot="{ href, route, navigate, isActive }"
            >
              <li class="advert__item" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <span>Вывод</span>
                </a>
              </li>
            </router-link>
          </ul>
          <!-- <router-link
            :to="{ name: 'wallet.convert' }"
            v-slot="{ href, route, navigate }"
          >
            <a
              :href="href"
              @click="navigate"
              class="convert-block"
            >
              <SoonOverlay
                classes="buttonOverlay"
              />
              <span>USDT</span>
              <span class="icon-convert"></span>
              <span>ETH/BTC</span>
            </a>
          </router-link> -->
          <div
            class="convert-block"
          >
            <SoonOverlay
              classes="buttonOverlay"
            />
            <span>USDT</span>
            <span class="icon-convert"></span>
            <span>ETH/BTC</span>
          </div>
        </div>
      </div>
    </section>

    <router-view />

    <wallet-history-table />
  </main>
</template>

<script>
export default {
  components: {
    WalletHistoryTable: () => import('@/components/WalletHistoryTable'),
    SoonOverlay: () => import('@/components/SoonOverlay'),
  }
};
</script>

<style>
.convert-block {
  position: relative;
  box-shadow: none !important;
  text-transform: none;
}
.buttonOverlay {
  border-radius: 15px;
}
</style>