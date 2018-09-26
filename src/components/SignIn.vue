<template>
    <yd-cell-group>
        <yd-cell-item>
            <span slot="left">手机号：</span>
            <yd-input slot="right" required v-model="username" max="11" placeholder="请输入手机号"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">验证码：</span>
            <yd-input slot="right" type="number" required v-model="ImgCode" max="6" placeholder="图片验证码"> </yd-input>
            <img slot="right" @click="GetImgCode" :src=codeImg alt="">
        </yd-cell-item>
        <yd-cell-item>
            <yd-icon slot="icon" name="phone3" size=".45rem"></yd-icon>
            <input type="number" slot="right" v-model="password" placeholder="手机验证码">

            <!-- ↓↓关键代码是这里↓↓ -->
            <yd-sendcode slot="right" v-model="start1" @click.native="sendCode1" type="warning"></yd-sendcode>
            <!-- ↑↑关键代码是这里↑↑ -->

        </yd-cell-item>
        <!-- <yd-cell-item>
            <span slot="left">密码：</span>
            <yd-input slot="right" type="password" v-model="password" placeholder="请输入密码"></yd-input>
        </yd-cell-item> -->
        <yd-button size="large" @click.native="LoginInfo" type="primary">登陆/注册</yd-button>

    </yd-cell-group>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
            start1: false,
            ImgCode: "",
            codeImg: ""
        };
    },
    created() {
        console.log(
            (this.codeImg =
                this.$server.serverUrl + "/index/GetImgCode/" + Math.random())
        );
    },
    methods: {
        GetImgCode() {
            this.codeImg =
                this.$server.serverUrl + "/index/GetImgCode/" + Math.random();
        },
        sendCode1() {
            if (!this.username || this.username.length < 11) {
                this.$dialog.toast({ mes: "请输入手机号！" });
                return;
            }
            if (!this.ImgCode) {
                this.$dialog.toast({ mes: "请输入图片验证码！" });
                return;
            }

            this.$axios({
                method: "POST",
                data: {
                    MobilePhone: this.username,
                    type: 0,
                    ImgCode: this.ImgCode
                },
                url: this.$server.serverUrl + "/index/GetCode",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.$dialog.loading.open("发送中...");
                    setTimeout(() => {
                        this.start1 = true;
                        this.$dialog.loading.close();
                        this.$dialog.toast({
                            mes: "已发送",
                            icon: "success",
                            timeout: 1500
                        });
                    }, 1000);
                }
                if (response.data.success == 300) {
                    this.$dialog.alert({
                        mes: response.data.msg
                    });
                    return;
                }
            });
        },
        LoginInfo() {
            this.$axios({
                method: "POST",
                data: {
                    username: this.username,
                    code: this.password,
                    returnurl: ""
                },
                url: this.$server.serverUrl + "/account/loginorregister",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    console.log("登陆成功");
                    this.$dialog.alert({ mes: "登陆成功！" });
                    this.$router.push("/");
                }
                if (response.data.success == 300) {
                    this.$dialog.alert({
                        mes: response.data.msg
                    });
                    return;
                }
            });
        }
    }
};
</script>