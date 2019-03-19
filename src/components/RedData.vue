<template>
    <div class="RedDataBox">
        <yd-navbar slot="navbar" title="积分指数" height='.8rem'>
            <router-link to="" slot="left" @click.native="GoHistory">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <router-link to="" slot="right" @click.native="GO_TO_PAGE">
                积分规则
            </router-link>
        </yd-navbar>

        <div class="RedDataTitle">
            <p>
                <router-link :to="`${'/MyRedData?IsAPP='}${this.$route.query.IsAPP}`" class="write">平台积分数据</router-link>
                <router-link :to="`${'/RedData?IsAPP='}${this.$route.query.IsAPP}`">我的积分数据</router-link>
            </p>
        </div>
        <!-- <router-view></router-view> -->
        <div class="Redflex">
            <div class="RedData">
                <div class="RedText">累计收益（元)</div>
                <p>{{chartData.MyProfitAmount}}</p>
            </div>
            <div class="RedData">
                <div class="RedText">我的积分</div>
                <p style="color:#555">{{chartData.MyIntegral}}</p>
            </div>
        </div>

        <yd-grids-group :rows="3" class="grids">
            <yd-grids-item>
                <span slot="text">时间</span>
            </yd-grids-item>
            <yd-grids-item>
                <span slot="text">我的积分</span>
            </yd-grids-item>
            <yd-grids-item>
                <span slot="text">历史收益</span>
            </yd-grids-item>
        </yd-grids-group>
            <!-- <yd-cell-item v-for="(item,index) in chartData.LstProfit" :key="index">
                <span slot="left">{{item.ProfitsDate}}</span>
                <span slot="left" style="margin-left:1rem">{{item.Integral}}</span>
                <span slot="right">{{item.Profit}}</span>
            </yd-cell-item> -->

        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <div class="AgentLish" slot="list">
                <yd-flexbox v-for="(item, index) in chartData.LstProfit" :key="index">
                    <yd-flexbox-item class="flexItem">
                        <span>{{item.ProfitsDate}}</span>
                    </yd-flexbox-item>
                    <yd-flexbox-item class="flexItem">{{item.Integral}}</yd-flexbox-item>
                    <yd-flexbox-item class="flexItem">￥{{item.Profit}}</yd-flexbox-item>
                </yd-flexbox>
            </div>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">已经到底啦~♪(^∇^*)~</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
        </yd-infinitescroll>
        <!-- <yd-grids-group :rows="3" class="grids-item" v-for="(item, index) in chartData.LstProfit" :key="index">
            <yd-grids-item>
                <span slot="text">{{item.ProfitsDate}}</span>
            </yd-grids-item>
            <yd-grids-item>
                <span slot="text">{{item.Integral}}</span>
            </yd-grids-item>
            <yd-grids-item>
                <span slot="text">{{item.Profit}}</span>
            </yd-grids-item>
        </yd-grids-group> -->

    </div>
</template>
<script>
import { LOGIN_SUCCESS } from "../main.js";
export default {
    data() {
        this.chartSettings = {
            yAxisType: ["percent"],
            stack: { 用户: ["访问用户", "下单用户"] },
            area: true
        };
        return {
            objectData: [],
            chart: {
                columns: ["IndexNumberDate", "Range"],
                rows: [
                    { IndexNumberDate: "2018-05-22", Range: 1, earnings: 0.05 },
                    { IndexNumberDate: "2018-05-23", Range: 22, earnings: 0.05 },
                    { IndexNumberDate: "2018-05-24", Range: 333, earnings: 0.05 },
                    { IndexNumberDate: "2018-05-25", Range: 444, earnings: 0.05 },
                    { IndexNumberDate: "2018-05-26", Range: 555, earnings: 0.05 },
                    { IndexNumberDate: "2018-05-27", Range: 666, earnings: 0.05 },
                    { IndexNumberDate: "2018-05-28", Range: 77, earnings: 0.05 },
                    { IndexNumberDate: "2018-05-29", Range: 888, earnings: 0.05 },
                    { IndexNumberDate: "2018-05-30", Range: 3, earnings: 0.05 }
                ]
            },
            chartData: {},
            pageindex: 1,
            pagesize: 20
        };
    },
    // components: {
    //     RedData: RedData => require(["@/components/RedData"], RedData),
    //     MyRedData: MyRedData => require(["@/components/MyRedData"], MyRedData)
    // },
    created() {
        this.GetRedData();
    },
    methods: {
        GO_TO_PAGE() {
            this.$router.push({path: "/integralRuler"})
        },
        GoHistory() {
            this.$router.push({path: "/MyInfo"});
        },
        GetRedData() {
            this.$axios({
                method: "POST",
                data: {
                    pageindex: this.pageindex,
                    pagesize: this.pagesize
                },
                url: this.$server.serverUrl + "/account/getuserindexnumber",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data)
                if (response.data.success == 200) {
                    this.chartData = response.data.object;
                    // this.objectData = response.data.rankings;
                    console.log(response.data);
                }
            });
        },
        loadList() {
            this.pageindex++;
            this.$axios({
                method: "POST",
                data: {
                    pageindex: this.pageindex,
                    pagesize: this.pagesize,
                    
                },
                url: this.$server.serverUrl + "/account/getuserindexnumber",
                responseType: "json"
            }).then(response => {
                const _list = response.data.object.LstProfit;
                this.chartData.LstProfit = [...this.chartData.LstProfit, ..._list];
                if (_list.length < this.pagesize) {
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
            });
        }
    }
};
</script>
<style lang='scss'>
.RedDataBox {
    background: #fff;
    .RedDataTitle {
        margin: 0 auto;
        p {
            width: 7rem;
            margin: 0 auto;
            background: #ff5f17;
            border: 1px solid #ff5f17;
            border-radius: 5px;
            > a {
                display: inline-block;
                text-align: center;
                padding: 0.1rem;
                width: 49%;
                color: #fff;
                // border: 1px solid;
                &.write {
                    border-radius: 5px;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    background: #fff;
                    color: #ff5f17;
                }
            }
        }
    }
    .grids {
        padding: 0.2rem;
        .yd-grids-3 .yd-grids-item:not(:nth-child(3n)):before {
            border: 0;
        }
    }
    .grids-item {
        padding: 0 0.2rem;
        a {
            padding: 0.3rem 0;
        }
        .yd-grids-3 .yd-grids-item:not(:nth-child(3n)):before {
            border: none;
        }
    }
    .Redflex {
        display: flex;
        padding-top: 0.2rem;
    }
    .RedData {
        flex: 1;
        text-align: center;
        // background: #ff5f17;
        -webkit-scroll-touch: scroll;
        font-size: 0.3rem;
        justify-content: space-between;
        color: #ee4121;
        padding: 0.1rem 0.3rem;
        .RedText {
            color: #999999;
            font-size: 0.2rem;
        }
        p {
            font-size: 0.5rem;
        }
        .chartData {
            position: relative;
            .bgred {
                width: 100%;
                position: absolute;
                z-index: 8;
                height: 0.5rem;
                // border: 1px solid;
                background: #ff5f17;
                // background: #fff
            }
        }
        canvas {
            width: 1rem;
        }
        .font20 {
            @extend .SetType;
            font-size: 0.8rem;
        }
        .font04 {
            @extend .SetType;
            padding: 0.2rem;
            font-size: 0.4rem;
        }
        .font02 {
            @extend .SetType;
            font-size: 0.2rem;
        }
        .font03 {
            padding: 0.2rem;
            @extend .SetType;
            font-size: 0.3rem;
        }
    }
    .AgentLish {
        font-size: 0.28rem;
        .flexItem {
            text-align: center;
            margin-bottom: 0.3rem;
        }
    }
    .SetType {
        color: #fff;
        height: 1rem;
    }
    .iconfont_is {
        color: #ff5f17;
        font-size: 0.5rem;
        margin-right: 0.1rem;
    }
    .RedDataBtn {
        width: 100%;
        height: 1rem;
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        border-top: 1px solid #ccc;
        z-index: 99;
        display: flex;
        > .icon-gouwuche-copy {
            font-size: 0.8rem;
            text-align: center;
            width: 2rem;
        }
        .redbtntx {
            flex: 1;
            border: none;
            outline: none;
            font-size: 0.3rem;
        }
        .redbtn {
            @extend .redbtntx;
            background: #ff5f17;
            color: #fff;
        }
    }
}
</style>
