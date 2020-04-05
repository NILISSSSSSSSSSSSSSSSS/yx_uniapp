

<template>
    <scroll-view :scroll-into-view="scrollIntoId" class="scroll_view" scroll-y enable-back-to-top>
        <view class="top_view"></view>
        <block v-for="(val) in list" :key="val">
            <view class="week_item">
                <view class="week_title f_r_c">
                    <view class="week_title_line"></view>
                    <view class="week_title_text">{{ val + "年" }}</view>
                    <view class="week_title_line"></view>
                </view>

                <view class="week_content f_r_s">
                    <block v-for="(item, index) in monthList" :key="index">
                        <view class="f_c_c week_content_item"
                              :id="'scrollIntoId_'+((val)+'/'+(item>=10?item:'0'+item)+'/01')"
                              :class="[(val == startYear && item < startMonth)
                                || (endYear == val && item > endMonth)
                                 ? 'week_content_disabled' : '',
                                 chooseMonthStart == ((val)+'-'+(item>=10?item:'0'+item)+'-01')
                                 ?'week_content_active':'']"
                              @click="chooseBtn(val, item, index)">{{item}}月
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
        static startTimeStr = 1517712305000;  // 2018-02-04 10:45:05  周日
        static endTimeStr = new Date().getTime();  // 2019/11/8 19:43:25  周五
    }

    export default {
        data() {
            let monthList = [];
            for (let i = 1;i <= 12;i++) {
                monthList.push(i);
            }
            return {
                list: [],
                monthList: monthList,
                startYear: 0,
                startMonth: 0,
                endYear: 0,
                endMonth: 0,
                chooseMonthStart: "",  // 选中月的开始时间 例如： 2019-02-01
                scrollIntoId: ""
            }
        },

        onLoad(params) {
            if (params.chooseMonthStart) {
                this.chooseMonthStart = params.chooseMonthStart.replace(/-/g, "/");
            }
            PrivateData.startTimeStr= Number(params.initTime);
            this.initData();
        },

        methods: {
            initData() {
                let startDate = new formatDate(new Date(PrivateData.startTimeStr));
                let startYear = parseInt(startDate.getYear());
                let endDate = new formatDate(new Date(PrivateData.endTimeStr));
                let endYear = parseInt(endDate.getYear());
                let list = [];
                for (let i = 0;i <= (endYear - startYear);i++) {
                    list.push(startYear + i);
                    if (this.chooseMonthStart.indexOf((startYear + i).toString()) >= 0) {
                        this.scrollIntoId = "scrollIntoId_" + this.chooseMonthStart;
                    }
                }
                this.startYear = startYear;
                this.endYear = endYear;
                this.startMonth = parseInt(startDate.getMonth());
                this.endMonth = parseInt(endDate.getMonth());
                this.list = list;
            },

            // 选择
            chooseBtn(year, month, index) {
                if ((year == this.startYear && month < this.startMonth)
                    || (this.endYear == year && month > this.endMonth)) return;

                let dealMonth = (month >= 10 ? month : "0"+month);
                let date = new Date(year, parseInt(month, 10), 0);
                new Notification().postNotification(Notify.StatisticsTimeChange.Name, {
                    type: "chooseYear",
                    year: year,
                    month: month,
                    monthStart: `${year}-${dealMonth}-01`,
                    monthEnd: `${year}-${dealMonth}-${date.getDate()}`,
                    date: `${year}-${dealMonth}-01 - ${year}-${dealMonth}-${date.getDate()}`,
                });
                this.chooseMonthStart = `${year}-${dealMonth}-01`;
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
        padding-left: 32upx;
        box-sizing: border-box;
    }
    .week_content_item{
        height: 90upx;
        width: 170upx;
        line-height: 90upx;
        flex-shrink: 0;
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        font-weight: normal;
        font-stretch: normal;
        color: #191f25;
        text-align: center;
    }
    .week_content .week_content_disabled{
        color: #191f25;
        opacity: 0.4;
    }
    .week_content .week_content_active{
        position: relative;
    }
    .week_content .week_content_active::after{
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 92upx;
        height: 60upx;
        background-color: rgba(0,132,255,0.08);
        border-radius: 5upx;
        transform: translate(-50%, -50%);
    }
</style>
