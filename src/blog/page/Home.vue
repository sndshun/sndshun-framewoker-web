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
  <div>
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
</template>

<style scoped>

</style>