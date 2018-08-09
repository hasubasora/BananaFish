<template>
     <yd-layout>
       <yd-navbar title="购物车">
        <router-link to="#" slot="left">
            <yd-navbar-back-icon>返回</yd-navbar-back-icon>
        </router-link>

        <!-- <img slot="center" src="http://static.ydcss.com/www/img/logo.png"/> -->

        <router-link to="#" slot="right">
            <yd-navbar-next-icon>编辑</yd-navbar-next-icon>
        </router-link>
        </yd-navbar>
<!-- 购物车 -->
          <yd-checklist v-model="checklist" ref="checklistDemo" :callback="change">
              <yd-checklist-item val="1">
                 <div style="height: 50px;line-height: 50px;">1 -- 值：{{checklist}}</div>
              </yd-checklist-item>

            <yd-checklist-item val="aaa">
                <yd-flexbox style="padding: 15px 0;">
                    <img src="//img12.360buyimg.com/n1/jfs/t2122/170/1006550413/171711/de099a6f/56399d01N67907749.jpg" class="demo-checklist-img">
                    <yd-flexbox-item align="top">
                        [aaa] 类似购物车 / 类似购物车<br/>
                        <span style="color: blue;">点击这边的内容是禁止选中的</span><br/>
                        <p style="color:#F00;">选中值：{{checklist}}</p>
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-checklist-item>

            <yd-checklist-item val="bbb">
                <yd-flexbox style="padding: 15px 0;">
                    <img src="//img10.360buyimg.com/n1/jfs/t6925/75/2382158459/437865/f3931d24/598be5b1N24d949fe.jpg" class="demo-checklist-img">
                    <yd-flexbox-item align="top">
                        [bbb] 南非进口红西柚 6个 单果重约300-330g 新鲜水果
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-checklist-item>

            <yd-checklist-item val="ccc">
                <yd-flexbox style="padding: 15px 0;">
                    <img src="//img14.360buyimg.com/n1/jfs/t3232/69/539717695/176729/cf1ff3d8/57baa5d1N901ffea5.jpg" class="demo-checklist-img">
                    <yd-flexbox-item align="top">
                        [ccc] 展卉 越南进口红心火龙果 3个装中果 单果约300~350g 新鲜水果
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-checklist-item>
    </yd-checklist>
<!-- 底部栏 -->
        <div style="padding-left:12px;margin-bottom: 10px;">
            <yd-checkbox v-model="isCheckAll" shape="circle" :change="checkAll">全选 {{isCheckAll}}</yd-checkbox>
        </div>
    </yd-layout>
</template>
<style lang="scss">
.demo-checklist-img {
  width: 1.5rem;
  border: 1px solid #ccc;
}
</style>
<script>
export default {
  data() {
    return {
      checklist: [],
      isCheckAll: false
    };
  },
  methods: {
    change(value, isCheckAll) {
      this.isCheckAll = isCheckAll;
    },
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.$refs.checklistDemo.$emit(
        "ydui.checklist.checkall",
        this.isCheckAll
      );
    }
  },
  created() {
    this.$axios({
      method: "POST",
      data: {
        productid: 1263
      },
      url: this.$server.serverUrl + "/order/getshoppingcart",
      responseType: "json"
    }).then(response => {
      if (response.data.success == 200) {
        this.GoodsList = response.data.object;
        console.log(this.GoodsList);
      }
    });
    this.$axios({
      method: "POST",
      data: {
        productid: 1263
      },
      url: this.$server.serverUrl + "/order/checkshoppingcart",
      responseType: "json"
    }).then(response => {
      if (response.data.success == 200) {
        this.GoodsHtml = response.data.object;
        console.log(this.GoodsHtml);
      }
    });
  }
};
</script>
