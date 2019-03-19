<template>
    <div>
        <yd-navbar title="分类列表" fixed height='.8rem' color="#f2f2f2" class="titleColor">
            <router-link to="/" slot="left">
                <yd-navbar-back-icon color="#f2f2f2"></yd-navbar-back-icon>
            </router-link>

            <router-link to="#" slot="right">
                <!-- <yd-navbar-next-icon></yd-navbar-next-icon> -->
            </router-link>
        </yd-navbar>
        <yd-scrolltab>
            <yd-scrolltab-panel :label="item.CateName"  v-for="(item,index) in GoodsList" :key="index" icon="home-outline" @click.native="GoThreeList(item.CategoryId)">
                <div>
                    <yd-grids-group :rows="3" title="" item-height="2rem">
                        <yd-grids-item v-for="itemt in item.LstSubCategory" :key="itemt.id">
                            <span slot="text">
                                <div @click.native="GoThreeList(itemt.CategoryId)">
                                    <div class="GoThree">
                                        <img :src="itemt.CateIcon" alt="">
                                        <p>{{ itemt.CateName }}</p>
                                    </div>
                                </div>
                            </span>
                        </yd-grids-item>
                    </yd-grids-group>
                </div>
            </yd-scrolltab-panel>
        </yd-scrolltab>
    </div>

</template>
<style lang="scss">
.yd-scrolltab {
    margin-top: 1rem;
}
.yd-scrolltab-item {
    padding: 0px 0.1rem;
    height: 0.7rem;
}
.NewsImg {
    width: 100%;
}
.GoThree {
    > img {
        width: 80%;
    }
}
</style>

<script>
export default {
    name: "productList",
    data() {
        return {
            GoodsList: []
        };
    },
    created() {
        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/index/getindexcategory",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 400) {
                this.$router.push({ name: "SignIn" });
            }
            if (response.data.success == 200) {
                this.GoodsList = response.data.rows;
            }
        });
    },
    methods: {
        GoThreeList(i) {
            this.$router.push({ name: "menuThree", params: { Group_id: i } });
        }
    }
};
</script>
