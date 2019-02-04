<template>
    <div class="member-list primaryback-ground">
        <div class="member-list__item" v-for="(user,index) in memberList" :key="index">
            <div class="point-green"></div>
            <span>{{user}}</span>
        </div>
    </div>
</template>
<script>
export default {
    created() {},
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
    methods: {},
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

