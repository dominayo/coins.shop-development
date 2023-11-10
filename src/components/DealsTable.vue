<template>
  <main class="main">
    <section class="section section-deals">
      <div class="wrapper">
        <div class="deals-wrap">
          <h2>Сделки</h2>
          <base-select v-model="activeDeal" :items="dealsList" />
        </div>
        <div class="table deals-table">
          <div class="table-row table-head">
            <div class="th" v-for="(item, index) in headers" :key="index">{{ item }}</div>
          </div>
          <deals-table-item v-for="(item, index) in itemsPage" :item="item" :key="index" />
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
  </main>
</template>

<script>
// import _ from "lodash";
import { mapGetters } from "vuex";
import BaseSelect from "@/components/BaseSelect";
import TablePagination from "@/components/TablePagination";
import DealsTableItem from "@/components/DealsTableItem";
import { pagination, toggle } from "@/mixins/table";

export default {
  mixins: [pagination, toggle],
  components: {
    BaseSelect,
    TablePagination,
    DealsTableItem
  },
  data() {
    return {
      activeDeal: { text: "Все сделки", value: "all" },
      headers: [
        "Начало сделки",
        "Пользователь",
        "Способ оплаты (BTC)",
        "Операция",
        "Курс (RUB/BTC)",
        "Статус"
      ]
    };
  },
  computed: {
    ...mapGetters(["getLoggedIn", "getContacts"]),
    dealsList() {
      const list = Object.keys(this.getContacts).map((value, index) => {
        return { value, text: `Сделка ${index + 1}` };
      });
      list.push({ value: "all", text: "Все сделки" });
      return list;
    },
    items() {
      if (
        !this.activeDeal ||
        !this.activeDeal.value ||
        this.activeDeal.value === "all"
      ) {
        return this.getContacts;
      } else {
        const id = this.activeDeal.value;
        return {
          [id]: this.getContacts[id]
        };
      }
    }
  },
  methods: {}
};
</script>