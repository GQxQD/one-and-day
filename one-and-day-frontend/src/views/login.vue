<template>
    <div class="login-page">
        <div class="login__box">
            <div class="login__box__header">一日旧</div>
            <div class="login__box__content">
                <!-- <span class="label">名号：</span> -->
                <!-- <span class="label">咒令：</span> -->
                <div class="text-input"><el-input v-model="name" placeholder="名号"></el-input></div>
                <div class="text-input"><el-input placeholder="咒令" type="password" v-model="password"></el-input></div>
            </div>
            <div class="login__box__button">
                <el-button @click="login">传送</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name: '',
            password: ''
        }
    },
    methods:{
        login(){
            this.$message('adfasdfasfasdf');
            this.$router.replace({name: 'home'})
        }
    }
}
</script>
<style lang="less">

.login-page{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('../assets/login.png'); 
    background-repeat:no-repeat;
    background-position: center;
    .login__box{
        width: 400px;
        height: 250px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.5);

        .login__box__header{
            height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: 20px;
        }
        .login__box__content{
            height: 120px;
            .text-input{
                width: 100%;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content:center;
                .label{
                    width: 100px;
                    text-align: right;
                    flex-shrink: 0;
                }
                .el-input{
                    width: 250px;
                }
            }
        }
        .login__box__button{
            height: 70px;
            display: flex;
            justify-content: center;
            .el-button{
                width: 250px;
                background:#ff3300;
                opacity: 0.5;
                height: 30px;
            }
        }
    }
 
}

</style>
