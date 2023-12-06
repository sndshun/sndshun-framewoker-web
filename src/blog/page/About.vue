<script setup>
import {localForage} from "@/util/localforage.js";
localForage().setItem('key','value',10)
</script>
<template>
  <section class="bg-white dark:bg-gray-900">
    <div id="about-home">
      <!-- 关于我起始 -->
      <div class="author-info">
        <div class="flex space-x-4 animate-pulse">
          <span class="relative inline-block">
            <img
              src="https://ooo.0x0.ooo/2023/05/05/Cyfvi.jpg"
              class="object-cover w-16 h-16 rounded-full"
            />
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#about-home {
  display: flex;
  padding-top: 1rem;
  flex-direction: column;
  align-items: center;
}
#about-home .author-info {
  display: flex;
  align-items: center;
  margin: 0 0 16px 0;
}

.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>