
<template>
    <view class="forget_view">
        <view class="forget_cont page">
            <view class="f_r_s forget_item">
                <view class="forget_title">
                    <view class="f_r_b" style="width: 105upx;">
                        <view>户</view><view>型</view>
                    </view>
                </view>
                <view style="flex: 1;">
                    <picker v-if="huXinTypeList && huXinTypeList.length>0" mode="selector" :range="huXinTypeList" range-key="value" :value="huXinIndex" @change="huXinChangePicker">
                        <view class="uniapp_pic" :class="[huXinTypeList[huXinIndex].value ? 'active' : '']">{{huXinTypeList[huXinIndex].value || '请选择'}}</view>
                    </picker>
                    <view v-else class="f_r_e no_layout" @click="addLayout">暂无户型</view>
                </view>
                <image src="http://cdn.haofang.net/static/xfldDeveloper/build/detail-arrow-right.png" mode="scaleToFill" class="right_icon" @change="huXinChangePicker"></image>
            </view>

            <view class="f_r_s forget_item">
                <view class="forget_title">房源编号</view>

                <view class="f_r_b forget_right_f">
                    <input type="text" class="input_val" placeholder="请输入房号" placeholder-style="color:#c0c1c3" maxlength="15" :value="houseNo" @input="inputHouseNo">
                </view>
            </view>

            <view class="f_r_s forget_item">
                <view class="forget_title">产权面积</view>

                <view class="f_r_b forget_right">

                    <input type="digit" class="input_val" placeholder="请输入产权面积" placeholder-style="color:#c0c1c3" maxlength="10" :value="houseArea" @input="inputHouseArea">

                </view>

                <view class="area">㎡</view>


            </view>

            <view class="f_r_s forget_item">
                <view class="forget_title">成交金额</view>

                <view class="f_r_b forget_right">

                    <input type="digit" class="input_val" placeholder="请输入成交金额" placeholder-style="color:#c0c1c3" maxlength="10" :value="dealAmount" @input="inputDealAmount">

                </view>

                <view class="amount">万元</view>

            </view>

            <view class="f_r_s forget_item" v-if="directCustomer == 0">
                <view class="forget_title">预计佣金</view>

                <view class="f_r_b forget_right_c">

                    <input type="digit" class="input_val" placeholder="请输入预计结佣金额" placeholder-style="color:#c0c1c3" maxlength="8" :value="commission" @input="inputCommission">

                </view>

                <view class="amount">元</view>

            </view>
        </view>

        <view class="confirm_view">
            <view @click="confirmBtn" class="confirm_btn">确定</view>
        </view>


    </view>
</template>

<script>
    import {Config} from "../../config/config";
    import {Const} from "../../utils/Const";
    import {RequestOrSign} from "../../net/CustomerNet";
    import {GetLoginModel} from "../../model/LoginSuccessModel";
    import {GetBuildLayouts} from "../../net/CustomerForDevelopersNet";
    import {ImSendMessage} from "../../utils/ImChart";
    import {CustomerModel} from "../../model/CustomerModel";

    var param = {};

    export default {
        data() {
            return {
                cityId : '',
                custId : '',
                houseNo : '',
                houseArea : '',
                dealAmount : '',
                commission : '',
                custStatus : '',
                directCustomer : 0,
                huXinTypeList : null,
                huXinIndex:'',
                checkHuXin : '',// 选中的户型
            }
        },

        onLoad(option){
            param = option;
            console.log(option,'--signInfo接收页面参数--')
        },

        onShow(){
            this.iniData();
            this.cityId = param.cityId||'';
            this.custId = param.custId||'';
            this.houseNo = param.houseNo||'';
            this.custStatus = param.custStatus||'';
            this.houseArea = param.houseArea||'';
            this.dealAmount = param.dealAmount||'';
            this.commission = param.commission||'';
            this.directCustomer = param.directCustomer||'';
            this.checkHuXin = param.layoutNo||''
        },

        methods: {
            // 房源编号
            inputHouseNo(e) {
                this.houseNo = e.detail.value;
            },
            // 产权面积
            inputHouseArea(e) {
                this.houseArea = e.detail.value;
            },
            // 成交金额
            inputDealAmount(e) {
                this.dealAmount = e.detail.value;
            },
            // 预计佣金
            inputCommission(e) {
                this.commission = e.detail.value;
            },

            // 确定
            confirmBtn() {
                if (this.huXinTypeList && this.huXinTypeList.length===0){
                    this.DifferenceApi.showToast("请先添加户型");
                    return;
                }

                if(!this.huXinIndex) {
                    this.DifferenceApi.showToast("请选择户型");
                    return;
                }

                if(!this.houseNo) {
                    this.DifferenceApi.showToast("请输入房号");
                    return;
                }

                if (!this.houseArea) {
                    this.DifferenceApi.showToast("请输入产权面积");
                    return;
                }

                if (!this.dealAmount) {
                    this.DifferenceApi.showToast("请输入成交金额");
                    return;
                }

                if (!this.commission && this.directCustomer == 0) {
                    this.DifferenceApi.showToast("请输入预计结佣金额");
                    return;
                }

                uni.showLoading({title: '请求中...', mask: Config.mask});
                new RequestOrSign({
                    cityId: this.cityId,
                    custId: this.custId,
                    custStatus: this.custStatus,
                    houseNo: this.houseNo,
                    houseArea: this.houseArea,
                    dealAmount: this.dealAmount,
                    commission: this.commission,
                    layoutNo: this.checkHuXin,
                })
                .send()
                .then(res => {
                    uni.hideLoading();
                    if(res.errCode !== Const.success) {
                        return Promise.reject(res);
                    }

                    let sellInfo = new CustomerModel().getModel() || "";
                    if (sellInfo.userId) {
                        new ImSendMessage().sendNotifyMsg("ld_" + sellInfo.userId);
                    }
                    this.DifferenceApi.showToast("签约成功");
                    setTimeout(() => {
                        uni.navigateBack({
                            delta: 1
                        });
                    }, 1000);
                })
                .catch(err => {
                    uni.hideLoading();
                    this.DifferenceApi.showToast(err.errMsg || "请求失败");
                });
            },
            // GetBuildLayouts GetLoginModel
            iniData(){
                let buildId = GetLoginModel.getBuildId(); // 楼盘id
                new GetBuildLayouts({buildId:buildId}).send().then((res)=>{
                    if(res.errCode !== Const.success) {
                        return Promise.reject(res);
                    }

                    if (res.data && res.data.layoutNo && res.data.layoutNo.length===0){
                        this.huXinTypeList = [];
                        return;
                    }

                    let v = [];
                    for (let item of res.data.layoutNo){
                        v.push({'value':item});
                    }

                    // 默认选择传过来的户型(只有传了户型才选中)
                    if (this.checkHuXin){
                        for (let key in v){
                            if (v[key].value == this.checkHuXin){
                                this.huXinIndex = key;
                            }
                        }
                    }

                    this.huXinTypeList = v;
                })
                .catch((res)=>{
                    this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                });
            },
            huXinChangePicker (e) {
                if (!this.huXinTypeList){
                    this.DifferenceApi.showToast("请先添加户型");
                    return;
                }
                this.huXinIndex = e.target.value;
                this.checkHuXin = this.huXinTypeList[e.target.value].value;
            },
            addLayout(){
                this.DifferenceApi.showToast("请先添加户型");
            },
        }
    }
</script>

<style>
    .no_layout{
        font-size: 28upx;
        color: #191f25;
        margin-right: 10upx;
    }
    .area{
        font-family: PingFang-SC-Medium;
        font-size: 28upx;
        flex-shrink:0;
        font-weight: normal;
        font-stretch: normal;
        line-height: 32upx;
        letter-spacing: 0upx;
        color: #a3a5a8;
        margin: auto 0 auto 0;
    }
    .amount{
        font-family: PingFang-SC-Medium;
        font-size: 28upx;
        flex-shrink:0;
        font-weight: normal;
        font-stretch: normal;
        line-height: 32upx;
        letter-spacing: 0upx;
        color: #a3a5a8;
        margin: auto 0upx auto auto;
    }
    page{
        width: 100%;
        height: 100%;
        background: #f6f6f6;
    }
    .click_buttons{
        margin: auto 0upx auto auto;
        width: 57upx;
        height: 32upx;
        line-height: 32upx;
        text-align: center;
        border-radius: 6upx;
        border: solid 1px #999999;
        font-size: 22upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #999999;
        box-sizing: border-box;
    }
    .yuan{
        margin: auto 0upx auto auto;
        width: 32upx;
        height: 32upx;
        line-height: 32upx;
        text-align: center;
        border-radius: 6upx;
        border: solid 1px #999999;
        font-size: 22upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #999999;
        box-sizing: border-box;
    }
    .forget_view{
        width: 100%;
    }
    .forget_cont{
        padding-left: 30upx;
        background: #ffffff;
        width: 100%;
        box-sizing: border-box;
    }
    .forget_item{
        height: 110upx;
        line-height: 110upx;
        padding-right: 30upx;
        border-bottom: 1px solid #e7e7e7;
        box-sizing: border-box;
    }
    .forget_item:last-child{
        border-bottom: none;
    }
    .forget_title{
        flex-shrink: 0;
        font-size: 28upx;
        font-weight: bold;
        font-stretch: normal;
        color: #333333;
        text-align: left;
        width: 150upx;
    }
    .forget_right{
        width: 75%;
    }
    .forget_right_f{
        width: 100%;
    }
    .forget_right_c{
        width: 74%;
    }
    .input_val{
        height: 32upx;
        line-height: 32upx;
        margin: auto 0;
        font-size: 28upx;
        color: #333333;
        text-align: right;
        width: 100%;
        padding-right: 20upx;
        box-sizing: border-box;
    }
    .input_pla{
        height: 32upx;
        line-height: 32upx;
        margin: auto 0;
        font-size: 28upx;
        color: #999999;
        text-align: left;
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
    .password_icon{
        width: 35upx;
        height: 25upx;
        margin: auto 0 auto auto;
        flex-shrink: 0;
    }
    .confirm_btn{
        width: 100%;
        line-height: 90upx;
        text-align: center;
        height: 90upx;
        background-color: #388cff;
        border-radius: 6upx;
        box-sizing: border-box;
        font-size: 32upx;
        color: #ffffff;
    }
    .confirm_view{
        padding: 0 30upx;
        box-sizing: border-box;
        width: 100%;
        margin-top: 40upx;
    }

    .forget_item .active{
        color: #191f25;
    }
    .right_icon{
        width: 14upx;
        height: 28upx;
        margin: auto 0 auto auto;
    }
    .uniapp_pic{
        width: 97%;
        color: #c0c1c3;
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: auto;
        margin-bottom: auto;
        text-align: right;
    }
</style>
