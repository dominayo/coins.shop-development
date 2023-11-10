<template>
  <div class="refferrals-box">
    <div class="refferrals-box__top">
      <span class="icon-history_icon"></span>
      <h3>Операции</h3>
    </div>
    <div class="refferrals-table refferrals-table_1">
      <div class="refferrals-table__row refferrals-table__row_head">
        <div class="refferrals-td">
          <div
            class="refferrals-data"
            :class="`refferrals-data_${sort === 'asc' ? 'down' : 'up'}`"
            @click="sort === 'asc' ? sort = 'desc' : sort = 'asc'"
          >
            <span>Дата</span>
          </div>
        </div>
        <div class="refferrals-td">
          <div class="refferrals-data">Тип</div>
        </div>
        <div class="refferrals-td">
          <div class="refferrals-data">Сумма</div>
        </div>
        <div class="refferrals-td">
          <div class="refferrals-data">ID</div>
        </div>
      </div>
      <div class="refferrals-table__cont">
        <div class="refferrals-table__row" v-for="(item, index) in itemsPage" :key="index">
          <div class="refferrals-td">
            <!-- Дата -->
            <div class="refferrals-cont">
              <div class="refferrals-data">{{ moment(item.time).format("DD.MM - HH:mm") }}</div>
            </div>
          </div>
          <div class="refferrals-td">
            <!-- Тип -->
            <div class="refferrals-cont">
              <div class="refferrals-data refferrals-data_fw">{{ item.type }}</div>
            </div>
          </div>
          <div class="refferrals-td">
            <!-- Сумма -->
            <div class="refferrals-cont">
              <div class="refferrals-data">
                <div class="refferrals-inner">
                  <div class="type-icon type-icon_accept">
                    <span class="icon-price-down"></span>
                  </div>
                  <div class="type">{{ item.amount }} USD</div>
                </div>
              </div>
            </div>
          </div>
          <div class="refferrals-td">
            <!-- ID -->
            <div class="refferrals-cont">
              <div class="refferrals-data">{{ item.id }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table-pagination
      classes="pag_mod"
      short
      :length="pagesNumber"
      v-model="pageNumber"
      :perPage="perPage"
      @perPageChange="perPageChanged"
      @load="() => null"
    />
  </div>
</template>

<script>
import _ from "lodash";
import TablePagination from "@/components/TablePagination";
import { pagination } from "@/mixins/table";

export default {
  mixins: [pagination],
  props: {
    operations: {
      type: Array,
      dafeult: () => []
    }
  },
  components: {
    TablePagination
  },
  data() {
    return {
      sort: "desc"
    };
  },
  computed: {
    sorted() {
      return _.orderBy(this.operations, ["time"], [this.sort]);
    },
    items() {
      return this.sorted;
    }
  },
  methods: {}
};
</script>
