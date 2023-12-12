import request from "@/request.js";

/**
 * 获取所有管理菜单
 * @returns {*}
 */
export function getAdminBlogMenu() {
    return request("/blog/admin/menu/tree")
}

/**
 * 获取所有访客日志
 * @returns 
 */
export function getVisitLog(options={current : 1, size : 10,},data) {
    return request({
        method: "get",
        url: "/blog/admin/visit",
        params: {...options,...data}
    })
}