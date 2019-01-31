<template>
    <div class="home-page">
        <div class="home-page__header"></div>
        <div class="home-page__content">
            <member-list/>
            <game-area/>
        </div>
    </div>
</template>
<script>
import memberList from "../components/member-list.vue"
import gameArea from "../components/game-area.vue"
export default {
    components: {memberList, gameArea}
}
</script>
<style lang="less">
@media screen and (min-width: 1281px) {
    .home-page{
        width: 1000px;
    }
}
@media screen and (max-width: 1280px) {
    .home-page{
        width: 1000px;
    }
}
@media screen and (max-width: 1024px) {
    .home-page{
        width: 800px;
    }   
}
@media screen and (max-width: 968px) {
    .home-page{
        width: 750px;
    }   
}
@media screen and (max-width: 768px) {
    .home-page{
        width: 100%;
        .member-list{
            display: none;
        }
    }  
}
@media screen and (max-width: 500px) {
    .home-page{
        width: 100%;
    }  
}
.home-page {
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    .home-page__header{
        height: 100px;
        width: 100%;
        text-align: center;
        background: red;
        margin-bottom: 10px;
        border-radius: 10px;
    }
    .home-page__content{
        width: 100%;
        height: calc(100% - 130px);
        background-color:#fff;
        display: flex;
        .member-list{
            flex-shrink: 0;
        }
        .chat-area{
            flex-shrink: 0;
        }
    }
}
</style>

