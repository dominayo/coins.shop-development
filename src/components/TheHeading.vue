<template>
  <header class="header header-1">
    <div class="wrapper">
      <div class="header-wrap">
        <router-link :to="{ name: 'home' }">
          <TheLogo />
        </router-link>
        <div class="menu">
          <div class="site-theme" @click.prevent="toggleNight">
            <div class="site-theme__elem site-theme__elem_day">
              <input
                type="radio"
                class="theme"
                name="theme"
                id="theme"
                value="day"
                :checked="!getNight"
              />
              <label for="theme"></label>
            </div>
            <div class="site-theme__elem site-theme__elem_night">
              <input
                type="radio"
                class="theme"
                name="theme"
                value="night"
                id="theme2"
                :checked="getNight"
              />
              <label for="theme2"></label>
            </div>
          </div>
          <div class="wiki-help">
            <a href="#" class="wiki-link">
              <span class="wiki-icon">?</span>
              <span>Wiki (помощь)</span>
            </a>
          </div>
          <template v-if="getLoggedIn">
            <div
              class="cash-down"
              v-click-outside="() => hideDropdown('cashback')"
            >
              <SoonOverlay />
              <div class="cash-text">Кэшбек</div>
              <div class="cash-point" :class="{ active: dropdowns.cashback }">
                <a
                  href="#"
                  class="cash-point-title"
                  @click="toggleDropdown('cashback')"
                  >{{ getCashbackHistory[0].amount || "0" }} USD</a
                >
                <div class="cash-point-cont cash-point-cont_1">
                  <ul>
                    <li
                      v-for="(item, index) in getCashbackHistory"
                      :key="index"
                    >
                      <a href="#" @click.prevent>
                        <div class="cash-point-pic">
                          <span
                            :class="
                              `icon-price-${item.type === 'in' ? 'down' : 'up'}`
                            "
                          ></span>
                        </div>
                        <div class="cash-point-price">
                          <div class="cash-point-price__count">
                            {{ item.amount }} USD
                          </div>
                          <div class="cash-point-price__time">
                            {{ moment(item.time).format("DD.MM - HH:mm") }}
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <router-link
                    :to="{ name: 'affiliate' }"
                    v-slot="{ href, navigate }"
                  >
                    <a
                      :href="href"
                      @click="hideDropdownCb('cashback', navigate, $event)"
                      class="btn btn_border"
                      >Аффилиат</a
                    >
                  </router-link>
                </div>
              </div>
            </div>
            <div
              class="cash-down cash-down_mod cash-down_mr"
              v-click-outside="() => hideDropdown('balance')"
            >
              <div class="cash-text">Баланс</div>
              <div class="cash-point" :class="{ active: dropdowns.balance }">
                <a
                  href="#"
                  class="cash-point-title"
                  @click="toggleDropdown('balance')"
                  >{{ getBalances.total }} USD</a
                >
                <div class="cash-point-cont cash-point-cont_2">
                  <ul>
                    <li>
                      <a href="#" @click.prevent>
                        <div class="cash-point-pic cash-point-pic_mod">
                          <span class="icon-bitcoin"></span>
                        </div>
                        <div class="cash-point-price">
                          <div class="cash-point-price__count">
                            {{ getBalances.btc.balance.all }} BTC
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="cash-point-pic cash-point-pic_mod">
                          <span class="icon-ethereum">
                            <span class="path1"></span>
                            <span class="path2"></span>
                            <span class="path3"></span>
                            <span class="path4"></span>
                            <span class="path5"></span>
                            <span class="path6"></span>
                          </span>
                        </div>
                        <div class="cash-point-price">
                          <div class="cash-point-price__count">
                            {{ getBalances.eth.balance.all }} ETH
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="cash-point-pic cash-point-pic_mod">
                          <span class="icon-tether">
                            <span class="path1"></span>
                            <span class="path2"></span>
                          </span>
                        </div>
                        <div class="cash-point-price">
                          <div class="cash-point-price__count">
                            {{ getBalances.usdt.balance.all }} USDT
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <router-link
                    :to="{ name: 'wallet' }"
                    v-slot="{ href, navigate }"
                  >
                    <a
                      :href="href"
                      @click="hideDropdownCb('balance', navigate, $event)"
                      class="btn btn_border"
                      >Депозит</a
                    >
                  </router-link>
                </div>
              </div>
            </div>
            <div
              class="profile-block"
              :class="{ active: dropdowns.profile }"
              v-click-outside="() => hideDropdown('profile')"
            >
              <a
                href="#"
                class="profile-inner"
                @click.prevent="toggleDropdown('profile')"
              >
                <div class="profile-info">
                  <div class="profile-text">Профиль</div>
                  <div class="profile-name">{{ getUsername }}</div>
                </div>
                <div class="profile-avatar">
                  <div class="profile-pic">
                    <img src="@/img/main/profile.png" alt="avatar" />
                  </div>
                  <div class="profile-drop">
                    <div class="profile-down">
                      <span class="icon-to-arrow"></span>
                    </div>
                  </div>
                </div>
              </a>
              <div class="profile-cont">
                <div class="profile-varif" v-if="verificationAlert">
                  <a
                    href="#"
                    class="close-varif"
                    @click.prevent.stop="closeVerificationAlert"
                  >
                    <span class="icon-close"></span>
                  </a>
                  <span>Пройти верификацию</span>
                </div>
                <ul class="profile-user__list">
                  <router-link
                    :to="{ name: 'wallet' }"
                    v-slot="{ href, navigate }"
                  >
                    <li class="profile-user__item message">
                      <a
                        :href="href"
                        @click="hideDropdownCb('profile', navigate, $event)"
                        class="profile-user__link"
                      >
                        <span>Депозит</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    :to="{ name: 'affiliate' }"
                    v-slot="{ href, navigate }"
                  >
                    <li class="profile-user__item">
                      <a
                        :href="href"
                        @click="hideDropdownCb('profile', navigate, $event)"
                        class="profile-user__link"
                      >
                        <span>Аффилиат</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    :to="{ name: 'settings' }"
                    v-slot="{ href, navigate }"
                  >
                    <li class="profile-user__item">
                      <a
                        :href="href"
                        @click="hideDropdownCb('profile', navigate, $event)"
                        class="profile-user__link"
                      >
                        <span>Настройки</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    :to="{ name: 'history' }"
                    v-slot="{ href, navigate }"
                  >
                    <li class="profile-user__item">
                      <a
                        :href="href"
                        @click="hideDropdownCb('profile', navigate, $event)"
                        class="profile-user__link"
                      >
                        <span>История обменов</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    :to="{ name: 'favorites' }"
                    v-slot="{ href, navigate }"
                  >
                    <li class="profile-user__item">
                      <a
                        :href="href"
                        @click="hideDropdownCb('profile', navigate, $event)"
                        class="profile-user__link"
                      >
                        <span>Избранные</span>
                      </a>
                    </li>
                  </router-link>
                </ul>
                <a href="#" class="profile-user__out" @click.stop="logout">
                  <span class="icon-logout"></span>
                  <span>Выйти</span>
                </a>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="login">
              <BaseButton class="login__button" @click.stop="$emit('sign-in-button-click')"
                >Вход</BaseButton
              >
              <BaseButton class="login__button" @click.stop="$emit('sign-up-button-click')"
                >Регистрация</BaseButton
              >
            </div>
          </template>
        </div>
        <a href="#" class="js-menu menu-hamburger" @click.prevent="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import ClickOutside from "vue-click-outside";

import { mapGetters, mapMutations, mapActions } from "vuex";

import BaseButton from "@/components/BaseButton";
import TheLogo from "@/components/TheLogo";

export default {
  props: {},
  components: {
    TheLogo,
    SoonOverlay: () => import("./SoonOverlay"),
    BaseButton
  },
  data() {
    return {
      dropdowns: {
        cashback: false,
        balance: false,
        profile: false
      },
      verificationAlert: true
    };
  },
  directives: {
    ClickOutside
  },
  mounted() {},
  computed: {
    ...mapGetters([
      "getLoggedIn",
      "getNight",
      "getCashbackHistory",
      "getBalances",
      "getUsername"
    ])
  },
  methods: {
    ...mapMutations(["toggleNight", "toggleMenu"]),
    ...mapActions(["authLS", "authMetamask", "logout"]),
    hideDropdown(dropdown) {
      this.dropdowns[dropdown] = false;
    },
    hideDropdownCb(dropdown, cb, event) {
      this.dropdowns[dropdown] = false;
      cb(event);
    },
    toggleDropdown(dropdown) {
      this.dropdowns[dropdown] = !this.dropdowns[dropdown];
    },
    closeVerificationAlert() {
      this.verificationAlert = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.cash-down {
  position: relative;
}

.login {
  &__button:not(:last-child) {
    margin-right: 15px;
  }
}
</style>
