import Vue from 'vue';
import ElementUI from 'element-ui';
import socket_io from 'socket.io-client';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './styles/index.js';
import router from './router';
import store from './store';

const socket = socket_io('http://kohai.e2.luyouxia.net:32376');//socket_io('http://localhost:3000');

Vue.prototype.socket = socket;
// 监听用户列表
socket.on('members', (members) => {
    store.commit('setMemberList', members);
});
// 监听聊天框
socket.on('message', (message) => {
    store.commit('pushMessage', message);
});

// 监听游戏状态
socket.on('status', (status) => {
    store.commit('setStatus', status);
});

// 监听提示
socket.on('tip', (tip) => {
    store.commit('setTips', tip);
});

// 监听提示
socket.on('question', (question) => {
    store.commit('setQuestion', question);
});

Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');