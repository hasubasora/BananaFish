<template>
    <div>
        <div v-if="GoodsList==''" style="text-align:center;padding:1rem;height:5rem;font-size:.3rem;">暂无头筹商品哦~</div>

        <div class="goodsList" v-for="item in GoodsList" :key="item.id">
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
                                    <span>月销{{itemt.SaleCount}}件</span>
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
                    <div class="p_prog">{{item.RemainNum+'/'+item.TotalNum}}</div>
                    <yd-progressbar class="progress" type="line" :progress="1-item.RemainNum/item.TotalNum" trail-width="10" trail-color="#FE5D51"></yd-progressbar>
                    <p> 已购{{item.TotalNum-item.RemainNum}}人次(满{{item.TotalNum}}人次揭晓答案)</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
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

<script>
export default {
    data() {
        return {
            GoodsList: [],
            Grouporder: []
        };
    },
    created() {
        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/index/getproductgrouplist",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 400) {
                this.$router.push({ name: "SignIn" });
            }
            if (response.data.success == 200) {
                this.GoodsList = response.data.rows;
                console.log(this.GoodsList);
            }
        });
    },
    methods: {
        GetUnTime(d) {
            var date3 = d * 1000; //时间差的毫秒数
            //------------------------------
            //计算出相差天数
            var days = Math.floor(date3 / (24 * 3600 * 1000));
            //计算出小时数
            var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
            var hours = Math.floor(leave1 / (3600 * 1000));
            //计算相差分钟数
            var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
            var minutes = Math.floor(leave2 / (60 * 1000));
            //计算相差秒数
            var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
            var seconds = Math.round(leave3 / 1000);
            return (
                " 距结束 " + days + "天 " + hours + "时 " + minutes + " 分"
            );
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
                params: { Good_id: id }
            });
        }
    }
};
</script>
