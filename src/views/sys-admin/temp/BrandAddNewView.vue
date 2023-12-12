<template>
  <div>
    <h1>ブランドを追加</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="ピンイン" prop="pinyin">
        <el-input v-model="ruleForm.pinyin"></el-input>
      </el-form-item>
      <el-form-item label="ロゴ" prop="logo">
        <el-input v-model="ruleForm.logo"></el-input>
      </el-form-item>
      <el-form-item label="紹介" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="キーワード" prop="keywords">
        <el-input v-model="ruleForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="並び順" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item label="有効/無効" prop="enable">
        <el-switch
            v-model="ruleForm.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">ブランドを追加</el-button>
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
        sort: '',
        enable: '',
        keywords: '',
        logo: '',
        pinyin: ''
      },
      rules: {
        name: [
          { required: true, message: 'ブランド名を入力してください', trigger: 'blur' },
          { min: 2, max: 20, message: '2文字から20文字までの長さを入力してください', trigger: 'blur' }
        ],
        pinyin: [
          { required: true, message: 'ブランドのピンインを入力してください', trigger: 'blur' },
          { min: 4, max: 25, message: '4文字から25文字までの長さを入力してください', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'ブランド紹介を入力してください', trigger: 'blur' },
          { min: 2, max: 30, message: '2文字から30文字までの長さを入力してください', trigger: 'blur' }
        ],
        sort: [
          { pattern: /^(\d{1}|[0-9]{1}[0-9]?)$/, message: 'カスタム並び順は0から99までの数字で入力してください', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('您输入的用户名和密码的格式是正确的，但是，登录功能我们还没做!');
          let url = 'http://localhost:9090/brands/add-new';
          console.log('ブランドを追加しようとしています')
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
              console.log('ブランド追加成功');
              this.$message({
                message: 'ブランド追加成功',
                type: 'success'
              });
            } else {
              console.log(responseDate.message)
              this.$notify.error({
                title: 'ブランド追加失敗',
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
