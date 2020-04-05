
<template>
    <view class="no_data">
        <view class='no-pic'></view>
        <view class='no-txt'>暂时没有置业顾问</view>
        <view class="confirm_view f_r_s">
            <view @click="add" class="confirm_btn">添加顾问</view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "noData",

        methods : {
            add(){
                uni.navigateTo({
                    url: '/pagesStaff/addStaff/addStaff'
                });
            }
        }
    }
</script>

<style scoped>
    .no_data {
        position: relative;
        top: 300upx;
        width: 100%;
        height: 400upx;
    }
    .no-pic {
        margin: 0 auto;
        width: 374upx;
        height: 168upx;
        background: url('http://cdn.haofang.net/static/xfldDeveloper/customer/no_yuangong.png') no-repeat center;
        background-size: 100%;
    }
    .no-txt {
        width: 100%;
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #c0c1c3;
        text-align: center;
        margin-top: 50upx;
    }
    .confirm_btn{
        margin: auto;
        width: 280upx;
        line-height: 90upx;
        text-align: center;
        height: 90upx;
        background-color: #0084ff;
        border-radius: 10upx;
        box-sizing: border-box;
        font-size: 32upx;
        color: #ffffff;
    }
    .confirm_view{
        box-sizing: border-box;
        width: 100%;
        margin-top: 50upx;
    }
</style>