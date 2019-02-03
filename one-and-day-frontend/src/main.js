import Vue from 'vue';
import ElementUI from 'element-ui';
import socket_io from 'socket.io-client';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './styles/index.js';
import router from './router';
import store from './store';

Vue.prototype.socket = socket_io('http://localhost:3000');

Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');