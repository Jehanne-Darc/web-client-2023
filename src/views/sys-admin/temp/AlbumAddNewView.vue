<template>
  <div>
    <h1>アルバムを追加</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名前" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="紹介" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="並び順" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">アルバムを追加</el-button>
        <el-button @click="resetForm('ruleForm')">リセット</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        description: '',
        sort: ''
      },
      rules: {
        name: [
          { required: true, message: 'アルバム名を入力してください', trigger: 'blur' },
          { min: 2, max: 20, message: '2文字から20文字までの長さを入力してください', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'アルバム紹介を入力してください', trigger: 'blur' },
          { min: 2, max: 30, message: '2文字から30文字までの長さを入力してください', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: 'アルバム並び順を入力してください', trigger: 'blur' },
          { min: 1, max: 2, message: '1桁から2桁までの数字を入力してください', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('您输入的用户名和密码的格式是正确的，但是，登录功能我们还没做!');
          let url = 'http://localhost:9090/albums/add-new';
          console.log('アルバムを追加しようとしています')
          console.log('リクエストパス:' + url)
          console.log('リクエストパラメータ:' + this.ruleForm)
          console.log(this.ruleForm)
          let fromDate = this.qs.stringify(this.ruleForm)
          console.log('ruleFormをfromDateに変換')
          console.log(fromDate)
          this.axios.post(url, fromDate).then((response) => {
            console.log(response);
            let responseDate = response.data
            if (responseDate.state == 20000) {
              console.log('アルバム追加成功');
              this.$message({
                message: 'アルバム追加成功',
                type: 'success'
              });
            } else {
              console.log(responseDate.message)
              this.$notify.error({
                title: '失敗しました',
                message: responseDate.message
              });
            }
          });
        } else {
          console.log('エラーが発生しました')
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

<style scoped>

</style>
