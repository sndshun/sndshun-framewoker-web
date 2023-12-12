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

const page = reactive({
  current: 1,
  size: 10,
})

function InitPage() {
  page.current = 1
  visitLog()
}

visitLog();

function visitLog() {
  getVisitLog().then((res) => {
    visit.list = res.records;
    visit.current = res.current;
    visit.size = res.size;
    visit.pages = res.pages;
    visit.total = res.total;
  });
}
</script>

<template>
  <el-card header="访客日志">
    <el-table
        :data="visit.list"
        row-key="id"
        :tree-props="{ children: 'children' }"
        max-height="500"
    >
    <el-table-column fixed prop="uuid" label="访客标识码" width="285"/>
    <el-table-column prop="uri" label="请求接口" width="200" />
    <el-table-column prop="method" label="请求方式" width="120" />
    <el-table-column prop="behavior" label="访问行为" width="120" />
    <el-table-column prop="content" label="访问内容" width="120" />
    <el-table-column prop="ip" label="IP" width="120" />
    <el-table-column prop="os" label="操作系统" width="260" />
    <el-table-column prop="browser" label="浏览器" width="120" />
    <el-table-column prop="times" label="请求耗时（毫秒）" width="150" />
    <el-table-column prop="createTime" label="访问时间" width="160" />
    </el-table>
    <div class="flex justify-end mt-2">
      <el-pagination
          v-model:current-page="page.current"
          v-model:page-size="page.size"
          :page-sizes="[10,20,30,50,100,200]"
          layout="total, sizes, prev, pager, next, jumper"
          background
          small
          :total="visit.total"
          @size-change="InitPage"
          @current-change="visitLog"
      />
    </div>
  </el-card>
</template>

<style scoped>
</style>