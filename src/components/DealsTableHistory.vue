<template>
  <li class="detail__item">
    <div class="detail-top">
      <div class="detail-icon">
        <span class="icon-history_icon"></span>
      </div>
      <h3>История сделки</h3>
    </div>
    <div class="detail-table">
      <div class="detail-table__row detail-table__row_head">
        <div class="detail-data detail-data_drop">
          <span>Дата</span>
        </div>
        <div class="detail-data">Тип</div>
      </div>
      <div class="detail-table__cont">
        <div class="detail-table__row" v-for="(item, index) in history" :key="index">
          <div class="detail-data">{{ moment(item.time).format("DD.MM - HH:mm") }}</div>
          <div :class="`detail-data detail-data_status detail-data_${item.action}`">
            <span>{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    history: {
      type: Array,
      required: true,
    }
  },
}
</script>