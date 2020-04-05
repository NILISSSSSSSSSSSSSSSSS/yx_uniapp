<template>
    <view class="writer_view">
        <view class="common-box_" style="padding-bottom: 40upx;">
            <view class="other-text-area">
                <textarea placeholder="请输入跟进内容" maxlength="300" placeholder-style="color:#cccccc" @input="changeTextArea" />
                <view class="p-w-num">{{requireNum}} / 300</view>
            </view>
        </view>

        <view class="confirm_view">
            <view @click="confirmBtn" class="confirm_btn">提交</view>
        </view>

    </view>
</template>

<script>
    import {CreateTrack} from "../../net/CustomerNet";
    import {Config} from "../../config/config";
    import {Const} from "../../utils/Const";

    var param = {};

    export default {
        name: "writeFollow",

        data(){
            return{
                genjin_img : 'http://cdn.haofang.net/static/xffx-uniapp/customer/edit.png',//写跟进图片
                requireNum : 0,
                trackContent : '',
                cityId : '',
                custId : '',
            }
        },
        onLoad(option){
            param = option;
        },

        onShow(){
            this.cityId = param.cityId;
            this.custId = param.custId;
        },

        // 原生按钮
        onNavigationBarButtonTap(e) {
            return;
            if (!e.id) return;

            if (e.id === "submit") {
                if(!this.trackContent) {
                    this.DifferenceApi.showToast("请输入跟进内容~");
                    return;
                }

                if (this.trackContent.length < 10){
                    this.DifferenceApi.showToast("跟进内容最低需要10个字~");
                    return;
                }

                let pa = {
                    cityId:this.cityId,
                    custId:this.custId,
                    trackContent:this.trackContent,
                };
                uni.showLoading({title: '请求中...', mask: Config.mask});
                new CreateTrack(pa).send().then((res)=>{
                    uni.hideLoading();
                    if(res.errCode !== Const.success) {
                        return Promise.reject(res);
                    }

                    this.DifferenceApi.showToast("提交业务跟进成功");
                    setTimeout(() => {
                        uni.navigateBack({
                            delta: 1
                        });
                    }, 1000);
                })
                .catch((res)=>{
                    uni.hideLoading();
                    this.DifferenceApi.showToast(res.errMsg || "请求失败");
                })
            }
        },

        methods : {
            changeTextArea(e){
                this.trackContent = e.detail.value;
                this.requireNum = e.detail.value.length;
            },

            // 提交
            confirmBtn(e){
                if(!this.trackContent) {
                    this.DifferenceApi.showToast("请输入跟进内容~");
                    return;
                }

                if (this.trackContent.length < 10){
                    this.DifferenceApi.showToast("跟进内容最低需要10个字~");
                    return;
                }

                let pa = {
                    cityId:this.cityId,
                    custId:this.custId,
                    trackContent:this.trackContent,
                };
                console.log(pa,'--跟进请求参数--');
                uni.showLoading({title: '请求中...', mask: Config.mask});
                new CreateTrack(pa).send().then((res)=>{
                    uni.hideLoading();
                    if(res.errCode !== Const.success) {
                        return Promise.reject(res);
                    }

                    this.DifferenceApi.showToast("提交业务跟进成功");
                    setTimeout(() => {
                        uni.navigateBack({
                            delta: 1
                        });
                    }, 1000);
                })
                    .catch((res)=>{
                        uni.hideLoading();
                        this.DifferenceApi.showToast(err.errMsg || "请求失败");
                    })
            }
        },

    }
</script>

<style scoped>
    .common-box_ {
        width: 100%;
        height: auto;
        background-color: #ffffff;
        padding: 0 28upx;
        box-sizing: border-box;
    }
    .common-box_ {
        width: 100%;
        height: auto;
        background-color: #ffffff;
        padding: 0 28upx;
        box-sizing: border-box;
    }
    .common-box {
        width: 100%;
        height: 110upx;
        border-bottom: 1upx solid #f5f5f5;
    }
    .other-text-area {
        position: relative;
        width: 100%;
        height: auto;
        background-color: #ffffff;
    }
    .other-text-area>textarea {
        width: 100%;
        height: 380upx;
        background-color: #f6f6f6;
        border-radius: 4px;
        font-size: 30upx;
        padding: 20upx;
        box-sizing: border-box;
    }
    .p-w-num {
        position: absolute;
        right: -30upx;
        bottom: 20upx;
        width: 110upx;
        line-height: 1;
        color: #cccccc;
        font-size: 20upx;
    }

    .writer_view{
        padding-top: 50upx;
        box-sizing: border-box;
    }
    .follow_box{
        margin-bottom: 40upx;
    }
    .follow_box>image{
        width: 30upx;
        height: 30upx;
        margin: auto 0upx auto 35upx;
    }
    .follow_box>text{
        font-size: 28upx;
        color: #333333;
        margin: auto 0upx auto 24upx;
    }
    .area_size{
        color: #cccccc;
        font-size: 30upx;
    }

    .confirm_view{
        padding: 0 40upx;
        box-sizing: border-box;
        width: 100%;
        margin-top: 20upx;
    }
    .confirm_btn{
        width: 100%;
        line-height: 100upx;
        text-align: center;
        height: 100upx;
        background-color: #0084ff;
        border-radius: 10upx;
        box-sizing: border-box;
        font-size: 32upx;
        color: #ffffff;
    }
</style>