<script setup>
import {onActivated, ref} from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import {savePost,getPostAdminOne} from "@/blog/api/blogAdminPost.js";
import {getAdminCategoriesMap} from "@/blog/api/blogAdminCategories.js";
import {ElMessage, ElNotification} from "element-plus";
import {getDictMapByCode} from "@/blog/api/blogDict.js";
import {getAdminTagsMap} from "@/blog/api/blogAdminTag.js";
import {useRoute} from "vue-router";

const route=useRoute()

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
  categoryId: null,
  tags: "",
  password: "",
  type: null,
  sourceUrl: "",
  allowComments: 1,
  allowLikes: 1,
  isFeatured: 0,
  publishedTime: "",
  sort: 1,
  authorName: "",
  authorBio: "",
  seoTitle: "",
  seoDescription: "",
})

const vditor = ref(null)
onActivated(async () => {
  if (route.query.id) {
    post.value = await getPostAdminOne(route.query.id);
  } else {
    post.value={}
  }
  vditor.value = new Vditor('vditor', {
    minHeight: 500,
    height: "700",
    after() {
      if(post.value.content){
        vditor.value.setValue(post.value.content);
      }else {
        vditor.value.setValue('开始你的发挥');
      }
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
  });

})

const activeNames = ref(['1'])
const cateMap=ref(null)
const dictBlogPostType=ref(null)
const tagMap=ref(null)
postLoad()
async function postLoad() {
  cateMap.value=await getAdminCategoriesMap()
  dictBlogPostType.value=await getDictMapByCode('blog_post_type')
  tagMap.value=await getAdminTagsMap()
}
const handleAvatarSuccess = (response, uploadFile) => {
  post.value.coverImageUrl = response.data.ossFilePath
}
const beforeAvatarUpload = (rawFile) => {
  if (!rawFile.type.includes('image')) {
    ElMessage.error('请上传指定格式图片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不允许大于 2MB!')
    return false
  }
  return true
}
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
  <el-card>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="文章基本信息" name="1">
          <el-form :model="post">
            <el-form-item>
              <el-upload
                  class="avatar-uploader"
                  action="/api/file/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
              >
                <img v-if="post.coverImageUrl" :src="post.coverImageUrl" class="avatar"  alt="文章封面"/>
                <div class="avatar-uploader-icon" v-else>+</div>
              </el-upload>
            </el-form-item>
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
        </el-collapse-item>
        <el-collapse-item title="文章详细信息" name="2">
          <el-form :model="post">
            <el-form-item>
              <el-input type="textarea" v-model="post.summary" placeholder="摘要"/>
            </el-form-item>
            <el-form-item>
              <el-space>
                <el-select
                    v-model="post.type"
                    placeholder="请选择文章类型"
                    clearable
                >
                  <el-option v-for="(v,k) in dictBlogPostType" :label="v" :value="k"/>
                </el-select>
                <el-select
                    filterable
                    v-model="post.categoryId"
                    placeholder="请选择分类"
                    clearable
                >
                  <el-option v-for="(v,k) in cateMap" :label="v" :value="k"/>
                </el-select>
                <el-select
                    filterable
                    v-model="post.tags"
                    placeholder="请选择标签"
                    multiple
                    clearable
                    style="width: 240px"
                >
                  <el-option v-for="(v,k) in tagMap" :label="v" :value="k"/>
                </el-select>
              </el-space>
            </el-form-item>
            <el-form-item>
              <el-input v-model="post.password" placeholder="访问密码"/>
            </el-form-item>
            <el-form-item>
              <el-input v-model="post.sourceUrl" placeholder="原文链接"/>
            </el-form-item>
            <el-form-item>
              <el-space>
                是否置顶：
                <el-switch
                    v-model="post.sort"
                    inline-prompt
                    active-text="是"
                    inactive-text="否"
                    :active-value="-1"
                    :inactive-value="1"
                />
                是否推荐：
                <el-switch
                    v-model="post.isFeatured"
                    inline-prompt
                    active-text="是"
                    inactive-text="否"
                    :active-value="1"
                    :inactive-value="0"
                />
                允许评论：
                <el-switch
                    v-model="post.allowComments"
                    inline-prompt
                    active-text="是"
                    inactive-text="否"
                    :active-value="1"
                    :inactive-value="0"
                />
                允许点赞：
                <el-switch
                    v-model="post.allowLikes"
                    inline-prompt
                    active-text="是"
                    inactive-text="否"
                    :active-value="1"
                    :inactive-value="0"
                />
              </el-space>
            </el-form-item>
            <el-form-item>
              <el-input v-model="post.seoTitle" placeholder="seo标题"/>
            </el-form-item>
            <el-form-item>
              <el-input v-model="post.seoDescription" placeholder="seo描述"/>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div id="vditor"/>
  </el-card>
</template>

<style scoped>
.avatar-uploader {
  width: 178px;
  height: 178px;
  display: block;
  border: 1px dashed #ccc;
  margin-right: 20px;
  border-radius: 5px;
  font-size: 20px;
}
.avatar{
  width: 178px;
  height: 178px;
  display: block;
  object-fit: contain;
}
.avatar-uploader-icon{
  width: 178px;
  height: 178px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>