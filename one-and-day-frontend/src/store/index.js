import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 用户姓名
        userName: '',
        // 用户类型
        isManager: false,
        // 后台穿回来的游戏状态 game_00 没有游戏 game_01 选择题 game_02 简单 game_03 抠图 game_04 加时
        status: 'game_01',
        // 提示信息
        tips: '来自xxx的提示： *******',

    },
    mutations: {
        setTips(state, tips) {
            state.tips = tips
        },
        setIsManager(state, isManager) {
            state.isManager = isManager
        },
        setUserName(state, userName) {
            state.userName = userName
        },
        setStatus(state, status) {
            state.status = status
        }
    },
    actions: {},
});