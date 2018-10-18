<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="积分积分数据表" height='.8rem'>
            <router-link to="" slot="left" @click.native="GoHistory('Home')">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <div class="RedDataTitle">
            <p>
                <router-link :to="`${'/RedData?IsAPP='}${this.$route.query.IsAPP}`" class="write">平台积分数据</router-link>
                <router-link :to="`${'/MyRedData?IsAPP='}${this.$route.query.IsAPP}`">我的积分数据</router-link>
            </p>
        </div>
        <router-view></router-view>
        <div class="RedData">
            <div>累计收益（元)</div>
            <p>{{objectData.ProfitAmount}}</p>
            <div class="chartData">
                <div class="bgred"></div>
                <ve-line :data="chartData" height='5rem'></ve-line>
            </div>
        </div>
     
        <div class="RedDataBtn" v-if="this.$route.query.IsAPP=='undefined'">
            <span class="iconfont icon-gouwuche-copy" @click="GoHistory('cart')"></span>
            <button class="redbtntx" @click="GoHistory('WithdrawDeposit')">去提现</button>
            <button class="redbtn" @click="GoHistory('Home')">购物得积分</button>
        </div>

    </yd-layout>
</template>
<script>
export default {
    data() {
        this.chartSettings = {
            yAxisType: ["percent"]
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
    components: {
        RedData: RedData => require(["@/components/RedData"], RedData),
        MyRedData: MyRedData => require(["@/components/MyRedData"], MyRedData)
    },
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
                url: this.$server.serverUrl + "/account/getindexnumber",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.chartData.rows = response.data.rows;
                    this.objectData = response.data.object;
                    console.log(this.chartData.rows);
                }
            });
        }
    }
};
</script>
<style lang='scss'>
.RedDataTitle {
    background: #ff5f17;
    margin: 0 auto;
    p {
        width: 6rem;
        margin: 0 auto;
        > a {
            display: inline-block;
            text-align: center;
            padding: 0.2rem;
            width: 49%;
            color: #fff;
            // border: 1px solid;
            &.write {
                background: #fff;
                color: #ff5f17;
            }
        }
    }
}

.RedData {
    background: #ff5f17;
    -webkit-scroll-touch: scroll;
    font-size: 0.3rem;

    justify-content: space-between;
    color: #fff;
    padding: 0.1rem 0.3rem;
    .chartData {
        position: relative;
        .bgred {
            width: 100%;
            position: absolute;
            z-index: 8;
            height: .5rem;
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
</style>
