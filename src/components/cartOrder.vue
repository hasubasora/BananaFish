<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="订单提交">
            <router-link to="#" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <div>  
             <yd-cell-group>
            <yd-cell-item>
                <span slot="left">左边内容一</span>
                <span slot="right">右边内容一</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">左边内容二</span>
                <span slot="right">右边内容二</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">左边内容一</span>
                <span slot="right">右边内容一</span>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">左边内容二</span>
                <span slot="right">右边内容二</span>
            </yd-cell-item>
        </yd-cell-group></div>
            <yd-cell-group>
                <yd-cell-item >
                    <span slot="left">应付123456</span>
                    <span slot="right"><button type="submit" style="background:red;height:1rem;border:none;width:2rem">去付款</button></span>
                </yd-cell-item>
            </yd-cell-group>
       <yd-flexbox>
            <yd-flexbox-item>
                <p>空空</p>
                <i>默认</i>
            </yd-flexbox-item>
            <yd-flexbox-item>
                <p>1333333333</p>
                <p>广东省 广州市 天河区 珠江新城华强路1号广东省 广州市 天河区 珠江新城华强路1号</p>
            </yd-flexbox-item>
        </yd-flexbox>

             <yd-flexbox>
               <img src="" alt="">
            <yd-flexbox-item>
                <p><strong>标题你知道有多长吗我知道啊标题你知道有多长吗我知道啊</strong><span>x1</span></p>
           
              <span>￥22222</span>
            </yd-flexbox-item>
        </yd-flexbox>

    </yd-layout>
</template>
<script>
export default {};
</script>