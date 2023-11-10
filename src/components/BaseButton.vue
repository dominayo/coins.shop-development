<template>
  <button v-bind="attrs" @click="$emit('click', $event)" class="button">
    <LoadingSpinner v-if="loading" />
    <slot v-else />
  </button>
</template>

<script>
import LoadingSpinner from "@/components/LoadingSpinner";

export default {
  name: "BaseButton",
  components: {
    LoadingSpinner
  },
  props: {
    type: {
      type: String,
      default: "button"
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    attrs() {
      return { type: this.type };
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 165px;
  height: 50px;
  padding: 0 15px;
  border-radius: 15px;
  background-color: #18bb50;
  color: white;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease-in;
  will-change: transform;

  &:hover {
    transform: translateY(-5px);
    background-color: #1cc857;
    box-shadow: 0 10px 25px rgba(#18bb50, 0.4);
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: translateY(0px);
    background-color: #12b349;
    box-shadow: 0 3px 5px rgba(#18bb50, 0.4);
  }

  &:disabled {
    pointer-events: none;
    background-color: #d5d5e5;
  }
}
</style>
