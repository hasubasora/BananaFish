<template>
  <div>
     <div class="navbar">
        <div class="center" v-for="(item,index) in navbars" :key='index'>
            <img :src='item.src' alt="">
            <span>{{item.name}}</span>
        </div>
    </div>
     <div class="news">
          <img src="../assets/Img/news.png" alt="">
          <div class="newsbanner">
            <span>最新</span>
            <span>恭喜空空获得宇宙一个哈哈哈哈哈哈哈哈哈</span>
            <span>|更多</span>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "navbar",
  data() {
    return {
      navbars: [
        {
          src: require("../assets/Img/nav.png"),
          name: "正在头筹",
          href: ""
        },
        {
          src: require("../assets/Img/nav2.png"),
          name: "往期头筹",
          href: ""
        },
        {
          src: require("../assets/Img/nav3.png"),
          name: "分红产品",
          href: ""
        },
        {
          src: require("../assets/Img/nav4.png"),
          name: "分红指数",
          href: ""
        },
        {
          src: require("../assets/Img/nav5.png"),
          name: "邀请有利",
          href: ""
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.navbar {
  display: flex;
  justify-content: center;

  .center {
    border: 1px solid #f5f5f5;
    > img {
      height: 3rem;
      width: 3rem;
      display: block;
      padding: 0.8rem;
      padding-bottom: 0;
    }
    > span {
      color: #888;
      font-size: 0.8rem;
      margin: 0.2rem 0;
      display: block;
    }
  }
}
</style>

