

import { UserInfoModel } from "../model/UserInfoModel";

export class ImEvaluateDeal {
    chartList = [];  // 聊天详情列表
    minChartLength  = 10;  // 最少聊天条数
    evaluateMsgType = 140;  // 评价消息type
    threeMinuteTimeLength = 3 * 60 * 1000;  // 3分钟
    sevenDayTimeLength = 7 * 24 * 60 * 60 * 1000;  // 7天
    evaluateMsgItem = null; // 最新的一个评价

    constructor(chartList = []) {
        this.chartList = chartList;
        this.dealChartList();
    }

    // 获取accid
    getAccid() {
        return (new UserInfoModel().getModel("accid") || "");
    }

    // 获取当前时间
    getNowTimeStr() {
        return new Date().getTime();
    }

    // 返回最新一条评价后的所有记录
    dealChartList() {
        let evaluateMsgItem = null;
        let otherChartList = [];
        for (let i = this.chartList.length - 1;i>=0;i--) {
            let item = this.chartList[i];
            if (item.type === "evaluate") {
                evaluateMsgItem = item;
                break;
            }

            otherChartList.push(item);
        }
        this.evaluateMsgItem = evaluateMsgItem;
        this.chartList = otherChartList;
    }

    // return Boolean 点击时触发
    checkIsCanEvaluate(callback = function () {}) {
        if (this.chartList.length <= this.minChartLength) {
            callback(false);
            return;
        }

        let haveMySend = false;  // 是否有自己发送的
        let haveOtherSend = false;  // 是否有其他人发送的
        let lastMsgSendTimeStr = this.chartList[this.chartList.length - 1].timeStr
            ? this.chartList[this.chartList.length - 1].timeStr : 0;
        for (let item of this.chartList) {
            // 判断是否有相互的
            if (item.mySend) {
                haveMySend = true;
            }else {
                haveOtherSend = true;
            }
        }
        // 没有互相发送消息则不可以评价
        if (!haveMySend || !haveOtherSend) {
            callback(false);
            return;
        }

        // 最后一条消息时间距离现在有3分钟
        if ((this.getNowTimeStr() - lastMsgSendTimeStr) < this.threeMinuteTimeLength) {
            callback(false);
            return;
        }

        // 没有评价消息可以评价
        if (!this.evaluateMsgItem) {
            callback(true);
            return;
        }

        // 最新的评价距离现在是否7天之内则不能发送
        if (this.getNowTimeStr() - this.evaluateMsgItem.timeStr <= this.sevenDayTimeLength) {
            callback(false);
            return;
        }

        callback(true);
    }

    // 刚进入时判断是否显示评价按钮
    showEvaluateBtn(callback = function () {}) {
        if (this.chartList.length <= this.minChartLength) {
            callback(true);
            return;
        }

        let haveMySend = false;  // 是否有自己发送的
        let haveOtherSend = false;  // 是否有其他人发送的
        let lastMsgSendTimeStr = this.chartList[this.chartList.length - 1].timeStr
            ? this.chartList[this.chartList.length - 1].timeStr : 0;
        for (let item of this.chartList) {
            // 判断是否有相互的
            if (item.mySend) {
                haveMySend = true;
            }else {
                haveOtherSend = true;
            }
        }
        // 没有互相发送消息则不可以评价
        if (!haveMySend || !haveOtherSend) {
            callback(true);
            return;
        }

        // 最后一条消息时间距离现在有3分钟
        if ((this.getNowTimeStr() - lastMsgSendTimeStr) < this.threeMinuteTimeLength) {
            callback(true);
            return;
        }

        // 没有评价消息可以评价
        if (!this.evaluateMsgItem) {
            callback(true);
            return;
        }

        // 最新的评价距离现在是否7天之内则不能发送
        if (this.getNowTimeStr() - this.evaluateMsgItem.timeStr <= this.sevenDayTimeLength) {
            callback(false);
            return;
        }

        callback(true);
    }

    // 刚进入时判断是否自动显示评价
    autoEvaluateTc(callback = function () {}) {
        if (this.chartList.length <= this.minChartLength) {
            callback(false);
            return;
        }

        let haveMySend = false;  // 是否有自己发送的
        let haveOtherSend = false;  // 是否有其他人发送的
        let lastMsgSendTimeStr = this.chartList[this.chartList.length - 1].timeStr
            ? this.chartList[this.chartList.length - 1].timeStr : 0;
        for (let item of this.chartList) {
            // 判断是否有相互的
            if (item.mySend) {
                haveMySend = true;
            }else {
                haveOtherSend = true;
            }
        }
        // 没有互相发送消息则不可以评价
        if (!haveMySend || !haveOtherSend) {
            callback(false);
            return;
        }

        // 最后一条消息时间距离现在有3分钟
        if ((this.getNowTimeStr() - lastMsgSendTimeStr) < this.threeMinuteTimeLength) {
            callback(false);
            return;
        }

        // 没有评价消息可以评价
        if (!this.evaluateMsgItem) {
            callback(true);
            return;
        }

        // 最新的评价距离现在是否7天之内则不能发送
        if (this.getNowTimeStr() - this.evaluateMsgItem.timeStr <= this.sevenDayTimeLength) {
            callback(false);
            return;
        }

        callback(true);
    }
}
