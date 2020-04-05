

import { AgentHouseTipsModel } from "../model/im/AgentHouseTipsModel.js";
import { SendAutomaticMessage, SendWeiDianMessage,
	ReplyChart } from "../net/ImChartNet";
import { UserInfoModel } from "../model/UserInfoModel.js";
import {ImChart} from "./ImChart";

// 更新撩客的tips显示信息 key: archiveId, value: {alreadyShowTip: boolean}
// alreadyShowTip => 是否出发显示过进入房源的tips规则
// collectTimeStr => 收藏时间
// alreadyShowCollectTips => 是否显示过收藏的tips规则
// archiveId => 经纪人id
// tips => tips的文案
export class UpAgentHouseTips {
    static tipsMap = new AgentHouseTipsModel().getModel() || {};

    static setData(archiveId, data) {
        data.archiveId = archiveId;
        this.tipsMap[archiveId] = data;
		new AgentHouseTipsModel().setModel(this.tipsMap);
    }

    static getData(archiveId) {
        return this.tipsMap[archiveId] || {};
    }
}


// 处理房源详情撩客信息
export class DealLiaoKeDetail {
    archiveId = "";  // 经纪人id
    collectTime = 10;  // 收藏时间
    haveChart = false;  // 是否有聊天
    enterHouseTimeTimeOutVal = null;  // 进入房间的延时器
    autoHideTipTimeOutVal = null;  // 自动隐藏进入房源的撩客tip
    collectHouseTimeOutVal = null;  // 收藏房源的延时器

    // 房源参数信息
    cityId = "";
    caseId = "";
    caseType = "";

    constructor(archiveId, collectTime = 10, cityId = "", caseId = "", caseType = "") {
        this.archiveId = archiveId;
        this.collectTime = collectTime;
        this.cityId = cityId;
        this.caseId = caseId;
        this.caseType = caseType;
    }

    getUserId() {
		let me = new UserInfoModel().getModel("me") || "";
		return (me.userId || "");
	}
	
	// 通知net主动发送进入房源撩客信息 private
    sendEnterHouseNet(fromSource = 1, callback = function () {}) {
        // 请求接口
        let userId = this.getUserId();
        if (!userId) return;

        let keys = ["cityId", "caseId", "caseType"];
        for (let key of keys) {
            if (!this[key]) return;
        }
		
		new SendAutomaticMessage({
			cityId: this.cityId,
			caseId: this.caseId,
			caseType: this.caseType,
			fromSource: fromSource, // 来源 1 客户浏览经纪人房源 2 客户收藏经纪人房源
			youyouUserId: userId,
			chatFlag: 0  //是否聊天 0否 1是
		}).send();
    }

    // 判断是否和某个经纪人有聊天  return boolean
    checkHaveChart() {
        let that = this;
        return new Promise((resolve, reject) => {
            let userId = that.getUserId();
			let accid = new UserInfoModel().getModel("accid") || "";
            if (!userId || !that.archiveId || !accid) {
                that.haveChart = true;
                resolve(true);
                return;
            }

            ImChart.getHistoryOriginal(that.archiveId, new Date().getTime() + 2000, 10)
                .then(res => {
                    if (!res.msgs || res.msgs.length === 0) {
                        that.haveChart = false;
                        resolve(false);
                        return;
                    }
    
                    that.haveChart = true;
                    resolve(true);
                })
                .catch(() => {
                    that.haveChart = true;
                    resolve(true);
                });
        });
    }


    // 进入房源时请求（房源信息请求完毕时调用）
    // timeOutVal: 多久后请求 sendEnterHouseNet
    // bubbleTime 气泡自动关闭时间  秒
    // callback boolean  返回知否显示进入的撩客tips
    enterHouse(timeOutVal = 60, bubbleTime = 300, callback = function () {}) {
        this.leaveHouse();
        if (UpAgentHouseTips.getData(this.archiveId).alreadyShowTip) {
            callback(false);
            return;
        }

        this.checkHaveChart()
            .then(val => {
                if (val) {
                    callback(false);
                    return;
                }

                this.enterHouseTimeTimeOutVal = setTimeout(() => {
                    if (!this.enterHouseTimeTimeOutVal) return;

                    if (this.haveChart) {
                        clearTimeout(this.enterHouseTimeTimeOutVal);
                        this.enterHouseTimeTimeOutVal = null;
                        callback(false);
                        return;
                    }

                    this.checkHaveChart()
                        .then(val => {
                            if (val) {
                                callback(false);
                                return;
                            }

                            this.haveChart = true;
                            this.sendEnterHouseNet(1);
                            callback(true);

                            let UpAgentHouseTipsMap = UpAgentHouseTips.getData(this.archiveId);
                            UpAgentHouseTipsMap.alreadyShowTip = true;
                            UpAgentHouseTips.setData(this.archiveId, UpAgentHouseTipsMap);
                            this.checkHideEnterTip(bubbleTime, function (val) {
                                callback(val);
                            });
                        });
                }, timeOutVal * 1000);
            })
            .catch(err => {
                callback(false);
            });
    }

    // 离开房源清除定时器
    leaveHouse() {
        clearTimeout(this.enterHouseTimeTimeOutVal);
        this.enterHouseTimeTimeOutVal = null;

        clearTimeout(this.autoHideTipTimeOutVal);
        this.autoHideTipTimeOutVal = null;

        clearTimeout(this.collectHouseTimeOutVal);
        this.collectHouseTimeOutVal =  null;
    }

    // 判断是否隐藏撩客tip  return boolean
    // bubbleTime 气泡自动关闭时间  秒
    checkHideEnterTip(bubbleTime  = 300, callback = function () {}) {
        this.autoHideTipTimeOutVal = setTimeout(() => {
            if (!this.autoHideTipTimeOutVal) return;

            callback(false);
        }, bubbleTime * 1000);
    }


    // 收藏（由未收藏变为收藏状态）
    // collectTime 单位 秒
    // callback return boolean 返回知否显示收藏的撩客tips
    collectHouse(callback = function () {}) {
        if (this.haveChart) {
            callback(false);
            return;
        }

        this.checkHaveChart()
            .then(val => {
                if (val) {
                    callback(false);
                    return;
                }

                // 此处请求接口
                this.sendEnterHouseNet(2);
                this.haveChart = true;
                let UpAgentHouseTipsMap = UpAgentHouseTips.getData(this.archiveId);
                UpAgentHouseTipsMap.collectTimeStr = new Date().getTime();
                UpAgentHouseTipsMap.alreadyShowCollectTips = false;
                UpAgentHouseTips.setData(this.archiveId, UpAgentHouseTipsMap);
                this.collectHouseTimeOutVal = setTimeout(() => {
                    if (!this.collectHouseTimeOutVal) return;

                    // UpAgentHouseTipsMap.alreadyShowCollectTips = true;
                    // UpAgentHouseTips.setData(this.archiveId, UpAgentHouseTipsMap);
                    callback(true);
                }, this.collectTime * 1000);
            });
    }

    // 刚进入房源，判断是否显示收藏的tip
    checkShowCollectTips(callback = function () {}) {
        let UpAgentHouseTipsMap = UpAgentHouseTips.getData(this.archiveId);
        if (!UpAgentHouseTipsMap.tips) {
            callback(false);
            return;
        }

        if (UpAgentHouseTipsMap.alreadyShowCollectTips !== undefined
            && UpAgentHouseTipsMap.alreadyShowCollectTips === false) {
            UpAgentHouseTipsMap.alreadyShowCollectTips = true;
            UpAgentHouseTips.setData(this.archiveId, UpAgentHouseTipsMap);
            callback(true, UpAgentHouseTipsMap.tips);
            return;
        }

        callback(false);
    }
}


// 处理微店撩客信息
export class DealWeiDianLiaoKeDetail {
    haveChart = false;  // 是否有聊天
    archiveId = "";  // 经纪人id
    regionId = "";

    constructor(archiveId = "") {
        this.archiveId = archiveId;
    }
	
	getUserId() {
		let me = new UserInfoModel().getModel("me") || "";
		return (me.userId || "");
	}

    // 判断是否和某个经纪人有聊天  return boolean
    checkHaveChart() {
        let that = this;
        return new Promise((resolve, reject) => {
            let userId = that.getUserId();
        	let accid = new UserInfoModel().getModel("accid") || "";
            if (!userId || !that.archiveId || !accid) {
                that.haveChart = true;
                resolve(true);
                return;
            }
    
            ImChart.getHistoryOriginal(that.archiveId, new Date().getTime() + 2000, 10)
                .then(res => {
                    if (!res.msgs || res.msgs.length === 0) {
                        that.haveChart = false;
                        resolve(false);
                        return;
                    }
            
                    that.haveChart = true;
                    resolve(true);
                })
                .catch(() => {
                    that.haveChart = true;
                    resolve(true);
                });
        });
    }

    // 选择区域
    chooseRegion(regionId, callback = function () {}) {
        if (this.haveChart) {
            callback(false);
            return;
        }

        this.checkHaveChart()
            .then(val => {
                if (val) {
                    callback(false);
                    return;
                }

                this.haveChart = true;
                this.sendChooseRegionNet(regionId, val => {
                    callback(val);
                })
            })
    }

    // 通知net主动发送进入房源撩客信息 private
    sendChooseRegionNet(regionId, callback = function () {}) {
        // 请求接口
        let userId = this.getUserId();
        if (!userId || !regionId) return;

		new SendWeiDianMessage({
			archiveId: this.archiveId,
			regionId: regionId,
			youyouUserId: userId,
			chatFlag: 0  //是否聊天 0否 1是
		}).send().then(res => {
			callback(true);
		});
    }
}


// im发送消息判断是否需要需要调用发送短信的接口
export class ImNeedSendShortMessage {
    haveLiaoKeMessage = false;  // 是否有撩客消息
    alreadyReply = false;  // 是否已经回复了撩客消息
    list = [];  // 历史纪录消息
    archiveId = ""; // 经纪人id
    isRequestIng = false;  // 是否在请求中

    constructor(archiveId, list = []) {
        this.archiveId = archiveId;
        this.list = list.data ? list.data || [] : [];
        this.initMsgStatus();
    }

	getUserId() {
		let me = new UserInfoModel().getModel("me") || "";
		return (me.userId || "");
	}

    // 初始化是否有撩客消息和是否已经回复消息
    initMsgStatus() {
        this.haveLiaoKeMessage = false;
        this.alreadyReply = false;
        let userId = this.getUserId();
		let accid = new UserInfoModel().getModel("accid") || "";
        for (let item of this.list) {
            if (item.type == 100 && item.body && item.body.type
                && (item.body.type == 123 || item.body.type == 130)) {
                this.haveLiaoKeMessage = true;
            }
            if (item.from == accid) {
                this.alreadyReply = true;
            }
        }
    }

    // 更新是否已经回复了撩客消息
    upAlreadyReply(val) {
        this.alreadyReply = val;
    }

    // 会触发是否需要调用启动发送短信的延时器接口
    init() {
		let that = this;
        return new Promise((resolve, reject) => {
            if (!that.haveLiaoKeMessage || that.alreadyReply || that.isRequestIng) {
                resolve(false);
                return;
            }

            that.sendShortMsgNet(function (val) {
                resolve(val);
            });
        });
    }

    sendShortMsgNet(callback = function () {}) {
        let userId = this.getUserId();
        if (!this.archiveId || !userId) return;

        this.isRequestIng = true;
		new ReplyChart({
			archiveId: this.archiveId,
			fromChart: 0, // 来自那一端的回复 0：优优回复经纪人 1：经纪人回复优优用户"
			youyouUserId: userId,
		}).send().then(res => {
			setTimeout(() => {
			    this.isRequestIng = false;
			}, 2000);
			callback(true);
		});
    }
}
