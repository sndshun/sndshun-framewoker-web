<script setup>
import { getVisitLog } from "@/blog/api/blogAdmin.js";
import { reactive } from "vue";

const visit = reactive({
  list: [],
  current: 1,
  size: 15,
  pages: null,
  total: null,
});

const page = reactive({
  current: 1,
  size: 15,
});

function InitPage() {
  page.current = 1;
  visitLog();
}

visitLog();

function visitLog() {
  getVisitLog(page).then((res) => {
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
      max-height="600"
    >
      <el-table-column fixed prop="uuid" label="访客标识码" width="150" align="center"/>
      <el-table-column prop="uri" label="请求接口" width="210" align="center"/>
      <el-table-column prop="method" label="请求方式" width="100" align="center"/>
      <el-table-column prop="behavior" label="访问行为" width="100" align="center"/>
      <el-table-column prop="content" label="访问内容" width="100" align="center"/>
      <el-table-column prop="param" label="参数" width="110" show-overflow-tooltip="true" align="center"/>
      <el-table-column prop="ip" label="IP" width="110" align="center"/>
      <el-table-column prop="os" label="操作系统" width="120" show-overflow-tooltip="true" align="center"/>
      <el-table-column prop="browser" label="浏览器" width="140" show-overflow-tooltip="true"/>
      <el-table-column prop="times" label="请求耗时" width="90">
        <template #default="scope">
          <el-tag class="ml-2" type="success">{{ scope.row.times}}ms</el-tag>
      </template>
      </el-table-column>
      <el-table-column prop="userAgent" label="用户代理" width="260" show-overflow-tooltip="true" />
      <el-table-column prop="createTime" label="访问时间" width="160" />
    </el-table>
    <div class="flex justify-end mt-2">
      <el-pagination
        v-model:current-page="page.current"
        v-model:page-size="page.size"
        :page-sizes="[15, 30, 50, 100, 200]"
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