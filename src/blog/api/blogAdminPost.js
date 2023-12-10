import request from "@/request.js";

export function savePost(data) {
    return request({
        url:'/blog/admin/post',
        method:'post',
        data:data
    })
}