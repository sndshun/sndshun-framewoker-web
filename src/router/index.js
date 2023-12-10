import {createRouter,createWebHashHistory} from "vue-router";
import {blogRouter,blogAdminRouter} from "@/blog/router/index.js";

import Index from "@/view/index.vue";
import Error from "@/view/404.vue"

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const baseRoutes = [
    {
        path: '/',
        component: Index ,
        redirect: '/blog',
        children: [
            ...blogRouter,
            ...blogAdminRouter
        ],
    },

    { path: '/:pathMatch(.*)*', name: 'NotFound', component: Error },
]

const routes=[
    ...baseRoutes,
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    //history: createWebHistory(import.meta.env.VITE_BASE_PATH),
    routes, // `routes: routes` 的缩写
})
export default router