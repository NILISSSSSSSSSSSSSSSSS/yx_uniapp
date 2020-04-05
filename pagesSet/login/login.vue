

<template>
    <view class="login_view f_c_s">
        <view class="title_height"></view>
        <view class="logo_view f_r_c">
            <image mode="widthFix" src="http://cdn.haofang.net/static/xfldDeveloper/mine/about_logo_info.png"></image>
        </view>
        <view class="logo_text">新房联动赢销</view>

        <view class="f_r_b login_item">
            <input class="input_val"
                   placeholder-style="color: #c0c1c3;"
                   maxlength="11" @input="telInput" :value="requestInfo.tel"
                   placeholder="请输入手机号码" type="number" />

            <view @click="removeTel" class="icon_view f_c_c" v-if="requestInfo.tel">
                <image class="close_icon" src="http://cdn.haofang.net/static/xfldDeveloper/tool/remove.png"></image>
            </view>
        </view>

        <view class="f_r_b login_item">
            <input class="input_val"
                   placeholder-style="color: #c0c1c3;"
                   @input="passwordInput"
                   placeholder="请输入密码" type="text"
                   :password="keywordType === 2" />

            <view @click="changePasswordType" class="icon_view f_c_c">
                <image :class="[keywordImgMap[keywordType].className]"
                       class="password_icon" :src="keywordImgMap[keywordType].src"></image>
            </view>
        </view>

        <!--#ifndef APP-PLUS || APP-PLUS-NVUE-->
        <button open-type="getUserInfo"
                @getuserinfo="upMyData" class="login_btn"><collectFormId></collectFormId>登录</button>
        <!--#endif-->
        <!--#ifdef APP-PLUS || APP-PLUS-NVUE-->
        <view @click="loginBtn" class="login_btn"><collectFormId></collectFormId>登录</view>
        <!--#endif-->

        <view class="f_r_s check_view">
            <view @click="forgetPassword" class="check_text f_c_c"><collectFormId></collectFormId>忘记密码？</view>
        </view>
    </view>
</template>

<style>
    .userInfo_view{
        background: red;
        height: 100upx;
        line-height: 100upx;
    }
    page{
        width: 100%;
        height: 100%;
        background-color: #ffffff;
    }
    .title_height{
        height: 117upx;
    }
    .login_view{
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        padding: 106upx 56upx 0;
        box-sizing: border-box;
    }
    .logo_view{
        overflow: hidden;
    }
    .logo_view>image{
        width: 135upx;
        height: 173upx;
        margin: auto auto 0 auto;
    }
    .logo_text{
        font-family: FZZCHJW--GB1-0;
        font-size: 44upx;
        font-stretch: normal;
        line-height: 96upx;
        color: #353d44;
        text-align: center;
        font-weight: bold;
        margin-bottom: 26upx;
    }
    .login_item{
        height: 130upx;
        line-height: 130upx;
        border-bottom: 1upx solid #ededed;
        box-sizing: border-box;
    }
    .input_val{
        height: 46upx;
        font-size: 30upx;
        color: #191f25;
        font-weight: normal;
        line-height: 46upx;
        margin: auto 0;
        padding-right: 30upx;
        box-sizing: border-box;
        text-align: left;
        flex: 1;
    }
    .icon_view{
        flex-shrink: 0;
        width: 50upx;
        height: 100%;
        text-align: right;
    }
    .close_icon{
        width: 32upx;
        height: 32upx;
        margin: auto 0 auto auto;
        flex-shrink: 0;
    }
    .password_icon{
        margin: auto 0 auto auto;
        flex-shrink: 0;
    }
    .show_key{
        width: 40upx;
        height: 40upx;
    }
    .hide_key{
        width: 40upx;
        height: 19upx;
    }
    .login_btn{
        width: 100%;
        height: 100upx;
        background-color: #0084ff;
        border-radius: 50upx;
        line-height: 100upx;
        text-align: center;
        font-family: PingFang-SC-Medium;
        font-size: 34upx;
        color: #ffffff;
        margin-top: 70upx;
    }
    .check_view{
        margin-top: 48upx;
    }
    .check_text{
        line-height: 32px;
        font-size: 30upx;
        font-weight: normal;
        font-stretch: normal;
        color: #999999;
    }
</style>

<script>
    import {Config} from "../../config/config";
    import {Const} from "../../utils/Const";
    import {DealUserInfoFromLogin, LoginApp} from "../../utils/common";
    import {CommonModel} from "../../model/CommonModel";
    import {GetLoginModel} from "../../model/LoginSuccessModel";
    import {ConsultantListModel} from "../../model/LoginSuccessModel";
    import {UpdateUserWxOpenId} from "../../net/CommonNet";
    import {GpsInfoModel} from "../../model/GpsInfoModel";
    import {UserInfoModel} from "../../model/UserInfoModel";
    import {RequestTimeOut} from "../../utils/RequestApi";

    class PrivateData {
        static isRequesting = false;
    }

    export default {
        data() {
            return {
                adjustPosition: false,
                keywordImgMap: {
                    1: {
                        src: "http://cdn.haofang.net/static/xfyx-uniapp/tool/show_key.png",
                        className: "show_key"
                    },
                    2: {
                        src: "http://cdn.haofang.net/static/xfyx-uniapp/tool/hide_key.png",
                        className: "hide_key"
                    }
                },
                keywordType: 2,
                requestInfo: {
                    tel: "",
                    password: "",
                    autoLogin: false
                },
                openId: "",
            }
        },

        onLoad() {
            if (GetLoginModel.getTelephone()) {
                this.requestInfo.tel = GetLoginModel.getTelephone();
            }
        },

        onHide() {
            RequestTimeOut.isInLoginPage = false;
        },
        onUnload() {
            RequestTimeOut.isInLoginPage = false;
        },

        methods: {
            // 切换密码显示状态
            changePasswordType() {
                this.keywordType = this.keywordType === 2 ? 1 : 2;
            },
            // 移除电话
            removeTel() {
                this.requestInfo.tel = "";
            },

            // 输入电话
            telInput(e) {
                this.requestInfo.tel = e.detail.value;
            },
            // 密码输入
            passwordInput(e) {
                this.requestInfo.password = e.detail.value;
            },

            // 忘记密码
            forgetPassword() {
                uni.navigateTo({
                    url: "/pagesSet/forgetPassword/forgetPassword"
                });
            },

            // 判断登录
            checkLogin() {
                if(!this.requestInfo.tel) {
                    this.DifferenceApi.showToast("请输入电话号码！");
                    return false;
                }

                if(!(/^1[23456789]\d{9}$/.test(this.requestInfo.tel))) {
                    this.DifferenceApi.showToast("电话号码格式不正确！");
                    return false;
                }

                if(!this.requestInfo.password) {
                    this.DifferenceApi.showToast("请输入密码！");
                    return false;
                }

                return true;
            },

            // 登录
            loginBtn() {
                if (!this.checkLogin()) return;

                uni.showLoading({title: '登录中...', mask: Config.mask});
                new ConsultantListModel().setModel({});
                new LoginApp().send(this.requestInfo.tel, this.requestInfo.password, this.requestInfo.autoLogin)
                    .then(res => {
                        if(res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        let cityInfo = new GpsInfoModel().getModel("cityInfo") || {};
                        new UpdateUserWxOpenId({
                            cityId: cityInfo.cityId || "1",
                            userId: GetLoginModel.getUserId(),
                            wxId: this.openId
                        }).send();
                        PrivateData.isRequesting = false;
                        uni.hideLoading();
                        uni.reLaunch({
                            url: new LoginApp().getEnterPage()
                        });
                    })
                    .catch(err => {
                        PrivateData.isRequesting = false;
                        uni.hideLoading();
                        setTimeout(() => {
                            this.DifferenceApi.showToast(err.errMsg || "登录失败");
                        }, 500);
                    });
            },

            // 授权
            upMyData(e) {
                if (!this.checkLogin()) return;

                //#ifdef MP
                // #ifndef MP-ALIPAY
                if(!e || !e.detail) return;
                // #endif

                if (PrivateData.isRequesting) return;

                PrivateData.isRequesting = true;
                uni.showLoading({title: '登录中...', mask: Config.mask});
                new DealUserInfoFromLogin().init()
                    .then(res => {
                        this.openId = res.openid || res.openId || "";
                        new UserInfoModel().setModel(this.openId, "openId");
                        this.loginBtn();
                    })
                    .catch((err) => {
                        uni.hideLoading();
                        PrivateData.isRequesting = false;
                        this.DifferenceApi.showToast(err.errMsg || "登录失败");
                    });
                // #endif
            }
        }
    }
</script>
