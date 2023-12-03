<script setup>

import {getCategoryTree} from "@/blog/api/blogApi.js";
import {ref} from "vue";

const data=ref([])
getCategoryTree().then(res => {
  data.value=res
})

</script>

<template>
  <div class="m-6 p-4 border rounded-md">
    <h3 class="text-2xl font-bold my-3">还是分分类把</h3>
    <div class="flex flex-wrap gap-3 justify-center">
      <ol>
        <li v-for="item in data">
          {{item.name}}---------------------------------------{{item.postCount}}
          <ul v-if="item.children.length!==0">
            <li v-for="item2 in item.children">&nbsp;&nbsp;&nbsp;&nbsp; {{item2.name}}--------------------{{item2.postCount}}</li>
          </ul>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>

</style>