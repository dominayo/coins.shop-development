<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogModel"
      max-width="390"
      class="dialog"
      persistent
      :dark="getNight"
    >
      <v-card>
        <v-card-title style="padding-bottom: 20px" class="card_title">{{title}}</v-card-title>

        <v-card-text style="padding-bottom: 40px" class="popup_text">
          {{text}}
        </v-card-text>

        <div style="padding-bottom: 10px">
          <v-col class="btn_container" cols="12" align="center">
            <a href="#" class="btn" @click.prevent.stop="dialogAccept">
              <span>{{confirmBtn}}</span>
            </a>
          </v-col>
          <v-col class="btn_container" cols="12" align="center">
            <a href="#" class="btn" @click.prevent.stop="dialogCloseAd">
              <span>{{declineBtn}}</span>
            </a>
          </v-col>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "ModalWindow",
    props: {
      dialog: {default: false},
      confirmBtn: {type: String, default: 'согласен'},
      declineBtn: {type: String, default: 'отмена'},
      title: {type: String, default: 'заголовок'},
      text: {type: String, default: 'текст'},
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['getNight']),
      dialogModel: {
        get() {
          return this.dialog
        },
        set(newVal) {
          return newVal
        }
      }
    },
    watch: {
      dialogModel(val) {
        !val && this.$emit('dialogClose')
      }
    },
    methods: {
      dialogCloseAd() {
        this.$emit('dialogClose')
      },
      dialogAccept() {
        this.$emit('dialogAccept')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn_container {
    padding: 6px;

    .btn {
      min-width: 90%;
      height: 45px;
    }
  }

  .v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: 25px;

    .card_title {
      font-size: 24px;
    }
  }

</style>