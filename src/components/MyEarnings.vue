<template>
    <div class="MyEarnings">
        <yd-navbar title="我的收益" fixed>
            <router-link to="/MyInfo" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>

        </yd-navbar>
        <yd-flexbox-item class="MyEarningsList">
            <p class="MyEarningsList_text"><img src="" alt=""> 总收益
            </p>
            <strong class="MyEarningsList_Pice">{{SY.total}}</strong>
            <div class="MyEarningsList_Btn">
                <button type="button">邀好友，赚收益</button>
            </div>
        </yd-flexbox-item>

        <yd-flexbox direction="vertical" class="MyEarningsGroup">
            <yd-flexbox-item class="TheAgentTitleDes">
                <p>本周总收益：{{SY.thisWeektotal}}</p>
            </yd-flexbox-item>
            <div class="TheAgent">
                <span class="TheAgentTitle ">代理佣金</span>
                <span class="TheAgentTitle bold">{{SY.thisWeekDL}}</span>
                <span class="TheAgentTitle borderccc">直推佣金</span>
                <span class="TheAgentTitle bold">{{SY.thisWeekZT}}</span>
            </div>
        </yd-flexbox>

        <yd-flexbox direction="vertical" class="MyEarningsGroup">
            <yd-flexbox-item class="TheAgentTitleDes">
                <p>上周总收益：{{SY.prevTotal}}</p>
            </yd-flexbox-item>
            <div class="TheAgent">
                <span class="TheAgentTitle ">代理佣金</span>
                <span class="TheAgentTitle bold">{{SY.prevWeekDL}}</span>
                <span class="TheAgentTitle borderccc">直推佣金</span>
                <span class="TheAgentTitle bold">{{SY.prevWeekZT}}</span>
            </div>
        </yd-flexbox>
    </div>
</template>
<script>
export default {
    data() {
        return {
            SY: []
        };
    },
    created() {
        this.GetMyEarnings();
    },
    methods: {
        GetMyEarnings() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/Agent/GetShouYi",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.SY = response.data.data;
                    console.log(response.data);
                }
            });
        }
    }
};
</script>
<style lang="scss">
.MyEarnings {
    padding: 1rem 0;
    .MyEarningsList {
        background: #fff;
        padding-bottom: 0.3rem;
        .MyEarningsList_text {
            text-align: center;
            padding: 0.2rem;
        }
        .MyEarningsList_Pice {
            text-align: center;
            font-size: 0.5rem;
            color: #ff5f17;
            display: block;
        }
        .MyEarningsList_Btn {
            text-align: center;
            > button {
                background: #ff5f17;
                border: none;
                outline: none;
                padding: 0.1rem 0.2rem;
                color: #fff;
                border-radius: 5px;
            }
        }
    }
    .MyEarningsGroup {
        margin: 0.2rem;
        background: #fff;
        border-radius: 10px;
        .TheAgentTitleDes {
            height: 1rem;
            line-height: 1rem;
            font-weight: 600;
            font-size: 0.26rem;
            text-align: center;
        }
        .TheAgent {
            // border: #ff5f17 1px solid;
            border-top: 1px solid #f2f2f2;
            height: 1rem;
            width: 100%;
            display: flex;
            .TheAgentTitle {
                flex: 1;
                text-align: center;
                line-height: 1rem;
                font-size: 0.26rem;
                &:nth-child(3) {
                    border-left: 1px solid #f2f2f2;
                }
            }
            .bold {
                font-weight: 600;
                color: #ff5f17;
            }
        }
    }
}
</style>
