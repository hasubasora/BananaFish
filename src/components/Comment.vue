<template>
    <div class="Comment">
        <yd-navbar title="评论" fixed>
            <router-link to="/" slot="left">
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
                    {{something[index]}}
            <!-- 评价 -->
            <yd-cell-group title="评价">
                <yd-cell-item>
                    <yd-textarea slot="right" v-model="something[index]" placeholder="请输入您的银行卡卡号和密码" maxlength="200"></yd-textarea>
                </yd-cell-item>
            </yd-cell-group>
            <!-- 图片提交 -->
            <div class="divImg">
                <img :src="itemImg" alt="" v-for="(itemImg, _index) in imgData[index]" :key="_index">
                <form id="uploadForm2" name="imgForm" enctype="multipart/form-data" method='post'>
                    <img class="upImg" src="../assets/Img/upload.png" alt="" width="100" type="file">
                    <input @change="uploadChange" type="file" name="files" id="upInput" accept="image/*" multiple="multiple">
                </form>
            </div>

        </div>

    </div>
</template>
<style lang="scss">
.Comment {
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
</style>
<script>
export default {
    data() {
        return {
            btns: [],
            imgData: [],
            rows: [],
            objectGoods: [],
            something: []
        };
    },
    created() {
        this.getCommentgoods();
        this.objList = 0;
    },
    methods: {
        //获取评论商品
        getCommentgoods() {
            this.$axios({
                method: "POST",
                data: {
                    orderId: 110030
                },
                url: this.$server.serverUrl + "/account/getmyorderDetail",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.rows = response.data.rows.LstProduct;
                    console.log(this.rows);
                    this.objList = this.rows.length;
                }
            });
        },
        //提交评论
        addComment() {
            this.$axios({
                method: "POST",
                data: {
                    imgLength: false,
                    OrderId: 0,
                    Type: 1, //0积分，1头筹
                    list: [
                        {
                            Imgs: [],
                            Comment: "",
                            ProductId: 0 //50979
                        }
                    ]
                },
                url: this.$server.serverUrl + "/Order/ProductComment",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    console.log(response.data);
                }
            });
        },
        uploadChange(event, _index) {
            
            if (event.target.files.length > 0) {
                // var files = event.target.files[0];
                console.log(event.target.files);

                var formData = new FormData(
                    document.getElementById("uploadForm2")[0]
                );
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
                    this.imgData.push(_list);
                    // this.imgData = [...this.imgData, ..._list];
                    console.log(this.imgData);

                    if (this.imgData.length > 9) {
                        // this.imgLength = false;
                    }
                    // var imgData = {};
                    // imgData.PicPath = response.data.FilePath;
                    // imgData.ThumPicPath = response.data.FilePathMin;
                    // this.ImgUrl.push(imgData);
                });
            }
        }
    }
};
</script>
