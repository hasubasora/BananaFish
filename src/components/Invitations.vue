<template>
    <div class="Invitations">
        <yd-navbar title="邀请好友">
            <router-link to="/MyInfo" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <router-link to="" slot="right">
                邀请规则
            </router-link>
        </yd-navbar>
        <el-carousel :interval="4000" type="card" height="6.7rem" @change="activeIndex">
            <el-carousel-item v-for="(item,index) in 6" :key="index">
                <img class="el-Img" :src="item" alt="分享二维码赚大款">
                <!-- <img class="el-Img" src="../assets/Img/dhb.png" alt=""> -->
            </el-carousel-item>
        </el-carousel>
        <div class="ShareBigBom">
            <p>分享推广海报</p>
            <div class="BigBom">
                <div class="Bom" v-for="(item, index) in Bom" :key="index">
                    <img :src="item.icon" alt="">
                    <span>{{item.title}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style  lang="scss">
.ShareBigBom {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0.2rem;
    // border: 1px solid red;
    p {
        text-align: center;
        font-size: 0.2rem;
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
                    title: "保存并分享"
                }
            ],
            fileName: []
        };
    },
    created() {
        this.addMyAgent();
    },

    methods: {
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
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
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
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    console.log(response.data);
                    this.datalist = response.data.data.urls;
                    this.fileName = response.data.data.fileName;
                }
            });
        }
    }
};
</script>
