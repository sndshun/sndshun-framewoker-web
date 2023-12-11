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
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-white border-b">
              <tr>
                <th
                  scope="col"
                  class="px-2 py-4 text-sm font-medium text-left text-gray-900"
                >
                  访客识别码
                </th>
                <th
                  scope="col"
                  class="px-2 py-4 text-sm font-medium text-left text-gray-900"
                >
                  访问接口
                </th>
                <th
                  scope="col"
                  class="px-2 py-4 text-sm font-medium text-left text-gray-900"
                >
                  请求方式
                </th>
                <th
                  scope="col"
                  class="px-2 py-4 text-sm font-medium text-left text-gray-900"
                >
                  访问行为
                </th>
                <th
                  scope="col"
                  class="px-2 py-4 text-sm font-medium text-left text-gray-900"
                >
                  访问内容
                </th>
                <th
                  scope="col"
                  class="px-2 py-4 text-sm font-medium text-left text-gray-900"
                >
                  IP
                </th>
                <th
                  scope="col"
                  class="px-2 py-4 text-sm font-medium text-left text-gray-900"
                >
                  IP来源
                </th>
                <th
                  scope="col"
                  class="px-2 py-4 text-sm font-medium text-left text-gray-900"
                >
                  操作系统
                </th>
                <th
                  scope="col"
                  class="px-2 py-4 text-sm font-medium text-left text-gray-900"
                >
                  浏览器
                </th>
                <th
                  scope="col"
                  class="px-2 py-4 text-sm font-medium text-left text-gray-900"
                >
                  请求耗时
                </th>
                <th
                  scope="col"
                  class="px-2 py-4 text-sm font-medium text-left text-gray-900"
                >
                  访问时间
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in visit.list" class="bg-gray-100 border-b">
                <td
                  class="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap"
                >
                  {{ item.uuid }}
                </td>
                <td
                  class="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap"
                >
                  {{ item.uri }}
                </td>
                <td
                  class="px-2 py-4 text-sm font-light text-center text-gray-900 whitespace-nowrap"
                >
                  {{ item.method }}
                </td>
                <td
                  class="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap"
                >
                  {{ item.behavior }}
                </td>
                <td
                  class="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap"
                >
                  {{ item.content }}
                </td>
                <td
                  class="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap"
                >
                  {{ item.ip }}
                </td>
                <td
                  class="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap"
                >
                  {{ item.ip }}
                </td>
                <td
                  class="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap"
                >
                  {{ item.os }}
                </td>
                <td
                  class="px-2 py-4 text-sm font-light text-center text-gray-900 whitespace-nowrap"
                >
                  {{ item.browser }}
                </td>
                <td
                  class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                >
                  {{ item.times }}
                </td>
                <td
                  class="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap"
                >
                  {{ item.createTime }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>