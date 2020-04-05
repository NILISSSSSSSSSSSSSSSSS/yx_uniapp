
<!--客户列表佣金页 公司信息 组件-->
<template>
    <view>
        <view v-for="(item,index) in companyList" :key="index" class="box">
            <view :class="[isOpenObj[item.adminDeptId]?'company_info_open_view':'company_info_view']" class="f_r_b">
                <view class="company_name">{{item.deptName}}</view>
                <view class="f_r_e">
                    <view class="company_info_item f_c_c">
                        <view class="company_info_num">{{item.notCommissionAmount||'0元'}}</view>
                        <view class="=company_info_text">待结佣</view>
                    </view>
                    <view class="company_info_item f_c_c">
                        <view class="company_info_num">{{item.settleCommissionAmount||'0元'}}</view>
                        <view class="company_info_text">已结佣</view>
                    </view>
                    <view @click.stop="openCustomerList(item)" class="f_r_s">
                        <image class="commission_icon" mode="aspectFit" src="http://cdn.haofang.net/static/xfldDeveloper/customer/commission_up.png" v-if="isOpenObj[item.adminDeptId]"></image>
                        <image class="commission_icon" mode="aspectFit" src="http://cdn.haofang.net/static/xfldDeveloper/customer/commission_down.png" v-else></image>
                    </view>
                </view>
            </view>
            <view class="show_customer_list" v-show="isOpenObj[item.adminDeptId]">
                <view class="f_r_s check_button">
                    <view :class="{ 'status_is_check' : isOpenObj[item.adminDeptId] && isCommissionObj[item.adminDeptId] === 0 }" class="status_no_check" @click.stop="showWaitCommissionView(item)">待结佣</view>
                    <view class="line_box"></view>
                    <view :class="{ 'status_is_check' : isOpenObj[item.adminDeptId] && isCommissionObj[item.adminDeptId] === 1 }" class="status_no_check" @click.stop="showCompletedCommissionView(item)">已结佣</view>
                </view>
                <view class="commission_list" v-if="isOpenObj[item.adminDeptId] && isCommissionObj[item.adminDeptId] === 0">
                    <commissionCustomerList :commissionList="waitCommissionList[item.adminDeptId] || []"></commissionCustomerList>
                </view>
                <view class="completed_commission_list" v-if="isOpenObj[item.adminDeptId] && isCommissionObj[item.adminDeptId] === 1">
                    <commissionCustomerList :commissionList="completedCommissionList[item.adminDeptId] || []"></commissionCustomerList>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {GetDeptCustInfoList} from "../net/CustomerForDevelopersNet";
    import commissionCustomerList from "./commissionCustomerList";

    export default {
        name: "companyItem",
        components : {
            commissionCustomerList,
        },

        data(){
            return{
                waitCommissionList : {}, // 待结佣
                completedCommissionList : {},// 已结佣

                isOpenObj : {},
                isCommissionObj : {},
                statusIndex : 0,
                statusClass : 'status_no_ckeck',
            }
        },

        methods : {
            openCustomerList(item){
                this.$set(this.isOpenObj, item.adminDeptId, !this.isOpenObj[item.adminDeptId]);

                // 默认选中打开页面的待结佣tab
                if (!!!this.isCommissionObj[item.adminDeptId]){
                    this.$set(this.isCommissionObj, item.adminDeptId, 0);
                }

                // 发起请求
                console.log(this.isOpenObj[item.adminDeptId],'--点击事件--');
                if (this.isOpenObj[item.adminDeptId]){
                    this.initDataOfDeptCustInfo({adminDeptId : item.adminDeptId, custStatus : 5});// 待结佣
                    this.initDataOfDeptCustInfo({adminDeptId : item.adminDeptId, custStatus : 6});// 已结佣
                }
            },

            //获取门店下客户数据
            initDataOfDeptCustInfo(param){
                // GetDeptCustInfoList
                new GetDeptCustInfoList(param).send().then((res)=>{
                    if (res.errCode != 200){
                        this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                        return;
                    }

                    if (!res.data){
                        return;
                    }

                    for (let item of res.data){
                        if (item.expectCommission){
                            item.expectCommission = item.expectCommission > 9999 ? (Math.floor(item.expectCommission/100)/100) + '万' : item.expectCommission + '元';
                        }else {
                            item.expectCommission = "0元";
                        }
                    }

                    if (param.custStatus===5){
                        this.$set(this.waitCommissionList, param.adminDeptId, res.data);
                        console.log('待结佣数据',this.waitCommissionList);
                    }else {
                        this.$set(this.completedCommissionList, param.adminDeptId, res.data);
                        console.log('已结佣数据',this.completedCommissionList);
                    }

                })
                .catch((res)=>{
                    this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                })
            },

            // 展示已结佣列表
            showCompletedCommissionView(item){
                if (this.isCommissionObj[item.adminDeptId] === 1){
                    return;
                }
                this.$set(this.isCommissionObj, item.adminDeptId, 1);
            },

            // 展示待结佣列表
            showWaitCommissionView(item){
                if (this.isCommissionObj[item.adminDeptId] === 0){
                    return;
                }
                this.$set(this.isCommissionObj, item.adminDeptId, 0);
            },

        },

        props: {
            companyList: {
                type: Array,
                default: []
            }
        },
    }
</script>

<style scoped>
    page{
        background-color: #FFFFFF;
    }
    .box{
        box-sizing: border-box;
    }
    .commission_list{

    }
    .company_info_view{
        align-items: center;
        height: 144upx;
        margin-left: 40upx;
        margin-right: 40upx;
        /*padding-right: 40upx;*/
        border-bottom: solid 1px #F5F5F5;
        box-sizing: border-box;
        background-color: #FFFFFF;
    }
    .company_info_open_view{
        align-items: center;
        height: 144upx;
        margin-left: 40upx;
        margin-right: 40upx;
        box-sizing: border-box;
        background-color: #FFFFFF;
    }
    .company_name{
        font-family: PingFang-SC-Bold;
        margin-right: 15upx;
        font-size: 36upx;
        line-height: 45upx;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        text-align: left;
        flex-shrink:0;
        max-width: 260upx;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .company_info_num{
        font-family: 1234567890-Regular;
        font-size: 36upx;
        flex-shrink:0;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
    }
    .company_info_text{
        font-family: PingFang-SC-Medium;
        font-size: 24upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #a3a5a8;
        opacity: 0.8;
    }
    .commission_icon{
        width: 26upx;
        height: 14upx;
        margin: auto 0 auto 0;
    }
    .company_info_item{
        width: 160upx;
        flex-shrink: 0;
        margin-right: 10upx;
        align-items: center;
        text-align: center;
    }


    /*展开的客户列样式*/
    .show_customer_list{
        background-color: #fafafa;
        padding-bottom: 10upx;
        box-sizing: border-box;
    }
    .show_customer_list .status_is_check{
        font-family: PingFang-SC-Bold;
        font-size: 30upx;
        line-height: 100upx;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #0084ff;
        margin: auto 30upx auto 0upx;
    }
    .status_no_check{
        font-family: PingFang-SC-Medium;
        font-size: 26upx;
        line-height: 100upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #a3a5a8;
        margin: auto 30upx auto 0upx;
    }
    .line_box{
        border-left: solid 1px #dddddd;
        height: 30upx;
        margin: auto 30upx auto 0upx;
    }
    .check_button{
        margin-left: 80upx;
    }
</style>