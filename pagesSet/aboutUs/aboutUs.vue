

<template>
    <view class="about_us f_c_s">
        <image class="about_logo" src="http://cdn.haofang.net/static/xfldDeveloper/mine/about_logo_info.png"></image>

        <view class="cont">
            <view class="title">新房联动赢销平台</view>

            <view class="cont_subject f_r_s"><view>软件版本：</view>V1.0</view>
            <view class="cont_subject f_r_s"><view>官方微信：</view>hftsoft</view>
            <view @click="takePhone" class="cont_subject f_r_s"><view>客服电话：</view>{{servicePhone}}</view>
        </view>

        <view class="empty_view"></view>
        <view class="bottom_info">成都好房通科技股份有限公司版权所有</view>

        <show-modal ref="modal" :modal="{
            title: '拨打电话',
            content: servicePhone,
            confirmText: '呼叫',
        }" @onModalChanged="onModalChanged"></show-modal>
    </view>
</template>

<script>
    import {Const} from "../../utils/Const";
    import showModal from "@/components/showModal.vue";

    export default {
        components: {showModal},

        data() {
            return {
                servicePhone: Const.servicePhone
            }
        },

        methods: {
            // 拨打电话
            takePhone() {
                this.$refs.modal.show();
            },

            onModalChanged(val) {
                if (val) {
                    this.DifferenceApi.makePhoneCall(this.servicePhone);
                }
            }
        }
    }
</script>

<style>
    page{
        background-color: #f8f8f8;
        width: 100%;
        height: 100%;
    }
    .about_us{
        background-color: #f8f8f8;
        width: 100%;
        height: 100%;
    }
    .about_logo{
        width: 160upx;
        height: 173upx;
        margin: 184upx auto 0;
    }
    .cont{
        width: 100%;
        background-color: #f8f8f8;
        z-index: 9;
        position: relative;
        margin-top: 20upx;
    }
    .title{
        width: 100%;
        text-align: center;
        font-family: "FZZCHJW--GB1-0";
        font-size: 37upx;
        font-weight: bold;
        font-stretch: normal;
        line-height: 60upx;
        color: #595656;
        margin-bottom: 95upx;
    }
    .cont_subject{
        text-align: center;
        font-family: PingFang-SC-Medium;
        font-size: 26upx;
        line-height: 50upx;
        color: #191f25;
        align-items: center;
        padding-left: 224upx;
        box-sizing: border-box;
    }
    .cont_subject>view{
        color: #a3a5a8;
        padding-right: 16upx;
        box-sizing: border-box;
    }
    .bottom_info{
        font-family: PingFang-SC-Medium;
        font-size: 26upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 42upx;
        color: #a3a5a8;
        width: 100%;
        text-align: center;
        position: fixed;
        bottom: 110upx;
        left: 0;
    }
    .empty_view{
        height: 160upx;
        width: 100%;
    }
</style>
