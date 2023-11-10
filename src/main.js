import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/stylus/index.styl";
import moment from "moment";
import Vuelidate from "vuelidate";
import VueYoutube from "vue-youtube";
import VueMask from "v-mask";

Vue.use(VueMask);
Vue.use(Vuelidate);
Vue.use(VueYoutube);

moment.locale("ru");
Vue.prototype.moment = moment;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
