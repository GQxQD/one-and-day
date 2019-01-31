<template>
    <div class="chat-area">
        <div class="chat__content">
            <!-- todo 聊天内容显示 -->
        </div>
        <div class="chat__footer">
            <el-input></el-input>
            <el-button>发送</el-button>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
.chat-area{
    width: 30%;
    .chat__content{
        height:calc(100% - 60px);
        width: 100%;
    }
    .chat__footer{
        height: 40px;
        display: flex;
        align-items: center;
        .el-input{
            .el-input__inner{
                border-radius: 4px 0 0 4px;
                border: none;
            }
        }
        .el-button{
            border: none;
            border-radius: 0 4px 4px 0;
            background-color: aqua;
            padding: 0;
            width: 60px;
            height: 40px;
        }
    }
}
</style>