<script setup>
import {ref, onActivated, onBeforeUnmount,onMounted,watch,nextTick} from "vue";
import {getItem, setItem} from "@/util/localforage.js";
import {useWebSocketStore} from "@/store/webSocketStore.js";
import {useRouter} from "vue-router";
import request from "@/util/request.js";

const router = useRouter();
const webSocketStore = useWebSocketStore();

const chatBoxRef = ref(null);
const scrollToBottom = async () => {
  // 使用 nextTick 等待 DOM 更新
  await nextTick();

  // 使用 $refs 获取 DOM 元素的引用，并滚动到底部
  if (chatBoxRef.value) {
    chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight;
  }
};


const userName = ref(null);
const connected = ref(false);
const messages = ref([]);

function handleUserName() {
  getItem('publicChatUserName').then((value) => {
    userName.value = value;
    if (!userName.value) {
      userName.value = prompt("请输入你的名字");
      if (userName.value) {
        setItem('publicChatUserName', userName.value).then(() => {
          connected.value = true
          router.go(0)
        })
      } else {
        connected.value = false
        alert("名字不能为空");
        router.push({
          name: 'home'
        })
      }
    } else {
      connected.value = true
      if (webSocketStore.ws.isConnected !== true) {
        webSocketStore.connect();
        join(); //加入房间
        request('/chat.public/history').then((res) =>{
          messages.value=res
        })
        webSocketStore.subscribe('/topic/public', (msg) => {
          messages.value.push(JSON.parse(msg.body))
        })
        scrollToBottom();
      }
    }
  })
}

onActivated(() => {
  handleUserName()
})

onBeforeUnmount(() => {
  webSocketStore.disconnect()
})
onMounted(() =>{
  scrollToBottom();
  // 监听 messages 数组的变化，确保每次有新消息时都滚动到底部
  watch(messages, () => {
    scrollToBottom();
  });
})


const data = ref({
  type: "",
  content: "",
  sender: "",
})

function message(msg) {
  if (msg) data.value.content = msg;
  data.value.type = "CHAT"
  data.value.sender = userName.value
  return data.value
}

function join() {
  data.value.content=null
  data.value.type = "JOIN"
  data.value.sender = userName.value
  webSocketStore.sendMessage("/app/chat.addUser", data.value)
}

function sendMessage() {
  if(!data.value.content)return;
  webSocketStore.sendMessage("/app/chat.sendMessage", message())
  data.value.content = ""
}


</script>

<template>
  <div class="p-5 flex flex-col h-5/6">
    <h1 class="text-xl">世界频道</h1>
    <div class="flex-grow overflow-auto bg-white my-3" ref="chatBoxRef">
      <template v-for="(msg, index) in messages" :key="index" >
        <p v-if="msg.type==='CHAT'" class="flex" :class="{ 'justify-end': msg.sender === userName }">
          <span v-if="msg.sender !== userName">{{msg.sender}}:</span>
          <span>{{msg.content}}</span>
          <span v-if="msg.sender === userName">:{{msg.sender}}</span>
        </p>
        <p v-if="msg.type==='JOIN'" class="text-xs text-center text-slate-500">{{msg.sender}} 加入房间</p>
        <p v-if="msg.type==='LEAVE'" class="text-xs text-center text-black">{{msg.sender}} 退出房间</p>
      </template>
    </div>
    <el-form v-if="connected">
      <el-input v-model="data.content"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                show-word-limit
                maxlength="2048"
                minlength="1"
                placeholder="请输入内容" @keyup.enter="sendMessage"></el-input>
      <el-button type="primary" @click="sendMessage" class="mt-3 float-right">发送</el-button>
    </el-form>
  </div>
</template>

<style scoped>

</style>