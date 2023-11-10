<template>
  <main class="main">
    <WalletHistoryTable downloadButton/>
  </main>
</template>

<script>
import WalletHistoryTable from '@/components/WalletHistoryTable';
export default {
  components: {
    WalletHistoryTable,
  },
}
</script>
