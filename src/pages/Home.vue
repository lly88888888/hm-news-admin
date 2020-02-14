<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="title">黑马头条</div>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          :router="true"
          active-text-color="#ffd04b">
          <el-menu-item index="/postList">
            <i class="el-icon-s-operation"></i>
            <span slot="title">文章列表</span>
          </el-menu-item>
          <el-menu-item index="/postPublish">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <img :src="$axios.defaults.baseURL+user.head_img" alt="">
          <span>{{user.nickname}}</span>
          <div class="exit" @click="logOut">退出</div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  methods: {
    async logOut () {
      try {
        await this.$confirm('是否确认退出本系统?', '温馨提示', {
          type: 'warning'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.$router.push('login')
      } catch (error) {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  position: absolute;
  width: 100%;
  height: 100%;
  .el-container{
    height: 100%;
    .el-header {
      background-color: #545c64;
      color: #333;
      text-align: center;
      line-height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: #fff;
      img{
        width: 37px;
        height: 37px;
        border-radius: 50%;
      }
      span{
        margin: 0 10px;
      }
      .exit{
        color: #999;
        cursor: pointer;
      }
    }
    .el-aside {
      background-color: #545c64;
      color: #333;
      text-align: center;
      color: #fff;
      .title{
        font-size: 20px;
        font-weight: bold;
        height: 60px;
        line-height: 60px;
        background-color: #999;
      }
    }
    .el-main {
      background-color: #E9EEF3;
      color: #333;
    }
  }

}
</style>
