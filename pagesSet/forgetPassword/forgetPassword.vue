

<template>
    <view class="forget_view">
        <view class="title">验证手机号</view>

        <view class="f_r_b login_item">
            <input class="input_val"
                   placeholder-style="color: #c0c1c3;"
                   maxlength="11" @input="inputTelephone" :value="requestInfo.telephone"
                   placeholder="请输入手机号码" type="number" />

            <view @click="removeTel" class="icon_view f_c_c" v-if="requestInfo.telephone">
                <image class="close_icon" src="http://cdn.haofang.net/static/xfldDeveloper/tool/remove.png"></image>
            </view>
        </view>

        <view class="f_r_b login_item">
            <input class="input_val" placeholder="请输入验证码"
                   placeholder-style="color: #c0c1c3;"
                   type="number" @input="inputCode"
                   maxlength="6"/>

            <view :style="{color: captchaStatus !== 3 && requestInfo.telephone.length === 11 ? '#0084ff' : '#0084ff'}"
                  @click="getCaptcha" class="codeMsg">{{ captchaText }}</view>
        </view>

        <view @click="confirmBtn" class="confirm_btn"><collectFormId></collectFormId>下一步</view>
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
    .close_icon{
        width: 32upx;
        height: 32upx;
        margin: auto 0 auto auto;
        flex-shrink: 0;
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
    .codeMsg{
        color: #999999;
        font-size: 28upx;
        flex-shrink: 0;
        text-align: right;
    }
    .icon_view{
        flex-shrink: 0;
        width: 50upx;
        height: 100%;
        text-align: right;
    }
</style>

<script>
    import {Config} from "../../config/config";
    import {Const} from "../../utils/Const";
    import {ForgetPassword, GetVerificationCode} from "../../net/SetNet";
    import {Utils} from "../../utils/Utils";

    // 倒计时
    class TimeOut {
        page = null;
        defaultText = "获取验证码";
        time = 60;
        timeOutVal = null;

        constructor(page) {
            this.page = page;
        }

        init() {
            this.interval();
        }

        interval() {
            let that = this;
            this.timeOutVal = setTimeout(() => {
                if(that.time <= 1) {
                    that.setData({captchaText: this.defaultText, captchaStatus: 2});
                    that.clear();
                    return;
                }

                that.time--;
                that.setData({captchaText: `(${that.time}s)后重发验证码`, captchaStatus: 3});
                that.interval();
            }, 1000);
        }

        clear() {
            clearTimeout(this.timeOutVal);
            this.timeOutVal = null;
        }

        setData(obj) {
            for(let key in obj) {
                this.page[key] = obj[key];
            }
        }
    }

    export default {
        data() {
            return {
                captchaText: "获取验证码",
                // 获取验证码状态
                captchaStatus: 1, // 1 获取  2 重新获取  3 倒计时
                keywordImgMap: {
                    1: {
                        src: "http://cdn.haofang.net/static/xffx-uniapp/set/xianshimima_forget.png"
                    },
                    2: {
                        src: "http://cdn.haofang.net/static/xffx-uniapp/set/yincangmima_forget.png"
                    }
                },
                requestInfo: {
                    telephone: "",
                    code: ""
                },
            }
        },

        methods: {
            // 电话输入
            inputTelephone(e) {
                this.requestInfo.telephone = e.detail.value;
            },
            removeTel() {
                this.requestInfo.telephone = "";
            },
            //获取验证码
            getCaptcha() {
                if(this.captchaStatus === 3) return;

                if(this.requestInfo.telephone.length !== 11) {
                    this.DifferenceApi.showToast("请输入完整手机号");
                    return;
                }

                if(!(/^1[23456789]\d{9}$/.test(this.requestInfo.telephone))) {
                    this.DifferenceApi.showToast("电话号码格式不正确！");
                    return;
                }

                uni.showLoading({title: '获取中...', mask: Config.mask});
                new GetVerificationCode({
                    mobile: this.requestInfo.telephone,
                    sendType: 1}).send()
                    .then(res => {
                        uni.hideLoading();
                        if(res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        new TimeOut(this).init();
                    })
                    .catch(err => {
                        uni.hideLoading();
                        this.DifferenceApi.showToast(err.errMsg || "获取验证码失败啦！");
                    });
            },
            // 验证码输入
            inputCode(e) {
                this.requestInfo.code = e.detail.value;
            },
            // 下一步
            confirmBtn() {
                if(!this.requestInfo.telephone) {
                    this.DifferenceApi.showToast("请输入电话号码！");
                    return;
                }

                if(!new Utils().checkTelephone(this.requestInfo.telephone)) {
                    this.DifferenceApi.showToast("电话号码格式不正确！");
                    return;
                }

                if(!this.requestInfo.code) {
                    this.DifferenceApi.showToast("请输入验证码");
                    return;
                }

                uni.navigateTo({
                    url: "/pagesSet/resetPassword/resetPassword?telephone="
                        + this.requestInfo.telephone+"&code="
                        +this.requestInfo.code
                });
            },
        }
    }
</script>
