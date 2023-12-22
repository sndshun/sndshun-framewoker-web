import request from "@/request.js";

export function getDictMapByCode(code) {
    return request({
        method: "get",
        url: "/dict/code/map",
        params: {code}
    })
}