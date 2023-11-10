<template>
  <div class="refferrals-box">
    <div class="refferrals-box__row">
      <div class="refferrals-box__top">
        <span class="icon-ref"></span>
        <h3>Рефералы</h3>
      </div>
      <ul class="nav-tab-list">
        <li
          class="nav-tab-list__item"
          v-for="(value, name, index) in filters"
          :class="{ active: name === filter }"
          :key="index"
        >
          <a href="#" @click.prevent="filter = name" class="nav-tab-list__link">{{ value }}</a>
        </li>
      </ul>
    </div>
    <div class="refferrals-table refferrals-table_2">
      <div class="refferrals-table__row refferrals-table__row_head">
        <div class="refferrals-td">
          <div class="refferrals-data">Уровень</div>
        </div>
        <div class="refferrals-td">
          <div class="refferrals-data">Ключ пользователя</div>
        </div>
        <div class="refferrals-td">
          <div class="refferrals-data" :class="`refferrals-data_${sort === 'asc' ? 'down' : 'up'}`" @click="sort === 'asc' ? sort = 'desc' : sort = 'asc'">
            <span>Активность</span>
          </div>
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
            <div class="refferrals-hide">Уровень</div>
            <div class="refferrals-cont">
              <div class="refferrals-data">{{ item.level }} ур.</div>
            </div>
          </div>
          <div class="refferrals-td">
            <div class="refferrals-hide">Ключ пользователя</div>
            <div class="refferrals-cont">
              <div class="refferrals-data refferrals-data_fw refferrals-data_hide">{{ item.key }}</div>
            </div>
          </div>
          <div class="refferrals-td">
            <div class="refferrals-hide">Активность</div>
            <div class="refferrals-cont">
              <div class="refferrals-data">{{ moment(item.activity).format("DD.MM - HH:mm") }}</div>
            </div>
          </div>
          <div class="refferrals-td">
            <div class="refferrals-hide">Сумма</div>
            <div class="refferrals-cont">
              <div class="refferrals-data">
                <div class="refferrals-inner">
                  <div class="type-icon type-icon_accept">
                    <span
                      :class="`${item.amountType === 'out' ? 'icon-price-up' : 'icon-price-down'}`"
                    ></span>
                  </div>
                  <div class="type">{{ item.amount }} USD</div>
                </div>
              </div>
            </div>
          </div>
          <div class="refferrals-td">
            <div class="refferrals-hide">ID</div>
            <div class="refferrals-cont">
              <div class="refferrals-data">{{ item.id }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table-pagination
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
  components: {
    TablePagination
  },
  props: {
    refs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      filters: {
        all: "Все",
        level1: "1 Уровень",
        level2: "2 Уровень"
      },
      filter: "all",
      sort: "desc"
    }
  },
  computed: {
    filtered() {
      return _.filter(this.refs, item => {
        return this.filter === "all" || (this.filter === "level1" && (item.level === 1)) || (this.filter === "level2" && (item.level === 2))
      })
    },
    sorted() {
      return _.orderBy(this.filtered, ["activity"], [this.sort])
    },
    items() {
      return this.sorted;
    }
  }
}
</script>
