<template>
  <div>
    <ads-create-popup v-model="popup" :startData="editItem" :isNew="false" />
    <section class="section section-barter">
      <div class="wrapper">
        <h2>Мои объявления</h2>
        <div class="table barter-table barter-table_mod">
          <div class="table-row table-head">
            <div class="th" v-for="(item, index) in headers" :key="index">{{ item }}</div>
          </div>
          <div class="table-row" v-for="(item, index) in itemsPage" :key="index">
            <div class="td">
              <!-- Тип -->
              <div class="td-inner">
                <div class="type-icon type-icon_give">
                  <span :class="`icon-price-${ item.type === 'sell' ? 'up' : 'down' }`"></span>
                </div>
                <div
                  class="type"
                >{{ item.type === 'sell' ? `Отдаю ${item.currency.toUpperCase()}` : `Получаю ${item.currency.toUpperCase()}` }}</div>
              </div>
            </div>
            <div class="td">
              <!-- Способ оплаты (BTC) -->
              <div class="td-inner">
                <payment-pic classes="td-inner" :method="item.direction" />
              </div>
            </div>
            <div class="td">
              <!-- Курс (RUB/BTC) -->
              <div class="td-inner">
                <div class="course">{{ item.rateText }}</div>
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
                <ul class="control__list">
                  <li>
                    <input
                      type="checkbox"
                      class="checkbox"
                      :id="`checkbox_${item._id}`"
                      :checked="item.isOpen"
                      @click.prevent.stop="toggleVisibility(item)"
                    />
                    <label :for="`checkbox_${item._id}`" />
                  </li>
                  <li class="control__item">
                    <a href="#" class="control__link" @click.prevent.stop="startEdit(item)">
                      <span class="icon-edit">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                      </span>
                    </a>
                  </li>
                  <li class="control__item">
                    <a href="#" class="control__link" @click.prevent.stop="archiveItem(item)">
                      <span class="icon-delete">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                        <span class="path4"></span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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
  </div>
</template>

<script>
// import _ from "lodash";
import { mapGetters, mapActions } from "vuex";
import PaymentPic from "@/components/PaymentPic";
import TablePagination from "@/components/TablePagination";
import { pagination } from "@/mixins/table";
import AdsCreatePopup from "@/components/AdsCreatePopup";

export default {
  mixins: [pagination],
  components: {
    PaymentPic,
    TablePagination,
    AdsCreatePopup,
  },
  data() {
    return {
      headers: ["Тип", "Способ оплаты", "Курс", "Лимиты"],
      popup: false,
      editItem: {},
    };
  },
  computed: {
    ...mapGetters(["getLoggedIn", "getMyAds"]),
    items() {
      return this.getMyAds;
    },
  },
  methods: {
    ...mapActions(["sendSignedRequest"]),
    startEdit(item) {
      this.popup = true;
      this.editItem = item;
    },
    archiveItem(item) {
      const serialized = {
        text: "Перенести в архив",
        model: "ad",
        action: "archive",
        id: item._id,
      };
      this.sendSignedRequest(serialized);
    },
    toggleVisibility(item) {
      const serialized = {
        text: !item.isOpen ? "Показать" : "Спрятать",
        model: "ad",
        action: "setIsOpen",
        id: item._id,
        value: !item.isOpen,
      };
      this.sendSignedRequest(serialized);
    },
  },
};
</script>

<style lang="stylus" scoped>
  li {
    display: flex
  }
</style>
