<script setup>
import {ref, toRefs} from "vue";

const props=defineProps(['children','ex'])

const {children,ex} = toRefs(props)

</script>

<template>
  <ul class="pl-4" v-if="children.length!==0">
    <li v-for="cate_child in children">
      <div class="flex items-center space-x-2 mb-2">
        <div class="w-[100%]">
          <p class="text-lg font-semibold flex justify-between">
            <span>{{ cate_child.name }}</span>
            <span class="text-sm text-slate-500">({{cate_child.postCount?cate_child.postCount:0}})</span>
          </p>
        </div>
      </div>
      <category-children :children="cate_child.children"/>
    </li>
  </ul>
</template>

<style scoped>

</style>