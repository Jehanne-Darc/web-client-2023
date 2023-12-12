<template>
  <div class="login">
    <div style="width: 500px; margin: 50px auto; padding: 30px 50px; background: #fff;">
      <h1 style="text-align: center; margin: 20px 0;">管理者登録</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="ユーザー" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="パスワード" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">ログイン</el-button>
          <el-button @click="resetForm('ruleForm')">リセツト</el-button>
        </el-form-item>
      </el-form>
      <div style="text-align: center;">
        <el-link href="/sys-admin/">バックグラウンド管理(一時的、ログイン不要でジャンプできます)</el-link>
   
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('您输入的用户名和密码的格式是正确的，但是，登录功能我们还没做!');
          let url = 'http://localhost:8080/login';
          console.log('尝试登录')
          console.log('请求路径为:' + url)
          console.log('请求参数为:' + this.ruleForm)
          console.log(this.ruleForm)
          this.axios.post(url, this.ruleForm).then((response) => {
            console.log(response);
            if (response.data == 1) {
              console.log('登陆成功');
              this.$message({
                message: '登录成功',
                type: 'success'
              });
            } else if (response.data == 2) {
              console.log('登录失败,用户名错误!')
              this.$notify.error({
                title: '登录失败',
                message: '登录失败,用户名错误'
              });
            } else {
              console.log('登录失败,密码错误')
              this.$notify.error({
                title: '登录失败',
                message: '登录失败,密码错误'
              });
            }
          });
        } else {
          console.log('error submit!!')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
body {
  background-color: #0f66bb !important;
}

.login {
  background-image: url("../../public/login_bg.png");
}
</style>