import request from "@/util/request.js";

/**
 * 获取所有分类树
 * @returns {*}
 */
export function getAdminBlogCategoriesTree() {
    return request("/blog/admin/category/tree")
}
/**
 * 获取所有分类 map
 * @returns {*}
 */
export function getAdminCategoriesMap() {
    return request("/blog/admin/category/map")
}