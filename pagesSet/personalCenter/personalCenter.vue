

<template>
    <view class="cont_view">
        <view class="person_info_view">
            <!--头像-->
            <view class="item f_r_b" @click="chooseAvatar">
                <view class="item_text">头像</view>

                <view class="f_r_e img_view_info">
                    <collectFormId></collectFormId>
                    <view class="img_view">
                        <image @error="imgError" mode="aspectFill" :src="avatar"></image>
                    </view>
                    <image class="arrow_right" src="http://cdn.haofang.net/static/xfldDeveloper/mine/arrow_right.png"></image>
                </view>
            </view>
            <!--姓名-->
            <view class="item f_r_b">
                <view class="item_text">姓名</view>

                <view class="item_val">{{ name }}</view>
            </view>
            <!--联系电话-->
            <view class="item f_r_b">
                <view class="item_text">联系电话</view>

                <view class="item_val">{{ telephone }}</view>
            </view>
            <!--公司名称-->
            <view class="item f_r_b">
                <view class="item_text">公司名称</view>

                <view class="item_val">{{ compName }}</view>
            </view>
            <!--公司地址-->
            <view class="item f_r_b">
                <view class="item_text">公司地址</view>

                <view class="item_val">{{ compAddress }}</view>
            </view>
            <!--所属城市-->
            <view class="item f_r_b">
                <view class="item_text">所属城市</view>

                <view class="item_val">{{ cityName }}</view>
            </view>
        </view>

        <view class="empty_view"></view>
    </view>
</template>

<script>
    import {GetLoginModel, SetLoginModel} from "../../model/LoginSuccessModel";
    import {Utils} from "../../utils/Utils";
    import {Const} from "../../utils/Const";
    import {Config} from "../../config/config";
    import {UserInfoModel} from "../../model/UserInfoModel";
    import {LoginSuccessModel} from "../../model/LoginSuccessModel";
    import {CommonModel} from "../../model/CommonModel";
    import {UploadUserPhoto} from "../../net/SetNet";
    import {LoginApp} from "../../utils/common";
    import {Notify} from "../../utils/Notify";
    import {Notification} from "../../utils/Notification";

    export default {
        data() {
            return {
                avatar: "",
                buildName: "",
                name: "",
                telephone: "",
                compName: "",
                compAddress: "",
                cityName: "",
            }
        },

        onLoad() {
            // 监听个人信息变化
            new Notification().addObserver(this, "PersonalInfoChange", Notify.PersonalInfoChange.Name);
        },

        onShow() {
            this.initData();
        },

        onUnload() {
            new Notification().removeObserverAllNotification(this);
        },

        methods: {
            // 个人信息变化回调
            PersonalInfoChange() {
                this.initData();
            },

            initData() {
                this.name = GetLoginModel.getUserName();
                this.buildName = GetLoginModel.getBuildName();
                this.compName = GetLoginModel.getCompName();
                this.compAddress = GetLoginModel.getCompAddress();
                this.cityName = GetLoginModel.getCityName();
                let telephone = GetLoginModel.getTelephone() || "";
                if (telephone && telephone.length === 11) {
                    telephone = telephone.substring(0,3) + "****"
                        + telephone.substring(telephone.length-4,telephone.length);
                }
                this.telephone = telephone;
                let avatar = Const.imDefaultHeadImg;
                if (GetLoginModel.getUserPhoto()) {
                    avatar = new Utils().dealImgSrcSize(GetLoginModel.getUserPhoto(), 80, 80);
                }
                this.avatar = avatar;
            },

            imgError() {
                this.avatar = Const.imDefaultHeadImg;
            },
            // 更新头像
            chooseAvatar() {
                uni.showActionSheet({
                    itemList: ['拍照', '从手机相册选择'],
                    success: (res) => {
                        this.uploadImg(res.tapIndex === 0 ? "camera" : "album")
                    }
                });
            },
            // 上传图片
            uploadImg(sourceType = "camera") {
                let that = this;
                uni.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: [sourceType],
                    success: function (res) {
                        uni.showLoading({title: '上传中...', mask: Config.mask});
                        new Utils().upLoadImg(res.tempFilePaths[0])
                            .then(res => {
                                if (res.errCode !== Const.success) {
                                    return Promise.reject(res);
                                }

                                uni.hideLoading();
                                let data = res.data || {};
                                if(!data.path || !data.url) return null;

                                let avatar = data.url || "";
                                if (avatar) {
                                    avatar = new Utils().dealImgSrcSize(avatar, 80, 80);
                                }
                                that.avatar = avatar;
                                SetLoginModel.setUserPhoto(data.url || "");
                                return new UploadUserPhoto({userPhoto: data.path}).send();
                            })
                            .then(res => {
                                uni.hideLoading();
                            })
                            .catch(err => {
                                uni.hideLoading();
                                uni.showToast({title: err.errMsg || "上传失败", icon: "none"});
                            })
                    }
                });
            },
        }
    }
</script>

<style>
    page{
        width: 100%;
        height: 100%;
        background-color: #f8f8f8;
    }
    .cont_view{
        width: 100%;
        height: 100%;
        background-color: #f8f8f8;
        overflow-y: auto;
        padding-top: 20upx;
        box-sizing: border-box;
    }
    .person_info_view{
        padding: 0 40upx;
        box-sizing: border-box;
        background-color: #ffffff;
    }
    .item:last-child{
        border-bottom: none;
    }
    .item{
        height: 120upx;
        border-bottom: 1upx solid #ebebeb;
        box-sizing: border-box;
        line-height: 120upx;
        align-items: center;
    }
    .item_text{
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        color: #191f25;
        font-weight: bold;
        flex-shrink: 0;
    }
    .img_view_info{
        align-items: center;
        flex-shrink: 0;
    }
    .img_view{
        width: 70upx;
        height: 70upx;
        margin: auto 30upx auto 0;
        flex-shrink: 0;
        border-radius: 100%;
        overflow: hidden;
    }
    .img_view>image{
        width: 100%;
        height: 100%;
        display: flex;
    }
    .arrow_right{
        width: 15upx;
        height: 28upx;
        flex-shrink: 0;
        margin: auto 0;
    }
    .item_val{
        font-size: 30upx;
        color: #a3a5a8;
        text-align: right;
        max-width: 100%;
        padding-left: 40upx;
        box-sizing: border-box;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .sign_out{
        height: 120upx;
        line-height: 120upx;
        background-color: #ffffff;
        text-align: center;
        font-family: PingFang-SC-Medium;
        font-size: 32upx;
        color: #fa5741;
        margin-top: 20upx;
    }
    .empty_view{
        height: 30upx;
        width: 100%;
    }
</style>
