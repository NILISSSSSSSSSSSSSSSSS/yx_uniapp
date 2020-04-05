

import md5 from "./md5";
import { UserInfoModel } from "../model/UserInfoModel.js";
import { GpsInfoModel } from "../model/GpsInfoModel.js";
// #ifdef H5
import imSdk from "../static/h5/NIM_Web_SDK_v6.1.2.js";
// #endif

// #ifdef APP-PLUS
import imSdk from "../static/app-plus/NIM_Web_NIM_weixin_v6.8.0.js";
import Netcall from "../static/app-plus/NIM_Web_Netcall_weixin_v6.9.0.js";
// #endif

// #ifdef MP
import imSdk from "../static/mp-weixin/NIM_Web_NIM_v5.0.0.js";
// #endif
import { Config } from "../config/config.js";
import { GetChartList } from "../net/ImChartNet";
import { Notify } from "../utils/Notify.js";
import { Notification } from "../utils/Notification.js";
import { formatTimeNew, formatDate } from "../utils/common.js";
import { UnReadMsgModel } from "../model/im/UnReadMsgModel.js";

import { ErHouseListItem, Const } from "../utils/Const.js";
import { LastMsgTime } from "../model/im/LastMsgTime.js";
import { PositionChartModel } from "../model/im/PositionChartModel.js";
import { UnReadMsgTimeModel } from "../model/im/UnReadMsgTimeModel.js";
import { DealLastMsg } from "../utils/MsgPush.js";
import { UpAgentHouseTips } from "../utils/DealLiaoKeDetail.js";
import {ImEvaluateDeal} from "./ImEvaluateDeal";
import {ChatListModel, DealChartListModel} from "../model/im/ChatListModel";
import {UnReadRemindModel, UnReadVoiceModel} from "../model/im/UnReadMsgModel";

import {GetLoginModel} from "../model/LoginSuccessModel";
import {Utils} from "./Utils";
import {RequestTimeOut} from "./RequestApi";
import {ProjectConfigConst} from "./ProjectConfigConst";
import {DifferenceApi} from "./DifferenceApi";
import {compare} from "../utils/common";
import {SetNvueNativeModel} from "../model/NvueNativeModel";

// IM常量
export class ImChartConst {
	static positionType = 105;
}

// 处理最后一条消息时间
export class DealLastMsgTime {
	static setTime(time, messageId) {
		new LastMsgTime().setModel(time, messageId);
	}

	static getTime(messageId) {
		return (new LastMsgTime().getModel(messageId) ? parseInt(new LastMsgTime().getModel(messageId)) : 0);
	}

	static checkShowTime(messageId, time) {
		if(time - this.getTime(messageId) >= 2*60*1000) {
			return true;
		}

		return false;
	}
}
export class DealLastMsgTimeStatic {
	static lastTime = 0;

    static setTime(time) {
        this.lastTime = time;
    }

    static getTime() {
        return parseInt(this.lastTime);
    }

    static checkShowTime(messageId, time) {
        return !!(time - this.getTime() >= 2*60*1000)
    }
}

// 聊天列表item
export class ChartListItem {
	messageId = "";  // 消息来源id
	headImg = "";  // 头像
	name = "";  // 消息名称
	lastTime_stamp = ""; // 最后一条消息时间戳
	lastTime = "";  // 最后一条消息时间
	msg = "";  // 消息内容
	sendtime = "";  // 发送时间
	unRead = 0;  // 未读数
	isShield = 0; // 是否是屏蔽状态   1代表屏蔽，其他的代表非屏蔽状态
	isShowBtn = false;  // 是否显示右侧按钮
	type = "";  // 类型
	compName = "";  // 公司名称
	isTop = 2; // 是否指定  1 是 2 不是
}

// 聊天详情的item
export class ChartDetailItem {
	type = "";  // 类型有 img, text, voice, house
	// (备注: 如果是house房源类型的话, 则content对应房源的item, 见 Const.js 中对应的类型)
	// (备注: 如果是position位置类型的话, 则content对应PositionChartItem)
	content = "";  // 内容
	mySend = false; // 是否是自己发的消息
	time = "";  // 消息发送时间 例如：下午 2：00
	timeStr = 0;  // 时间戳
	emoji = []; // 表情
	hasEmoji = false;  // 是否有表情
	voiceLength = 1; // 语音类型的时长
	voiceMd5 = "";  // 语音类型的md5
	showTime = false;  // 是否显示时间
	isRead = true;  // 是否是已读
}

// 位置信息的item
export class PositionChartItem {
	name = "";  // 位置名
	address = "";  // 地址详细说明
	lat = "";  // 纬度, 范围为-90~90，负数表示南纬，使用 gcj02 国测局坐标系
	lng = "";   // 经度, 范围为-180~180，负数表示西经，使用 gcj02 国测局坐标系
	scale = 18;  // 缩放级别
	staticImg = "";  // 图片  需要增加这个字段 ?imageView

	getImgKey() {
		return "?imageView";
	}
	
	getImgKey2() {
		return "&imageView";
	}
}

// 聊天评价item
export class EvaluateChartItem {
	evaContent = "";  // 补充的文案
	evaTagIndex = "";  // 选中的原因id
	evaStar = 1;  // 评分
}

// 物业房源item
export class WuYeHouseChartItem {
	houseId = "";
	buildId = "";
	houseImg = "";    // 房屋图片
	houseTitle = "";  // 简短的title
	houseRoof = "";  // 栋
	houseUnit = "";  // 单元
	houseFloor = "";  // 楼
	houseNum = "";  // 号
	tipMsg = "";  // 出售tip
	houseArea = "";     // 面积带单位
	housePrice = "";  // 价格带单位
	houseName = "";   // 房源名称
	cityId = "";   // 房源所在的城市id
	caseType = "";  // 房源类型  1 代表二手房
}

// 物业登记房源文案item
export class WuYeHouseTextChartItem {
	houseTitle = "";  // 简短的title
	buildName = "";
	houseRoom = "";  // 室带单位
	houseArea = "";     // 面积带单位
	housePrice = "";  // 价格带单位
	houseUseage = "";  // 用途
	tipMsg = "";  // 出售tip
	houseFitment = "";  // 装修类型
}



// 请求im的uuAccid拼接方式 = "uu_" + accid;
export class ImChart {
	static imCloseLoginPath = "/pagesSet/login/login"; // im断开后的登录地址
	static serviceId = 618239;
	static token = "";
	static accid = "";
	static uuAccid = "";
	static imChartVal = null;  // 初始化之后的val
	static userId = "";  // 用户id
	static inChartDetail = false;  // 是否在聊天详情中
	static messageId = "";  // 当前查看的聊天详情id
	static imConnectStatus = 2;  // IM当前状态 1: 连接中 2: 断开(包括账号在其他端登录)
	static ImNeedSendShortMessage = null;  // IM发送短信的初始化类
	static willInitConfig = false;  // 是否将要初始化config
	static linkFailStatus = 1; // 连接失败回调状态 2 成功 1 失败
	static netcall = null; // 视频聊天实例
	// 更新链接状态
	static setConnectStatus(status) {
		this.imConnectStatus = status;
	}
	// 获取链接状态
	static getConnnectStatus() {
		return this.imConnectStatus;
	}

	// 更新token
	static setToken(token) {
		this.token = token;
	}

	// 更新uuAccid
	static setUuAccid(uuAccid) {
		this.uuAccid = uuAccid;
	}
	// 获取uuAccid
	static getUuAccid() {
		return this.uuAccid;
	}

	// 获取im服务器链接id
	static getServiceId() {
		return this.serviceId;
	}



	//  --------------- 初始化部分 start ---------------------
	// 初始化用户信息
	static initImUserInfo() {
		// 更新tab
		UpUnReadNumTab.setTab();

		let me = new UserInfoModel().getModel("me") || {};
		let that = this;
		if (!me.userId) {
			return Promise.resolve("初始化信息的参数不对userId=" + (me.userId || ""));
		}

		that.uuAccid = new UserInfoModel().getModel("accid");
		that.setToken(GetLoginModel.getYunXinToken());
		this.userId = me.userId;
		return new Promise((resolve, reject) => {
			// 如果IM连接状态未断开则无需重新初始化
			if(that.imChartVal && that.imChartVal.connect && that.token) {
				that.imChartVal.connect();
				new Notification().postNotification(Notify.ImLinkSuccessChange.Name);
				SetNvueNativeModel.imChartClass(ImChart);
                getApp().globalData.imChartClass = ImChart;
				resolve("成功");
				return;
			}

			that.initConfig(function(info) {
				new Notification().postNotification(Notify.ImLinkSuccessChange.Name);
				SetNvueNativeModel.imChartClass(ImChart);
                getApp().globalData.imChartClass = ImChart;
                resolve(info);
			});
		});
	}

	// 重新连接
	static againLink() {
		if (this.imChartVal && this.imChartVal.disconnect
			&& this.imChartVal.setOptions && this.imChartVal.connect) {
			// 断开 IM
			this.imChartVal.disconnect();
			// 更新 token
			this.imChartVal.setOptions({
				token: this.token,
				account: this.accid
			});
			// 重新连接
			this.imChartVal.connect();
		}
	}
	
	// 初始化配置项
	static initConfig(callback = function() {}) {
		let that = this;
		that.uuAccid = new UserInfoModel().getModel("accid");
		that.accid = new UserInfoModel().getModel("accid");
		that.setToken(GetLoginModel.getYunXinToken());
		if(!this.accid || !this.token) return;

		// #ifdef APP-PLUS
		this.imChartVal = imSdk.getInstance({
			debug: false,
			db: false,  // 是否开启本地数据库，官方建议不开启（原因：兼容性不好）
			syncSessionUnread: true,
			appKey: Config.imKey,   //  在云信管理后台查看应用的 appKey
			account: this.accid,  // 帐号, 应用内唯一, 通过接口返回
			token: this.token,   // 帐号的 token, 用于建立连接
			// 连接成功
			onconnect: function () {
				console.log("im连接成功");
				that.linkFailStatus = 2;
				that.setConnectStatus(1);
				SetNvueNativeModel.imChartClass(ImChart);
                getApp().globalData.imChartClass = ImChart;
                new Notification().postNotification(Notify.ImLinkSuccessChange.Name);
                imSdk.use(Netcall);
                Netcall.destroy();
                that.netcall = Netcall.getInstance({
                    nim: that.imChartVal
                });
                getApp().globalData.netcall = that.netcall;
                that.bindNetcallEvent();
				callback("成功");
			},
			//会话
			onupdatesession: this.onUpdateSession,
			ondisconnect: this.onDisconnect,
			// 离线消息
			onofflinemsgs: this.onOfflineMsg,
			//消息
			onmsg: this.onMsg,
			//系统通知
			oncustomsysmsg: this.onCustomSysMsg,
			onsessions: this.onSessions,
			onmyinfo: this.onMyInfo,
			onupdatemyinfo: this.onUpdateMyInfo,
			onusers: this.onUsers,
			onupdateuser: this.onUpdateUser
		});
		// #endif

		// #ifdef H5
		this.imChartVal = imSdk.NIM.getInstance({
			debug: false,
			db: false,  // 是否开启本地数据库，官方建议不开启（原因：兼容性不好）
			syncSessionUnread: true,
			appKey: Config.imKey,   //  在云信管理后台查看应用的 appKey
			account: this.accid,  // 帐号, 应用内唯一, 通过接口返回
			token: this.token,   // 帐号的 token, 用于建立连接
			// 连接建立后的回调(登录成功)
			onconnect: function () {
				console.log("im连接成功");
				that.setConnectStatus(1);
				new Notification().postNotification(Notify.ImLinkSuccessChange.Name);
				callback("成功");
			},
			//会话
			onupdatesession: this.onUpdateSession,
			ondisconnect: this.onDisconnect,
			// 离线消息
			onofflinemsgs: this.onOfflineMsg,
			//消息
			onmsg: this.onMsg,
			//系统通知
			oncustomsysmsg: this.onCustomSysMsg,
			onsessions: this.onSessions,
			onmyinfo: this.onMyInfo,
			onupdatemyinfo: this.onUpdateMyInfo,
			onusers: this.onUsers,
			onupdateuser: this.onUpdateUser
		});
		// #endif

		// #ifdef MP-WEIXIN
		this.imChartVal = imSdk.getInstance({
			debug: false,
			db: false,  // 是否开启本地数据库，官方建议不开启（原因：兼容性不好）
			syncSessionUnread: true,
			autoMarkRead : true,  // 自动标记已读是否开启
			appKey: Config.imKey,   //  在云信管理后台查看应用的 appKey
			account: this.accid,  // 帐号, 应用内唯一, 通过接口返回
			token: this.token,   // 帐号的 token, 用于建立连接
			// 连接建立后的回调(登录成功)
			onconnect: function () {
				console.log("im连接成功");
				that.setConnectStatus(1);
				new Notification().postNotification(Notify.ImLinkSuccessChange.Name);
				callback("同步完成");
			},
			//会话
			onupdatesession: this.onUpdateSession,
			ondisconnect: this.onDisconnect,
			// 离线消息
			onofflinemsgs: this.onOfflineMsg,
			//消息
			onmsg: this.onMsg,
			//系统通知
			oncustomsysmsg: this.onCustomSysMsg,
			onerror: function (error) {
				console.log('SDK 连接失败', error)
			},
			onsessions: this.onSessions,
		});
		// #endif
	}

	// 会话更新回调
	static onUpdateSession(session) {
		// console.error("--onUpdateSession--", session);
		let messageId = ImChart.getUuAccid() == session.lastMsg.to
			? session.lastMsg.from
			: session.lastMsg.to;

		// 已读回执
		if(session.msgReceiptTime && messageId == ImChart.messageId) {
			new UnReadMsgTimeModel().setModel(session.msgReceiptTime, messageId);
			new Notification().postNotification(Notify.MsgReadChanged.Name, session.msgReceiptTime);
		}

		// 自己的消息不需要推送
		if(session.lastMsg && session.lastMsg.from
			&& session.lastMsg.from == ImChart.getUuAccid()) {
			let updateTime = new UnReadMsgTimeModel().getModel(messageId) || 0;
			if(updateTime > session.updateTime || !updateTime) {
				new UnReadMsgTimeModel().setModel(session.updateTime, messageId);
			}
			if(ImChart.ImNeedSendShortMessage) {
				ImChart.ImNeedSendShortMessage.init();
				ImChart.ImNeedSendShortMessage.upAlreadyReply(true);
			}
			let listMsgItem = new DealMsgPush(session).getMsg(false);
			new DealChartListModel(messageId).newMsg(listMsgItem, session);
			return;
		}

		new UnReadMsgTimeModel().setModel(session.updateTime, messageId);
		ImChart.sendReadCallback(messageId, session.lastMsg);
		if (session && session.lastMsg && session.lastMsg.from
			&& session.lastMsg.from == ImChart.getUuAccid()) {
			let listMsgItem = new DealMsgPush(session).getMsg(true);
			new DealChartListModel(messageId).newMsg(listMsgItem, session);
			new Notification().postNotification(Notify.UpChartListChanged.Name, session);
			return;
		}

		if(ImChart.messageId == messageId) {
			let getDetailMsgVal = new DealMsgPush(session).getDetailMsg(messageId);
			if (getDetailMsgVal) {
				if (!ProjectConfigConst.getSysIds().includes(ImChart.messageId)) {
					new Notification().postNotification(Notify.UpChartMsgChanged.Name, getDetailMsgVal);
					new Notification().postNotification(Notify.MsgReadChanged.Name, session.updateTime);
				}
				
				let listMsgItem = new DealMsgPush(session).getMsg(false);
				new DealChartListModel(messageId).newMsg(listMsgItem, session);
			}
			return;
		}

		let listMsgItem = new DealMsgPush(session).getMsg(true);
		new DealChartListModel(messageId).newMsg(listMsgItem, session);
		new Notification().postNotification(Notify.UpChartMsgChanged.Name, listMsgItem);
	}

	static onDisconnect(info) {
		this.linkFailStatus = 1;
		console.warn("IM连接断开", info);
		if (info.callFunc && info.callFunc.indexOf("logout") >= 0) {
			return;
		}

		if (info.message && info.message.indexOf("网断了") >= 0) return;
		
		setTimeout(() => {
			if (this.linkFailStatus === 2) return;
			
			this.linkFailStatus = 1;
			ImChart.setConnectStatus(2);
			RequestTimeOut.isTokenError = true;
			if (new UserInfoModel().getModel("clientKey")) {
				new UserInfoModel().setModel("", "clientKey");
				new DifferenceApi().showToast("您的账号在其他端已登录，请重新登录");
				RequestTimeOut.isInLoginPage = true;
				setTimeout(() => {
					uni.reLaunch({
						url: ImChart.imCloseLoginPath
					});
				}, 500);
			}
		}, 3000);
	}

	// 离线消息
	static onOfflineMsg(info) {
		console.log('离线消息', info);
		// 离线消息更新到未读消息中
		let list = info.msgs || [];
		let mapInfo = new UnReadMsgModel().getModel() || {};
		let unreadMsgObj = mapInfo[GetLoginModel.getUserId()] || {};
		let unreadMsgTimeMap = new UnReadMsgTimeModel().getModel() || {};
		if(list.length > 0) {
			for (let item of list) {
				let messageId = ImChart.getUuAccid() == item.from
					? item.to : item.from;
				let listMsgItem = new DealMsgPush({lastMsg: item}).getMsg(false);
				new DealChartListModel(messageId).newMsg(listMsgItem, {lastMsg: item});

				if(item.userUpdateTime) {
					unreadMsgTimeMap[item.from] = item.userUpdateTime;
				}
				if(!unreadMsgObj[item.from]) {
					unreadMsgObj[item.from] = 1;
					continue;
				}

				let unreadNum = unreadMsgObj[item.from] || 0;
				unreadNum = parseInt(unreadNum);
				unreadNum++;
				unreadMsgObj[item.from] = unreadNum;
			}
			mapInfo[GetLoginModel.getUserId()] = unreadMsgObj;
			new UnReadMsgModel().setModel(mapInfo);
			UpUnReadNumTab.setTab();
			new UnReadMsgTimeModel().setModel(unreadMsgTimeMap);
			new DealChartListModel().sendMsgListNc();
		}
	}

	static onMsg(sysMsg) {
		console.log(sysMsg, "--onMsg--");
		if (sysMsg.type == "custom") {
			let content = sysMsg.content ? JSON.parse(sysMsg.content) : {};

			// 服务器返回的撩客类型
			let msgData = content.data || {};
			if (content.type && (content.type == 123)) {
				let tips = msgData.CONTENT;
				let UpAgentHouseTipsMap = UpAgentHouseTips.getData(sysMsg.from);
				UpAgentHouseTipsMap.tips = tips;
				UpAgentHouseTipsMap.archiveId = sysMsg.from;
				UpAgentHouseTips.setData(sysMsg.from, UpAgentHouseTipsMap);
				new Notification().postNotification(Notify.LiaoKeChartChanged.Name, {
					type: content.type,
					tips: tips,
					archiveId: UpAgentHouseTipsMap.archiveId,
				});
			}
			
			// 动态提醒
			if (sysMsg.target === ProjectConfigConst.remindMsgMessageId) {
				new Notification().postNotification(Notify.RemindChange.Name);
			}
			
			// 确认消息
			if (content.type && (content.type == 180)) {
				new Notification().postNotification(Notify.CustomerConfirmMsgChange.Name);
			}
		}
	}

	static onCustomSysMsg(sysMsg) {
		console.log("---onCustomSysMsg---", sysMsg);
		if (sysMsg.type == "custom") {
			let content = sysMsg.content ? JSON.parse(sysMsg.content) : {};
			
			// 确认消息
			if (content.type && (content.type == 180)) {
				new Notification().postNotification(Notify.CustomerConfirmMsgChange.Name);
			}
		}
	}

	static onSessions(sessions) {
		console.log('收到会话列表', sessions);
	}

	static onUpdateUser(info) {
		console.log('用户资料更新了', info);
		ImChart.imChartVal.getUser({
			account: ["ld_13713"],
			sync: true,
			done: (error, users) => {
				console.error("-res-", error, users);
			}
		});
	}

	static onUsers(info) {
		console.log('收到用户资料列表', info);
	}

	static onMyInfo(user) {
		console.log('收到我的名片', user);
	}

	static onUpdateMyInfo(user) {
		console.log('我的名片更新了', user);
	}

    static bindNetcallEvent() {
        ImChart.netcall.on('syncDone', (data) => {
            console.log('登录成功', data);
            ImChart.syncDone = data;
			SetNvueNativeModel.imChartClass(ImChart);
            getApp().globalData.imChartClass = ImChart;
            new Notification().postNotification(Notify.VideoChart.Name);
        });
        ImChart.netcall.on('clientLeave', (data) => {
            console.log('有人离开了', data);
        });
        ImChart.netcall.on('clientJoin', (data) => {
            console.log('有人加入了', data);
            new Notification().postNotification(Notify.AudioChartInfo.Name, data);
        });
        ImChart.netcall.on('callRejected', (data) => {
            console.log('对方拒绝了', data)
        });
        ImChart.netcall.on('callAccepted', (data) => {
            console.log('对方接听了', data);
            ImChart.callAccepted = data;
            SetNvueNativeModel.imChartClass(ImChart);
            getApp().globalData.imChartClass = ImChart;
            new Notification().postNotification(Notify.AcceptAudioChart.Name, data);
        });
        ImChart.netcall.on('beCalling', (data) => {
        	console.error("--data---", data);
            ImChart.beCalling = data;
            getApp().globalData.imChartClass = ImChart;
			SetNvueNativeModel.imChartClass(ImChart);
            let pages = getCurrentPages();
            let currentPage = pages[pages.length - 1];
            if (currentPage.route.indexOf("pagesMsg/msgDetail/audioChart") === -1) {
				uni.navigateTo({
					url: "/pagesMsg/msgDetail/audioChart"
				});
			}
        });
        ImChart.netcall.on('callerAckSync', (data) => {
            console.log('callerAckSync: 其他端已经处理了', data);
        });
        ImChart.netcall.on('hangup', (data) => {
            console.log('hangup', data);
        });
        ImChart.netcall.on('control', (data) => {
            console.log('control', data);
        });
        ImChart.netcall.on('joinChannel', (data) => {
            console.log('joinChannel', data);
        });
        ImChart.netcall.on('clientUpdate', (data) => {
            console.log('有人更新了', data);
        });
        ImChart.netcall.on('error', (error) => {
            console.error('出错了', error);
        });
        ImChart.netcall.on('open', (data) => {
            console.log('socket建立成功', data);
        });
        ImChart.netcall.on('sendCommandOverTime', (data) => {
            console.log('发送命令超时', data);
        });
        ImChart.netcall.on('liveRoomClose', (data) => {
            console.log('互动直播房间解散了', data);
        });
        ImChart.netcall.on('sessionDuration', (data) => {
            console.log('===结束通话(ms)：', data);
        });
		SetNvueNativeModel.imChartClass(ImChart);
        getApp().globalData.imChartClass = ImChart;
    }
	//  --------------- 初始化部分 end ---------------------


	// 获取聊天列表 读取本地
	static getChartList() {
		let serviceId = this.getServiceId();
		let res = new DealChartListModel(serviceId).getMsgList() || [];
		return res.sort(new compare("msg_timestamp").minToMax());
	}
	
	/**
	 * 屏蔽和解除屏蔽
	 * @param blockUserId
	 * 屏蔽的id
	 * @param status
	 * true ? 屏蔽 : 解除屏蔽
	 */
	static blockMsg(blockUserId, status = false) {
		this.imChartVal.markInBlacklist({
			account: blockUserId,
			isAdd: status, // `true`表示加入黑名单, `false`表示从黑名单移除
			done: (error, obj) => {
				console.log(obj);
				console.log('将' + obj.account
					+ (status ? '加入黑名单' : '从黑名单移除')
					+ (!error?'成功':'失败'));
			}
		});
	}

	/**
	 *删除消息
	 * @param removeId
	 * 删除id
	 */
	static DeleteMsg(removeId) {
		if(!removeId) {
			return Promise.reject("请输入删除的id");
		}
		
		new DealChartListModel(removeId).deleteMsg();
		// this.imChartVal.clearServerHistoryMsgs({
		// 	account: removeId,
		// 	delRoam: false,
		// 	done: (error, obj) => {
		// 		console.log('删除服务器消息' + (!error?'成功':'失败'), error, obj);
		// 		new DealChartListModel(removeId).deleteMsg();
		// 	}
		// });
	}
	
	/**
	 * 获取聊天信息 处理之后的
	 * @param messageId
	 * @param endTime
	 * @param limit
	 * @param callback
	 */
	static getHistory(messageId, endTime = new Date().getTime(), limit = 100,
					  callback = function () {}) {
		ImChart.imChartVal.getHistoryMsgs({
			scene: 'p2p',
			to: messageId,
			limit: limit,
			asc: true,
			endTime: endTime,
			done: function(error, obj) {
				let msgs = obj.msgs || [];
				let firstLastMsg = msgs.length > 0 ? msgs[0] : {};
				let haveMoreData = true;
				if (msgs.length < limit) {
					haveMoreData = false;
				}
				let name = "";
				for (let info of msgs) {
					if (info.from == messageId) {
						name = info.fromNick || "";
						break;
					}
				}
				let list = new DealChartDetail(msgs, messageId).getList();
				callback({
                    name: name,
                    time: firstLastMsg.time || 0,
                    haveMoreData: haveMoreData,
                    list: list
				});
			}
		});
	}
	
	/**
	 * 获取原始聊天记录
	 * @param messageId
	 * @param endTime
	 * @param limit
	 * @returns {Promise<any>}
	 */
	static getHistoryOriginal(messageId, endTime = new Date().getTime() + 20000, limit = 100) {
		return new Promise((resolve, reject) => {
			ImChart.imChartVal.getHistoryMsgs({
				scene: 'p2p',
				to: messageId,
				limit: limit,
				asc: true,
				endTime: endTime,
				done: function(error, obj) {
					resolve(obj);
				}
			});
		});
	}

	// 判断消息是否已读
	static checkMsgIsRead(msg) {
		return this.imChartVal.isMsgRemoteRead(msg);
	}

	// 已读消息回执给接收方
	static sendReadCallback(messageId = "", msg) {
		if(!msg) {
			this.getHistoryOriginal(messageId, new Date().getTime() + 2000, 2)
				.then(obj => {
					let lastMsg = {};
					let list = obj.msgs || [];
					for(let msgItem of list) {
						if(msgItem.from == messageId && Object.keys(lastMsg).length == 0) {
							lastMsg = msgItem;
						}
						if(msgItem.from != messageId) {
							ImChart.checkMsgIsRead(msgItem);
						}
					}
					if(Object.keys(lastMsg).length > 0) {
						ImChart.imChartVal.sendMsgReceipt({
							msg: lastMsg,
							done: function(error, obj) {
								console.log('发送消息已读回执' + (!error?'成功':'失败'), error, obj);
							}
						});
					}
				});
			return;
		}

		ImChart.imChartVal.sendMsgReceipt({
			msg: msg,
			done: function(error, obj) {
				console.log('发送消息已读回执' + (!error?'成功':'失败'), error, obj);
			}
		});
	}
	
	// 退出登录
	static exitLogin() {
		if (!ImChart.imChartVal || !ImChart.imChartVal.disconnect) return;
		
		ImChart.imChartVal.disconnect();
	}
}

// 发送消息
export class ImSendMessage {
	messageId = "";
	imChart = null;
	constructor(messageId, imChart = null) {
		this.messageId = messageId;
		this.imChart = imChart;
	}

	// 链接状态更新 返回imChartVal
	checkConnectStatus(callback = function() {}) {
	    if (this.imChart && this.imChart.imChartVal) {
	        callback(this.imChart.imChartVal);
	        return;
        }

		if(ImChart.getConnnectStatus() == 1) {
			callback(ImChart.imChartVal);
			return;
		}

		if(ImChart.getConnnectStatus() == 2) {
			ImChart.initImUserInfo()
				.then(() => {
					callback(ImChart.imChartVal);
				});
			return;
		}

		callback(null);
	}

	// 发送文本消息
	sendText(text) {
		let that = this;
		return new Promise((resolve, reject) => {
			this.checkConnectStatus((imChartVal) => {
				if(!imChartVal) {
					uni.showToast({title: "初始化IM失败", icon: "none"});
					reject("初始化IM失败");
					return;
				}

				imChartVal.sendText({
					scene: 'p2p',
					to: that.messageId,
					text: text,
					done: function (err, msg) {
						resolve(msg);
					}
				});
			});
		});
	}

	// 发送图片
	sendImage(url) {
		let that = this;
		return new Promise((resolve, reject) => {
			this.checkConnectStatus((imChartVal) => {
				if(!imChartVal) {
					uni.showToast({title: "初始化IM失败", icon: "none"});
					reject("初始化IM失败");
					return;
				}

				// #ifdef H5 || APP-PLUS || MP
				that.getImgInfo(url).then(imgInfo => {
					resolve({
						w: imgInfo.width,
						h: imgInfo.height,
						url: url,
						isSendUser: true
					});
				});
				that.previewFile(url, "image")
					.then(file => {
						imChartVal.sendFile({
							scene: 'p2p',
							to: that.messageId,
							type: 'image',
							file: file,
							done: function (error, msg) {
								new Notification().postNotification(Notify.MsgSendSuccessChange.Name, {url: url});
							}
						});
					});
				// #endif

				// #ifndef H5 || APP-PLUS || MP
				reject("尚未配置该端的发送文件方法")
				// #endif
			});
		});
	}

	// 发送语音消息
	// tempFilePath: 录音成功后返回的文件临时路径
	sendVoice(tempFilePath, duration) {
		let that = this;
		return new Promise((resolve, reject) => {
			this.checkConnectStatus((imChartVal) => {
				if(!imChartVal) {
					uni.showToast({title: "初始化IM失败", icon: "none"});
					reject("初始化IM失败");
					return;
				}

				imChartVal.sendFile({
					scene: 'p2p',
					to: that.messageId,
					wxFilePath: tempFilePath,
					type: 'audio',
					done: function (err, msg) {
						let sendSuccess = false;
						if (!err) {
							sendSuccess = true;
						}
						new Notification().postNotification(
							Notify.MsgSendSuccessChange.Name,
							{
								url: tempFilePath,
								msg: msg,
								sendSuccess: sendSuccess
							}
						);
					}
				});
				resolve({
					file: {
						url: tempFilePath,
						dur: duration,
					},
					isSendUser: true
				});
			});
		});
	}

	// 发送视频消息
	// tempFilePath: 视频后返回的文件临时路径
	sendVideo(tempFilePath) {
		let that = this;
		return new Promise((resolve, reject) => {
			this.checkConnectStatus((imChartVal) => {
				if(!imChartVal) {
					uni.showToast({title: "初始化IM失败", icon: "none"});
					reject("初始化IM失败");
					return;
				}

				imChartVal.sendFile({
					scene: 'p2p',
					to: that.messageId,
					wxFilePath: tempFilePath,
					type: 'video',
					done: function (err, msg) {
						resolve(msg);
					}
				});
			});
		});
	}

	// 获取图片信息
	getImgInfo(tempFilePath) {
		return new Promise((resolve, reject) => {
			uni.getImageInfo({
				src: tempFilePath,
				success: (image) => {
					resolve(image);
				}
			});
		});
	}

	// 预览文件
	previewFile(tempFilePath,type) {
		return new Promise((resolve, reject) => {
			this.checkConnectStatus((imChartVal) => {
				if(!imChartVal) {
					uni.showToast({title: "初始化IM失败", icon: "none"});
					reject("初始化IM失败");
					return;
				}

				if (type === "image") {
					uni.getImageInfo({
						src: tempFilePath,
						success: (image) => {
							// #ifdef APP-PLUS
							imChartVal.previewFile({
								type: 'image',
								filePath: tempFilePath,
								fastPass: `{w:${image.width},h:${image.height},md5:${md5.hex_md5(tempFilePath)}`,
								done: function(error, file) {
									if (!error) {
										resolve(file);
										return;
									}

									reject(error);
								}
							});
							// #endif

							// #ifdef MP
							imChartVal.previewFile({
								type: 'image',
								wxFilePath: tempFilePath,
								fastPass: `{w:${image.width},h:${image.height},md5:${md5.hex_md5(tempFilePath)}`,
								done: function(error, file) {
									if (!error) {
										resolve(file);
										return;
									}

									reject(error);
								}
							});
							// #endif

							// #ifdef H5
							imChartVal.previewFile({
								type: 'image',
								dataURL: tempFilePath,
								fastPass: `{w:${image.width},h:${image.height},md5:${md5.hex_md5(tempFilePath)}`,
								done: function(error, file) {
									if (!error) {
										resolve(file);
										return;
									}

									reject(error);
								}
							});
							// #endif
						}
					});
				}

				// #ifndef H5 || APP-PLUS || MP
				reject("尚未配置该端的发送文件方法")
				// #endif
			});
		});
	}

	// 再次发送
	againSend(someMsg, tempFilePath) {
		let that = this;
		return new Promise((resolve, reject) => {
			this.checkConnectStatus((imChartVal) => {
				if(!imChartVal) {
					uni.showToast({title: "初始化IM失败", icon: "none"});
					reject("初始化IM失败");
					return;
				}

				imChartVal.resendMsg({
					msg: someMsg,
					done: (err, msg) => {
						let sendFail = true;
						if (!err) {
							sendFail = false;
						}
						new Notification().postNotification(
							Notify.MsgSendSuccessChange.Name,
							{
								url: tempFilePath,
								msg: msg,
								sendFail: sendFail
							}
						);
					}
				})
			});
		});
	}
	
	// 发送地理位置
	sendLocation(locationItem = new PositionChartItem()) {
		let that = this;
		return new Promise((resolve, reject) => {
			this.checkConnectStatus((imChartVal) => {
				if(!imChartVal) {
					uni.showToast({title: "初始化IM失败", icon: "none"});
					reject("初始化IM失败");
					return;
				}
				
				let imgSrc = new Utils().getMapStaticImg(
					locationItem.lat,
					locationItem.lng,
					428,270
				);
				uni.downloadFile({
					url: imgSrc,
					success: (res) => {
						if (res.statusCode === 200) {
							that.previewFile(res.tempFilePath, "image")
								.then(res => {
									locationItem.staticImg = res.url;
									locationItem.url = res.url;
									locationItem.md5 = res.md5;
									locationItem.size = res.size;
									let content = {
										type: ImChartConst.positionType,
										data: {
											locationAddSubTitle: locationItem.address,
											locationAddTitle: locationItem.name,
											locationImageUrl: locationItem.staticImg,
											locationLatitude: locationItem.lat,
											locationLongitude: locationItem.lng,
											md5: locationItem.md5,
											url: locationItem.url,
											size: locationItem.size
										}
									};
									imChartVal.sendCustomMsg({
										scene: 'p2p',
										to: that.messageId,
										content: JSON.stringify(content),
										done: function (err, msg) {
											let sendSuccess = false;
											if (!err) {
												sendSuccess = true;
											}
											new Notification().postNotification(
												Notify.MsgSendSuccessChange.Name,
												{
													url: imgSrc,
													type: "position",
													msg: msg,
													sendSuccess: sendSuccess
												}
											);
										}
									});
								});
						}
					}
				});
				resolve({
					url: imgSrc,
					locationItem: locationItem,
					isSendUser: true
				});
			});
		});
	}
	
	// 发送确认消息  不计入历史记录
	sendNotifyMsg(messageId) {
		let that = this;
		return new Promise((resolve, reject) => {
			this.checkConnectStatus((imChartVal) => {
				if(!imChartVal) {
					uni.showToast({title: "初始化IM失败", icon: "none"});
					reject("初始化IM失败");
					return;
				}
				
				imChartVal.sendCustomSysMsg({
					scene: 'p2p',
					to: messageId,
					sendToOnlineUsersOnly: false,
					content: JSON.stringify({type: 180, data: {value: "确认消息,不计入历史记录"}}),
					done: function (err, msg) {
						resolve(msg);
					}
				});
			});
		});
	}
}


// 处理消息push
class DealMsgPush {
	session = {};  // 会话内容
	lastMsgText = "";  // type == text 时的文案

	constructor(session = {}) {
		this.session = session;
		if(session && session.lastMsg && session.lastMsg.type == 'text') {
			this.lastMsgText = session.lastMsg.text;
		}
	}

	// 最后一条消息列表文案显示
	getLastText() {
		let type = this.session.lastMsg.type;
		let map = new Map()
			.set("text", this.lastMsgText)
			.set("image", "[图片]")
			.set("audio", "[语音]")
			.set("VIDEO", "[视频]")
			.set("video", "[视频]")
			.set("custom", "新消息");
		if(!map.has(type)) {
			return "你有新消息啦";
		}

		return map.get(type);
	}

	// 列表上的信息
	getMsg(needUpTab = true) {
		let messageId = this.session.lastMsg.to == ImChart.getUuAccid()
			? this.session.lastMsg.from
			: this.session.lastMsg.to;

		let formatDateMap = new formatDate(new Date(this.session.lastMsg.time));
		let newItem = new ChartListItem();
		newItem.messageId = messageId;
		newItem.headImg = "";
		newItem.name = this.session.lastMsg.to == ImChart.getUuAccid()
			? this.session.lastMsg.fromNick : "";
		newItem.msg = this.getLastText();
		if(this.session.lastMsg.type === "custom") {
			let content = JSON.parse(this.session.lastMsg.content);
			if (content.type === ImChartConst.positionType) {
				newItem.msg = content.data && content.data.locationAddTitle
					? `[位置] ${content.data.locationAddTitle}`
					: newItem.msg;
			}
		}
		newItem.lastTime_stamp = formatDateMap.getYear()+"/"+formatDateMap.getMonth()+"/"+formatDateMap.getDay()+" "
			+formatDateMap.getHour()+":"+formatDateMap.getMinute()+":"+formatDateMap.getSecond();
		newItem.sendtime = formatTimeNew(this.session.lastMsg.time);
		newItem.lastTime = formatTimeNew(this.session.lastMsg.time);
		newItem.unRead = 0;
		newItem.isShield = 0;
		newItem.isShowBtn = false;

		newItem.to = this.session.lastMsg.to;
		newItem.msg_type = this.session.lastMsg.type;
		newItem.msg_timestamp = formatDateMap.getYear()+"-"+formatDateMap.getMonth()+"-"+formatDateMap.getDay()+" "
			+formatDateMap.getHour()+":"+formatDateMap.getMinute()+":"+formatDateMap.getSecond();
		if(needUpTab) {
			let num = Number(UpUnReadNumTab.getUnReadNum(messageId) || 0);
			num++;
			let map = new UnReadMsgModel().getModel(GetLoginModel.getUserId()) || {};
			map[messageId] = num;
			new UnReadMsgModel().setModel(map, GetLoginModel.getUserId());
			UpUnReadNumTab.setTab();
		}
		return newItem;
	}

	// 详情的信息
	getDetailMsg(id) {
		let messageId = this.session.lastMsg.to == ImChart.getUuAccid()
			? this.session.lastMsg.from
			: this.session.lastMsg.to;

		if(messageId == id) {
			return new DealReceiveMsg(id).getItem(this.session.lastMsg);
		}

		let num = Number(UpUnReadNumTab.getUnReadNum(messageId));
		num++;
		let map = new UnReadMsgModel().getModel(GetLoginModel.getUserId()) || {};
		map[messageId] = num;
		new UnReadMsgModel().setModel(map, GetLoginModel.getUserId());
		UpUnReadNumTab.setTab();
		return false;
	}
}


// 更新未读数的角标
export class UpUnReadNumTab {
	// 更新tab
	static setTab() {
		// #ifdef MP-WEIXIN || H5 || APP-PLUS
		let mapInfo = new UnReadMsgModel().getModel() || {};
		let map = mapInfo[GetLoginModel.getUserId()] || {};
		let listMap = new ChatListModel().getModel(GetLoginModel.getUserId()) || {};
		let allNum = 0;
		for(let key in map) {
			if (ProjectConfigConst.getNoDealIds().includes(key)) continue;
			
			if (!listMap[key]) continue;
			
			allNum += Number(map[key]);
		}
		if(allNum > 0) {
			uni.setTabBarBadge({
				index: 2,
				text: allNum+""
			});
			return;
		}

		this.removeTab();
		// #endif
	}

	// 删除指定id的未读数
	static removeReadNum(messageId = "") {
		// #ifdef MP-WEIXIN || H5 || APP-PLUS
		if(!messageId) return;

		let mapInfo = new UnReadMsgModel().getModel() || {};
		let map = mapInfo[GetLoginModel.getUserId()] || {};
		delete(map[messageId]);
		mapInfo[GetLoginModel.getUserId()] = map;
		new UnReadMsgModel().setModel(mapInfo);
		this.setTab();
		// #endif
	}

	// 移除tab文案
	static removeTab() {
		// #ifdef MP-WEIXIN || H5 || APP-PLUS
		uni.removeTabBarBadge({index: 2});
		// #endif
	}
	
	// 获取未读数
	static getUnReadNum(accid = "") {
		let mapInfo = new UnReadMsgModel().getModel() || {};
		let map = mapInfo[GetLoginModel.getUserId()] || {};
		return map[accid] || 0;
	}
	
	// 更新提醒未读数
	static upRemindUnReadNum() {
		let mapInfo = new UnReadRemindModel().getModel() || {};
		let num = mapInfo[GetLoginModel.getUserId()] || 0;
		num++;
		mapInfo[GetLoginModel.getUserId()] = num;
		new UnReadRemindModel().setModel(mapInfo, GetLoginModel.getUserId());
	}
}


// 表情map
export class GetEmojiMap {
	getMap() {
		const emojiCommonMap = {
			"[大笑]":{file:"emoji_0.png"},
			"[可爱]":{file:"emoji_01.png"},
			"[色]":{file:"emoji_02.png"},
			"[嘘]":{file:"emoji_03.png"},
			"[亲]":{file:"emoji_04.png"},
			"[呆]":{file:"emoji_05.png"},
			"[口水]":{file:"emoji_06.png"},
			"[汗]":{file:"emoji_145.png"},
			"[呲牙]":{file:"emoji_07.png"},
			"[鬼脸]":{file:"emoji_08.png"},
			"[害羞]":{file:"emoji_09.png"},
			"[偷笑]":{file:"emoji_10.png"},
			"[调皮]":{file:"emoji_11.png"},
			"[可怜]":{file:"emoji_12.png"},
			"[敲]":{file:"emoji_13.png"},
			"[惊讶]":{file:"emoji_14.png"},
			"[流感]":{file:"emoji_15.png"},
			"[委屈]":{file:"emoji_16.png"},
			"[流泪]":{file:"emoji_17.png"},
			"[嚎哭]":{file:"emoji_18.png"},
			"[惊恐]":{file:"emoji_19.png"},
			"[怒]":{file:"emoji_20.png"},
			"[酷]":{file:"emoji_21.png"},
			"[不说]":{file:"emoji_22.png"},
			"[鄙视]":{file:"emoji_23.png"},
			"[阿弥陀佛]":{file:"emoji_24.png"},
			"[奸笑]":{file:"emoji_25.png"},
			"[睡着]":{file:"emoji_26.png"},
			"[口罩]":{file:"emoji_27.png"},
			"[努力]":{file:"emoji_28.png"},
			"[抠鼻孔]":{file:"emoji_29.png"},
			"[疑问]":{file:"emoji_30.png"},
			"[怒骂]":{file:"emoji_31.png"},
			"[晕]":{file:"emoji_32.png"},
			"[呕吐]":{file:"emoji_33.png"},
			"[拜一拜]":{file:"emoji_160.png"},
			"[惊喜]":{file:"emoji_161.png"},
			"[流汗]":{file:"emoji_162.png"},
			"[卖萌]":{file:"emoji_163.png"},
			"[默契眨眼]":{file:"emoji_164.png"},
			"[烧香拜佛]":{file:"emoji_165.png"},
			"[晚安]":{file:"emoji_166.png"},
			"[强]":{file:"emoji_34.png"},
			"[弱]":{file:"emoji_35.png"},
			"[OK]":{file:"emoji_36.png"},
			"[拳头]":{file:"emoji_37.png"},
			"[胜利]":{file:"emoji_38.png"},
			"[鼓掌]":{file:"emoji_39.png"},
			"[握手]":{file:"emoji_200.png"},
			"[发怒]":{file:"emoji_40.png"},
			"[骷髅]":{file:"emoji_41.png"},
			"[便便]":{file:"emoji_42.png"},
			"[火]":{file:"emoji_43.png"},
			"[溜]":{file:"emoji_44.png"},
			"[爱心]":{file:"emoji_45.png"},
			"[心碎]":{file:"emoji_46.png"},
			"[钟情]":{file:"emoji_47.png"},
			"[唇]":{file:"emoji_48.png"},
			"[戒指]":{file:"emoji_49.png"},
			"[钻石]":{file:"emoji_50.png"},
			"[太阳]":{file:"emoji_51.png"},
			"[有时晴]":{file:"emoji_52.png"},
			"[多云]":{file:"emoji_53.png"},
			"[雷]":{file:"emoji_54.png"},
			"[雨]":{file:"emoji_55.png"},
			"[雪花]":{file:"emoji_56.png"},
			"[爱人]":{file:"emoji_57.png"},
			"[帽子]":{file:"emoji_58.png"},
			"[皇冠]":{file:"emoji_59.png"},
			"[篮球]":{file:"emoji_60.png"},
			"[足球]":{file:"emoji_61.png"},
			"[垒球]":{file:"emoji_62.png"},
			"[网球]":{file:"emoji_63.png"},
			"[台球]":{file:"emoji_64.png"},
			"[咖啡]":{file:"emoji_65.png"},
			"[啤酒]":{file:"emoji_66.png"},
			"[干杯]":{file:"emoji_67.png"},
			"[柠檬汁]":{file:"emoji_68.png"},
			"[餐具]":{file:"emoji_69.png"},
			"[汉堡]":{file:"emoji_70.png"},
			"[鸡腿]":{file:"emoji_71.png"},
			"[面条]":{file:"emoji_72.png"},
			"[冰淇淋]":{file:"emoji_73.png"},
			"[沙冰]":{file:"emoji_74.png"},
			"[生日蛋糕]":{file:"emoji_75.png"},
			"[蛋糕]":{file:"emoji_76.png"},
			"[糖果]":{file:"emoji_77.png"},
			"[葡萄]":{file:"emoji_78.png"},
			"[西瓜]":{file:"emoji_79.png"},
			"[光碟]":{file:"emoji_80.png"},
			"[手机]":{file:"emoji_81.png"},
			"[电话]":{file:"emoji_82.png"},
			"[电视]":{file:"emoji_83.png"},
			"[声音开启]":{file:"emoji_84.png"},
			"[声音关闭]":{file:"emoji_85.png"},
			"[铃铛]":{file:"emoji_86.png"},
			"[锁头]":{file:"emoji_87.png"},
			"[放大镜]":{file:"emoji_88.png"},
			"[灯泡]":{file:"emoji_89.png"},
			"[锤头]":{file:"emoji_90.png"},
			"[烟]":{file:"emoji_91.png"},
			"[炸弹]":{file:"emoji_92.png"},
			"[枪]":{file:"emoji_93.png"},
			"[刀]":{file:"emoji_94.png"},
			"[药]":{file:"emoji_95.png"},
			"[打针]":{file:"emoji_96.png"},
			"[钱袋]":{file:"emoji_97.png"},
			"[钞票]":{file:"emoji_98.png"},
			"[银行卡]":{file:"emoji_99.png"},
			"[手柄]":{file:"emoji_100.png"},
			"[麻将]":{file:"emoji_101.png"},
			"[调色板]":{file:"emoji_102.png"},
			"[电影]":{file:"emoji_103.png"},
			"[麦克风]":{file:"emoji_104.png"},
			"[耳机]":{file:"emoji_105.png"},
			"[音乐]":{file:"emoji_106.png"},
			"[吉他]":{file:"emoji_107.png"},
			"[火箭]":{file:"emoji_108.png"},
			"[飞机]":{file:"emoji_109.png"},
			"[火车]":{file:"emoji_110.png"},
			"[公交]":{file:"emoji_111.png"},
			"[轿车]":{file:"emoji_112.png"},
			"[出租车]":{file:"emoji_113.png"},
			"[警车]":{file:"emoji_114.png"},
			"[自行车]":{file:"emoji_115.png"},
		};
		return JSON.parse(JSON.stringify(emojiCommonMap));
	}

	dealEmojiSwiperData() {
		let emojiBaseUrl = 'https://zdzfapi.haofang.net/Public/wxApp/images';
		let emojiItem = this.getMap();
		let emojiTextArr = [];
		let arr = [];
		let emojiList = [];
		for (let key in emojiItem) {
			let keytext = key.replace(/\[|\]/g, '');
			emojiTextArr.push(keytext);
			let obj = {};
			obj.file = emojiItem[key].file;
			obj.img = emojiBaseUrl + "/emoji/" + emojiItem[key]['file']+"?t=20190727";
			obj.fileName = key;
			arr.push(obj);
			if (arr.length >= 27) {
				emojiList.push(arr);
				arr = [];
			}
		}
		if(arr.length < 27) {
			emojiList.push(arr);
		}
		return {
			emojiText: emojiTextArr,
			emojiList: emojiList
		}
	}
}


// 处理发送来的消息
export class DealReceiveMsg {
	messageId = "";
	constructor(messageId = "") {
		this.messageId = messageId;
	}

	getItem(item) {
		return this[this.getType((item.type == undefined ? "" : item.type)).event](item);
	}

	getType(type = "") {
		let map = new Map()
			.set("text", {type: "text", event: "dealText"})
			.set("image", {type: "img", event: "dealImg"})
			.set("audio", {type: "voice", event: "dealVoice"})
			.set("video", {type: "video", event: "dealVideo"})
			.set("custom", {type: "position", event: "dealPosition"});
		if(!map.has(type)) return {type: "null", event: "dealNull"};

		return map.get(type);
	}

	dealNull() {
		return null;
	}

	dealText(info = {}) {
		let emoji = this.dealEmoji(info.text || "");
		let item = new ChartDetailItem();
		item.type = "text";
		item.content = info.text || "";
		item.time = formatTimeNew(info.time);
		item.mySend = (info.from == ImChart.uuAccid);
		item.emoji = emoji;
		item.timeStr = info.time;
		item.hasEmoji = (emoji[1].length > 0);
		item.showTime = DealLastMsgTime.checkShowTime(this.messageId, info.time);
		DealLastMsgTime.setTime(info.time, this.messageId);
		return item;
	}

	dealImg(info = {}) {
		let item = new ChartDetailItem();
		item.type = "img";
		item.content = info.file ? info.file.url || "" : "";
		item.time = formatTimeNew(info.time);
		item.timeStr = info.time;
		item.mySend = (info.from == ImChart.uuAccid);
		item.showTime = DealLastMsgTime.checkShowTime(this.messageId, info.time);
		DealLastMsgTime.setTime(info.time, this.messageId);
		return item;
	}

	dealVoice(info = {}) {
		let item = new ChartDetailItem();
		item.type = "voice";
		item.voiceMd5 = info.file ? info.file.md5 || "" : "";
		item.content = info.file && info.file.url ? info.file.url + "?audioTrans&type=mp3" : "";
		item.time = formatTimeNew(info.time);
		item.timeStr = info.time;
		item.mySend = (info.from == ImChart.uuAccid);
		item.voiceLength = info.file && info.file.dur ? Math.round(Number(info.file.dur)/1000) : 1;
		item.showTime = DealLastMsgTime.checkShowTime(this.messageId, info.time);
		DealLastMsgTime.setTime(info.time, this.messageId);
		let unReadVoiceMap = new UnReadVoiceModel().getModel() || {};
		unReadVoiceMap[info.file.md5] = true;
		new UnReadVoiceModel().setModel(unReadVoiceMap);
		return item;
	}

	dealVideo(info = {}) {
		let item = new ChartDetailItem();
		item.type = "video";
		item.content = info.file ? info.file.url || "" : "";
		item.time = formatTimeNew(info.time);
		item.timeStr = info.time;
		item.mySend = (info.from === ImChart.uuAccid);
		item.voiceLength = info.file && info.file.dur ? Math.round(Number(info.file.dur)/1000) : 1;
		item.showTime = DealLastMsgTime.checkShowTime(this.messageId, info.time);
		DealLastMsgTime.setTime(info.time, this.messageId);
		return item;
	}

	dealPosition(info = {}) {
		let positionInfo = info.content ? JSON.parse(info.content) : {};
		let positionData = positionInfo.data || {};
		let positionItem = new PositionChartItem();
		positionItem.name = positionData.locationAddTitle || "";
		positionItem.address = positionData.locationAddSubTitle || "";
		positionItem.lat = positionData.locationLatitude || 0;
		positionItem.lng = positionData.locationLongitude || 0;
		positionItem.staticImg = positionData.locationImageUrl
			? positionData.locationImageUrl.indexOf("?") === -1
				? positionData.locationImageUrl + positionItem.getImgKey()
				: positionData.locationImageUrl + positionItem.getImgKey2()
			: "";

		let item = new ChartDetailItem();
		item.type = "position";
		item.content = positionItem;
		item.time = formatTimeNew(info.time);
		item.timeStr = info.time;
		item.mySend = (info.from == ImChart.uuAccid);
		item.showTime = DealLastMsgTime.checkShowTime(this.messageId, info.time);
		DealLastMsgTime.setTime(info.time, this.messageId);
		// 安卓时增加位置缓存
		if(info.fromClientType && info.fromClientType.indexOf("droid") >= 0) {
			let PositionChartModelMap = new PositionChartModel().getModel(this.messageId) || {};
			PositionChartModelMap[info.time] = item;
			new PositionChartModel().setModel(PositionChartModelMap, this.messageId);
		}
		return item;
	}

	/**
	 * 通过正则替换掉文本消息中的emoji表情
	 * @param text：文本消息内容
	 */
	dealEmoji(text) {
		let emoji = new GetEmojiMap().getMap();
		let re = /\[([^\]\[]*)\]/g;
		let matches = text.match(re) || [];
		let txtArr = text.split(/(\[[^\]]+\])/g);
		let emojiArr = [];
		let txtEmoji = [];
		let newTextArr = [];

		for (let j = 0, len = matches.length; j < len; ++j) {
			if (typeof (emoji[matches[j]]) == 'undefined'){
				delete matches[j];
				continue;
			}

			let url = "http://cdn.haofang.net/static/uuminiapp/emoji/" + emoji[matches[j]].file;

			if(emoji[matches[j]]){
				emojiArr.push(url);
			}

			for (let i = 0, leng = txtArr.length; i < leng; ++i){
				if (txtArr[i] == matches[j]){
					txtArr[i] = {
						emoji:true,
						url:url
					}
				} else if (txtArr[i] == ''){
					delete txtArr[i];
				}
			}
		}

		txtArr.map(item => {
			newTextArr.push(item);
		});
		txtEmoji.push(newTextArr);
		txtEmoji.push(emojiArr);
		return txtEmoji;
	}
}


// 处理聊天详情
export class DealChartDetail {
	list = [];
	messageId = "";

	constructor(list = [], messageId = "") {
		this.list = list;
		this.messageId = messageId;
		this.upTime = new UnReadMsgTimeModel().getModel(this.messageId) || 0;
        DealLastMsgTime.setTime(0, this.messageId);
        if(this.list.data) {
			this.list = [];
		}
	}

	getList() {
        let list = [];
		let haveMySendMsg = null;  // 是否有自己发送的消息
		let haveOtherSendMsg = null; // 是否有对方发送的消息
        DealLastMsgTimeStatic.lastTime = 0;
        this.list.map(item => {
			let eventVal = this[this.getType((item.type == undefined ? "" : item.type)).event](item);
            if (eventVal) {
				if (eventVal.mySend) {
					haveMySendMsg = eventVal;
				} else {
					haveOtherSendMsg = eventVal;
				}
				list.push(eventVal);
			}
        });

        // 最后再更新一次
		DealLastMsgTime.setTime(DealLastMsgTimeStatic.lastTime, this.messageId);
		let unReadMsgTime = new UnReadMsgTimeModel().getModel(this.messageId);

		if(list.length > 0 && haveMySendMsg && haveOtherSendMsg
			&& haveMySendMsg.timeStr
			&& (!unReadMsgTime || haveMySendMsg.timeStr > unReadMsgTime)) {
			new UnReadMsgTimeModel().setModel(haveOtherSendMsg.timeStr, this.messageId);
		}
        return list;
	}

	getType(type = "") {
		let map = new Map()
			.set("text", {type: "text", event: "dealText"})
			.set("image", {type: "img", event: "dealImg"})
			.set("audio", {type: "voice", event: "dealVoice"})
			.set(3, {type: "video", event: "dealVideo"})
			.set("custom", {type: "custom", event: "dealService"})
			.set(100, {type: "text", event: "dealService"});
		if(!map.has(type)) return {type: "null", event: "dealNull"};

		return map.get(type);
	}

	checkIsRead(time) {
		if(!this.upTime) return true;

		return !(time > this.upTime);
	}

	dealNull(ifno) {
		return null;
	}

	dealText(info = {}) {
		let emoji = this.dealEmoji(info.text || "");
		let item = new ChartDetailItem();
		item.type = "text";
		item.content = info.text || "";
		item.time = formatTimeNew(info.time);
        item.mySend = (info.from == ImChart.uuAccid);
		item.emoji = emoji;
		item.isRead = this.checkIsRead(info.time);
		item.timeStr = info.time;
		item.hasEmoji = (emoji[1].length > 0);
		item.showTime = DealLastMsgTimeStatic.checkShowTime(this.messageId, info.time);
        DealLastMsgTimeStatic.setTime(info.time, this.messageId);
		return item;
	}

	dealService(info = {}) {
		info.body = JSON.parse(info.content);
		// 处理房源类型
		if(info.body && info.body.type == 14) {
			return this.dealHouse(info);
		}

		// 地理位置
		if(info.body && info.body.type == ImChartConst.positionType) {
			return this.dealPosition(info);
		}

		// 撩客 文案
		if(info.body && info.body.type == 123) {
			return this.dealText({
				body: {
					msg: info.body.data ? info.body.data.CONTENT || "" : ""
				},
				sendtime: info.time,
				from: info.from,
			});
		}

		// 撩客 房源
		if(info.body && info.body.type == 130) {
			return this.dealHouseLiaoKe(info);
		}

		// 聊天评价
		if (info.body && info.body.type == new ImEvaluateDeal().evaluateMsgType) {
			return this.dealEvaluate(info);
		}

		// 物业房源
		if (info.body && info.body.type == 124) {
			return this.dealHouseWuYe(info);
		}

		// 物业房源登记文案
		if (info.body && info.body.type == 125) {
			return this.dealHouseWuYeText(info);
		}

		let emoji = this.dealEmoji(info.body && info.body.data ? info.body.data.TITLE || "" : "");
		let item = new ChartDetailItem();
		item.type = "text";
		item.content = info.body && info.body.data ? info.body.data.TITLE || "" : "";
		item.time = formatTimeNew(info.time);
		item.mySend = (info.from == ImChart.uuAccid);
		item.timeStr = info.time;
		item.emoji = emoji;
		item.isRead = this.checkIsRead(info.time);
		item.hasEmoji = (emoji[1].length > 0);
		item.showTime = DealLastMsgTime.checkShowTime(this.messageId, info.time);
		DealLastMsgTime.setTime(info.time, this.messageId);
		return item;
	}

	dealImg(info = {}) {
		let item = new ChartDetailItem();
		item.type = "img";
		item.timeStr = info.time;
		item.isRead = this.checkIsRead(info.time);
		item.content = info.file ? info.file.url || "" : "";
		item.time = formatTimeNew(info.time);
		item.mySend = (info.from == ImChart.uuAccid);
		item.width = info.file.w;
		item.height = info.file.h;
		item.showTime = DealLastMsgTimeStatic.checkShowTime(this.messageId, info.time);
        DealLastMsgTimeStatic.setTime(info.time, this.messageId);
		return item;
	}

	dealVoice(info = {}) {
        let item = new ChartDetailItem();
		item.type = "voice";
        item.isRead = this.checkIsRead(info.time);
        item.timeStr = info.time;
		item.voiceMd5 = info.file ? info.file.md5 || "" : "";
		item.content = info.file && info.file.url ? info.file.url + "?audioTrans&type=mp3" : "";
		item.time = formatTimeNew(info.time);
        item.mySend = (info.from == ImChart.uuAccid);
		item.voiceLength = info.file && info.file.dur ? Math.round(Number(info.file.dur)/1000) : 1;
		item.showTime = DealLastMsgTimeStatic.checkShowTime(this.messageId, info.time);
        DealLastMsgTimeStatic.setTime(info.time);
        return item;
	}

	dealVideo(info = {}) {
		let item = new ChartDetailItem();
		item.type = "video";
		item.isRead = this.checkIsRead(info.time);
		item.timeStr = info.time;
		item.content = info.body ? info.body.url || "" : "";
		item.time = formatTimeNew(info.time);
		item.mySend = (info.from === ImChart.uuAccid);
		item.voiceLength = info.body && info.body.dur ? Math.round(Number(info.body.dur)/1000) : 1;
		item.showTime = DealLastMsgTimeStatic.checkShowTime(this.messageId, info.time);
        DealLastMsgTimeStatic.setTime(info.time, this.messageId);
		return item;
	}

	dealHouse(info = {}) {
		let houseItem = new ErHouseListItem();
		let item = new ChartDetailItem();
		let data = info.body ? info.body.data || {} : {};
		let idInfo = info.ext ? JSON.parse(info.ext) : {};
		houseItem.houseTitle = data.TITLE || "";
		houseItem.houseTing = (data.HOUSEROOM && parseInt(data.HOUSEROOM) ? data.HOUSEROOM + "室" : "")
			+ (data.HOUSEROOM && parseInt(data.HOUSEROOM) && data.HOUSETING && parseInt(data.HOUSETING)
				? data.HOUSETING + "厅" : "");
		houseItem.houseArea = data.HOUSEAREA || "";
		houseItem.houseTotalPriceUnit = data.HOUSEPRICEUNIT || "";
		houseItem.houseName = data.BUILDNAME || "";
		houseItem.houseTotalPrice = data.HOUSEPRICE && parseInt(data.HOUSEPRICE)
			? parseInt(data.HOUSEPRICE) || "" : "";
		houseItem.housePriceOfArea = data.HOUSEUNITPRICE && parseInt(data.HOUSEUNITPRICE)
			? parseInt(data.HOUSEUNITPRICE) || "" : "";
		houseItem.houseImg = data.PHOTO || Const.houseDefaultImg;
		houseItem.houseId = idInfo.CASE_ID || idInfo.ASE_ID || "";
		houseItem.cityId = idInfo.cityId || new GpsInfoModel().getModel("cityInfo").cityId || "";
		houseItem.caseType = idInfo.CASE_TYPE || "";
		houseItem.reSource = idInfo.reSource || "";

		item.type = "house";
		item.isRead = this.checkIsRead(info.time);
		item.content = houseItem;
		item.timeStr = info.time;
		item.time = formatTimeNew(info.time);
		item.mySend = (info.from == ImChart.uuAccid);
		item.emoji = [];
		item.hasEmoji = false;
		item.showTime = DealLastMsgTimeStatic.checkShowTime(this.messageId, info.time);
        DealLastMsgTimeStatic.setTime(info.time, this.messageId);
		return item;
	}

	dealPosition(info = {}) {
		let positionData = info.body ? info.body.data || {} : {};
		let positionItem = new PositionChartItem();
		positionItem.name = positionData.locationAddTitle || "";
		positionItem.address = positionData.locationAddSubTitle || "";
		positionItem.lat = positionData.locationLatitude || 0;
		positionItem.lng = positionData.locationLongitude || 0;
		positionItem.staticImg = positionData.locationImageUrl
			? positionData.locationImageUrl.indexOf("?") === -1
				? positionData.locationImageUrl + positionItem.getImgKey()
				: positionData.locationImageUrl + positionItem.getImgKey2()
			: "";

		let item = new ChartDetailItem();
		item.type = "position";
		item.content = positionItem;
		item.timeStr = info.time;
		item.isRead = this.checkIsRead(info.time);
		item.time = formatTimeNew(info.time);
		item.mySend = (info.from == ImChart.uuAccid);
		item.showTime = DealLastMsgTimeStatic.checkShowTime(this.messageId, info.time);
        DealLastMsgTimeStatic.setTime(info.time, this.messageId);
		return item;
	}

	dealHouseLiaoKe(info = {}) {
		let houseItem = new ErHouseListItem();
		let item = new ChartDetailItem();
		let data = info.body ? info.body.data || {} : {};
		let ext = info.ext ? JSON.parse(info.ext) : {};
		houseItem.houseTitle = ext.houseTitle || data.CONTENT || "";
		houseItem.houseUnitPrice = ext.houseUnitPrice
			? parseInt(ext.houseUnitPrice) + "元/㎡" : "";
		houseItem.tingWeiText = (ext.houseRoom && parseInt(ext.houseRoom)
			? parseInt(ext.houseRoom) + "室" : "")
			+ (ext.houseRoom && ext.houseTing && parseInt(ext.houseTing)
				? parseInt(ext.houseTing) + "厅" : "")
			+ (ext.houseRoom && parseInt(ext.houseRoom) ? " | " : "")
			+ (ext.houseArea && parseInt(ext.houseArea)
				? parseInt(ext.houseArea) + "㎡" : "")
			+ (ext.houseDirect && ext.houseDirect != "null" && isNaN(ext.houseDirect)
				? " | " + ext.houseDirect : "")
			+ (ext.buildName ? " | " + ext.buildName : "");
		houseItem.houseName = ext.buildName || "";
		houseItem.houseTotalPrice = ext.housePrice && parseInt(ext.housePrice)
			? parseInt(ext.housePrice) + (ext.housePriceUnit || "") : "";
		houseItem.houseImg =!ext.housePhoto
			? data.PHOTO || Const.houseDefaultImg
			: ext.housePhoto || Const.houseDefaultImg;
		houseItem.houseId = ext.houseId || "";
		houseItem.cityId = ext.cityId || new GpsInfoModel().getModel("cityInfo").cityId || "";
		houseItem.caseType = ext.caseType || "";
		houseItem.reSource = ext.contentType || "1";

		item.type = "houseLiaoKe";
		item.isRead = this.checkIsRead(info.time);
		item.content = houseItem;
		item.timeStr = info.time;
		item.time = formatTimeNew(info.time);
		item.mySend = (info.from == ImChart.uuAccid);
		item.emoji = [];
		item.hasEmoji = false;
		item.showTime = DealLastMsgTimeStatic.checkShowTime(this.messageId, info.time);
        DealLastMsgTimeStatic.setTime(info.time, this.messageId);
		return item;
	}

	dealEvaluate(info) {
		let ext = info.ext ? JSON.parse(info.ext) : {};
		let item = new ChartDetailItem();
		let evaluateItem = new EvaluateChartItem();
		evaluateItem.evaContent = ext.evaContent || "";
		evaluateItem.evaStar = ext.evaStar || 1;
		evaluateItem.evaTagIndex = ext.evaTagIndex || "";

		item.type = "evaluate";
		item.isRead = this.checkIsRead(info.time);
		item.content = evaluateItem;
		item.timeStr = info.time;
		item.time = formatTimeNew(info.time);
		item.mySend = (info.from == ImChart.uuAccid);
		item.emoji = [];
		item.hasEmoji = false;
		item.showTime = DealLastMsgTimeStatic.checkShowTime(this.messageId, info.time);
        DealLastMsgTimeStatic.setTime(info.time, this.messageId);
		return item;
	}

	dealHouseWuYe(info = {}) {
		let houseItem = new WuYeHouseChartItem();
		let item = new ChartDetailItem();
		let data = info.ext ? JSON.parse(info.ext) : {};
		houseItem.houseTitle = data.houseSubject || "";
		houseItem.houseRoof = data.houseRoof ? data.houseRoof + "栋" : "";
		houseItem.houseUnit = data.houseUnit ? data.houseUnit + "单元" : "";
		houseItem.houseFloor = data.houseFloor ? data.houseFloor + "楼" : "";
		houseItem.houseNum = data.houseNum ? data.houseNum + "号" : "";
		houseItem.tipMsg = data.tipMsg || "";
		houseItem.houseArea = data.houseArea || "";
		houseItem.housePrice = data.housePrice || "";
		houseItem.houseName = data.houseBuildName || "";
		houseItem.houseImg = data.thumbUrl || Const.houseDefaultImg;
		houseItem.houseId = data.caseId || "";
		houseItem.cityId = data.cityId || new GpsInfoModel().getModel("cityInfo").cityId || "";
		houseItem.caseType = data.caseType || "";

		item.type = "houseWuYe";
		item.isRead = this.checkIsRead(info.time);
		item.content = houseItem;
		item.timeStr = info.time;
		item.time = formatTimeNew(info.time);
		item.mySend = (info.from == ImChart.uuAccid);
		item.emoji = [];
		item.hasEmoji = false;
		item.showTime = DealLastMsgTimeStatic.checkShowTime(this.messageId, info.time);
        DealLastMsgTimeStatic.setTime(info.time, this.messageId);
		return item;
	}

	dealHouseWuYeText(info = {}) {
		let houseItem = new WuYeHouseTextChartItem();
		let item = new ChartDetailItem();
		let data = info.ext ? JSON.parse(info.ext) : {};
		houseItem.houseTitle = data.houseSubject || "";
		houseItem.buildName = data.houseBuildName || "";
		houseItem.tipMsg = data.tipMsg || "";
		houseItem.houseArea = data.houseArea || "";
		houseItem.housePrice = data.housePrice || "";
		houseItem.houseUseage = data.houseUseage || "";
		houseItem.houseFitment = data.houseFitment || "";

		item.type = "houseWuYeText";
		item.isRead = this.checkIsRead(info.time);
		item.content = houseItem;
		item.timeStr = info.time;
		item.time = formatTimeNew(info.time);
		item.mySend = (info.from == ImChart.uuAccid);
		item.emoji = [];
		item.hasEmoji = false;
		item.showTime = DealLastMsgTimeStatic.checkShowTime(this.messageId, info.time);
        DealLastMsgTimeStatic.setTime(info.time, this.messageId);
		return item;
	}

	/**
	 * 通过正则替换掉文本消息中的emoji表情
	 * @param text：文本消息内容
	 */
	dealEmoji(text) {
		let emoji = new GetEmojiMap().getMap();
		let re = /\[([^\]\[]*)\]/g;
		let matches = text.match(re) || [];
		let txtArr = text.split(/(\[[^\]]+\])/g);
		let emojiArr = [];
		let txtEmoji = [];
		let newTextArr = [];

		for (let j = 0, len = matches.length; j < len; ++j) {
			if (typeof (emoji[matches[j]]) == 'undefined'){
				delete matches[j];
				continue;
			}

			let url = "http://cdn.haofang.net/static/uuminiapp/emoji/" + emoji[matches[j]].file;

			if(emoji[matches[j]]){
				emojiArr.push(url);
			}

			for (let i = 0, leng = txtArr.length; i < leng; ++i){
				if (txtArr[i] == matches[j]){
					txtArr[i] = {
						emoji:true,
						url:url
					}
				} else if (txtArr[i] == ''){
					delete txtArr[i];
				}
			}
		}

		txtArr.map(item => {
			newTextArr.push(item);
		});
		txtEmoji.push(newTextArr);
		txtEmoji.push(emojiArr);
		return txtEmoji;
	}
}
