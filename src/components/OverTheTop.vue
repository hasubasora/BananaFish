<template>
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
        <div v-if="Grouporder==''" slot="list" style="text-align:center;padding:1rem;height:5rem;font-size:.3rem;">暂无拔得头筹商品哦~去逛逛吧~</div>
        <div v-for="item in Grouporder" slot="list" :key="item.id" class="Grouporder">
            <!-- 上半截 -->
            <div class="UserIcon"><img :src="item.UserIcon" alt=""><span>恭喜<i class="c-red">{{item.NickName}}</i>拔得头筹</span></div>
            <!-- 下半截 -->
            <div class="ModelProduct" v-if="item.ModelProduct">
                <!-- 左边 -->
                <div class="ModelProductLeft" @click="GoToItem(item.GroupId)">
                    <span class="tag titleColor">本期头筹奖品</span>
                    <img class="GoodImg" :src="item.ModelProduct.ProductImg" alt="">
                    <p class="GoodTitle">{{item.ModelProduct.ProductTitle}}</p>
                    <div><span>市场价</span> <span>{{item.ModelProduct.MarketPrice}}</span></div>
                    <p>查看本期头筹</p>
                </div>
                <!-- 右边 -->
                <div class="ModelProductLeft">
                    <p class="ModelProductWin"><img src="../assets/Img/gj.png" alt=""><span>头筹中奖号码 {{item.ModelProduct.WinnerNumber}}</span></p>
                    <div class="ModelProductMsg">
                        <h5>本期中奖者消费：<strong>{{item.ModelProduct.WinnerAmount}}</strong></h5>
                        <span>头筹人数：{{item.TotalNum}}人/次 </span>
                        <span>结束时间：{{item.EndTime}} </span>
                        <span>本期参考期数：{{item.ModelProduct.ReferencePeriod}} </span>
                        <span>本期参考开奖号码：{{item.ModelProduct.ReferenceLotteryNumber}} </span>
                        <div class="ModelProductMsgBom">
                            <button class="orderBtn grayBtn">第TCG{{item.CurrentPeriod}}期</button>
                            <router-link :to="item.Link" class="linkBom titleColor">去权威网站查看</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip">已经到底啦~♪(^∇^*)~</span>

        <!-- 加载中提示，不指定，将显示默认加载中图标 -->
        <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />

    </yd-infinitescroll>
</template>

<script type="text/babel">
export default {
    data() {
        return {
            page: 1,
            pageSize: 3,
            Grouporder: []
        };
    },
    created() {
        this.$axios({
            method: "POST",
            data: {
                pageindex: this.page,
                pagesize: this.pageSize
            },
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
    },
    methods: {
        GoToItem(id) {
            this.$router.push({
                name: "ItemDescription",
                params: { ItemGood_id: id }
            });
        },
        loadList() {
            this.$axios({
                method: "POST",
                data: {
                    pageindex: this.page,
                    pagesize: this.pageSize
                },
                url: this.$server.serverUrl + "/index/getwinnergrouporder"
            }).then(response => {
                const _list = response.data.rows;
                this.Grouporder = [...this.Grouporder, ..._list];
                if (_list.length < this.pageSize || this.page == 3) {
                    console.log("所有数据加载完毕");
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit(
                        "ydui.infinitescroll.loadedDone"
                    );
                    return;
                }
                console.log("单次请求数据完毕");

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