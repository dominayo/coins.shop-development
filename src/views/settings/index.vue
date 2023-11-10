<template>
  <main class="main">
    <section class="section section-settings">
      <div class="wrapper">
        <div class="settings-row">
          <h2>Настройки</h2>
          <ul class="advert__list advert__list_mod">
            <router-link :to="{ name: 'settings.profile' }" v-slot="{ href, route, navigate, isActive }">
              <li class="advert__item" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <span>Профиль</span>
                </a>
              </li>
            </router-link>
            <!--<router-link :to="{ name: 'settings.gateway' }" v-slot="{ href, route, navigate, isActive }">
              <li class="advert__item" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <span>Выбор шлюза</span>
                </a>
              </li>
            </router-link>-->
            <router-link :to="{ name: 'settings.verification' }" v-slot="{ href, route, navigate, isActive }">
              <li class="advert__item notife" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <span>Верификация</span>
                </a>
              </li>
            </router-link>
            <router-link v-if="isProUser" :to="{ name: 'settings.pro' }" v-slot="{ href, route, navigate, isActive }">
              <li class="advert__item advert__item_drop pro" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <small>Pro</small>
                  <span>Настройки</span>
                </a>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
    </section>
    <router-view/>
  </main>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters(['isProUser']),
    },
    methods: {}
  };
</script>