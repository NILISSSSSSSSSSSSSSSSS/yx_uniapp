

<template>
    <view class="message_view">
        <view class="title-view"></view>
        <view class="top_cont f_r_b">
            <view class="top_cont_text">消息</view>

            <view @click.stop="goToCustomer" class="list_person_view f_r_e">
                <image class="list_person" src="http://cdn.haofang.net/static/xfldDeveloper/msg/list_person.jpg"></image>
            </view>
        </view>

        <scroll-view scroll-y="true" class="item_cont">
            <!--系统消息-->
            <view class="item_list">
                <view @click="goToSystemDetail" class="f_r_s message_item">
                    <collectFormId></collectFormId>
                    <!--置顶-->
                    <view class="message_item_top"></view>

                    <view class="head_img_view">
                        <image mode="aspectFill" src="http://cdn.haofang.net/static/xfldDeveloper/msg/msg_xt.png"></image>
                    </view>

                    <view class="f_c_c message_cont">
                        <view class="f_r_b message_top">
                            <view class="f_r_s massage_name_view">
                                <view class="massage_name">{{ systemMsgItem.name }}</view>
                            </view>

                            <view class="message_last_time">{{ systemMsgItem.lastTime }}</view>
                        </view>

                        <view class="f_r_b msg_text_view">
                            <view class="msg_text">{{ systemMsgItem.msg }}</view>

                            <view v-if="systemMsgItem.unRead && systemMsgItem.unRead > 99" class="point">99+</view>
                            <view v-if="systemMsgItem.unRead && systemMsgItem.unRead <= 99" class="point">{{ systemMsgItem.unRead }}</view>
                        </view>
                    </view>
                </view>
            </view>

            <view class="item_list">
                <view :class="{message_left: item.isShowBtn}" class="f_r_s message_item"
                      v-for="(item, index) in chartList" :key="index"
                      @click.stop="getChartDetail(item, index)"
                      @touchstart="touchStart($event, index, item)"
                      @touchend="touchEnd($event, index, item)">
                    <collectFormId></collectFormId>
                    <!--置顶-->
                    <view v-if="item.isTop == 1" class="message_item_top"></view>

                    <view @click.stop="getChartDetail(item, index)"  class="head_img_view">
                        <image mode="aspectFill" @error="imgError(item, index)" :src="item.headImg"></image>
                    </view>

                    <view class="f_c_c message_cont">
                        <view @click.stop="getChartDetail(item, index)" class="f_r_b message_top">
                            <view class="f_r_s massage_name_view">
                                <view class="massage_name">{{ item.name }}</view>
                                <view v-if="item.compName" class="massage_compName">{{ item.compName }}</view>
                            </view>

                            <view class="message_last_time">{{ item.lastTime }}</view>
                        </view>

                        <view @click.stop="getChartDetail(item, index)" class="f_r_b msg_text_view">
                            <view class="msg_text">{{ item.msg }}</view>

                            <view v-if="item.unRead && item.unRead > 99" class="point">99+</view>
                            <view v-if="item.unRead && item.unRead <= 99" class="point">{{ item.unRead }}</view>
                        </view>
                    </view>

                    <view class="f_r_e right_btn_view">
                        <view @click.stop="upTopStatus(item, index)"
                              class="ping_bi_btn">{{ item.isTop == 1 ? "取消置顶" : "置顶" }}</view>
                        <view class="del_btn" @click.stop="delMsg(item, index)">删除</view>
                    </view>
                </view>
            </view>

            <view class="empty_view"></view>
        </scroll-view>

        <!--<view v-if="chartList && chartList.length === 0" class="no_list_view f_c_c">-->
            <!--<image mode="aspectFit" src="http://cdn.haofang.net/static/xfldDeveloper/msg/no_msg.png"></image>-->
            <!--<view>暂时没有新消息</view>-->
        <!--</view>-->
    </view>
</template>

<script>
    import { formatTimeNew, compare } from "../../utils/common.js";
    import { ChartListItem, UpUnReadNumTab } from "../../utils/ImChart.js";
    import { Notify } from "../../utils/Notify.js";
    import { Notification } from "../../utils/Notification.js";
    import {DealChartListModel} from "../../model/im/ChatListModel";
    import {Utils} from "../../utils/Utils";
    import {Const} from "../../utils/Const";
    import {ProjectConfigConst} from "../../utils/ProjectConfigConst";
    import {GetLoginModel} from "../../model/LoginSuccessModel";

    class TouchMove {
        static startClientX = 0;
        static startClientY = 0;
        static endClientX = 0;
        static endClientY = 0;
        static page = null;  // vue 的作用域
        static index = 0;  // 当前的index

        static init() {
            this.hideAll();
            let yCha = Math.abs(this.endClientY - this.startClientY);
            let xCha = Math.abs(this.endClientX - this.startClientX);
            if(yCha >= xCha) {
                this.hide();
                return;
            }

            if(xCha <= 40) return;

            if(this.endClientX - this.startClientX < 0) {
                this.show();
                return;
            }

            if(this.endClientX - this.startClientX > 0) {
                this.hide();
            }
        }

        static hideAll() {
            this.page.chartList.map(item => {
                item.isShowBtn = false;
            });
        }

        static hide(i = this.index) {
            if(!this.page.chartList) return;

            let item = this.page.chartList[this.index] || {};
            item.isShowBtn = false;
            this.page.$set(this.page.chartList, this.index, item);
        }

        static show() {
            if(!this.page.chartList) return;

            let item = this.page.chartList[this.index] || {};
            item.isShowBtn = true;
            this.page.$set(this.page.chartList, this.index, item);
        }
    }

    export default {
        data() {
            return {
                chartList: null,
                defaultHead: Const.imDefaultHeadImg,
                serviceId: this.ImChart.getServiceId(),
                systemMsgItem: {
                    name: "系统消息",
                    lastTime: "",
                    msg: "",
                    unRead: 0
                }
            };
        },

        onShow() {
            this.initSystemMsg();
            UpUnReadNumTab.setTab();
            this.initData();
        },

        onLoad() {
            // 监听Im连接成功
            new Notification().addObserver(this, "ImLinkSuccessChange", Notify.ImLinkSuccessChange.Name);
            // 更新列表NC
            new Notification().addObserver(this, "UpChartListChanged", Notify.UpChartListChanged.Name);
        },

        onUnload() {
            // 反注册通知
            new Notification().removeObserverAllNotification(this);
        },

        // 原生按钮点击事件
        onNavigationBarButtonTap(e) {
            if (!e.id) return;

            if (e.id !== "contract") return;

            uni.navigateTo({
                url: "/pagesMsg/contacts/contacts"
            });
        },

        methods: {
            goToCustomer() {
                uni.navigateTo({
                    url: "/pagesMsg/contacts/contacts"
                });
            },

            initData() {
                this.drawChartList();
            },

            // 渲染列表
            drawChartList() {
                let serviceId = this.ImChart.getServiceId();
                let res = new DealChartListModel(serviceId).getMsgList();

                let chartList = [];
                res = res || [];
                res = res.sort(new compare("msg_timestamp").minToMax());
                let isTopList = [];
                let noTopList = [];
                if (res.length > 0) {
                    res.map(item => {
                        if(item.msg_timestamp
                            && item.accid !== ProjectConfigConst.systemMsgMessageId
                            && item.accid !== ProjectConfigConst.remindMsgMessageId) {
                            item.msg_timestamp = item.msg_timestamp.replace(/-/g, "/");
                            let chartItem = new ChartListItem();
                            chartItem.messageId = item.accid || "";
                            chartItem.headImg = item.icon
                                ? item.icon
                                : this.defaultHead;
                            chartItem.headImg = new Utils().dealImgSrcSize(chartItem.headImg, 140, 140);
                            chartItem.name = item.name || "";
                            chartItem.lastTime = formatTimeNew(item.msg_timestamp);
                            chartItem.msg = item.msg_type && item.msg_type === "VIDEO"
                                ? "[视频]" :  item.body || "";
                            chartItem.sendtime = formatTimeNew(item.msg_timestamp);
                            chartItem.unRead = UpUnReadNumTab.getUnReadNum(item.accid);
                            chartItem.lastTime_stamp = new Date(item.msg_timestamp).getTime();
                            chartItem.isShield = item.isShield || "";
                            chartItem.isShowBtn = false;
                            if (GetLoginModel.getAccountSource() == 1) {
                                chartItem.messageId = chartItem.messageId.toString();
                                item.compName = chartItem.messageId.indexOf("ld_") >= 0
                                    ? "置业顾问" : "经纪人";
                            }
                            chartItem.compName = item.compName || "";
                            chartItem.isTop = item.isTop || 2;
                            if(chartItem.isTop == 1) {
                                isTopList.push(chartItem);
                            }else {
                                noTopList.push(chartItem);
                            }
                        }
                    });
                }
                if(isTopList.length > 0) {
                    isTopList.sort(new compare("lastTime_stamp").maxToMin());
                }
                if(noTopList.length > 0) {
                    noTopList.sort(new compare("lastTime_stamp").maxToMin());
                }
                chartList = isTopList.concat(noTopList);
                setTimeout(() => {
                    this.chartList = chartList;
                }, 10);
            },

            imgError(item, index) {
                item.headImg = this.defaultHead;
                this.$set(this.chartList, index, item);
            },

            touchStart(e, index, item) {
                let changedTouches = e.changedTouches || e.mp.changedTouches || [];
                if(!e || !changedTouches[0]) return;

                TouchMove.startClientX = changedTouches[0].clientX || 0;
                TouchMove.startClientY = changedTouches[0].clientY || 0;
            },

            touchEnd(e, index, item) {
                let changedTouches = e.changedTouches || e.mp.changedTouches || [];
                if(item.messageId == this.ImChart.getServiceId()) return;

                TouchMove.endClientX = changedTouches[0].clientX || 0;
                TouchMove.endClientY = changedTouches[0].clientY || 0;
                TouchMove.index = index;
                TouchMove.page = this;
                TouchMove.init();
            },

            // 屏蔽/解除
            blockMsg(item, index) {
                this.ImChart.blockMsg(item.messageId, !(item.isShield == 1));
            },

            // 删除消息
            delMsg(item, index) {
                this.ImChart.DeleteMsg(item.messageId);
            },

            // 更新置顶
            upTopStatus(item, index) {
                new DealChartListModel(item.messageId).upTopStatus(
                    !item.isTop || item.isTop == 2 ? 1 : 2
                );
            },

            // 查看详情
            getChartDetail(item, index) {
                item.unRead = 0;
                UpUnReadNumTab.removeReadNum(item.messageId);
                uni.navigateTo({
                    url: "/pagesMsg/msgDetail/msgDetail?messageId="+item.messageId
                        + "&name=" + (item.name || "")
                });
            },

            // 更新列表回调
            UpChartListChanged() {
                this.initData();
                this.initSystemMsg();
            },

            ImLinkSuccessChange() {
                this.initSystemMsg();
            },
            // 初始化系统消息
            initSystemMsg() {
                if (!this.ImChart.imChartVal) return;

                this.ImChart.getHistoryOriginal(ProjectConfigConst.systemMsgMessageId)
                    .then(res => {
                        console.log("系统消息", res);
                        let msgs = res ? res.msgs || [] : [];
                        let systemMsgItem = this.systemMsgItem;
                        if (msgs.length === 0) {
                            systemMsgItem.lastTime = formatTimeNew(new Date().getTime());
                            systemMsgItem.msg = "暂无消息";
                            this.systemMsgItem = systemMsgItem;
                            return;
                        }

                        this.systemMsgItem.unRead = UpUnReadNumTab.getUnReadNum(ProjectConfigConst.systemMsgMessageId) || 0;
                        msgs = msgs.sort(new compare("time").maxToMin());
                        let content = JSON.parse(msgs[0].content);
                        let data = content.data || {};
                        systemMsgItem.msg = data.CONTENT || "暂无消息";
                        systemMsgItem.lastTime = formatTimeNew(msgs[0].time || new Date().getTime());
                        this.systemMsgItem = systemMsgItem;
                    });
            },

            // 查看系统消息
            goToSystemDetail() {
                this.systemMsgItem.unRead = 0;
                UpUnReadNumTab.removeReadNum(ProjectConfigConst.systemMsgMessageId);
                uni.navigateTo({
                    url: "/pagesMsg/systemMsg/systemMsg"
                });
            }
        }
    }
</script>

<style>
    page{
        width: 100%;
        height: 100%;
        background: #ffffff;
        box-sizing: border-box;
    }
    .title-view{
        height: calc(var(--status-bar-height) + 60upx);
        background: #ffffff;
    }
    .message_view{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .top_cont{
        height: 80upx;
        line-height: 80upx;
        padding: 0 40upx;
        box-sizing: border-box;
        flex: 0;
        background-color: #ffffff;
        align-items: center;
    }
    .top_cont_text{
        font-family: PingFang-SC-Bold;
        font-size: 48upx;
        font-weight: bold;
        font-stretch: normal;
        color: #191f25;
    }
    .list_person_view{
        height: 100%;
        width: 80upx;
    }
    .list_person{
        width: 45upx;
        height: 34upx;
        flex-shrink: 0;
        margin: auto 0 auto auto;
    }
    .no_list_view{
        flex: 1;
        background: #ffffff;
        height: 100%;
    }
    .no_list_view>image{
        width: 374upx;
        height: 155upx;
        margin: -100upx auto 0;
    }
    .no_list_view>view{
        text-align: center;
        line-height: 30upx;
        margin-top: 50upx;
        font-size: 30upx;
        color: #c0c1c3;
    }
    .item_cont{
        height: calc(100% - 80upx - var(--status-bar-height) - 60upx);
        overflow-y: auto;
        overflow-x: hidden;
    }
    .item_list{
        padding-left: 40upx;
        background: #ffffff;
        width: 100%;
        box-sizing: border-box;
        flex: 1;
    }
    .message_item{
        background: #ffffff;
        height: 150upx;
        box-sizing: border-box;
        transition:0.5s;
        transform: translateX(0);
        position: relative;
    }
    .message_item_top{
        position: absolute;
        right: -8upx;
        top: -8upx;
        width: 0;
        height: 0;
        border-width: 14upx;
        border-style: solid;
        border-color: transparent #abccef transparent transparent;
        transform: rotate(135deg); /*顺时针旋转90°*/
    }
    .message_left{
        transform: translateX(-244upx);
    }
    .right_btn_view{
        position: absolute;
        right: -244upx;
        top: 0;
        height: 100%;
        width: 244upx;
        background: #FFFFFF;
        border-bottom: 1upx solid #f5f5f5;
        line-height: 150upx;
    }
    .ping_bi_btn{
        color:#FFFFFF;
        text-align:center;
        width:130upx;
        letter-spacing:1px;
        background-color:#3396fb;
        font-size:24upx;
        flex-shrink: 0;
    }
    .del_btn{
        color:#FFFFFF;
        font-size:24upx;
        float:right;
        width: 100%;
        text-align:center;
        letter-spacing:1px;
        background-color:#ff3d43;
    }
    .head_img_view{
        width: 100upx;
        height: 100upx;
        border-radius: 100%;
        background: #FFFFFF;
        box-sizing: border-box;
        margin: auto 30upx auto 0;
        flex-shrink: 0;
        position: relative;
    }
    .point{
        height: 34upx;
        min-width: 34upx;
        background-color: #ff3d43;
        line-height:34upx;
        padding: 0 10upx;
        font-size:22upx;
        color:#FFFFFF;
        text-align:center;
        border-radius:20upx;
        margin: auto 0;
        flex-shrink: 0;
        box-sizing: border-box;
        margin-left: 10upx;
    }
    .empty_view{
        height: 30upx;
        flex-shrink: 0;
    }
    .head_img_view image{
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
    .message_cont{
        margin: auto 0;
        box-sizing: border-box;
        text-align: left;
        width: calc(100% - 116upx);
        padding-right: 30upx;
        height: 150upx;
        border-bottom: 1upx solid #ebebeb;
    }
    .message_top{
        line-height: 46upx;
        align-items: center;
    }
    .massage_name_view{
        width: 75%;
        align-items: center;
        height: 36upx;
        line-height: 36upx;
    }
    .massage_name{
        text-align: left;
        color: #191f25;
        font-weight: bold;
        font-size: 32upx;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .massage_compName{
        background: #ffffff;
        color: #a3a5a8;
        font-size: 22upx;
        text-align: center;
        height: 35upx;
        line-height: 35upx;
        padding: 0 10upx;
        margin: auto 0 auto 10upx;
        border-radius: 4upx;
        max-width: 46%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        flex-shrink: 0;
        border: 1upx solid rgb(125,129,132,0.2);
        align-items: center;
    }
    .message_last_time{
        text-align: right;
        font-size: 22upx;
        color: #a3a5a8;
        flex-shrink: 0;
    }
    .msg_text_view{
        margin-top: 6upx;
        line-height: 40upx;
        width: 100%;
        min-height: 40upx;
    }
    .msg_text{
        width: 100%;
        color: #a3a5a8;
        font-size: 26upx;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
