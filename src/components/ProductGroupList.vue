<template>
    <div class="ProductGroupList">
        <yd-flexbox direction="vertical">
            <yd-flexbox-item class="ProTop">
                <img class="haibao" src="../assets/Img/haibao.jpg" alt="">
                <div class="liucheng"> <img class="liuchengtu" src="../assets/Img/liucheng.png" alt=""></div>
                <img class="haibaohd" src="../assets/Img/hd.png" alt="">
                <img class="haibaowd" src="../assets/Img/wd.png" alt="">
                <div class="ProductNews">
                    <img class="Productnew" src="../assets/Img/tt.png" alt="">
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

            </yd-flexbox-item>
            <yd-flexbox-item>
                <yd-tab>
                    <yd-tab-panel label="正在头筹">
                        <IsTheTop></IsTheTop>

                    </yd-tab-panel>
                    <yd-tab-panel label="正在揭晓">

                        <InTheTop></InTheTop>

                    </yd-tab-panel>
                    <yd-tab-panel label="拔得头筹">
                        <yd-flexbox direction="vertical">
                            <!-- s -->
                            <yd-flexbox-item>
                                <div v-for="item in Grouporder" :key="item.id" class="Grouporder">
                                    <div class="Grouporder_top">
                                        <span class="CurrentPeriod">第{{item.CurrentPeriod}}期</span>
                                    </div>
                                    <div class="Grouporder_center">
                                        <div class="Grouporder_center_img">
                                            <img class="gjtx2" :src="item.UserIcon" alt="">
                                            <img class="gjtx1" src="../assets/Img/gjtx.png" alt="">
                                        </div>
                                        <div class="Grouporder_center_text">
                                            <p class="gj"><img src="../assets/Img/gj.png" alt="">
                                                <span>头筹幸运号码</span>
                                            </p>
                                            <div class="fontTel"> {{item.LuckerNumber}}</div>
                                            <div class="OrderTitle"> {{item.OrderTitle}}</div>
                                            <div>头筹用户:{{item.NickName}}</div>
                                            <div>参与时间:{{item.CreateTime}}</div>
                                            <div>计算规则:{{item.Formula}}</div>
                                        </div>
                                    </div>
                                </div>
                            </yd-flexbox-item>
                            <!-- e -->
                        </yd-flexbox>
                    </yd-tab-panel>
                </yd-tab>
            </yd-flexbox-item>
            <yd-flexbox-item>

            </yd-flexbox-item>
        </yd-flexbox>
    </div>
</template>
<style lang="scss">
.Grouporder {
    margin: 0.3rem;
    height: 3rem;
    background-color: #fff;
    position: relative;
    .Grouporder_top {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        .CurrentPeriod {
            background: #ff5f17;
            padding: 0 0.3rem;
            color: #fff;
        }
    }
    .Grouporder_center {
        display: flex;
        .Grouporder_center_img {
            width: 3rem;
            position: relative;
            .gjtx1 {
                position: absolute;
                top: 0rem;
                left: 0rem;
                height: 3rem;
                width: 3rem;
            }
            .gjtx2 {
                position: absolute;
                height: 1.8rem;
                width: 1.8rem;
                top: 0.5rem;
                left: 0.4rem;
                border-radius: 50%;
            }
        }
        .Grouporder_center_text {
            flex: 1;
            padding-top: 0.5rem;
            img {
                width: 0.4rem;
            }
            .gj {
                > span {
                    vertical-align: super;
                    margin-left: 0.2rem;
                }
            }
            .orange {
                color: #ff5f17;
            }
            .fontTel {
                font-size: 0.5rem;
                @extend .orange;
            }
            .OrderTitle {
                font-size: 0.2rem;
                @extend .orange;
                overflow: hidden;
                width: 4rem;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}
.haibao {
    width: 100%;
}
.ProTop {
    position: relative;
    margin-bottom: 1rem;
    .liucheng {
        position: absolute;
        top: 4.5rem;
        left: 0;
        height: 1.5rem;
        width: 100%;
        display: flex;
        justify-content: center;
        .liuchengtu {
            width: 5rem;
        }
    }
    .haibaohd {
        width: 1rem;
        position: absolute;
        top: 0;
        left: 0.5rem;
    }
    .haibaowd {
        position: absolute;
        width: 1rem;
        top: 0;
        right: 0.5rem;
    }
}
.ProductGroupList {
    margin-bottom: 1rem;
    background: url("../assets/Img/bg.jpg") center;
    background-size: 100%;
    .ProductNews {
        width: 6.5rem;
        position: absolute;
        top: 6.1rem;
        right: 0.5rem;
        background: #f9d86c;
        border-radius: 15px;
        margin: auto;
        display: flex;
        margin-bottom: 1rem;
        .Productnew {
            width: 1rem;
            height: 0.25rem;
            margin: 0.15rem 0.1rem;
        }
        .yd-rollnotice {
            background: #f9d86c;
        }
        .allText {
            height: 0.5rem;
            margin: 0 0.1rem;
            line-height: 0.5rem;
            width: 1rem;
        }
    }
    .yd-tab-panel {
        background: transparent;
        margin-bottom: 1rem;
    }
}
.yd-flexbox-item {
    // padding: .1rem
}

.goodsList {
    background: #fff8dc;
    margin: 0.2rem 0.1rem;
    padding: 0.1rem;
    .yd-grids-2 {
        width: 4.6rem;
    }
}
.goodsListOne {
    width: 2.4rem;
    .GroupId {
        position: absolute;
        top: 0;
        left: 0;
        background: #ff5f17;
        color: #fff;
        width: 2.4rem;
        font-size: 0.25rem;
        text-align: center;
        line-height: 0.5rem;
        border-bottom-right-radius: 10px;
        display: inline-block;
    }
    .goodsa {
        width: 2.3rem;
        margin: 0.5rem 0 0 0;
        border-radius: 5px;
        background: #fff;
        .goodsatop {
            display: block;
            background: #ff5f17;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            color: #fff;
            height: 0.5rem;
            font-size: 0.2rem;
            line-height: 0.5rem;
            text-align: center;
            .goodsatopImg {
                width: 1rem;
            }
        }
        .ProductTitle {
            font-size: 0.25rem;
            overflow: hidden;
            white-space: nowrap;
            padding: 0 0.1rem;
            text-overflow: ellipsis;
        }
        .SubTitle {
            font-size: 0.2rem;
            padding: 0.1rem 0;
            line-height: 0.4rem;
            overflow: hidden;
            color: #999;
            padding: 0 0.1rem;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .points {
            color: #999;
            strong {
                font-size: 0.4rem;
                color: #555;
            }
        }
    }
}
.yd-grids-txt {
    position: relative;
}
.goodsListTwo {
    .yd-grids-txt {
        white-space: normal;
    }
    .yd-grids-item {
        padding: 0.1rem;
    }
    .goodsLittle {
        display: flex;
        text-align: left;
        flex-direction: column;
        .ProductImgt {
            width: 1rem;
            height: 1rem;
            margin: auto;
        }
        .ProductTitlet {
            font-size: 0.26em;
            height: 0.6rem;
            text-overflow: ellipsis;
            overflow: hidden;
            word-wrap: normal;
            text-align: none;
            display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。
        }
        > span {
            color: #999;
            font-size: 0.26rem;
        }
        > strong {
            color: #ff5f17;
        }
        .gwc {
            width: 0.6rem;
            position: absolute;
            bottom: 0rem;
            right: 0.2rem;
            height: 0.6rem;
        }
    }
}
.p_progress {
    padding: 0.2rem;
    position: relative;
    .p_text {
        font-size: 0.26rem;
        color: red;
        text-align: center;
    }
    .p_prog {
        position: absolute;
        color: #fff;
        z-index: 2;
        top: 0.31rem;
        left: 3rem;
    }
    > p {
        color: #ff5f17;
        font-size: 0.26rem;
        display: flex;
        justify-content: space-around;
    }
}
</style>

<script>
export default {
    data() {
        return {
            GoodsList: [],
            Grouporder: []
        };
    },
    components: {
        IsTheTop: IsTheTop => require(["@/components/IsTheTop"], IsTheTop),
        InTheTop: InTheTop => require(["@/components/InTheTop"], InTheTop)
    },
    created() {
        // this.$axios({
        //   method: "POST",
        //   data: {},
        //   url: this.$server.serverUrl + "/index/getwinnergrouporder",
        //   responseType: "json"
        // }).then(response => {
        //   if (response.data.success == 200) {
        //     this.TheTop = response.data.rows;
        //     console.log(this.TheTop);
        //   }
        // });

        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/index/getwinnergrouporder",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 400) {
                this.$router.push({ name: "SignIn" });
            }
            if (response.data.success == 200) {
                this.Grouporder = response.data.rows;
                console.log(this.Grouporder);
            }
        });
    }
};
</script>
