
<template>
    <view>
        <!--搜索-->
        <view class="search_box">
            <view class="search_header f_r_c">
                <view class="" @click.stop="clickSource">
                    <text class="search_text">{{sourceDefaultCheck=='-10'?'来源':sourceFromName}}</text>
                    <image class="search_icon_shang" src="http://cdn.haofang.net/static/xffx-uniapp/customer/shang.png" v-if="isShowSourceview"></image>
                    <image class="search_icon_xia" src="http://cdn.haofang.net/static/xffx-uniapp/customer/xia.png" v-else></image>
                </view>
            </view>
        </view>

        <view @touchmove.stop.prevent="" :class="{'show_mark' : isShowSourceview}" @click="clickSource" class="search_source_list" v-if="isShowSourceview">
            <scroll-view @touchmove.stop.prevent="" :style="{height: 114 * (sourceFrom.length > 6 ? 6 : sourceFrom.length)+ 'upx'}"
                         :class="{'menu' : isShowSourceview}" class="search_source_scroll" scroll-y>
                <block v-for="(item,index) in sourceFrom" :key="index">
                    <view hover-class="none" class="search_list_no_check" :class="{search_list_is_check: item.value == sourceDefaultCheck}" @click.stop="search(item)">{{item.name}}</view>
                </block>
            </scroll-view>
        </view>

        <!--列表-->
        <view class="list_box">
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
                <!--<view v-if="!isScrollIng && !haveMore" class="no_more_data">没有更多数据了！</view>-->
            </view>
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

    export default {
        components : {
            scrollLoading,
            screenCustomer,
            screenCustomerOfDirectCustomer,
            noData
        },

        data(){
            return{
                sourceDefaultCheck : '-10', // 来源搜索默认选中全部(-10)
                isShowSourceview : false, // 是否展示来源搜索
                sourceFromName : '全部', // 默认全部
                sourceFrom :[
                    {name: '全部', value: '-10'},
                    {name: '报备客户', value: '0'},
                    {name: '直客', value: '1'}
                ],

                phone: "",
                list : null,
                pageRows : 10, //每页记录数
                pageOffset : 1, //页码
                keyword : '', // 搜索关键字
                directCustomer : '', //状态搜索 0:报备客户 1:直客

                isScrollIng : false, // 是否在请求中
                haveMore : true, // 是否有更多数据

                customer_sex_man_img : 'http://cdn.haofang.net/static/xffx-uniapp/customer/man.png', //男性性别图
                customer_sex_waman_img : 'http://cdn.haofang.net/static/xffx-uniapp/customer/waman.png', //女性性别图
                customer_phone_img : 'http://cdn.haofang.net/static/xffx-uniapp/customer/phone.png', // 电话图片
                is_directCustomer_img : 'http://cdn.haofang.net/static/xffx-uniapp/customer/zhike.png', //是否直客图片
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

        // 原生按钮
        onNavigationBarButtonTap(e) {
            if (!e.id) return;

            if (e.id === "add") {
                uni.navigateTo({
                    url: "/pagesCustomer/customerRegistration/customerRegistration"
                });
            }
        },

        // 监听下拉刷新
        onPullDownRefresh() {
            this.pageOffset = 1;
            this.initData().then(list => {
                this.list = list;
                uni.stopPullDownRefresh();
            })
            .catch(() => {
                uni.stopPullDownRefresh();
            });
        },

        methods:{
            // 来源搜索
            clickSource(){
                this.isShowSourceview = !this.isShowSourceview;
            },

            // 获取搜索结果数据
            search(option){
                let _this = this;
                _this.sourceDefaultCheck = option.value;
                _this.isShowSourceview = false;
                _this.sourceFromName = option.name;
                _this.pageOffset = 1;
                _this.isScrollIng = true;
                if (option.value == '-10'){
                    _this.directCustomer = '';
                }else {
                    _this.directCustomer = option.value;
                }
                uni.startPullDownRefresh();
            },

            // 加载数据
            initData() {
                let that = this;
                let param = {
                    pageRows: that.pageRows,
                    pageOffset: that.pageOffset,
                    keyword: that.keyword,
                    directCustomer: that.directCustomer,
                    custStatus: 99, //已到访使用99
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
                            return  [];
                        }

                        if (res.data.custList && (res.data.custList.length < that.pageRows)) {
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
                        return res.data.custList || [];
                    })
                    .catch(res=>{
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
                   this.list = this.list.concat(list);
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

            // 跳转详情
            goToCustomerDetailView(item){
                uni.navigateTo({
                    url: '/pagesCustomer/customerDetail/customerDetail?custId='+ item.custId + '&cityId=' + item.cityId
                });
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
        background-color: #FFFFFF;
    }

    /*搜索相关样式*/
    .search_header{
        background-color: #FBFBFB;
    }
    .search_box{
        /*  #ifdef  APP-PLUS  */
        top:0;
        /*  #endif  */
        /*  #ifdef  H5  */
        top:44px;
        /*  #endif  */
        position: fixed;
        left: 0;
        width: 100%;
        background: #FBFBFB;
        z-index: 99;
    }
    .null_view{
        width: 100%;
        height: 25upx;
        background-color: #f6f6f6;
    }
    .search_text{
        font-size: 25upx;
        line-height: 65upx;
    }
    .search_icon_xia{
        width: 20upx;
        height: 15upx;
        opacity: 0.3;
        margin-left: 15upx;
    }
    .search_icon_shang{
        width: 20upx;
        height: 15upx;
        margin-left: 15upx;
    }
    .menu{
        animation: menu .2s ease-in-out forwards;
    }
    @keyframes menu {
        0% {
            top: -400px;
        }
        50% {
            top: -200px;
        }
        100% {
            top: 0;
        }
    }
    @keyframes showMark{
        0%{transform: scale(1); background: rgba(0,0,0,0);}
        100%{transform: scale(1); background: rgba(0,0,0,0.3);}
    }
    .show_mark{
        animation: showMark .2s ease-in-out forwards;
    }
    .search_source_scroll{
        width: 100%;
        background: #ffffff;
        padding-top: 65upx;
        box-sizing: border-box;
        position: relative;
    }
    .search_source_list{
        overflow-y: auto;
        /*  #ifdef  APP-PLUS  */
        top:0;
        /*  #endif  */
        /*  #ifdef  H5  */
        top:44px;
        /*  #endif  */
        width: 100%;
        background: rgba(0,0,0,0.4);
        height: 100%;
        z-index: 88;
        position: fixed;
        left: 0;
    }
    .search_list_no_check:last-child{
        border-bottom: none;
    }
    .search_list_no_check{
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #333333;
        margin-left: 30upx;
        line-height: 90upx;
        border-bottom: 1px solid #e7e7e7;
    }
    .search_list_is_check{
        color: #3396fb;
    }

    /*列表相关样式*/
    .list_box{
        padding-top: 65upx;
        box-sizing: border-box;
    }
    .box{
        background-color: #FFFFFF;
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
        border-radius: 6upx;
        letter-spacing: 0upx;
        color: #40acb9;
        padding: 8upx;
        margin: auto;
    }
    .room{
        margin-right: 10upx;
        color: #42a77f;
    }
    .room>text{
        font-size: 18upx;
        background-color: #e2f5ef;
        border-radius: 6upx;
        letter-spacing: 0upx;
        padding: 8upx;
        margin: auto;
    }
    .pay_method>text{
        font-size: 18upx;
        background-color: #ffece6;
        border-radius: 6upx;
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