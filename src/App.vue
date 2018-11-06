<template>
    <div id="app">
        <!-- <vue-dropzone ref="myVueDropzone" id="dropzone" style="height:1rem" :options="dropzoneOptions"></vue-dropzone> -->

        <router-view />

    </div>
</template>

<script>
// import vue2Dropzone from "vue2-dropzone";
// import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
    name: "App",
    // components: {
    //     vueDropzone: vue2Dropzone
    // },

    data() {
        return {
            // dropzoneOptions: {
            //     url: this.$server.serverUrl + "/UpLoad/Img?dir=0",
            //     thumbnailWidth: 150,
            //     maxFilesize: 0.5,
            //     headers: { "Cache-Control": null },
            // }
        };
    }
};
</script>

<style lang='scss'>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
body {
    margin: 0;
}
.c-white {
    color: #fff !important;
}
.c-red {
    color: #ff6143 !important;
}
.gray {
    color: #ccc;
}
// .aa{
//     color:red;
// }
.green {
    color: #09bb07;
}

.mt-progress-runway {
    background-color: #8a8a8a;
}
// .mt-progress-runway,
// .mt-progress-progress {
//   border-radius: 10px;
// }
.mt-progress-progress {
    background-color: #ff5f17;
}
.titleColor {
    background: linear-gradient(to left, #ea3f32, #ed7947);
}
.orderBtn {
    height: 0.5rem;
    width: 1.4rem;
    border: none;
    border-radius: 5px;
    outline: none;
    margin-top: 0.3rem;
}
.grayBtn {
    background: #fff;
    border: 1px solid;
    color: #555;
}
</style>
