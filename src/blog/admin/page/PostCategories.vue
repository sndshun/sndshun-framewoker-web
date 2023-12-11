<script setup>

import {reactive, ref} from "vue";
import {getAdminBlogCategoriesTree} from "@/blog/api/blogAdminCategories.js";

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

})

init()
function init() {
  getAdminBlogCategoriesTree(page, query).then(res => {
    dataList.list = res
  })
}

function InitPage() {
  page.current = 1
  init()
}
const is=ref(1)

</script>

<template>
  <el-card header="分类管理">
    <el-table
        :data="dataList.list"
        row-key="id"
        border
        :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="name" label="分类"/>
      <el-table-column prop="description" label="描述" show-overflow-tooltip/>
      <el-table-column prop="slug" label="别名" />
      <el-table-column prop="postCount" label="文章数" />
      <el-table-column prop="sort" label="排序" />
      <el-table-column label="是否启用">
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
      <el-table-column prop="createdTime" width="170" label="创建时间" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default>
          <el-button link type="primary" size="small" @click="">编辑</el-button>
          <el-button link type="primary" size="small" @click="">详情</el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped>

</style>