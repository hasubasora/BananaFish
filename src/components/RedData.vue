<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="分红积分数据表" height='.8rem'>
      <router-link to="" slot="left" @click.native="GoHistory">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>

    <div class="RedDataTitle">
      <p>
        <router-link to="/RedData" class="write">平台分红数据</router-link>
        <router-link to="/MyRedData">我的分红数据</router-link>
      </p>
    </div>
    <router-view></router-view>

    <yd-flexbox direction="vertical" class="RedData">
      <yd-flexbox-item>
        <yd-flexbox>
          <yd-flexbox-item class="font03">累计收益（元）</yd-flexbox-item>
          <!-- <yd-flexbox-item class="font02">万份积分收益（元）</yd-flexbox-item> -->
        </yd-flexbox>
      </yd-flexbox-item>
      <yd-flexbox-item>
        <yd-flexbox>
          <yd-flexbox-item class="font04">{{objectData.ProfitAmount}}</yd-flexbox-item>
          <!-- <yd-flexbox-item class="font04">101.10</yd-flexbox-item> -->
        </yd-flexbox>
      </yd-flexbox-item>
      <yd-flexbox-item>
        <ve-line :data="chartData" height='5rem'></ve-line>
      </yd-flexbox-item>
    </yd-flexbox>

    <yd-cell-group>
      <yd-cell-item arrow>
        <span slot="left">
          <i class="iconfont icon-lirun iconfont_is"></i>
        </span>
        <span slot="left">平台总积分：{{objectData.Integral}}</span>
      </yd-cell-item>
    </yd-cell-group>

    <!-- <yd-cell-group >
            <yd-cell-item v-for="n in 10">
                <span slot="left">2017-07-27</span>
                <span slot="left" style="margin-left:1rem">5000/100000*500</span>
                <span slot="right">25</span>
            </yd-cell-item>
        </yd-cell-group> -->
    <div class="RedDataBtn">
      <span class="iconfont icon-gouwuche-copy" @click="GoHistory"></span>
      <button class="redbtntx" disabled="disabled" @click="GoHistory">去提现</button>
      <button class="redbtn" disabled="disabled" @click="GoHistory">购物得积分</button>
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
                    { IndexNumberDate: "2018-05-22", Range: 1 },
                    { IndexNumberDate: "2018-05-23", Range: 22 },
                    { IndexNumberDate: "2018-05-24", Range: 333 },
                    { IndexNumberDate: "2018-05-25", Range: 444 },
                    { IndexNumberDate: "2018-05-26", Range: 555 },
                    { IndexNumberDate: "2018-05-27", Range: 666 },
                    { IndexNumberDate: "2018-05-28", Range: 77 },
                    { IndexNumberDate: "2018-05-29", Range: 888 },
                    { IndexNumberDate: "2018-05-30", Range: 3 }
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
            // console.log(sid);
            this.$router.go(-1);
        },
        GetRedData() {
            this.$axios({
                method: "POST",
                data: {
                    pageindex: 1,
                    pagesize: 7
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

    .yd-flexbox {
        justify-content: space-between;
        color: #fff;
        padding: 0.1rem 0.3rem;
    }
    .font20 {
        font-size: 0.8rem;
    }
    .font04 {
        font-size: 0.4rem;
    }
    .font02 {
        font-size: 0.2rem;
    }
    .font03 {
        font-size: 0.3rem;
    }
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
