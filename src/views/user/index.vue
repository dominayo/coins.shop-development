<template>
  <main class="main">
    <ads-create-popup v-model="popup" />
    <section class="section section-advert">
      <div class="wrapper">
        <div class="advert-row">
          <ul class="advert__list">
            <router-link :to="{ name: 'user.ads'}" v-slot="{ href, route, navigate, isActive }">
              <li class="advert__item" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <span :data-count="getAds.length">Доска объявлений</span>
                </a>
              </li>
            </router-link>
            <router-link :to="{ name: 'user.deals'}" v-slot="{ href, route, navigate, isActive }">
              <li class="advert__item" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <span :data-count="getContacts.length">Сделки</span>
                </a>
              </li>
            </router-link>
            <router-link :to="{ name: 'user.myAds'}" v-slot="{ href, route, navigate, isActive }">
              <li class="advert__item" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <span :data-count="getMyAds.length">Мои объявления</span>
                </a>
              </li>
            </router-link>
          </ul>
          <a href="#" class="btn btn_flex btn_pluse" @click.prevent.stop="popup = true">
            <span class="icon-pluse"></span>
            <span>Создать объявление</span>
          </a>
        </div>
      </div>
    </section>

    <router-view />
  </main>
</template>

<script>
import AdsCreatePopup from "@/components/AdsCreatePopup";
import { mapGetters } from "vuex";

export default {
  components: {
    AdsCreatePopup
  },
  data() {
    return {
      popup: false
    };
  },
  computed: {
    ...mapGetters(["getLoggedIn", "getAds", "getMyAds", "getContacts"])
  }
};
</script>
