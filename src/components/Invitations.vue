<template>
    <div class="Invitations">
        <yd-navbar title="邀请好友">
            <router-link to="/MyInfo" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <router-link :to="{path: '/Invite', query: {Good_id: 'yqgz'}}" slot="right" @click="SeeBrokerage">
                邀请规则
            </router-link>
        </yd-navbar>

        <el-carousel v-if="datalist.length>0" :interval="4000" type="card" height="6.7rem" @change="activeIndex">
            <el-carousel-item v-for="(item,index) in datalist" :key="index">
                <img class="el-Img" :src="item" alt="分享二维码赚大款">
                <!-- <img class="el-Img" src="../assets/Img/dhb.png" alt=""> -->
            </el-carousel-item>
        </el-carousel>
        <div class="ShareBigBom">
            <p>长按图片保存到手机</p>
        </div>
    </div>
</template>

<style  lang="scss">
.ShareBigBom {
    position: absolute;
    bottom: 5%;
    width: 100%;
    padding: 0.2rem;
    // border: 1px solid red;
    p {
        text-align: center;
        font-size: 0.3rem;
        padding: 0.2rem;
    }
    .BigBom {
        display: flex;
        .Bom {
            flex: 1;
            text-align: center;
            img {
                width: 0.7rem;
            }
            span {
                display: block;
            }
        }
    }
}

.el-Img {
    width: 100%;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>

<script>
import { LOGIN_SUCCESS, TO_PAGE } from "../main.js";
export default {
    data() {
        return {
            datalist: [],
            Bom: [
                {
                    icon: require("../assets/Img/b1.png"),
                    title: "微信朋友圈"
                },
                {
                    icon: require("../assets/Img/b2.png"),
                    title: "微信好友"
                },
                {
                    icon: require("../assets/Img/b3.png"),
                    title: "保存到本地"
                }
            ],
            fileName: []
        };
    },
    created() {
        this.addMyAgent();
    },

    methods: {
        SeeBrokerage() {
            TO_PAGE("yqgz");
        },
        activeIndex(e) {
            // console.log(e);
        },
        addMyAgent() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/Agent/ApplicationBroker",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data)
                if (response.data.success == 200) {
                    this.GetQr();
                }
            });
        },
        GetQr() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/Agent/GetQr",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    console.log(response.data);
                    this.datalist = response.data.data.urls;
                    this.fileName = response.data.data.fileName;
                }
                //  else {
                //     this.$dialog.alert({
                //         mes: response.data.msg
                //     });
                // }
            });
        }
    }
};
</script>
