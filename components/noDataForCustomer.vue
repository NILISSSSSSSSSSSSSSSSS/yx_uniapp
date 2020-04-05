
<template>
    <view class="no_data">
        <view class='no-pic'></view>
        <view class='no-txt'>{{ text }}</view>
    </view>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                default() {
                    return "暂时没有客户信息";
                }
            }
        }
    }
</script>

<style scoped>
    .no_data {
        position: relative;
        top: 270upx;
        width: 100%;
        height: 400upx;
    }
    .no-pic {
        margin: 0 auto;
        width: 374upx;
        height: 176upx;
        background: url('http://cdn.haofang.net/static/xfldDeveloper/customer/no_customer.png') no-repeat center;
        background-size: 100%;
    }
    .no-txt {
        width: 100%;
        text-align: center;
        font-size: 30upx;
        color: #c0c1c3;
        margin-top: 40upx;
    }
</style>
