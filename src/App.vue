<template>
  <div id="app" data-app :class="{ night: getNight, 'open-menu': getMenu }">
    <popup v-model="adSuccess">
      <div class="balance-crypto__check">
        <input
          type="checkbox"
          class="checkbox"
          id="checkbox-pop"
          disabled
          checked
        />
        <label for="checkbox-pop">Ваше объявление успешно создано</label>
      </div>
    </popup>
    <Popup v-model="signInFormOpened" closeButton>
      <template #header>Вход</template>
      <FormSignIn @form-submit="toggleSignInForm" />
    </Popup>
    <Popup v-model="signUpFormOpened" large closeButton>
      <template #header>Регистрация</template>
      <FormSignUp @form-submit="toggleSignUpForm" />
    </Popup>
    <TheHeading
      @sign-in-button-click="toggleSignInForm"
      @sign-up-button-click="toggleSignUpForm"
    />
    <RouterView />
    <TheFooter />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import FormSignIn from "@/components/FormSignIn";
import FormSignUp from "@/components/FormSignUp";
import Popup from "@/components/Popup";
import TheHeading from "@/components/TheHeading";
import TheFooter from "@/components/TheFooter";

export default {
  name: "App",

  components: {
    TheHeading,
    TheFooter,
    Popup,
    FormSignIn,
    FormSignUp
  },

  data() {
    return {
      adSuccess: false,
      signInFormOpened: false,
      signUpFormOpened: false
    };
  },

  computed: {
    ...mapGetters(["getNight", "getMenu", "getShowModalPopup"]),
    showModalPopup: {
      get() {
        return !!this.getShowModalPopup;
      },
      set(v) {
        return v || this.rejectModalPopup();
      }
    }
  },

  methods: {
    ...mapActions(["rejectModalPopup", "acceptModalPopup"]),
    toggleSignInForm() {
      this.signInFormOpened = !this.signInFormOpened;
    },
    toggleSignUpForm() {
      this.signUpFormOpened = !this.signUpFormOpened;
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  position: relative;
}

.popup.active.topmost {
  z-index: 1000;
}
</style>
