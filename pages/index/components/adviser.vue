

<template>
    <view class="home_view">
        <!--签约信息-->
        <view class="top_view">
            <image class="logo_zy" src="http://cdn.haofang.net/static/xfldDeveloper/index/logo_zy.png"></image>

            <view class="f_r_s top_num_view">
                <view class="f_c_b top_num_date">
                    <view class="top_num_day">{{ todayDay }}</view>
                    <view class="top_num_month">{{ todayMonthYear }}</view>
                </view>

                <view class="f_r_s top_num_cont">
                    <view class="f_c_b top_num_item">
                        <view class="top_num_val">{{ daiKanNum }}</view>
                        <view class="top_num_text">带看(组)</view>
                    </view>

                    <view class="f_c_b top_num_item">
                        <view class="top_num_val">{{ dealNum }}</view>
                        <view class="top_num_text">签约(组)</view>
                    </view>

                    <view class="f_c_b top_num_item">
                        <view class="top_num_val">{{ jieYongNum }}</view>
                        <view class="top_num_text">结佣(组)</view>
                    </view>
                </view>

                <view class="build_name">{{ buildName }}</view>
            </view>
        </view>

        <view class="cont_view">
            <!--操作-->
            <view class="f_r_b to_btn_view">
                <view @click.stop="goToDengJi" class="to_btn_item f_r_c">
                    <image class="dengji_icon" src="http://cdn.haofang.net/static/xfldDeveloper/index/dengji.png"></image>

                    <view class="to_btn_text"><collectFormId></collectFormId>直客登记</view>
                </view>

                <view @click.stop="scanConfirmCustom" class="to_btn_item f_r_c">
                    <image class="scan_zy_icon" src="http://cdn.haofang.net/static/xfldDeveloper/index/scan_zy.png"></image>

                    <view class="to_btn_text"><collectFormId></collectFormId>扫码确客</view>
                </view>
            </view>

            <!--客户跟进-->
            <view v-if="customGenJinInfo.haveCustom" @click="goToRemindMsg"
                  class="custom_genjin f_r_b">
                <view class="f_r_s custom_genjin_left">
                    <collectFormId></collectFormId>
                    <image class="msg_genjin" src="http://cdn.haofang.net/static/xfldDeveloper/index/msg.png"></image>
                    <view class="custom_genjin_text" v-if="customGenJinInfo.unLookMsgNum === 0">{{ customGenJinInfo.lastMsgText }}</view>
                    <view class="custom_genjin_text" v-if="customGenJinInfo.unLookMsgNum === 1">您有未看的客户跟进</view>
                    <view class="custom_genjin_text" v-if="customGenJinInfo.unLookMsgNum > 1">您有{{customGenJinInfo.unLookMsgNum}}条未看的客户跟进</view>
                    <view class="custom_genjin_time">{{customGenJinInfo.time}}</view>
                </view>

                <view class="f_r_e custom_genjin_right">
                    <view class="custom_red_point" v-if="customGenJinInfo.unLookMsgNum > 0"></view>

                    <image class="more_arrow" src="http://cdn.haofang.net/static/xfldDeveloper/index/more_arrow.png"></image>
                </view>
            </view>

            <!--楼盘动态-->
            <view class="custom_zhl">
                <view class="f_r_b custom_zhl_title">
                    <view>楼盘动态</view>

                    <view v-if="buildDtList && buildDtList.length > 0" @click.stop="lookMoreBuildDt" class="f_r_e">
                        <view class="custom_zhl_more"><collectFormId></collectFormId>更多</view>

                        <image class="more_arrow" src="http://cdn.haofang.net/static/xfldDeveloper/msg/arrow_right.png"></image>
                    </view>
                </view>

                <view class="build_dt_cont" v-if="buildDtList && buildDtList.length > 0">
                    <block v-for="(item, index) in buildDtList" :key="index">
                        <view @click.stop="goToBuildDtDetail(item)" class="build_dt_item f_r_b">
                            <view class="build_dt_info">
                                <collectFormId></collectFormId>
                                <view class="build_dt_title">{{ item.title }}</view>
                                <view class="build_dt_content">{{ item.content }}</view>
                                <view class="build_dt_time">{{ item.time }}</view>
                            </view>

                            <view class="build_dt_img_view f_c_c">
                                <image mode="aspectFill" @error="buildErrorImg(index)" :src="item.photoAddr"></image>
                            </view>
                        </view>
                    </block>
                </view>
                <view class="no_build_dt_view f_c_c" v-if="buildDtList && buildDtList.length === 0">
                    <image class="no_build_dt_img" src="http://cdn.haofang.net/static/xfldDeveloper/index/no_build_dt.png"></image>
                    <view class="no_build_dt_text">暂时没有楼盘动态</view>
                </view>
            </view>
        </view>

        <view class="empty_view"></view>

        <showModal :modal='scanModel' ref="modal" @onModalChanged="onModalChanged"></showModal>
    </view>
</template>

<script>
    import {formatDate} from "../../../utils/common";
    import {GetLoginModel} from "../../../model/LoginSuccessModel";
    import {Const} from "../../../utils/Const";
    import {Notify} from "../../../utils/Notify";
    import {Notification} from "../../../utils/Notification";
    import {GetStatisticalAnalysis} from "../../../net/StatisticsNet";
    import {UnReadMsgModel} from "../../../model/im/UnReadMsgModel";
    import {UpUnReadNumTab} from "../../../utils/ImChart";
    import {ProjectConfigConst} from "../../../utils/ProjectConfigConst";
    import {GetActivityList, GetBuildDynamicList} from "../../../net/BuildNet";
    import {GpsInfoModel} from "../../../model/GpsInfoModel";
    import {GetCustInfoAfterScanQrcode} from "../../../net/ConfirmNet";
    import {CheckCustInfoByQrCode} from "../../../net/ConfirmNet";
    import {compare, formatTimeNew} from "../../../utils/common";

    class BuildDtListItem {
        title = "";  // title
        content = "";
        time = "";
        actId = "";
    }

    class PrivateData {
        static cityId = "";
        static custId = "";
    }

    export default {
        data() {
            let date = new formatDate(new Date());
            return {
                buildName: "",
                todayDay: date.getDay(),  // 日期
                todayMonthYear: `${date.getYear()}.${date.getMonth()}`,  // 年和月份
                daiKanNum: "", // 带看数
                dealNum: "", // 签约数
                jieYongNum: "", // 结佣数
                // 客户跟进参数
                customGenJinInfo: {
                    haveCustom: false, // 是否有客户跟进
                    unLookMsgNum: 0,  // 未看数
                    lastMsgText: "", // 最新消息
                    time: "", // 时间
                },
                // 楼盘动态
                buildDtList: null,
                scanModel: {},
            }
        },

        mounted() {
            this.initData();
            // 监听消息
            new Notification().addObserver(this, "UpChartMsgChanged", Notify.UpChartMsgChanged.Name);
            // 监听页面可见 刷新组件
            new Notification().addObserver(this, "PageShowChange", Notify.PageShowChange.Name);
            // 监听Im连接成功
            new Notification().addObserver(this, "ImLinkSuccessChange", Notify.ImLinkSuccessChange.Name);
            // 监听扫码结果
            new Notification().addObserver(this, "ScanConfirmChange", Notify.ScanConfirmChange.Name);
        },

        destroyed() {
            new Notification().removeObserverAllNotification(this);
        },

        methods: {
            // 扫码结果回调
            ScanConfirmChange(name, info) {
                this.scanModel = info;
                setTimeout(() => {
                    this.$refs.modal.show();
                }, 100);
            },
            onModalChanged(val) {
                if (!val) {
                    new CheckCustInfoByQrCode({
                        custId: this.scanModel.custId,
                        cityId: this.scanModel.cityId,
                        status: 0
                    }).send().then(res => {
                        if (res.errCode !== Const.success) {
                            this.DifferenceApi.showToast(res.errMsg || "操作失败");
                            return;
                        }

                        this.DifferenceApi.showToast(res.errMsg || "操作成功");
                    });
                    return;
                }

                new CheckCustInfoByQrCode({
                    custId: this.scanModel.custId,
                    cityId: this.scanModel.cityId,
                    status: this.scanModel.status
                }).send().then(res => {
                    if (res.errCode !== Const.success) {
                        this.DifferenceApi.showToast(res.errMsg || "操作失败");
                        return;
                    }

                    this.DifferenceApi.showToast(res.errMsg || "操作成功");
                });
            },

            // 新消息回调
            UpChartMsgChanged() {
                this.initRemindList();
                this.initRemindMsg();
            },

            // im链接成功回调
            ImLinkSuccessChange() {
                this.initData();
            },

            // 页面可见回调
            PageShowChange(name, params) {
                if (params.source === "index") {
                    this.initData();
                }
            },

            initData() {
                this.buildName = GetLoginModel.getBuildName();
                this.initBuildSignInfo();
                this.initRemindList();
                this.initRemindMsg();
                this.initBuildDtList();
            },
            // 初始化楼盘信息
            initBuildSignInfo() {
                // "statisitcType": "(byte)0=个人 1=项目",
                // "timeSegmentation": "(byte)时间分段 0=周 1=月"
                new GetStatisticalAnalysis({statisitcType: 0, timeSegmentation: 1}).send()
                    .then(res => {
                        if (res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        // "dealCount": "(int32)签约数量"
                        // "seeCount": "(int32)带看数量"
                        // "settleCount": "(int32)结佣数量"
                        let data = res.data || {};
                        this.daiKanNum = data.seeCount || "0";
                        this.dealNum = data.dealCount || "0";
                        this.jieYongNum = data.settleCount || "0";
                    })
                    .catch(err => {
                        this.DifferenceApi.showToast(err.errMsg || "获取楼盘信息失败");
                    });
            },
            // 初始化提醒消息
            initRemindMsg() {
                this.customGenJinInfo.unLookMsgNum = UpUnReadNumTab.getUnReadNum(ProjectConfigConst.remindMsgMessageId) || 0;
            },
            // 初始化提醒发消息列表
            initRemindList() {
                if (!this.ImChart.imChartVal) return;

                this.ImChart.getHistoryOriginal(ProjectConfigConst.remindMsgMessageId)
                    .then(res => {
                        let msgs = res ? res.msgs || [] : [];
                        let customGenJinInfo = this.customGenJinInfo;
                        if (msgs.length === 0) {
                            this.customGenJinInfo.haveCustom = false;
                            return;
                        }

                        msgs = msgs.sort(new compare("time").maxToMin());
                        let content = JSON.parse(msgs[0].content);
                        let data = content.data || {};
                        customGenJinInfo.haveCustom = true;
                        customGenJinInfo.lastMsgText = data.CONTENT || "暂无内容";
                        customGenJinInfo.time = formatTimeNew(msgs[0].time || new Date().getTime());
                        this.customGenJinInfo = customGenJinInfo;
                    });
            },
            // 初始化楼盘动态
            initBuildDtList() {
                return new GetActivityList({pageRows: 3, pageOffset: 1}).send()
                    .then(res => {
                        if(res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        let list = res.data ? res.data.actList || [] : [];
                        list = list.slice(0, 3);
                        let buildDtList = [];
                        for (let info of list) {
                            if (!info.promotionId) continue;

                            info.date = info.date.replace(/-/g, "/");
                            let date = new formatDate(new Date(info.date));
                            let item = new BuildDtListItem();
                            item.actId = info.promotionId;
                            item.title = info.title;
                            item.content = info.actContent;
                            item.photoAddr = info.photoAddr || Const.houseDefaultImg;
                            item.time = `${date.getYear()}-${date.getMonth()}-${date.getDay()} ${date.getHour()}:${date.getSecond()}`;
                            buildDtList.push(item);
                        }
                        this.buildDtList = buildDtList;
                    })
                    .catch(err => {
                        this.DifferenceApi.showToast(err.errMsg || "获取楼盘动态失败");
                    });
            },

            // 查看提醒消息
            goToRemindMsg() {
                UpUnReadNumTab.removeReadNum(ProjectConfigConst.remindMsgMessageId);
                this.customGenJinInfo.unLookMsgNum = 0;
                uni.navigateTo({
                    url: "/pagesMsg/remindMsg/remindMsg"
                });
            },

            // 跳转动态详情
            goToBuildDtDetail(item) {
                uni.navigateTo({
                   url: "/pagesBuild/buildDetail/distributionDynamicDetail?actId=" + item.actId
                });
            },

            // 更多楼盘动态
            lookMoreBuildDt() {
                uni.navigateTo({
                    url: "/pagesBuild/buildDetail/distributionDynamic"
                });
            },

            // 直客登记
            goToDengJi() {
                uni.navigateTo({
                    url: "/pagesCustomer/customerRegistration/customerRegistration"
                });
            },

            // 扫码确客
            scanConfirmCustom() {
                let cityInfo = new GpsInfoModel().getModel("cityInfo") || {};
                PrivateData.cityId = cityInfo.cityId || 1;
                uni.scanCode({
                    success: (res) => {
                        let code = res.result || "";
                        if(!code || code.indexOf("#") === -1
                            || code.split('#').length < 3 || !code.split('#')[2]) {
                            this.DifferenceApi.showToast("二维码错误");
                            return;
                        }

                        uni.showLoading({title: "解析中..."});
                        PrivateData.custId = code.split('#')[2];
                        new GetCustInfoAfterScanQrcode({
                            custId: PrivateData.custId,
                            cityId: PrivateData.cityId
                        }).send().then(res => {
                            let data = res.data || {};
                            uni.hideLoading();
                            if (res.errCode !== Const.success) {
                                return Promise.reject(res);
                            }

                            if(data.status === 2) {
                                new Notification().postNotification(Notify.ScanConfirmChange.Name, {
                                    title: "温馨提示",
                                    content: `经纪人于${data.visitEarlyTime}前报备此客户，不符合楼盘"提前${data.reportEarly}报备"的规则。是否接受此次带看？`,
                                    confirmText: "允许带看",
                                    cancelText: "无效带看",
                                    cancelColor: "rgba(0,0,0,0.6)",
                                    confirmColor: "#3396fb",
                                    custId: PrivateData.custId,
                                    cityId: PrivateData.cityId,
                                    status: data.status
                                });
                                return;
                            }

                            if(data.status === 3) {
                                new Notification().postNotification(Notify.ScanConfirmChange.Name, {
                                    title: "温馨提示",
                                    content: "客户处于报备有效期内，是否接受带看？",
                                    confirmText: "允许带看",
                                    cancelText: "无效带看",
                                    cancelColor: "#3396fb",
                                    confirmColor: "#3396fb",
                                    custId: PrivateData.custId,
                                    cityId: PrivateData.cityId,
                                    status: 2
                                });
                            }
                        }).catch(res => {
                            uni.hideLoading();
                            this.DifferenceApi.showToast(res.errMsg || "确客失败");
                        });
                    }
                });
            },

            // 楼盘动态图片报错
            buildErrorImg(index) {
                let item = this.buildDtList[index] || {};
                item.photoAddr = Const.houseDefaultImg;
                this.$set(this.buildDtList, index, item);
            }
        }
    }
</script>

<style>
    .no_build_dt_view{
        padding-top: 90upx;
        box-sizing: border-box;
    }
    .no_build_dt_img{
        width: 374upx;
        height: 171upx;
        margin: 0 auto;
    }
    .no_build_dt_text{
        width: 100%;
        height: 30upx;
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30upx;
        color: #c0c1c3;
        text-align: center;
        margin: 49upx auto 20upx;
    }

    /*顶部*/
    .home_view{
        width: 100%;
        background-color: #ffffff;
    }
    .top_view{
        width: 100%;
        height: 400upx;
        background: url("http://cdn.haofang.net/static/xfldDeveloper/index/top_bg.png") center center no-repeat;
        background-size: cover;
    }
    .logo_zy{
        width: 419upx;
        height: 128upx;
        margin: 114upx auto -50upx 40upx;
    }
    .top_num_view{
        margin-top: 66upx;
        width: 670upx;
        height: 200upx;
        background-color: #ffffff;
        box-shadow: 0 0 20upx 0
        rgba(0, 0, 0, 0.08);
        border-radius: 20upx;
        margin-left: 40upx;
        position: relative;
        align-items: center;
    }
    .top_num_date{
        margin: auto 0;
        width: 176upx;
        height: 110upx;
        border-right: 1upx solid #ebebeb;
        box-sizing: border-box;
        text-align: center;
        flex-shrink: 0;
    }
    .top_num_day{
        font-family: 1234567890-Regular;
        font-size: 70upx;
        font-weight: bold;
        font-stretch: normal;
        line-height: 70upx;
        color: #aeb7c2;
        text-align: center;
    }
    .top_num_month{
        font-family: PingFang-SC-Medium;
        font-size: 26upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 26upx;
        color: #aeb7c2;
    }
    .top_num_cont{
        align-items: center;
        padding: 0 16upx 0 13upx;
        box-sizing: border-box;
        flex: 1;
        margin: auto 0;
    }
    .top_num_item{
        width: 157upx;
        height: 110upx;
        text-align: center;
    }
    .top_num_val{
        font-size: 62upx;
        font-weight: bold;
        font-stretch: normal;
        line-height: 62upx;
        height: 62upx;
        color: #191f25;
    }
    .top_num_text{
        font-family: PingFang-SC-Medium;
        font-size: 26upx;
        line-height: 26upx;
        color: #7d8184;
    }
    .build_name{
        width: 246upx;
        height: 65upx;
        line-height: 58upx;
        text-align: center;
        position: absolute;
        right: -10upx;
        top: -30upx;
        z-index: 9;
        background: url("http://cdn.haofang.net/static/xfldDeveloper/index/build_bg.png") center center no-repeat;
        background-size: cover;
        font-family: PingFang-SC-Bold;
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        color: #ffffff;
    }

    /*操作*/
    .cont_view{
        padding: 0 40upx;
        box-sizing: border-box;
        margin-top: 120upx;
    }
    .to_btn_view{
        align-items: center;
    }
    .to_btn_item{
        width: 100%;
        align-items: center;
        height: 150upx;
        border-radius: 14upx;
        background-blend-mode: normal,
        normal;
    }
    .to_btn_item:first-child{
        background-image: linear-gradient(90deg,
        #ffc43b 0%,
        #fbb327 37%,
        #f6a112 100%),
        linear-gradient(
                #000000,
                #000000);
        margin-right: 34upx;
    }
    .to_btn_item:last-child{
        background-image: linear-gradient(90deg,
        #8da7ff 0%,
        #6d88fb 37%,
        #4c68f7 100%),
        linear-gradient(
                #000000,
                #000000);
    }
    .dengji_icon{
        width: 50upx;
        height: 60upx;
        margin-right: 36upx;
    }
    .scan_zy_icon{
        width: 56upx;
        height: 56upx;
        margin-right: 36upx;
    }
    .to_btn_text{
        font-family: PingFang-SC-Bold;
        font-size: 34upx;
        font-stretch: normal;
        line-height: 34upx;
        color: #ffffff;
        font-weight: bold;
    }

    /*客户跟进*/
    .custom_genjin{
        width: 100%;
        height: 120upx;
        background-color: #ffffff;
        box-shadow: 0 0 28upx 2upx
        rgba(224, 224, 224, 0.5);
        border-radius: 10upx;
        margin-top: 50upx;
        padding: 0 30upx 0 35upx;
        box-sizing: border-box;
        align-items: center;
    }
    .custom_genjin_left{
        align-items: center;
    }
    .custom_genjin_right{
        align-items: center;
    }
    .msg_genjin{
        width: 35upx;
        height: 38upx;
        flex-shrink: 0;
        margin: auto 20upx auto 0;
    }
    .custom_genjin_text{
        font-family: PingFang-SC-Bold;
        font-size: 30upx;
        font-stretch: normal;
        color: #191f25;
        font-weight: bold;
        text-align: left;
        max-width: 11em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .custom_genjin_time{
        font-family: PingFang-SC-Medium;
        font-size: 24upx;
        font-weight: normal;
        font-stretch: normal;
        color: #a3a5a8;
        margin-left: 30upx;
        flex-shrink: 0;
        margin-right: 10upx;
    }
    .custom_red_point{
        width: 12upx;
        height: 12upx;
        background-color: #ff625b;
        border-radius: 100%;
        margin: auto 12upx auto 0;
        flex-shrink: 0;
    }
    .more_arrow{
        width: 12upx;
        height: 22upx;
        flex-shrink: 0;
        margin: auto 0;
    }

    /*楼盘动态*/
    .custom_zhl{
        margin-top: 24upx;
    }
    .custom_zhl_title{
        line-height: 120upx;
        align-items: center;
    }
    .custom_zhl_title>view{
        font-family: PingFang-SC-Bold;
        font-size: 38upx;
        font-weight: bold;
        color: #191f25;
    }
    .custom_zhl_more{
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        font-weight: normal;
        color: #a3a5a8;
        margin-right: 20upx;
    }
    .build_dt_cont{
        padding: 0 30upx;
        box-sizing: border-box;
        width: 100%;
        background-color: #ffffff;
        box-shadow: 0 0 28upx 2upx
        rgba(224, 224, 224, 0.5);
        border-radius: 10upx;
    }
    .build_dt_item:last-child{
        border-bottom: none;
    }
    .build_dt_item{
        border-bottom: 1upx solid #ebebeb;
        padding: 40upx 0 38upx 0;
        box-sizing: border-box;
        width: 100%;
    }
    .empty_view{
        height: 60upx;
        width: 100%;
    }
    .build_dt_title{
        font-family: PingFang-SC-Bold;
        font-size: 32upx;
        font-weight: bold;
        font-stretch: normal;
        color: #191f25;
        text-align: left;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-bottom: 28upx;
    }
    .build_dt_content{
        font-family: PingFang-SC-Medium;
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 37upx;
        color: #7d8184;
        text-align: left;
        width:100%;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        box-orient:vertical;
        line-clamp:2;
    }
    .build_dt_time{
        margin-top: 25upx;
        font-family: PingFang-SC-Medium;
        font-size: 24upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24upx;
        color: #a3a5a8;
    }
    .build_dt_img_view{
        width: 210upx;
        height: 172upx;
        background-color: #ffffff;
        border-radius: 4upx;
        overflow: hidden;
        flex-shrink: 0;
        background: url("http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png") center center no-repeat;
        background-size: cover;
    }
    .build_dt_img_view>image{
        width: 100%;
        height: 100%;
    }
    .build_dt_info{
        padding-right: 30upx;
        box-sizing: border-box;
        flex: 1;
        width: calc(100% - 220upx);
    }
</style>
