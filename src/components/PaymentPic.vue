<template>
  <div :class="classes">
    <div class="payment-pic" :class="methodObj.picClass">
      <img :src="methodObj.img" :alt="method" />
    </div>
    <div class="payment-name">{{ methodObj.text }}</div>
  </div>
</template>

<script>
import config from "../config";
import _ from "lodash";

export default {
  props: {
    classes: {
      type: String
    },
    method: {
      type: String,
      required: true,
      default: ""
    }
  },
  computed: {
    methodObj() {
      return (_.find(config.directions, i => i.value === this.method)) || {};
    },
  }
};
</script>