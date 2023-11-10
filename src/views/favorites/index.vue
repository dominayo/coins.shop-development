<template>
  <main class="main" :class="{ change: square }">
    <favorites-popup :user="currentUser" v-model="popup" v-if="popup" />
    <section class="section section-balance_decor">
      <div class="wrapper">
        <div class="history-row history-row_mb history-row_adapt">
          <h2>Избранные</h2>
          <ul class="change-form__list">
            <li class="change-form__item" :class="{ active: square }">
              <a href="#" class="change-form__link js-change-form" @click.prevent="square = true">
                <div class="change-form__figure">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
            </li>
            <li class="change-form__item" :class="{ active: !square }">
              <a href="#" class="change-form__link js-change-form" @click.prevent="square = false">
                <div class="change-form__figure">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <ul class="favorite__list">
          <li class="favorite__item" v-for="(item, index) in itemsPage" :key="index">
            <div class="favorite-box">
              <div
                class="user-name"
                :class="{ 'user-name_varif': item.verified }"
                @click.stop="showUserInfo(item)"
                style="cursor: pointer"
              >{{ item.name }}</div>
            </div>
            <div class="favorite-box">
              <div class="status" :class="{ success: item.online, absent: !item.online }">
                <div class="status-title">{{ status(item) }}</div>
              </div>
            </div>
            <div class="favorite-box">
              <div class="st-deposit">
                <div class="st-deposit-progress">
                  <div
                    class="st-deposit-percent"
                    :class="{ negative: item.rating < 0}"
                    :style="`width: ${ progressWidth(item.rating) }%`"
                  ></div>
                </div>
                <div class="st-deposit-pluse">{{ numWithSigh(item.rating) }}</div>
              </div>
            </div>
            <div class="favorite-box">
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
          </li>
        </ul>
      </div>
    </section>
    <section class="section section-pagination section-pagination_mod">
      <div class="wrapper">
        <table-pagination
          :length="pagesNumber"
          v-model="pageNumber"
          :perPage="perPage"
          @perPageChange="perPageChanged"
          @load="() => null"
        />
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import FavoritesPopup from "./popup";
import TablePagination from "@/components/TablePagination";
import { pagination } from "@/mixins/table";

export default {
  mixins: [pagination],
  components: {
    FavoritesPopup,
    TablePagination
  },
  data() {
    return {
      popup: false,
      square: false,
      currentUser: {}
    };
  },
  computed: {
    ...mapGetters(["getFavorites"]),
    items() {
      return this.getFavorites;
    }
  },
  methods: {
    status(user) {
      if (user.online) {
        return "Online";
      } else if (user.lastSeen) {
        return user.lastSeen;
      } else {
        return "Offline";
      }
    },
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
    showUserInfo(user) {
      this.currentUser = user;
      this.popup = true;
    }
  }
};
</script>
