<template>
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
        <div v-if="Grouporder==''" slot="list" style="text-align:center;padding:1rem;height:5rem;font-size:.3rem;">暂无拔得头筹商品哦~去逛逛吧~</div>
        <div v-for="item in Grouporder" slot="list" :key="item.id" class="Grouporder">
            <!-- 上半截 -->
            <!-- class="c-red" -->
            <div class="UserIcon"><img :src="item.UserIcon" alt=""><span>恭喜<i style="color:red ;font-weight:650">{{item.NickName}}</i>拔得头筹</span></div>
            <!-- 下半截 -->
            <div class="ModelProduct" v-if="item.ModelProduct">
                <!-- 左边 -->
                <div class="ModelProductLeft" @click="GoToItem(item.GroupId)">
                    <span class="tag titleColor">本期头筹奖品</span>
                    <img class="GoodImg" :src="item.ModelProduct.ProductImg" alt="">
                    <p class="GoodTitle">{{item.ModelProduct.ProductTitle}}</p>
                    <div><span>市场价</span> <span style="color:red;font-weight:650">￥{{item.ModelProduct.MarketPrice}}</span></div>
                    <div class="bottmContent">
                        <span class="check">查看本期头筹</span>
                        <img class="goiconImg" src="../assets/img/goicon.png" alt="">
                    </div>

                </div>
                <!-- 右边 -->
                <div class="ModelProductLeft">
                    <p class="ModelProductWin"><img src="../assets/Img/gj.png" alt=""><span>头筹中奖号码 <i style="color:red;font-size:16px;font-weight:650">{{item.ModelProduct.WinnerNumber}}</i></span></p>
                    <div class="ModelProductMsg" style="color:#999">
                        <h2>本期中奖者消费：<strong style="color:red">{{item.ModelProduct.WinnerAmount}}</strong></h2>
                        <span>头筹人数：{{item.TotalNum}}人/次 </span>
                        <span>结束时间：{{item.EndTime}} </span>
                        <span>本期参考期数：{{item.ModelProduct.ReferencePeriod}} </span>
                        <span>本期参考开奖号码：{{item.ModelProduct.ReferenceLotteryNumber}} </span>
                        <div class="ModelProductMsgBom">
                            <button class="orderBtn grayBtn">第TCG{{item.CurrentPeriod}}期</button>
                            <a :href="item.Link" class="linkBom titleColor">去权威网站查看</a>
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
import { LOGIN_SUCCESS } from "../main.js";
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
            LOGIN_SUCCESS(response.data)
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
                if (_list.length < this.pageSize || this.page == 2) {
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

<style>
.ModelProductMsg{
    margin-top: 0.1rem;
}
.grayBtn {
    margin-right: 0.1rem;
}
.orderBtn {
    height: 0.5rem;
    width: 1.5rem;
}
.bottmContent{
    overflow: hidden;
    /* padding: 0 .2rem; */

}
.check{
    float: left;
    color: #999;
}
.goiconImg {
    margin-top: 0.05rem;
    float: right;;
    width: 0.3rem;
    height: 0.3rem;
}
h2{
    color:#000;
}
</style>
