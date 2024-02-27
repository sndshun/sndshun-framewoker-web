import request from "@/util/request.js";

/**
 * 获取所有标签 map
 * @returns {*}
 */
export function getAdminTagsMap() {
    return request("/blog/admin/tag/map")
}