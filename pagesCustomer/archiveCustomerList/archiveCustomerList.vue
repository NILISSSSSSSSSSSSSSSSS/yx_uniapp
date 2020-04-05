
<template>
    <view>
        <view v-if="list && list.length > 0">
            <view class="box" @click.stop="goToCustomerDetailView(item)" v-for="(item,index) in list" :key="index">
                <!--信息展示-->
                <view class="top_item">
                    <view class="f_r_s">
                        <view class="customer_name">{{item.custName}}</view>
                        <image class="customer_sex" mode="aspectFill" :src="item.custSex == 1 ? customer_sex_man_img : customer_sex_waman_img"></image>
                        <block v-if="item.isCanCall">
                            <view class="customer_phone" @click.stop="goToCallPhoneView(item.custMobile)">{{item.custMobile}}</view>
                            <image class="customer_phone_logo" @click.stop="goToCallPhoneView(item.custMobile)" mode="aspectFill" :src="customer_phone_img"></image>
                        </block>
                        <block v-if="!item.isCanCall">
                            <view class="customer_phone_else" @click.stop="">{{item.custMobile}}</view>
                        </block>
                        <image class="customer_type" mode="aspectFill" :src="is_directCustomer_img" v-if="item.directCustomer"></image>
                    </view>
                    <view class="xuqiu_item f_r_s">
                        <block v-if="item.purchaseBudget">
                            <view class="price">
                                <text>{{item.purchaseBudget}}</text>
                            </view>
                        </block>
                        <block v-if="item.intentionLayout.length > 0">
                            <view class="room" v-for="(val,key) in item.intentionLayout" :key="key">
                                <text>{{val}}</text>
                            </view>
                        </block>
                        <block v-if="item.payWayCn">
                            <view class="pay_method">
                                <text>{{item.payWayCn}}</text>
                            </view>
                        </block>
                    </view>
                </view>

                <!--进度-->
                <block v-if="item.directCustomer">
                    <!--直客-->
                    <screenCustomerOfDirectCustomer :custStatus="item.custStatus" :paidStatus="item.paidStatus"></screenCustomerOfDirectCustomer>
                </block>
                <block v-if="!item.directCustomer">
                    <screenCustomer :custStatus="item.custStatus" :paidStatus="item.paidStatus"></screenCustomer>
                </block>
                <view class="null_view"></view>
            </view>

            <!--底部加载更多-->
            <scrollLoading v-if="isScrollIng && haveMore" :isScrollIng="true"></scrollLoading>
        </view>

        <!--无数据-->
        <noData v-if="list && list.length === 0"></noData>

        <showModal :modal='{
            title: "拨打电话",
            content: phone,
            confirmText: "呼叫",
            cancelColor: "rgba(0,0,0,0.6)",
            confirmColor: "#3396fb",
        }' ref="modal" @onModalChanged="onModalChanged"></showModal>

    </view>
</template>

<script>
    import {GetCustomerListByStatus} from "../../net/CustomerNet";
    import scrollLoading from "@/components/scrollLoading.vue";
    import screenCustomer from  "@/components/screenCustomer.vue";
    import screenCustomerOfDirectCustomer from  "@/components/screenCustomerOfDirectCustomer.vue";
    import noData from  "@/components/noData.vue";

    class PrivateData {
        static archiveId = "";
    }

    export default{
        components : {
            scrollLoading,
            screenCustomer,
            screenCustomerOfDirectCustomer,
            noData
        },

        data(){
            return{
                list : null,
                pageRows : 10, //每页记录数
                pageOffset : 1, //页码
                keyword : '', // 搜索关键字

                isScrollIng : false, // 是否在请求中
                haveMore : true, // 是否有更多数据

                phone: "",
                customer_sex_man_img : 'http://cdn.haofang.net/static/xffx-uniapp/customer/man.png', //男性性别图
                customer_sex_waman_img : 'http://cdn.haofang.net/static/xffx-uniapp/customer/waman.png', //女性性别图
                customer_phone_img : 'http://cdn.haofang.net/static/xffx-uniapp/customer/phone.png', // 电话图片
                is_directCustomer_img : 'http://cdn.haofang.net/static/xffx-uniapp/customer/zhike.png', //是否直客图片
            }
        },

        onLoad(options) {
            PrivateData.archiveId = options.archiveId;
            if (options.name) {
                uni.setNavigationBarTitle({
                    title: options.name
                });
                // 避免设置不上
                setTimeout(() => {
                    uni.setNavigationBarTitle({
                        title: options.name
                    });
                }, 500);
            }
        },

        onShow() {
            setTimeout(() => {
                uni.startPullDownRefresh();
            }, 100);
        },

        //触底
        onReachBottom() {
            this.scrollBottom();
        },

        // 监听下拉刷新
        onPullDownRefresh() {
            this.pageOffset = 1;
            this.initData()
                .then(list => {
                    this.list = list;
                    uni.stopPullDownRefresh();
                })
                .catch(() => {
                    uni.stopPullDownRefresh();
                });
        },

        methods:{
            // 加载数据
            initData() {
                let that = this;
                let param = {
                    pageRows: that.pageRows,
                    pageOffset: that.pageOffset,
                    keyword: that.keyword,
                    archiveId: PrivateData.archiveId
                };
                return new GetCustomerListByStatus(param).send()
                    .then(res=>{
                        if (res.errCode != 200){
                            this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                            return [];
                        }

                        if (!res.data.custList){
                            that.haveMore = false;
                            that.isScrollIng = false;
                            return [];
                        }

                        if (res.data.custList.length < that.pageRows) {
                            that.haveMore = false;
                        } else {
                            that.haveMore = true;
                        }
                        for (let item of res.data.custList){
                            item.intentionLayout = item.intentionLayout.split(",");
                            item.isCanCall = true;
                            if (this.VerifyPhone(item.custMobile)){
                                item.isCanCall = false;
                            }
                        }

                        that.isScrollIng = false;
                        return (res.data.custList || []);
                    })
                    .catch((res)=>{
                        this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                        return res;
                    });
            },

            // 触底加载更多
            scrollBottom() {
                let that = this;
                if (that.isScrollIng || !that.haveMore) return;

                that.isScrollIng = true;
                that.pageOffset++;

                that.initData().then(list => {
                    this.list = (this.list || null).concat(list);
                });
            },

            // 跳转详情
            goToCustomerDetailView(item){
                uni.navigateTo({
                    url: '/pagesCustomer/customerDetail/customerDetail?custId='+ item.custId + '&cityId=' + item.cityId
                });
            },

            // 拨打电话
            goToCallPhoneView(phone){
                this.phone = phone;
                this.$refs.modal.show();
            },
            onModalChanged(val) {
                if(val) {
                    this.DifferenceApi.makePhoneCall(this.phone);
                }
            },

            //验证手机号码
            VerifyPhone(phone){
                if (!phone) return false;

                let reg=/[*]+/;
                if (reg.test(phone)){
                    return true;
                }

                return false;
            },
        }
    }
</script>

<style>
    page{
        background-color: #f8f8f8;
    }

    .box{
        background-color: #FFFFFF;
    }
    .null_view{
        width: 100%;
        height: 25upx;
        background-color: #f6f6f6;
    }
    .top_item{
        padding-top: 40upx;
        padding-bottom: 30upx;
        margin-right: 28upx;
        margin-left: 28upx;
        /*border-bottom: 1px solid #ededed;*/
    }
    .customer_name{
        margin: auto 10upx auto 0upx;
        font-size: 32upx;
        letter-spacing: 0upx;
        color: #333333;
    }
    .customer_sex{
        margin: auto 20upx auto 0upx;
        width: 20upx;
        height: 20upx;
    }
    .customer_phone{
        margin: auto 10upx auto 0upx;
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #3396fb;
    }
    .customer_phone_else{
        margin: auto 10upx auto 0upx;
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        /*color: #3396fb;*/
    }
    .customer_phone_logo{
        margin: auto 20upx auto 0upx;
        width: 25upx;
        height: 24upx;
    }
    .customer_type{
        margin: auto 0upx auto auto;
        width: 60upx;
        height: 30upx;
    }

    .xuqiu_item{
        margin-top: 10upx;
    }
    .price{
        margin-right: 10upx;
    }
    .price>text{
        font-size: 18upx;
        background-color: #edfbfc;
        border-radius: 4upx;
        letter-spacing: 0upx;
        color: #40acb9;
        padding: 8upx;
        margin: auto;
    }
    .room{
        margin-right: 10upx;
    }
    .room>text{
        font-size: 18upx;
        background-color: #e2f5ef;
        border-radius: 4upx;
        letter-spacing: 0upx;
        color: #42a77f;
        padding: 8upx;
        margin: auto;
    }
    .pay_method>text{
        font-size: 18upx;
        background-color: #ffece6;
        border-radius: 4upx;
        letter-spacing: 0upx;
        color: #ff8063;
        padding: 8upx;
        margin: auto;
    }
    .no_more_data {
        height: 80upx;
        line-height: 80upx;
        text-align: center;
        font-size: 26upx;
        color: #666666;
    }
</style>
