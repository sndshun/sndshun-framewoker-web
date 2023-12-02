import request from "@/request.js";

export function getBlogMenu() {
    return request("/blog/endpoint/menu/tree")
}

export function getPostPage({current = 1, size = 10} = {}) {
    return request({
        method: "get",
        url: "/blog/endpoint/post/page",
        params: {
            current,
            size
        }
    })
}