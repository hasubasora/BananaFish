<template>
    <div class="GetCommentList">
        <yd-navbar title="评价列表">
            <router-link :to='{ path: "/GeneralItemDescription", query: { Good_id: this.$route.params.Good_id }}' replace slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <div style="width:100%" class="comment" slot="list">
                <yd-flexbox direction="vertical" v-for="items in CommentList" :key="items.id">
                    <yd-flexbox-item class="UserInfo">
                        <img class="UserIcon" :src="items.UserIcon" alt="">
                        <span class="NickName">{{ items.NickName }}</span>
                    </yd-flexbox-item>
                    <yd-flexbox-item class="CreateTime"> {{ items.CreateTime }}</yd-flexbox-item>
                    <yd-flexbox-item class="Comment"> {{ items.Comment }}</yd-flexbox-item>

                    <yd-flexbox-item>
                        <yd-lightbox class="ImgShow">
                            <yd-lightbox-img v-for="itemst in items.ImgShow" :key="itemst.id" :src="itemst.AttachPath"></yd-lightbox-img>
                        </yd-lightbox>
                    </yd-flexbox-item>
                </yd-flexbox>
            </div>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">已经到底啦~♪(^∇^*)~</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
        </yd-infinitescroll>
    </div>
</template>
<style lang="scss">
.GetCommentList {
    background: #fff;
    .comment {
        padding: 0.3rem;
        .yd-flexbox-vertical {
            border-bottom: #ccc 1px solid;
            margin: 0.3rem 0;
        }
        .UserInfo {
            .UserIcon {
                height: 1rem;
                width: 1rem;
                vertical-align: middle;
                border-radius: 50%;
            }
            .NickName {
                font-size: 0.3rem;
                margin-left: 0.3rem;
            }
        }
        .CreateTime {
            padding: 0.1rem;
            color: #888;
            font-size: 0.2rem;
        }
        .Comment {
            padding: 0.1rem;
            font-size: 0.3rem;
        }
        .ImgShow {
            width: 1rem;
            display: flex;
            margin-bottom: 0.2rem;
            > img {
                margin: 0.05rem;
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
<script>
import { LOGIN_SUCCESS } from "../main.js";
export default {
    data() {
        return {
            Good_id: 0,
            CommentList: [],
            PageSize: 20,
            PageIndex: 1
        };
    },
    created() {
        console.log(this.$route.params.Good_id);
        this.Good_id = this.$route.params.Good_id;
        this.$axios({
            method: "POST",
            data: {
                productid: this.$route.params.Good_id,
                PageSize: this.PageSize,
                PageIndex: this.PageIndex,
                Type: 0
            },
            url: this.$server.serverUrl + "/index/GetCommentList",
            responseType: "json"
        }).then(response => {
            LOGIN_SUCCESS(response.data)
            if (response.data.success == 200) {
                this.CommentList = response.data.data;
                console.log(this.CommentList)
            }
        });
    },
    methods: {
        GetCommentList() {
            this.$router.push({
                name: "GeneralItemDescription",
                query: { Good_id: this.Good_id }
            });
        },
        loadList() {
            this.PageIndex++
            this.$axios({
            method: "POST",
            data: {
                productid: this.$route.params.Good_id,
                PageSize: this.PageSize,
                PageIndex: this.PageIndex,
                Type: 0
            },
            url: this.$server.serverUrl + "/index/GetCommentList",
            responseType: "json"
            }).then(response => {
                const _list = response.data.data;
                this.CommentList = [...this.CommentList, ..._list];
                if (_list.length < this.PageSize) {
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit(
                        "ydui.infinitescroll.loadedDone"
                    );
                    return;
                }

                /* 单次请求数据完毕 */
                this.$refs.infinitescrollDemo.$emit(
                    "ydui.infinitescroll.finishLoad"
                );
            });
        }
    }
};
</script>
