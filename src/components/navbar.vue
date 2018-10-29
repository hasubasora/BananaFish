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
                <yd-slider autoplay="3000">
                    <yd-slider-item v-for="(item, index) in headNews" :key="index">
                        <!-- <p class="headNewsText"> -->
                        <!-- <span style="color:#F00;"> 荐 </span> -->
                        <span style="">恭喜<i class="c-red">{{item.NickName}}</i> 获得<i class="c-red">{{item.OrderTitle}}</i></span>
                        <!-- </p> -->
                    </yd-slider-item>
                </yd-slider>
                <!-- <span class="allText">|更多</span> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "navbar",
    props: ["headNews"],
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
                    name: "积分产品",
                    href: "menuThree/0?gg=3"
                },
                {
                    src: require("../assets/Img/nav4.png"),
                    name: "积分指数",
                    href: "RedData"
                },
                {
                    src: require("../assets/Img/nav5.png"),
                    name: "邀请有奖",
                    href: "Invitations"
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
.headNewsText {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
.news {
    justify-content: center;
    display: flex;
    background: #fff;
    .newsBox {
        width: 6.9rem;
        // height: 0.7rem;
        display: flex;
        font-size: 0.25rem;
        > img {
            flex: 1;
            height: 0.3rem;
            margin: 0.1rem;
            width: auto;
        }
        .yd-slider-item {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .headNewsText {
                font-size: 0.26rem;
            }
        }
        .yd-slider {
            line-height: 0.5rem;
        }
        .yd-slider-pagination {
            display: none;
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

