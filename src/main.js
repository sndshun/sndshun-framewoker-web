import { createApp } from 'vue'
import {createPinia} from "pinia";
import router from "@/router/index.js";
import '@/assets/tailwind.css'
import './style.css'
import 'animate.css'
import App from './App.vue'

const store=createPinia();

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
