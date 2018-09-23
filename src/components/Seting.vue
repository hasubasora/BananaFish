<template>
    <div>
        <yd-navbar title="设置">
            <router-link to="/MyInfo" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <router-link to="#" slot="right">
                <!-- <yd-navbar-next-icon></yd-navbar-next-icon> -->
            </router-link>
        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item arrow type="a" href="tel:400-888-8888">
                <span slot="left">用户名</span>
                <span slot="right"> </span>
            </yd-cell-item>
            <yd-cell-item arrow type="link" href="#">
                <span slot="left">手机号</span>
                <span slot="right">133***3333</span>
            </yd-cell-item>
            <yd-cell-item arrow type="link" href="#">
                <span slot="left">意见反馈</span>
                <span slot="right"> </span>
            </yd-cell-item>
            <yd-cell-item arrow type="label">
                <span slot="left">版本信息</span>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">更新内容</span>
            </yd-cell-item>
        </yd-cell-group>
    </div>
</template>