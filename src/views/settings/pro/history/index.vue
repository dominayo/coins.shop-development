<template>
  <div>
    <section class="section section-deals">
      <div class="wrapper">
        <div class="table dispute-operations-table">
          <div class="table-row table-head">
            <div class="th" v-for="(item, index) in headers" :key="index">{{ item }}</div>
          </div>
          <div class="table-row" v-for="(item, index) in itemsPage" :key="index">
            <div class="td">
              <!-- № -->
              <div class="td-inner">{{ item.id }}</div>
            </div>
            <div class="td">
              <!-- Дата -->
              <div class="td-inner">{{ moment(item.time).format("DD.MM - HH:mm") }}</div>
            </div>
            <div class="td">
              <!-- Вид операции -->
              <div class="td-inner">{{ item.type }}</div>
            </div>
            <div class="td">
              <!-- Сумма, USDT -->
              <div class="td-inner">{{ item.amount }}</div>
            </div>
            <div class="td">
              <!-- Информация -->
              <div class="td-inner">{{ item.info }}</div>
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
import { mapGetters } from "vuex";
// import _ from "lodash";
import TablePagination from "@/components/TablePagination";
import { pagination } from "@/mixins/table";

export default {
  mixins: [pagination],
  components: {
    TablePagination
  },
  data() {
    return {
      headers: ["№", "Дата", "Вид операции", "Сумма, USDT", "Информация"]
    };
  },
  computed: {
    ...mapGetters(["getOperationsHistory"]),
    items() {
      return this.getOperationsHistory;
    }
  },
  methods: {}
};
</script>
