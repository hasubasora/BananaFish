<template>
<div>
    <yd-navbar title="分类列表" height='.8rem' color="#f2f2f2" bgcolor="#ff5f17">
        <router-link to="/" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
        
        <router-link to="#" slot="right">
            <!-- <yd-navbar-next-icon></yd-navbar-next-icon> -->
        </router-link>
    </yd-navbar>
    <yd-scrolltab>
        <yd-scrolltab-panel :label="item.CateName"  v-for="(item,index) in GoodsList" :key="index"  icon="demo-icons-category1" >
            <div style="background-color: gray;">
                <!-- <img class="NewsImg" src="../assets/Img/bbb.png"  alt="" > -->
                       <yd-grids-group :rows="3" title="" item-height="2rem">
                            <yd-grids-item v-for="itemt in item.LstSubCategory" :key="itemt.id">
                                <span slot="text">  
                                    <router-link to=""  @click.native="GoThreeList(itemt.CategoryId)">
                                   <div class="GoThree">
                                     <img :src="itemt.CateIcon" alt="" >
                                    <p>{{ itemt.CateName }}</p>
                                 </div>
                                 </router-link>
                                </span>
                            </yd-grids-item>
                        </yd-grids-group>
            </div>
        </yd-scrolltab-panel>

        <!-- <yd-scrolltab-panel label="冰箱" icon="demo-icons-category2" >
            <div style="height: 350px;background-color: blue;"></div>
        </yd-scrolltab-panel>

        <yd-scrolltab-panel label="洗衣机" icon="demo-icons-category3">
            <div style="height: 350px;background-color: yellow;"></div>
        </yd-scrolltab-panel> -->
        
        <!-- ... -->
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
        console.log(this.GoodsList);
      }
    });
  },
  methods: {
    GoThreeList(i) {
      console.log(i);
      this.$router.push({ name: "menuThree", params: { Group_id: i } });
    }
  }
};
</script>
