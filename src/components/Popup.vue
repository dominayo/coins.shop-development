<template>
  <div class="popup" v-if="active">
    <div
      class="popup__content"
      :class="{ popup__content_large: large }"
      v-click-outside="closeDialog"
    >
      <a
        v-if="closeButton"
        href="#"
        class="popup__close-button"
        @click.prevent="$emit('close', false)"
      >
        <span class="icon-close"></span>
      </a>
      <div v-if="$scopedSlots.header" class="popup__header">
        <slot name="header" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  name: "Popup",
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    closeButton: {
      type: Boolean,
      required: false,
      default: false
    },
    secondaryPopup: {
      type: Boolean,
      required: false,
      default: false
    },
    large: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  model: {
    prop: "active",
    event: "close"
  },
  directives: {
    ClickOutside
  },
  methods: {
    closeDialog() {
      if (!this.secondaryPopup) {
        this.$emit("close", false);
      } else {
        this.$emit("dialogClose", false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  padding: 50px 60px;
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  background-color: rgba(81, 81, 104, 0.3);

  @include breakpoint(sm) {
    padding: 20px 40px;
  }

  @include breakpoint(xs) {
    padding: 20px 10px;
  }

  &__content {
    position: relative;
    flex-grow: 1;
    max-width: 360px;
    margin: auto;
    padding: 50px 40px;
    background-color: white;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
    border-radius: 25px;

    @include breakpoint(xs) {
      padding: 30px 20px;
    }

    &_large {
      max-width: 560px;
    }
  }

  &__close-button {
    position: absolute;
    left: 100%;
    bottom: 100%;
    padding: 15px;
    display: flex;
    background-color: white;
    border-radius: 50%;
    font-size: 10px;

    @include breakpoint(md) {
      left: calc(100% + 10px);
    }

    @include breakpoint(sm) {
      top: 10px;
      left: auto;
      right: 10px;
      bottom: auto;
      padding: 10px;
    }

    .icon-close::before {
      transition: all 0.3s ease-in;
    }

    &:hover {
      .icon-close::before {
        color: #18bb50;
      }
    }
  }

  &__header {
    margin-bottom: 30px;
    font-size: 30px;
    line-height: 30px;
    font-weight: 500;
    color: #242427;
  }
}
</style>
