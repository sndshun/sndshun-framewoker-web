<script setup>

import router from "@/router/index.js";
</script>

<template>
  <section class="flex items-center h-screen p-16 bg-gray-50 dark:bg-gray-700">
    <div class="container flex flex-col items-center ">
      <div class="flex flex-col max-w-md gap-6 text-center">
        <h2 class="font-extrabold text-gray-600 text-9xl">
          <span class="sr-only">错误</span>404
        </h2>
        <p class="text-2xl md:text-3xl dark:text-gray-400">抱歉，我们找不到此页面。</p>
        <a @click="router.go(-1)" class="px-8 py-4 text-xl font-semibold bg-purple-600 rounded text-gray-50 hover:text-gray-200">
          返回页面
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>