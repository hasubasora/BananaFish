<template>
    <div class="MyRedData">
        <yd-navbar slot="navbar" title="积分指数" height='.8rem'>
            <router-link to="" slot="left" @click.native="GoHistory('Home')">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <router-link to="" slot="right" @click.native="GO_TO_PAGE()">
                积分规则
            </router-link>
        </yd-navbar>
        <div class="RedDataTitle">
            <p class="TitleFlex">
                <router-link :to="`${'/MyRedData?IsAPP='}${this.$route.query.IsAPP}`">平台积分数据</router-link>
                <router-link :to="`${'/RedData?IsAPP='}${this.$route.query.IsAPP}`" class="MyWrite">我的积分数据</router-link>
            </p>
        </div>
        <yd-flexbox direction="vertical" class="RedData">
            <yd-flexbox-item style="text-align:center">
                <div style="color:#999;margin:.2rem 0">昨日万份积分收益(元)</div>
                <p style="color:#ff5f17;margin:.2rem 0;font-size:.5rem">{{objectData.rangeprofit}}</p>
            </yd-flexbox-item>
        </yd-flexbox>
        <div class="eCharts">
            <!-- <yd-tab v-model="tab2" :callback="fn" :prevent-default="false" :item-click="itemClick">
                <yd-tab-panel v-for="item in items" :label="item.label"> -->
 
            <yd-flexbox-item>
                <ve-line :data="chartData" height='5rem' :settings="chartSettings"></ve-line>
            </yd-flexbox-item>

            <!--     </yd-tab-panel>
           </yd-tab> -->
            <!-- <div class="span">每晚深夜更新数据</div> -->

        </div>

        <div class="phb">
            <img src="../assets/Img/phb.png" alt="">
        </div>

        <!-- <yd-grids-group :rows="3">
            <yd-grids-item>
                <span slot="text">时间</span>
            </yd-grids-item>
            <yd-grids-item>
                <span slot="text">我的积分</span>
            </yd-grids-item>
            <yd-grids-item>
                <span slot="text">历史收益</span>
            </yd-grids-item>
        </yd-grids-group> -->

        <yd-cell-group>
            <yd-cell-item v-for="(item,index) in objectData.rankings" :key="index" class="rankings">
                <span slot="left">
                    <img style="width:.5rem" v-if="item.Ranking==1" src="../assets/Img/a1.png">
                    <img style="width:.5rem" v-if="item.Ranking==2" src="../assets/Img/a2.png">
                    <img style="width:.5rem" v-if="item.Ranking==3" src="../assets/Img/a3.png">
                </span>
                <span slot="left" style="margin-left:1rem">
                    <img :src="item.UserIcon" alt="" class="redUserIcon">
                    <div class="redNickName">
                        <p> {{item.NickName}}</p>
                        <p> 获得积分{{item.Profit}}</p>
                    </div>
                </span>
                <span slot="right">收益+ <i class="c-red">{{item.Integral}}</i></span>
            </yd-cell-item>
        </yd-cell-group>

    </div>
</template>
<script>
import { TO_PAGE } from "../main.js";
export default {
    data() {
        this.chartSettings = {
            yAxisType: ["KMB"],
            // yAxisName: ["222", "333"],
            // stack: { 用户: ["访问用户", "下单用户"] },
            labelMap:{ 'Range': ['收益'] },
            legendName:{ 'Range': ['收益'] },
            area: true
        };
        return {
            tab2: 0,
            items: [
                { label: "周", content: "aaaaaaaaaaa" }
                // { label: "月", content: "bbbbbbbbbbb" },
                // { label: "年", content: "ccccccccccc" }
            ],
            objectData: [],
            chartData: {
                // columns: ["ProfitsDate", "Profit"],
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
    created() {
        this.GetRedData();
    },
    methods: {
        GO_TO_PAGE() {
            TO_PAGE("fhgz");
        },
        fn(label, key) {
            console.log(label, key);
        },
        itemClick(key) {
            this.$dialog.loading.open("数据加载中");
            setTimeout(() => {
                this.tab2 = key;
                this.$dialog.loading.close();
                this.items[key].content =
                    "新内容【key:" + key + "】新内容_" + new Date().getTime();
            }, 1000);
        },
        GoHistory(sid) {
            this.$router.push({ name: sid });
            // this.$router.go(-1);
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
                    this.objectData = response.data;
                    console.log(this.chartData);
                }
            });
        }
    }
};
</script>
<style lang='scss'>
.MyRedData {
    background: #fff;
    .rankings {
        padding: 0.2rem;
    }
    .redUserIcon {
        border-radius: 50px;
        width: 1rem;
        height: 1rem;
    }
    .redNickName {
        display: inline-block;
        vertical-align: top;
    }
    .RedDataTitle {
        margin: 0 auto;
        .TitleFlex {
            width: 7rem;
            margin: 0 auto;
            background: #ff5f17;
            border: 1px solid #ff5f17;
            border-radius: 5px;
            display: flex;
            a {
                display: inline-block;
                text-align: center;
                padding: 0.1rem;
                width: 100%;
                color: #fff;
                &.MyWrite {
                    background: #fff;
                    color: #ff5f17;
                    border-radius: 5px;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
            }
        }
    }
    .eCharts {
        display: flex;
        position: relative;
        .span {
            position: absolute;
            top: 0;
            right: 0;
            flex: 1;
            text-align: right;
            line-height: 1rem;
            font-size: 0.3rem;
            padding-right: 0.1rem;
            color: #999;
        }
        .yd-tab {
            flex: 1;
        }
        .yd-tab-box {
            width: 4rem;
        }
    }
    .phb {
        text-align: center;
        border-bottom: 1px dashed #ccc;
        padding: 0.1rem;
        margin: 0 0.3rem;
        img {
            width: 3rem;
        }
    }
}
//
</style>
