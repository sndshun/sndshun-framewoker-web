/**
 * @Description : axios封装工具
 * @author : mr.sun
 * @date : 2021/11/1
 * @Version : 1.0
 * @Last update by : mr.sun
 * @Last update time : 2021/11/1
 */
import axios from "axios";

/*
  @ 创建自定义axios实例
*/
const request = axios.create({
    baseURL: "/api",
    timeout: 1000*3,
    withCredentials: false, // 跨域请求是否需要携带 cookie
})
/*
  @ request 请求拦截器=>请求发出前处理
*/
request.interceptors.request.use(
    config => {

        return config;
    }, error => {
        // 接口返回失败
        console.log(error.response);
        return Promise.reject(error.response);
    }
)

/*
  @ request 响应拦截器=>处理响应数据
*/
request.interceptors.response.use(
    response => {

        //获取统一响应返回体
        const res=response.data
        //在这里处理响应体中的状态码
        const code=res.code
        if (code === 200) {
            console.log(res.message);
        } else {
            console.log(res.message);
        }
        //返回主要数据
        return Promise.resolve(res.data);
    },
    error => {

        // //请求失败，这个地方可以根据error.response.status统一处理一些界面逻辑，比如status为401未登录,可以进行重定向
        // router.replace({
        //     path: '/login',
        //     query: { redirect: router.currentRoute.fullPath }
        //    });
        return Promise.reject(error.response);
    }
)

export default request;

