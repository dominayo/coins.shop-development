<template>
  <div :class="`status ${status.value}`">
    <div class="status-title">{{ text }}</div>
    <div class="status-text">
      <template v-if="status.value === 'success'">
        <span>Сделка завершилась</span>
      </template>
      <template v-else-if="status.value === 'started'">
        <span>Открыт к сделке</span>
      </template>
      <template v-else>
        <span>
          Осталось
          <small>{{ status.left }}</small>
        </span>
        <span class="status-bar">
          <span class="status-percent" :style="`width: ${status.percent}%`"></span>
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Object,
      required: true
    },
    text: {
      type: String,
      required: true
    },
  },
}
</script>