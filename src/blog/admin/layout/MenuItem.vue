<script setup>
import {ref, toRefs} from "vue";
import Archive from "@/blog/page/Archive.vue";
import router from "@/router/index.js";

const props = defineProps(['data'])
const {data} = toRefs(props)

const isOpen=ref(false)
</script>

<template>
    <div class="flex flex-col gap-2 mx-auto">
        <details class="group" v-if="data.children&&data.children.length!==0">
          <summary @click="isOpen=!isOpen"
              class="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                <span class="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{{ data.name }}</span>
                </span>
            <svg
                :class="{ 'rotate-90': isOpen }"
                class="w-5 h-5 text-gray-500 transition"
                 xmlns="http://www.w3.org/2000/svg"
                 width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
              </path>
            </svg>
          </summary>

          <article class="pl-4 pb-4">
            <ul class="flex flex-col gap-1 pl-2">
              <li v-for="item in data.children">
                <MenuItem :data="item"/>
              </li>
            </ul>
          </article>
        </details>
        <div v-else
             @click="router.push(data.path)"
            class="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                <span class="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{{ data.name }}</span>
                </span>
        </div>
    </div>
</template>

<style scoped>

</style>