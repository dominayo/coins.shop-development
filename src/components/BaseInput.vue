<template>
  <div class="input" :class="{ input_success: success, input_error: error }">
    <div v-if="label" class="input__label">{{ label }}</div>
    <input v-bind="attrs" @input="$emit('input', $event.target.value)" />
    <div class="input__details">
      <span v-if="errorMessageVisible" class="input__error-message">{{
        errorMessage
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    value: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    success: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ""
    }
  },
  model: {
    prop: "value",
    event: "input"
  },
  computed: {
    attrs() {
      return {
        value: this.value,
        placeholder: this.placeholder,
        type: this.type
      };
    },
    errorMessageVisible() {
      return this.error && this.errorMessage;
    }
  }
};
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  display: inline-block;

  &__label {
    margin-bottom: 10px;
    color: #a0a0ac;
  }

  input {
    width: 100%;
    padding: 15px 25px;
    border-radius: 15px;
    background-color: #f4f4f8;
    color: #1b1b1e;

    @include breakpoint(xs) {
      padding: 15px;
    }

    &:focus {
      outline: none;
    }
  }

  &__details {
    min-height: 20px;
    margin-top: 4px;
    font-size: 13px;
  }

  &__error-message {
    color: #ff5252;
  }

  &_success {
    input {
      box-shadow: 0 0 0 1px #18bb50;
    }
  }

  &_error {
    input {
      box-shadow: 0 0 0 1px #ff5252;
    }
  }
}
</style>
