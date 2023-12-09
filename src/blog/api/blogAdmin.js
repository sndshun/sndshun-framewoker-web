import request from "@/request.js";

/**
 * 获取所有管理菜单
 * @returns {*}
 */
export function getAdminBlogMenu() {
    return request("/blog/admin/menu/tree")
}