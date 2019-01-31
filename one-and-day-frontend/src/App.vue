<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<style lang="less">
.app{
  width: 100%;
  height: 100%;
}
html{
  height: 100%;
  overflow: hidden;
  body {
    height: 100%;
    padding-bottom: 20px;
    overflow: hidden;
  }
}
</style>
