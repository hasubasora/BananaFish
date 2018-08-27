<template>
<div>
    <yd-navbar title="设置">
        <router-link to="#" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
        <router-link to="#" slot="right">
            <!-- <yd-navbar-next-icon></yd-navbar-next-icon> -->
        </router-link>
    </yd-navbar>
    <yd-cell-group>
        <yd-cell-item arrow type="a" href="tel:400-888-8888">
            <span slot="left">这里是一个A链接</span>
            <span slot="right">href不会解析</span>
        </yd-cell-item>
        <yd-cell-item arrow type="link" href="#">
            <span slot="left">手机号</span>
            <span slot="right">133***3333</span>
        </yd-cell-item>
        <yd-cell-item arrow type="link" href="#">
            <span slot="left">意见反馈</span>
            <span slot="right">href会解析为路由</span>
        </yd-cell-item>
        <yd-cell-item arrow type="label">
            <span slot="left">这里是一个Label</span>
        </yd-cell-item>
        <yd-cell-item arrow>
            <span slot="left">这里是一个普通DIV</span>
        </yd-cell-item>
    </yd-cell-group>
</div>
</template>