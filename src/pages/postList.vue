<template>
  <div class="post-list">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="postList"
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        :index="index"
        width="180">
      </el-table-column>
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
          <img :src="$fixURL(row.cover[0].url)" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template v-slot="{row}">
          <el-button size="mini" @click="editor(row.id)">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[3,6,9,12]"
      :page-size="pageSize"
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
      pageSize: 3,
      currentPage4: 1,
      total: 0
    }
  },
  created () {
    this.getPostList()
  },
  methods: {
    async getPostList () {
      const res = await this.$axios.get('/post', {
        params: {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      })
      const { statusCode, data, total } = res.data
      if (statusCode === 200) {
        this.postList = data
        this.total = total
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getPostList()
    },
    handleCurrentChange (val) {
      this.pageIndex = val
      this.getPostList()
    },
    index (index) {
      return (this.pageIndex - 1) * this.pageSize + index + 1
    },
    editor (id) {
      this.$router.push({
        name: 'postPublish',
        params: {
          id
        }
      })
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
