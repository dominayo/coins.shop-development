<template>
  <div ref="logo" />
</template>

<script>
import ModelViewer from "metamask-logo";
export default {
  props: {
    width: {
      type: Number,
      default: 40
    },
    height: {
      type: Number,
      default: 40
    }
  },
  mounted() {
    const viewer = ModelViewer({
      pxNotRatio: true,
      width: this.width,
      height: this.height,
      followMouse: true
    });

    this.$refs.logo.appendChild(viewer.container);
  }
};
</script>

<style>
</style>