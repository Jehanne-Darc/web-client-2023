<template>
  <div id="app">
    <el-row class="title"
      >SNSソフト・社内ボット
      <el-dropdown class="title-menu">
        <span class="el-dropdown-link"> ☰ </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click="showPersonalInfo"
            >個人情報</el-dropdown-item
          >
          <el-dropdown-item @click="logout">ログアウト</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
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
      <el-col :span="1">
        <el-button
          icon="el-icon-plus"
          circle
          class="custom-purple-button file-upload-button"
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
      <el-col :span="20">
        <el-input
          type="text"
          v-model="userMessage"
          @keypress.enter.native="sendMessage"
          placeholder="メッセージを入力"
          class="custom-input-style"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button
          :class="[
            userMessage.trim() ? 'custom-purple-button' : 'light-purple-button',
          ]"
          @click="sendMessage"
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
    showPersonalInfo() {
      // 处理显示个人信息的逻辑
    },
    logout() {
      // 处理退出登录的逻辑
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
  background-color: #faf0e6 !important;
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
  /* position: fixed; */
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  position: relative;
}

.title-menu {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
}

#app .el-dropdown .el-dropdown-menu .el-dropdown-item {
  font-weight: bold;
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

.user-message,
.bot-message {
  position: relative;
  padding: 0.5rem 15px;
  margin: 0.5rem 0;
  border-radius: 10px;
  min-width: 15%;
  max-width: 30%;
  word-wrap: break-word;
  display: inline-block;
}

.user-message {
  align-self: flex-end;
  background-color: #dddddd;
  color: #000000;
}

.bot-message {
  align-self: flex-start;
  background-color: #a6e1fa;
  color: #000000;
}

.footer {
  width: 1200px;
  height: 4rem;
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

.custom-input-style .el-input__inner {
  border-radius: 20px;
  border-color: #d3bce2;
  color: #000000;
}

.custom-input-style .el-input__inner::placeholder {
  color: #000000;
}

.custom-input-style .el-input__inner:-ms-input-placeholder {
  color: #000000;
}

.custom-input-style .el-input__inner::-moz-placeholder {
  color: #000000;
  opacity: 1;
}

.custom-purple-button {
  background-color: #8f138f;
  color: white;
}

.light-purple-button {
  background-color: #d3bce2;
  color: purple;
}

.custom-purple-button,
.light-purple-button {
  border-radius: 20px;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 1rem;
}

.file-upload-button {
  margin-right: 0;
}

.send-button {
  margin-left: 20px;
}

input[type="file"] {
  display: none;
}

@media (max-width: 768px) {
  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10; /* 确保footer在最上层 */
  }

  /* 为body或主要内容区域添加足够的底部内边距 */
  body {
    padding-bottom: 4rem; /* 至少与footer的高度一致 */
  }
}
</style>
