<template>
  <div class="table-row_mod no-border" :class="{active: expanded}">
    <div class="table-row-inner" @click="expanded = !expanded">
      <div class="td">
        <!-- Начало сделки -->
        <div class="td-inner">
          <div class="deals-time">{{ moment(item.started).format("DD.MM - HH:mm") }}</div>
        </div>
      </div>
      <div class="td">
        <!-- Пользователь -->
        <table-user-info classes="td-inner" :user="item.peerUser" />
      </div>
      <div class="td">
        <!-- Способ оплаты (BTC) -->
        <payment-pic classes="td-inner" :method="item.direction" />
      </div>
      <div class="td">
        <!-- Операция -->
        <div class="td-inner">
          <div class="deals-operation">
            <div class="deals-operation__title">
              {{ item.fromAmount }} {{ item.currencyFrom }}
              <small>→</small>
              {{ item.toAmount }} {{ item.currencyTo }}
            </div>
            <div class="deals-operation__text">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="td">
        <!-- Курс (RUB/BTC) -->
        <div class="td-inner">
          <div class="course">{{ item.rate }}</div>
        </div>
      </div>
      <div class="td">
        <!-- Статус -->
        <div class="td-inner td-inner_block">
          <table-status :status="status" :text="item.text" />
          <div class="status-chat">
            <span class="icon-table-chat">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
              <span class="path5"></span>
              <span class="path6"></span>
            </span>
          </div>
          <div class="status-down">
            <span class="icon-to-arrow"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="table-row-hide" @click.stop>
      <h3 class="detail-text">{{ item.text }}</h3>
      <div class="detail-progress">
        <div class="detail-progress__bar">
          <div class="detail-progress__percent" :style="{width: `${status.percent}%`}"></div>
        </div>
        <div class="detail-progress__bottom">
          <div class="detail-progress__bottom-text">{{ status.progresstext }}</div>
          <div class="detail-progress__bottom-time">
            Осталось
            <span>{{ status.left }}</span>
          </div>
        </div>
      </div>
      <ul class="detail__list">
        <deals-table-history :history="item.history" />
        <deals-table-payment
          :on-commit="onCommit"
          :on-me-paid="onMePaid"
          :on-set-details="onSetDetails"
          v-model="itemDetails"
          :type-is-buy="typeIsBuy"
          :is-fiat-payer="item.isFiatPayer"
          :changeable="item.paymentChangeable"
          :currency="item.currency"
          :method="item.direction"
        />
        <li class="detail__item">
          <table-chat :messages="item.chat" :contact-id="item._id" :reset="expanded" />
        </li>
      </ul>
      <div class="detail-footer">
        <a href="#" class="detail-footer__data" @click.prevent="cancelContact(item)">
          <span v-if="item.canCancelContact">
            <span class="icon-cancel_icon"></span>
            <span>
              Отменить
              сделку
            </span>
          </span>
        </a>
        <a
          href="#"
          class="detail-footer__data"
          @click.prevent="startArbitrage(item)"
          v-if="item.canStartArbitrage"
        >
          <span class="icon-disput"></span>
          <span>Открыть спор</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import PaymentPic from "@/components/PaymentPic";
import TableUserInfo from "@/components/TableUserInfo";
import TableStatus from "@/components/TableStatus";
import DealsTableHistory from "@/components/DealsTableHistory";
import DealsTablePayment from "@/components/DealsTablePayment";
import TableChat from "@/components/TableChat";
import config from "@/config";
import { mapActions } from "vuex";

let timer = null;
const pad2 = x => (x > 9 ? x.toString() : `0${x.toString()}`);

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    PaymentPic,
    TableUserInfo,
    TableStatus,
    DealsTableHistory,
    DealsTablePayment,
    TableChat
  },
  methods: {
    ...mapActions([
      "startArbitrage",
      "cancelContact",
      "commitContact",
      "markAsPaid",
      "setPaymentDetails"
    ])
  },
  computed: {
    onSetDetails() {
      return () =>
        this.setPaymentDetails({
          contactId: this.item._id,
          details: this.paymentDetails
        });
    },
    itemDetails: {
      get() {
        return this.item.takerPaymentDetails || this.paymentDetails || {};
      },
      set(val) {
        this.paymentDetails = val;
      }
    },
    typeIsBuy() {
      return this.item && this.item.type === "buy";
    },
    onCommit() {
      return this.item.canFinalizeContact
        ? () => this.commitContact(this.item)
        : null;
    },
    onMePaid() {
      return this.item.canMarkAsPaid ? () => this.markAsPaid(this.item) : null;
    },
    status() {
      const left = Math.max(0, this.item.status.deadline - this.currentTime);
      const percent = Math.min(
        100,
        100 - (left * 100) / this.item.status.period
      );
      const leftSec = Math.floor(left / 1000);
      const leftText = `${pad2(Math.floor(leftSec / 60))}:${pad2(
        leftSec % 60
      )}`;
      return {
        status: "status",
        percent,
        value: this.item.status.value,
        progresstext: config.progressText[this.item.status.value],
        left: leftText
      };
    }
  },
  data() {
    return {
      currentTime: Date.now(),
      expanded: false,
      paymentDetails: this.item.details
    };
  },
  mounted() {
    timer = setInterval(() => {
      this.currentTime = Date.now();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(timer);
  }
};
</script>

<style lang="stylus">
.detail-progress__percent {
  transition: 1s;
}
</style>