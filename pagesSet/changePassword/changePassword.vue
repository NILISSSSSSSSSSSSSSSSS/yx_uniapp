

<template>
    <view class="forget_view">
        <view class="forget_cont page">
            <view class="f_r_s forget_item">
                <view class="forget_title">旧密码</view>

                <view class="f_r_b forget_right">
                    <input class="input_val" placeholder="请输入旧密码"
                           type="text" @input="inputOldPassword"
                           :password="oldPasswordType === 2"
                           placeholder-style="color: #c0c1c3;" maxlength="20" minlength="6" />

                    <view v-if="requestInfo.oldPassword" @click="changeOldPasswordType" class="icon_view f_c_c">
                        <image :class="[keywordImgMap[oldPasswordType].className]"
                               class="password_icon" :src="keywordImgMap[oldPasswordType].src"></image>
                    </view>
                </view>
            </view>

            <view class="f_r_s forget_item">
                <view class="forget_title">新密码</view>

                <view class="f_r_b forget_right">
                    <input class="input_val" placeholder="6-20字符，英文和数字的组合"
                           type="text" @input="inputNewPassword"
                           :password="newPasswordType === 2"
                           placeholder-style="color: #c0c1c3;" maxlength="20" minlength="6" />

                    <view v-if="requestInfo.newPassword" @click="changeNewPasswordType" class="icon_view f_c_c">
                        <image :class="[keywordImgMap[newPasswordType].className]"
                               class="password_icon" :src="keywordImgMap[newPasswordType].src"></image>
                    </view>
                </view>
            </view>

            <view class="f_r_s forget_item">
                <view class="forget_title">确认密码</view>

                <view class="f_r_b forget_right">
                    <input class="input_val" placeholder="再次输入新密码"
                           type="text" @input="inputConfirmPassword"
                           :password="confirmPasswordType === 2"
                           placeholder-style="color: #c0c1c3;" maxlength="20" minlength="6" />

                    <view v-if="requestInfo.confirmPassword" @click="changeConfirmPasswordType" class="icon_view f_c_c">
                        <image :class="[keywordImgMap[confirmPasswordType].className]"
                               class="password_icon" :src="keywordImgMap[confirmPasswordType].src"></image>
                    </view>
                </view>
            </view>
        </view>

        <view class="confirm_view">
            <view @click="confirmBtn" class="confirm_btn">提交</view>
        </view>
    </view>
</template>

<script>
    import {Config} from "../../config/config";
    import {Const} from "../../utils/Const";
    import {Utils} from "../../utils/Utils";
    import {ModifyPassword} from "../../net/SetNet";
    import {UserInfoModel} from "../../model/UserInfoModel";
    import {LoginSuccessModel} from "../../model/LoginSuccessModel";

    export default {
        data() {
            return {
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
                oldPasswordType: 2,
                newPasswordType: 2,
                confirmPasswordType: 2,
                requestInfo: {
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                },
            }
        },

        methods: {
            // 老密码输入
            inputOldPassword(e) {
                this.requestInfo.oldPassword = e.detail.value;
            },
            // 新密码输入
            inputNewPassword(e) {
                this.requestInfo.newPassword = e.detail.value;
            },
            // 密码确认输入
            inputConfirmPassword(e) {
                this.requestInfo.confirmPassword = e.detail.value;
            },
            // 切换老密码
            changeOldPasswordType() {
                this.oldPasswordType = this.oldPasswordType === 2 ? 1 : 2;
            },
            // 切换新密码
            changeNewPasswordType() {
                this.newPasswordType = this.newPasswordType === 2 ? 1 : 2;
            },
            // 切换确认密码
            changeConfirmPasswordType() {
                this.confirmPasswordType = this.confirmPasswordType === 2 ? 1 : 2;
            },

            // 确定
            confirmBtn() {
                if(!this.requestInfo.oldPassword) {
                    this.DifferenceApi.showToast("请输入旧密码");
                    return;
                }

                if (!this.requestInfo.newPassword) {
                    this.DifferenceApi.showToast("请输入新密码");
                    return;
                }

                if (this.requestInfo.newPassword.length < 6) {
                    this.DifferenceApi.showToast("密码长度不能少于6个字符");
                    return;
                }

                if(!new Utils().checkHaveLetterNumber(this.requestInfo.newPassword)) {
                    this.DifferenceApi.showToast("密码应同时包含字母和数字");
                    return;
                }

                if(!new Utils().checkMustLetterNumber(this.requestInfo.newPassword)){
                    this.DifferenceApi.showToast("密码只能包含字母和数字");
                    return;
                }

                if(!this.requestInfo.confirmPassword) {
                    this.DifferenceApi.showToast("请输入确认密码");
                    return;
                }

                if (this.requestInfo.confirmPassword.length < 6) {
                    this.DifferenceApi.showToast("密码长度不能少于6个字符");
                    return;
                }

                if(this.requestInfo.confirmPassword !== this.requestInfo.newPassword) {
                    this.DifferenceApi.showToast("两次密码输入不一致");
                    return;
                }

                uni.showLoading({title: '请求中...', mask: Config.mask});
                new ModifyPassword({
                    oldPassword: this.requestInfo.oldPassword,
                    newPassword: this.requestInfo.confirmPassword})
                    .send()
                    .then(res => {
                        uni.hideLoading();
                        if(res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        new UserInfoModel().removeModel();
                        new LoginSuccessModel().removeModel();
                        this.DifferenceApi.showToast("密码修改成功，请重新登录");
                        setTimeout(() => {
                            uni.reLaunch({
                                url: "/pagesSet/login/login"
                            });
                        }, 1000);
                    })
                    .catch(err => {
                        uni.hideLoading();
                        this.DifferenceApi.showToast(err.errMsg || "请求失败");
                    });
            },
        }
    }
</script>

<style>
    page{
        width: 100%;
        height: 100%;
        background: #ffffff;
    }
    .forget_view{
        width: 100%;
    }
    .forget_cont{
        padding: 0 40upx;
        box-sizing: border-box;
        background: #ffffff;
        width: 100%;
    }
    .forget_item{
        height: 110upx;
        line-height: 110upx;
        padding-right: 30upx;
        border-bottom: 1px solid #e7e7e7;
        box-sizing: border-box;
    }
    .forget_title{
        flex-shrink: 0;
        text-align: left;
        width: 220upx;
        font-family: PingFang-SC-Bold;
        font-size: 30upx;
        font-weight: bold;
        font-stretch: normal;
        color: #191f25;
    }
    .forget_right{
        width: 100%;
    }
    .input_val{
        height: 32upx;
        line-height: 32upx;
        margin: auto 0;
        font-size: 30upx;
        color: #191f25;
        text-align: left;
        padding-right: 20upx;
        box-sizing: border-box;
        width: 100%;
    }
    .show_key{
        width: 40upx;
        height: 40upx;
    }
    .hide_key{
        width: 40upx;
        height: 19upx;
    }
    .icon_view{
        flex-shrink: 0;
        width: 50upx;
        height: 100%;
        text-align: right;
    }
    .password_icon{
        margin: auto 0 auto auto;
        flex-shrink: 0;
    }
    .confirm_view{
        padding: 0 40upx;
        box-sizing: border-box;
        width: 100%;
        margin-top: 60upx;
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
