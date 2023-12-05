<script setup>
import {getCategoryTree} from "@/blog/api/blogApi.js";
import {ref} from "vue";
import CategoryChildren from "@/blog/components/CategoryChildren.vue";

const data=ref([])
getCategoryTree().then(res => {
  data.value=res
})

</script>

<template>
  <div class="m-6 p-4 border rounded-md">
    <h3 class="text-2xl font-bold my-3">分类</h3>
    <div class="container">
      <div class="bg-white p-6 rounded-lg">
        <category-children :children="data"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>