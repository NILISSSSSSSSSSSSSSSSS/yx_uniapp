<!--佣金客户列表组件-->

<template>
    <view>
        <block v-if="commissionList.length > 0">
            <view class="list_items f_r_b" @click.stop="goToCustomerDetail(item)" v-for="(item,index) in commissionList" :key="index">
            <view class="commission_info f_c_c">
                <view class="f_r_s">
                    <view class="name">{{item.custName}}</view>
                    <view class="sex">{{item.custSex===0?'女':'男'}}</view>
                    <view class="phone">{{item.custMobile}}</view>
                </view>
                <view class="deal_info">成交信息：
                    <block v-if="item.houseNo || item.houseArea || item.dealAmount">
                        <text class="block_view">{{item.houseNo||''}}</text>
                        <text v-if="item.houseArea" class="block_view">  {{item.houseArea}}㎡</text>
                        <text v-if="item.dealAmount" class="block_view">  {{item.dealAmount}}万</text>
                    </block>
                    <block v-else>
                        <text>--</text>
                    </block>
                </view>
            </view>
            <view class="commission_unm f_c_c">{{item.expectCommission||'0元'}}</view>
        </view>
        </block>
        <block v-if="commissionList.length === 0">
            <view class="no_data_info">暂时没有更多信息</view>
        </block>
    </view>
</template>

<script>
    export default {
        name: "commissionCustomerList",

        data(){
            return{

            }
        },

        methods : {
            goToCustomerDetail(item){
                uni.navigateTo({
                    url: '/pagesCustomer/customerDetail/customerDetail?custId='+ item.custId + '&cityId=' + item.cityId + '&custName=' + item.custName
                });
            }
        },

        props: {
            commissionList: {
                type: Array,
                default: []
            }
        },
    }
</script>

<style scoped>
    .no_data_info{
        color: #666666;
        font-size: 26upx;
        line-height: 28upx;
        text-align: center;
        align-items: center;
        margin-top: 30upx;
        margin-bottom: 50upx;
    }
    .list_items{
        height: 144upx;
        background-color: #ffffff;
        box-shadow: 0px 9px 27px 0px
        rgba(0, 0, 0, 0.05);
        border-radius: 10upx;
        margin-left: 40upx;
        margin-right: 40upx;
        margin-bottom: 30upx;
        box-sizing: border-box;
    }
    .list_items:last-child{
        margin-bottom: 50upx;
    }
    .commission_info{
        margin-left: 40upx;
    }
    .block_view{
        flex-shrink:0;
        margin-right: 10upx;
    }
    .name{
        font-family: PingFang-SC-Bold;
        font-size: 32upx;
        line-height: 40upx;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        margin: auto 20upx auto 0;
        flex-shrink:0;
        max-width: 128upx;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .sex{
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        line-height: 40upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        margin: auto 20upx auto 0;
    }
    .phone{
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        line-height: 40upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        margin: auto 20upx auto 0;
    }
    .deal_info{
        font-family: PingFang-SC-Medium;
        font-size: 22upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 28upx;
        letter-spacing: 0upx;
        color: #a3a5a8;
        margin-top: 20upx;
    }
    .commission_unm{
        font-family: 1234567890-Regular;
        flex-shrink:0;
        margin-right: 40upx;
        font-size: 36upx;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
    }
</style>