<template>
    <div class="MessageQueue">
        <yd-navbar slot="navbar" title="消息" height='.8rem' fixed>
            <router-link to="/productList" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <div slot="right" @click="ReadMyMessage">全部已读</div>
        </yd-navbar>

        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">

            <yd-list theme="1" slot="list">
                <yd-cell-group>
                    <yd-cell-item arrow type="link" href="" @click.native='ToMsg(item.Id)' v-for="(item, index) in arrow" :key="index">
                        <span slot="left">
                            <div :class="['IsRead',{IsGary:item.IsRead}]"></div>
                        </span>
                        <span slot="left" class="title">{{item.Title}}</span>
                        <span slot="right">查看全部</span>
                    </yd-cell-item>
                </yd-cell-group>
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">我是有底线的~~</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />

        </yd-infinitescroll>
    </div>
</template>
<script>
export default {
    inject: ['reload'],
    data() {
        return {
            arrow: [],
            page: 1,
            pageSize: 10
        };
    },
    created() {
        this.$axios({
            method: "POST",
            data: {
                pageindex: 1,
                pagesize: 15
            },
            url: this.$server.serverUrl + "/Account/GetMyMessageLst",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                this.arrow = response.data.list;
            }
        });
    },
    methods: {
        ToMsg(id) {
            this.$router.push({ name: "MessageText", params: { Text_id: id } });
        },
        loadList() {
            this.$axios({
                method: "POST",
                data: {
                    pageindex: this.page,
                    pagesize: this.pageSize
                },
                url: this.$server.serverUrl + "/Account/GetMyMessageLst"
            }).then(response => {
                console.log(response.data.rows);
                const _list = response.data.list;
                this.arrow = [...this.arrow, ..._list];
                if (_list.length < this.pageSize || this.page == 3) {
                    console.log("所有数据加载完毕");
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit(
                        "ydui.infinitescroll.loadedDone"
                    );
                    return;
                }
                console.log("单次请求数据完毕");

                /* 单次请求数据完毕 */
                this.$refs.infinitescrollDemo.$emit(
                    "ydui.infinitescroll.finishLoad"
                );

                this.page++;
            });
        },
        ReadMyMessage() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/Account/ReadMyMessage",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.reload()
                }
            });
        }
    }
};
</script>
<style lang="scss">
.MessageQueue {
    padding: 0.8rem 0;
    .IsRead {
        background: red;
        height: 0.2rem;
        width: 0.2rem;
        border-radius: 50px;
    }
    .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 5rem;
        margin-left: 0.2rem;
    }
    .IsGary {
        background: #ccc;
    }
}
</style>
