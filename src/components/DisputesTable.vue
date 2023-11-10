<template>
  <div>
    <section class="section section-deals">
      <div class="wrapper">
        <div class="table dispute-table">
          <div class="table-row table-head">
            <div class="th" v-for="(item, index) in headers" :key="index">{{ item }}</div>
          </div>
          <div
            class="table-row_mod no-border"
            v-for="(item, index) in itemsPage"
            :key="index"
            :class="{ active: rowState(index) }"
          >
            <div class="table-row-inner" @click="toggleRow(index)">
              <div class="td">
                <!-- № -->
                <div class="td-inner">{{ index }}</div>
              </div>
              <div class="td">
                <!-- Операция -->
                <div class="td-inner">{{ item.operation }}</div>
              </div>
              <div class="td">
                <div class="hide-td">Спор открыт</div>
                <div class="td-inner">{{ moment(item.opened).format("DD.MM - HH:mm") }}</div>
              </div>
              <div class="td">
                <div class="hide-td">Статус спора</div>
                <div class="td-inner td-inner_mod">
                  <table-status :status="item.status" />
                  <div
                    class="status-chat"
                    :class="{ 'status-chat_notife': item.notifications }"
                    :data-count="item.notifications"
                  >
                    <span class="icon-table-chat">
                      <span class="path1"></span>
                      <span class="path2"></span>
                      <span class="path3"></span>
                      <span class="path4"></span>
                      <span class="path5"></span>
                      <span class="path6"></span>
                    </span>
                  </div>
                  <div class="status-down">
                    <span class="icon-to-arrow"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="table-row-hide" @click.stop>
              <div class="dispute-small-text">{{ item.duration }}</div>
              <div class="dispute-controls">
                <div class="dispute-member">
                  <div class="dispute-member-inner">
                    <h3>Сторона 1</h3>
                    <div>Отдает {{ item.side1Amount }}</div>
                  </div>
                </div>
                <template v-if="!history">
                  <div class="dispute-loose-wrap">
                    <a href="#" class="dispute-loose">
                      <div class="dispute-icon">
                        <span class="icon-dispute-2"></span>
                      </div>
                      <div class="disupte-loose__text">
                        Проиграла спор
                        <br />
                        <span>1 сторона</span>
                      </div>
                    </a>
                  </div>
                  <div class="btn-wrap">
                    <a href="#" class="btn">Продолжить спор на 24 часа</a>
                  </div>
                  <div class="dispute-loose-wrap dispute-loose-wrap_right">
                    <a href="#" class="dispute-loose">
                      <div class="disupte-loose__text">
                        Проиграла спор
                        <br />
                        <span>2 сторона</span>
                      </div>
                      <div class="dispute-icon">
                        <span class="icon-dispute-2"></span>
                      </div>
                    </a>
                  </div>
                </template>
                <template v-else>
                  <div class="dispute-loose-wrap dispute-loose-wrap_right">
                    <a href="#" class="dispute-loose">
                      <div class="disupte-loose__text">
                        Проиграла спор
                        <br />
                        <span>{{ item.sideLost }} сторона</span>
                      </div>
                      <div class="dispute-icon">
                        <span class="icon-dispute-2"></span>
                      </div>
                    </a>
                  </div>
                </template>
                <div class="dispute-member dispute-member_right">
                  <div class="dispute-member-inner">
                    <h3>Сторона 2</h3>
                    <div>Отдает {{ item.side1Amount }}</div>
                  </div>
                </div>
              </div>
              <div class="chat chat_dispute">
                <table-chat :messages="item.messages" />
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
import { mapGetters } from "vuex";
import TablePagination from "@/components/TablePagination";
import TableStatus from "@/components/TableStatus";
import TableChat from "@/components/TableChat";
import { pagination, toggle } from "@/mixins/table";

export default {
  mixins: [pagination, toggle],
  props: {
    history: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TablePagination,
    TableStatus,
    TableChat
  },
  data() {
    return {
      headers: ["№", "Операция", "Спор открыт", "Статус спора"]
    };
  },
  computed: {
    ...mapGetters(["getOpenDisputes", "getClosedDisputes"]),
    items() {
      return this.history ? this.getClosedDisputes : this.getOpenDisputes;
    }
  },
  methods: {}
};
</script>