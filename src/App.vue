<template>
    <div id="app">
        <router-view v-if="isRouterAlive"/>

    </div>
</template>

<script>
// import vue2Dropzone from "vue2-dropzone";
// import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
    name: "App",
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isRouterAlive:true
        };
    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(function() {
                this.isRouterAlive = true
            })
        }
    }
};
</script>

<style lang='scss'>
html,body,#app{
  height: 100%;
}
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
