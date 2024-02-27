import {createApp} from 'vue'
import {createPinia} from "pinia";
import router from "@/router/index.js";
import '@/assets/tailwind.css'
import './style.css'
import 'animate.css'
import App from './App.vue'

const store = createPinia();

const app = createApp(App)
app.use(store)
    .use(router)
app.mount('#app');
