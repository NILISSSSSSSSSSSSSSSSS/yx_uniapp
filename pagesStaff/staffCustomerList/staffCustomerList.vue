<template>
    <view class="box">
        <view class="top_item">
            <!--状态搜索-->
            <view class="search_box">
                <view class="f_r_c" :class="{search_header : isShowSourceview || isShowCustormerStatusView}">
                    <view class="source_of_search f_r_c" @click.stop="clickSource">
                        <text class="search_text" :class="{search_text_click : isShowSourceview}">{{sourceDefaultCheck=='-10'?'类型':sourceFromName}}</text>
                        <image class="search_icon_shang" src="http://cdn.haofang.net/static/xffx-uniapp/customer/shang.png" v-if="isShowSourceview"></image>
                        <image class="search_icon_xia" src="http://cdn.haofang.net/static/xffx-uniapp/customer/xia.png" v-else></image>
                    </view>

                    <view class="source_of_status f_r_c" @click.stop="clickCustormerStatus">
                        <text class="search_text" :class="{search_text_click : isShowCustormerStatusView}">{{CustormerStatusDefaultCheck=='-10'?'状态':CustormerStatusName}}</text>
                        <image class="search_icon_shang" src="http://cdn.haofang.net/static/xffx-uniapp/customer/shang.png" v-if="isShowCustormerStatusView"></image>
                        <image class="search_icon_xia" src="http://cdn.haofang.net/static/xffx-uniapp/customer/xia.png" v-else></image>
                    </view>
                </view>
            </view>
        </view>

        <!--状态搜索的下拉列表-->
        <view @touchmove.stop.prevent="" :class="{'show_mark' : isShowSourceview}" @click="clickSource" class="search_source_list" v-if="isShowSourceview">
            <scroll-view @touchmove.stop.prevent="" :style="{height: 114 * (sourceFrom.length > 6 ? 6 : sourceFrom.length)+ 'upx'}"
                         :class="{'menu' : isShowSourceview}" class="search_source_scroll" scroll-y>
                <block v-for="(item,index) in sourceFrom" :key="index">
                    <view hover-class="none" class="search_list_no_check" :class="{search_list_is_check: item.value == sourceDefaultCheck}" @click.stop="GoToSourceSearch(item)">{{item.name}}</view>
                </block>
            </scroll-view>
        </view>
        <view @touchmove.stop.prevent="" :class="{'show_mark' : isShowCustormerStatusView}" @click="clickCustormerStatus" class="search_source_list" v-if="isShowCustormerStatusView">
            <scroll-view @touchmove.stop.prevent="" style="height: 500upx;"
                         :class="{'menu' : isShowCustormerStatusView}" class="search_source_scroll" scroll-y>
                <block v-for="(item,index) in CustormerStatus" :key="index">
                    <view hover-class="none" class="search_list_no_check" :class="{search_list_is_check: item.value == CustormerStatusDefaultCheck}" @click.stop="GoToStatusSearch(item)">{{item.name}}</view>
                </block>
            </scroll-view>
        </view>

        <!--列表 customerList-->
        <scroll-view class="c_lits" scroll-y="true" @scrolltolower="scrollBottom">
            <!--统计数据组-->
            <view class="count_view">
                <image class="shu_line" src="http://cdn.haofang.net/static/xfldDeveloper/customer/shu_line.png"></image>
                <image class="heng_line" src="http://cdn.haofang.net/static/xfldDeveloper/customer/heng_line.png"></image>
                <view class="top_info_view f_r_c">
                    <view class="f_c_c top_info_item">
                        <view class="top_info_num">{{userSellList.report||'0'}}</view>
                        <view class="top_info_text">报备数（组）</view>
                    </view>
                    <view class="f_c_c top_info_item">
                        <view class="top_info_num">{{userSellList.band||'0'}}</view>
                        <view class="top_info_text">带看数（组）</view>
                    </view>
                </view>
                <view class="top_info_view f_r_c">
                    <view class="f_c_c top_info_item">
                        <view class="top_info_num">{{userSellList.sign||'0'}}</view>
                        <view class="top_info_text">签约数（组）</view>
                    </view>
                    <view class="f_c_c top_info_item">
                        <view class="top_info_num" v-if="userSellList.commission">{{userSellList.commission||'0'}}</view>
                        <view class="top_info_text" v-if="userSellList.commission">结佣金额（元）</view>
                    </view>
                </view>
            </view>
            <view class="empty_view"></view>
            <block v-if="list && list.length > 0" v-for="(item,index) in list" :key="index">
                <view class="customer_list">
                    <staffCustomer :item="item"></staffCustomer>
                </view>
            </block>
            <!--无数据-->
            <noCustomer v-if="list && list.length === 0"></noCustomer>
            <!--底部加载更多-->
            <scrollLoading v-if="isScrollIng && haveMore" :isScrollIng="true"></scrollLoading>
            <view v-if="!isScrollIng && !haveMore && list.length" class="no_more_data">没有更多数据了</view>
        </scroll-view>
    </view>
</template>

<script>
    import noCustomer from "../components/noCustomer";
    import scrollLoading from  "@/components/scrollLoading.vue";
    import staffCustomer from "../components/staffCustomer";
    import {GetCustListForStaff} from "../../net/Staff";

    var brokerId = '';  // 当前员工id

    export default {
        name: "staffCustomerList",

        components : {
            noCustomer,
            scrollLoading,
            staffCustomer
        },

        data(){
            return{
                sourceDefaultCheck : -10, // 来源搜索默认选中全部(-10)
                isShowSourceview : false, // 是否展示来源搜索
                sourceFrom :[
                    {name: '全部', value: -10},
                    {name: '报备客户', value: 0},
                    {name: '直客', value: 1}
                ],
                sourceFromName : '全部',

                CustormerStatusDefaultCheck : -10, //状态搜索默认选中全部(-10)
                isShowCustormerStatusView : false, //是否状态搜索
                CustormerStatus:[
                    {name: '全部', value: -10},
                    {name: '待审核', value: 1},
                    {name: '待确客', value: 2},
                    {name: '待认购', value: 3},
                    {name: '待签约', value: 4},
                    {name: '待结佣', value: 95},
                    {name: '已结佣', value: 6},
                    {name: '已退佣', value: 7},
                    {name: '无效', value: 0},
                    {name: '撤销认购', value: -1},
                    {name: '报备过期', value: -2},
                    {name: '带看过期', value: -3},
                ],
                CustormerStatusName:'全部',

                directCustomer : '', //状态搜索 0:报备客户 1:直客
                custStatus : '',
                pageOffset : 1,// 搜索页码
                pageRows : 10, // 每页记录数
                paging : 1, // 是否分页 1:是 0:否
                list : null, // 列表数据

                isScrollIng : false, // 是否在请求中
                haveMore : true, // 是否有更多数据
                userSellList: {},// 顶部数据
            }
        },

        onShow(){
            this.initData().then(list => {
                this.list = list || [];
            });
        },

        onLoad(option){
            this.brokerId = option.userId;
            console.log(this.brokerId,'--页面接受:custId--');

            // 传了客户姓名 设置客户姓名为标题
            if (option.userName){
                uni.setNavigationBarTitle({
                    title: option.userName + '的客户'
                });
            }
        },

        methods : {
            // 状态搜索相关方法 S
            clickSource(){
                this.isShowSourceview = !this.isShowSourceview;
                this.isShowCustormerStatusView = false; // 来源搜索时将状态搜索关闭
            },
            clickCustormerStatus(){
                this.isShowCustormerStatusView = !this.isShowCustormerStatusView;
                this.isShowSourceview = false; // 状态搜索时将来源搜索关闭
                if (this.sourceDefaultCheck == 0){
                    this.CustormerStatus = [
                        {name: '全部', value: -10},
                        {name: '待审核', value: 1},
                        {name: '待确客', value: 2},
                        {name: '待认购', value: 3},
                        {name: '待签约', value: 4},
                        {name: '待结佣', value: 95},
                        {name: '已结佣', value: 6},
                        {name: '已退佣', value: 7},
                        {name: '无效', value: 0},
                        {name: '撤销认购', value: -1},
                        {name: '报备过期', value: -2},
                        {name: '带看过期', value: -3},
                    ];
                }
                if (this.sourceDefaultCheck == 1){
                    this.CustormerStatus = [
                        {name: '全部', value: -10},
                        {name: '待认购', value: 96},
                        {name: '待签约', value: 4},
                        {name: '已签约', value: 5},
                        {name: '撤销认购', value: -1},
                    ];
                }
                if (this.sourceDefaultCheck == -10){
                    this.CustormerStatus = [
                        {name: '全部', value: -10},
                        {name: '待审核', value: 1},
                        {name: '待确客', value: 2},
                        {name: '待认购', value: 3},
                        {name: '待签约', value: 4},
                        {name: '待结佣', value: 95},
                        {name: '已结佣', value: 6},
                        {name: '已退佣', value: 7},
                        {name: '无效', value: 0},
                        {name: '撤销认购', value: -1},
                        {name: '报备过期', value: -2},
                        {name: '带看过期', value: -3},
                    ]
                }
            },
            GoToSourceSearch(option){
                let that = this;
                that.sourceFromName = option.name;
                that.sourceDefaultCheck = option.value;
                that.isShowSourceview =false;
                that.pageOffset = 1;
                this.CustormerStatusDefaultCheck = '-10';

                if (option.value == '-10'){
                    that.directCustomer = '';
                }else {
                    that.directCustomer = option.value;
                }

                // 请求接口
                that.initData().then(list => {
                    this.list = list;
                });
            },
            GoToStatusSearch(option){
                let that = this;
                that.CustormerStatusDefaultCheck = option.value;
                that.CustormerStatusName = option.name;
                that.isShowCustormerStatusView = false;
                that.pageOffset = 1;
                if (option.value == '-10'){
                    that.custStatus = '';
                }else {
                    that.custStatus = option.value;
                }
                // 请求接口
                that.initData().then(list => {
                    this.list = list;
                });
            },
            // 状态搜索相关方法 E

            //获取客户列表数据
            initData(){
                let that = this;
                let param = {
                    pageRows: that.pageRows,
                    pageOffset: that.pageOffset,
                    paging: that.paging,
                    brokerId : that.brokerId,
                };
                if (that.sourceDefaultCheck != '-10'){
                    param.directCustomer = that.directCustomer;
                }
                if (that.CustormerStatusDefaultCheck != '-10'){
                    param.custStatus = that.custStatus;
                }

                //发起请求 GetCustListForStaff
                return new GetCustListForStaff(param).send()
                    .then(res=>{
                        if (res.errCode != 200){
                            return Promise.reject(res);
                        }

                        if (!res.data.custList){
                            that.haveMore = false;
                            that.isScrollIng = false;
                            return [];
                        }

                        if (res.data.userSellList){
                            this.userSellList = res.data.userSellList;
                        }

                        if (res.data.custList && (res.data.custList.length < that.pageRows)) {
                            that.haveMore = false;
                        } else {
                            that.haveMore = true;
                        }

                        for (let item of res.data.custList){
                            item.layout = item.layout ? item.layout.split(",") : []; // 处理户型
                        }

                        that.isScrollIng = false;
                        console.log(res.data.custList,'员工客户列表返回数据');
                        return (res.data.custList || []);
                    })
                    .catch((res)=>{
                        this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                        return res;
                    });
            },

            //触底
            onReachBottom() {
                this.scrollBottom();
            },
            // 触底加载更多
            scrollBottom() {
                let that = this;
                if (that.isScrollIng || !that.haveMore) return;

                that.isScrollIng = true;
                that.pageOffset++;
                that.initData().then(list => {
                    this.list = (this.list || []).concat(list);
                });
            },
        },
    }
</script>

<style>
    page{
        background: #f8f8f8;
        width: 100%;
        height: 100%;
    }
    .shu_line{
        width: 2upx;
        height: 320upx;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .heng_line{
        width: 550upx;
        height: 2upx;
        position: absolute;
        top: 48%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .empty_view{
        width: 100%;
        height: 50upx;
        background-color: #f8f8f8;
    }
    .box{
        width: 100%;
        height: 100%;
    }
    .top_item{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
    }
    /*状态搜索相关样式 S*/
    .search_box{
        width: 100%;
        background: #FFFFFF;
        z-index: 99;
    }
    .search_source_list{
        position: fixed;
        top: 89upx;
        left: 0;
        overflow-y: auto;
        width: 100%;
        background: rgba(0,0,0,0.4);
        height: 100%;
        z-index: 88;
    }
    .search_header{
        border-bottom: solid 1px #F5F5F5;
    }
    .source_of_search{
        margin-right: 260upx;
    }
    .search_text{
        font-size: 28upx;
        line-height: 90upx;
    }
    .search_text_click{
        color: #0084ff;
    }
    .search_icon_xia{
        width: 14upx;
        height: 8upx;
        opacity: 0.3;
        margin: auto auto auto 15upx;
    }
    .search_icon_shang{
        width: 14upx;
        height: 8upx;
        margin: auto auto auto 15upx;
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
        box-sizing: border-box;
        position: relative;
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
        border-bottom: 1px solid #F5F5F5;
    }
    .search_list_is_check{
        color: #0084ff;
    }
    /*状态搜索相关样式 E*/

    /*列表相关样式*/
    .count_view{
        padding: 10upx 40upx 30upx 40upx;
        box-sizing: border-box;
        background: #FFFFFF;
        position: relative;
    }
    .top_info_view{
        align-items: center;
    }
    .top_info_item{
        width: 100%;
        height: 155upx;
        text-align: center;
    }
    .top_info_num{
        font-size: 48upx;
        font-weight: bold;
        font-stretch: normal;
        line-height: 62upx;
        height: 62upx;
        color: #191f25;
    }
    .top_info_text{
        font-family: PingFang-SC-Medium;
        font-size: 24upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 53upx;
        color: #7d8184;
    }
    .border-r-b{
        border-right: solid 1px rgba(235, 235, 235, 0.3);
        border-bottom:solid 1px rgba(235, 235, 235, 0.3)
    }
    .border-b{
        border-bottom: solid 1px rgba(235, 235, 235, 0.3);
    }
    .border-r{
        border-right: solid 1px rgba(235, 235, 235, 0.3);
    }
    .no_more_data {
        height: 80upx;
        line-height: 60upx;
        text-align: center;
        font-size: 26upx;
        color: #666666;
    }
    .customer_list{
        background-color: #ffffff;
        box-shadow: 0 9upx 27upx 0
        rgba(0, 0, 0, 0.05);
        border-radius: 10upx;
        margin: 0 40upx 20upx 40upx;
        padding: 36upx;
        box-sizing: border-box;
    }
    .c_lits{
        position: fixed;
        top: 90upx;
        bottom: 0;
        flex: 1;
        width: 100%;
    }
</style>
