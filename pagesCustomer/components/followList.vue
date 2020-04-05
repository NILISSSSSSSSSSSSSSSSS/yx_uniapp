
<!--跟进列表-->
<template>
    <view>
        <view class="box f_r_s" v-for="(item,index) in trackList" :key="index">
            <view class="left_box f_c_s">
                <view class="spot"></view>
                <view class="line"></view>
            </view>
            <view class="right_box">
                <view class="time">{{item.trackTime}}</view>
                <view class="right_item">
                    <view class="right_box_title">{{item.trackUser}}</view>
                    <view class="right_box_content" v-for="(val,key) in item.trackContent" :key="key">
                        <view>{{val}}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "followList",
        props: {
            trackList: {
                type: Array,
                default : [],
            }
        },

    }
</script>

<style scoped>
    .box{
        padding: 0 35upx;
        box-sizing: border-box;
    }
    .left_box{
        margin-right: 20upx;
        flex-shrink: 0;
        position: relative;
        top: 0;
        left: 0;
    }
    .right_box{
        width: 100%;
        margin-bottom: 40upx;
        align-items: center;
    }
    .spot{
        width: 11upx;
        height: 11upx;
        background-color: #bbbbbb;
        border-radius: 50%;
        margin: 8.5upx auto auto auto;
    }
    .line{
        width: 1px;
        height: 88%;
        background-color: #e7e7e7;
        margin: 8.5upx auto auto auto;
    }
    .time{
        font-size: 26upx;
        line-height: 28upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #999999;
    }
    .right_item{
        background-color: #FFFFFF;
        border-radius: 6px;
        margin-top: 30upx;
        /*padding: 0upx 0upx 0upx 0upx;*/
        width: 100%;
        box-sizing: border-box;
    }
    .right_box_title{
        font-size: 30upx;
        line-height: 32upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        margin-bottom: 20upx;
    }
    .right_box_content{
        font-size: 24upx;
        line-height: 34upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #999999;
    }
</style>