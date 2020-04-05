
<template>
    <view>
        <view class="f_r_s check_all" @click="checkAll" v-if="customerData && customerData.length>1">
            <image :src="isCheckAll?checkedImgSrc:checkImgSrc"></image>
            <text v-if="isCheckAll">全不选</text>
            <text v-else>全选</text>
        </view>
        <view class="em_view" v-if="customerData && customerData.length>1"></view>

        <view class="authority_cont">
            <checkbox-group @change="checkedCustChange">
                <block v-for="(item, index) in customerData" :key="index">
                    <label class="f_c_s authority_label">
                        <view class="f_r_s authority_label_info">
                            <image class="authority_icon" :src="checkedCustMap[item.custId]?checkedImgSrc:checkImgSrc"></image>
                            <checkbox style="display: none;" :value="item.custId" :checked="checkedCustMap[item.custId]" />
                            <view class="cust_view"><staffCustomer :item="item" :isGoDetail="false"></staffCustomer></view>
                        </view>
                    </label>
                </block>
            </checkbox-group>

            <!-- 下一步 -->
            <view class="next-btn">
                <view @click="goToNext()">下一步</view>
            </view>
        </view>
    </view>
</template>

<script>
    import {GetCustListForStaff} from "../../net/Staff";
    import {Const} from "../../utils/Const";
    import staffCustomer from "../components/staffCustomer";

    class PrivateData{
        static brokerId = null;
        static checkcustIds = [];
    }

    export default {
        components :{
            staffCustomer
        },

        data(){
            return{
                customerData : null, //  客户列表
                checkImgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/yg_check.png",
                checkedImgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/yg_checked.png",
                checkedCustMap:{},
                isCheckAll: false,
            }
        },

        onShow(){
            this.initData();
        },

        onLoad(option){
            PrivateData.brokerId = option.userId;
        },

        methods : {
            // 获取客户列表数据  GetCustList
            initData(){
                if (!PrivateData.brokerId) return;

                new GetCustListForStaff({'brokerId':PrivateData.brokerId}).send()
                    .then((res)=>{
                        if (res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        if (res.data && res.data.custList){
                            this.customerData = res.data.custList;
                        }

                        for (let item of this.customerData){
                            item.layout = item.layout ? item.layout.split(",") : []; // 处理户型
                        }
                        console.log(this.customerData,'--this.customerData--')
                    })
                    .catch((res)=>{
                        console.log(res);
                        this.DifferenceApi.showToast(res.errMsg || "服务器开小差啦!请稍后再试");
                    })
            },

            checkedCustChange(e) {
                let checkedCustMap = {};
                for (let val of (e.detail.value || [])) {
                    checkedCustMap[Number(val)] = true;
                }
                this.checkedCustMap = checkedCustMap;
                PrivateData.checkcustIds = e.detail.value;

                // 对比选中数据 判断是否显示全选
                if (PrivateData.checkcustIds.length === this.customerData.length){
                    this.isCheckAll = true;

                    return;
                }

                this.isCheckAll = false;
            },

            checkAll(){
                this.isCheckAll = !this.isCheckAll;

                if (this.isCheckAll){
                    let checkedCustMap = {};
                    for (let item of this.customerData){
                        checkedCustMap[Number(item.custId)] = true;
                    }
                    this.checkedCustMap = checkedCustMap;

                    return;
                }
                this.checkedCustMap = {};
            },

            goToNext(){
                let custIds = [];
                for (let val in this.checkedCustMap){
                    if (!this.checkedCustMap[val]) continue;

                    custIds.push(val);
                }

                if (custIds.length === 0){
                    this.DifferenceApi.showToast("请选择客户");
                    return;
                }
                custIds = custIds.join(',');
                console.log(custIds,'---custIds---');

                uni.navigateTo({
                    url: "/pagesStaff/customerTransfer/chooseStaff?custIds=" + custIds + '&brokerId='+ PrivateData.brokerId
                });
            }
        },

    }
</script>

<style>
    .check_all{
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        height: 100upx;
        background-color: #ffffff;
        z-index: 11;
    }
    .check_all>image{
        width: 40upx;
        height: 40upx;
        flex-shrink: 0;
        margin: auto 10upx auto 50upx;
    }
    .check_all>text{
        font-size: 32upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        flex-shrink: 0;
        margin: auto 10upx auto 0;
    }
    .em_view{
        width: 100%;
        height: 100upx;
        background-color: #FFFFFF;
    }
    .authority_cont{
        padding: 50upx 50upx 200upx 50upx;
        box-sizing: border-box;
        width: 100%;
    }
    .authority_label{
        margin-bottom: 36upx;
    }
    .authority_label_info{
        align-items: center;
    }
    .authority_icon{
        width: 40upx;
        height: 40upx;
        margin: 10upx 20upx auto 0;
        flex-shrink: 0;
    }
    .cust_view{
        flex: 1;
        padding-bottom: 40upx;
        border-bottom: solid 1px #ebebeb;;
    }
    /*底部按钮*/
    .next-btn{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 190upx;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        z-index: 9;
    }
    .next-btn>view{
        width: 670upx;
        height: 98upx;
        background-color: #0084ff;
        box-shadow: 0px 7px 15px 1px rgba(0, 0, 0, 0.05);
        border-radius: 10upx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        font-family: PingFang-SC-Bold;
        font-size: 32upx;
    }
</style>
