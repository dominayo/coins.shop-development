<template>
  <div>
    <section class="section section-balance section-balance_decor">
      <div class="wrapper">
        <div class="history-row" :class="{ 'history-row_mod': downloadButton }">
          <h2>История</h2>
          <ul class="nav-tab-list">
            <li
              class="nav-tab-list__item"
              :class="{ active: item.key === currentFilter }"
              v-for="(item, index) in filters"
              :key="index"
            >
              <a
                href="#"
                class="nav-tab-list__link"
                @click.prevent="currentFilter = item.key"
              >{{ item.text }}</a>
            </li>
          </ul>
          <template v-if="downloadButton">
            <a href="#" class="btn btn_flex btn_border">
              <span>Скачать отчет</span>
              <span class="icon-file_download"></span>
            </a>
          </template>
        </div>
        <div class="table history-table">
          <div class="table-row table-head">
            <div class="th" v-for="(item, index) in headers" :key="index">{{ item }}</div>
          </div>
          <div class="table-row" v-for="(item, index) in itemsPage" :key="index">
            <div class="td">
              <!-- Статус -->
              <div class="td-inner">
                <div class="status" :class="item.status">
                  <div class="status-title">{{ statuses[item.status] }}</div>
                </div>
              </div>
            </div>
            <div class="td">
              <!-- Дата -->
              <div class="td-inner">
                <div class="deals-time">{{ moment(item.time).format("DD.MM - HH:mm") }}</div>
              </div>
            </div>
            <div class="td">
              <!-- Криптовалюта -->
              <div class="td-inner">
                <crypto-icon :currency="item.currency" small />
              </div>
            </div>
            <div class="td">
              <!-- Информация -->
              <div class="td-inner">
                <div class="history-code">{{ item.info }}</div>
              </div>
            </div>
            <div class="td">
              <!-- Сумма -->
              <div class="td-inner">
                <div class="type-icon type-icon_accept" v-if="item.type === 'deposit'">
                  <span class="icon-price-down"></span>
                </div>
                <div class="type-icon type-icon_give" v-if="item.type === 'withdraw'">
                  <span class="icon-price-up"></span>
                </div>
                <div class="type-icon type-icon_refresh" v-if="item.type === 'convert'">
                  <span class="icon-synchronization"></span>
                </div>
                <div class="type">{{ item.amount }}</div>
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
import _ from "lodash";
import { mapGetters } from "vuex";
import TablePagination from "@/components/TablePagination";
import CryptoIcon from "@/components/CryptoIcon";
import { pagination } from "@/mixins/table";

export default {
  mixins: [pagination],
  props: {
    downloadButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    TablePagination,
    CryptoIcon
  },
  data() {
    return {
      statuses: {
        await: "В процессе",
        success: "Выполнено",
        cancel: "Отказано"
      },
      filters: [
        { text: "Все", key: "all" },
        { text: "Пополнение", key: "deposit" },
        { text: "Вывод", key: "withdraw" },
        { text: "Конвертация", key: "convert" }
      ],
      currentFilter: "all",
      headers: ["Статус", "Дата", "Криптовалюта", "Информация", "Сумма"]
    };
  },
  computed: {
    ...mapGetters(["getWalletHistory"]),
    filteredItems() {
      return _.filter(this.getWalletHistory, item => {
        return this.currentFilter === "all"
          ? true
          : item.type === this.currentFilter;
      });
    },
    items() {
      return _.slice(
        this.filteredItems,
        this.perPage * (this.pageNumber - 1),
        this.perPage * this.pageNumber
      );
    }
  },
  methods: {}
};
</script>