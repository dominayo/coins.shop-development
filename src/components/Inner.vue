<template>
  <router-view v-if="getLoggedIn"></router-view>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getLoggedIn"])
  },
  watch: {
    getLoggedIn: {
      handler(value) {
        if (!value) {
          this.$router.push({ name: "home" });
        }
      },
      immediate: true
    }
  }
};
</script>