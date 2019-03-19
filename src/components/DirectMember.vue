<template>
    <div class="DirectMember">
        <yd-navbar title="我的团队">
            <router-link to="/MyInfo" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <ul class="myTeam">
            <li>
                <p class="teamText">总人数</p>
                <p class="TeamNumber">{{this.MyTeam.TotalsPeople}}</p>
            </li>
            <li>
                <p class="teamText">直属人数</p>
                <p class="TeamNumber">{{this.MyTeam.TotalsDirectly}}</p>
            </li>
            <li>
                <p class="teamText">近7日新增</p>
                <p class="TeamNumber">{{this.MyTeam.TotalsPeople7Day}}</p>
            </li>
            <li>
                <p class="teamText">近7日直属新增</p>
                <p class="TeamNumber">{{this.MyTeam.TotalsDirectly7Day}}</p>
            </li>
        </ul>
        <div class="teamInfo">
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <table theme="1" slot="list">
                    <thead>
                        <tr>
                            <th>用户</th>
                            <th>他的直属</th>
                            <th>核心团队</th>
                            <th>积分</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in TeamList" :key="index">
                            <td class="userInfo">
                                <img class="userIcon" :src="item.UserIcon" alt="">
                                <div class="user">
                                    <p class="userName">{{item.NickName}}</p>
                                    <p>{{item.CreateTime}}</p>
                                </div>
                            </td>
                            <td class="infoNumber">{{item.TotalsDirectly}}</td>
                            <td class="infoNumber">{{item.TotalsPeople}}</td>
                            <td class="infoNumber">{{item.Integral}}</td>
                        </tr>
                    </tbody>
                </table>
                <span slot="doneTip">已经到底啦~♪(^∇^*)~</span>
            </yd-infinitescroll>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            PageIndex: 1,
            PageSize: 20,
            MyTeam: '',
            TeamList: []
        }
    },
    created() {
        this.$axios({
            method: "POST",
            data: {
                PageIndex: this.PageIndex,
                PageSize: this.PageSize
            },
            url: this.$server.serverUrl + "/Agent/GetMyTeam",
            responseType: "json"
        }).then(response => {
            console.log(response.data)
            if(response.data.success == 200) {
                this.MyTeam = response.data.data
                this.TeamList = response.data.list
            }
        })
    },
    methods: {
        loadList() {
            this.PageIndex++
           this.$axios({
                method: "POST",
                data: {
                    PageIndex: this.PageIndex,
                    PageSize: this.PageSize
                },
                url: this.$server.serverUrl + "/Agent/GetMyTeam",
                responseType: "json"
            }).then(response => {
                const _list = response.data.list;
                this.TeamList = [...this.TeamList, ..._list];
                if (_list.length < this.PageSize) {
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
}
</script>

<style lang="scss">
    .DirectMember{
        background: #fff;
        .yd-navbar:after {
            border-bottom: none;
        }
        .myTeam {
            display: flex;
            margin: 0.2rem 0.2rem 0.4rem;;
            justify-content: space-around;
            padding: 0.4rem;
            border-radius: 0.2rem;
            color: #fff;
            background: linear-gradient(to right, #F02B22, #FC2D59);
            li {
                display: flex;
                flex-direction: column;
                align-items: center;
                .teamText {
                    margin-bottom: 0.2rem;
                    font-size: 0.24rem;
                }
                .TeamNumber {
                    font-size: 0.4rem;
                    font-weight: bold;
                }
            }
        }
        .teamInfo {
            margin: 0 0.2rem;
            table {
                width: 100%;
                border-collapse: collapse;
                border-spacing: 0;
                thead {
                    th {
                        border-bottom: 2px solid #f3f3f3;
                        padding-bottom: 0.2rem;
                        font-size: 0.3rem;
                        color: #888;
                        &:first-child {
                            width: 34%;
                        }
                    }
                    
                }
                tbody {
                    tr {
                        td {
                            border-bottom: 1px solid #f3f3f3;
                            // padding-bottom: 0.2rem;
                            height: 1.4rem;
                            text-align: center;
                        }
                        .userInfo {
                            .userIcon {
                                float: left;
                                width: 0.64rem;
                                height: 0.64rem;
                                margin-right: 0.1rem;
                                margin-top: 1px;
                            }
                            .user {
                                float: left;
                                p {
                                    text-align: left;
                                }
                            }
                            .userName {
                                font-size: 0.3rem;
                                font-weight: bold;
                                width: 1.6rem;
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space: nowrap;
                            }
                        }
                        .infoNumber {
                            font-size: 0.28rem;
                        }
                    }

                }
            }
        }
    }
</style>
