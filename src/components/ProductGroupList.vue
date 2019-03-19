<template>
    <div class="ProductGroupList">
        <yd-flexbox direction="vertical">
            <yd-flexbox-item class="ProTop">
                <img class="haibao" src="../assets/Img/haibao.png" alt="">
                <router-link to="/TCRuler">
                    <img src="../assets/Img/ttgj.png" alt="" class="tttiele">
                </router-link>

            </yd-flexbox-item>
            <yd-flexbox-item>
                <yd-tab>
                    <yd-tab-panel label="正在头筹">
                        <IsTheTop></IsTheTop>
                    </yd-tab-panel>
                    <yd-tab-panel label="正在揭晓">
                        <InTheTop></InTheTop>
                    </yd-tab-panel>
                    <yd-tab-panel label="拔得头筹" >
                        <OverTheTop></OverTheTop>
                    </yd-tab-panel>
                </yd-tab>
            </yd-flexbox-item>
    
        </yd-flexbox>
    </div>
</template>
<style lang="scss">
.Grouporder {
    border-radius: 5px;
    margin: 0.3rem;
    // height: 3rem;
    background-color: #fff;
    position: relative;
    font-size: 0.26rem;
    .UserIcon {
        padding: 0.2rem;
        text-align: center;
        border-bottom: 1px solid #f2f2f2;
        img {
            width: 0.5rem;
            vertical-align: top;
            margin-right: 0.2rem;
            border-radius: 50px;
        }
    }
    .ModelProduct {
        display: flex;
        .ModelProductLeft {
            &:nth-last-child(1) {
                border-left: 1px solid #f2f2f2;
            }
            padding: 0.2rem;
            position: relative;
            display: inline-block;
            .tag {
                position: absolute;
                color: #fff;
                top: 0;
                left: 0;
                height: 0.5rem;
                line-height: 0.5rem;
                padding: 0 0.2rem;
                border-top-right-radius: 50px;
                border-bottom-right-radius: 50px;
            }
            .ModelProductWin {
                padding: 0.2rem;
                // border: 1px solid #666666;
                box-shadow: 0 0 1px 1px #666;
                border-radius: 5px;
                text-align: center;
                img {
                    vertical-align: middle;
                    width: 0.3rem;
                }
            }
            .ModelProductMsg {
                h5 {
                    line-height: 0.5rem;
                }
                span {
                    display: block;
                    line-height: 0.4rem;
                    font-size: 0.28rem;
                }
                .ModelProductMsgBom {
                    .linkBom {
                        color: #fff;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        display: inline-block;
                        padding: 0 0.2rem;
                    }
                }
            }
        }
        .GoodTitle {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 2rem;
        }
        .GoodImg {
            width: 2rem;
            margin-top: 0.5rem;
        }
    }
}
.haibao {
    width: 100%;
}
.tttiele {
    position: absolute;
    top: 0.2rem;
    left: 0;
    width: 2rem;
}
.ProTop {
    position: relative;
    // margin-bottom: 1rem;
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
    background-size: 100%;

    .yd-tab-panel {
        background: transparent;
        margin-bottom: 1rem;
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
            margin-bottom: 0.1rem;
        }
        .ProductTitlet {
            font-size: 0.2rem;
            // height: 0.6rem;
            text-overflow: ellipsis;
            line-height: 0.26rem;
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
            font-size: 0.2rem;
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
.p_button {
    display: inline-block;
    width: 3rem;
    text-align: center;
    line-height: 1rem;
    button {
        border: 1px solid rgba(102, 102, 102, 1);
        border-radius: 8px;
        padding: 0.1rem;
        margin: 0.2rem;
    }
}
.p_progress {
    display: inline-block;
    padding: 0.2rem;
    position: relative;
    width: 100%;
    .yd-progressbar {
        height: auto;
    }
    .p_text {
        font-size: 0.26rem;
        color: red;
        text-align: center;
    }
    .p_prog {
        position: absolute;
        font-size: 0.26rem;
        color: #fff;
        z-index: 2;
        top: 0.31rem;
        left: 45%;
    }
    > p {
        // color: #ff5f17;
        font-size: 0.26rem;
        display: flex;
        justify-content: space-around;
        text-align: right;
    }
}
</style>

<script>
export default {
 
    components: {
        IsTheTop: IsTheTop => require(["@/components/IsTheTop"], IsTheTop),
        OverTheTop: OverTheTop => require(["@/components/OverTheTop"], OverTheTop),
        InTheTop: InTheTop => require(["@/components/InTheTop"], InTheTop)
    },

};
</script>
