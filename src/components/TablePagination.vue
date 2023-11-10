<template>
  <div class="pag" :classes="classes">
    <div />
    <div class="pag-center">
      <template v-if="length !== 0">
        <a href="#" class="pag-btn prev" @click.prevent="value <= 1 ? null : previous()">
          <span class="icon-to-arrow"></span>
        </a>
        <ul class="pag-list">
          <template v-for="(item, index) in pages">
            <li v-if="!isNaN(Number(item))" :key="index" :class="{ active: item === value }">
              <a href="#" @click.prevent="$emit('input', item)">{{ item }}</a>
            </li>
            <li v-else class="decor" :key="index">
              <span>...</span>
            </li>
          </template>
        </ul>
        <a href="#" class="pag-btn next" @click.prevent="value >= length ? null : next()">
          <span class="icon-to-arrow"></span>
        </a>
      </template>
    </div>
    <div class="pag-right" v-if="!short">
      <div class="pag-count-row">
        Строк на
        <br class="br-mob" />странице
      </div>
      <base-select
        :value="{ text: perPage, value: perPage }"
        :items="perPageList"
        @input="$emit('perPageChange', $event.value)"
      />
    </div>
    <!-- <div class="pag-right" v-if="!short">
      <a href="#" class="pag-more-link" @click.prevent="$emit('load')">
        Загрузить еще
        <span>15</span>
      </a>
    </div> -->
  </div>
</template>

<script>
import _ from "lodash";
import BaseSelect from "@/components/BaseSelect";

export default {
  props: {
    length: {
      type: Number,
      default: 1
    },
    totalVisible: {
      type: Number,
      default: 7
    },
    value: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 15
    },
    classes: {
      type: String,
    },
    short: {
      type: Boolean
    }
  },
  components: {
    BaseSelect
  },
  data() {
    return {
      perPageList: [
        { text: "5", value: 5 },
        { text: "10", value: 10 },
        { text: "15", value: 15 },
        { text: "20", value: 20 },
        { text: "50", value: 50 }
      ]
    };
  },
  computed: {
    pages() {
      const maxLength = Math.min(this.totalVisible, this.length);

      if (this.length <= maxLength) {
        return _.range(1, this.length + 1);
      }

      const even = maxLength % 2 === 0 ? 1 : 0;
      const left = Math.floor(maxLength / 2);
      const right = this.length - left + 1 + even;

      if (this.value > left && this.value < right) {
        const start = this.value - left + 2;
        const end = this.value + left - 2 - even;

        return [1, "...", ..._.range(start, end + 1), "...", this.length];
      } else if (this.value === left) {
        const end = this.value + left - 1 - even;
        return [..._.range(1, end + 1), "...", this.length];
      } else if (this.value === right) {
        const start = this.value - left + 1;
        return [1, "...", ..._.range(start, this.length + 1)];
      } else {
        return [
          ..._.range(1, left + 1),
          "...",
          ..._.range(right, this.length + 1)
        ];
      }
    }
  },
  methods: {
    next() {
      this.$emit("input", this.value + 1);
      this.$emit("next");
    },
    previous() {
      this.$emit("input", this.value - 1);
      this.$emit("previous");
    }
  }
};
</script>
