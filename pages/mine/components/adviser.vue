<template>
    <view class="mine_view">
        <view class="title_view"></view>

        <view class="me_title">我的</view>

        <view class="top_cont">
            <view class="avatar_view f_r_s">
                <view class="avatar_cont" @click="chooseAvatar">
                    <image @error="avatarError" class="avatar" mode="aspectFill" :src="avatar"></image>
                </view>

                <view class="build_name">{{ buildName }}</view>
            </view>

            <view class="top_info_view f_r_c">
                <view class="f_c_c top_info_item">
                    <view class="top_info_num">{{ daiKanNum }}</view>
                    <view class="top_info_text">带看数(组)</view>
                </view>
                <view class="f_c_c top_info_item">
                    <view class="top_info_num">{{ dealNum }}</view>
                    <view class="top_info_text">签约数(组)</view>
                </view>
                <view class="f_c_c top_info_item">
                    <view class="top_info_num">{{ jieYongNum }}</view>
                    <view class="top_info_text">结佣数(套)</view>
                </view>
            </view>
        </view>

        <view style="height: 48upx;width: 100%"></view>
        <block v-for="(item, index) in btnList" :key="index">
            <view class="btn_view f_r_b" @click.stop="goToPage(item)">
                <view class="btn_text">{{ item.text }}</view>

                <image class="arrow_right" src="http://cdn.haofang.net/static/xfldDeveloper/mine/arrow_right.png"></image>
            </view>
        </block>
        <view style="height: 20upx;width: 100%"></view>
    </view>
</template>

<script>
    import {Notify} from "../../../utils/Notify";
    import {Notification} from "../../../utils/Notification";
    import {GetLoginModel, SetLoginModel} from "../../../model/LoginSuccessModel";
    import {GetStatisticalAnalysis} from "../../../net/StatisticsNet";
    import {Const} from "../../../utils/Const";
    import {Utils} from "../../../utils/Utils";
    import {UploadUserPhoto} from "../../../net/SetNet";
    import {Config} from "../../../config/config";

    export default {
        data() {
            return {
                avatar: "",
                buildName: "",
                daiKanNum: "",  // 带看数
                dealNum: "",  // 签约数
                jieYongNum: "",  // 结佣数
                btnList: [
                    {text: "我的楼盘", pageToUrl: "/pagesBuild/buildDetail/buildDetail?buildId="+GetLoginModel.getBuildId()},
                    {text: "个人中心", pageToUrl: "/pagesSet/personalCenter/personalCenter"},
                    {text: "通用设置", pageToUrl: "/pagesSet/setPage/setPageAdviser"},
                    {text: "关于我们", pageToUrl: "/pagesSet/aboutUs/aboutUs"}
                ]
            }
        },

        created() {
            this.initData();
            new Notification().addObserver(this, "PageShowChange", Notify.PageShowChange.Name);
            new Notification().addObserver(this, "LoginSuccessChange", Notify.LoginSuccessChange.Name);
        },

        destroyed() {
            new Notification().removeObserverAllNotification(this);
        },

        methods: {
            // 登陆成功回调
            LoginSuccessChange() {
                this.initData();
            },

            PageShowChange(name, params) {
                if (params.source === "mine") {
                    this.initData();
                }
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

            // 初始化登录信息
            initData() {
                let avatar = Const.imDefaultHeadImg;
                if (GetLoginModel.getUserPhoto()) {
                    avatar = new Utils().dealImgSrcSize(GetLoginModel.getUserPhoto(), 100, 100);
                }
                this.avatar = avatar;
                this.buildName = GetLoginModel.getBuildName() || "";
                // "statisitcType": "(byte)0=个人 1=项目",
                // "timeSegmentation": "(byte)时间分段 0=周 1=月"
                new GetStatisticalAnalysis({statisitcType: 0, timeSegmentation: 1}).send()
                    .then(res => {
                        if (res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        // "dealCount": "(int32)签约数量"
                        // "seeCount": "(int32)带看数量"
                        // "settleCount": "(int32)结佣数量"
                        let data = res.data || {};
                        this.daiKanNum = data.seeCount || "0";
                        this.dealNum = data.dealCount || "0";
                        this.jieYongNum = data.settleCount || "0";
                    })
                    .catch(err => {
                        this.DifferenceApi.showToast(err.errMsg || "获取楼盘信息失败");
                    });
            },

            // 页面跳转
            goToPage(item) {
                uni.navigateTo({
                    url: item.pageToUrl
                });
            },

            avatarError() {
                this.avatar = Const.imDefaultHeadImg;
            }
        }
    }
</script>

<style>
    pages{
        width: 100%;
        height: 100%;
    }
    .mine_view{
        padding: 20upx 40upx 0;
        box-sizing: border-box;
        width: 100%;
    }
    .title_view{
        height: var(--status-bar-height);
        width: 100%;
    }
    .me_title{
        font-family: PingFang-SC-Bold;
        font-size: 48upx;
        font-weight: bold;
        font-stretch: normal;
        line-height: 134upx;
        color: #191f25;
    }
    .top_cont{
        height: 340upx;
        width: 100%;
        border-radius: 30upx;
        box-sizing: border-box;
        overflow: hidden;
        background: url("http://cdn.haofang.net/static/xfldDeveloper/mine/top_bg.png") center center no-repeat;
        background-size: cover;
        padding-top: 40upx;
    }
    .avatar_view{
        align-items: center;
    }
    .avatar_cont{
        width: 100upx;
        height: 100upx;
        border-radius: 100%;
        display: flex;
        overflow: hidden;
        margin: auto 40upx auto 0;
        flex-shrink: 0;
        margin-left: 60upx;
        align-items: center;
    }
    .avatar{
        width: 100%;
        height: 100%;
        display: flex;
        background: url("http://cdn.haofang.net/static/xfldDeveloper/msg/default_header.png") center center no-repeat;
        background-size: cover;
    }
    .build_name{
        font-family: PingFang-SC-Bold;
        font-size: 44upx;
        font-stretch: normal;
        font-weight: bold;
        color: #ffffff;
        width: 100%;
        overflow: hidden;
        text-align: left;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .top_info_view{
        align-items: center;
        margin-top: 17upx;
    }
    .top_info_item{
        width: 100%;
        height: 155upx;
        text-align: center;
    }
    .top_info_num{
        font-size: 56upx;
        font-weight: bold;
        font-stretch: normal;
        line-height: 62upx;
        height: 62upx;
        color: #ffffff;
    }
    .top_info_text{
        font-family: PingFang-SC-Medium;
        font-size: 26upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 53upx;
        color: #ffffff;
    }
    .btn_view{
        line-height: 120upx;
        border-bottom: 1upx solid #ebebeb;
        box-sizing: border-box;
        align-items: center;
    }
    .btn_text{
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        color: #191f25;
    }
    .arrow_right{
        width: 15upx;
        height: 28upx;
        flex-shrink: 0;
        margin: auto 0;
    }
</style>
