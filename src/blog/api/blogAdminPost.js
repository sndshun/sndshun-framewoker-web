import request from "@/request.js";

export function savePost(data) {
    return request({
        url:'/blog/admin/post',
        method:'post',
        data:data
    })
}

export function getPostAdminPage(options={current : 1, size : 10,},data) {
    return request({
        method: "get",
        url: "/blog/admin/post",
        params: {...options,...data}
    })
}