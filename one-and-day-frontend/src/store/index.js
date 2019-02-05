import Vue from 'vue';
import Vuex from 'vuex';
import { Notification } from 'element-ui';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 用户姓名
        userName: '',
        // 用户类型
        isManager: false,
        // 后台穿回来的游戏状态 game_00 没有游戏 game_01 选择题 game_02 简单 game_03 抠图 game_04 加时
        status: 'game_00',
        // 问题内容
        question: {},
        // 倒计时
        time: false,
        // 提示信息
        tips: '',
        memberList: [],
        messageList: [],

    },
    getters: {
        token() {
            return window.localStorage.getItem('token');
        },
    },
    mutations: {
        setToken(state, token) {
            window.localStorage.setItem('token', token);
        },
        setTips(state, tips) {
            Notification({
                title: '系统通知',
                message: tips,
            });
            state.tips = tips;
        },
        setIsManager(state, isManager) {
            state.isManager = isManager;
        },
        setUserName(state, userName) {
            state.userName = userName;
        },
        setStatus(state, status) {
            state.status = status;
        },
        setMemberList(state, list) {
            state.memberList = list;
        },
        pushMessage(state, message) {
            state.messageList.push(message);
        },
        setQuestion(state, question) {
            state.question = question;
        },
        setTime(state, time) {
            state.time = time;
        }
    },
    actions: {},
});
1;