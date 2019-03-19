<template>
    <mt-swipe :auto="3000" id="swipe" v-if="broadcastAd">
        <mt-swipe-item class="swipe-item" v-for="(item, index) in broadcastAd" :key="index">
            <img @click="bannerLink(item)" :src="item.Src" alt=""> 
        </mt-swipe-item>
    </mt-swipe>
</template>
<script>
export default {
    name: "swipe",
    props: ['broadcastAd'],
    data() {
        return {
        }
    },
    methods: {
        bannerLink(obj) {
            if(obj.Link.indexOf("http")> -1) {
                window.location.href = obj.Link
            }else if(obj.CategoryID) {
                this.$router.push({path: "menuThree/" + obj.CategoryID})
            }else if(obj.Type) {
                    this.$router.push({path: "menuThree/0", query: {gg: obj.Type}})
            }else if(obj.ProductID > 0) {
                this.$router.push({
                    path: "/GeneralItemDescription",
                    query: {Good_id: obj.ProductID}
                })
            }else if(obj.SpecialAreaType === 1) {
                this.$router.push({path: "/FreeOfCharge"})
            }else if(obj.SpecialAreaType === 2) {
                this.$router.push({path: "/LuckyDouble"})
            }
        }
    }
}
</script>
<style lang="scss" >
#swipe {
    height: 40vw;
    .swipe-item {
        width: 100%;
        padding-bottom: 40%;
        
    }
    img {
        width: 100%;
    }
}
</style>

