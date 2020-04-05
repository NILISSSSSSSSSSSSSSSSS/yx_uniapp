<!--员工的客户组件-->

<template>
    <view>
        <block v-if="isGoDetail">
            <view class="" @click.stop="goToCustomerDetailView(item)">
                <view class="f_r_b">
                    <view class="f_r_s">
                        <view class="name">{{item.custName}}</view>
                        <view class="sex">{{item.custSex===0?'女':'男'}}</view>
                        <view class="phone">{{item.custMobile}}</view>
                        <view class="directCustomer" v-if="item.directCustomer===1">直客</view>
                    </view>
                    <view :class="statusClass[item.custStatus]" v-if="item.directCustomer!==1">{{statusText[item.custStatus]}}</view>
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

                <view class="price">预算价格：{{item.amount||'--'}}</view>
            </view>
        </block>
        <block v-else>
            <view class="">
                <view class="f_r_b">
                    <view class="f_r_s">
                        <view class="name">{{item.custName}}</view>
                        <view class="sex">{{item.custSex===0?'女':'男'}}</view>
                        <view class="phone">{{item.custMobile}}</view>
                        <view class="directCustomer" v-if="item.directCustomer===1">直客</view>
                    </view>
                    <view :class="statusClass[item.custStatus]" v-if="item.directCustomer!==1">{{statusText[item.custStatus]}}</view>
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

                <view class="price">预算价格：{{item.amount||'--'}}</view>
            </view>
        </block>
    </view>
</template>

<!--待审核：1   待确客：2   待认购：3   待签约：4   待结佣：5   已结佣：6   已过期：-2  已退佣：7   撤销认购：-1  无效：0-->
<script>
    export default {
        props: {
            item: {
                type: Object,
                default() {
                    return {};
                }
            },
            isNew: {
                type: String|Number,
                default() {
                    return "";
                }
            },
            // 是否点击进入详情
            isGoDetail: {
                type: Boolean,
                default() {
                    return true;
                }
            },
        },

        data(){
            return{
                statusText:{
                    // -3带看过期 -2:报备过期  -1:撤销  0:无效    1:报备 2:审核 3:带看  4:认购  5:签约  6:结佣  7:退佣   8.提交
                    "-3": "带看过期",
                    "1" : "待审核",
                    "2" : "待确客",
                    "3" : "待认购",
                    "4" : "待签约",
                    "5" : "待结佣",
                    "6" : "已结佣",
                    "7" : "已退佣",
                    "-2": "已过期",
                    "-1": "撤销认购",
                    "0" : "无效",
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
                    "-1": "status_gray",
                    "0" : "status_gray",
                    "-3": "status_gray",
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
            }
        }
    }
</script>

<style scoped>
    .name{
        font-size: 32upx;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        line-height: 60upx;
        margin: auto 20upx auto 0upx;
        flex-shrink:0;
        max-width: 200upx;
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
        line-height: 60upx;
        margin: auto 20upx auto 0upx;
    }
    .phone{
        font-size: 30upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        line-height: 60upx;
        margin: auto 10upx auto 0upx;
    }
    .directCustomer{
        font-size: 22upx;
        background-color: #eff4fe;
        border-radius: 6upx;
        letter-spacing: 0upx;
        color: #3072f6;
        margin: auto;
        padding: 0upx 5upx 5upx 5upx;
        text-align: center;
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
    }
    .demand_build{
        margin: auto 30upx auto 0upx;
    }
    .demand_room{
        margin: auto auto auto 0upx;
    }
    .room{
        margin-right: 10upx;
    }
    .price{
        font-size: 22upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 45upx;
        letter-spacing: 0upx;
        color: #a3a5a8;
    }
</style>
