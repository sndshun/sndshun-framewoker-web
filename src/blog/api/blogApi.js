import request from "@/request.js";

export function getBlogMenu() {
    return request("/blog/endpoint/menu/tree")
}

/**
 * 获取所有导航栏
 * @returns {*}
 */
export function getBlogNav() {
    return request("/blog/endpoint/menu/nav")
}

/**
 * 分页查询文章
 * @param current
 * @param size
 * @returns {*}
 */
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

/**
 * 根据id查询文章详情
 * @param id
 * @returns {*}
 */
export function getPostById(id) {
    return request(`/blog/endpoint/post/${id}`)
}

/**
 * 获取所有分类 带分层
 * @returns {*}
 */
export function getCategoryTree() {
    return request("/blog/endpoint/category/tree")
}

/**
 * 获取所有标签
 * @returns {*}
 */
export function getTagGroupCategory() {
    return request("/blog/endpoint/tag/group")
}

/**
 * 获取所有友链
 * @returns {*}
 */
export function getLinksAll() {
    return request("/blog/endpoint/friendLink/all")
}

/**
 * 获取文章归档
 * @returns {*}
 */
export function getPostArchive() {
    return request("/blog/endpoint/post/archive")
}