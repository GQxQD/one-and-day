<template>
    <div class="home-page">
        <div class="home-page__header"></div>
        <div class="home-page__content">
            <member-list/>
            <game-area/>
            <chat-area/>
        </div>
    </div>
</template>
<script>
import memberList from "../components/member-list.vue"
import gameArea from "../components/game-area.vue"
import chatArea from "../components/chat-area.vue"
export default {
    components: {memberList, gameArea, chatArea}
}
</script>
<style lang="less">
.home-page {
    height: 100%;
    width: 100%;
    .home-page__header{
        height: 30px;
        width: 80%;
        text-align: center;
        background: red;
    }
    .home-page__content{
        width: 80%;
        height: calc(100% - 30px);
        background-color: #7d7d7d;
    }
}
</style>

