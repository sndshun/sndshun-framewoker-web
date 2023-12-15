<script setup>
import { getPostPage } from "@/blog/api/blogApi.js";
import { reactive } from "vue";
import CardContainer from "@/blog/components/CardContainer.vue";
import PersonalCard from "@/blog/components/PersonalCard.vue";
import SmallFunctionVue from "@/blog/components/SmallFunction.vue";

const post = reactive({
  list: [],
  current: 1,
  size: 3,
  pages: null,
  total: 0,
});

postInit();

function postInit() {
  getPostPage({ current: post.current, size: post.size }).then((res) => {
    post.list = res.records;
    post.current = res.current;
    post.size = res.size;
    post.pages = res.pages;
    post.total = res.total;
  });
}

function postInitSize() {
  post.current = 1;
  postInit();
}
</script>

<template>
  <div class="container relative flex self-start py-20 mx-auto md:flex-row">
    <PersonalCard/>
    <!-- 文章 -->
    <div class="items-center w-full px-4 md:w-3/4">
      <card-container
        :data="post.list"
        date="publishedTime"
        text="summary"
        cover="coverImageUrl"
      />
      <div class="flex justify-center">
        <el-pagination
          v-model:current-page="post.current"
          v-model:page-size="post.size"
          :page-sizes="[3, 6, 12, 32, 100]"
          small="small"
          layout="total, sizes, prev, pager, next, jumper"
          :total="post.total"
          @size-change="postInitSize"
          @current-change="postInit"
        />
      </div>
    </div>
    <SmallFunctionVue/>
  </div>
</template>
<style scoped>
.py-20{
  padding-top: 3.5rem !important;
}
</style>