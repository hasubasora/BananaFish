<template>
  <yd-layout>

    <yd-flexbox direction="vertical" class="info_top">
      <yd-flexbox-item>
        <div class="qcode">
          <span class="iconfont icon-erweima qcodes"></span>
        </div>
      </yd-flexbox-item>
      <yd-flexbox-item>
        <yd-flexbox class="info_top_center">
          <yd-flexbox-item>
            <!-- <img class="infoIcon" src="../assets/Img/bkc.jpg" alt=""> -->
            <img class="infoIcon" :src="object.UserIcon" alt="">
          </yd-flexbox-item>
          <yd-flexbox-item>
            <div class="infoMsg">
              <p class="infoName">{{object.NickName}}
                <img class="lvIcon" src="../assets/Img/lv.png" alt="">
              </p>
              <img class="mrIcon" src="../assets/Img/mr.png" alt="">
              <p class="JF_a">
                <span>我的积分</span>
                <span>我的余额</span>
              </p>
              <p class="JF_b">
                <span>{{object.UserIntegral}} </span>
                <span>￥{{object.Balance}} </span>
              </p>
            </div>
          </yd-flexbox-item>
          <yd-flexbox-item>
            <div class="infoJF">
              <img src="../assets/Img/jifen.png" alt="" @click="GoRedData">
              <yd-button class="infoTx" type="primary">提现</yd-button>

            </div>

          </yd-flexbox-item>
        </yd-flexbox>
      </yd-flexbox-item>

      <yd-flexbox-item>
        <div class="info_top_bom">
          <img class="hyIcon" src="../assets/Img/hy.png" alt="">
          <span class="hyText"> 本期积分收益以开放领取，立即领取</span>
        </div>
      </yd-flexbox-item>
    </yd-flexbox>

    <!-- 下半部分 -->

    <!-- <yd-cell-group>
        <yd-cell-item arrow>
            <span slot="left">头筹订单</span>
        </yd-cell-item>
                <yd-cell-item arrow>
            <span slot="left">订单列表</span>
        </yd-cell-item>
    </yd-cell-group> -->

    <!-- <yd-flexbox>
            <yd-flexbox-item class="icon-set">
                <i class="iconfont icon-daifukuan-copy"></i>
                <span>待付款</span>
            </yd-flexbox-item>
           <yd-flexbox-item class="icon-set">
                <i class="iconfont icon-daifahuo"></i>
                <span>待发货</span>
            </yd-flexbox-item>
              <yd-flexbox-item class="icon-set" >
                <i class="iconfont  icon-daifahuo1"></i>
                <b>111</b>
                <span>已发货</span>
            </yd-flexbox-item>
              <yd-flexbox-item class="icon-set">
                <i class="iconfont icon-pingjia"></i>
                <span>待评价</span>
            </yd-flexbox-item>
              <yd-flexbox-item class="icon-set">
                <i class="iconfont icon-shouhou"></i>
                <span>售后</span>
            </yd-flexbox-item>

        </yd-flexbox> -->

    <!-- hehuoren -->

    <!-- hehuoren -->
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">我的服务</span>
        <span slot="right"></span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-flexbox>
      <yd-grids-group :rows="4">
        <yd-grids-item v-for="item in list" :key='item.id'>
          <span slot="text">
            <router-link :to="item.url">
              <i class="iconfont" :class="`${item.icon} ${item.style}`"></i>
              <p>{{item.title}}</p>
            </router-link>

          </span>
        </yd-grids-item>
      </yd-grids-group>

    </yd-flexbox>
    <yd-cell-group>
      <yd-cell-item arrow>
        <span slot="left">头筹购合伙人</span>
        <span slot="right"></span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-flexbox>
      <yd-flexbox-item>
        <img class="hbIcon" src="../assets/Img/hb.png" alt="">
      </yd-flexbox-item>
    </yd-flexbox>
    <!-- ed -->
  </yd-layout>
</template>
<script>
export default {
    data() {
        return {
            object: [],
            list: [
                {
                    title: "头筹订单",
                    icon: "icon-tuan",
                    style: "orange",
                    url: "/TopGoodsList"
                },
                {
                    title: "其他订单",
                    icon: "icon-dingdan-copy",
                    style: "orange",
                    url: "/ShopGoodsList"
                },
                {
                    title: "我的收益",
                    icon: "icon-lirun2-copy",
                    style: "orange",
                    url: ""
                },
                {
                    title: "邀请好友",
                    icon: "icon-youhuiquan",
                    style: "orange",
                    url: ""
                },
                {
                    title: "积分指数",
                    icon: "icon-xianhua",
                    style: "orange",
                    url: "/RedData"
                },
                {
                    title: "收货地址",
                    icon: "icon-shouhuodizhi",
                    style: "orange",
                    url: ""
                },
                { title: "客服", icon: "icon-erji", style: "orange", url: "" },
                {
                    title: "帮助",
                    icon: "icon-hezuowoshouyouyihexiehepinggongyingxianxing",
                    style: "orange",
                    url: ""
                },
                {
                    title: "商务合作",
                    icon: "icon-hezuowoshouyouyihexiehepinggongyingxianxing",
                    style: "orange",
                    url: ""
                },
                {
                    title: "设置",
                    icon: "icon-shezhix",
                    style: "orange",
                    url: ""
                }
            ]
        };
    },
    created() {
        this.GetUserInfo();
    },
    methods: {
        GoRedData() {
            this.$router.push({ name: "RedData" });
        },
        GetUserInfo() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/account/getmyaccount",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    // this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    console.log(response.data.object);
                    this.object = response.data.object;
                }
            });
        }
    }
};
</script>

<style lang="scss">
.orange {
    color: rgba(255, 102, 0, 1);
    font-size: 0.5rem;
}
.info_top {
    margin-bottom: 0.2rem;
    background: linear-gradient(
        90deg,
        rgba(255, 102, 0, 1),
        rgba(255, 133, 13, 1)
    );
    .qcode {
        align-content: center; //对齐弹性盒的 <div> 元素的各项：
        align-items: center; //居中对齐弹性盒的各项 <div> 元素：
        align-self: center; //居中对齐弹性对象元素内的某个项：
        text-align: right;
        .qcodes {
            font-size: 0.4rem;
            padding: 0.12rem;
            display: block;
        }
    }
    .info_top_center {
        .infoIcon {
            height: 1.5rem;
            width: 1.5rem;
            display: block;
            border-radius: 50px;
            margin-left: 0.3rem;
        }
        .infoName {
            color: #fff;
            font-size: 0.32rem;
            .lvIcon {
                width: 0.4rem;
            }
        }
        .mrIcon {
            width: 1.5rem;
        }
        .infoJF {
            width: 100%;
            > img {
                width: 2rem;
            }
            .infoTx {
                margin-right: 1rem;
                background: #b38a4b;
            }
            text-align: right;
        }
        .infoMsg {
            width: 3rem;
        }
        .JF_a {
            display: flex;
            justify-content: space-between;
            color: #fff;
        }
        .JF_b {
            @extend .JF_a;
            font-size: 0.3rem;
        }
    }
    .info_top_bom {
        padding: 0.3rem;
        .hyIcon {
            width: 1.5rem;
        }
        .hyText {
            vertical-align: super;
            color: #fff;
        }
    }
}
.hbIcon {
    width: 100%;
    padding: 0 0.2rem 0.2rem;
    background: #fff;
    margin-bottom: 0.2rem;
}
.icon-set {
    background: #fff;
    position: relative;
    display: flex;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 0.2rem;
    flex-direction: column;
    align-items: center;
    .iconfont {
        font-size: 0.5rem;
    }
    > span {
        padding: 0.1rem;
    }
    > b {
        position: absolute;
        top: -0.1rem;
        right: 0.3rem;
        background: red;
        color: #fff;
        font-size: 0.2rem;
        padding: 0.02rem;
        border-radius: 5px;
    }
}
.yd-cell-box {
    padding-bottom: 0.35rem;
    margin-bottom: 0;
    background: #fff;
}
</style>

