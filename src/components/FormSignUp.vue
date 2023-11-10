<template>
  <form @submit.prevent="signUp" class="form" novalidate>
    <BaseInput
      v-model="$v.fields.name.value.$model"
      label="Имя"
      class="form__input"
      :success="!$v.fields.name.value.$invalid"
      :error="$v.fields.name.value.$error"
      :error-message="errorMessage('name')"
    />
    <BaseInput
      v-model="$v.fields.secondName.value.$model"
      label="Фамилия"
      class="form__input"
      :success="!$v.fields.secondName.value.$invalid"
      :error="$v.fields.secondName.value.$error"
      :error-message="errorMessage('secondName')"
    />
    <BaseInput
      v-model="$v.fields.email.value.$model"
      label="Эл. почта"
      class="form__input"
      :success="!$v.fields.email.value.$invalid"
      :error="$v.fields.email.value.$error"
      :error-message="errorMessage('email')"
    />
    <BaseInput
      v-model="$v.fields.password.value.$model"
      label="Пароль"
      type="password"
      class="form__input"
      :success="!$v.fields.password.value.$invalid"
      :error="$v.fields.password.value.$error"
      :error-message="errorMessage('password')"
    />
    <BaseInput
      v-model="$v.fields.confirmPassword.value.$model"
      label="Подтвердите пароль"
      type="password"
      class="form__input"
      :success="!$v.fields.confirmPassword.value.$invalid"
      :error="$v.fields.confirmPassword.value.$error"
      :error-message="errorMessage('confirmPassword')"
    />
    <BaseButton
      type="submit"
      class="form__submit"
      :disabled="$v.fields.$invalid"
      :loading="isFormSubmitting"
      >Зарегистрироваться</BaseButton
    >
  </form>
</template>

<script>
import * as validators from "vuelidate/lib/validators";

import { signUp } from "@/api/user";

import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";

export default {
  name: "FormSignUp",
  components: {
    BaseButton,
    BaseInput
  },
  data() {
    return {
      fields: {
        name: {
          value: "",
          errorMessages: {
            required: "Обязательное поле",
            minLength: "Имя должно содержать минимум 2 символа",
            alpha: "Имя должно состоять только из букв"
          }
        },
        secondName: {
          value: "",
          errorMessages: {
            required: "Обязательное поле",
            minLength: "Фамилия должна содержать минимум 2 символа",
            alpha: "Фамилия должна состоять только из букв"
          }
        },
        email: {
          value: "",
          errorMessages: {
            required: "Обязательное поле",
            email: "Неверный адрес электронной почты"
          }
        },
        password: {
          value: "",
          errorMessages: {
            required: "Обязательное поле",
            minLength: "Пароль должен содержать минимум 6 символов",
            alphaNum: "Пароль должен состоять только из букв и цифр"
          }
        },
        confirmPassword: {
          value: "",
          errorMessages: {
            required: "Обязательное поле",
            sameAsPassword: "Пароли не совпадают"
          }
        }
      },
      isFormSubmitting: false
    };
  },
  validations: {
    fields: {
      name: {
        value: {
          required: validators.required,
          minLength: validators.minLength(2),
          alpha: validators.alpha
        }
      },
      secondName: {
        value: {
          required: validators.required,
          minLength: validators.minLength(2),
          alpha: validators.alpha
        }
      },
      email: {
        value: {
          required: validators.required,
          email: validators.email
        }
      },
      password: {
        value: {
          required: validators.required,
          minLength: validators.minLength(6),
          alphaNum: validators.alphaNum
        }
      },
      confirmPassword: {
        value: {
          required: validators.required,
          sameAsPassword: validators.sameAs(function() {
            return this.fields.password.value;
          })
        }
      }
    }
  },
  computed: {
    errorMessage: () =>
      function(field) {
        const validations = Object.keys(this.fields[field].errorMessages);
        const failedValidation = validations.find(
          validation => !this.$v.fields[field].value[validation]
        );
        return this.fields[field].errorMessages[failedValidation];
      }
  },
  methods: {
    async signUp() {
      this.isFormSubmitting = true;
      const { name, secondName, email, password } = this.fields;
      const { data } = await signUp({
        name: name.value,
        secondName: secondName.value,
        email: email.value,
        password: password.value
      });
      console.log(data);
      this.isFormSubmitting = false;
      this.$emit("form-submit");
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  margin: -4px -16px;
  display: flex;
  flex-wrap: wrap;

  &__input {
    flex: 0 0 calc(100% - 32px);
    margin: 4px 16px;

    &:nth-child(-n + 2) {
      flex: 1 0 calc(100% / 2 - 32px);
      min-width: 220px;
    }

    &:last-of-type {
      margin-bottom: 20px;
    }
  }

  &__submit {
    flex: 0 0 calc(100% - 32px);
    margin: 0 16px;
  }
}
</style>
