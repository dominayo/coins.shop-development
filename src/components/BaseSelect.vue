<template>
  <div class="custome-select" :class="{ active }" @click="toggle" v-click-outside="close">
    <div class="select js-select">
      <span>{{ value.text }}</span>
    </div>
    <ul class="select-hide">
      <li v-for="(item, index) in filteredItems" :key="index" @click.prevent="$emit('input', item)">
        <a href="#">{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  name: "base-select",
  props: {
    value: {
      type: Object,
      required: false,
      default: () => {},
    },
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => item.value !== this.value.value);
    },
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