<template>
  <div>
    <div class="detail-top">
      <div class="detail-icon">
        <span class="icon-chat_icon"></span>
      </div>
      <h3>Чат</h3>
    </div>
    <div class="detail-chat" ref="chat" @scroll="onChatScroll">
      <div
        class="chat-message"
        v-for="(msg, i) in messages"
        :key="i"
        :class="{ 'chat-message_answer': msg.side === 'answer' }"
      >
        <!-- :class="{ 'chat-message_member-2': (i + 1) % 2 === 0  && msg.type === 'side'}" -->
        <div class="chat-message__text" v-if="msg.type === 'text'">{{ msg.text }}</div>
        <div class="chat-message__text" v-if="msg.type === 'file'">
          <img class="chat-message__text_thumb" :src="msg.thumb" v-if="msg.thumb" />
          <a :href="msg.url" @click.prevent="openAttach(msg.url, msg.fileName)" target="_blank">
            <span>{{ msg.fileName }}</span>
          </a>
        </div>
        <div class="chat-message-detail">
          <div class="chat-message__time">{{ moment(msg.time).format("DD.MM - HH:mm") }}</div>
          <div class="chat-message__member">{{ msg.name }}</div>
        </div>
      </div>
    </div>
    <div class="detail-bottom">
      <div class="chat-area">
        <input
          v-model="message"
          type="text"
          placeholder="Ваше сообщение"
          :readonly="file !== null"
          @keyup.enter="send"
        />
        <input ref="fileInput" type="file" name="name" @change="onFile" style="display: none;" />
        <a href="#" class="chat-attach" @click.prevent="attach" v-if="file === null">
          <span class="icon-attach"></span>
        </a>
        <a href="#" class="chat-attach" @click.prevent="clear" v-else>
          <span class="icon-close"></span>
        </a>
        <a href="#" class="chat-send" @click.prevent="send">
          <span class="icon-paper-plane">
            <span class="path1"></span>
            <span class="path2"></span>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    messages: {
      type: Array,
      default: () => []
    },
    contactId: {
      type: String,
      required: true
    },
    reset: {
      type: Boolean
    }
  },
  data() {
    return {
      message: "",
      file: null,
      needToScroll: true
    };
  },
  mounted() {
    this.chatToBottom();
  },
  watch: {
    messages: {
      handler() {
        this.$nextTick(function() {
          this.chatToBottom();
        });
      },
      immediate: true
    },
    reset() {
      this.chatToBottom();
    }
  },
  methods: {
    ...mapActions(["sendChatMessage", "modalDialog"]),
    openAttach(url, title) {
      const win = window.open();
      win.document.write(
        "<head><title>" +
          title +
          "</title></head>" +
          '<body><iframe src="' +
          url +
          '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe></body>'
      );
    },
    send() {
      if (this.message !== "") {
        this.sendChatMessage({
          contactId: this.contactId,
          text: this.message,
          file: this.file
        }).then(() => {
          this.clear();
        });
      }
    },
    attach() {
      this.$refs.fileInput.click();
    },
    clear() {
      this.file = null;
      this.message = "";
      this.$refs.fileInput.value = null;
    },
    onFile(file) {
      if (file.target.files[0].size > 250 * 1024) {
        this.modalDialog({
          title: "Невозможно прикрепить файл",
          text: "Максимально допустимый размер загружаемого файла - 250 Кб"
        });
        this.clear();
      } else {
        const reader = new FileReader();
        reader.onload = e => {
          this.file = e.target.result;
          this.message = file.target.files[0].name;
        };
        reader.readAsDataURL(file.target.files[0]);
      }
    },
    chatToBottom() {
      if (this.needToScroll) {
        const chat = this.$refs.chat;
        chat.scrollTop = chat.scrollHeight;
      }
    },
    onChatScroll() {
      const chat = this.$refs.chat;
      this.needToScroll =
        chat.scrollHeight - chat.scrollTop === chat.clientHeight;
    }
  }
};
</script>