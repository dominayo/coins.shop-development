<template>
  <div class="head-pic">
    <a href="#" class="popup-close" @click.prevent="$emit('input', false)">
      <span class="icon-close"></span>
    </a>
    <LazyYoutubeVideo
      src="https://www.youtube.com/embed/lG0Ys-2d4MA"
      preview-image-size="maxresdefault"
      :autoplay="true"
    />
  </div>
</template>

<script>
import LazyYoutubeVideo from "vue-lazy-youtube-video";
import "vue-lazy-youtube-video/dist/style.css";

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  components: { LazyYoutubeVideo },
  model: {
    prop: "active",
    event: "close",
  },
  data() {
    return {};
  },
};
</script>
