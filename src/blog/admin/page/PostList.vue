<script setup>
import {reactive, ref} from "vue";
import {getPostAdminPage} from "@/blog/api/blogAdminPost.js";
import {getAdminCategoriesMap} from "@/blog/api/blogAdminCategories.js";
import {getDictMapByCode} from "@/blog/api/blogDict.js";
import {getAdminTagsMap} from "@/blog/api/blogAdminTag.js";

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  }, {
    text: '最近一年',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      return [start, end]
    },
  }, {
    text: '最近三年',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 3)
      return [start, end]
    },
  },
]


const cateMap=ref(null)
const dictBlogPostType=ref(null)
const tagMap=ref(null)
postLoad()
async function postLoad() {
  cateMap.value=await getAdminCategoriesMap()
  dictBlogPostType.value=await getDictMapByCode('blog_post_type')
  tagMap.value=await getAdminTagsMap()
  init()
}


const dataList = reactive({
  list: [],
  current: 1,
  size: 10,
  pages: null,
  total: 0,
});
const page = reactive({
  current: 1,
  size: 10,
})
const query = reactive({
  isPublished: null,
  logicDelete: null,
  type: null,
  categoryId: null,
  tags: null,
  title: null,
  publishedTime: null,
})

function init() {
  getPostAdminPage(page, query).then(res => {
    dataList.list = res.records
    dataList.current = res.current
    dataList.size = res.size
    dataList.pages = res.pages
    dataList.total = res.total
  })
}

function InitPage() {
  page.current = 1
  init()
}


const status = ref('1');
function statusChange(val) {
  status.value=val
  if (status.value === '1') {
    query.isPublished = null
    query.logicDelete = null
  } else if (status.value === '2') {
    query.logicDelete = null
    query.isPublished = 1
  } else if (status.value === '3') {
    query.logicDelete = null
    query.isPublished = 0
  } else if (status.value === '4') {
    query.logicDelete = 1
    query.isPublished = null
  }
  init();
}

const selectTable=ref([])
function handleSelectionChange(value) {

}

const is=ref(1)

</script>

<template>
  <el-card shadow="never" class="relative">
    <div class="text-xl before:absolute before:border-l-2 before:border-blue-500
     before:w-1 before:h-7 before:left-0">
      文章列表
    </div>
    <div class="my-5">
      <span class="status">状态</span>
      <span :class="{'active-status':status==='1','status':status!=='1'}" @click="statusChange('1')">全部</span>
      <span :class="{'active-status':status==='2','status':status!=='2'}" @click="statusChange('2')">公开</span>
      <span :class="{'active-status':status==='3','status':status!=='3'}" @click="statusChange('3')">私密</span>
      <span :class="{'active-status':status==='4','status':status!=='4'}" @click="statusChange('4')">回收站</span>
    </div>
    <el-form :inline="true" :model="query" label-width="0">
      <el-form-item>
        <el-select
            v-model="query.type"
            placeholder="请选择文章类型"
            clearable
        >
          <el-option v-for="(v,k) in dictBlogPostType" :label="v" :value="k"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
            filterable
            v-model="query.categoryId"
            placeholder="请选择分类"
            clearable
        >
          <el-option v-for="(v,k) in cateMap" :label="v" :value="k"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!--       todo 这个不好弄啊 -->
        <el-select
            filterable
            v-model="query.tags"
            placeholder="请选择标签"
            multiple
            clearable
            style="width: 240px"
        >
          <el-option v-for="(v,k) in tagMap" :label="v" :value="k"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.title" placeholder="请输入标题" clearable/>
      </el-form-item>
      <el-form-item>
        <el-date-picker
            v-model="query.publishedTime"
            :shortcuts="shortcuts"
            type="datetimerange"
            range-separator="至"
            start-placeholder="起始时间"
            end-placeholder="结束时间"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="InitPage">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="mb-2">
      <el-button type="primary">批量操作</el-button>
      <el-button type="primary">批量操作</el-button>
      <el-button type="primary">批量操作</el-button>
    </div>
    <el-table :data="dataList.list"
              border
              @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="42"/>
      <el-table-column prop="title" label="标题" width="200" fixed show-overflow-tooltip/>
      <el-table-column prop="coverImageUrl" label="封面" show-overflow-tooltip/>
      <el-table-column label="分类" show-overflow-tooltip>
        <template #default="scope">
          {{cateMap[scope.row.categoryId]}}
        </template>
      </el-table-column>
      <el-table-column label="标签">
        <template #default="scope">
          <el-tag>123</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="浏览量"/>
      <el-table-column label="类型">
        <template #default="scope">
          {{dictBlogPostType[scope.row.type]}}
        </template>
      </el-table-column>
      <el-table-column prop="publishedTime" label="发布时间" width="170" show-overflow-tooltip/>
      <el-table-column label="发布">
        <template #default="scope">
          <el-switch
              v-model="is"
              inline-prompt
              active-text="是"
              inactive-text="否"
              :active-value="1"
              :inactive-value="0"
          />
        </template>
      </el-table-column>
      <el-table-column label="置顶">
        <template #default="scope">
          <el-switch
              v-model="is"
              inline-prompt
              active-text="是"
              inactive-text="否"
              :active-value="1"
              :inactive-value="0"
              loading
          />
        </template>
      </el-table-column>
      <el-table-column label="是否推荐">
        <template #default="scope">
          <el-switch
              v-model="is"
              inline-prompt
              active-text="是"
              inactive-text="否"
              :active-value="1"
              :inactive-value="0"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default>
          <el-button link type="primary" size="small" @click="">编辑</el-button>
          <el-button link type="primary" size="small" @click="">详情</el-button>
          <!-- 密码原文链接是否可以评论点赞等设置 -->
          <el-button link type="primary" size="small" @click="">设置</el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-end mt-2">
      <el-pagination
          v-model:current-page="page.current"
          v-model:page-size="page.size"
          :page-sizes="[10,20,30,50,100,200]"
          layout="total, sizes, prev, pager, next, jumper"
          background
          small
          :total="dataList.total"
          @size-change="InitPage"
          @current-change="init"
      />
    </div>
  </el-card>
</template>

<style scoped>
.active-status {
  margin-right: 1.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
  --tw-text-opacity: 1;
  color: rgb(0 0 0);
  cursor: pointer;
}
.status {
  margin-right: 1.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  --tw-text-opacity: 1;
  color: rgb(148 163 184);
  cursor: pointer;
}
</style>