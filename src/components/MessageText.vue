<template>
    <div class="MessageText">
        <yd-navbar slot="navbar" title="消息" height='.8rem' fixed>
            <router-link to="" slot="left" @click.native="ToMsg">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>

        </yd-navbar>
        <div class="MessageTextGrpup" v-html="MessageTextGrpup">

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            MessageTextGrpup: ""
        };
    },
    created() {
        this.$axios({
            method: "POST",
            data: { Id: this.$route.params.Text_id },
            url: this.$server.serverUrl + "/Account/GetMyMessage",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 400) {
                this.$router.push({ name: "SignIn" });
            }
            if (response.data.success == 200) {
                this.MessageTextGrpup = response.data.model.Content;
            }
        });
    },
    methods: {
        ToMsg(id) {
            this.$router.go(-1);
        }
    }
};
</script>
<style lang="scss">
.MessageText {
    background: #fff;
    height: 100%;
    width: 100%;
    position: absolute;
    .MessageTextGrpup{
        padding: .2rem;
    }
    padding: 0.8rem 0;
    .IsRead {
        background: red;
        height: 0.2rem;
        width: 0.2rem;
        border-radius: 50px;
    }
    .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 5rem;
    }
    .IsGary {
        background: #ccc;
    }
}
</style>
