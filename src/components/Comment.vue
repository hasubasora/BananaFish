<template>
    <div class="CommentAll">
        <div class="Comment">
            <yd-navbar title="评价" fixed>
                <router-link to="/ShopGoodsList/?plan=0" slot="left">
                    <yd-navbar-back-icon></yd-navbar-back-icon>
                </router-link>

            </yd-navbar>
            <div class="CommentText" v-for="(item, index) in rows" :key="index">
                <!-- 商品信息 -->
                <yd-preview :buttons="btns">
                    <yd-preview-header>
                        <div slot="left" class="preview-header">
                            <img :src="item.ProductImg" alt="">
                        </div>
                        <div slot="right">{{item.ProductTitle}}</div>
                    </yd-preview-header>
                </yd-preview>

                <!-- 评价 -->
                <yd-cell-group title="评价">
                    <yd-cell-item>
                        <yd-textarea slot="right" v-model="something[index]" placeholder="亲，不写点什么东西吗？" maxlength="200"></yd-textarea>
                    </yd-cell-item>
                </yd-cell-group>

                <!-- 图片提交 -->
                <div class="divImg">
                    <img :src="itemImg" alt="" v-for="(itemImg, _index) in my_array[index]" :key="_index">
                    <form id="uploadForm2" name="imgForm" enctype="multipart/form-data" method='post'>
                        <img class="upImg" src="../assets/Img/upload.png" alt="" width="100" >
                        <input @change="uploadChange($event,index)" :disabled=isBtn type="file" name="files" id="upInput" accept="image/*" multiple="multiple">
                    </form>
                </div>

            </div>

        </div>
        <yd-button size="large" type="primary" class="primary" @click.native="primary">发布</yd-button>
    </div>

</template>
<style lang="scss">
.CommentAll {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    .primary {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 999;
    }
    .Comment {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        -webkit-scroll-touch: scroll;
        -webkit-overflow-scrolling: touch; /*这句是为了滑动更顺畅*/
        overflow-y: scroll;
        padding-top: 1rem;
        #uploadForm2 {
            background: #fff;
            position: relative;
            margin: 0.2rem;
            width: 1rem;
            display: inline-block;
            height: 1rem;
            .upImg {
                width: 1rem;
                height: 1rem;
                display: block;
                // border: 1px solid;
                position: absolute;
                top: 0;
                left: 0;
            }
            #upInput {
                position: absolute;
                top: 0;
                left: 0;
                width: 1rem;
                height: 1rem;
                opacity: 0;
            }
        }
        .divImg {
            background: #fff;
            // height: 2rem;
            padding: 0.2rem;
            > img {
                width: 1rem;
                height: 1rem;
                margin: 0.2rem;
            }
        }
        .CommentText {
            margin-bottom: 1rem;
            .preview-header {
                width: 1rem;
                height: 1rem;
                flex: none;
                > img {
                    width: 100%;
                }
            }
            .yd-preview-header {
                height: 1.4rem;
            }
        }
    }
}
</style>
<script>
export default {
    data() {
        return {
            btns: [],
            rows: [],
            ComList: [],
            something: [],
            my_array: [],
            OrderId: 0,
            isBtn: false
        };
    },
    created() {
        console.log(this.$route.query.plan);

        this.getCommentgoods();
    },
    methods: {
        primary() {
            this.ComList = [];
            let objectCom = {};
            for (const [keys, element] of this.rows.entries()) {
                objectCom = {};
                console.log(element.ProductId);
                objectCom.Imgs = this.my_array[keys];
                objectCom.Comment = this.something[keys];
                objectCom.ProductId = element.ProductId;
                this.ComList.push(objectCom);
            }
            // console.log(objectCom);
            // console.log(this.something);
            // console.log(this.ComList);
            this.addComment(JSON.stringify(this.ComList));
        },
        //获取评价商品
        getCommentgoods() {
            this.$axios({
                method: "POST",
                data: {
                    orderId: this.$route.query.plan
                },
                url: this.$server.serverUrl + "/account/getmyorderDetail",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.rows = response.data.rows.LstProduct;
                    this.OrderId = response.data.rows.OrderId;
                    //创建空图片数组
                    this.my_array = [];
                    for (let i = 0; i < this.rows.length; i += 1) {
                        this.my_array[i] = [];
                    }
                    // console.log(this.my_array);
                }
            });
        },
        //提交评价
        addComment(ComList) {
            this.isBtn = true;
            this.$axios({
                method: "POST",
                data: {
                    OrderId: this.OrderId,
                    Type: 0, //0积分，1头筹
                    list: ComList
                },
                url: this.$server.serverUrl + "/Order/ProductComment",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.$dialog.toast({
                        mes: "评价成功",
                        timeout: 1500,
                        icon: "success",
                        callback: () => {
                            this.$router.push({
                                name: "ShopGoodsList",
                                query: { plan: 0 }
                            });
                        }
                    });
                } else {
                    this.isBtn = false;
                }
            });
        },
        uploadChange(event, _index) {
            if (event.target.files.length > 0) {
                // var files = event.target.files[0];
                console.log(event.target.files);

                var formData = new FormData(document.getElementById("uploadForm2")[0]);

                console.log(formData);

                if (event.target.files.length > 10) {
                    this.$dialog.toast({
                        mes: "上传图片最多十张！",
                        timeout: 1500
                    });
                    return;
                }
                for (const iterator of event.target.files) {
                    formData.append("file", iterator, iterator.name);
                }
                console.log(formData);

                this.$axios({
                    method: "POST",
                    data: formData,
                    params: {
                        dir: 0
                    },
                    url: this.$server.serverUrl + "/UpLoad/Img",
                    responseType: "json",
                    headers: { "Content-Type": "multipart/form-data" }
                }).then(response => {
                    console.log(response.data);
                    const _list = response.data.paths;
                    this.$set(this.my_array, _index, _list);
                    console.log(_list);
                    console.log(this.my_array);
                });
            }
        }
    }
};
</script>
