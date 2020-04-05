

<template>
    <view class="forget_view">
        <view class="title">重置密码</view>

        <view class="f_r_b login_item">
            <input class="input_val"
                   placeholder-style="color: #c0c1c3;"
                   @input="passwordInput"
                   placeholder="6-20字符，英文和数字的组合" type="text"
                   :password="newPasswordType === 2" />

            <view @click="changeNewPasswordType" class="icon_view f_c_c">
                <image :class="[keywordImgMap[newPasswordType].className]"
                       class="password_icon" :src="keywordImgMap[newPasswordType].src"></image>
            </view>
        </view>

        <view class="f_r_b login_item">
            <input class="input_val"
                   placeholder-style="color: #c0c1c3;"
                   @input="confirmPasswordInput"
                   placeholder="请再次输入" type="text"
                   :password="confirmPasswordType === 2" />

            <view @click="changeConfirmPasswordType" class="icon_view f_c_c">
                <image :class="[keywordImgMap[confirmPasswordType].className]"
                       class="password_icon" :src="keywordImgMap[confirmPasswordType].src"></image>
            </view>
        </view>

        <view @click="confirmBtn" class="confirm_btn"><collectFormId></collectFormId>提交</view>
    </view>
</template>

<style>
    page{
        width: 100%;
        height: 100%;
        background: #ffffff;
    }
    .forget_view{
        width: 100%;
        padding: 94upx 56upx 0;
        box-sizing: border-box;
    }
    .title{
        height: 116upx;
        font-family: PingFang-SC-Bold;
        font-size: 50upx;
        line-height: 116upx;
        color: #191f25;
        margin-bottom: 10upx;
        font-weight: bold;
    }
    .login_item{
        height: 130upx;
        line-height: 130upx;
        border-bottom: 1upx solid #ededed;
        box-sizing: border-box;
    }
    .input_val{
        font-family: PingFang-SC-Bold;
        height: 46upx;
        font-size: 30upx;
        color: #191f25;
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
    .confirm_btn{
        width: 100%;
        line-height: 100upx;
        text-align: center;
        height: 100upx;
        background-color: #0084ff;
        border-radius: 50upx;
        box-sizing: border-box;
        margin-top: 70upx;
        font-family: PingFang-SC-Medium;
        font-size: 34upx;
        color: #ffffff;
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
    .show_key{
        width: 40upx;
        height: 40upx;
    }
    .hide_key{
        width: 40upx;
        height: 19upx;
    }
</style>

<script>
    import {Utils} from "../../utils/Utils";
    import {DifferenceApi} from "../../utils/DifferenceApi";
    import {Config} from "../../config/config";
    import {Const} from "../../utils/Const";
    import {ForgetPassword} from "../../net/SetNet";

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
                newPasswordType: 2,
                confirmPasswordType: 2,
                requestInfo: {
                    newPassword: "",
                    confirmPassword: "",
                    telephone: "",
                    code: ""
                },
            }
        },

        onLoad(params) {
            this.requestInfo.code = params.code;
            this.requestInfo.telephone = params.telephone;
        },

        methods: {
            // 切换新密码
            changeNewPasswordType() {
                this.newPasswordType = this.newPasswordType === 2 ? 1 : 2;
            },
            // 切换确认密码
            changeConfirmPasswordType() {
                this.confirmPasswordType = this.confirmPasswordType === 2 ? 1 : 2;
            },
            // 新密码输入
            passwordInput(e) {
                this.requestInfo.newPassword = e.detail.value;
            },
            // 新密码输入
            confirmPasswordInput(e) {
                this.requestInfo.confirmPassword = e.detail.value;
            },

            // 提交
            confirmBtn() {
                if(!this.requestInfo.newPassword) {
                    new DifferenceApi().showToast("请输入新密码");
                    return;
                }

                if (this.requestInfo.newPassword.length < 6) {
                    new DifferenceApi().showToast("密码长度不能少于6个字符");
                    return;
                }

                if(!new Utils().checkHaveLetterNumber(this.requestInfo.newPassword)) {
                    new DifferenceApi().showToast("密码应同时包含字母和数字");
                    return;
                }

                if(!new Utils().checkMustLetterNumber(this.requestInfo.newPassword)){
                    new DifferenceApi().showToast("密码只能包含字母和数字");
                    return;
                }

                if(!this.requestInfo.confirmPassword) {
                    new DifferenceApi().showToast("请输入确认密码");
                    return;
                }

                if (this.requestInfo.confirmPassword.length < 6) {
                    new DifferenceApi().showToast("密码长度不能少于6个字符");
                    return;
                }

                if(this.requestInfo.confirmPassword !== this.requestInfo.newPassword) {
                    new DifferenceApi().showToast("两次密码输入不一致");
                    return;
                }

                uni.showLoading({title: '重置中...', mask: Config.mask});
                new ForgetPassword({
                    password: this.requestInfo.confirmPassword,
                    userMobile: this.requestInfo.telephone,
                    verificationCode: this.requestInfo.code}).send()
                    .then(res => {
                        uni.hideLoading();
                        if(res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        new DifferenceApi().showToast("重置成功");
                        setTimeout(() => {
                            uni.reLaunch({
                                url: "/pagesSet/login/login"
                            });
                        }, 1000);
                    })
                    .catch(err => {
                        uni.hideLoading();
                        new DifferenceApi().showToast(err.errMsg || "重置失败");
                    });
            }
        }
    }
</script>
