<template>
  <div>
    <section class="section section-st-deposit">
      <div class="wrapper">
        <div class="st-profile-wrap">
          <div class="st-profile-box">
            <h2>Ethereum</h2>
            <div class="balance-crypto__input-wrap balance-crypto__input-wrap_mb">
              <div class="balance-crypto__input">
                <div class="st-deposit-wrap">
                  <div class="st-deposit-progress">
                    <div
                      class="st-deposit-percent"
                      :style="`width: ${ Math.floor(time / maxTime * 100) }%`"
                    ></div>
                  </div>
                  <div class="st-deposit-bottom">
                    <div>Вывод залога будет доступен через</div>
                    <div>
                      Осталось
                      <span>{{ moment.duration(time).humanize() }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="balance-crypto__input">
                <label for="balanceCrypto" class="text">Сумма залога</label>
                <div class="balance-crypto__abs-wrap">
                  <input
                    type="text"
                    id="balanceCrypto"
                    v-model="pledge"
                    @input="$v.pledge.$touch"
                    @blur="$v.pledge.$touch"
                  />
                  <div class="balance-crypto__abs">USDT</div>
                </div>
                <template v-if="$v.pledge.$error">
                  <span class="error" v-if="!$v.pledge.required">Заполните поле</span>
                  <span class="error" v-else-if="!$v.pledge.integer">Укажите целое число</span>
                  <span
                    class="error"
                    v-else-if="!$v.pledge.minValue"
                  >Должно быть больше {{ minPledge }}</span>
                </template>
                <div class="balance-crypto__small-text">* мин сумма {{ minPledge }} USDT</div>
              </div>
            </div>
            <div class="st-profile-btn st-profile-btn_part">
              <a
                href="#"
                class="btn"
                :class="{ disabled: $v.$invalid }"
                @click.prevent="make"
              >Внести залог</a>
              <a href="#" class="btn btn_border" @click.prevent="take">Забрать залог</a>
            </div>
          </div>
          <div class="st-profile-box">
            <div class="st-profile-info st-profile-info_mb2">
              <p>
                Теперь вы можете покупать, продавать и обменивать биткойны, Ethereum и более 20+ различных криптовалют в
                любом месте
              </p>
              <p>Используются различных методоы оплаты во многих странах мира, без необходимости проходить KYC.</p>
              <p>
                Теперь вы можете покупать, продавать и обменивать биткойны, Ethereum и более 20+ различных криптовалют в
                любом месте
              </p>
              <p>Более 250 различных методов оплаты в более чем 190 странах мира, без необходимости проходить KYC.</p>
            </div>
            <div class="balance-crypto__check">
              <input type="checkbox" class="checkbox" id="checkbox" />
              <label for="checkbox">Чекбокс</label>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-st-deposit section-st-deposit_img">
      <div class="wrapper">
        <div class="st-profile-wrap">
          <div class="st-profile-box">
            <h2>Инструкция</h2>
            <div class="st-profile-info st-profile-info_no-mb">
              <p>
                Теперь вы можете покупать, продавать и обменивать биткойны, Ethereum и более 20+ различных криптовалют в
                любом месте
              </p>
              <p>Используются различных методоы оплаты во многих странах мира, без необходимости проходить KYC.</p>
              <p>
                Теперь вы можете покупать, продавать и обменивать биткойны, Ethereum и более 20+ различных криптовалют в
                любом месте
              </p>
              <p>Более 250 различных методов оплаты в более чем 190 странах мира, без необходимости проходить KYC.</p>
            </div>
          </div>
          <div class="st-profile-box">
            <div class="st-profile-pic">
              <img src="@/img/main/instruction.png" alt="instruction" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { required, minValue, integer } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      minPledge: 1500,
      pledge: null,
      time: 390e3,
      maxTime: 500e3,
    };
  },
  validations: {
    pledge: {
      required,
      minValue(val) {
        return minValue(this.minPledge)(val);
      },
      integer,
    },
  },
  methods: {
    make() {},
    take() {},
  },
};
</script>
