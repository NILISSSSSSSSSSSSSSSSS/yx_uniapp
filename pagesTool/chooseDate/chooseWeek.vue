

<template>
    <scroll-view :scroll-into-view="scrollIntoId" class="scroll_view" scroll-y enable-back-to-top>
        <view class="top_view"></view>
        <block v-for="(list, key) in weekMap" :key="key">
            <view class="week_item">
                <view class="week_title f_r_c">
                    <view class="week_title_line"></view>
                    <view class="week_title_text">{{ dealWeekMonth(key) }}</view>
                    <view class="week_title_line"></view>
                </view>

                <view class="week_content f_r_s">
                    <block v-for="(item, index) in list" :key="index">
                        <view class="f_c_c week_content_item"
                              :id="item.scrollIntoId"
                              :class="[item.weekStartTime == weekStartTime ? 'week_content_item_active' :'']"
                              @click="chooseWeek(item, index)">
                            <view class="f_r_c week_content_val">{{ dealWeekNumShow(index+1) }}</view>
                            <view class="f_r_c week_content_time">
                                <view>{{ item.weekStartTimeText }}</view>-<view>{{ item.weekEndTimeText }}</view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </block>
    </scroll-view>
</template>

<script>
    import {formatDate} from "../../utils/common";
    import {Notify} from "../../utils/Notify";
    import {Notification} from "../../utils/Notification";

    class PrivateData {
        static startTimeStr = new Date().getTime();  // 2018-02-04 10:45:05  周日
        static endTimeStr = new Date().getTime();  // 2019/11/8 19:43:25  周五
    }

    export default {
        data() {
            return {
                weekMap: {},
                weekStartTime: "",
                scrollIntoId: "ld_"
            }
        },

        onLoad(params = {}) {
            // weekStartTime 当前选中的周开始时间  例如 2019-04-08
            if (params.weekStartTime) {
                this.weekStartTime = params.weekStartTime.replace(/-/g, "/");
            }
            PrivateData.startTimeStr= Number(params.initTime);
            this.initData();
        },

        methods: {
            initData() {
                let weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
                let oneWeekTimeStr = 7*24*60*60*1000;
                let endMondayStr = this.getMondayStr(PrivateData.endTimeStr); // 周一的时间戳
                let startMondayStr = this.getMondayStr(PrivateData.startTimeStr); // 周一的时间戳
                let weekAllNum = parseInt((endMondayStr - startMondayStr)/oneWeekTimeStr);
                let weekMap = {};
                for (let i = 1;i <= weekAllNum; i++) {
                    let startDate = new formatDate(new Date(startMondayStr + (i - 1)*oneWeekTimeStr));
                    let endDate = new formatDate(new Date(startMondayStr + i*oneWeekTimeStr-1000));
                    let item = {
                        weekStartTimeStr: startMondayStr + (i - 1)*oneWeekTimeStr,
                        weekEndTimeStr: startMondayStr + i*oneWeekTimeStr,
                        weekStartTimeText: `${parseInt(startDate.getMonth())}.${parseInt(startDate.getDay())}`,
                        weekEndTimeText: `${parseInt(endDate.getMonth())}.${parseInt(endDate.getDay())}`,
                        weekStartTime: `${startDate.getYear()}/${startDate.getMonth()}/${startDate.getDay()}`,
                        weekEndTime: `${endDate.getYear()}/${endDate.getMonth()}/${endDate.getDay()}`,
                        scrollIntoId: "scrollIntoId_" + i,
                    };
                    if (this.weekStartTime == item.weekStartTime) {
                        this.scrollIntoId = item.scrollIntoId;
                    }
                    if (weekMap[startDate.getYear()+"-"+startDate.getMonth()]) {
                        weekMap[startDate.getYear()+"-"+startDate.getMonth()].push(item);
                        continue;
                    }

                    weekMap[startDate.getYear()+"-"+startDate.getMonth()] = [item];
                }
                this.weekMap = weekMap;
            },

            // 获取周一凌晨时间戳
            getMondayStr(timeStr) {
                let endWeekVal = new Date(timeStr).getDay();
                if (endWeekVal >= 1) {
                    return new Date(timeStr).setHours(0,0,0,0)
                        - (endWeekVal - 1)*24*60*60*1000;
                }

                return new Date(timeStr).setHours(23,59,59,59)+1000
            },

            // 处理周显示
            dealWeekNumShow(index) {
                let map = new Map()
                    .set(1, "第一周")
                    .set(2, "第二周")
                    .set(3, "第三周")
                    .set(4, "第四周")
                    .set(5, "第五周");
                return map.get(index);
            },
            // 处理月
            dealWeekMonth(month) {
                return parseInt(month.split("-")[1]) + "月";
            },

            // 选择
            chooseWeek(item, index) {
                this.weekStartTime = item.weekStartTime;
                item.type = "chooseWeek";
                item.weekEndTimeStr= item.weekEndTimeStr- 24*60*60*1000
                new Notification().postNotification(Notify.StatisticsTimeChange.Name, item);
                uni.navigateBack({delta: 1});
            }
        }
    }
</script>

<style>
    page,.scroll_view{
        width: 100%;
        background: #ffffff;
        height: 100%;
    }
    .top_view{
        height: 34upx;
        width: 100%;
    }
    .week_item{
        background: #ffffff;
        margin-bottom: 34upx;
    }
    .week_title{
        width: 100%;
        height: 90upx;
        line-height: 90upx;
        text-align: center;
        align-items: center;
    }
    .week_title_line{
        width: 115upx;
        height: 2upx;
        background-color: #191f25;
        opacity: 0.2;
        margin: auto 0;
    }
    .week_title_text{
        font-weight: bold;
        width: 120upx;
        text-align: center;
        font-family: PingFang-SC-Bold;
        font-size: 34upx;
        font-stretch: normal;
        color: #191f25;
    }
    .week_content{
        flex-wrap: wrap;
        padding-left: 30upx;
    }
    .week_content_item{
        height: 150upx;
        width: 150upx;
        flex-shrink: 0;
        margin-right: 30upx;
    }
    .week_content_item:nth-child(4n){
        margin-right: 0;
    }
    .week_content_val{
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        line-height: 30upx;;
        font-weight: normal;
        font-stretch: normal;
        color: #191f25;
        margin-bottom: 20upx;
        text-align: center;
    }
    .week_content_time{
        text-align: center;
        font-family: PingFang-SC-Medium;
        font-size: 24upx;
        line-height: 24upx;;
        font-weight: normal;
        font-stretch: normal;
        color: #7d8184;
    }
    .week_content_item_active{
        background-color: rgba(0,132,255,0.08);
        border-radius: 5px;
        box-sizing: border-box;
    }
</style>
