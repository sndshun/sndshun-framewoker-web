import Layout from "@/blog/page/Layout.vue";
const baseUrl = ""
export const blogRouter=[
    {
        path: '/blog',  //暂时首页
        component: Layout,
        meta: {
            title: '首页'
        },
        redirect: '/blog/home',
        children:[
            {
                path: baseUrl.concat('home'),
                component: ()=>import("@/blog/page/Home.vue"),
                meta: {
                    title: '首页'
                }
            },{
                path: baseUrl.concat('category'),  //暂时首页
                component: ()=>import("@/blog/page/Category.vue"),
                meta: {
                    title: '分类'
                }
            },{
                path: baseUrl.concat('tags'),  //暂时首页
                component: ()=>import("@/blog/page/Tags.vue"),
                meta: {
                    title: '标签'
                }
            },{
                path: baseUrl.concat('archive'),  //暂时首页
                component: ()=>import("@/blog/page/Archive.vue"),
                meta: {
                    title: '归档'
                }
            },{
                path: baseUrl.concat('links'),  //暂时首页
                component: ()=>import("@/blog/page/Links.vue"),
                meta: {
                    title: '友链'
                }
            },{
                path: baseUrl.concat('about'),  //暂时首页
                component: ()=>import("@/blog/page/About.vue"),
                meta: {
                    title: '关于'
                }
            },{
                path: baseUrl.concat('post'),  //暂时首页
                component: ()=>import("@/blog/page/Post.vue"),
                meta: {
                    title: '文章'
                }
            },
        ]
    },
]

import adminLayout from '@/blog/admin/layout/Index.vue'
const adminBaseUrl=''
export const blogAdminRouter=[
    {
        path: '/blog/admin',
        component: adminLayout,
        meta: {
            title: '首页'
        },
        redirect: '/blog/admin/dashboard',
        children:[
            {
                path: adminBaseUrl.concat('dashboard'),
                component: ()=>import('@/blog/admin/page/Dashboard.vue'),
                meta: {
                    title: '仪表板'
                },
            },{
                path: adminBaseUrl.concat('post/release'),
                component: ()=>import('@/blog/admin/page/PostRelease.vue'),
                meta: {
                    title: '文章发布'
                },
            },
        ]
    }
]