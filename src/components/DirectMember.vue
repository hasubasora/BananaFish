<template>
    <div class="DirectMember">
        <yd-navbar height='.8rem' color="#f2f2f2" bgcolor="#ff5f17" fixed>
            <router-link to="/" slot="left">
                <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
            </router-link>
            <yd-flexbox slot="center" style="border:1px solid #fff;">
                <yd-flexbox-item @click.native='GoMyAgent' style="padding:.1rem .3rem;color:#fff">我的代理</yd-flexbox-item>
                <yd-flexbox-item style="padding:.1rem .3rem;background:#fff;color:#555">直属会员</yd-flexbox-item>
            </yd-flexbox>
        </yd-navbar>
        <yd-flexbox class="MyAgentVertical">
            <yd-flexbox-item>
                <yd-flexbox direction="vertical">
                    <yd-flexbox-item><img src="../assets/Img/PIC1@3x.png" alt=""> 直属会员(人)</yd-flexbox-item>
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
        <div class="AgentLish">
            <yd-flexbox v-for="(item, index) in AgentLish" :key="index">
                <yd-flexbox-item><img :src="item.UserIcon" alt=""></yd-flexbox-item>
                <yd-flexbox-item>{{item.NickName}}</yd-flexbox-item>
                <yd-flexbox-item class="c-red">￥{{item.Commission}}</yd-flexbox-item>
            </yd-flexbox>
        </div>

    </div>
</template>
<style lang="scss">
.DirectMember {
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
            weekTotal: 0
        };
    },
    created() {
        this.GetMyAgent();
    },
    methods: {
        GoMyAgent() {
            this.$router.push({ name: "MyAgent" });
        },
        //我的团队
        GetMyAgent() {
            this.$axios({
                method: "POST",
                data: {
                    // token: "052d71f3-6fd7-4323-beda-53cd0479fd53",
                    Type: 2
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
        }
    }
};
</script>