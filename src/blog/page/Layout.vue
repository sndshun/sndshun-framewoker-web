<script setup>
import BlogNav from "@/blog/components/BlogNav.vue";
import {reactive} from "vue";
import {getBlogNav} from "@/blog/api/blogApi.js";

const nav = reactive({
  data: [],
})
navInit()

function navInit() {
  getBlogNav().then(res => {
    nav.data = res
  })
}
</script>

<template>
  <blog-nav :data="nav.data"/>
  <router-view v-slot="{ Component }">
    <transition
        :duration="{enter:120,leave:100}"
        name="fade"
        mode="out-in"
        appear
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        appear-active-class="animate__animated animate__fadeIn"
    >
      <keep-alive :max="10">
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped>

</style>