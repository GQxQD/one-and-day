import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 用户类型
        userType: 'member',
        // 后台传回来的页面状态
        status: 'select',
    },
    mutations: {},
    actions: {},
});
