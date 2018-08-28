<template>
  <yd-cell-group>
    <yd-cell-item>
      <span slot="left">用户名：</span>
      <yd-input slot="right" required v-model="username" max="20" placeholder="请输入用户名"></yd-input>
    </yd-cell-item>
    <yd-cell-item>
      <span slot="left">密码：</span>
      <yd-input slot="right" type="password" v-model="password" placeholder="请输入密码"></yd-input>
    </yd-cell-item>
    <yd-button size="large" @click.native="LoginInfo" type="primary">登陆/注册</yd-button>
  </yd-cell-group>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        LoginInfo() {
            this.$axios({
                method: "POST",
                data: {
                    username: this.username,
                    password: this.password,
                    returnurl: ""
                },
                url: this.$server.serverUrl + "/account/loginorregister",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    console.log("登陆成功");
                    this.$router.push("/");
                }
            });
        }
    }
};
</script>