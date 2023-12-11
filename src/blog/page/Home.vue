<script setup>
import {getPostPage} from "@/blog/api/blogApi.js";
import {reactive} from "vue";
import CardContainer from "@/blog/components/CardContainer.vue";

const post = reactive({
  list: [],
  current: 1,
  size: 3,
  pages: null,
  total: 0,
})

postInit()

function postInit() {
  getPostPage({current: post.current, size: post.size}).then(res => {
    post.list = res.records
    post.current = res.current
    post.size = res.size
    post.pages = res.pages
    post.total = res.total
  });
}

function postInitSize() {
  post.current=1
  postInit()
}



</script>

<template>
  <div class="container mx-auto px-4 flex flex-col md:flex-row py-20">
    <div class="w-full md:w-3/4 px-4">
      <card-container
          :data="post.list" date="publishedTime"
          text="summary" cover="coverImageUrl"/>

      <div class="flex justify-center">
        <el-pagination
            v-model:current-page="post.current"
            v-model:page-size="post.size"
            :page-sizes="[3,6, 12, 32, 100]"
            small="small"
            layout="total, sizes, prev, pager, next, jumper"
            :total="post.total"
            @size-change="postInitSize"
            @current-change="postInit"
        />
      </div>
    </div>

    <div class="w-full md:w-1/4 px-4">
      <div class="bg-gray-100 p-4">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Recent Posts</h2>
        <ul class="list-none">
          <li class="mb-2">
            <a href="#" class="text-gray-700 hover:text-gray-900">Blog Post 1</a>
          </li>
          <li class="mb-2">
            <a href="#" class="text-gray-700 hover:text-gray-900">Blog Post 2</a>
          </li>
          <li class="mb-2">
            <a href="#" class="text-gray-700 hover:text-gray-900">Blog Post 3</a>
          </li>
          <li class="mb-2">
            <a href="#" class="text-gray-700 hover:text-gray-900">Blog Post 4</a>
          </li>
        </ul>
      </div>
      <div class="bg-gray-100 p-4 mt-4">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Categories</h2>
        <ul class="list-none">
          <li class="mb-2">
            <a href="#" class="text-gray-700 hover:text-gray-900">Category 1</a>
          </li>
          <li class="mb-2">
            <a href="#" class="text-gray-700 hover:text-gray-900">Category 2</a>
          </li>
          <li class="mb-2">
            <a href="#" class="text-gray-700 hover:text-gray-900">Category 3</a>
          </li>
          <li class="mb-2">
            <a href="#" class="text-gray-700 hover:text-gray-900">Category 4</a>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>