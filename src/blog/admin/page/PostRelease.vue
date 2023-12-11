<script setup>
import {ref, onMounted} from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import {savePost} from "@/blog/api/blogAdminPost.js";
import {ElNotification} from "element-plus";


const post = ref({
  id: null,
  title: "",
  content: "",
  likes: 0,
  comments: 0,
  coverImageUrl: "",
  summary: "",
  viewCount: 0,
  isPublished: 0,
  categoryId: 0,
  tags: "",
  password: "",
  type: 0,
  sourceUrl: "",
  allowComments: 0,
  allowLikes: 0,
  isFeatured: 0,
  publishedTime: "",
  authorName: "",
  authorBio: "",
  seoTitle: "",
  seoDescription: "",
  tenantId: 0,
  updatedTime: "",
  version: 0,
  logicDelete: 0,
  createdTime: "",
  createdBy: 0,
  updatedBy: 0
})

const vditor = ref(null)
onMounted(() => {
  vditor.value = new Vditor('vditor', {
    minHeight: 500,
    height: "700",
    after() {
      vditor.value.setValue('开始你的发挥');
    },
    counter: {
      enable: true //开启字数统计
    }
  })
})

function save() {
  post.value.isPublished = 1
  post.value.content = vditor.value.getHTML()
  savePost(post.value).then(res => {

    ElNotification({
      title: '保存成功',
      message: '发布更改',
      type: 'success',
    })
  })
}

function saveDraft() {
  post.value.isPublished = 0
  post.value.content = vditor.value.getValue()
  savePost(post.value).then(res => {
    ElNotification({
      title: '保存成功',
      message: '草稿以保存',
      type: 'success',
    })
  })
}
</script>

<template>
  <div>
    <div>
      <el-form :model="post">
        <el-form-item>
          <el-col :span="24">
            <el-input v-model="post.title" placeholder="文章标题"/>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-date-picker
              v-model="post.publishedTime"
              type="date"
              placeholder="发布时间"
              value-format="YYYY-MM-DD hh:mm:ss"
          />
          <span class="w-2.5"></span>
          <el-button type="danger" @click="saveDraft">保存草稿</el-button>
          <el-button type="success" @click="save">发布文章</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="vditor"/>
  </div>
</template>

<style scoped>

</style>