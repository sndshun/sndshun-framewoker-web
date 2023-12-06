<script setup>

</script>

<template>
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