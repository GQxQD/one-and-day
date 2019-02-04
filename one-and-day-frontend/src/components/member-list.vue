<template>
    <div class="member-list primaryback-ground">
        <div class="member-list__item" v-for="(user,index) in memberList" :key="index">
            <div class="point-green"></div>
            <span>{{user}}</span>
            <!-- <span>{{user.level}}</span> -->
        </div>
    </div>
</template>
<script>
export default {
    created() {
        // this.socket.on('members', (members) => {
        //     console.log(members);
        // })
    },
    data() {
        return {
            list: [
                { name: '柯灰大佬', level: '副会长' },
                { name: '吱吱丶靈', level: '成员' },
            ],
        };
    },
    computed: {
        memberList() {
            return this.$store.state.memberList;
        },
    },
    methods: {
        changeMember() {
            // 监听登录和登出方法增加和减少成员列表 获取变量 用户成员列表 list
            // todo 这个方法不起效果
            // this.socket.on('sendTips', (data)=> {
            //     console.log("成员列表", data)
            // })
        },
    },
};
</script>
<style lang="less">

.member-list {
    width: 25%;
    height: 100%;
    .member-list__item {
        display: flex;
        height: 30px;
        align-items: center;
        padding-left: 10px;
    }
}
</style>

