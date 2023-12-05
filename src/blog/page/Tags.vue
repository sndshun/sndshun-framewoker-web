<script setup>
import {getTagGroupCategory} from "@/blog/api/blogApi.js";
import {ref} from "vue";

const data=ref({})
getTagGroupCategory().then(res=>{
  data.value=res
})

</script>

<template>
  <div class="m-6 p-4 border rounded-md">
    <h3 class="text-2xl font-bold my-3">标签云</h3>
    <div class="flex flex-wrap gap-3 justify-center">
      <template v-for="(value,key) in data">
        <div class="flex items-center w-full">
          <span class="flex-grow bg-gray-200 rounded h-0.5"></span>
          <span class="mx-3 text-lg font-medium">{{ key }}</span>
          <span class="flex-grow bg-gray-200 rounded h-0.5"></span>
        </div>
        <template v-for="item in value">
          <a href="" class="bg-gray-100 rounded-md px-3 py-2 ">{{ item.name}}</a>
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>