<template>
    <view>
        <view class="listItem f_c_s" v-for="(item,index) in list" :key="index" @click.stop="goToCustomerDetailView(item)">
            <collectFormId></collectFormId>
            <view style="margin: auto;width: 100%">
                <view class="f_r_b">
                    <view class="f_r_s">
                        <view class="name">{{item.custName}}</view>
                        <view class="sex">{{item.custSex===0?'女':'男'}}</view>
                        <view class="phone">{{item.custMobile}}</view>
                        <view class="directCustomer" v-if="item.directCustomer===1">直客</view>
                    </view>
                    <view :class="statusClass[dealCustStatus(item)]" v-if="item.directCustomer!==1">{{statusText[dealCustStatus(item)]}}</view>
                    <view :class="directCustomerStatusClass[item.custStatus]" v-if="item.directCustomer===1">{{directCustomerStatusText[item.custStatus]}}</view>
                </view>

                <view class="demand f_r_s">
                    <text class="demand_build">意向楼盘：{{item.buildName||'--'}}</text>
                    <text class="demand_room">意向户型：
                        <block v-if="item.layout.length>0">
                            <text v-for="(val,key) in item.layout" :key="key" class="room">
                                {{val}}
                            </text>
                        </block>
                        <block v-else>
                            <text>--</text>
                        </block>
                    </text>
                </view>

                <view class="price">预算价格：{{item.amount || item.price ||'--'}}</view>
            </view>
        </view>
    </view>
</template>

<!--待审核：1   待确客：2   待认购：3   待签约：4   待结佣：5   已结佣：6   已过期：-2  已退佣：7   撤销认购：-1  无效：0-->
<script>
    export default {
        props: {
            list: {
                type: Array,
                default() {
                    return [];
                }
            },
            isNew: {
                type: String|Number,
                default() {
                    return "";
                }
            }
        },
        data(){
            return{
                statusText:{
                    // -3带看过期 -2:报备过期  -1:撤销  0:无效    1:报备 2:审核 3:带看  4:认购  5:签约  6:结佣  7:退佣   8.提交
                    "-2": "报备过期",
                    "-3": "带看过期",
                    "1" : "待审核",
                    "2" : "待确客",
                    "3" : "待认购",
                    "4" : "待签约",
                    "5" : "待结佣",
                    "6" : "已结佣", // 页面不用了
                    "7" : "已退佣",
                    "-1": "撤销认购",
                    "0" : "无效",
                    '101' : '待结佣', //状态为6 未支付
                    '102' : '已结佣', //状态为6 已支付
                },
                statusClass:{
                    "1" : "status_orange",
                    "2" : "status_orange",
                    "3" : "status_orange",
                    "4" : "status_orange",
                    "5" : "status_orange",
                    "6" : "status_green",
                    "7" : "status_gray",
                    "-2": "status_gray",
                    "-3": "status_gray",
                    "-1": "status_gray",
                    "0" : "status_gray",
                    "101": "status_orange",
                    "102": "status_green",
                },
                directCustomerStatusText: {
                    "3" : "待认购",
                    "4" : "待签约",
                    "5" : "已签约",
                    "-1": "撤销认购",
                },
                directCustomerStatusClass: {
                    "3" : "status_orange",
                    "4" : "status_orange",
                    "5" : "status_green",
                    "-1": "status_gray",
                }
            }
        },

        methods : {
            goToCustomerDetailView(item){
                uni.navigateTo({
                    url: '/pagesCustomer/customerDetail/customerDetail?custId='+ item.custId
                        + '&cityId=' + item.cityId + '&custName=' + item.custName
                        + "&isNew=" + this.isNew
                });
            },
            dealCustStatus(item){
                if (item.custStatus !=6 ){
                    return item.custStatus;
                }

                // if (item.paidStatus==1){
                //     return  '102';
                // }
                //
                // if (item.paidStatus==0){
                //     console.log('--?')
                //     return  '101';
                // }

                return '6';
            },
        }
    }
</script>

<style scoped>
    .listItem{
        margin-left: 41upx;
        margin-right: 41upx;
        box-sizing: border-box;
        height: 192upx;
        border-bottom: solid 1px #F5F5F5;
    }
    .listItem:first-child{
        padding-top: 0upx;
    }
    .name{
        font-size: 32upx;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        /*line-height: 1;*/
        margin: auto 20upx auto 0upx;
        flex-shrink:0;
        max-width: 250upx;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .sex{
        font-size: 30upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        line-height: 32upx;
        margin: auto 20upx auto 0upx;
    }
    .phone{
        font-size: 30upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        line-height: 32upx;
        margin: auto 10upx auto 0upx;
    }
    .directCustomer{
        font-size: 22upx;
        line-height: 22upx;
        background-color: #eff4fe;
        border-radius: 6upx;
        letter-spacing: 0upx;
        color: #3072f6;
        margin: auto;
        padding: 5upx;
        text-align: center;
        align-items: center;
    }
    /*灰色按钮*/
    .status_orange{
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #ffb109;
        margin: auto 0upx auto 0upx;
    }
    .status_green{
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #44bc6e;
        margin: auto 0upx auto 0upx;
    }
    .status_gray{
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #a3a5a8;
        margin: auto 0upx auto 0upx;
    }

    .demand{
        font-size: 22upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 45upx;
        letter-spacing: 0upx;
        color: #a3a5a8;
        margin-top: 6upx;
    }
    .demand_build{
        margin: auto 30upx auto 0upx;
    }
    .demand_room{
        margin: auto auto auto 0upx;
        flex-shrink:0;
        letter-spacing: 0;
    }
    .room{
        margin-right: 10upx;
    }
    .price{
        font-size: 22upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30upx;
        letter-spacing: 0upx;
        color: #a3a5a8;
    }
</style>
