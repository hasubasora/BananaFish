<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
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
.mt-progress-runway {
  background-color: #8a8a8a;
}
.mt-progress-runway,
.mt-progress-progress {
  border-radius: 10px;
}
.mt-progress-progress {
  background-color: #ff5f17;
}

@font-face {
  font-family: "iconfont"; /* project id 784766 */
  src: url("//at.alicdn.com/t/font_784766_11iejsqo3nw.eot");
  src: url("//at.alicdn.com/t/font_784766_11iejsqo3nw.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_784766_11iejsqo3nw.woff") format("woff"),
    url("//at.alicdn.com/t/font_784766_11iejsqo3nw.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_784766_11iejsqo3nw.svg#iconfont") format("svg");
}


</style>
