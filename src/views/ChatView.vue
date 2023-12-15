<template>
  <div id="app">
    <nav>
      <div class="navbar">ChatGPT Chat App</div>
    </nav>

    <div class="chat-container">
      <div class="message-list">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="message"
          :class="{
            'user-message': message.type === 'user',
            'bot-message': message.type === 'bot',
          }"
        >
          {{ message.text }}
        </div>
      </div>
      <div class="input-box">
        <div class="file-upload">
          <label for="file-input"> + </label>
          <input id="file-input" type="file" @change="handleFileUpload" />
        </div>
        <input
          v-model="userMessage"
          @keyup.enter="sendMessage"
          placeholder="Type your message..."
        />
        <button @click="sendMessage" class="send-button">送信</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMessage: "",
      messages: [],
    };
  },
  methods: {
    sendMessage() {
      if (this.userMessage.trim() !== "") {
        this.messages.push({ text: this.userMessage, type: "user" });
        // Simulate a response from the bot
        this.messages.push({ text: "Bot response...", type: "bot" });
        this.userMessage = "";
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      // Handle the uploaded file as needed
      console.log("Uploaded file:", file);
    },
  },
};
</script>

<style>
body {
  background-color: #ffffff; /* 设置为白色 */
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav {
  background-color: #3498db;
  color: white;
  padding: 10px;
  text-align: center;
}

.chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100vh;
}

.message-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  margin-bottom: 20px;
}

.message {
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
}

.user-message {
  align-self: flex-end;
  background-color: #3498db;
  color: white;
}

.bot-message {
  align-self: flex-start;
  background-color: #e0e0e0;
}

.input-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-top: 20px;
}

.file-upload {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.file-upload label {
  cursor: pointer;
  background-color: #3498db;
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
}

input[type="file"] {
  display: none;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

button.send-button {
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

img {
  width: 20px;
  height: 20px;
}
</style>
