<template>
    <view class="box">
        <view style="height: 90%;width: 100%">
            <view class="top_cont f_r_e" v-if="photoUrl && isShowDeleteButton">
                <!--删除带看确认书按钮按钮-->
                <view @click.stop="deleteDaiKanQueRenShu" class="list_person_view f_r_e">
                    <image class="list_person" src="http://cdn.haofang.net/static/xfldDeveloper/customer/delete_up.png"></image>
                </view>
            </view>


            <view v-if="!photoUrl">
                <view class="no_data">
                    <view class='no-pic'></view>
                    <view class='no-txt'>为了不影响您成交收佣，请及时上传带看确认书！</view>
                    <view class="confirm_view f_r_s" @click="uploadImg">
                        <view class="confirm_btn">立即上传</view>
                    </view>
                </view>
            </view>
            <view class="f_c_c" v-if="photoUrl" style="height: 100%;width: 100%">
                <image class="seeread_img" mode="widthFix" :src="photoUrl" @click.stop="LookLookView"></image>
            </view>

            <showModal :modal='{
            title: "温馨提示",
            content: "确定删除带看确认书?",
            confirmText: "删除",
            cancelText: "再等等",
            cancelColor: "#3396fb",
            confirmColor: "#3396fb",
        }' ref="modal" @onModalChanged="onModalChanged"></showModal>

        </view>
    </view>

</template>

<script>
    import {Utils} from "../../utils/Utils";
    import {DeleteSeeReadConfirmation, UploadSeeReadConfirmation} from "../../net/CustomerNet";
    import {Const} from "../../utils/Const";

    var param = {}; //请求参数

    export default {
        name: "upDaiKanQueRenShu",
        data(){
            return{
                photoUrl : '',
                isShowDeleteButton : false,
            }
        },

        onLoad(option){
            param = option;
            console.log(param,'--带看确认书页接受参数--');
            // 如果传了带看确认书 且状态小于5显示删除按钮
            if (option.photoUrl && param.custStatus <= 4){
                this.isShowDeleteButton = true;
            }
            this.photoUrl = option.photoUrl || '';
        },

        onShow(){
            console.log(param,'上传带看确认书----param');
        },

        methods:{
            // 上传图片
            uploadImg() {
                let that = this;
                uni.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: ['camera'],
                    success: function (res) {
                        uni.showLoading({title: '上传中...'});
                        new Utils().upLoadImg(res.tempFilePaths[0])
                            .then(res => {
                                if (res.errCode !== Const.success) {
                                    return Promise.reject(res);
                                }

                                uni.hideLoading();
                                let data = res.data || {};
                                if(!data.path || !data.url) return null;

                                let photoUrl = data.url || "";
                                that.photoUrl = photoUrl;
                                return new UploadSeeReadConfirmation({photoUrl: photoUrl,brokerCityId:param.brokerCityId,custId:param.custId}).send();
                            })
                            .then(res => {
                                if (param.custStatus <= 5){
                                    that.isShowDeleteButton = true;
                                }
                                uni.hideLoading();
                            })
                            .catch(err => {
                                console.log('err',err);
                                uni.hideLoading();
                                uni.showToast({title: err.errMsg || "上传失败", icon: "none"});
                            })
                    }
                });
            },

            deleteDaiKanQueRenShu(){
                this.$refs.modal.show();
            },

            LookLookView(){
                // 预览图片
                uni.previewImage({
                    urls: [this.photoUrl]
                });
            },

            onModalChanged(option){
                if (!option) return;

                new DeleteSeeReadConfirmation({brokerCityId:param.brokerCityId,custId:param.custId}).send().then((res)=>{
                    if (res.errCode != Const.success){
                        this.DifferenceApi.showToast(res.errMsg || '删除失败');
                    }
                    this.photoUrl = '';
                });
            },
        }
    }
</script>

<style>
    .box{
        width: 100%;
        height: 100%;
    }
    .top_cont{
        height: 80upx;
        line-height: 80upx;
        padding: 0 40upx;
        box-sizing: border-box;
        flex: 0;
        background-color: #ffffff;
        align-items: center;
    }
    .top_cont_text{
        font-family: PingFang-SC-Bold;
        font-size: 48upx;
        font-weight: bold;
        font-stretch: normal;
        color: #191f25;
    }
    .list_person_view{
        height: 100%;
        width: 80upx;
    }
    .list_person{
        width: 45upx;
        height: 48upx;
        flex-shrink: 0;
        margin: auto 0 30upx auto;
    }

    page{
        width: 100%;
        height: 100%;
    }
    .no_data {
        position: relative;
        top: 400upx;
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
        font-size: 26upx;
        color: #c0c1c3;
        margin-top: 50upx;
    }

    .confirm_btn{
        width: 38%;
        line-height: 70upx;
        text-align: center;
        height: 70upx;
        background-color: #0084ff;
        border-radius: 6upx;
        box-sizing: border-box;
        font-size: 32upx;
        color: #ffffff;
        margin: auto;
    }
    .confirm_view{
        padding: 0 30upx;
        box-sizing: border-box;
        width: 100%;
        margin: 40upx auto auto auto;
    }
    .seeread_img{
        width: 100%;
    }

    .add{
        position: fixed;
        right: 48upx;
        bottom: 54upx;
        width: 90upx;
        height: 90upx;
    }
</style>