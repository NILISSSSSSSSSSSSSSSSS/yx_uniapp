
<!--展示报备客户状态组件-->
<template>
    <view class="box f_r_c" v-if="custStatus == -3 || custStatus == -2 || custStatus == -1 || custStatus == 0 || custStatus == 7">
        <view class="one_box f_c_s">
            <view class="line_no"></view>
            <image mode="widthFix" class="status_img_no" :src="noStatusImgList"></image>
            <text class="no_status_text">报备</text>
        </view>
        <view class="one_box">
            <view class="line_no"></view>
        </view>
        <view class="one_box f_c_s">
            <view class="line_no"></view>
            <image mode="widthFix" class="status_img_no" :src="noStatusImgList"></image>
            <text class="no_status_text">认购</text>
        </view>
        <view class="one_box">
            <view class="line_no"></view>
        </view>
        <view class="one_box f_c_s">
            <view class="line_none"></view>
            <image mode="widthFix" class="status_img_no" :src="noStatusImgList"></image>
            <text class="no_status_text">签约</text>
        </view>

        <!--已结佣icon-->
        <image class="status_icon" mode="widthFix" :src="icons[custStatus]"></image>
    </view>
    <view class="box f_r_c" v-else>
        <view class="one_box f_c_s">
            <view class="line_yes" v-if="custStatus>=4"></view>
            <view class="line_no" v-else></view>
            <image mode="widthFix" class="status_img_yes" :src="hasStatusImgList" v-if="custStatus>=3"></image>
            <image mode="widthFix" class="status_img_no" :src="noStatusImgList" v-else></image>
            <text class="is_status_text" v-if="custStatus>=3">报备</text>
            <text class="no_status_text" v-else>报备</text>
        </view>
        <view class="one_box">
            <view class="line_yes" v-if="custStatus>=4"></view>
            <view class="line_no" v-else></view>
        </view>
        <view class="one_box f_c_s">
            <view class="line_yes" v-if="custStatus>=5"></view>
            <view class="line_no" v-else></view>
            <image mode="widthFix" class="status_img_yes" :src="hasStatusImgList" v-if="custStatus>=4"></image>
            <image mode="widthFix" class="status_img_no" :src="noStatusImgList" v-else></image>
            <text class="is_status_text" v-if="custStatus>=4">认购</text>
            <text class="no_status_text" v-else>认购</text>
        </view>
        <view class="one_box">
            <view class="line_yes" v-if="custStatus>=5"></view>
            <view class="line_no" v-else></view>
        </view>
        <view class="one_box f_c_s">
            <view class="line_none"></view>
            <image mode="widthFix" class="status_img_yes" :src="hasStatusImgList" v-if="custStatus>=5"></image>
            <image mode="widthFix" class="status_img_no" :src="noStatusImgList" v-else></image>
            <text class="is_status_text" v-if="custStatus>=5">签约</text>
            <text class="no_status_text" v-else>签约</text>
        </view>

        <!--已结佣icon-->
<!--        <image class="status_icon" v-if="custStatus==6 && paidStatus==1" mode="widthFix" :src="icons[6]"></image>-->
    </view>
</template>

<script>
    export default {
        name: "screenCustomer",

        props: {
            custStatus: {
                type: Number,
                default: -1000, //-3:带看过期 -2:报备过期 -1:撤销 0:无效 1:报备 2:审核 3:带看 4:认购 5:签约 6:结佣 7:退佣 8.提交
            },
            paidStatus: {
                type: Number,
                default: 0 //佣金拨付  0:未支付  1:已支付  2:支付中
            },
        },
        data(){
            return{
                icons:{
                    '-3':'http://cdn.haofang.net/static/xffx-uniapp/customer/daikanguoqi.png',
                    '-2':'http://cdn.haofang.net/static/xffx-uniapp/customer/baobeiguoqi.png',
                    '-1':'http://cdn.haofang.net/static/xffx-uniapp/customer/chaxiaorengou.png',
                    '0':'http://cdn.haofang.net/static/xffx-uniapp/customer/wuxiaokehu.png',
                    // '6':'http://cdn.haofang.net/static/xffx-uniapp/customer/yijieyong_icon.png',
                    // '7':'http://cdn.haofang.net/static/xffx-uniapp/customer/yituiyong.png',//  直客无 已退佣
                },

                //蓝色流程
                hasStatusImgList:"http://cdn.haofang.net/static/xfldDeveloper/customer/active_blue.jpg",

                //灰色流程
                noStatusImgList:"http://cdn.haofang.net/static/xfldDeveloper/customer/default_gray.png",

            }
        },
    }
</script>

<style scoped>
    .box{
        margin-left: 35upx;
        margin-right: 35upx;
        margin-bottom: 10upx;
    }
    .one_box{
        width: 20%;
        /*align-items: center;*/
    }

    .status_icon{
        width: 123upx;
        height: 122upx;
        position: absolute;
        right: 12upx;
        top: -76upx;
    }
    .status_icons{
        width: 123upx;
        height: 122upx;
        position: absolute;
        right: 12upx;
        top: -76upx;
    }

    /*步骤图片样式*/
    .status_img_yes{
        width: 30upx;
        height: 30upx;
        margin: 27upx auto 5upx auto;
    }
    .status_img_no{
        width: 20upx;
        height: 20upx;
        margin: 32upx auto 5upx auto;
    }

    /*3种线样式*/
    .line_yes{
        background-color: #74a2ff;
        width: 100%;
        height: 2px;
        position: relative;
        top: 43upx;
        left: 50%;
    }
    .line_no{
        background-color: #ebebeb;
        width: 100%;
        height: 2px;
        position: relative;
        top: 43upx;
        left: 50%;
    }
    .line_none{
        background-color: #FFFFFF;
        width: 100%;
        height: 2px;
        position: relative;
        top: 43rpx;
        left: 50%;

    }

    /*2种步骤字体样式*/
    .is_status_text{
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        text-align: center;
    }
    .no_status_text{
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #c0c1c3;
        text-align: center;
    }
    .belonger_name{
        font-family: PingFang-SC-Medium;
        font-size: 24upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 70upx;
        letter-spacing: 0upx;
        color: #a3a5a8;
        text-align: center;
    }

</style>