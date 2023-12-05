<script setup>

import {getPostArchive} from "@/blog/api/blogApi.js";
import {ref} from "vue";

const data=ref({})
getPostArchive().then(res=>{
  data.value=res
})
</script>

<template>
  <div>
    <!-- component -->
    <div class="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
      <h4 class="text-xl text-gray-900 font-bold">Activity log</h4>

      <template v-for="item in data">
        <template v-for="(value,year) in item">
          <h4 class="text-sm text-gray-900 font-bold">{{year}}</h4>
          <div class="relative px-4">
            <div class="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

            <div class="flex items-center w-full my-6 -ml-1.5"
                 v-for="post in value">
              <div class="w-1/12 z-10">
                <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
              </div>
              <div class="w-11/12">
                <p class="text-sm">{{ post.title }}</p>
                <p class="text-xs text-gray-500">{{ post.publishedTime }}</p>
              </div>
            </div>

          </div>
        </template>
      </template>

    </div>
  </div>
</template>

<style scoped>

</style>