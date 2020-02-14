<template>
  <div class="post-list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="postList"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="user.nickname"
        label="作者"
        width="200">
      </el-table-column>
      <el-table-column
        label="日期"
        width="200">
        <template v-slot="{row}">
          {{row.create_date | time}}
        </template>
      </el-table-column>
      <el-table-column
        label="封面">
        <template v-slot="{row}">
          <img :src="row.cover[0].url" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template>
          <el-button
            size="mini"
            >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage4"
      :page-sizes="[5,10,15,20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      postList: [],
      pageIndex: 1,
      pageSize: 5,
      currentPage4: 2,
      total: ''
    }
  },
  created () {
    this.getAllPostList()
    this.getPostList()
  },
  methods: {
    async getAllPostList () {
      const res = await this.$axios.get('/post')
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.total = res.data.total
      }
    },
    async getPostList () {
      const res = await this.$axios.get('/post', {
        params: {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        console.log(data)
        this.postList = data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post-list{
  .el-breadcrumb{
    margin-bottom: 20px;
  }
  .el-table{
    img{
      width: 234px;
      height: 146px;
      object-fit: cover;
    }
  }
}
</style>
