<script setup>
import {getPostPage} from "@/blog/api/blogApi.js";
import {FwbPagination} from "flowbite-vue";
import {reactive} from "vue";
import CardContainer from "@/components/CardContainer.vue";

const post=reactive({
  list:[],
  current:1,
  size:10,
  pages:null,
  total:null,
  show:false,
})

postInit()
function postInit() {
  getPostPage({current:post.current,size:post.size}).then(res=>{
    post.list=res.records
    post.current=res.current
    post.size=res.size
    post.pages=res.pages
    post.total=res.total
    post.show=true
  })
}

</script>

<template>
  <fwb-pagination v-model="post.current"
                  :total-pages="post.pages"
                  @update:model-value="postInit"
                  :slice-length="4"></fwb-pagination>
  <card-container v-if="post.show" :data="post.list" :date="'publishedTime'"
                  :text="'summary'" :cover="'coverImageUrl'" />
</template>

<style scoped>

</style>