<template>
  <section class="section section-st-profile">
    <div class="wrapper">
      <div class="st-profile-wrap">
        <div class="st-profile-box">
          <h2>Профиль</h2>
          <div class="st-profile-info">
            <p>
              Теперь вы можете покупать, продавать и обменивать биткойны, Ethereum и более 20+ различных
              криптовалют в
              любом месте
            </p>
            <p>
              Используя более 250 различных методов оплаты в более чем 190 страsнах мира, без необходимости
              проходить
              KYC.
            </p>
          </div>
          <div class="balance-crypto__input-wrap balance-crypto__input-wrap_mb">
            <div class="balance-crypto__input">
              <div class="text">Рейтинг</div>
              <!-- class -> negative -->
              <div class="st-profile-rating" :class="ratingSign">
                <span>-100</span>
                <span>0</span>
                <span>+100</span>
                <!-- (100points == 50%) -->
                <div
                  class="st-profile-percent"
                  :style="`width: calc(${Math.abs(ratingPercent)}% + 25px)`"
                >
                  <small>{{ ratingWithSign }}</small>
                </div>
              </div>
            </div>
            <div class="balance-crypto__input">
              <label for="balanceCrypto" class="text">Никнейм</label>
              <input type="text" id="balanceCrypto" :value="getUserInfo.username" />
              <div
                class="balance-crypto__small-text"
              >* Никнейм задается только один раз, и изменить его нельзя.</div>
            </div>
            <div class="balance-crypto__input">
              <label for="balanceCrypto2" class="text">Ваш Telegram</label>
              <input type="text" id="balanceCrypto2" :value="getUserInfo.username" />
              <div class="balance-crypto__small-text">
                * ID телеграмма нужен для удобного получения уведомлений и
                новостей от Coins.shp
              </div>
            </div>
            <div class="balance-crypto__input">
              <div class="text">Судейство</div>
              <div class="st-profile-refereeing">
                <ul class="refereeing__list">
                  <li
                    class="refereeing__item"
                    :class="{ active: !decentralizedJudging }"
                    @click.prevent="decentralizedJudging = false"
                  >
                    <a href="#" class="refereeing__link">Централизованное</a>
                  </li>
                  <li
                    class="refereeing__item"
                    :class="{ active: decentralizedJudging }"
                    @click.prevent="decentralizedJudging = true"
                  >
                    <a href="#" class="refereeing__link">Децентрализованное</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="st-profile-btn st-profile-btn_full">
            <a href="#" class="btn" :class="{ disabled }" @click.stop="saveSettings">Сохранить</a>
          </div>
        </div>
        <div class="st-profile-box">
          <div class="st-profile-info">
            <p>
              В любое время, с кем угодно, используя более 250 различных
              методов оплаты в более чем 190 странах мира, без необходимости проходить KYC.
            </p>
            <p>Теперь вы можете покупать, продавать биткойны.</p>
          </div>
          <div class="st-profile__achievements">
            <ul class="st-profile__list">
              <li class="st-profile__item">
                <div class="st-profile__count">{{ getUserInfo.dealsNumber }}</div>
                <div class="st-profile__text">
                  Количество
                  <br />сделок
                </div>
              </li>
              <li class="st-profile__item">
                <div class="st-profile__count">{{ getUserInfo.dealsVol }}</div>
                <div class="st-profile__text">
                  Сумма
                  <br />сделок
                </div>
              </li>
              <li class="st-profile__item">
                <div class="st-profile__count">{{ getUserInfo.disputeDefeats }}</div>
                <div class="st-profile__text">
                  Поражений
                  <br />в спорах
                </div>
              </li>
              <li class="st-profile__item">
                <div class="st-profile__count">{{ getUserInfo.dealsCancel }}</div>
                <div class="st-profile__text">
                  Отмененных
                  <br />сделок
                </div>
              </li>
              <li class="st-profile__item">
                <div class="st-profile__count">{{ getUserInfo.disputeNumber }}</div>
                <div class="st-profile__text">
                  Количество
                  <br />споров
                </div>
              </li>
              <li class="st-profile__item">
                <div class="st-profile__count">{{ getUserInfo.reaction }}</div>
                <div class="st-profile__text">
                  Скорость
                  <br />реакции
                </div>
              </li>
            </ul>
          </div>
          <div class="st-profile-info st-profile-info_no-mb">
            <p>
              Теперь вы можете покупать, продавать и обменивать биткойны, Ethereum и более 20+ различных
              криптовалют в
              любом месте.
            </p>
            <p>
              В любое время, с кем угодно, используя более 250 различных методов оплаты в более чем 190 странах
              мира,
              без необходимости проходить KYC.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
    ratingPercent() {
      return Math.round(this.getUserInfo.rating / 2);
    },
    ratingWithSign() {
      const r = this.getUserInfo.rating;
      if (r > 0) {
        return `+${r}`;
      } else if (r < 0) {
        return `-${r}`;
      } else {
        return `${r}`;
      }
    },
    ratingSign() {
      return this.ratingPercent < 0 ? "negative" : "positive";
    },
    decentralizedJudging: {
      get() {
        return this.getUserInfo.decentralizedJudging;
      },
      set(value) {
        this.setDecentralizedJudging(value);
      }
    }
  },
  methods: {
    ...mapMutations(["setDecentralizedJudging"]),
    ...mapActions(["sendSignedRequest"]),
    saveSettings() {
      this.sendSignedRequest({
        text: 'Сохранить данные профиля',
        command: 'save_profile',
        nickname: 'Sonjar91',
        telegram: 'Sonjar91',
      });
    }
  }
};
</script>
