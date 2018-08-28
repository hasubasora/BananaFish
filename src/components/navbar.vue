<template>
  <div>
    <div class="navbar">
      <div class="center" v-for="(item,index) in navbars" :key='index'>
        <router-link class="center border" :to="item.href">
          <img :src='item.src' alt="">
          <span>{{item.name}}</span>
        </router-link>
      </div>
    </div>
    <div class="news">
      <div class="newsBox">
        <img src="../assets/Img/news.png" alt="">
        <yd-rollnotice autoplay="2000">
          <yd-rollnotice-item>
            <span style="color:#F00;"> 最新 </span>荣耀V9 3月超级钜惠！</yd-rollnotice-item>
          <yd-rollnotice-item>
            <span style="color:#F00;"> 最新 </span>3.23京东超级品牌日格力盛典</yd-rollnotice-item>
          <yd-rollnotice-item>
            <span style="color:#F00;"> 最新 </span>京东服饰 早春新品低至7折</yd-rollnotice-item>
        </yd-rollnotice>
        <span class="allText">|更多</span>
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
                    href: "ProductGroupList"
                },
                {
                    src: require("../assets/Img/nav2.png"),
                    name: "往期头筹",
                    href: "ProductGroupList"
                },
                {
                    src: require("../assets/Img/nav3.png"),
                    name: "分红产品",
                    href: "ProductGroupList"
                },
                {
                    src: require("../assets/Img/nav4.png"),
                    name: "分红指数",
                    href: "MyRedData"
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
    background: #fff;
    .center {
        flex: 1;
        border: 1px solid #f5f5f5;
        text-align: center;
        .border {
            border: none;
        }
        img {
            display: inline-flex;
            width: 0.8rem;
            align-content: center;
            padding-top: 0.3rem;
        }
        > span {
            color: #888;
            font-size: 0.2rem;
            margin: 0.1rem 0;
            display: block;
        }
    }
}
.news {
    justify-content: center;
    display: flex;
    background: #fff;
    .newsBox {
        width: 6.8rem;
        height: 0.7rem;
        display: flex;
        font-size: 0.25rem;
        > img {
            flex: 1;
            height: 0.3rem;
            margin: 0.1rem;
            width: 1.4rem;
        }
        .newsText {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        > span {
            width: 1rem;
            margin: 0.1rem;
        }
    }
}
</style>

