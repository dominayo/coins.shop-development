<template>
  <div>
    <section class="section section-advert section-advert_mod-p">
      <div class="wrapper">
        <div class="advert-row">
          <ul class="advert__list advert__list_mod">
<!--            <router-link :to="{ name: 'settings.pro.borrow' }" v-slot="{ href, route, navigate, isActive }">
              <li class="advert__item" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <span>Залог</span>
                </a>
              </li>
            </router-link>-->
<!--            <router-link :to="{ name: 'settings.pro.verification' }" v-slot="{ href, route, navigate, isActive }">
              <li class="advert__item" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <span>Верификация</span>
                </a>
              </li>
            </router-link>-->
<!--            <router-link :to="{ name: 'settings.pro.gateway' }" v-slot="{ href, route, navigate, isActive }">
              <li class="advert__item" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <span>Как запустить шлюз ВТС</span>
                </a>
              </li>
            </router-link>-->
            <router-link :to="{ name: 'settings.pro.disputes' }" v-slot="{ href, route, navigate, isActive }">
              <li class="advert__item" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <span>Споры</span>
                </a>
              </li>
            </router-link>
            <router-link :to="{ name: 'settings.pro.disputesHistory' }" v-slot="{ href, route, navigate, isActive }">
              <li class="advert__item" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <span>История споров</span>
                </a>
              </li>
            </router-link>
<!--            <router-link :to="{ name: 'settings.pro.history' }" v-slot="{ href, route, navigate, isActive }">
              <li class="advert__item" :class="{ active: isActive }">
                <a :href="href" @click="navigate" class="advert__link">
                  <span>История операций</span>
                </a>
              </li>
            </router-link>-->
          </ul>
        </div>
      </div>
    </section>
    <router-view />
  </div>
</template>
