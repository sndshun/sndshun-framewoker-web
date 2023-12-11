<script setup>
import { getVisitLog } from "@/blog/api/blogAdmin.js";
import { reactive } from "vue";

const visit = reactive({
  list: [],
  current: 1,
  size: 10,
  pages: null,
  total: null,
});

visitLog();

function visitLog() {
  getVisitLog().then((res) => {
    visit.list = res.records;
    visit.current = res.current;
    visit.size = res.size;
    visit.pages = res.pages;
    visit.total = res.total;
    console.log(res);
  });
}
</script>

<template>
  <el-table :data="visit.list" style="width: 100%" max-height="800">
    <el-table-column fixed prop="uuid" label="访客标识码" width="280" />
    <el-table-column prop="uri" label="请求接口" width="170" />
    <el-table-column prop="method" label="请求方式" width="120" />
    <el-table-column prop="behavior" label="访问行为" width="120" />
    <el-table-column prop="content" label="访问内容" width="120" />
    <el-table-column prop="ip" label="IP" width="120" />
    <el-table-column prop="os" label="操作系统" width="260" />
    <el-table-column prop="browser" label="浏览器" width="120" />
    <el-table-column prop="times" label="请求耗时（毫秒）" width="150" />
    <el-table-column prop="createTime" label="访问时间" width="160" />
  </el-table>
  <el-skeleton />
  <br />
  <el-skeleton style="--el-skeleton-circle-size: 100px">
    <template #template>
      <el-skeleton-item variant="circle" />
    </template>
  </el-skeleton>
</template>

<style scoped>
</style>