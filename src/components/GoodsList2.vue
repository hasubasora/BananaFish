<template>
    <yd-grids-group :rows="postHead.products_rowNum">
        <yd-grids-item v-for="item in postHead.products" :key="item.id">
            <router-link slot="text" to="" @click.native="GoToItem(item.GroupId)" class="goodsTwo">
                <!-- <img class="SalePriceImg" src="../assets/Img/go.png" alt=""> -->
                <img :src="item.ProductImg" class="ProductImg" alt="">
                <p style="background:#f3f3f3;font-size:.26rem;height:.4rem;line-height:.4rem">往期已送出{{item.CurrentPeriod-1}}件</p>
                <div class="prog">{{item.TotalNum-item.RemainNum+'/'+item.TotalNum}}</div>
                <yd-progressbar class="progress" type="line" :progress="1-item.RemainNum/item.TotalNum" trail-width="10" trail-color="#FE5D51"></yd-progressbar>
                <div class="RemainNum">已购{{item.TotalNum-item.RemainNum}}人次(满{{item.TotalNum}}人次揭晓答案)</div>
                <div class="goodsName">
                    <span class="goodsBack">头筹价</span>{{item.ProductTitle}}</div>
                <!-- <div class="specification"> {{item.SubTitle}}</div> -->
                <span class="ProductStock">头筹价</span>

                <div class="SalePrice">
                    <strong>￥{{item.MinSalePrice.toFixed(2)}}-{{item.MaxSalePrice.toFixed(2)}}</strong>
                </div>
            </router-link>
        </yd-grids-item>

    </yd-grids-group>
</template>
<style lang="scss">
.goodsTwo {
    position: relative;
    color: #111;
    text-decoration: none;
    background: #fff;
    .goodsBack {
        text-align: center;
        padding: 0.05rem 0.2rem;
        border-radius: 5px;
        // line-height: 0.4rem;
        // font-size: 0.2rem;
        background: #ff5f17;
        color: #fff;
        margin-right: 0.2rem;
    }
    .RemainNum {
        color: #ff5f17;
        font-size: 0.2rem;
    }
    .ProductImg {
        height: 2rem;
        width: 2rem;
    }
    .progress {
        > svg {
            // border: 1px solid;
            border-radius: 50px;
            margin: 0.1rem 0;
        }
    }
    .prog {
        position: absolute;
        color: #fff;
        top: 0.1rem;
        left: -0.4rem;
        font-size: 0.2rem;
        z-index: 9;
    }
    .goodsName {
        text-align: left;
        font-size: 0.25rem;
        overflow: hidden;
        white-space: nowrap;
        line-height: 0.5rem;
        text-overflow: ellipsis;
        color: #555;
    }
    .specification {
        color: #999;
        font-size: 0.2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .ProductStock {
        color: #999;
        font-size: 0.2rem;
        text-align: left;
        display: block;
    }
    .SalePrice {
        display: flex;
        justify-content: space-between;
    }
    .SalePriceImg {
        width: 0.6rem;
        position: absolute;
        right: -0.5rem;
        bottom: -2.3rem;
    }
}
</style>
<script>
export default {
    props: ["postHead"],
    data() {
        return {
            GoodsList: [],
            progress4: 0
        };
    },
    created() {
        this.$axios({
            method: "POST",
            data: {
                pageindex: 1,
                pagesize: 10
            },
            url: this.$server.serverUrl + "/index/getindexgroupproduct",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 400) {
                this.$router.push({ name: "SignIn" });
            }
            if (response.data.success == 200) {
                this.GoodsList = response.data.rows;
                // console.log(this.GoodsList);
            }
        });
    },
    methods: {
        GoToItem(id) {
            this.$router.push({
                name: "ItemDescription",
                params: { ItemGood_id: id }
            });
        }
    }
};
</script>

