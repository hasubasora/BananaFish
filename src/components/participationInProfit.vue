<template>
    <div class="participation">
        <div class="participationBox" v-for="(item,index) in InProfit" :key='index' :style="{'background':'url('+item.Src+')','background-size':'100%'}">
            <router-link class="Link" :to="index>0?'/ProductGroupList':'/menuThree/0'">
                <!-- <img class="participationImg" :src="item.Src" alt=""> -->
                <div class="title">{{item.Title}}</div>
                <h4>{{item.Title}}</h4>
                <!-- <h5>{{item.Title}}</h5> -->
                <router-link class="linkClass" :to="item.Link">立即抢购</router-link>
                <!-- <div class="timeout">
              <span class="timeoutL">正在夺筹</span>
              <span class="timeoutR">00:00:00</span>
            </div> -->
                <!-- </router-link> -->
            </router-link>
        </div>
    </div>
</template>
<style lang="scss">
.participation {
    display: flex;
    .participationBox {
        position: relative;
        flex: 1;
        background: #fff;
        width: 3.5rem;
        height: 2.5rem;
        border-radius: 5px;
        .Link {
            // &:nth-child(1) {
            //     margin-right: 0.1rem;
            // }
            .participationImg {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 1.8rem;
            }
            .title {
                text-align: center;
                margin-left: 0.2rem;
                height: 0.4rem;
                width: 1rem;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                font-size: 0.2rem;
                line-height: 0.4rem;
                color: #fff;
                background: #ff5f17;
            }
            > h4 {
                text-indent: 0.2rem;
                font-size: 0.3rem;
                margin: 0.1rem 0;
            }
            > h5 {
                text-indent: 0.2rem;
                font-size: 0.2rem;
                color: #999;
                margin: 0 0 0.5rem 0;
            }
            .linkClass {
                display: inline-block;
                color: #fff;
                background: #ff5f17;
                padding: 0.1rem 0.2rem;
                margin-left: 0.1rem;
                border-radius: 50rem;
                font-size: 0.2rem;
                text-decoration: none;
            }
            .timeout {
                position: absolute;
                right: 0.1rem;
                top: 0.1rem;
                outline: 1px solid red;
                width: 2.1rem;
                font-size: 0.2rem;
                .timeoutL {
                    width: 1rem;
                    text-align: center;
                    display: inline-block;
                    background: red;
                    color: #fff;
                }
                .timeoutR {
                    width: 1rem;
                    text-align: center;
                    display: inline-block;
                    color: red;
                }
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
    props: ["InProfit"],
    data() {
        return {
            back:'background-size:100%',
            points: [
                {
                    title: "积分购",
                    titleH: "积分优品",
                    text: "购物的积分积分",
                    btnTxt: "立即抢购",
                    src: require("../assets/Img/shop.png"),
                    href: ""
                },
                {
                    title: "积分购1",
                    titleH: "积分优品",
                    text: "购物的积分积分",
                    btnTxt: "立即抢购",
                    src: require("../assets/Img/shop.png"),
                    href: ""
                }
            ]
        };
    }
};
</script>
