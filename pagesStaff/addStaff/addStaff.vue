
<template>
    <view class="forget_view">
        <view class="f_r_b login_item">
            <text>员工姓名</text>
            <input class="input_val"
                   placeholder-style="color: #c0c1c3;"
                   maxlength="8" @input="inputUserName" :value="requestInfo.userName"
                   placeholder="请输入员工姓名" type="text" />

            <view @click="removeUserName" class="icon_view f_c_c" v-if="requestInfo.userName">
                <image class="close_icon" src="http://cdn.haofang.net/static/xfldDeveloper/tool/remove.png"></image>
            </view>
        </view>

        <view class="f_r_b login_item">
            <text>联系号码</text>
            <input class="input_val"
                   placeholder-style="color: #c0c1c3;"
                   maxlength="11" @input="inputTelephone" :value="requestInfo.telephone"
                   placeholder="请输入联系号码" type="number" />

            <view @click="removeTel" class="icon_view f_c_c" v-if="requestInfo.telephone">
                <image class="close_icon" src="http://cdn.haofang.net/static/xfldDeveloper/tool/remove.png"></image>
            </view>
        </view>

        <view class="f_r_b login_item">
            <text>验证码</text>
            <input class="input_val" placeholder="请输入验证码"
                   placeholder-style="color: #c0c1c3;"
                   type="number" @input="inputCode"
                   maxlength="6"/>

            <view :style="{color: captchaStatus !== 3 && requestInfo.telephone.length === 11 ? '#0084ff' : '#0084ff'}"
                  @click="getCaptcha" class="codeMsg">{{ captchaText }}</view>
        </view>

        <view class="f_r_b tips_text">创建成功后，初始密码为a+手机后6位</view>

        <view @click="confirmBtn" class="confirm_btn">
            <collectFormId></collectFormId>
            提交
        </view>
    </view>
</template>

<script>
    import {Config} from "../../config/config";
    import {Const} from "../../utils/Const";
    import {GetVerificationCode} from "../../net/SetNet";
    import {Utils} from "../../utils/Utils";
    import {AddStaff} from "../../net/Staff";
    import collectFormId from "../../components/collectFormId";

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

    class PrivateData {
        static requesting = false
    }

    export default {
        components : {
            collectFormId
        },

        data() {
            return {
                captchaText: "获取验证码",
                // 获取验证码状态
                captchaStatus: 1, // 1 获取  2 重新获取  3 倒计时
                requestInfo: {
                    telephone: "",
                    userName: "",
                    code: ""
                }
            }
        },

        onShow(){
            PrivateData.requesting = false;
        },

        methods: {
            // 姓名输入
            inputUserName(e){
                this.requestInfo.userName = e.detail.value;
            },
            // 电话输入
            inputTelephone(e) {
                this.requestInfo.telephone = e.detail.value;
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

                if (PrivateData.requesting) return;

                PrivateData.requesting = true;
                uni.showLoading({title: '获取中...', mask: Config.mask});
                new GetVerificationCode({
                    mobile: this.requestInfo.telephone,
                    sendType: 1}).send()
                    .then(res => {
                        uni.hideLoading();
                        if(res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        PrivateData.requesting = false;
                        new TimeOut(this).init();
                    })
                    .catch(err => {
                        PrivateData.requesting = false;
                        uni.hideLoading();
                        this.DifferenceApi.showToast(err.errMsg || "获取验证码失败啦！");
                    });
            },
            // 验证码输入
            inputCode(e) {
                this.requestInfo.code = e.detail.value;
            },
            // 提交
            confirmBtn() {
                if(!this.requestInfo.userName) {
                    this.DifferenceApi.showToast("请输入员工姓名！");
                    return;
                }

                if(!this.requestInfo.telephone) {
                    this.DifferenceApi.showToast("请输入联系号码！");
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

                if (this.requestInfo.code.length !== 6) {
                    this.DifferenceApi.showToast("请输入六位验证码");
                    return;
                }

                if (PrivateData.requesting) return;

                PrivateData.requesting = true;
                // 发起请求 AddStaff
                uni.showLoading({title: '添加中...', mask: Config.mask});
                let add_param =  {"userName":this.requestInfo.userName,"userMobile":this.requestInfo.telephone,"verificationCode":this.requestInfo.code};
                new AddStaff(add_param).send()
                    .then((res)=>{
                        uni.hideLoading();
                        if(res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        this.DifferenceApi.showToast("添加成功");
                        setTimeout(() => {
                            PrivateData.requesting = false;
                            uni.navigateBack({
                                delta: 1
                            });
                        }, 500);
                    })
                    .catch((res)=>{
                        PrivateData.requesting = false;
                        this.DifferenceApi.showToast(res.errMsg || "请求失败");
                    });
            },
            // 清空电话
            removeTel(){
                this.requestInfo.telephone = '';
            },
            // 清空员工姓名
            removeUserName(){
                this.requestInfo.userName = '';
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
        padding: 0 38upx 0;
        box-sizing: border-box;
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
        border-radius: 10upx;
        box-sizing: border-box;
        margin-top: 20upx;
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
    .login_item>text{
        width: 190upx;
        margin: auto 0 auto 0;
        font-family: PingFang-SC-Bold;
        font-size: 30upx;
        font-weight: bold;
        font-stretch: normal;
        line-height: 33upx;
        letter-spacing: 0upx;
        color: #191f25;
    }
    .tips_text{
        height: 130upx;
        line-height: 130upx;
        font-family: PingFang-SC-Medium;
        font-size: 26upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #a3a5a8;
        margin: auto auto auto 0;
    }
</style>
