

<template>
    <view class="remind_msg">
        <block v-for="(item, index) in list" :key="index">
            <view @click="goToCustomDetail(item)" class="f_c_s remind_item">
                <view class="f_r_b remind_item_top">
                    <view class="f_r_s">
                        <image class="remind_icon" :src="item.iconPath"></image>
                        <view class="remind_title">{{ item.title }}</view>
                    </view>

                    <view class="remind_time">{{ item.time }}</view>
                </view>

                <view class="f_c_s remind_cont">
                    <view class="remind_content">{{ item.content }}</view>
                    <view class="remind_broke">{{ item.brokeInfo }}</view>

                    <view class="f_r_b remind_btn">
                        <view class="remind_btn_text">查看详情</view>
                        <image class="remind_arrow" src="http://cdn.haofang.net/static/xfldDeveloper/msg/arrow_right.png"></image>
                    </view>
                </view>
            </view>
        </block>

        <view class="empty_bottom"></view>
    </view>
</template>

<style>
    page{
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

    //-3:带看过期 -2:报备过期 -1:撤销 0:无效 1:报备 2:审核 3:带看 4:认购 5:签约 6:结佣 7:退佣 8.提交
    class RemindItem {
        status = "";  // 状态 1认购 2确客 3签约） 4报备 5结佣 6撤销 7退佣 8报备过期 9结算 10带看过期
        content = ""; // 内容区  黄先生(138****4247)签约中冶世界楼盘2-1-1202 A1户型
        brokeInfo = ""; // 经纪人信息   刘碧强-九眼桥店/经纪人
        time = new Date().getTime(); // 时间
        cityId = "1";
        customId = ""; // 客户id
        iconPath = "";
        title = "";

        getMapItem(status) {
            let map = new Map()
                .set(1, {
                    icon: "http://cdn.haofang.net/static/xfldDeveloper/msg/rengou_icon.png",
                    title: "认购信息"
                })
                .set(2, {
                    icon: "http://cdn.haofang.net/static/xfldDeveloper/msg/queke_icon.png",
                    title: "确客信息"
                })
                .set(3, {
                    icon: "http://cdn.haofang.net/static/xfldDeveloper/msg/chengjiao_icon.png",
                    title: "签约信息"
                })
                .set(4, {
                    icon: "http://cdn.haofang.net/static/xfldDeveloper/msg/baobei_icon.png",
                    title: "报备信息"
                })
                .set(5, {
                    icon: "http://cdn.haofang.net/static/xfldDeveloper/msg/jieyong_icon.png",
                    title: "结佣信息"
                })
                .set(6, {
                    icon: "http://cdn.haofang.net/static/xfldDeveloper/msg/chexiao_icon.png",
                    title: "撤销信息"
                })
                .set(7, {
                    icon: "http://cdn.haofang.net/static/xfldDeveloper/msg/tuiyong_icon.png",
                    title: "退佣信息"
                })
                .set(8, {
                    icon: "http://cdn.haofang.net/static/xfldDeveloper/msg/guoqi_icon.png",
                    title: "报备过期"
                })
                .set(9, {
                    icon: "http://cdn.haofang.net/static/xfldDeveloper/msg/jiesuan_icon.png",
                    title: "结算信息"
                })
                .set(10, {
                    icon: "http://cdn.haofang.net/static/xfldDeveloper/msg/guoqi_icon.png",
                    title: "带看过期"
                });

            if (!map.has(status)) return null;

            return map.get(status);
        }

        getStatus(status) {
            let map = {
                4: 1,
                3: 2,
                5: 3,
                1: 4,
                6: 5,
                "-1" : 6,
                7: 7,
                "-2": 8,
                "-3": 10,
            };
            return map[status] || null;
        }
    }

    export default {
        data() {
            return {
                list: []
            }
        },

        onLoad() {
            UpUnReadNumTab.removeReadNum(ProjectConfigConst.remindMsgMessageId);
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
                    this.ImChart.getHistoryOriginal(ProjectConfigConst.remindMsgMessageId)
                        .then(res => {
                            let msgs = res ? res.msgs || [] : [];
                            msgs = msgs.sort(new compare("time").maxToMin());
                            let list = [];
                            for (let info of msgs) {
                                let data = !info.content ? {} : (JSON.parse(info.content)).data || {};
                                let item = new RemindItem();
                                item.status = item.getStatus(data.custStatus);
                                item.cityId = data.cityId;
                                item.content = data.content;
                                item.brokeInfo = data.brokerInfo;
                                item.time = formatTimeNew(info.time);
                                item.customId = data.custId;
                                let mapInfo = item.getMapItem(item.status);
                                if (!mapInfo) continue;

                                if (item.status == 5 && data.title.indexOf("结算") >= 0) {
                                    item.status = 9;
                                    mapInfo = item.getMapItem(item.status);
                                }
                                item.iconPath = mapInfo ? mapInfo.icon : "";
                                item.title = mapInfo ? mapInfo.title : "";
                                list.push(item);
                            }
                            this.list = list;
                        });
                }, 150);
            },

            // 查看详情 source=remind 加个source判断 从动态消息进去做判断
            goToCustomDetail(item) {
                uni.navigateTo({
                    url: "/pagesCustomer/customerDetail/customerDetail?custId="
                        + item.customId + "&cityId=" + item.cityId + "&source=remind"
                });
            }
        }
    }
</script>
