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
                    <vue-dropzone ref="myVueDropzone" id="dropzone" :disabled=isBtn :options="dropzoneOptions" @click.native="GetIndex(index)" @vdropzone-success="vsuccess"></vue-dropzone>
                </div>
                <!-- <div class="divImg">
                    <img :src="itemImg" alt="" v-for="(itemImg, _index) in my_array[index]" :key="_index">
                    <form id="uploadForm2" name="imgForm" enctype="multipart/form-data" method='post'>
                        <img class="upImg" src="../assets/Img/upload.png" alt="" width="100">
                        <input @change="uploadChange($event,index)" :disabled=isBtn type="file" name="files" id="upInput" accept="image/*" multiple="multiple">
                    </form>
                </div> -->

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
#dropzone {
    padding: 0.1rem;
    .dz-preview {
        height: 1rem;
        width: 1.2rem;
        min-height: 1.2rem;
        // border: 1px solid red;
        margin: 0 0 0.16rem 0.16rem;
        .dz-image {
            img {
                width: 100%;
                height: 100%;
            }
        }
        .dz-success-mark {
            top: 0.1rem;
        }
        .dz-preview {
            top: 0.1rem;
        }
        .dz-error-mark {
            top: 0.1rem;
        }
        .dz-remove {
            position: absolute;
            z-index: 30;
            color: white;
            margin-left: 0;
            padding: 0;
            top: -0.2rem;
            right: -0.2rem;
            background: #ccc;
            bottom: 0;
            border-radius: 50px;
            width: 0.3rem;
            height: 0.3rem;
            border: 2px white solid;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 0.1rem;
            font-weight: 800;
            letter-spacing: 1.1px;
            opacity: 1;
        }
    }
}
</style>
<script>
import { LOGIN_SUCCESS } from "../main.js";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
    name:'GeneralItemDescription',
    data() {
        return {
            btns: [],
            rows: [],
            ComList: [],
            something: [],
            my_array: [],
            OrderId: 0,
            isBtn: false,
            dropzoneOptions: {
                url: this.$server.serverUrl + "/UpLoad/Img?dir=0",
                thumbnailWidth: null,
                maxFilesize: 2,
                headers: { "Cache-Control": null },
                uploadMultiple: true,
                acceptedFiles: "image/jpeg,image/png,image/gif",
                // // addRemoveLinks: true,
                dictDefaultMessage: "上传评论图片",
                dictFileTooBig: "图片不能超过2M",
                dictResponseError: "文件上传错误！",
                dictInvalidFileType: "图片类型不正确",
                dictRemoveFile: "X",
                // parallelUploads: 10,
                // thumbnailMethod: "crop",
                // maxThumbnailFilesize: 2
                addRemoveLinks: true //
            }
        };
    },
    components: {
        vueDropzone: vue2Dropzone
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
                LOGIN_SUCCESS(response.data.success);
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
            // return;
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
                LOGIN_SUCCESS(response.data.success);
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
                    this.$dialog.toast({
                        mes: response.data.msg,
                        timeout: 1500,
                        icon: "error"
                        // callback: () => {
                        //     this.$dialog.alert({ mes: "给你一次重来的机会！" });
                        // }
                    });
                }
            });
        },
        //原生上传图
        uploadChange(event, _index) {
            if (event.target.files.length > 0) {
                var files = event.target.files[0];
                console.log(event.target.files);
                this.type = files.type;
                // 如果没有文件类型，则通过后缀名判断（解决微信及360浏览器无法获取图片类型问题）
                if (!this.type) {
                    this.type = this.mime[file.name.match(/\.([^\.]+)$/i)[1]];
                }
                var formData = new FormData(
                    document.getElementById("uploadForm2")[0]
                );

                console.log(formData);

                if (event.target.files.length > 10) {
                    this.$dialog.toast({
                        mes: "上传图片最多十张！",
                        timeout: 1500
                    });
                    return;
                }
                for (const iterator of event.target.files) {
                    console.log(iterator.type);
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
                    this.$set(this.my_array, _index, _list);
                    console.log(_list);
                    console.log(this.my_array);
                });
            }
        },
        vsuccess(file, response) {
            switch (response.success) {
                case 200:
                    const _list = response.paths;
                    this.$set(this.my_array, this._GetIndex, _list);
                    console.log(_list);
                    console.log(this.my_array);
                    break;
                case 300:
                    this.$dialog.toast({
                        mes: response.msg,
                        timeout: 1500,
                        icon: "error",
                        callback: () => {
                            this.$dialog.alert({ mes: "给你一次重来的机会！" });
                        }
                    });
                    break;
                default:
                    break;
            }
        },
        GetIndex(i) {
            this._GetIndex = i;
        }
    }
};
</script>
