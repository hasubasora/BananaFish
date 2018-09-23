<template>
    <div class="SetBankCard">
        <yd-navbar fixed slot="navbar" title="银行卡" height='.8rem' color='#fff' class="titleColor">
            <router-link to="/RemainingSum" slot="left" >
                <yd-navbar-back-icon color='#fff'></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="cardList">
            <yd-preview :buttons="btns" v-for="(item, index) in CardList" :key="index">
                <yd-preview-item style="padding:.2rem">
                    <div slot="left">
                        <img src="" alt="" width="100">
                    </div>
                    <div slot="left">
                        <p style="font-size:.3rem">{{item.DrawAttributeName}}</p>
                        <p>{{item.DrawRealName}}</p>
                    </div>
                    <div slot="right"></div>
                </yd-preview-item>
                <yd-preview-item>
                    <div slot="left" style="font-size:.5rem">{{item.DrawAccount}}</div>
                    <div slot="right"></div>
                </yd-preview-item>
                <yd-preview-item>
                    <div slot="left"></div>
                    <div slot="right">
                        <span>删除</span>
                        <span>编辑</span>
                    </div>
                </yd-preview-item>
            </yd-preview>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            CardList: [],
            btns: [
                // {
                //     text: "辅助操作",
                //     click: () => {
                //         alert("辅助操作");
                //     }
                // },
                // {
                //     color: "#F00",
                //     text: "跳转首页",
                //     link: { path: "/" }
                // }
            ]
        };
    },
    created() {
        this.GetCard();
    },
    methods: {
        GetCard() {
            this.$axios({
                method: "POST",
                data: {},
                url:
                    this.$server.serverUrl + "/UserCenter/GetMemberDrawAccount",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    console.log(response.data);
                    this.CardList = response.data.list;
                }
            });
        }
    }
};
</script>
<style lang="scss">
.SetBankCard {
    padding-top: 1rem;
    .cardList {
        height: 4rem;
        margin: 0 0.2rem;
        // background: beige;
        .yd-preview{
            padding: .2rem;
        }
    }
}
</style>
