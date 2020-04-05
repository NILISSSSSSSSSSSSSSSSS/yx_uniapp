

<template>
    <scroll-view scroll-y class="scroll_view">
        <view class="remind_msg" v-if="list && list.length > 0">
            <block v-for="(item, index) in list" :key="index">
                <view @click="goToCustomDetail(item)" class="f_c_s remind_item" v-if="!item.type || item.type !== 'default'">
                    <view class="f_r_b remind_item_top">
                        <view class="f_r_s">
                            <image class="remind_icon" :src="item.iconPath"></image>
                            <view class="remind_title">{{ item.title }}</view>
                        </view>

                        <view class="remind_time">{{ item.time }}</view>
                    </view>

                    <view class="f_c_s remind_cont">
                        <view class="remind_content">{{ item.content }}</view>

                        <view class="f_r_b remind_btn">
                            <view class="remind_btn_text">查看详情</view>
                            <image class="remind_arrow" src="http://cdn.haofang.net/static/xfldDeveloper/msg/arrow_right.png"></image>
                        </view>
                    </view>
                </view>

                <view class="f_c_s remind_item" v-else>
                    <view class="f_r_b remind_item_top">
                        <view class="f_r_s">
                            <view class="remind_title">{{ item.title }}</view>
                        </view>

                        <view class="remind_time">{{ item.time }}</view>
                    </view>

                    <view class="f_c_s remind_cont" style="padding-bottom: 30upx">
                        <view class="remind_content">{{ item.content }}</view>

                        <image v-if="item.photo" class="remind_arrow_new" mode="widthFix" :src="item.photo || ''"></image>
                    </view>
                </view>

            </block>

            <view class="empty_bottom"></view>
        </view>

        <view v-if="list && list.length === 0" class="no_list_view f_c_c">
            <image mode="aspectFit" src="http://cdn.haofang.net/static/xfldDeveloper/msg/no_msg.png"></image>
            <view>暂时没有新消息</view>
        </view>
    </scroll-view>
</template>

<style>
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

    page,.scroll_view{
        width: 100%;
        height: 100%;
        background-color: #f8f8f8;
    }
    .remind_msg{
        padding: 40upx 40upx 0;
        box-sizing: border-box;
    }
    .remind_item{
        margin-bottom: 30upx;
        border-radius: 10upx;
        box-sizing: border-box;
        overflow: hidden;
    }
    .remind_item:last-child{
        margin-bottom: 0;
    }
    .remind_item_top{
        width: 100%;
        height: 80upx;
        line-height: 80upx;
        background-color: #fbfbfb;
        padding: 0 30upx;
        box-sizing: border-box;
        align-items: center;
    }
    .remind_icon{
        width: 48upx;
        height: 48upx;
        flex-shrink: 0;
        margin: auto 20upx auto 0;
    }
    .remind_title{
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        color: #191f25;
    }
    .remind_time{
        font-family: PingFang-SC-Medium;
        font-size: 26upx;
        color: #a3a5a8;
        text-align: right;
    }
    .remind_cont{
        background-color: #ffffff;
        padding:  30upx 30upx 0 30upx;
        box-sizing: border-box;
    }
    .remind_content{
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        box-orient:vertical;
        line-clamp:2;
        text-align: left;
        font-family: PingFang-SC-Bold;
        font-size: 32upx;
        line-height: 40upx;
        color: #191f25;
        margin-bottom: 30upx;
        font-weight: bold;
    }
    .remind_broke{
        font-family: PingFang-SC-Medium;
        font-size: 26upx;
        line-height: 26upx;
        color: #a3a5a8;
        margin-top: 20upx;
        margin-bottom: 38upx;
        text-align: left;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .remind_btn{
        height: 80upx;
        line-height: 80upx;
        align-items: center;
        border-top: 1upx solid #ebebeb;
        box-sizing: border-box;
    }
    .remind_btn_text{
        font-family: PingFang-SC-Medium;
        font-size: 26upx;
        color: #7d8184;
    }
    .remind_arrow{
        width: 14upx;
        height: 26upx;
        margin: auto 0;
        flex-shrink: 0;
    }
    .remind_arrow_new{
        width: 100%;
        margin: auto 0;
        flex-shrink: 0;
    }
    .empty_bottom{
        width: 100%;
        height: 30upx;
        flex-shrink: 0;
    }
</style>

<script>
    import {Notification} from "../../utils/Notification";
    import {Notify} from "../../utils/Notify";
    import {UpUnReadNumTab} from "../../utils/ImChart";
    import {ProjectConfigConst} from "../../utils/ProjectConfigConst";
    import {formatTimeNew, compare} from "../../utils/common";

    class RemindItem {
        content = ""; // 内容区  黄先生(138****4247)签约中冶世界楼盘2-1-1202 A1户型
        time = new Date().getTime(); // 时间
        cityId = "1";
        customId = ""; // 客户id
        iconPath = "";
        title = "";

        getMapItem() {
            let map = new Map()
                .set("申请带看", {
                    icon: "http://cdn.haofang.net/static/xfldDeveloper/msg/sq_dk.png",
                    title: "申请带看"
                })
                .set("申请认购", {
                    icon: "http://cdn.haofang.net/static/xfldDeveloper/msg/sq_rg.png",
                    title: "申请认购"
                })
                .set("申请签约", {
                    icon: "http://cdn.haofang.net/static/xfldDeveloper/msg/sq_qy.png",
                    title: "申请签约"
                })
                .set("申请结佣", {
                    icon: "http://cdn.haofang.net/static/xfldDeveloper/msg/sq_jy.png",
                    title: "申请结佣"
                });

            if (!map.has(this.title)) return null;

            return map.get(this.title);
        }
    }

    export default {
        data() {
            return {
                list: null
            }
        },

        onLoad() {
            UpUnReadNumTab.removeReadNum(ProjectConfigConst.systemMsgMessageId);
            new Notification().addObserver(this, "ImLinkSuccessChange", Notify.ImLinkSuccessChange.Name);
            this.initData();
        },

        methods: {
            ImLinkSuccessChange() {
                this.initData();
            },

            initData() {
                if (!this.ImChart.imChartVal) return;

                setTimeout(() => {
                    this.ImChart.getHistoryOriginal(ProjectConfigConst.systemMsgMessageId)
                        .then(res => {
                            let msgs = res ? res.msgs || [] : [];
                            msgs = msgs.sort(new compare("time").maxToMin());
                            let list = [];
                            for (let info of msgs) {
                                let data = !info.content ? {} : (JSON.parse(info.content)).data || {};
                                let item = new RemindItem();
                                item.cityId = data.cityId;
                                item.content = data.content || "";
                                item.time = formatTimeNew(info.time);
                                item.customId = data.custId;
                                item.title = data.title || "";
                                let mapInfo = item.getMapItem();
                                if (mapInfo) {
                                    item.iconPath = mapInfo ? mapInfo.icon : "";
                                    continue;
                                }

                                item.photo = data.PHOTO || '';
                                item.type = 'default';

                                list.push(item);
                            }

                            this.list = list;
                        });
                }, 150);
            },

            // 查看详情
            goToCustomDetail(item) {
                uni.navigateTo({
                    url: "/pagesCustomer/customerDetail/customerDetail?custId="
                        + item.customId + "&cityId=" + item.cityId
                });
            }
        }
    }
</script>
