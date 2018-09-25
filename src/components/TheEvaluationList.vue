<template>
    <div class="GetCommentList">
        <yd-navbar title="评价列表">
            <router-link to='' @click.native="GetCommentList" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div style="width:100%" class="comment">
            <yd-flexbox direction="vertical" v-for="items in CommentList" :key="items.id">
                <yd-flexbox-item class="UserInfo">
                    <img class="UserIcon" :src="items.UserIcon" alt="">
                    <!-- <img class="UserIcon" src="../assets/Img/bkc.jpg" alt=""> -->
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
    </div>
</template>
<style lang="scss">
.GetCommentList {
    background: #fff;
    .comment {
        padding: 0.5rem;
        .yd-flexbox-vertical {
            border-bottom: #ccc 1px solid;
            margin: 0.5rem 0;
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
            margin-bottom: 0.5rem;
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
export default {
    data() {
        return {
            Good_id: 0,
            CommentList: []
        };
    },
    created() {
        console.log(this.$route.params.Good_id);
        this.Good_id = this.$route.params.Good_id;
        this.$axios({
            method: "POST",
            data: {
                productid: this.$route.params.Good_id,
                PageSize: 1,
                PageIndex: 1,
                Type: 0
            },
            url: this.$server.serverUrl + "/index/GetCommentList",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 400) {
                this.$router.push({ name: "SignIn" });
            }
            if (response.data.success == 200) {
                this.CommentList = response.data.data;
            }
        });
    },
    mounted: {},
    methods: {
        GetCommentList() {
            this.$router.push({
                name: "GeneralItemDescription",
                params: { Good_id: this.Good_id }
            });
        }
    }
};
</script>
