<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {};
    },

    methods: {}
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
.c-red {
    color: red;
}
.gray {
    color: #aaa;
}
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
</style>
