<template>
  <popup :active="active" @close="$emit('close', $event)" classes="window-open_design" closeButton>
    <ads-start-popup v-model="startDealPopup" v-if="startDealPopup" :ad="currentAd" />
    <div class="popup-design__top">
      <div class="popup-design-box">
        <div class="user-name" :class="{ 'user-name_varif': user.verified }">{{ user.name }}</div>
      </div>
      <div class="popup-design-box">
        <div class="status" :class="{ success: user.online, absent: !user.online }">
          <div class="status-title">{{ status(user) }}</div>
        </div>
      </div>
      <div class="popup-design-box">
        <div class="st-deposit">
          <div class="st-deposit-progress">
            <div
              class="st-deposit-percent"
              :class="{ negative: user.rating < 0}"
              :style="`width: ${ progressWidth(user.rating) }%`"
            ></div>
          </div>
          <div class="st-deposit-pluse">{{ numWithSigh(user.rating) }}</div>
        </div>
      </div>
      <div class="popup-design-box">
        <div class="control__item">
          <a href="#" class="control__link">
            <span class="icon-delete">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
            </span>
          </a>
        </div>
      </div>
    </div>
    <div class="st-profile__achievements">
      <ul class="st-profile__list">
        <li class="st-profile__item">
          <div class="st-profile__count">{{ user.dealsAmount }}</div>
          <div class="st-profile__text">
            Количество
            <br />сделок
          </div>
        </li>
        <li class="st-profile__item">
          <div class="st-profile__count">{{ user.dealsVol }}</div>
          <div class="st-profile__text">
            Сумма
            <br />сделок
          </div>
        </li>
        <li class="st-profile__item">
          <div class="st-profile__count">{{ user.disputesDefeats }}</div>
          <div class="st-profile__text">
            Поражений
            <br />в спорах
          </div>
        </li>
        <li class="st-profile__item">
          <div class="st-profile__count">{{ user.dealsCancel }}</div>
          <div class="st-profile__text">
            Отмененных
            <br />сделок
          </div>
        </li>
        <li class="st-profile__item">
          <div class="st-profile__count">{{ user.disputeAmount }}</div>
          <div class="st-profile__text">
            Количество
            <br />споров
          </div>
        </li>
        <li class="st-profile__item">
          <div class="st-profile__count">{{ user.reaction }}</div>
          <div class="st-profile__text">
            Скорость
            <br />реакции
          </div>
        </li>
      </ul>
    </div>
    <h3>Активные объявления</h3>
    <div class="table barter-table barter-table_mod2">
      <div class="table-row table-head">
        <div class="th">Способ оплаты</div>
        <div class="th">Курс</div>
        <div class="th">Лимиты</div>
      </div>
      <div class="table-row" v-for="(item, index) in items" :key="index">
        <div class="td">
          <!-- Способ оплаты (BTC) -->
          <payment-pic classes="td-inner" :method="item.paymentMethod" />
        </div>
        <div class="td">
          <!-- Курс (RUB/BTC) -->
          <div class="td-inner">
            <div class="course course_decor">{{ item.rate }}</div>
          </div>
        </div>
        <div class="td">
          <!-- Лимиты (RUB) -->
          <div class="td-inner">
            <div class="limits">{{ item.limits.min }} - {{ item.limits.max }}</div>
          </div>
        </div>
        <div class="td">
          <div class="td-inner">
            <a
              href="#"
              class="btn btn_border"
              @click.prevent.stop="showAdsStartPopup(item)"
            >Начать сделку</a>
          </div>
        </div>
      </div>
    </div>
  </popup>
</template>

<script>
import { mapGetters } from "vuex";
import Popup from "@/components/Popup";
import PaymentPic from "@/components/PaymentPic";
import AdsStartPopup from "@/components/AdsStartPopup";

export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Popup,
    PaymentPic,
    AdsStartPopup
  },
  model: {
    prop: "active",
    event: "close"
  },
  data() {
    return {
      popup: true,
      startDealPopup: false,
      currentAd: {}
    };
  },
  computed: {
    ...mapGetters(["getAdsByUser"]),
    items() {
      return this.getAdsByUser(this.user.id);
    }
  },
  methods: {
    numWithSigh(n) {
      if (n < 0) {
        return `-${n}`;
      } else if (n > 0) {
        return `+${n}`;
      } else {
        return `${n}`;
      }
    },
    progressWidth(n) {
      if (n < -100) return 0;
      if (n > 100) return 100;
      return Math.round(n / 2 + 50);
    },
    status(user) {
      if (user.online) {
        return "Online";
        // } else if (user.lastSeen) {
        //   return user.lastSeen;
      } else {
        return "Offline";
      }
    },
    showAdsStartPopup(ad) {
      this.currentAd = ad;
      this.startDealPopup = true;
    }
  }
};
</script>
