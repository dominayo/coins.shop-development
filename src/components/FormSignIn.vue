<template>
  <form @submit.prevent="signIn" class="form" novalidate>
    <BaseInput
      v-model="fields.email"
      label="Эл. почта"
      type="email"
      class="form__input"
      :error="error.status"
    />
    <BaseInput
      v-model="fields.password"
      label="Пароль"
      type="password"
      class="form__input"
      :error="error.status"
      :error-message="error.message"
    />
    <BaseButton
      class="form__submit"
      type="submit"
      :disabled="isFormEmpty"
      :loading="isFormLoading"
      >Войти</BaseButton
    >
  </form>
</template>

<script>
import { signIn } from "@/api/user";

import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";

export default {
  name: "FormSignIn",
  components: {
    BaseButton,
    BaseInput
  },
  data() {
    return {
      fields: {
        email: "",
        password: ""
      },
      error: {
        status: false,
        message: "Неверный адрес электронной почты или пароль"
      },
      isFormLoading: false
    };
  },
  computed: {
    isFormEmpty() {
      const { email, password } = this.fields;
      return !email || !password;
    }
  },
  methods: {
    async signIn() {
      this.error.status = false;
      this.isFormLoading = true;
      try {
        const { email, password } = this.fields;
        await signIn({ email, password });
      } catch (e) {
        this.error.status = true;
      } finally {
        this.isFormLoading = false;
        this.$emit("form-submit");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;

  &__input:last-of-type {
    margin-bottom: 20px;
  }
}
</style>
