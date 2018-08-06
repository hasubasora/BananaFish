<template>
    <div class="participation">
        <div class="participationBox"  v-for="(item,index) in points" :key='index'>
            <img class="participationImg" :src="item.src" alt="">
            <div class="title">{{item.title}}</div>
            <h4>{{item.titleH}}</h4>
            <h5>{{item.text}}</h5>
            <router-link class="linkClass" to="Home">{{item.btnTxt}}</router-link>
            <div class="timeout">
              <span class="timeoutL">正在夺筹</span>
              <span class="timeoutR">00:00:00</span>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.participation {
  display: flex;
  .participationBox {
    border: 1px solid #f2f2f2;
    position: relative;
    flex: 1;
    background: #fff;
    width: 11.5rem;
    height: 7rem;
    border-radius: 5px;
    margin: 0 0.2rem;
    .participationImg {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 5rem;
    }
    .title {
      text-align: center;
      margin-left: 1rem;
      height: 1.2rem;
      width: 3rem;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      font-size: 0.5rem;
      line-height: 1.1rem;
      color: #fff;
      background: #ff5f17;
    }
    > h4 {
      text-indent: 1rem;
      margin: 0.5rem 0;
    }
    > h5 {
      text-indent: 1rem;
      font-size: 0.4rem;
      color: #999;
      margin: 0 0 0.5rem 0;
    }
    .linkClass {
      display: inline-block;
      color: #fff;
      background: #ff5f17;
      padding: 0.2rem 0.6rem;
      margin-left: 1rem;
      border-radius: 50rem;
      font-size: 0.4rem;
      text-decoration: none;
    }
    .timeout {
      position: absolute;
      right: .2rem;
      top: .3rem;
      outline: 1px solid red;
      width: 7rem;
      font-size: .5rem;
      .timeoutL {
        width: 3.5rem;
        text-align: center;
        display: inline-block;
        background: red;
        color: #fff;
      }
      .timeoutR {
        width: 2.5rem;
        text-align: center;
        display: inline-block;
        color: red;
      }
    }
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
          src: require("../assets/Img/shop.png"),
          href: ""
        },
        {
          title: "分红购1",
          titleH: "分红优品",
          text: "购物的分红积分",
          btnTxt: "立即抢购",
          src: require("../assets/Img/shop.png"),
          href: ""
        }
      ]
    };
  }
};
</script>
