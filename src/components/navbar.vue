<template>
  <div>
     <div class="navbar">
        <div class="center" v-for="(item,index) in navbars" :key='index'>
            <img :src='item.src' alt="">
            <span>{{item.name}}</span>
        </div>
    </div>
     <div class="news">
       <div class="newsBox">
            <img src="../assets/Img/news.png" alt="">
            <span class="c-red">最新</span>
            <span class="newsText">恭喜空空获得宇宙一个哈哈哈哈哈哈哈哈哈</span>
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
  background: #fff;
  .center {
    text-align: center;
    flex: 1;
    border: 1px solid #f5f5f5;
    > img {
      height: 3rem;
      width: 3rem;
      align-content: center;
      padding-top: 0.8rem;
    }
    > span {
      color: #888;
      font-size: 0.8rem;
      margin: 0.5rem 0;
      display: block;
    }
  }
}
.news {
  justify-content: center;
  display: flex;
    background: #fff;
  .newsBox {
    display: flex;
    font-size: 0.9rem;
    border: 1px solid #f5f5ff;
    padding: 0.5rem 0;
    > img {
      height: 1rem;
      width: 4rem;
    }
    .newsText {
      width: 13rem;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    > span {
      padding: 0 0.46rem;
    }
  }
}
</style>

