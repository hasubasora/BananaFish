<template>
    <div>
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">

            <div v-if="GoodsList==''" slot="list" style="text-align:center;padding:1rem;height:5rem;font-size:.3rem;">暂无头筹商品哦~</div>
            <div class="goodsList" slot="list" v-for="item in GoodsList" :key="item.id">
                <yd-flexbox class="backgoods">
                    <yd-flexbox-item>
                        <div class="goodsListOne">
                            <!-- <span class="GroupId">第TCG{{item.CurrentPeriod}}期</span> -->
                            <div class="goodsa" @click="GoToItem(item.GroupId)">
                                <span class="goodsatop">本期头筹奖品</span>
                                <!-- <time class="c-red" style="text-align:center">距结束 {{new Date(item.EndTime*1000).getDate()}}:{{new Date(item.EndTime*1000).getHours()}}:{{new Date(item.EndTime*1000).getMinutes()}}</time> -->
                                <time class="c-red" style="text-align:center"> {{GetUnTime(item.EndTotalSeconds)}}</time>
                                <img class="goodsatopImg" :src="item.ProductImg" alt="">
                                <p class="ProductTitle">{{item.ProductTitle}}</p>
                                <div class="SubTitle">{{item.SubTitle}}</div>
                                <div class="points">
                                    市场价
                                    <strong>￥{{item.MarketPrice}}</strong>
                                </div>
                            </div>
                        </div>
                    </yd-flexbox-item>
                    <yd-flexbox-item class="goodsListTwo">
                        <yd-grids-group :rows="2" item-height="2.5rem">
                            <yd-grids-item v-for="itemt in item.LstProduct" :key="itemt.id" @click.native="GoToItemGeneral(itemt.ProductId)">
                                <span slot="text">
                                    <div class="goodsLittle">
                                        <img class="ProductImgt" :src="itemt.ProductImg" alt="" width="100">
                                        <p class="ProductTitlet">{{itemt.ProductTitle}}</p>
                                        <!-- <span>月销{{itemt.SaleCount}}件</span> -->
                                        <strong>￥{{itemt.SalePrice.toFixed(2)}}</strong>
                                        <!-- <img class="gwc" src="../assets/Img/gwc.png" alt=""> -->
                                    </div>
                                </span>
                            </yd-grids-item>
                        </yd-grids-group>
                    </yd-flexbox-item>
                </yd-flexbox>

                <div class="p_Group">
                    <div class="p_button">
                        <button type="button">第TCG{{item.CurrentPeriod}}期</button>

                    </div>

                    <div class="p_progress">
                        <div class="p_prog">{{item.TotalNum-item.RemainNum+'/'+item.TotalNum}}</div>
                        <yd-progressbar class="progress" type="line" :progress="1-item.RemainNum/item.TotalNum" trail-width="10" trail-color="#FE5D51"></yd-progressbar>

                    </div>
                </div>
                <p style="text-align:center;padding:.1rem;"><span class="c-red">往期送出{{item.CurrentPeriod-1}}件</span> 已购{{item.TotalNum-item.RemainNum}}人次(满{{item.TotalNum}}人次揭晓答案)</p>
            </div>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">已经到底啦~♪(^∇^*)~</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />

        </yd-infinitescroll>
    </div>

</template>

<script >
import { GetUnTime, LOGIN_SUCCESS } from "../main.js";
export default {
    data() {
        return {
            page: 1,
            pageSize: 2,
            GoodsList: []
        };
    },
    created() {
        this.$axios({
            method: "POST",
            data: {
                pageindex: this.page,
                pagesize: this.pageSize
            },
            url: this.$server.serverUrl + "/index/getproductgrouplist",
            responseType: "json"
        }).then(response => {
            LOGIN_SUCCESS(response.data)
            if (response.data.success == 200) {
                this.GoodsList = response.data.rows;
                console.log(response.data.rows)
                let eTime = setInterval(e => {
                    for (const iterator of this.GoodsList) {
                        // console.log(iterator.EndTotalSeconds);
                        this.$set(
                            iterator,
                            "EndTotalSeconds",
                            iterator.EndTotalSeconds - 1
                        );
                        // console.log(iterator.EndTotalSeconds);
                    }
                }, 1000);
            }
        });
    },
    methods: {
        GetUnTime(d) {
            if (d > -1) {
                return GetUnTime(d);
            }
        },
        GoToItem(id) {
            this.$router.push({
                name: "ItemDescription",
                params: { ItemGood_id: id }
            });
        },
        GoToItemGeneral(id) {
            console.log(id);

            this.$router.push({
                name: "GeneralItemDescription",
                query: { Good_id: id }
            });
        },
        loadList() {
            this.$axios({
                method: "POST",
                data: {
                    pageindex: this.page + 1,
                    pagesize: this.pageSize
                },
                url: this.$server.serverUrl + "/index/getproductgrouplist"
            }).then(response => {
                const _list = response.data.rows;
                this.GoodsList = [...this.GoodsList, ..._list];
                if (_list.length < this.pageSize || this.page == 3) {
                    // console.log("所有数据加载完毕");
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit(
                        "ydui.infinitescroll.loadedDone" 
                    );
                    return;
                }
                // console.log("单次请求数据完毕");

                /* 单次请求数据完毕 */
                this.$refs.infinitescrollDemo.$emit(
                    "ydui.infinitescroll.finishLoad"
                );

                this.page++;
            });
        }
    }
};
</script>

<style lang="scss">
.ProductTitlet {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.p_Group {
    display: flex;
}
.progress {
    > svg {
        // border: 1px solid;
        border-radius: 50px;
        margin: 0.1rem 0;
        height: 0.3rem;
    }
}
.goodsListOne {
    // position: relative;
    // top: 0;
    // left: 0;
    // width: 2.4rem;
    height: 5rem;
    .GroupId {
        position: absolute;
        top: -0.76rem;
        left: -0.1rem;
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
        // margin: 0.5rem 0 0 0;
        // border-radius: 8px;
        // background: #fff;
        .goodsatop {
            display: block;
            background: linear-gradient(
                -90deg,
                rgba(234, 63, 50, 1),
                rgba(237, 121, 71, 1)
            );
            border-bottom-right-radius: 15px;
            border-top-right-radius: 15px;
            color: #fff;
            height: 0.5rem;
            font-size: 0.26rem;
            line-height: 0.5rem;
            text-align: center;
        }
        .goodsatopImg {
            width: 100%;
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
            padding: 0.1rem;
            strong {
                font-size: 0.28rem;
                color: #ff5f17;
            }
        }
    }
}
</style>
