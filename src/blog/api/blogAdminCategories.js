import request from "@/request.js";

/**
 * 获取所有分类树
 * @returns {*}
 */
export function getAdminBlogCategoriesTree() {
    return request("/blog/admin/category/tree")
}