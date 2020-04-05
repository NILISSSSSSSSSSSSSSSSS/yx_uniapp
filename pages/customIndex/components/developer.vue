
<template>
    <view class="box">
        <view class="search_items">
            <!--顶部tab-->
            <view class="header_box f_r_c">
                <view :class="{ header_active : indexValue === 0 }" class="customer_tab" @click.stop="click_customer(0)">客户
                    <collectFormId></collectFormId>
                </view>
                <view :class="{ header_active : indexValue === 1 }" class="commission_tab" @click.stop="click_commission(1)">佣金
                    <collectFormId></collectFormId>
                </view>
            </view>

            <!--顶部关键字和状态搜索-->
            <view v-show="indexValue===0">
                <!--关键字搜索-->
                <view class="input_view f_r_c">
                    <image class="search_icon" mode="aspectFit" src="http://cdn.haofang.net/static/xfldDeveloper/customer/search_icon.png"></image>
                    <input @input="inputName"
                           :value="keyword"
                           class="input_default"
                           placeholder-style="color:#c0c1c3;font-size: 30upx"
                           placeholder="请输入客户姓名或联系电话" />
                    <view @click="removeName" class="cha_icon_view f_r_e" v-if="keyword">
                        <image class="cha_icon" mode="aspectFit" src="http://cdn.haofang.net/static/xffx-uniapp/msg/chacha.png"></image>
                    </view>
                </view>

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
            <!--顶部待结佣已结佣-->
            <view class="top_info_view f_r_c" v-show="indexValue===1">
                <view class="top_info_item f_c_c">
                    <view class="top_info_text">待结佣</view>
                    <view class="top_info_num">{{buildCommissionVO.notCommissionAmount||'0元'}}</view>
                </view>
                <view class="top_info_item f_c_c">
                    <view class="top_info_text box_line">已结佣</view>
                    <view class="top_info_num box_line">{{buildCommissionVO.settleCommissionAmount||'0元'}}</view>
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

        <!--客户view内容-->
        <scroll-view @scrolltolower="scrolltolower" scroll-y
                     v-if="indexValue===0"
                     :lower-threshold="10" class="customer_box">
            <!--列表-->
            <block v-if="list && list.length > 0">
                <customerList :list="list"></customerList>
            </block>

            <!--底部加载更多-->
            <scrollLoading v-if="isScrollIng && haveMore" :isScrollIng="true"></scrollLoading>
            <view v-if="!isScrollIng && !haveMore && list.length" class="no_more_data">没有更多数据了</view>
            <!--无数据-->
            <noData v-if="list && list.length === 0"></noData>
        </scroll-view>

        <!--佣金view内容-->
        <scroll-view @scrolltolower="scrolltolower" scroll-y
                     v-if="indexValue===1"
                     :lower-threshold="10" class="commission_box">
            <!--公司列表-->
            <companyItem @send="send" :companyList="deptCommissionVOS" v-if="commissionNoData===1"></companyItem>

            <view class="no_data_commission">
                <noData :text="'暂时没有佣金信息'" v-if="commissionNoData===2"></noData>
            </view>
        </scroll-view>
    </view>
</template>

<script>
    import customerList from "@/components/customerList.vue";
    import {GetCommissionList, GetCustList, GetDeptCustInfoList} from "@/net/CustomerForDevelopersNet";
    import noData from  "@/components/noDataForCustomer.vue";
    import companyItem from  "@/components/companyItem.vue";
    import commissionCustomerList from  "@/components/commissionCustomerList.vue";
    import scrollLoading from  "@/components/scrollLoading.vue";
    import {Notify} from "../../../utils/Notify";
    import {Notification} from "../../../utils/Notification";
    import collectFormId from "../../../components/collectFormId";

    export default {
        components : {
            customerList,
            noData,
            companyItem,
            commissionCustomerList,
            scrollLoading,
            collectFormId
        },

        data() {
            return {
                indexValue : 0,// 顶部TAB栏索引

                timeOutVal : '',
                list : null, // 列表数据
                pageOffset : 1,// 搜索页码
                pageRows : 10, // 每页记录数
                paging : 1, // 是否分页 1:是 0:否
                keyword : '', // 搜索的客户名称或电话
                directCustomer : '', //状态搜索 0:报备客户 1:直客
                custStatus : '',

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

                isScrollIng : false, // 是否在请求中
                haveMore : true, // 是否有更多数据

                // 佣金列表
                statusIndex : 0,
                statusClass : 'status_no_ckeck',
                isOpen : false,// 是否展开公司

                buildCommissionVO : null,
                deptCommissionVOS : null,
                waitCommissionList : null,
                completedCommissionList : null,
                commissionNoData : 1,// 是否展示佣金页面缺省页 1:否 2:是
            }
        },

        mounted(){
            this.initData();
            // 监听页面可见 刷新组件
            new Notification().addObserver(this, "PageShowChange", Notify.PageShowChange.Name);
        },

        destroyed() {
            new Notification().removeObserverAllNotification(this);
        },

        methods : {
            // 页面可见回调
            PageShowChange(name, params) {
                if (params.source === "custom") {
                    this.initData();
                }
            },

            initData() {
                // 客户请求数据
                this.pageOffset = 1;
                this.initDataOfCustomer().then(list => {
                    this.list = list;
                });
                // 佣金请求数据
                this.initDataOfCommission().then(data => {
                    this.buildCommissionVO = data.buildCommissionVO || {};
                    this.deptCommissionVOS = data.deptCommissionVOS;
                });
            },

            click_customer(e){
                if (this.indexValue === e || (this.list && this.list.length > 0)){
                    this.indexValue = 0;
                    return;
                }

                this.pageOffset = 1;
                this.initDataOfCustomer().then(list => {
                    this.list = list;
                });
                this.indexValue = 0;
            },
            click_commission(e){
                // 点击佣金 关闭掉客户状态搜索
                this.isShowSourceview = false;
                this.isShowCustormerStatusView = false;

                if (this.indexValue === e  || (this.buildCommissionVO)){
                    this.indexValue = 1;
                    return;
                }

                this.initDataOfCommission().then(data => {
                    this.buildCommissionVO = data.buildCommissionVO;
                    this.deptCommissionVOS = data.deptCommissionVOS;
                });
                this.indexValue = 1;
            },
            inputName(e) {
                this.keyword = e.detail.value;
                clearTimeout(this.timeOutVal);
                this.timeOutVal = setTimeout(()=>{
                    this.pageOffset = 1;
                    this.initDataOfCustomer().then(list=>{
                        this.list = list;
                    });
                },250);
            },
            removeName() {
                this.keyword = '';
                this.pageOffset = 1;
                this.initDataOfCustomer().then(list => {
                    this.list = list;
                });
            },

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
                //判断 如果是app才掉用下拉刷新 否则直接掉接口
                this.initDataOfCustomer().then(list => {
                    this.list = list;
                })
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
                //判断 如果是app才掉用下拉刷新
                this.initDataOfCustomer().then(list => {
                    this.list = list;
                })
            },
            //获取客户列表数据
            initDataOfCustomer(){
                let that = this;
                let param = {
                    pageRows: that.pageRows,
                    pageOffset: that.pageOffset,
                    keyword: that.keyword,
                    paging: that.paging,
                };
                if (that.sourceDefaultCheck != '-10'){
                    param.directCustomer = that.directCustomer;
                }
                if (that.CustormerStatusDefaultCheck != '-10'){
                    param.custStatus = that.custStatus;
                }

                //发起请求 GetCustList
                return new GetCustList(param).send()
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

                        if (res.data.custList && (res.data.custList.length < that.pageRows)) {
                            that.haveMore = false;
                        } else {
                            that.haveMore = true;
                        }

                        for (let item of res.data.custList){
                            item.layout = item.layout ? item.layout.split(",") : []; // 处理户型
                        }

                        that.isScrollIng = false;
                        console.log(res.data.custList,' 客户列表接口返回数据');
                        return (res.data.custList || []);
                    })
                    .catch((res)=>{
                        this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                        return res;
                    });
            },

            //获取佣金列表数据
            initDataOfCommission(){
                let that = this;
                //发起请求 GetCommissionList
                return new GetCommissionList().send()
                    .then(res=>{
                        if (res.errCode != 200){
                            this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                            return [];
                        }

                        // 无数据
                        if (res.data.deptCommissionVOS && res.data.deptCommissionVOS.length === 0){
                            that.commissionNoData = 2;
                        }else {
                            that.commissionNoData = 1;
                        }

                        if (res.data.buildCommissionVO && res.data.buildCommissionVO.notCommissionAmount){
                            res.data.buildCommissionVO.notCommissionAmount = res.data.buildCommissionVO.notCommissionAmount > 9999 ? (Math.floor(res.data.buildCommissionVO.notCommissionAmount/100)/100) + '万' : res.data.buildCommissionVO.notCommissionAmount + '元';
                        }
                        if (res.data.buildCommissionVO && res.data.buildCommissionVO.settleCommissionAmount){
                            res.data.buildCommissionVO.settleCommissionAmount = res.data.buildCommissionVO.settleCommissionAmount > 9999 ? (Math.floor(res.data.buildCommissionVO.settleCommissionAmount/100)/100) + '万' : res.data.buildCommissionVO.settleCommissionAmount + '元';
                        }

                        for (let items of res.data.deptCommissionVOS){
                            if (items.notCommissionAmount){
                                items.notCommissionAmount = items.notCommissionAmount > 9999 ? (Math.floor(items.notCommissionAmount/100)/100) + '万' : items.notCommissionAmount + '元';
                            }
                            if (items.settleCommissionAmount){
                                items.settleCommissionAmount = items.settleCommissionAmount > 9999 ? (Math.floor(items.settleCommissionAmount/100)/100) + '万' : items.settleCommissionAmount + '元';
                            }
                        }

                        that.isScrollIng = false;
                        console.log(res.data,' 佣金列表接口返回数据');
                        return (res.data || []);
                    })
                    .catch((res)=>{
                        this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                        return res;
                    });
            },

            //获取门店下客户数据
            initDataOfDeptCustInfo(param){
                new GetDeptCustInfoList(param).send().then((res)=>{
                    if (res.errCode != 200){
                        this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                        return;
                    }

                    if (!res.data){
                        return;
                    }

                    if (param.custStatus===5){
                        this.waitCommissionList = res.data;
                        return ;
                    }
                    this.completedCommissionList = res.data;
                    console.log(res);
                })
                    .catch((res)=>{
                        this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                    })
            },
            //佣金列表
            showWaitCommissionView(){
                if (this.statusIndex === 0){
                    return;
                }
                this.statusIndex = 0;
            },
            // 触底加载更多
            onReachBottomEvent() {
                if (this.indexValue == 0){
                    this.scrollBottom();
                }
            },
            scrollBottom() {
                let that = this;
                if (that.isScrollIng || !that.haveMore) return;

                that.isScrollIng = true;
                that.pageOffset++;
                console.log(that.pageOffset,'that.pageOffset');
                that.initDataOfCustomer().then(list => {
                    this.list = (this.list || []).concat(list);
                });
            },

            showCompletedCommissionView(){
                if (this.statusIndex === 1){
                    return;
                }
                this.statusIndex = 1;
            },
            send(e){
                this.isOpen = e.isOpen;
                // 请求数据
                this.initDataOfDeptCustInfo({adminDeptId : e.adminDeptId, custStatus : 5});// 待结佣
                this.initDataOfDeptCustInfo({adminDeptId : e.adminDeptId, custStatus : 6});// 已结佣
            },

            scrolltolower() {
                this.onReachBottomEvent();
            }
        }
    }
</script>

<style scoped>
    /*顶部tab样式*/
    .no_more_data {
        height: 80upx;
        line-height: 80upx;
        text-align: center;
        font-size: 26upx;
        color: #666666;
        margin-bottom: 30upx;
    }
    .header_box{
        width: 100%;
    }
    .search_items{
        position: fixed;
        top: 0;
        left: 0;
        background-color: #FFFFFF;
        z-index: 99;
        box-sizing: border-box;
        padding-top: 110upx;
        width: 100%;
    }
    .customer_tab{
        font-size: 36upx;
        font-weight: bold;
        font-stretch: normal;
        line-height: 36upx;
        letter-spacing: 0upx;
        color: #191f25;
        z-index: 99;
        margin: auto 67upx auto 0upx;
    }
    .commission_tab{
        font-size: 36upx;
        font-weight: bold;
        font-stretch: normal;
        line-height: 36upx;
        letter-spacing: 0upx;
        color: #191f25;
        z-index: 99;
        margin: auto 0 auto 0;
    }
    .header_active{
        font-size: 48upx;
        font-weight: bold;
        font-stretch: normal;
        line-height: 36upx;
        letter-spacing: 0upx;
        color: #191f25;
    }
    .header_active:after{
        content: "";
        position: absolute;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
        bottom: -30upx;
        height: 6upx;
        background: #0084ff;
        width: 50upx;
        border-radius: 10upx;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .customer_box{
        position: fixed;
        top: 368upx;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    /*客户内容*/
    /*关键字搜索*/
    .input_view{
        height: 88upx;
        background-color: #ffffff;
        box-shadow: 1px 2px 10px 0px
        rgba(0, 0, 0, 0.05);
        border-radius: 10upx;
        border: solid 1px #F5F5F5;
        margin: 40upx 40upx 0 40upx;
        z-index: 99;
    }
    .search_icon{
        width: 29upx;
        height: 29upx;
        flex-shrink: 0;
        margin: auto 13upx auto 30upx;
        position: relative;
    }
    .input_default{
        width: 100%;
        text-align: left;
        height: 30upx;
        line-height: 42upx;
        margin: auto 0;
        font-size: 30upx;
        color: #191f25;
    }
    .cha_icon_view{
        width: 72upx;
        height: 100%;
        flex-shrink: 0;
    }
    .cha_icon{
        width: 29upx;
        height: 29upx;
        margin: auto;
    }

    /*状态搜索*/
    .search_box{
        width: 100%;
        background: #fff;
        z-index: 99;
    }
    .search_source_list{
        position: fixed;
        top: 365upx;
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
        margin-right: 150upx;
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
    .null_box{
        background-color: #FFFFFF;
        padding-top: 360upx;
    }

    /*佣金样式*/
    .commission_box{
        position: fixed;
        top: 430upx;
        bottom: 0;
        left: 0;
        width: 100%;
    }
    .top_info_view{
        margin: 55upx 40upx 0 40upx;
        width: calc(100% - 80upx);
        border-radius: 15upx;
        height: 200upx;
        align-items: center;
        background-color: #0084ff;
        box-sizing: border-box;
        box-shadow: 1px 2px 20px 0px
        rgba(0, 132, 255, 0.25);
    }
    .top_info_item{
        width: 100%;
        height: 155upx;
        text-align: center;
    }
    .top_info_num{
        font-size: 45upx;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #ffffff;
    }
    .top_info_text{
        font-family: PingFang-SC-Medium;
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        line-height: 58upx;
        color: #ffffff;
        opacity: 0.8;
    }
    .box_line{
        border-left: solid 1px #339dff;
    }

    /*展开的客户列样式*/
    .show_customer_list{
        color: #fafafa;
        height: 250upx;
    }
    .show_customer_list .status_is_check{
        font-family: PingFang-SC-Bold;
        font-size: 30upx;
        line-height: 100upx;
        font-weight: normal;
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

    .no_data_commission{
        position: relative;
        top: -61upx;
    }
</style>
