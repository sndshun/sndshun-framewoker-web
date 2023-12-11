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
export function getVisitLog(){
    return request("/blog/admin/visit")
}