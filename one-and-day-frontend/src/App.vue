<template>
    <div id="app" class="app theme-pink">
        <router-view/>
    </div>
</template>

<style lang="less">
.app {
    width: 100%;
    height: 100%;
}

html {
    height: 100%;
    overflow: hidden;
    body {
        margin: 0;
        height: 100%;
        overflow: hidden;
    }
}
</style>
