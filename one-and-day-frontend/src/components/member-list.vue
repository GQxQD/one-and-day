<template>
    <div class="member-list">
        <div class="member-list__item" v-for="(user,index) in list" :key="index">
            <div class="point-green"></div>
            <span>{{user.name}}</span>
            <span>{{user.level}}</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list: [
                {name: '柯灰大佬', level: '副会长'},
                {name: '吱吱丶靈', level: '成员'}
            ]
        }
    }
}
</script>
<style lang="less">

.member-list{
    width: 15%;
    .member-list__item{
        display: flex;
        height: 30px;
        align-items: center;
        padding-left: 10px;
    }
}
</style>

