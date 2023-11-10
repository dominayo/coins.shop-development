<template>
  <div>
    <section class="section section-table">
      <div class="wrapper">
        <div class="table gateway-table">
          <div class="table-row table-head">
            <div class="th" v-for="(item, index) in headers" :key="index">{{ item }}</div>
          </div>
          <div
            class="table-row"
            v-for="(item, index) in itemsPage"
            :key="index"
            :class="{ active: getUserInfo.gateway === item.id }"
          >
            <div class="td">
              <!-- Статус -->
              <div class="td-inner">{{ item.status }}</div>
            </div>
            <div class="td">
              <!-- Кол-во multlslg адресов -->
              <div class="td-inner">{{ item.count }}</div>
            </div>
            <div class="td">
              <!-- Шлюз -->
              <div class="td-inner td-inner_mod">
                <!-- Централизи
                <small class="mob-hyphen">-</small>рованный шлюз Coin.shop-->
                {{ item.description }}
              </div>
            </div>
            <div class="td">
              <!-- UP time -->
              <div class="td-inner">{{ item.uptime }}</div>
            </div>
            <div class="td">
              <div class="td-inner">
                <a
                  href="#"
                  class="btn btn_border btn_flex js-check"
                  @click.prevent="setGateway(item.id)"
                  :class="{ active: getUserInfo.gateway === item.id }"
                >
                  <span class="check"></span>
                  <span>Выбрать шлюз</span>
                </a>
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
import { mapGetters, mapMutations } from "vuex";
import TablePagination from "@/components/TablePagination";
import { pagination } from "@/mixins/table";

export default {
  mixins: [pagination],
  components: {
    TablePagination
  },
  data() {
    return {
      perPage: 5,
      pageNumber: 1,
      active: 1,
      headers: ["Статус", "Кол-во multlslg адресов", "Шлюз", "UP time"]
    };
  },
  computed: {
    ...mapGetters(["getUserInfo", "getGateways"]),
    items() {
      return this.getGateways;
    }
  },
  methods: {
    ...mapMutations(["setGateway"])
  }
};
</script>
