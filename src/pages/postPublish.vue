<template>
  <div class="post-publish">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <VueEditor v-model="form.content"></VueEditor>
      </el-form-item>
      <el-form-item label="栏目">
        <el-checkbox-group v-model="form.categories">
          <el-checkbox v-for="item in categoryList" :key="item.id" :label="item.id" name="type">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          :action="$axios.defaults.baseURL+'/upload'"
          list-type="picture-card"
          :headers="myHeaders"
          :file-list="fileList"
          :on-success="handleSuccess"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio v-model="form.type" label="1">文章</el-radio>
        <el-radio v-model="form.type" label="2">视频</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendPost">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      form: {
        title: '',
        categories: [],
        type: '1',
        content: '',
        cover: []
      },
      categoryList: [],
      myHeaders: {
        Authorization: localStorage.getItem('token')
      },
      fileList: []
    }
  },
  async created () {
    this.getCategoryList()
    const id = this.$route.params.id
    if (id) {
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.form = {
          ...data,
          cover: data.cover.map(item => {
            return {
              id: item.id,
              url: this.$fixURL(item.url)
            }
          }),
          categories: data.categories.map(item => {
            return item.id
          }),
          type: data.type.toString()
        }
        this.fileList = this.form.cover
        console.log(this.form)
      }
    }
  },
  methods: {
    async getCategoryList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.categoryList = data.filter(item => item.name !== '头条')
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleSuccess (res, file) {
      const { statusCode, data } = res
      if (statusCode === 200) {
        this.form.cover.push({
          id: data.id,
          url: this.$fixURL(data.url)
        })
      }
      console.log(this.form.cover)
    },
    async sendPost () {
      const data = {
        ...this.form,
        categories: this.form.categories.map(item => {
          return {
            id: item
          }
        })
      }
      const res = await this.$axios.post('/post', data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$message.success(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post-publish{
  .el-breadcrumb{
    margin-bottom: 20px;
  }
  .quillWrapper{
    background-color: #fff;
  }
}
</style>
