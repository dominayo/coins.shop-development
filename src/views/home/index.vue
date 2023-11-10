<template>
  <main class="main">
    <section class="section section-head">
      <div class="wrapper">
        <div class="head-block">
          <h1>Биржа обмена криптовалют</h1>
          <p>Децентрализованная peer 2 peer биржа BTC, ETH на фиат. А также безопасный децентрализованный криптокошелек.</p>
          <a href="#" class="btn btn_flex btn_pluse"
             @click.prevent.stop="forceAuth('Для создания объявления Вы должны быть авторизованы.')">
            <span class="icon-pluse"></span>
            <span>Создать объявление</span>
          </a>
        </div>
        <transition name="component-fade" mode="out-in">
          <component @input="showVideo = $event" :is="view"></component>
        </transition>
      </div>
    </section>
    <AdsTable main />
  </main>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
import AdsTable from "@/components/AdsTable";
import MainPic from "./pic";
import MainVideo from "./video";

export default {
  components: {
    AdsTable,
    MainPic,
    MainVideo,
  },
  data() {
    return {
      popup: false,
      showVideo: false,
      view: "MainPic",
    };
  },
  computed: {
    ...mapGetters(["getLoggedIn"]),
  },
  watch: {
    getLoggedIn: {
      handler(value) {
        if (value) {
          this.$router.push({ name: "user" });
        }
      },
      immediate: true,
    },
    showVideo(value) {
      value ? (this.view = "MainVideo") : (this.view = "MainPic");
    },
  },
  methods: {
    ...mapActions(["forceAuth"]),
  },
};
</script>

<style scoped>
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: all 0.3s ease;
  }
  .component-fade-enter,
  .component-fade-leave-to {
    opacity: 0;
    transform: translate(10%, -50%);
  }
</style>
