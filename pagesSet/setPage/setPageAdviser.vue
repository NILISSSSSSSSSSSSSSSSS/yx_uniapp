

<template>
    <view class="set_page">
        <view class="cont">
            <view @click="goToChangePassword" class="btn_view f_r_b">
                <view class="btn_text"><collectFormId></collectFormId>修改密码</view>

                <image class="arrow_right" src="http://cdn.haofang.net/static/xfldDeveloper/mine/arrow_right.png"></image>
            </view>
        </view>

        <view @click="signOut" class="sign_out"><collectFormId></collectFormId>退出登录</view>

        <show-modal :modal="{
            title: '',
            content: '确定要退出当前登录吗？',
            cancelColor: '#c0c1c3',
            confirmColor: '#0084ff',
            showCancel : true,
        }" ref="modal" @onModalChanged="onModalChanged"></show-modal>
    </view>
</template>

<script>
    import {GetLoginModel, SetLoginModel} from "../../model/LoginSuccessModel";
    import {Const} from "../../utils/Const";
    import {Config} from "../../config/config";
    import {ExitLogin} from "../../net/SetNet";
    import {UserInfoModel} from "../../model/UserInfoModel";
    import {LoginSuccessModel} from "../../model/LoginSuccessModel";
    import {CommonModel} from "../../model/CommonModel";
    import {LoginApp} from "../../utils/common";
    import {ImChart} from "../../utils/ImChart";

    export default {
        data() {
            return {
            }
        },

        methods: {
            // 修改密码
            goToChangePassword() {
                uni.navigateTo({
                    url: "/pagesSet/changePassword/changePassword"
                });
            },

            // 退出登录
            signOut() {
                this.$refs.modal.show();
            },
            onModalChanged(val) {
                if (!val) return;

                if(!GetLoginModel.getClientKey()) {
                    this.DifferenceApi.showToast("退出登录成功");
                    setTimeout(() => {
                        uni.reLaunch({
                            url: "/pagesSet/login/login"
                        });
                    }, 1000);
                    return;
                }

                uni.showLoading({title: '退出中...', mask: Config.mask});
                new ExitLogin({clientKey: GetLoginModel.getClientKey()}).send()
                    .then(res => {
                        uni.hideLoading();
                        if(res.errCode !== Const.success) {
                            return Promise.reject(re);
                        }

                        let tel = GetLoginModel.getTelephone() || "";
                        new UserInfoModel().removeModel();
                        new LoginSuccessModel().removeModel();
                        SetLoginModel.setTelephone(tel);
                        new CommonModel().setModel(new LoginApp().getEnterPage(),"routePath");
                        this.DifferenceApi.showToast("退出登录成功");
                        ImChart.exitLogin();
                        setTimeout(() => {
                            uni.reLaunch({
                                url: "/pagesSet/login/login"
                            });
                        }, 1000);
                    })
                    .catch(err => {
                        uni.hideLoading();
                        this.DifferenceApi.showToast(err.errMsg || "退出登录失败");
                    });
            },
        }
    }
</script>

<style>
    page{
        background-color: #f8f8f8;
        width: 100%;
        height: 100%;
    }
    .set_page{
        width: 100%;
        background-color: #f8f8f8;
        padding-top: 20upx;
        box-sizing: border-box;
    }
    .cont{
        width: 100%;
        padding: 0 40upx;
        box-sizing: border-box;
        background-color: #ffffff;
    }
    .cont>.btn_view:last-child{
        border-bottom: none;
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
        font-weight: bold;
    }
    .arrow_right{
        width: 15upx;
        height: 28upx;
        flex-shrink: 0;
        margin: auto 0;
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
</style>
