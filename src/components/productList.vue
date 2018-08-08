<template>
<div>
    <yd-navbar title="NavBar">
        <router-link to="/" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
        
        <router-link to="#" slot="right">
            <!-- <yd-navbar-next-icon></yd-navbar-next-icon> -->
        </router-link>
    </yd-navbar>
    <yd-scrolltab>
        <yd-scrolltab-panel label="空调" icon="demo-icons-category1">
            <div style="height: 350px;background-color: gray;"></div>
        </yd-scrolltab-panel>

        <yd-scrolltab-panel label="冰箱" icon="demo-icons-category2" active>
            <div style="height: 350px;background-color: blue;"></div>
        </yd-scrolltab-panel>

        <yd-scrolltab-panel label="洗衣机" icon="demo-icons-category3">
            <div style="height: 350px;background-color: yellow;"></div>
        </yd-scrolltab-panel>
        
        <!-- ... -->
    </yd-scrolltab>
</div>

</template>
<style lang="scss">
.yd-scrolltab {
  margin-top: 1rem;
}
</style>

<script>
export default {
  name: "productList"
};
</script>
