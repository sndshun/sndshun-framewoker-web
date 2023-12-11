<script setup>
import {onActivated, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getPostById} from "@/blog/api/blogApi.js";

const route=useRoute()
const id=route.params.id

const post=ref({})
getPostById(id).then(res=>{
  post.value=res
})

</script>

<template>
  <div class="flex flex-col">
    <div class="bg-gray-100 py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Blog Title Here</h1>
        <p class="text-gray-600">Published on April 4, 2023</p>
      </div>
    </div>
    <div class="bg-white py-8">
      <div class="container mx-auto px-4 flex flex-col md:flex-row">
        <div class="w-full md:w-3/4 px-4">
          <img src="https://images.unsplash.com/photo-1506157786151-b8491531f063" alt="Blog Featured Image" class="mb-8">
          <div class="prose max-w-none" v-html="post.content">


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

    </div>
  </div>
</template>

<style scoped>

</style>