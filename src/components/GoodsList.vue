<template>
    <yd-grids-group :rows="postTitle.products_rowNum">
        <!-- postTitle 传过来的接受者 -->
        <yd-grids-item v-for="item in postTitle.products" :key="item.id">
            <span slot="text">
                <router-link to="" @click.native="GoToItem(item.Id)" class="goods">
                    <!-- <img class="SalePriceImg" src="../assets/Img/gwc.png" alt=""> -->
                    <img :src="item.ProductImg" class="ProductImg" alt="">
                    <div class="goodsDian">
                        <span class="goodsBack">积分购</span>{{item.Integral}}积分</div>
                    <div class="goodsName">{{item.ProductTitle}}</div>
                    <!-- <div class="specification"> {{item.SubTitle}}</div> -->
                    <span class="SaleCount">月销{{item.SaleCount}}件</span>
                    <div class="SalePrice">
                        <strong>￥{{item.SalePrice.toFixed(2)}}</strong>
                    </div>
                </router-link>
            </span>
        </yd-grids-item>
    </yd-grids-group>
</template>
<style lang="scss">
.goods {
    position: relative;
    text-align: justify;
    color: #111;
    text-decoration: none;
    background: #fff;
    .goodsDian {
        font-size: 0.2rem;
        text-align: justify;
        color: #ff5f17;
        .goodsBack {
            text-align: center;
            width: 0.8rem;
            display: inline-block;
            height: 0.31rem;margin-right: .1rem;
            border-radius: 5px;
            background: #ff5f17;
            color: #fff;
        }
    }
    .ProductImg {
        width: 2rem;
        height: 2rem;
    }
    .goodsName {
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
        line-height: 0.3rem;
    }
    .SaleCount {
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
        right: 0.1rem;
        bottom: -1.55rem;
    }
}
</style>
<script>
export default {
    props: ["postTitle"],
    data() {
        return {
            GoodsList: []
        };
    },
    methods: {
        GoToItem(id) {
            this.$router.push({
                name: "GeneralItemDescription",
                query: { Good_id: id }
            });
        }
    },
    created() {
        this.$axios({
            method: "POST",
            data: {
                pageindex: 1,
                pagesize: 6
            },
            url: this.$server.serverUrl + "/index/getindexintegralproduct",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 400) {
                this.$router.push({ name: "SignIn" });
            }
            if (response.data.success == 200) {
                this.GoodsList = response.data.rows;
                console.log(this.GoodsList);
            }
        });
    }
};
</script>

