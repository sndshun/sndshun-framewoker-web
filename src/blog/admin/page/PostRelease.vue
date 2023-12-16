<script setup>
import {onMounted, ref} from 'vue';
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
    cache: {
      enable: false, //关闭浏览器缓存
    },
    counter: {
      enable: true //开启字数统计
    },
    upload: {
      max: 2 * 1024 * 1024, //文件最大byte
      accept: 'image/*,.mp3, .wav, .rar', //文件上传类型
      url: '/api/file/upload', //文件上传路径
      //linkToImgUrl: '/api/file/path', //粘贴图片上传路径 todo 尼玛搞不来
      linkToImgFormat(string){
        vditor.value.insertValue(`![${JSON.parse(string).data.originalFileName}](${JSON.parse(string).data.ossFilePath})`)
      },
      multiple: false, //是否上传多个文件
      fieldName: 'file', //上传字段名称
      filename(name) {  //文件名安全处理
        return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').replace('/\\s/g', '')
      },
      success(_, msg) {
        vditor.value.insertValue(`![${JSON.parse(msg).data.originalFileName}](${JSON.parse(msg).data.ossFilePath})`)
      }
    },
  })
})

function save() {
  post.value.isPublished = 1
  post.value.content = vditor.value.getValue()
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