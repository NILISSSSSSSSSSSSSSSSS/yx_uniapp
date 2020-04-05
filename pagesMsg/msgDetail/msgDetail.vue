<template>
    <view class="message_detail">
        <!--顶部title-->
        <view class="f_c_s top_fixed">
            <view class="f_r_b top_fixed_cont">
                <view @click="goBack" class="top_fixed_back_view f_r_s">
                    <image class="top_fixed_back" src="http://cdn.haofang.net/static/xfldDeveloper/msg/back.png"></image>
                </view>

                <view class="top_fixed_title">{{ titleText }}</view>

                <view class="top_fixed_right"></view>
            </view>

            <view v-if="deptName" class="deptName_view">{{ deptName }}</view>
        </view>

        <scroll-view scroll-y :upper-threshold="20" @click="scrollClick"
                     :scroll-into-view="scrollIntoView"
                     @scrolltoupper="scrolltoupper"
                     :class="[deptName ? 'message_cont_has_name' : 'message_cont_no_name']">
            <view class="message_cont">
                <scrollLoading v-if="isScrollIng && haveMoreData" :isScrollIng="true"></scrollLoading>
                <view v-if="!haveMoreData" class="f_r_c no_ago_msg_text">没有更早的消息了</view>

                <view class="top_empty_view"></view>

                <!-- 消息内容 -->
                <block v-for="(item, index) in chartList" :key="index">
                    <!-- 消息时间 -->
                    <view v-if="item.showTime" class="msg_send_time_view f_r_c">
                        <view class="msg_send_time_text">{{ item.time }}</view>
                    </view>

                    <!-- 接收 -->
                    <view v-if="!item.mySend" :id="'msg_' + index" class="message_item f_r_s">
                        <head-view :headImg="(item.mySend ? meHeadeImg : otherHeadImg)"></head-view>

                        <textReceiveView v-if="item.type == 'text'" :item="item"></textReceiveView>
                        <imgReceiveView v-if="item.type == 'img'"
                                        @lookMaxImgChange="lookMaxImgChange"
                                        :item="item"></imgReceiveView>
                        <voiceReceiveView v-if="item.type == 'voice'"
                                          @voicePlayChange="voicePlayChange"
                                          :index="index"
                                          :currentClickIndex="currentClickIndex"
                                          :item="item"></voiceReceiveView>
                        <positionReceiveView v-if="item.type == 'position'" :item="item"></positionReceiveView>
                        <videoReceiveView v-if="item.type == 'video'"
                                          @videoPlayChange="videoPlayChange"
                                          :item="item"></videoReceiveView>
                    </view>

                    <!-- 我的-->
                    <view :id="'msg_' + index" class="message_item f_r_e" v-if="item.mySend">
                        <textMeView v-if="item.type == 'text'" :item="item"></textMeView>
                        <imgMeView v-if="item.type == 'img'"
                                   :item="item"
                                   @lookMaxImgChange="lookMaxImgChange"></imgMeView>
                        <voiceMeView @voicePlayChange="voicePlayChange"
                                     :currentClickIndex="currentClickIndex"
                                     :index="index"
                                     v-if="item.type == 'voice'"
                                     :item="item"></voiceMeView>
                        <videoMeView v-if="item.type == 'video'"
                                     @videoPlayChange="videoPlayChange"
                                     :item="item"></videoMeView>
                        <position-me-view v-if="item.type == 'position'" :item="item"></position-me-view>

                        <head-view :headImg="(item.mySend ? meHeadeImg : otherHeadImg)"></head-view>
                    </view>
                </block>

                <!-- 底部按钮fixed后的空占位view -->
                <view :style="{height: emptyViewHeight}"></view>
                <view class="iphone_x" v-if="isIphoneX"></view>
                <view id="scrollIntoId"></view>
            </view>
        </scroll-view>

        <!-- 底部按钮 -->
        <view v-if="!scrollLoading" class="sned_msg_view">
            <send-msg @OnMoreSendChanged="OnMoreSendChanged" :isShield="isShield"
                      :chartList="chartList" :messageId="messageId"></send-msg>
            <view class="iphone_x" v-if="isIphoneX"></view>
        </view>

        <!--视频播放-->
        <video v-if="videoSrc && videoTcShow" class="receive_video" id="myVideo"
               objectFit="cover" show-mute-btn :poster="videoFirstImg"
               autoplay :src="videoSrc"></video>

        <showModal :modal='{
            title: "拨打电话",
            content: servicePhone,
            confirmText: "呼叫",
            cancelColor: "rgba(0,0,0,0.6)",
            confirmColor: "#3396fb",
        }' ref="modal" @onModalChanged="onModalChanged"></showModal>
    </view>
</template>

<script>
    import {UserInfoModel} from "../../model/UserInfoModel.js";
    import {formatTimeNew} from "../../utils/common.js";
    import {DealChartDetail, ChartDetailItem} from "../../utils/ImChart.js";
    import {Notify} from "../../utils/Notify.js";
    import {Notification} from "../../utils/Notification.js";

    // 接受的组件
    import imgReceiveView from "../components/im/receive/imgReceiveView.vue";
    import textReceiveView from "../components/im/receive/textReceiveView.vue";
    import voiceReceiveView from "../components/im/receive/voiceReceiveView.vue";
    import positionReceiveView from "../components/im/receive/positionReceiveView.vue";
    import videoReceiveView from "../components/im/receive/videoReceiveView.vue";

    // me的组件
    import textMeView from "../components/im/me/textMeView.vue";
    import voiceMeView from "../components/im/me/voiceMeView.vue";
    import imgMeView from "../components/im/me/imgMeView.vue";
    import videoMeView from "../components/im/me/videoMeView.vue";
    import positionMeView from "../components/im/me/positionMeView.vue";

    import headView from "../components/im/headView.vue";
    import sendMsg from "../components/im/sendMsg.vue";

    import scrollLoading from "../../components/scrollLoading.vue";
    import showModal from "../../components/showModal.vue";

    import {Const} from "../../utils/Const.js";
    import {DealLastMsgTime, ImSendMessage} from "../../utils/ImChart.js";
    import {GetBrokerContactInfo, GetUserMobile, UserDeptName} from "../../net/MsgNet";

    import {ConsultantListModel, GetLoginModel} from "../../model/LoginSuccessModel";
    import {Utils} from "../../utils/Utils";
    import {ChatListModel} from "../../model/im/ChatListModel";

    let privateData = {
        page: null,

        pageScrollTimeOutVal: null,
        imgList: [],
        caseId: "",
        cityId: "",
        caseType: "",
        reSource: "",

        params: {}, // url参数
        ImEvaluateDeal: null, // 聊天评价

        videoPlayerVal: null,
        haveMoreData: true
    };
    // 语音播放管理
    let innerAudioContext = uni.createInnerAudioContext();

    export default {
        data() {
            return {
                deptName: "",
                receiveTypes: {
                    img: true,
                    voice: true,
                    entrust: true,
                    position: true,
                    houseLiaoKe: true,
                    video: true
                },
                meTypes: {
                    img: true,
                    voice: true,
                    house: true,
                    video: true,
                    houseWuYe: true,
                },
                currentClickIndex: "err",

                sendInputBottom: 0,

                serviceId: this.ImChart.getServiceId(),
                accid: "",
                scrollLoading: true,
                messageId: "", // 经纪人id
                titleText: "",
                isShield: 0, // 是否是屏蔽 1:屏蔽
                chartList: [], // 聊天内容
                meHeadeImg: Const.imDefaultHeadImg,
                otherHeadImg: Const.platformIcon,
                emptyViewHeight: "51px",
                serviceLinkShow: false, // 是否显示客服连接
                serviceLinkArr: [], // 客服问题数组
                showSendHouseLinkView: false, // 是否显示发送房源连接的view
                sendHouseLinkItem: new ChartDetailItem(),

                agentInfoItem: {}, //  经纪人信息
                showBackIndex: false, // 回到首页

                couponId: "", // 优惠券id
                showCouponTc: false, // 是否显示优惠券弹窗
                couponInfo: {}, // 优惠券信息
                noClickBackIndex: null, // 3s没操作返回到首页

                recomendHouseList: [], // 经纪人推送的房源列表
                isMoreSendInfo: false, // 是否是展示更多

                autoSendLiskStatus: 1, // 自动发送房源状态吗  不等1都自动发

                evaluateViewShow: false, // 是否显示聊天评价弹窗

                // 视频播放相关参数
                videoTcShow: false,
                videoSrc: "",
                videoFirstImg: "",

                // 经纪人电话
                servicePhone: "",

                haveMoreData: true,
                isScrollIng: false,
                isIphoneX: false,
                scrollIntoView: ""
            }
        },

        components: {
            imgReceiveView,
            textReceiveView,
            voiceReceiveView,
            positionReceiveView,
            videoReceiveView,

            textMeView,
            voiceMeView,
            imgMeView,
            videoMeView,
            positionMeView,

            headView,
            sendMsg,

            scrollLoading,
            showModal
        },

        onLoad(params) {
            if (uni.getSystemInfoSync().model.indexOf("iPhone X") >= 0) {
                this.isIphoneX = true;
            }

            this.initDeptName(params);
            privateData.page = this;
            this.initParams(params);
            this.ImChart.messageId = params.messageId || "";
            this.initImChart();
            this.ImChart.inChartDetail = true;
            new Notification().addObserver(this, "ImLinkSuccessChange", Notify.ImLinkSuccessChange.Name);
            // 监听用户信息事件
            new Notification().addObserver(this, "UserInfoChanged", Notify.UserInfoChanged.Name);
            // 监听已读回执
            new Notification().addObserver(this, "MsgReadChanged", Notify.MsgReadChanged.Name);
            // 监听消息
            new Notification().addObserver(this, "UpChartMsgChanged", Notify.UpChartMsgChanged.Name);
            // 监听消息发送成功
            new Notification().addObserver(this, "MsgSendSuccessChange", Notify.MsgSendSuccessChange.Name);
            // 监听发送点击
            new Notification().addObserver(this, "ClickChartMoreInfo", Notify.ClickChartMoreInfo.Name);
        },

        onShow() {
           this.ImChart.inChartDetail = true;
        },

        onHide() {
            this.voicePlayChange({isPlayIng: true});
            this.ImChart.inChartDetail = false;
        },

        onUnload() {
            this.voicePlayChange({isPlayIng: true});
            // 反注册通知
            new Notification().removeObserverAllNotification(this);
            this.ImChart.inChartDetail = false;
            this.ImChart.messageId = "";
        },

        // 原生按钮点击事件
        onNavigationBarButtonTap(e) {
            if (!e.id) return;

            if (e.id !== "telephone") return;

            if(!this.servicePhone) {
                this.DifferenceApi.showToast("暂无电话");
                return;
            }

            this.$refs.modal.show();
        },

        methods: {
            // 初始化门店信息
            initDeptName(params) {
                if (!params.messageId || GetLoginModel.getAccountSource() == 2) return;

                let messageId = params.messageId.toString();
                if (messageId.indexOf("ld_") >= 0) {
                    new UserDeptName({
                        userId: messageId.replace("ld_",""),
                        isBroker: messageId.indexOf("ld_") >= 0 ? 0 : 1
                    }).send().then(res => {
                        if (res.errCode === Const.success) {
                            this.deptName = res.data ? res.data.deptName || "" : "";
                        }
                    });
                    return;
                }

                new GetBrokerContactInfo({archiveId: messageId.replace("ld_","")}).send()
                    .then(res => {
                        this.deptName = res.DATA ? res.DATA.deptName || "" : "";
                    });
            },

            // 返回
            goBack() {
                uni.navigateBack({
                    delta: 1
                });
            },

            // 拨打电话
            onModalChanged(val) {
                if(val) {
                    this.DifferenceApi.makePhoneCall(this.servicePhone)
                }
            },

            // 视频播放回调
            videoPlayChange(item) {
                // this.videoSrc = item.url;
                // this.videoFirstImg = item.videoFirstImg;
                // this.videoTcShow = true;
                // let videoValue = uni.createVideoContext('myVideo');
                // videoValue.hideStatusBar();
                // videoValue.requestFullScreen({direction: 0});
                // videoValue.play();

                // #ifdef APP-PLUS
                var barcode = plus.barcode.create('barcode', [plus.barcode.QR], {
                    top: '0',
                    left:'0px',
                    width: '100%',
                    bottom: '0',
                    position: 'fixed'
                });
                var pages = getCurrentPages();
                var page = pages[pages.length - 1];
                var currentWebview = page.$getAppWebview();
                currentWebview.append(barcode);


                if(!privateData.videoPlayerVal){
                    console.error("url",item.url);
                    privateData.videoPlayerVal = plus.video.createVideoPlayer('videoplayer', {
                        src: item.url,
                        top: '0',
                        left:'0px',
                        width: '100%',
                        height: "500px",
                        bottom: '0',
                        position: 'static'
                    });
                    this.$mp.page.$getAppWebview().append(privateData.videoPlayerVal);
                    privateData.videoPlayerVal.play();
                    // plus.webview.currentWebview().append(privateData.videoPlayerVal);
                }
                // #endif
            },

            // 语音播放回调
            voicePlayChange(item) {
                if(item.isPlayIng) {
                    this.currentClickIndex = "err";
                    if(innerAudioContext && innerAudioContext.pause) {
                        innerAudioContext.pause();
                    }
                    if(innerAudioContext && innerAudioContext.stop) {
                        innerAudioContext.stop();
                    }
                    if(innerAudioContext && innerAudioContext.destroy) {
                        innerAudioContext.destroy();
                    }
                    return;
                }

                innerAudioContext = uni.createInnerAudioContext();
                this.currentClickIndex = item.index;
                innerAudioContext.src = item.url;
                innerAudioContext.play();
                innerAudioContext.onError((res) => {
                    this.currentClickIndex = "err";
                });
                innerAudioContext.onStop(res => {
                    this.currentClickIndex = "err";
                });
                innerAudioContext.onEnded((res) => {
                    this.currentClickIndex = "err";
                });
            },

            // 查看大图回调
            lookMaxImgChange(item) {
                this.lookImgMax(item.content);
            },

            // 初始化消息
            initImChart() {
                if (this.ImChart.imChartVal) {
                    this.initData(() => {
                        this.scrollLoading = false;
                    });
                }
            },
            // IM连接成功回调
            ImLinkSuccessChange() {
                this.initImChart();
            },

            // 已读回执
            MsgReadChanged(name, time) {
                let chartList = this.chartList || [];
                for (let item of chartList) {
                    if (item.timeStr != undefined && item.timeStr <= time) {
                        item.isRead = true;
                    }
                }
                this.chartList = chartList;
            },

            // 更多切换回调
            OnMoreSendChanged(val) {
                this.isMoreSendInfo = val;
            },
            // input 聚焦/失焦
            onInputFocus(info) {
                // this.sendInputBottom = info.height;
            },

            // 用户消息回调
            UserInfoChanged() {
                this.ImChart.initImUserInfo()
                    .then(() => {
                        this.initData();
                        this.scrollLoading = false;
                    });
                this.ImChart.inChartDetail = true;
            },

            // 初始化参数
            initParams(params = {}) {
                privateData.params = params;
                if (params.name) {
                    this.titleText = params.name;
                }
                if (params.messageId) {
                    this.messageId = params.messageId;
                    this.ImChart.messageId = params.messageId;
                }
                if (params.isShield != undefined) {
                    this.isShield = params.isShield;
                }
                if (new UserInfoModel().getModel("accid")) {
                    this.accid = new UserInfoModel().getModel("accid");
                    this.ImChart.setUuAccid(this.accid);
                }
                if (params.accid) {
                    this.accid = params.accid;
                    new UserInfoModel().setModel(params.accid, "accid");
                    this.ImChart.setUuAccid(params.accid);
                }
                if (params.couponId) {
                    this.couponId = params.couponId;
                }
                let privateKeys = ["caseId", "cityId", "caseType", "reSource"];
                privateKeys.map((key) => {
                    privateData[key] = params[key] || "";
                });
                if(!privateData.reSource) {
                    privateData.reSource = "1";
                }
            },

            initData(callback = function () {}) {
                this.initChartDetail((res) => callback(res));
                new GetUserMobile({imId: this.messageId}).send()
                    .then(res => {
                        if(res.errCode !== Const.success || !res.data) return;

                        this.servicePhone = res.data.userMobile || "";
                    });
            },

            initChartDetail(callback = function () {}) {
                // 获取用户信息
                this.ImChart.imChartVal.getUser({
                    account: this.messageId,
                    sync: true,
                    done: (error, user) => {
                        let otherHeadImg = Const.imDefaultHeadImg;
                        if (user && user.avatar) {
                            otherHeadImg = new Utils().dealImgSrcSize(user.avatar, 80, 80);
                        }
                        if(new ConsultantListModel().getModel()
                            && new ConsultantListModel().getModel()[this.messageId]
                            && new ConsultantListModel().getModel()[this.messageId].avatar) {
                            otherHeadImg = new Utils().dealImgSrcSize(
                                new ConsultantListModel().getModel()[this.messageId].avatar,
                                80,
                                80
                            );
                        }
                        this.otherHeadImg = otherHeadImg;
                    }
                });
                this.ImChart.getHistory(this.messageId, new Date().getTime() + 10000, 10,
                    (res) => {
                        this.chartList = res.list || [];
                        callback(res);
                        privateData.haveMoreData = res.haveMoreData || false;
                        this.meHeadeImg = GetLoginModel.getUserPhoto()
                            ? new Utils().dealImgSrcSize(GetLoginModel.getUserPhoto(), 80, 80)
                            : Const.imDefaultHeadImg;
                        if(res.name) {
                            this.titleText = res.name;
                        }
                        let userId = GetLoginModel.getUserId() || "";
                        let listModel = new ChatListModel().getModel() || {};
                        let map = listModel[userId] || {};
                        let obj = map[this.messageId] || {};
                        obj.name = this.titleText || res.name || obj.name || "";
                        map[this.messageId] = obj;
                        listModel[userId] = map;
                        new ChatListModel().setModel(listModel);
                        this.upImgList();
                        setTimeout(() => {
                            this.scrollToBottom();
                        }, 500);
                    }
                );
            },

            // 点击滑动区域隐藏更多展示
            scrollClick() {
                this.isMoreSendInfo = true;
                new Notification().postNotification(Notify.ClickChartDetailScroll.Name);
            },

            // 点击底部按钮的回调
            ClickChartMoreInfo(name, info = {}) {
                let heightMap = {
                    more: {
                        height: uni.upx2px(340)
                    },
                    emoji: {
                        height: uni.upx2px(540)
                    },
                    normal: {
                        height: uni.upx2px(110)
                    }
                };
                let height = heightMap[info.type] && heightMap[info.type].height
                    ? heightMap[info.type].height+"px"
                    : heightMap.normal.height+"px";
                if(!info.value) {
                    height = heightMap.normal.height+"px";
                }
                this.emptyViewHeight = height;
                if (!info.disabledScroll) {
                    this.scrollToBottom();
                }
            },

            // 滚动到底部
            scrollToBottom() {
                clearTimeout(privateData.pageScrollTimeOutVal);
                privateData.pageScrollTimeOutVal = null;
                this.scrollIntoView = "";
                privateData.pageScrollTimeOutVal = setTimeout(() => {
                    this.scrollIntoView = "scrollIntoId";
                }, 300);
            },

            // 聊天内的图片资源
            upImgList() {
                privateData.imgList = [];
                for (let item of this.chartList) {
                    if (item.type == 'img') {
                        privateData.imgList.push(item.content);
                    }
                }
            },
            lookImgMax(url = "") {
                uni.previewImage({
                    current: url,
                    urls: privateData.imgList,
                    indicator: "number"
                });
            },
            clickChartDetail(item) {
                if (item.type == 'img') {
                    this.lookImgMax(item.content);
                }
            },

            // 新消息回调
            UpChartMsgChanged(name, item) {
                // console.error("UpChartMsgChanged", item);
                if (item) {
                    if (item.type === "house" && item.mySend) {
                        this.showSendHouseLinkView = false;
                    }
                    this.chartList.push(item);
                    this.upImgList();
                    this.scrollToBottom();
                }
            },
            // 消息发送成功回调
            MsgSendSuccessChange(name, info) {
                for (let i = 0;i<this.chartList.length;i++) {
                    let item = this.chartList[i] || {};
                    if (info.type && info.type === "position") {
                        let content = JSON.parse(info.msg.content);
                        if (content.data.locationImageUrl === item.content.staticImg) {
                            item.isSendUser = false;
                            item.msg = info.msg || {};
                            item.sendFail = item.sendFail || false;
                            this.$set(this.chartList, i, item);
                            break;
                        }
                    }

                    if (info.url === item.content) {
                        item.isSendUser = false;
                        item.msg = info.msg || {};
                        item.sendFail = item.sendFail || false;
                        this.$set(this.chartList, i, item);
                        break;
                    }
                }
            },

            // 发送文本消息
            sendTextMsgCommon(text, callback = function() {}) {
                new ImSendMessage(this.messageId).sendText(text)
                    .then(() => {
                        let emoji = new DealChartDetail().dealEmoji(text);
                        let item = new ChartDetailItem();
                        item.type = "text";
                        item.content = text;
                        item.mySend = true;
                        item.time = formatTimeNew(new Date().getTime());
                        item.emoji = emoji;
                        item.hasEmoji = (emoji[1].length > 0);
                        this.chartList.push(item);
                        item.showTime = DealLastMsgTime.checkShowTime(this.messageId, new Date().getTime());
                        DealLastMsgTime.setTime(new Date().getTime(), this.messageId);
                        this.scrollToBottom();
                        callback(item);
                    });
            },

            // 触顶
            scrolltoupper() {
                if(!privateData.haveMoreData || this.isScrollIng) return;

                this.isScrollIng = true;
                let chartList = this.chartList || [];
                let firstTimeStr = chartList.length > 0
                    ? chartList[0].timeStr || new Date().getTime() : new Date().getTime();
                this.ImChart.getHistory(this.messageId, firstTimeStr, 10, (res) => {
                    console.log(res,"getHistory");
                    this.isScrollIng = false;
                    this.haveMoreData = res.haveMoreData || false;
                    this.chartList = (res.list || []).concat(chartList);
                    this.upImgList();
                })
            },
        },
    }
</script>

<style>
    .top_fixed{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: #ffffff;
        z-index: 200;
        padding-top: calc(var(--status-bar-height) + 20upx);
        padding-bottom: 20upx;
        box-sizing: border-box;
    }
    .top_fixed_cont{
        padding: 0 40upx;
        box-sizing: border-box;
        width: 100%;
        height: 70upx;
        line-height: 70upx;
        align-items: center;
    }
    .top_fixed_back_view{
        width: 80upx;
        align-items: center;
        flex-shrink: 0;
    }
    .top_fixed_title{
        text-align: center;
        font-family: PingFang-SC-Bold;
        font-size: 36upx;
        font-weight: bold;
        font-stretch: normal;
        color: #191f25;
        max-width: 12em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .top_fixed_right{
        width: 80upx;
        flex-shrink: 0;
    }
    .top_fixed_back{
        width: 18upx;
        height: 33upx;
        margin: auto auto auto 0;
    }
    .deptName_view{
        font-family: PingFang-SC-Medium;
        font-size: 22upx;
        font-weight: normal;
        font-stretch: normal;
        color: #a3a5a8;
        line-height: 40upx;
        text-align: center;
    }

    page {
        height: 100%;
        background-color: #f8f8f8;
        width: 100%;
        margin: 0;
        font-family: "微软雅黑", "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
    }
    .no_ago_msg_text {
        color: #333333;
        font-size: 20upx;
        margin-top: 30upx;
        text-align: center;
    }
    .empty_link_view {
        height: 310upx;
        width: 100%;
        flex-shrink: 0;
    }

    .message_detail {
        height: 100%;
        width: 100%;
        background: #f8f8f8;
        box-sizing: border-box;
    }
    .message_detail .message_cont_has_name{
        position: fixed;
        top: calc(var(--status-bar-height) + 150upx);
        bottom: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        background: #f8f8f8;
    }
    .message_detail .message_cont_no_name{
        position: fixed;
        top: calc(var(--status-bar-height) + 110upx);
        bottom: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        background: #f8f8f8;
    }
    .message_cont {
        width: 100%;
        height: 100%;
        padding: 0 30upx 160upx;
        box-sizing: border-box;
        background: #f8f8f8;
    }

    .message_item {
        width: 100%;
        margin-bottom: 25upx;
        padding-right: 20upx;
    }

    .msg_send_time_view {
        text-align: center;
        font-size: 24upx;
        margin: 40upx 0;
    }

    .msg_send_time_text {
        min-width: 150upx;
        height: 40upx;
        line-height: 40upx;
        text-align: center;
        border-radius: 6upx;
        background: #dddddd;
        padding: 0 10upx;
        box-sizing: border-box;
        will-change: transform;
        max-width: 230upx;
        margin: 0 auto;
        font-size: 20upx;
        color: #ffffff;
    }

    .sned_msg_view {
        width: 100%;
        bottom: 0;
        background-color: #fff;
        box-sizing: border-box;
        position: fixed;
        z-index: 99;
    }

    .service_link_view {
        background: #FFFFFF;
        width: 90%;
        border-radius: 3px;
        will-change: transform;
        box-sizing: border-box;
        padding: 20upx 30upx;
        font-size: 28upx;
        color: #333333;
        line-height: 42upx;
        margin: 30upx auto;
    }

    .service_link_cont {
        padding-bottom: 20upx;
    }

    .service_link_title {
        margin-bottom: 20upx;
    }

    .service_link_item {
        color: #4DAAF0;
        text-decoration: underline;
        margin-bottom: 6upx;
    }

    .top_empty_view {
        height: 30upx;
        width: 100%;
    }

    /* 优惠券隐藏btn */
    .coupon_hide_btn {
        position: fixed;
        right: 10upx;
        bottom: 250upx;
        width: 90upx;
        height: 100upx;
        opacity: 0.9;
        background: url(http://cdn.haofang.net/static/uuminiapp/im/coupon/coupon_redbag.png) no-repeat 0 0;
        background-size: 100%;
        margin-bottom: 30upx;
        text-align: center;
        vertical-align: middle;
        display: flex;
        display: -webkit-flex;
        align-items: center;
    }

    .coupon_hide_btn_text {
        width: 100%;
        height: 18upx;
        font-size: 18upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 37upx;
        letter-spacing: 0px;
        color: #ffd800;
        text-align: center;
    }

    .coupon-success {
        width: 590upx;
        background-color: #fef6e9;
        margin: 0 auto;
        text-align: left;
        font-size: 24upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 50upx;
        letter-spacing: 0px;
        color: #fe943e;
        padding: 25upx 30upx;
        margin-bottom: 20upx;
    }
    .iphone_x{
        height: 30upx;
    }
</style>
