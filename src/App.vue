<script setup>
import {computed, ref} from "vue";
import {appStore} from "./store/index.js";
import {storeToRefs} from "pinia";

const {count}= storeToRefs(appStore())
const {countAdd}=appStore()

</script>

<template>
  <router-view/>
</template>

<style scoped>

</style>
