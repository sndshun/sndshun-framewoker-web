<script setup>
import NavHeader from "@/blog/admin/layout/NavHeader.vue";
import Menu from "@/blog/admin/layout/Menu.vue";

</script>

<template>
  <div class="bg-gray-100 w-full font-sans flex">
    <Menu/>
    <div class="w-full">
      <NavHeader/>
      <div>
        <main class="p-4">
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
        </main>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>