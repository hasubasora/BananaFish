<template>
    <div>
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <div v-if="GoodsList==''" slot="list" style="text-align:center;padding:1rem;height:5rem;font-size:.3rem;">暂无揭晓中的商品哦~去逛逛其他商品~</div>
            <div class="goodsList" slot="list" v-for="item in GoodsList" :key="item.id">
                <yd-flexbox class="backgoods">
                    <yd-flexbox-item>
                        <div class="goodsListOne">
                            <!-- <span class="GroupId">第TCG{{item.CurrentPeriod}}期</span> -->
                            <div class="goodsa" @click="GoToItem(item.GroupId)">
                                <span class="goodsatop">本期头筹奖品</span>
                                <!-- <span class="goodsatop">等待揭晓</span> -->
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
                                        <strong>￥{{itemt.SalePrice}}</strong>
                                        <!-- <img class="gwc" src="../assets/Img/gwc.png" alt=""> -->
                                    </div>
                                </span>
                            </yd-grids-item>
                        </yd-grids-group>
                    </yd-flexbox-item>
                </yd-flexbox>

                <yd-flexbox-item>

                    <div class="p_progress">
                        正在等待揭晓...
                    </div>
                </yd-flexbox-item>
            </div>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">已经到底啦~♪(^∇^*)~</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />

        </yd-infinitescroll>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            pageSize: 2,
            GoodsList: [],
            Grouporder: []
        };
    },
    created() {
        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/index/getwaitlottergrouplist",
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
        GoToItem(id) {
            this.$router.push({
                name: "ItemDescription",
                params: { ItemGood_id: id, text: "over" },
              
            });
        },
        GoToItemGeneral(id) {
            this.$router.push({
                name: "GeneralItemDescription",
                query: { Good_id: id }
            });
        },
        loadList() {
            this.$axios({
                method: "POST",
                data: {
                    pageindex: this.page,
                    pagesize: this.pageSize
                },
                url: this.$server.serverUrl + "/index/getwaitlottergrouplist"
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
