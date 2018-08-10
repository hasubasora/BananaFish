<template>
 <yd-layout>


  <yd-flexbox direction="vertical">
            <yd-flexbox-item>
                二维码
            </yd-flexbox-item>
            <yd-flexbox-item>
                 <yd-flexbox>
                    <yd-flexbox-item><img src="" alt="" width="100" height="100"></yd-flexbox-item>
                    <yd-flexbox-item>
                        <p>坎坎坷坷坎坎坷坷</p>
                        <img src="" alt="">
                        <img src="" alt="">
                    </yd-flexbox-item>
                    <yd-flexbox-item>
                        分红
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-flexbox-item>

            <yd-flexbox-item>
                  <yd-flexbox>
                    <yd-flexbox-item>yd-flexbox-item</yd-flexbox-item>
                    <yd-flexbox-item>
                         <yd-grids-group :rows="2">
                                <yd-grids-item v-for="n in 4">
                                    <span slot="text">grids-3</span>
                                </yd-grids-item>
                            </yd-grids-group>
                    </yd-flexbox-item>
                    <yd-flexbox-item>
                         <yd-button type="primary">提现</yd-button>
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-flexbox-item>

            <yd-flexbox-item>
                <img src="" alt="">
                本期积分收益以开放领取，立即领取

            </yd-flexbox-item>
   </yd-flexbox>














      <yd-cell-group>
        <yd-cell-item arrow>
            <span slot="left">左边内容一</span>
            <span slot="right">右边内容一</span>
        </yd-cell-item>
    </yd-cell-group>

      <yd-tabbar>
        <yd-tabbar-item title="首页" link="#">
            <yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="首页" link="#">
            <yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="购物车" link="#" dot>
            <yd-icon name="shopcart-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="#">
            <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
             <yd-badge slot="badge" type="danger">2</yd-badge>
        </yd-tabbar-item>
        <yd-tabbar-item title="图片" link="#">
            <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png">
        </yd-tabbar-item>
    </yd-tabbar>


<!-- hehuoren -->
    <yd-cell-group>
        <yd-cell-item arrow>
        <span slot="left">合伙人</span>
        <span slot="right"></span>
        </yd-cell-item>
    </yd-cell-group>
    <yd-flexbox>
      <yd-flexbox-item>yd-flexbox-item</yd-flexbox-item>
    </yd-flexbox>
    <!-- hehuoren -->
    <yd-cell-group>
        <yd-cell-item arrow>
        <span slot="left">我的服务</span>
        <span slot="right"></span>
        </yd-cell-item>
    </yd-cell-group>
    <yd-flexbox>
     <yd-grids-group :rows="4" title="等分3列">
        <yd-grids-item v-for="n in 8">
            <span slot="text">grids-3</span>
        </yd-grids-item>
    </yd-grids-group>
    </yd-flexbox>
    <!-- ed -->
 </yd-layout>
</template>
