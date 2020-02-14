<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号:">
        <el-input v-model="form.username" placeholder="请输入账号" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      if (this.form.username && this.form.password) {
        const res = await this.$axios.post('/login', this.form)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.$message.success('登陆成功 ! 即将进入主页面')
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('token', data.token)
          setTimeout(() => {
            this.$router.push('/')
          }, 1500)
        } else {
          this.$message.error(res.data.message)
        }
      } else {
        this.$message.error('用户名或密码不能为空')
      }
    },
    reset () {
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  width: 400px;
  height: 400px;
  margin: 200px auto;
  border: 1px solid #ccc;
  padding-right: 50px;
  .el-form{
    margin: 100px auto;
    .el-form-item{
      &:last-child{
        .el-button{
         margin: 0 40px;
        }
      }
    }
  }
}
</style>
