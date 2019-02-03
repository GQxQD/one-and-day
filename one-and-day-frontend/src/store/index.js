import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 用户类型
        userType: 'member',
        // 后台传回来的页面状态
        status: 'select',
        // 游戏状态
        gameStatus: 'game',
        // 提示信息
        tips: '来自xxx的提示： *******'
    },
    mutations: {
        setTips(state, tips) {
            state.tips = tips
        }
    },
    actions: {},
});