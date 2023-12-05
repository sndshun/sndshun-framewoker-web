<script setup>
import {getPostPage} from "@/blog/api/blogApi.js";
import {FwbPagination} from "flowbite-vue";
import {reactive} from "vue";
import CardContainer from "@/blog/components/CardContainer.vue";

const post = reactive({
  list: [],
  current: 1,
  size: 6,
  pages: null,
  total: null,
})

postInit()

function postInit() {
  getPostPage({current: post.current, size: post.size}).then(res => {
    post.list = res.records
    post.current = res.current
    post.size = res.size
    post.pages = res.pages
    post.total = res.total
  })
}



</script>

<template>
  <div class="container mx-auto px-4 flex flex-col md:flex-row py-20">
    <div class="w-full md:w-3/4 px-4">
      <card-container
          :data="post.list" date="publishedTime"
          text="summary" cover="coverImageUrl"/>

      <fwb-pagination
          class="flex justify-center"
          v-model="post.current"
          :total-pages="post.pages"
          @update:model-value="postInit"
          :slice-length="4"></fwb-pagination>
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