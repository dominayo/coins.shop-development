<template>
  <div :class="classes">
    <div :class="`user-percent user-percent_${level}`">
      <div class="user-percent__bg">
        <span class="user-percent__bg-curent" :style="`height: ${ rating >= 0 && rating <=100 ? rating : 0 }%;`"></span>
      </div>
      <div class="user-percent__count">{{ numWithSigh(rating) }}</div>
    </div>
    <div class="user-info">
      <div class="user-name" :class="{ 'user-name_varif': !!user.verified }">{{ user.name }}</div>
      <div
        class="user-status"
        :class="`user-status_${user.online ? 'online' : 'offline'}`"
      >{{ user.online ? 'Online' : 'Offline' }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import config from '../config';

export default {
  props: {
    classes: {
      type: String
    },
    user: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['getTickers']),
    level() {
      let l = 1;
      const p = this.rating;
      if (p >=0 && p <= 100) {
        if (p < 25) {
          l = 2;
        } else if (p < 50) {
          l = 3;
        } else if (p < 75) {
          l = 1;
        } else if (p <= 100) {
          l = 4;
        }
      } else {
        l = 2;
      }
      return l;
    },
    rating() {
      const { 'ETHUSDT': ethPrice, 'BTCUSDT': btcPrice }  = this.getTickers;
      const { eth, btc, usdt }  = this.user.dealsVolumes;
      const { amount, k } = config.ratingImpacts.dealsVolume;
      const volumeImpact = k * Math.trunc((ethPrice * eth + btcPrice * btc + usdt) / amount);
      const reactionImpact = config.ratingImpacts.reactionSpeed[this.user.reactionSpeed] || 0;
      let rawRating = volumeImpact + reactionImpact + ['deals', 'disputeDefeats', 'dealsCancelled'].reduce((acc, cur) => acc + config.ratingImpacts[cur] * this.user[cur], 0);
      if (rawRating > 100) rawRating = 100;
      if (rawRating < -100) rawRating = -100;
      return rawRating;
    }
  },
  methods: {
    numWithSigh(n) {
      let num = Math.trunc(n);
      if (n < 0) {
        return `-${num}`;
      } else if (n > 0) {
        return `+${num}`;
      } else {
        return `${num}`;
      }
    }
  }
};
</script>