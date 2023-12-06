/**
 * @Description : 过滤工具 可全局挂载后使用
 * @author : mr.sun
 * @date : 2021/11/9
 * @Version : 1.0
 * @Last update by : mr.sun
 * @Last update time : 2021/11/9
 */

/**
 * 格式化UTC格式的时间 例：2019-10-09T13:51:25.414Z
 * @param time
 * @returns {string}
 */
const formatUTC_DateTime = (time) => {
    if (null == time || "" == time) {
        return "无数据"
    }
    let date = new Date(time).toJSON();
    return new Date(+new Date(date) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '')
}
/**
 * 字符过长省略
 * @param text 需处理的文本
 * @param count 可显示的字数
 * @param omitted 替换字符
 * @returns {*|string}
 */
const textTooLongAndOmitted = (text, count, omitted) => {
    if (!count) count = 15
    if (!omitted) omitted = '...'
    if (null != text && "" != text && text.length > count) {
        return text.substring(0, count) + omitted
    } else {
        return text
    }
}

export {
    formatUTC_DateTime,
    textTooLongAndOmitted
}
