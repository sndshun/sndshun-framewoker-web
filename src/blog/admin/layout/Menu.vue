<script setup>
import {getAdminBlogMenu} from "@/blog/api/blogAdmin.js";
import {ref} from "vue";
import MenuItem from "@/blog/admin/layout/MenuItem.vue";

const menuList=ref([])
getAdminBlogMenu().then(res=>{
  menuList.value=res
})
</script>

<template>
  <!-- 侧边栏内容，可以包含菜单、链接等 -->
  <aside class="w-60 max-w-[280px] bg-white flex-shrink-0">
    <nav class="h-16 w-full bg-white">

    </nav>
    <template v-for="item in menuList">
      <MenuItem :data="item"/>
    </template>
  </aside>
</template>

<style scoped>

</style>