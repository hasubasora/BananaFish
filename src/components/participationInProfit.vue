<template>
    <div class="participation">
     
        <div class="left"  v-for="(item,index) in points" :key='index'>
            <div class="title">
                {{item.title}}
            </div>
       
        </div>
        <div class="right"></div>
    </div>
</template>
<style lang="scss">
.participation {
  display: flex;
}
.left {
  border: 1px solid red;
  width: 10rem;
  height: 5rem;
  border-radius: 5px;
  .title {
    margin-left: 1rem;
    height: 2rem;
    width: 4rem;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    font-size: 1rem;
    line-height: 2rem;
    color: #fff;
    background: #ff5f17;
  }
}
.right {
  border: 1px solid red;
}
</style>

<script>
export default {
  name: "participation",
  data() {
    return {
      points: [
        {
          title: "分红购",
          titleH: "分红优品",
          text: "购物的分红积分",
          btnTxt: "立即抢购",
          src: "",
          href: ""
        },
        {
          title: "分红购1",
          titleH: "分红优品",
          text: "购物的分红积分",
          btnTxt: "立即抢购",
          src: "",
          href: ""
        }
      ]
    };
  }
};
</script>
