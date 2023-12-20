<template>
  <div id="app">
    <el-row class="title">SNSソフト・社内ボット</el-row>
    <el-row class="content">
      <el-col
        v-for="(message, index) in messages"
        :key="index"
        :span="24"
        :class="{
          'user-message': message.isUser,
          'bot-message': !message.isUser,
        }"
      >
        {{ message.text }}
        <span v-if="message.isUser" class="arrow-right"></span>
        <span v-else class="arrow-left"></span>
      </el-col>
    </el-row>
    <el-row class="footer">
      <el-col :span="3">
        <el-button
          icon="el-icon-plus"
          circle
          @click="triggerFileInput"
        ></el-button>
        <input
          type="file"
          id="fileInput"
          ref="fileInput"
          @change="handleFileChange"
          style="display: none"
        />
      </el-col>
      <el-col :span="17">
        <el-input
          type="text"
          v-model="userMessage"
          @keyup.enter="sendMessage"
          placeholder="メッセージを入力"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button :disabled="!isInputNotEmpty" @click="sendMessage"
          >送信</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMessage: "",
      messages: [],
      selectedFile: null,
      isInputNotEmpty: false,
      showPrompt: false,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    sendMessage() {
      if (this.userMessage.trim() !== "") {
        this.messages.push({
          text: this.userMessage,
          isUser: true,
        });
        // 模拟回复
        setTimeout(() => {
          this.messages.push({
            text: "これは自動応答です",
            isUser: false,
          });
        }, 1000);
        this.userMessage = "";
      }
    },
  },
  watch: {
    userMessage(newVal) {
      this.isInputNotEmpty = newVal.trim() !== "";
    },
  },
};
</script>

<style>
body,
html {
  background-color: #ffffff;
  font-family: "Arial", sans-serif;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  background-size: cover;
  max-width: 1200px;
  min-width: 900px;
  height: auto;
  margin: 0 auto;
}

.title {
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background-color: #8f138f;
  color: #ffffff;
  font-size: 1.5rem;
  border-radius: 50px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.content {
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  padding-top: 3rem;
}

.arrow-right {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #dddddd;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
  position: absolute;
  right: -5px;
  bottom: 5px;
}

.arrow-left {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #a6e1fa;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
  position: absolute;
  left: -5px;
  bottom: 5px;
}

.user-message {
  align-self: flex-end;
  background-color: #dddddd;
  color: #000000;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 10px;
  max-width: 70%;
}

.bot-message {
  align-self: flex-start;
  background-color: #a6e1fa;
  color: #000000;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 10px;
  max-width: 70%;
}

.user-message,
.bot-message {
  max-width: 60%;
  position: relative;
  padding-right: 15px;
  padding-left: 15px;
}

.footer {
  width: 1200px;
  height: 4rem;
  color: #ffffff;
  font-size: 2rem;
  border-radius: 50px;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
}

.footer > input {
  width: 87%;
  height: 3rem;
  border: 1px solid #8f138f;
  outline: none;
  border-radius: 50px;
  padding: 0 1rem;
  font-size: 1.5rem;
  background-color: #d3bce2;
  color: #000000;
}

.file-upload-button button {
  background-color: #7a4988;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
}

.btu button {
  background-color: #d3bce2;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 15px 15px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.btu button.btn-active {
  background-color: #7a4988;
}

.btu button:hover {
  background-color: #9b59b6;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.3);
}

.btu button:active {
  background-color: #6d398b;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
}

input[type="file"] {
  display: none;
}
</style>
