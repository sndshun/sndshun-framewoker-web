const baseUrl = "/blog"
export const blogRouter=[
    {
        path: '/',  //暂时首页
        component: ()=>import("@/blog/page/Home.vue"),
        meta: {
            title: '首页'
        }
    },{
        path: baseUrl.concat('/category'),  //暂时首页
        component: ()=>import("@/blog/page/Category.vue"),
        meta: {
            title: '分类'
        }
    },{
        path: baseUrl.concat('/tag'),  //暂时首页
        component: ()=>import("@/blog/page/Tag.vue"),
        meta: {
            title: '标签'
        }
    },{
        path: baseUrl.concat('/archive'),  //暂时首页
        component: ()=>import("@/blog/page/Archive.vue"),
        meta: {
            title: '归档'
        }
    },{
        path: baseUrl.concat('/about'),  //暂时首页
        component: ()=>import("@/blog/page/About.vue"),
        meta: {
            title: '关于'
        }
    },

]

export const blogAdminRouter=[

]