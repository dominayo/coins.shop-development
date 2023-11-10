<template>
  <main class="main">
    <popup v-model="popup1" classes="window-open_service">
      <div class="balance-crypto__check">
        <input type="checkbox" class="checkbox" id="checkbox-pop" disabled checked />
        <label for="checkbox-pop">Ваше объявление успешно создано</label>
      </div>
    </popup>
    <popup v-model="popup2" classes="window-open_service">
      <div class="balance-crypto__check">
        <input type="checkbox" class="checkbox" id="checkbox-pop" disabled checked />
        <label for="checkbox-pop">Вы успешно начали сделку</label>
      </div>
    </popup>
    <AdsTable />
  </main>
</template>

<script>
import AdsTable from "@/components/AdsTable";
import Popup from "@/components/Popup";

export default {
  components: {
    AdsTable,
    Popup
  },
  data() {
    return {
      popup1: false,
      popup2: false
    };
  }
};
</script>
