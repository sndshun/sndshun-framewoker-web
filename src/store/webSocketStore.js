import {defineStore} from 'pinia';
import WebSocketService from "@/util/websocket.js";
//  定义 WebSocket 状态管理 跨页面通信时候使用
// 从环境变量中获取 WebSocket 地址
const websocketUrl = import.meta.env.VITE_APP_WEBSOCKET_URL || 'http://localhost:8088';
const websocket = new WebSocketService(websocketUrl);

// 订阅失败重连延迟时间
const reconnectDelay = 1000;
export const useWebSocketStore = defineStore(
    'websocket',
    {
        state: () => ({
            ws: websocket,
        }),
        actions: {
             connect() {
                this.ws.connect();
            },
            disconnect() {
                this.ws.disconnect();
            },
            sendMessage(destination,message) {
                this.ws.sendMessage(destination, message);
            },
            subscribe(destination,callback) {
                let sub = setInterval(() => {
                    if(this.ws.isConnected){
                        this.ws.subscribe(destination,callback);
                        clearInterval(sub);
                    }
                }, reconnectDelay);
            }
        },
    });