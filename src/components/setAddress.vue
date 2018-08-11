<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="地址编辑">
            <router-link to="#" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
               <router-link to="#" slot="right">
               保存
            </router-link>
        </yd-navbar>

     
     <yd-cell-group>
        <yd-cell-group>
            <yd-cell-item arrow>
                <span slot="left">所在地区：</span>
                <input slot="right" type="text" @click.stop="show2 = true" v-model="model2" readonly placeholder="请选择收货地址">
            </yd-cell-item>
        </yd-cell-group>

        <yd-cityselect
                v-model="show2"
                ref="cityselectDemo"
                :callback="result2"
                :items="district"
                provance="新疆"
                city="乌鲁木齐市"
                area="天山区"
        ></yd-cityselect>
        <yd-cell-item>
            <input slot="right" type="text" placeholder="门牌号">
        </yd-cell-item> 
        <yd-cell-item>
            <span slot="left">手机号：</span>
            <input slot="right" type="number" placeholder="请输入手机号">
        </yd-cell-item>
          <yd-cell-item>
            <span slot="left">用户名：</span>
            <yd-input slot="right" required v-model="input1" max="20" placeholder="请输入用户名"></yd-input>
        </yd-cell-item>
        <yd-cell-item arrow type="label">
            <select slot="right">
                <option value="">支付方式</option>
                <option value="1">支付宝</option>
                <option value="2">微信</option>
                <option value="3">财付通</option>
            </select>
        </yd-cell-item>
        
        <yd-cell-item arrow type="label">
            <span slot="left">性别：</span>
            <select slot="right">
                <option value="">请选择性别</option>
                <option value="1">男</option>
                <option value="2">女</option>
                <option value="3">未知</option>
            </select>
        </yd-cell-item>

         <div>
        <yd-switch v-model="switch1"></yd-switch>
        <p>【model: switch1 = {{switch1}}】</p>
    </div>
    </yd-cell-group>

    </yd-layout>
</template>
<script>
 /* 前提是已经安装了 ydui-district */
    import District from 'ydui-district/dist/jd_province_city_area_id';

    export default {
        data() {
            return {
                show2: false,
                model2: '新疆 乌鲁木齐市 天山区',
                district: District,
                input1:'',
                 switch1: false
            }
        },
        methods: {
            result2(ret) {
                this.model2 = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
            }
        }
    }
</script>