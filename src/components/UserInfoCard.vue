<template>
  <div class="popup-user" :class="classes">
    <div class="popup-user__top">
      <TableUserInfo classes="td-inner" :user="user"/>
      <a
        v-if="getLoggedIn && !isMyAccount"
        href="#"
        class="popup-user__favorite"
        @click="toggleFavourite(user._id)"
      >
        <span class="icon-star" :class="{ active: isFavourite }"></span>
      </a>
    </div>
    <div class="popup-user__cont">
      <ul class="popup-user__list">
        <li>
          <div class="popup-user__ach">{{ user.deals }}</div>
          <div class="popup-text">
            Количество
            <br/>сделок
          </div>
        </li>
        <li>
          <div class="popup-user__ach">{{ dealsVolumes }}</div>
          <div class="popup-text">
            Сумма
            <br/>сделок
          </div>
        </li>
        <li>
          <div class="popup-user__ach">{{ user.disputeDefeats }}</div>
          <div class="popup-text">
            Поражений
            <br/>в спорах
          </div>
        </li>
        <li>
          <div class="popup-user__ach">{{ user.dealsCancelled }}</div>
          <div class="popup-text">
            Отмененных
            <br/>сделок
          </div>
        </li>
        <li>
          <div class="popup-user__ach">{{ user.disputes }}</div>
          <div class="popup-text">
            Количество
            <br/>споров
          </div>
        </li>
        <li>
          <div class="popup-user__ach">{{ reactionSpeedText }}</div>
          <div class="popup-text">
            Скорость
            <br/>реакции
          </div>
        </li>
      </ul>
      <a
        v-if="getLoggedIn && !isMyAccount"
        href="#"
        class="popup-user__blocking"
        :class="{ 'popup-user__blocking_active': isBlocked }"
        @click="changeUserBlockStatus(user._id)"
      >
        <div class="popup-user__icon">
          <span :class="`icon-block-icon${isBlocked ? '_active' : ''}`"></span>
        </div>
        <div class="popup-user__blocking-text">{{ isBlocked
          ? 'Разблокировать пользователя'
          : 'Блокировать пользователя' }}
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import config from '../config';

export default {
  components: {
    TableUserInfo: () => import('@/components/TableUserInfo'),
  },
  props: {
    classes: {
      type: String
    },
    user: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      disableStar: false,
      disableLock: false
    };
  },
  computed: {
    ...mapGetters(['getMyAddress', 'getLoggedIn', 'favouriteUsers', 'blockedUsers', 'getTickers']),
    isMyAccount() {
      return this.getMyAddress === this.user.account
    },
    isFavourite() {
      return this.favouriteUsers.includes(this.user._id);
    },
    isBlocked(){
      return this.blockedUsers.includes(this.user._id);
    },
    reactionSpeedText() {
      return config.reactionSpeedTexts[this.user.reactionSpeed] || '-';
    },
    dealsVolumes() {
      const { eth, btc, usdt} = this.user.dealsVolumes;
      const { 'ETHUSDT': ethPrice, 'BTCUSDT': btcPrice }  = this.getTickers;
      const volume = usdt + eth * ethPrice + btc * btcPrice;
      return `$${volume.toFixed(2)}`;
    }
  },
  methods: {
    ...mapActions(['removeFavorite', 'addFavorite',
      'addBlockUser', 'changeBlocked', 'changeFavorite']),
    async changeUserBlockStatus(blockedId) {
      if (this.disableLock) return;
      this.disableLock = true
      try {
        await this.changeBlocked({ blockedId, action: this.isBlocked ? 'remove' : 'add' });
      } catch (e) {
        console.log(e);
      }
      this.disableLock = false
    },
    async toggleFavourite(favoriteId) {
      if (this.disableStar) return;
      this.disableStar = true
      try {
        await this.changeFavorite({ favoriteId, action: this.isFavourite ? 'remove' : 'add' });
      } catch (e) {
        console.log(e);
      }
      this.disableStar = false
    }
  }
};
</script>