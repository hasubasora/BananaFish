<template>
    <div>
        <!-- <div class="news">
            <div class="newsBox">
                <div class="mdkx">免单快讯</div>
                <span style="color:red;margin-top:0.1rem">最新</span>
                <yd-slider autoplay="3000">
                    <yd-slider-item v-for="(item, index) in expressNews" :key="index">
                        <span style="margin-top:0.04rem;">恭喜<i class="c-red">{{item.NickName}}</i> 获得免单<i class="c-red">{{item.OrderTitle}}</i></span>
                    </yd-slider-item>
                </yd-slider>
            </div>
        </div> -->
        <div class="navbar">
            <div class="center" v-for="(item, index) in navigationIcoAd" :key="index" @click="GoPath(item)">
                <div class="center border">
                    <img :src='item.Src'>
                    <span>{{item.Title}}</span>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    name: "navbar",
    props: ["expressNews", "navigationIcoAd"],
    data() {
        return {
            
        }
    },
    methods: {
        GoPath(TypeObj) {
            if(TypeObj.SpecialAreaType === 1) {
                this.$router.push({path: "/FreeOfCharge"})
            }else if(TypeObj.SpecialAreaType === 2) {
                this.$router.push({path: "/LuckyDouble"})
            }else if(TypeObj.SpecialAreaType === 3) {
                var u = navigator.userAgent;
                if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hz.mall";
                }else if (u.indexOf('iPhone') > -1) {
                    window.open("https://itunes.apple.com/cn/app/%E5%A4%B4%E7%AD%B9%E8%B4%AD/id1440461607?mt=8");
                }
            } else if(TypeObj.CategoryID) {
                this.$router.push({path: "menuThree/" + TypeObj.CategoryID})
            }else if(TypeObj.Type) {
                this.$router.push({path: "menuThree/0", query: {gg: TypeObj.Type}})
            }
            
        }
    }
};
</script>
<style lang="scss">
.navbar {
    display: flex;
    justify-content: center;
    background: #fff;
    .center {
        flex: 1;
        text-align: center;
        img {
            display: inline-flex;
            width: 0.8rem;
            align-content: center;
            padding-top: 0.2rem;
        }
        > span {
            color: #999;
            font-size: 0.2rem;
            margin: 0.1rem 0;
            display: block;
        }
    }
}
.headNewsText {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
.news {
    justify-content: center;
    display: flex;
    background: #fff;
    padding: 0.1rem 0;
    .newsBox {
        position: relative;
        width: 6.9rem;
        display: flex;
        font-size: 0.25rem;
        align-items: center;
        .mdkx {
            width: 1.6rem;
            height: 0.5rem;
            line-height: 0.5rem;
            text-align: center;
            font-size: 0.26rem;
            font-weight: bold;
            border-radius: 0.1rem;
            color: #fff;
            background: linear-gradient(to right, #F12B27, #F12B27);
        }
        .yd-slider-item {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-top: 0.05rem;
            .headNewsText {
                font-size: 0.26rem;
            }
        }
        .yd-slider {
            line-height: 0.5rem;
        }
        .yd-slider-pagination {
            display: none;
        }
        .newsText {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        > span {
            width: 1rem;
            margin: 0.1rem;
        }
    }
}
</style>

