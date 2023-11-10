<template>
  <popup :active="active" @close="$emit('close', $event)" classes="window-open_03" closeButton>
    <user-info-card :user="user" @click:favorite="$emit('click:favorite')" @click:block="$emit('click:block')" />
  </popup>
</template>

<script>
import Popup from "@/components/Popup";
import UserInfoCard from "@/components/UserInfoCard";
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Popup,
    UserInfoCard
  },
  model: {
    prop: 'active',
    event: 'close',
  },
  data() {
    return {
      popup: true
    }
  }
};
</script>