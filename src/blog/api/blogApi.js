import request from "@/request.js";

export function getBlogMenu() {
    return request("/blog/endpoint/menu/tree")
}