import Vue from 'vue';
import ElementUI from 'element-ui';
import socket_io from 'socket.io-client';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './styles/index.js';
import router from './router';
import store from './store';

const socket = socket_io('http://localhost:3000');

Vue.prototype.socket = socket;

socket.on('members', (members) => {
    store.commit('setMemberList', members);
});

socket.on('message', (message) => {
   store.commit('pushMessage', message);
});


Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');