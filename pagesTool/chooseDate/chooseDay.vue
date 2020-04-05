

<template>
    <view class="cont">
        <view class="top_fixed">
            <view class="f_r_b top_date_cont">
                <view class="top_date_item">
                    <view class="top_date_title">起始日期</view>
                    <view class="top_date_month">{{ chooseDayShowInfo.start.month }}</view>
                    <view class="top_date_week">{{ chooseDayShowInfo.start.week }}</view>
                </view>

                <view class="top_date_line"></view>

                <view class="top_date_item">
                    <view class="top_date_title">截止日期</view>
                    <view class="top_date_month">{{ chooseDayShowInfo.end.month }}</view>
                    <view class="top_date_week">{{ chooseDayShowInfo.end.week }}</view>
                </view>
            </view>

            <view class="f_r_s top_week_cont">
                <block v-for="(week, index) in weekList" :key="index">
                    <view class="f_c_c top_week_content_item">{{ week }}</view>
                </block>
            </view>
        </view>
        <view class="top_view"></view>

        <scroll-view :scroll-into-view="scrollIntoId" class="scroll_view" scroll-y enable-back-to-top>
           <view class="scroll_cont">
               <block v-for="(monthList, key) in listMap" :key="key">
                   <view class="week_item">
                       <view class="week_title f_r_c">
                           <view class="week_title_text">{{ dealYearMonth(key) + "月" }}</view>
                       </view>

                       <view class="week_content f_r_s">
                           <view class="f_r_s week_content_info">
                               <block v-for="(item, index) in monthList" :key="index">
                                   <view class="f_c_c week_content_item"
                                         :id = "'scrollIntoId_'+key+'-'+(item.day < 10 ? '0'+item.day: item.day)"
                                         :class="[item.disabled?'week_content_disabled':'', (item.className || '')]"
                                         @click="chooseBtn(key, item, true)">{{ item.day }}
                                   </view>
                               </block>
                           </view>

                           <view class="month_bg">{{dealMonth(key)}}</view>
                       </view>
                   </view>
               </block>

               <view class="bottom_view"></view>
           </view>
        </scroll-view>

        <view class="bottom_fixed">
            <button class='button' @click="comfirm(true)">确定</button>
        </view>
    </view>
</template>

<script>
    import {formatDate} from "../../utils/common";
    import {Notify} from "../../utils/Notify";
    import {Notification} from "../../utils/Notification";

    class PrivateData {
        static startTimeStr = new Date().getTime();  // 2018-02-04 10:45:05  周日
        static endTimeStr = new Date().getTime();  // 2019/11/8 19:43:25  周五
        static dayStartTime = 0;
        static dayEndTime = 0;
        static source = "";
    }

    export default {
        data() {
            return {
                weekList: ["日", "一", "二", "三", "四", "五", "六"],
                list: [],
                listMap: {},
                chooseDays: [],  // 选中天的两个凌晨时间戳
                scrollIntoId: "",
                chooseDayShowInfo: {
                    start: {
                        month: "",
                        week: ""
                    },
                    end: {
                        month: "",
                        week: ""
                    }
                },
            }
        },

        onLoad(params) {
            if (params.dayStartTime) {
                PrivateData.dayStartTime = params.dayStartTime.replace(/-/g, "/");
            }
            if (params.dayEndTime) {
                PrivateData.dayEndTime = params.dayEndTime.replace(/-/g, "/");
            }
            PrivateData.startTimeStr = Number(params.initTime);
            PrivateData.source = params.source || "";
            let chooseDays = [];
            if (PrivateData.dayStartTime) {
                let startTime = new Date(PrivateData.dayStartTime).setHours(0,0,0,0);
                let startDate = new formatDate(new Date(startTime));
                let startYearMonth = `${startDate.getYear()}-${startDate.getMonth()}`;
                let startDay = parseInt(startDate.getDay());
                chooseDays.push(startTime);
                this.chooseBtn(startYearMonth, {
                    day: startDay,
                    disabled: false,
                    className: this.dealActive(startYearMonth, startDay)
                });
            }
            if (PrivateData.dayEndTime) {
                let endTime = new Date(PrivateData.dayEndTime).setHours(0,0,0,0);
                let endDate = new formatDate(new Date(endTime));
                let endYearMonth = `${endDate.getYear()}-${endDate.getMonth()}`;
                let endDay = parseInt(endDate.getDay());
                chooseDays.push(endTime);
                this.chooseBtn(endYearMonth, {
                    day: endDay,
                    disabled: false,
                    className: this.dealActive(endYearMonth, endDay)
                });
            }
            if (PrivateData.dayStartTime || PrivateData.dayEndTime) {
                this.chooseDays = chooseDays;
            }
            this.initData();
        },

        methods: {
            initData() {
                let startDate = new formatDate(new Date(PrivateData.startTimeStr));
                let startYear = parseInt(startDate.getYear());
                let endDate = new formatDate(new Date(PrivateData.endTimeStr));
                let endYear = parseInt(endDate.getYear());
                let listMap = {};
                let startMonth = parseInt(startDate.getMonth());
                let endMonth = parseInt(endDate.getMonth());
                for (let i = 0;i <= (endYear - startYear);i++) {
                    for (let j = 1;j <= 12;j++) {
                        if (startYear === (startYear + i) && startMonth > j) continue;

                        if (endYear === (startYear + i) && endMonth < j) continue;

                        let yearMonth = startYear + i + "-" + (j >= 10 ? j : "0" + j);
                        listMap[yearMonth] = [];
                        let oneDate = yearMonth + "-01";
                        oneDate = oneDate.replace(/-/g, "/");
                        for (let k = 1;k <= this.getDayNum(startYear + i, j);k++) {
                            let date = yearMonth + "-" + (k < 10 ? "0" + k : k);
                            date = date.replace(/-/g, "/");
                            let disabled = false;
                            if (new Date(date).setHours(0,0,0,0) <
                                new Date(PrivateData.startTimeStr).setHours(0,0,0,0)
                                || new Date(date).setHours(0,0,0,0) >
                                new Date(PrivateData.endTimeStr).setHours(0,0,0,0) )  {
                                disabled = true;
                            }
                            let className = this.dealActive(yearMonth, k);
                            if(className === "week_content_active" && !this.scrollIntoId) {
                                this.scrollIntoId = `scrollIntoId_${yearMonth + "-" + (k < 10 ? "0" + k : k)}`
                            }
                            listMap[yearMonth].push({
                                day: k,
                                disabled: disabled,
                                className: className
                            });
                        }
                        for (let m = 0;m < new Date(oneDate).getDay();m++) {
                            listMap[yearMonth].unshift({
                                day: "",
                                disabled: true,
                                className: ""
                            });
                        }
                    }
                }
                this.listMap = listMap;
            },

            // 获取某个月天数
            getDayNum(year, month) {
                return (new Date(year, parseInt(month, 10), 0)).getDate();
            },

            // 处理月份
            dealMonth(yearMonth) {
                return `${parseInt(yearMonth.split("-")[1])}`;
            },

            // 处理年月份
            dealYearMonth(yearMonth) {
                return `${parseInt(yearMonth.split("-")[0])}年${parseInt(yearMonth.split("-")[1])}`;
            },

            // 选择
            chooseBtn(yearMonth, item) {
                if (item.disabled) return;

                let date = yearMonth+"-"+(item.day > 10 ? item.day : "0" + item.day);
                date = date.replace(/-/g, "/");
                let clickDayTimeStr = new Date(date).setHours(0,0,0,0);
                if (this.chooseDays.length === 2) {
                    this.chooseDays = [clickDayTimeStr];
                    this.initData();
                    this.chooseDayShowInfo.start = this.dealChooseMonthAndWeek(0);
                    this.chooseDayShowInfo.end = this.dealChooseMonthAndWeek(1);
                    return;
                }

                this.chooseDays.push(clickDayTimeStr);
                this.initData();
                this.chooseDayShowInfo.start = this.dealChooseMonthAndWeek(0);
                this.chooseDayShowInfo.end = this.dealChooseMonthAndWeek(1);
            },

            //
            comfirm (puShNc = false) {
                if (this.chooseDays.length === 2) {
                    this.chooseDayShowInfo.end = this.dealChooseMonthAndWeek(1);
                    if(puShNc) {
                        this.success();
                    }
                }
            },

            success() {
                let chooseDays =this.chooseDays;
                chooseDays = chooseDays.sort(this.sortNumber);
                let startDate = new formatDate(new Date(chooseDays[0]));
                let endDate = new formatDate(new Date(chooseDays[1]));
                new Notification().postNotification(Notify.StatisticsTimeChange.Name, {
                    source: PrivateData.source,
                    type: "chooseDay",
                    dayStartTime: `${startDate.getYear()}-${startDate.getMonth()}-${startDate.getDay()}`,
                    dayEndTime: `${endDate.getYear()}-${endDate.getMonth()}-${endDate.getDay()}`,
                });
                uni.navigateBack({delta: 1});
            },

            // 处理那些是选中的
            dealActive(yearMonth, day) {
                let date = yearMonth+"-"+(day > 10 ? day : "0" + day);
                date = date.replace(/-/g, "/");
                let clickDayTimeStr = new Date(date).setHours(0,0,0,0);
                let chooseDays = this.chooseDays;
                if (chooseDays.length === 0) return "";

                if (chooseDays.includes(clickDayTimeStr)) {
                    return "week_content_active";
                }

                if (chooseDays.length === 2) {
                    chooseDays = chooseDays.sort(this.sortNumber);
                    if (chooseDays[0] < clickDayTimeStr && clickDayTimeStr < chooseDays[1]) {
                        return "week_content_active_other";
                    }
                }

                if([0, 6].includes(new Date(date).getDay())) {
                    return "week_content_active_red"
                }

                return "";
            },

            sortNumber(a, b) {
                return a - b;
            },

            // 处理选中月份和星期
            dealChooseMonthAndWeek(index = 0) {
                let chooseDays = this.chooseDays;
                if (chooseDays.length === 0 || !chooseDays[index]) return {
                    month: "",
                    week: ""
                };

                chooseDays = chooseDays.sort(this.sortNumber);
                let dateStart = new formatDate(new Date(chooseDays[index]));
                return {
                    month: `${dateStart.getMonth()}月${dateStart.getDay()}日`,
                    week: "星期" + this.weekList[new Date(chooseDays[index]).getDay()]
                }
            },
        }
    }
</script>

<style lang="less">
    page,.cont{
        width: 100%;
        background: #ffffff;
        height: 100%;
    }
    .top_view{
        height: 282upx;
        width: 100%;
    }
    .scroll_view{
        height: calc(100% - 282upx);
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
        margin-bottom: 30upx;
        box-sizing: border-box;
        padding: 0 40upx;
    }
    .week_title_text{
        font-weight: bold;
        text-align: center;
        font-family: PingFang-SC-Bold;
        font-size: 34upx;
        font-stretch: normal;
        color: #191f25;
        border-bottom: 1upx solid #f5f5f5;
        width: 100%;
    }
    .week_content{
        flex-wrap: wrap;
        padding-left: 24upx;
        box-sizing: border-box;
        position: relative;
    }
    .week_content_info{
        position: relative;
        flex-wrap: wrap;
        background-color: transparent;
    }
    .month_bg{
        font-size: 250upx;
        text-align: center;
        left: 50%;
        top: 50%;
        color: #f7f7f7;
        transform: translate(-50%, -50%);
        margin-top: -31%;
        line-height: 1;
    }
    .week_content_item{
        z-index: 9;
        position: relative;
        height: 54upx;
        width: 13.5%;
        line-height: 54upx;
        flex-shrink: 0;
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        font-weight: normal;
        font-stretch: normal;
        color: #191f25;
        text-align: center;
        margin-bottom: 30upx;
    }
    .week_content .week_content_disabled{
        color: #191f25;
        opacity: 0.4;
    }
    .week_content .week_content_active{
        background: #0084ff;
        color: #ffffff;
        border-radius: 5upx;
    }
    .week_content .week_content_active_other{
        background: rgba(0,132,255,0.08);
        color: #191f25;
    }
    .week_content .week_content_active_red{
        color: #f09a37;
    }

    .top_fixed{
        position: fixed;
        left: 0;
        width: 100%;
        top: 0;
        background: #ffffff;
        z-index: 99;
    }
    .top_date_cont{
        background-color: #ffffff;
        box-shadow: 0 4upx 8upx 0
        rgba(0, 0, 0, 0.05);
        align-items: center;
        padding:  0 60upx 40upx;
        z-index: 99;
    }
    .top_date_item{
        padding-top: 27upx;
        width: 184upx;
    }
    .top_date_line{
        width: 58upx;
        height: 78upx;
        margin: auto;
        flex-shrink: 0;
        position: relative;
    }
    .top_date_line::after{
        position: absolute;
        content: "";
        width: 1upx;
        background: #ebebeb;
        top: 0;
        right: 29upx;
        height: 85upx;
        transform: rotate(45deg);
    }
    .top_date_title{
        font-family: PingFang-SC-Medium;
        font-size: 24upx;
        line-height: 24upx;
        height: 24upx;
        font-weight: normal;
        font-stretch: normal;
        color: #c0c1c3;
    }
    .top_date_month{
        font-family: PingFang-SC-Bold;
        font-size: 40upx;
        line-height: 40upx;
        height: 40upx;
        font-weight: bold;
        color: #191f25;
        margin: 20upx auto 20upx 0;
    }
    .top_date_week{
        font-family: PingFang-SC-Medium;
        font-size: 24upx;
        line-height: 24upx;
        height: 24upx;
        font-weight: normal;
        font-stretch: normal;
        color: #191f25;
    }
    .top_week_cont{
        margin-top: 5upx;
        flex-wrap: wrap;
        padding-left: 24upx;
        box-sizing: border-box;
        height: 54upx;
        background-color: #fafafa;
    }
    .top_week_content_item{
        height: 54upx;
        width: 13.5%;
        line-height: 54upx;
        flex-shrink: 0;
        font-family: PingFang-SC-Medium;
        font-weight: normal;
        font-stretch: normal;
        text-align: center;
        font-size: 24upx;
        color: #7d8184;
    }
    .bottom_view {
        width: 100%; height: 180upx;
    }
    .bottom_fixed {
        position: fixed;
        left: 0upx;
        bottom: 0upx;
        background-color: #fff;
        width: 100%;
        padding: 40upx;
        z-index: 99;
        box-sizing: border-box;
        button{
            margin: 0 auto;
            width: 100%;
            height: 100upx;
            background-color: #0084ff;
            box-shadow: 0 7upx 15upx 1upx rgba(0, 0, 0, 0.05);
            border-radius: 10upx;
            color: #ffffff;
            font-family: PingFang-SC-Bold;
            font-size: 32upx;
            font-weight: bold;
            text-align: center;
            line-height: 100upx;
        }
    }
</style>
