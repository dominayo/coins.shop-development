<template>
  <div class="custome-select" :class="{ active }" @click="toggle" v-click-outside="close">
    <div class="select js-select select_icon" :class="`select_${ value }`">
      <span>{{ currentText }}</span>
    </div>
    <ul class="select-hide">
      <li v-for="(item, index) in filteredItems"
          :key="index" @click.prevent="$emit('input', item.key)"
          class="select_icon"
          :class="`select_${ item.key }`"
      >
        <a href="#">{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import _ from "lodash";

export default {
  name: "currency-select",
  props: {
    value: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      active: false
    };
  },
  computed: {
    currentText() {
      return _.find(this.items, { key: this.value }).text;
    },
    filteredItems() {
      return this.items.filter(item => item.key !== this.value);
    }
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
    close() {
      this.active = false;
    },
  },
};
</script>