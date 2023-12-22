<template>
  <div id="app">
    <el-row class="title"
      >SNSソフト・社内ボット
      <el-dropdown class="title-menu">
        <span class="el-dropdown-link"> ☰ </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="showPersonalInfo"
            >個人情報</el-dropdown-item
          >
          <el-dropdown-item @click.native="logout">ログアウト</el-dropdown-item>
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
        <v-card-text v-html="parseHTML(message.text)"> </v-card-text>
        <!-- {{ message.text }} -->
      </el-col>
    </el-row>
    <el-row class="footer footer-row">
      <el-col :span="16">
        <el-input
          type="text"
          v-model="userMessage"
          @keypress.enter.native="sendMessage"
          placeholder="メッセージを入力"
          class="custom-input-style"
          :disabled="isInputDisabled"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button
          :class="[
            userMessage.trim() ? 'custom-purple-button' : 'light-purple-button',
          ]"
          @click="sendMessage"
          :disabled="isButtonDisabled || isLoading"
        >
          <template v-if="isLoading">
            <!-- 这里可以使用Element UI的Loading组件或自定义等待图标 -->
            <i class="el-icon-loading"></i>
          </template>
          <template v-else> 送信 </template>
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userMessage: "",
      messages: [],
      isInputNotEmpty: false,
      showPrompt: false,
      isInputDisabled: false,
      isButtonDisabled: false,
      isLoading: false,
    };
  },
  methods: {
    async sendMessage() {
      if (this.userMessage.trim() !== "") {
        // 开始加载时设置为true
        this.isLoading = true;
        // 在发送请求前禁用输入框
        this.isInputDisabled = true;
        this.isButtonDisabled = true;
        this.messages.push({
          text: this.userMessage,
          isUser: true,
        });
        // 使用 $nextTick 确保 DOM 更新后再滚动
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        try {
          var localPath = this.GLOBAL.localSrc;
          const token = localStorage.getItem("token");
          // 发送 API 请求
          const response = await axios.post(
            "/api/chat/sendMessage",
            {
              message: this.userMessage,
            },
            {
              headers: {
                "Content-Type": "application/json",
                token: token,
              },
            }
          );

          // 处理 API 响应
          if (response.data && response.data.state === 20000) {
            const botResponse = response.data.data;
            const formattedResponse = botResponse.replace(/\\n/g, "\n");

            // 将机器人的响应添加到 messages 数组中
            this.messages.push({
              text: botResponse,
              isUser: false,
            });
            // 确保在DOM更新后执行滚动操作
            this.$nextTick(() => {
              this.scrollToBottom();
            });
          } else {
            console.error("API response error:", response.data);
            this.messages.push({
              text: response.data.message,
              isUser: false,
            });
          }
        } catch (error) {
          console.error("API request error:", error);
          this.$notify.error({
            title: "失敗しました.",
            message: error,
          });
        }
        // 加载完成后设置为false
        this.isLoading = false;
        this.isInputDisabled = false;
        this.isButtonDisabled = false;
        this.userMessage = "";
      }
    },
    scrollToBottom() {
      const content = this.$el.querySelector(".content");
      if (content) {
        content.scrollTop = content.scrollHeight;
      }
    },
    showPersonalInfo() {
      // 处理显示个人信息的逻辑
      console.log("132");
    },
    logout() {
      console.log("132");
      // 清除本地存储中的 Token
      localStorage.removeItem("token"); // 或者使用 sessionStorage
      this.$router.push("/");
    },
    parseHTML: function (message) {
      return message.replace(/\n/g, "<br>"); // 将换行符替换为HTML的<br>标签
    },
  },
  watch: {
    userMessage(newVal) {
      this.isInputNotEmpty = newVal.trim() !== "";
    },
  },
};
</script>
<style >
body,
html {
  background-color: #faf0e6 !important;
  font-family: "Arial", sans-serif;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
<style scoped>
#app {
  background-size: cover;
  max-width: 100%;
  min-width: 0;
  height: auto;
  margin: 0 auto;
}

.title {
  max-width: 90%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background-color: #8f138f;
  color: #ffffff;
  font-size: 1.5rem;
  border-radius: 50px;
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
  padding-bottom: 5rem;
  overflow-y: auto;
  max-height: calc(100vh - 7rem);
}

.user-message,
.bot-message {
  max-width: 25%;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  padding: 10px 20px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
  margin-bottom: 1rem;
  background-color: white;
  border: 1px solid #eaeaea;
  position: relative;
  align-items: flex-start;
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
  width: 100%;
  height: 4rem;
  font-size: 2rem;
  border-radius: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  padding: 0;
}

.footer-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.footer > .el-col {
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

.footer > .el-col:nth-child(1) {
  margin-right: 10px;
}

.footer > .el-col:nth-child(2) {
  margin-right: 5px;
}

.footer > .el-col:nth-child(3) {
  margin-left: 5px;
}

.footer > .el-col:nth-child(1),
.footer > .el-col:nth-child(3) {
  margin: 0 5px;
}

.custom-input-style .el-input__inner {
  width: 100%;
  border-radius: 30px;
  border-color: #d3bce2;
  color: #000000;
  min-height: 36px;
  height: auto;
  margin: 0;
}

.custom-input-style .el-input__inner::placeholder {
  color: #808080;
}

.custom-input-style .el-input__inner:-ms-input-placeholder {
  color: #808080;
}

.custom-input-style .el-input__inner::-moz-placeholder {
  color: #808080;
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
  border-radius: 25px;
  padding: 10px 15px;
  font-size: 1.2rem;
}

/* 添加等待图标的样式 */
.el-icon-loading {
  /* 这里可以自定义样式，例如旋转动画等 */
}

input[type="file"] {
  display: none;
}

@media (max-width: 768px) {
  body,
  html {
    font-size: 14px;
  }

  .content {
    padding-top: 3.5rem;
    padding-bottom: 5rem;
  }

  .title,
  .footer {
    width: 100%;
    position: relative;
  }

  .user-message,
  .bot-message {
    max-width: 90%;
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    padding: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
  }

  .footer > .el-col {
    padding: 0 5px;
  }

  .file-upload-button {
    flex: 0 0 36px;
    padding: 0;
  }

  .custom-input-style .el-input__inner {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 60%;
    min-width: 150px;
    margin: 0 5px;
  }

  .custom-purple-button,
  .light-purple-button {
    flex: 0 0 72px;
    padding: 0 20px;
  }
  /* 调整输入框和按钮的大小以适应小屏幕 */
  .custom-input-style .el-input__inner,
  .custom-purple-button,
  .light-purple-button {
    min-height: 3rem; /* 增加高度以便于触摸 */
  }
}
</style>
