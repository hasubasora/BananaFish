<template>
    <div class="RedDataBox">
        <yd-navbar slot="navbar" title="分红指数" height='.8rem'>
            <router-link to="" slot="left" @click.native="GoHistory('Home')">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <router-link to="" slot="right" @click.native="GoHistory('Home')">
                分红规则
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
        <yd-cell-group>
            <yd-cell-item v-for="(item,index) in chartData.LstProfit" :key="index">
                <span slot="left">{{item.ProfitsDate}}</span>
                <span slot="left" style="margin-left:1rem">{{item.Integral}}</span>
                <span slot="right">{{item.Profit}}</span>
            </yd-cell-item>
        </yd-cell-group>

        <!-- <div class="chartData">
            <div class="bgred"></div>
            <ve-line :data="chartData" height='5rem'></ve-line>
        </div> -->
        <!-- <div class="RedDataBtn" v-if="this.$route.query.IsAPP=='undefined'">
            <span class="iconfont icon-gouwuche-copy" @click="GoHistory('cart')"></span>
            <button class="redbtntx" @click="GoHistory('WithdrawDeposit')">去提现</button>
            <button class="redbtn" @click="GoHistory('Home')">购物得积分</button>
        </div> -->

    </div>
</template>
<script>
export default {
    data() {
        this.chartSettings = {
            yAxisType: ["percent"],
            stack: { 用户: ["访问用户", "下单用户"] },
            area: true
        };
        return {
            objectData: [],

            chartData: {
                columns: ["IndexNumberDate", "Range"],
                rows: [
                    // { IndexNumberDate: "2018-05-22", Range: 1 },
                    // { IndexNumberDate: "2018-05-23", Range: 22 },
                    // { IndexNumberDate: "2018-05-24", Range: 333 },
                    // { IndexNumberDate: "2018-05-25", Range: 444 },
                    // { IndexNumberDate: "2018-05-26", Range: 555 },
                    // { IndexNumberDate: "2018-05-27", Range: 666 },
                    // { IndexNumberDate: "2018-05-28", Range: 77 },
                    // { IndexNumberDate: "2018-05-29", Range: 888 },
                    // { IndexNumberDate: "2018-05-30", Range: 3 }
                ]
            }
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
        GoHistory(sid) {
            this.$router.push({ name: sid });
            // this.$router.go(-1);
        },
        GetRedData() {
            this.$axios({
                method: "POST",
                data: {
                    // pageindex: 1,
                    // pagesize: 7
                },
                url: this.$server.serverUrl + "/account/getuserindexnumber",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.chartData = response.data.object;
                    // this.objectData = response.data.rankings;
                    console.log(this.chartData);
                }
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
