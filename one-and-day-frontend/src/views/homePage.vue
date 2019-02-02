<template>
    <div class="home-page">
        <div class="home-page__header">
            <img src="../assets/header.jpg" alt="">
        </div>
        <label for="toggle-input" class="toggle-button primaryback-ground">
            成员列表
        </label>
        <input type="checkbox" id="toggle-input">
        <div class="home-page__content">
            <member-list/>
            <game-area/>
            <div class='home-page__mask'></div>
        </div>
    </div>
</template>
<script>
import memberList from "../components/member-list.vue"
import gameArea from "../components/game-area.vue"
export default {
    components: {memberList, gameArea},
    data(){
        return{

        }
    }
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
        .toggle-button{
            font-size: 14px;
            z-index: 1000;
            display: block !important;
            width: 60px;
            height: 20px;
            position: absolute;
            left: 0;
            top: 80px;
        }
        #toggle-input:not(checked) ~ .home-page__content{
            .member-list{display: none;}
        }
        #toggle-input:checked ~ .home-page__content{
            .member-list{
                z-index: 1000;
                width: 150px;
                display: block;
                margin: 0;
                position: absolute;
                left: 0;
                top: 0;
            }
            .home-page__mask{
                z-index: 100;
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0,0, 0.2) 
            }
        }
    }  
}
.home-page {
    position: relative;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    .toggle-button{display: none;}
    #toggle-input{display: none;}
    .home-page__header{
        height: 100px;
        width: 100%;
        text-align: center;
        background: #fff;
        img{
            height: 100%;
            width: 100%;
        }
    }
    .home-page__content{
        position: relative;
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

