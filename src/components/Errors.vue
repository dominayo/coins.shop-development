<template>
  <span
    v-if="errors.required === false"
    class="error"
  >
    Заполните поле
  </span>
  <span
    v-else-if="errors.float === false"
    class="error"
  >
    Укажите число
  </span>
  <span
    v-else-if="errors.integer === false"
    class="error"
  >
    Укажите целое число
  </span>
  <span
    v-else-if="errors.minValueExclusive  === false"
    class="error"
  >
    Должно быть больше {{ errors.$params.minValueExclusive.min }}
  </span>
  <span
    v-else-if="errors.maxValue === false"
    class="error"
  >
    Должно быть меньше или равно {{ errors.$params.maxValue.max }}
  </span>
</template>

<script>
export default {
  name: 'errors',
  props: {
    errors: { type: Object, default: () => ({}) }
  }
};
</script>
