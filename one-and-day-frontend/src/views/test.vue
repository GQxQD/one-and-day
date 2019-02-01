<template>
    <div class="page">
      <div class="donghua">

      </div>
      <span>button</span>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less">

body {
  background: url(https://unsplash.imgix.net/photo-1423683249427-8ca22bd873e0?fit=crop&fm=jpg&h=700&q=75&w=1050) 0 0 no-repeat;
  background-size: cover;
  .page{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .donghua{
      width: 100px;
      height: 100px;
      border: 3px solid blue;
      animation: border 3s infinite alternate;
    }
  }
  @keyframes border{
    from {border-color: red}
    to { border-color: blue}
  }
}


</style>
