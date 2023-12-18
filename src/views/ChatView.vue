<template>
  <div id="app">
    <div class="title">SNSソフト・社内ボット</div>
    <div class="content">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="{ 'user-message': message.isUser }"
      >
        {{ message.text }}
      </div>
    </div>
    <div class="footer">
      <label for="fileInput" class="file-upload-button">
        +
        <input
          type="file"
          id="fileInput"
          @change="handleFileChange"
          style="display: none"
        />
      </label>
      <input
        type="text"
        v-model="userMessage"
        @keyup.enter="sendMessage"
        placeholder="メッセージを入力"
      />
      <div class="btu" @click="sendMessage">
        <img src="../assets//plane.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMessage: "", // 用户输入的消息
      messages: [], // 存储用户发送的消息的数组
      selectedFile: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadFile() {
      if (this.selectedFile) {
        console.log("選択済ファイル:", this.selectedFile.name);
      } else {
        console.log("ファイルをアップロードしてください。");
      }
    },
    sendMessage() {
      // 在这里可以执行发送消息的相关操作，例如将消息添加到数组
      if (this.userMessage.trim() !== "") {
        this.messages.push({
          text: this.userMessage,
          isUser: true, // 标记为用户发送的消息
        });
        this.userMessage = ""; // 清空输入框
      }
    },
  },
};
</script>

<style>
body,
html {
  background-color: #ffffff; /* 白色背景 */
  /* 设置为白色 */
  font-family: "Arial", sans-serif;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  max-width: 1200px;
  min-width: 900px;
  height: auto;
  margin: 0 auto;
}

.title {
  z-index: 20;
  width: 1200px;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background-color: #8f138f;
  color: #ffffff;
  font-size: 1.5rem;
  border-radius: 50px;
  position: fixed;
  top: 0;
}

.content {
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.user-message {
  align-self: flex-end;
  background-color: #dddddd; /* 灰色背景 */
  color: #000000; /* 黑色字体 */
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 10px;
  max-width: 70%;
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
}

.footer > input {
  width: 87%;
  height: 3rem;
  border: 1px solid #8f138f;
  outline: none;
  border-radius: 50px;
  padding: 0 1rem;
  font-size: 1.5rem;
  background-color: #d9cad9;
  color: #000000;
}

.footer > button {
  border: none;
  border-radius: 50px;
  background-color: #8f138f;
  width: 3rem;
  height: 3rem;
  font-size: 2rem;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-upload-button,
.btu {
  cursor: pointer;
  border: none;
  border-radius: 50px;
  background-color: #8f138f;
  width: 3rem;
  height: 3rem;
  font-size: 2rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="file"] {
  display: none;
}

.footer > .btu > img {
  width: 1.4rem;
  height: 1.4rem;
}
</style>
