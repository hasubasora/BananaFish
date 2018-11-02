<template>
    <div class="MyAgent">
        <yd-navbar height='.8rem' color="#f2f2f2" bgcolor="#ff5f17" fixed>
            <router-link to="/" slot="left">
                <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
            </router-link>
            <yd-flexbox slot="center" style="border:1px solid #fff;">
                <yd-flexbox-item style="padding:.1rem .3rem;background:#fff;color:#555">我的代理</yd-flexbox-item>
                <yd-flexbox-item @click.native='GoDirectMember' style="padding:.1rem .3rem;color:#fff">直属会员</yd-flexbox-item>
            </yd-flexbox>
        </yd-navbar>
        <yd-flexbox class="MyAgentVertical">
            <yd-flexbox-item>
                <yd-flexbox direction="vertical">
                    <yd-flexbox-item><img src="../assets/Img/PIC1@3x.png" alt=""> 我的代理(人)</yd-flexbox-item>
                    <yd-flexbox-item class="totals">{{totals}}</yd-flexbox-item>
                </yd-flexbox>
            </yd-flexbox-item>
            <yd-flexbox-item>
                <yd-flexbox direction="vertical">
                    <yd-flexbox-item><img src="../assets/Img/PIC2@3x.png" alt=""> 本周新增(人)</yd-flexbox-item>
                    <yd-flexbox-item class="totals">{{weekTotal}}</yd-flexbox-item>
                </yd-flexbox>
            </yd-flexbox-item>
        </yd-flexbox>
        <yd-flexbox class="AgentLishHerd">
            <yd-flexbox-item>头像</yd-flexbox-item>
            <yd-flexbox-item>用户</yd-flexbox-item>
            <yd-flexbox-item>业绩</yd-flexbox-item>
        </yd-flexbox>
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <div class="AgentLish" slot="list">
                <yd-flexbox v-for="(item, index) in AgentLish" :key="index">
                    <yd-flexbox-item><img style="border-radius:50px;width:1rem;height:1rem" :src="item.UserIcon" alt=""></yd-flexbox-item>
                    <yd-flexbox-item>{{item.NickName}}</yd-flexbox-item>
                    <yd-flexbox-item class="c-red">￥{{item.Commission}}</yd-flexbox-item>
                </yd-flexbox>
            </div>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">已经到底啦~♪(^∇^*)~</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />

        </yd-infinitescroll>
    </div>
</template>
<style lang="scss">
.MyAgent {
    background: #fff;
    padding-top: 1rem;
    .MyAgentVertical {
        margin: 0.3rem 0;
        text-align: center;
        font-size: 0.26rem;
        border-bottom: 3px solid #f2f2f2;
        img {
            width: 0.4rem;
            vertical-align: middle;
        }
        .totals {
            color: #ff6143;
            font-size: 0.5rem;
            font-weight: 600;
            padding: 0.3rem 0;
        }
    }
    .AgentLishHerd {
        text-align: center;
    }
    .AgentLish {
        padding: 0.3rem 0;
        text-align: center;
        font-size: 0.24rem;
        > .yd-flexbox {
            padding: 0.3rem 0;
            border-top: 1px solid #f2f2f2;
        }
    }
}
</style>

<script>
export default {
    data() {
        return {
            AgentLish: [],
            totals: 0,
            weekTotal: 0,
            page: 1,
            pageSize: 6
        };
    },
    created() {
        this.GetMyAgent();
    },
    methods: {
        GoDirectMember() {
            this.$router.push({ name: "DirectMember" });
        },
        //加入团队
        addMyAgent() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/Agent/ApplicationBroker",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.$dialog.alert({
                        mes: "成功加入团队！"
                    });
                }
            });
        },
        //我的团队
        GetMyAgent() {
            this.$axios({
                method: "POST",
                data: {
                    // token: "052d71f3-6fd7-4323-beda-53cd0479fd53",
                    Type: 1,
                    pageindex: this.page,
                    pagesize: this.pageSize
                },
                url: this.$server.serverUrl + "/Agent/GetCommissionsLst",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.AgentLish = response.data.rows;
                    this.totals = response.data.totals;
                    this.weekTotal = response.data.weekTotal;
                    console.log(response.data);
                }
            });
        },
        loadList() {
            this.$axios({
                method: "POST",
                data: {
                    pageindex: this.page,
                    pagesize: this.pageSize,
                    Type: 1
                },
                url: this.$server.serverUrl + "/Agent/GetCommissionsLst"
            }).then(response => {
                const _list = response.data.rows;
                this.AgentLish = [...this.AgentLish, ..._list];
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

