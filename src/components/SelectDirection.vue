<template>
  <div class="custome-select" :class="{ active }" @click="toggle" v-click-outside="close">
    <div class="select js-select select_icon" :class="`select_${ value.value }`">
      <span>{{ currentText }}</span>
    </div>
    <ul class="select-hide">
      <li v-for="(item, index) in filteredItems" :key="index" @click.prevent="$emit('input', item)" class="select_icon" :class="`select_${ item.value }`">
        <a href="#">{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import _ from "lodash";

export default {
  name: "select-direction",
  props: {
    value: {
      type: Object,
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
      return _.find(this.items, { value: this.value.value }).text;
    },
    filteredItems() {
      return this.items.filter(item => item.value !== this.value.value);
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