<template>
    <div class="MyEarnings">
        <yd-navbar title="团队收益" fixed>
            <router-link to="/MyInfo" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-tab class="performancee" :item-click="itemClick">
            <yd-tab-panel label="上周总收益">
                <div class="performanceeTop">
                    <p class="MyEarningsTotal">{{Directly.TotalActualBillingAmount}}</p>
                    <p class="EarningsText">累计收益</p>
                </div>
                <div class="performanceeBottom">
                    <div class="LastWeek">
                        <p class="LastWeekNumber">{{Directly.TotalsCommission}}</p>
                        <p class="LastWeekText">上周业绩</p>
                    </div>
                    <div class="LastWeek">
                        <p class="LastWeekNumber">{{Directly.ActualBillingAmount}}</p>
                        <p class="LastWeekText">上周收益</p>
                    </div>
                    <div class="LastWeek">
                        <p class="LastWeekNumber margintTop">{{Directly.LevelNameComm}}</p>
                        <p class="LastWeekText">上周级别</p>
                    </div>
                    <div class="LastWeek">
                        <p class="LastWeekNumber">{{Directly.Proportion}}%</p>
                        <p class="LastWeekText">佣金比例</p>
                    </div>
                    <div class="LastWeek">
                        <p class="LastWeekNumber">{{Directly.ActualBillingIntegral}}</p>
                        <p class="LastWeekText">积分</p>
                    </div>              
                </div>
                <div class="agency">
                    <yd-flexbox slot="center" class="flexbox">
                        <yd-flexbox-item 
                            v-for="(tabItem, index) in tabText" :key="index" 
                            class="flexboxNav" 
                            :class="{'active':actived == index }"
                            @click.native="toggle(index)"
                        >
                            {{tabItem.name}}
                        </yd-flexbox-item>
                    </yd-flexbox>
                    <div class="DirectDrive" v-if="actived == 0">
                        <div class="DirectDriveTop">
                            <p class="MyEarningsTotal">{{Directly.DirectlyUnderCommission}}</p>
                            <p class="EarningsText">业绩</p>
                        </div>
                        <ul class="DirectDriveBottom">
                            <li>
                                <p class="text">贡献佣金</p>
                                <p>{{Directly.DirectlyActualBillingAmount}}</p>
                            </li>
                            <li>
                                <p class="text">奖励积分</p>
                                <p>{{Directly.ActualBillingIntegral}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="DirectDrive" v-if="actived == 1">
                        <yd-infinitescroll :callback="loadList1" ref="infinitescrollDemo">
                            <ul class="AgentBenefit" theme="1" slot="list">
                                <li class="AgentBenefitLi" v-for="(LastWeekAgenItem, index) in LastWeekAgentList" :key="index">
                                    <div class="AgentInfo">
                                        <div class="row">
                                            <img :src="LastWeekAgenItem.UserIcon" alt="">
                                            <span>{{LastWeekAgenItem.NickName}}</span>
                                        </div>
                                        <span class="level">{{LastWeekAgenItem.LevelNameComm}}</span>
                                    </div>
                                    <ul class="AgentPerformance">
                                        <li>
                                            <p class="PerformanceText">业绩</p>
                                            <p class="PerformanceNum">{{LastWeekAgenItem.TotalsCommission}}</p>
                                        </li>
                                        <li>
                                            <p class="PerformanceText">佣金比例</p>
                                            <p class="PerformanceNum">{{LastWeekAgenItem.Proportion}}%</p>
                                        </li>
                                        <li>
                                            <p class="PerformanceText">贡献佣金</p>
                                            <p class="PerformanceNum">{{LastWeekAgenItem.ActualBillingAmount}}</p>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

                            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
                            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
                        </yd-infinitescroll>
                    </div>
                </div>
            </yd-tab-panel>
            <yd-tab-panel label="本周业绩">
                <div class="performanceeBottom performanceePadding">
                    <div class="LastWeek">
                        <p class="LastWeekNumber">{{ThisWeek.TotalsCommission}}</p>
                        <p class="LastWeekText">本周业绩</p>
                    </div>
                    <div class="LastWeek">
                        <p class="LastWeekNumber  margintTop">{{ThisWeek.LevelNameComm}}</p>
                        <p class="LastWeekText">等级</p>
                    </div>
                    <div class="LastWeek">
                        <p class="LastWeekNumber">{{ThisWeek.Proportion}}%</p>
                        <p class="LastWeekText">佣金比例</p>
                    </div>             
                </div>
                <div class="agency">
                    <yd-flexbox slot="center" class="flexbox">
                        <yd-flexbox-item 
                            v-for="(tabItem, index) in tabText" :key="index" 
                            class="flexboxNav" 
                            :class="{'active':actived == index }"
                            @click.native="toggle(index)"
                        >
                            {{tabItem.name}}
                        </yd-flexbox-item>
                    </yd-flexbox>
                    <div class="DirectDrive" v-if="actived == 0">
                        <ul class="DirectDriveBottom">
                            <li>
                                <p class="text">当前业绩</p>
                                <p>{{ThisWeekDirectly.TotalsCommission}}</p>
                            </li>
                            <li>
                                <p class="text">待入账业绩</p>
                                <p>{{ThisWeekDirectly.ToCreditedCommission}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="DirectDrive" v-if="actived == 1">
                        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                            <ul class="AgentBenefit" theme="1" slot="list">
                                <li class="AgentBenefitLi" v-for="(AgentPerformanceItem, index) in AgentPerformanceList" :key="index">
                                    <div class="AgentInfo">
                                        <div class="row">
                                            <img :src="AgentPerformanceItem.UserIcon" alt="">
                                            <span>{{AgentPerformanceItem.NickName}}</span>
                                        </div>
                                    </div>
                                    <ul class="AgentPerformance">
                                        <li>
                                            <p class="PerformanceText">当前业绩</p>
                                            <p class="PerformanceNum">{{AgentPerformanceItem.TotalsCommission}}</p>
                                        </li>
                                        <li>
                                            <p class="PerformanceText">待入账业绩</p>
                                            <p class="PerformanceNum">{{AgentPerformanceItem.ToCreditedCommission}}</p>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

                            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
                            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
                        </yd-infinitescroll>
                    </div>
                </div>
            </yd-tab-panel>
        </yd-tab>
        
        
    </div>   
</template>
<script>
export default {
    data() {
        return {
            Directly: [],
            tabText: [
                {name: '直推'},
                {name: '代理收益'}
            ],
            actived: 0,
            ThisWeek: [],
            AgentPerformanceList: [],
            PageIndex: 1,
            PageSize: 5,
            LastWeekAgentList: [],
            ThisWeekDirectly: {}
        };
    },
    created() {
        this.$axios({//获取上周收益汇总
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/Agent/GetLastWeekTotalIncome",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                this.Directly = response.data.data
            }
        });

        this.$axios({//获取上周收益汇总(下级代理)
            method: "POST",
            data: {
                PageIndex: this.PageIndex,
                PageSize: this.PageSize
            },
            url: this.$server.serverUrl + "/Agent/GetLastWeekAgentIncome",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                this.LastWeekAgentList = response.data.list
            }
        });

        this.$axios({//获取代理总业绩（本周）
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/Agent/GetThisWeekTotalPerformance",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                this.ThisWeek = response.data.data
            }
        });
        
        this.$axios({//获取直属业绩（本周）
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/Agent/GetThisWeekDirectlyTotalPerformance",
            responseType: "json"
        }).then(response => {
            console.log(response.data)
            if (response.data.success == 200) {
                this.ThisWeekDirectly = response.data.data
            }
        });

        this.$axios({//获取代理业绩（本周）
            method: "POST",
            data: {
                PageIndex: this.PageIndex,
                PageSize: this.PageSize
            },
            url: this.$server.serverUrl + "/Agent/GetThisWeekAgentTotalPerformance",
            responseType: "json"
        }).then(response => {
            console.log(response.data)
            if (response.data.success == 200) {
                this.AgentPerformanceList = response.data.list
            }
        });
    },
    methods: {
        toggle(index) {
            this.actived = index
        },
        itemClick() {
            this.PageIndex = 0
        },
        loadList() {
            this.PageIndex++;
            this.$axios({
                method: "POST",
                data: {
                    PageIndex: this.PageIndex,
                    PageSize: this.PageSize
                },
                url: this.$server.serverUrl + "/Agent/GetThisWeekAgentTotalPerformance",
                responseType: "json"
            }).then(response => {
                const _list = response.data.list;
                this.AgentPerformanceList = [...this.AgentPerformanceList, ..._list];
                console.log(this.AgentPerformanceList)
                if (_list.length < this.pageSize) {
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
                
            });
        },
        loadList1() {
            this.PageIndex++;
            this.$axios({
                method: "POST",
                data: {
                    PageIndex: this.PageIndex,
                    PageSize: this.PageSize
                },
                url: this.$server.serverUrl + "/Agent/GetLastWeekAgentIncome",
                responseType: "json"
            }).then(response => {
                const _list = response.data.list;
                this.LastWeekAgentList = [...this.LastWeekAgentList, ..._list];
                console.log(this.LastWeekAgentList)
                if (_list.length < this.pageSize) {
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
                
            });
        }
    }
};
</script>
<style lang="scss">
.MyEarnings {
    padding-top: 1rem;
    .yd-navbar:after {
        border-bottom: none;
    }
    .yd-tab-nav-item:after {
        border-right: none;
    }
    .performancee {
        margin-bottom: 0.2rem;
        .performanceeTop {
            border-bottom: 1px solid #eee;
            padding: 0.4rem 0;
            p {
                text-align: center;
            }
            .MyEarningsTotal {
                color: #F62C3F;
                font-size: 0.8rem;
            }
            .EarningsText {
                color: #999;
                font-size: 0.3rem;
            }
        }
        .performanceeBottom {
            display: flex;
            margin: 0.3rem;
            justify-content: space-around;
            .LastWeek {
                display: flex;
                flex-direction: column;
                align-items: center;
                .LastWeekNumber {
                    font-size: 0.36rem;
                    font-weight: bold;
                    padding-bottom: 0.1rem;
                }
                .LastWeekText {
                    color: #888;
                }
                .margintTop {
                    margin-top: -0.1rem;
                    margin-bottom: 0.05rem;
                }
            }
        }
        .performanceePadding {
            padding: 0.3rem 0;
        }
    }

    .agency {
        background: #fff;
        padding-top: 0.4rem;
        border-top: 0.2rem solid #f3f3f3;
        .flexbox {
            border: 2px solid #F62C3F;
            border-radius: 0.1rem;
            width: 50%;
            margin-left: 25%;
            // margin-bottom: 0.4rem;
            text-align: center;
            .flexboxNav {
                padding: 0.1rem 0.2rem;
                color: #F62C3F;
            }
            .active {
                padding: 0.1rem 0.2rem;
                background: #F62C3F;
                color: #fff;
            }
        }
        .DirectDrive {
            margin-top: 0.4rem;
            border-top: 1px solid #F3F3F3;
            .DirectDriveTop {
                padding: 0.4rem 0;
                p {
                    text-align: center;
                }
                .MyEarningsTotal {
                    color: #F62C3F;
                    font-size: 0.8rem;
                }
                .EarningsText {
                    color: #999;
                    font-size: 0.3rem;
                }
            }
            .DirectDriveBottom {
                display: flex;
                margin: 0 0.4rem;
                border-top: 1px solid #F3F3F3;
                li {
                    flex: 1;
                    margin: 0.4rem 0;
                    border-right: 1px solid #F3F3F3;
                    &:last-child {
                        border-right: none;
                    }
                    p {
                        text-align: center;
                        color: #222;
                        font-size: 0.3rem;
                    }
                    .text {
                        margin-bottom: 0.2rem;
                        color: #888;
                    }
                }
            }
            .AgentBenefit {
                .AgentBenefitLi {
                    border-bottom: 0.1rem solid #f3f3f3;
                    .AgentInfo {
                        padding: 0.2rem 0.4rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .row {
                            display: flex;
                            align-items: center;
                            img {
                                width: 0.84rem;
                                height: 0.84rem;
                                border-radius: 50%;
                                margin-right: 0.2rem;
                            }
                            span {
                                font-size: 0.3rem;
                            }
                        }
                        .level {
                            color: #F62C3F;
                            font-size: 0.3rem;
                        }
                    }
                    .AgentPerformance {
                        display: flex;
                        margin: 0 0.4rem;
                        border-top: 1px solid #F3F3F3;
                        li {
                            flex: 1;
                            padding: 0 0.4rem;
                            margin: 0.4rem 0;
                            border-right: 1px solid #f3f3f3;
                            &:last-child {
                                border-right: none;
                            }
                            p {
                                text-align: center;
                                font-size: 0.28rem;
                            }
                            .PerformanceText {
                                color: #888;
                                margin-bottom: 0.2rem;
                            }
                            .PerformanceNum {
                                color: #222;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
