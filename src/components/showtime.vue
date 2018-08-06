<template>
    <div class="fh_title">
       <img :src=TimeSrc alt="../assets/Img/fhyp.png">
       <router-link class="fh_title_all" to="home">更多商品<img src="../assets/Img/r.png" alt=""></router-link>
    </div>
</template>
<style lang="scss">
.fh_title {
  position: relative;
  padding: 0 1rem;
  > img {
    height: 1rem;
    width: auto;
  }
  .fh_title_all {
    font-size: 0.8rem;
    line-height: 0.8rem;
    position: absolute;
    right: 1rem;
    text-decoration: none;
    color: #444;
    > img {
      height: 1rem;
      vertical-align: sub;
      width: auto;
      padding-left: 0.8rem;
    }
  }
}
</style>
<script>
export default {
  name: "showtime",
  props: ["TimeSrc"]
};
</script>

