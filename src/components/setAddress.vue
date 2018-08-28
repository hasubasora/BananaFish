<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="地址编辑" height='.8rem' color="#f2f2f2" bgcolor="#ff5f17">
      <router-link to="" slot="left" @click.native="returnGo">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
      <router-link to="" slot="right" @click.native="saveAddress">
        保存
      </router-link>
    </yd-navbar>

    <yd-cell-group>
      <yd-cell-group>
        <yd-cell-item arrow>
          <span slot="left">所在地区：</span>
          <input slot="right" type="text" @click.stop="show2 = true" v-model="model2" readonly placeholder="请选择收货地址">
        </yd-cell-item>
      </yd-cell-group>

      <yd-cityselect v-model="show2" ref="cityselectDemo" :callback="result2" :items="district" provance="新疆" city="乌鲁木齐市" area="天山区"></yd-cityselect>
      <yd-cell-item>
        <input slot="right" type="text" v-model="s_address" placeholder="门牌号">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">用户名：</span>
        <yd-input slot="right" required v-model="s_name" max="20" placeholder="请输入用户名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">手机号：</span>
        <input slot="right" type="tel" v-model="s_tel" placeholder="请输入手机号" maxlength="11">
      </yd-cell-item>

      <div>
        <!-- <yd-switch v-model="switch1"></yd-switch>
        <p>【model: switch1 = {{switch1}}】</p> -->
      </div>
    </yd-cell-group>

  </yd-layout>
</template>
<script>
/* 前提是已经安装了 ydui-district */
import District from "ydui-district/dist/jd_province_city_area_id";

export default {
    data() {
        return {
            show2: false,
            model2: "",
            district: District,
            s_name: "",
            switch1: false,
            s_address: "",
            s_tel: ""
        };
    },

    methods: {
        result2(ret) {
            this.model2 =
                ret.itemName1 + "-" + ret.itemName2 + "-" + ret.itemName3;
        },
        returnGo() {
            this.$router.go(-1);
        },
        saveAddress() {
            if (!this.model2) {
                this.$dialog.toast({
                    mes: "你没填省市区啊！",
                    timeout: 1500
                });
                return;
            }
            if (!this.s_address) {
                this.$dialog.toast({
                    mes: "你门牌号没写！",
                    timeout: 1500
                });
                return;
            }
            if (!this.s_name) {
                this.$dialog.toast({
                    mes: "名字都没个叫你啥？",
                    timeout: 1500
                });
                return;
            }
            if (!this.s_tel) {
                this.$dialog.toast({
                    mes: "电话呢？兄die",
                    timeout: 1500
                });
                return;
            }
            this.$axios({
                method: "POST",
                data: {
                    fullareaname: this.model2,
                    address: this.s_address,
                    shipto: this.s_name,
                    shipphone: this.s_tel
                },
                url: this.$server.serverUrl + "/order/saveaddress",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.address = response.data.object;
                    this.$router.go(-1);
                    console.log(response.data);
                }
            });
        }
    }
};
</script>