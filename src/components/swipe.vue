<template>
  <mt-swipe :auto="4000" id="swipe" >
    <mt-swipe-item><img src="../assets/Img/Banner1.png" alt=""></mt-swipe-item>
    <mt-swipe-item><img src="../assets/Img/Banner1.png" alt=""></mt-swipe-item>
    <mt-swipe-item><img src="../assets/Img/Banner1.png" alt=""></mt-swipe-item>
    <mt-swipe-item><img src="../assets/Img/Banner1.png" alt=""></mt-swipe-item>
  </mt-swipe>
</template>
<script>
export default {
  name: "swipe",
  data(){
      return{
          ImgList:[{src:'../assets/Img/Banner1.png'}]
      }
  }
};
</script>
<style lang="scss" >
#swipe {
  height: 3rem;
}
img{
    width: 100%;
    height: auto;
}
</style>

