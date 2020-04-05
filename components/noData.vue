
<template>
    <view class="no_data">
        <view class='no-pic'></view>
        <view class='no-txt'>暂无内容</view>
    </view>
</template>

<script>
    export default {
        name: "noData"
    }
</script>

<style scoped>
    .no_data {
        position: relative;
        top: 400upx;
        width: 100%;
        height: 400upx;
    }
    .no-pic {
        margin: 0 auto;
        width: 240upx;
        height: 302upx;
        background: url('http://cdn.haofang.net/static/xffx-uniapp/customer/no_data.png') no-repeat center;
        background-size: 100%;
    }
    .no-txt {
        width: 100%;
        text-align: center;
        font-size: 26upx;
        color: #c0c1c3;
    }
</style>