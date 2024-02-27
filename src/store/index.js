import {defineStore} from 'pinia'
import {blogStore} from "@/blog/store/index.js";
import {ref} from "vue";

export const appStore = defineStore(
    'app',
    () => {
        const blog = blogStore();

        const count = ref(0)

        function countAdd() {
            count.value++
        }

        return {count, countAdd}
    })