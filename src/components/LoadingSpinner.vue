<template>
  <span class="spinner"></span>
</template>

<script>
export default {
  name: "LoadingSpinner"
};
</script>

<style lang="scss" scoped>
.spinner {
  width: 20px;
  height: 20px;
  border: 4px solid white;
  border-radius: 50%;
  border-right-color: transparent;
  animation: spin 0.75s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }
}
</style>
