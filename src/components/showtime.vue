<template>
    <div class="fh_title">
        <img :src=TimeSrc.TitleSrc>
        <router-link class="fh_title_all" to="/menuThree/0">{{TimeSrc.Title}}<img src="../assets/Img/r.png" alt=""></router-link>
    </div>
</template>
<style lang="scss">
.fh_title {
    position: relative;
    padding: 0.2rem;
    > img {
        width: auto;
        height: 0.26rem;
    }
    .fh_title_all {
        font-size: 0.26rem;
        line-height: 0.2rem;
        position: absolute;
        right: 0.2rem;
        text-decoration: none;
        color: #444;
        > img {
            height: 0.25rem;
            vertical-align: sub;
            width: auto;
            padding-left: 0.2rem;
        }
    }
}
</style>
<script>
export default {
    name: "showtime",
    props: ["TimeSrc"],
    data() {
        return {};
    }
};
</script>

