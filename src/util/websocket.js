// websocket.js
import SockJS from "sockjs-client/dist/sockjs.min.js";
import Stomp from "stompjs";

export default class WebSocketService {
    /**
     * 构造函数
     * @param {null} url - WebSocket连接地址
     * @param {object} options - 选项参数
     */
    constructor(url= null, options = {}) {
        // 修正了 url 的问题
        this.url = url || import.meta.env.VITE_APP_WEBSOCKET_URL;
        //请求头
        this.header = {};
        // WebSocket 配置项
        this.options = {
            reconnection: true,                // 是否自动重连
            reconnectionAttempts: 5,           // 重连尝试次数上限
            reconnectionDelay: 3000,           // 重连延迟时间（毫秒）
            heartBeatInterval: 50000,          // 心跳消息发送间隔（毫秒）
            ...options,
        };

        this.stompClient = null;               // WebSocket实例
        this.isConnected = false;            // 连接状态
        this.reconnectAttempts = 0;          // 重连尝试次数
        this.messageQueue = [];              // 消息缓存队列
        this.heartBeatTimer = null;          // 心跳定时器
        this.messages= [];                 //消息列表
        // 初始化时进行连接
        //this.connect();
    }

    /**
     * 连接WebSocket
     * @param {string} destination - 目标地址
     */
    connect() {
        const socket = new SockJS(this.url);
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({}, () => {
            console.log("WebSocket连接成功");
            this.isConnected = true;
            this.reconnectAttempts = 0;
            this.flushMessageQueue();
            //this.startHeartBeat();

            // this.subscribe(destination,(message) =>{
            //     this.messages.push(message);
            // })
        }, (error) => {
            console.error("WebSocket连接失败", error);

            // 连接失败时尝试重连
            if (this.options.reconnection) {
                this.reconnect();
            }
        });
    }

    /**
     * 断开WebSocket连接
     */
    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            this.isConnected = false;
            this.stopHeartBeat();
        }
        console.log("WebSocket连接关闭");
    }

    /**
     * 订阅消息
     * @param {string} destination - 目标地址
     * @param {function} callback - 收到消息的回调函数
     * @returns {object} - 订阅对象
     */
    subscribe(destination, callback) {
        if (this.stompClient !== null && this.isConnected) {
            return this.stompClient.subscribe(destination, callback);
        } else {
            console.error("WebSocket未连接");
            return null;
        }
    }


    /**
     * 发送消息
     * @param {string} destination - 目标地址
     * @param {any} message - 要发送的消息
     */
    sendMessage(destination, message) {
        if (this.stompClient !== null && this.isConnected) {
            this.stompClient.send(destination, {}, JSON.stringify(message));
        } else {
            console.error("WebSocket未连接");

            // 未连接时将消息放入缓存队列
            this.messageQueue.push({destination, message});
        }
    }

    /**
     * 开始心跳检测
     */
    startHeartBeat() {
        this.heartBeatTimer = setInterval(() => {
            // 发送心跳消息
            this.sendMessage("/app/heart-beat", {content: "Heartbeat"});
        }, this.options.heartBeatInterval);
    }

    /**
     * 停止心跳检测
     */
    stopHeartBeat() {
        clearInterval(this.heartBeatTimer);
        this.heartBeatTimer = null;
    }

    /**
     * 重连
     */
    reconnect() {
        if (this.options.reconnectionAttempts === 0 || this.reconnectAttempts < this.options.reconnectionAttempts) {
            this.reconnectAttempts++;
            console.log(`尝试重新连接，第 ${this.reconnectAttempts} 次`);
            setTimeout(() => {
                this.connect();
            }, this.options.reconnectionDelay);
        } else {
            console.error("超过重连尝试次数上限，停止重连");
        }
    }

    /**
     * 清空消息缓存队列，重新发送缓存的消息
     */
    flushMessageQueue() {
        while (this.messageQueue.length > 0) {
            const {destination, message} = this.messageQueue.shift();
            this.sendMessage(destination, message);
        }
    }
}
