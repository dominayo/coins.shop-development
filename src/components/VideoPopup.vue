<template>
  <popup :active="active" @close="$emit('close', $event)" classes="window-open_02" closeButton>
    <youtube :video-id="videoId" :player-vars="playerVars" resize fit-parent />
  </popup>
</template>

<script>
import Popup from "@/components/Popup";
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Popup,
  },
  model: {
    prop: "active",
    event: "close",
  },
  data() {
    return {
      videoId: "lG0Ys-2d4MA",
      playerVars: {
        autoplay: 1,
      },
    };
  },
};
</script>