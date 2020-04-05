

import { MsgEntrustPushModel } from "../model/im/MsgEntrustPushModel.js";
import { UserInfoModel } from "../model/UserInfoModel.js";
import { Notify } from "../utils/Notify.js";
import { Notification } from "../utils/Notification.js";

// 将收到的委托推送消息设置到缓存;
export class DealLastMsg {
    // archiveId: {text: "", timeStr: "时间戳"};
    static dataMap = new MsgEntrustPushModel().getModel() || {};

    static upDataMap() {
        this.dataMap = new MsgEntrustPushModel().getModel() || {};
	}

    static getData(archiveId) {
        this.upDataMap();
        return this.dataMap[archiveId] || {};
    }

    static setData(archiveId, data) {
        this.upDataMap();
        data[archiveId] = archiveId;
        this.dataMap[archiveId] = data;
		new MsgEntrustPushModel().setModel(this.dataMap)
    }
}

// 根据IM推送的消息类型，做本地分发推送
export class MsgPush {
    eventMap = new Map();
    type = "";  // 接收到消息类型

    constructor(type) {
        // 后台换了类型，就不用这个了
        // this.type = type;
        this.initEventMap();
    }

    initEventMap() {
        this.eventMap
            .set("BROKER_RECEIVE", [ReceiveOrder])    // 接收订单
            .set("BROKER_RECOM_HOUSE", [RecommendHouse])   // 推荐房源
            .set("BROKER_INVITE_EVA", [TakeLookEvaluate])   // 带看评价
            .set("BROKER_PAY_TIP", [CommissionPay])   // 佣金支付
            .set("entrustLookHouse", [EntrustLookHouse])
            .set("entrustFinishLookHouse", [EntrustFinishLookHouse])
            .set("entrustDealService", [EntrustDealService])
            .set("robEntrustPublish", [RobEntrustPublish])
            .set("robEntrustEdit", [RobEntrustEdit])
            .set("robEntrustLowerShelfCancel", [RobEntrustLowerShelfCancel])
            .set("robEntrustRemind", [RobEntrustRemind])
    }

    push(msg) {
        this.type = msg.msg_type || "";
        // 为了应变后台这块这样操作
        if (msg.pushLogId) {
            this.type = "BROKER_RECEIVE";
        }
        let list = this.eventMap.has(this.type) ? this.eventMap.get(this.type) || [] : [];
        for (let event of list) {
            new event(msg);
        }
        // 如果有委托推送im消息则推送一条通知
        if(list.length > 0) {
            new Notification().postNotification(Notify.NewMsgChanged.Name,
                {type: Notify.NewMsgChanged.Type_entrust});
        }
    }
}


// 页面跳转处理
class PageToDeal {
	constructor() {}

	// 跳转到委托详情
	getEntrustDetailUrl(caseType, entrustId) {
		let url = "/pagesEntrust/prizeTrustDetail/prizeTrustDetail?entrustId=" + entrustId;
		if (caseType == 2 || caseType == 1) {
		    // 卖房、出租委托详情
		    url = "/pagesEntrust/entrustDetail/entrustDetail?entrustId=" + entrustId;
		}
		return url;
	}

	// 跳转到im详情
	getImDetailUrl(archiveId) {
		let me = new UserInfoModel().getModel("me") || {};
		let accid = new UserInfoModel().getModel("accid") || "";
		let openId = me.openId || "";
		let messageId = archiveId;
		let userId = me.userId || "";
		let url = "/pagesTool/messageDetailH5/messageDetailH5";
		// #ifdef H5 || MP-WEIXIN
		url = "/pagesTool/messageDetail/messageDetail";
		// #endif
		return (url + "?userId=" + userId + "&openId=" + openId
			+ "&messageId=" + messageId + "&accid=" + accid);
	}
}


// 基类
class DefaultMsg {
    msg = {};
    constructor(msg = {}) {
        this.msg = msg;
        this.dealMsg();
        DealLastMsg.setData(this.msg.archiveId,
            {text: this.msg.content, timeStr: new Date().getTime()});
        // 判断是否需要推送
        if (!this.checkIsPush()) return;

        // 创建单例 防止多次创建弹窗，弹窗销毁后再创建下一个
        if (!DefaultMsg.instance) {
            this.init();
            DefaultMsg.instance = this;
        }
        return DefaultMsg.instance;
    }

    // 简单地处理一下数据，具体的处理方式由子类决定
    dealMsg() {
        let msg = this.msg;
        msg.title = msg.detail_title || "";
        msg.content = msg.detail_content || "";
        msg.entrustId = msg.pushLogId || "";
        msg.archiveId = msg.fromArchiveId || "";
        msg.caseType = msg.caseType || "";
        this.msg = msg;
    }

    // 子类去实现具体的方法
    init() {};

    // 销毁单例
    destroyInstance() {
        DefaultMsg.instance = null;
    }

    // 模态窗参数
    modalItem() {
        class Item {
            title = "";
            content = "";
            cancelText = "取消";
            cancelColor = "#a6a6a6";
            confirmText = "确定";
            confirmColor = "#ff5400";
        }
        return new Item();
    }

    setModal(item = this.modalItem(), confirm = function () {}, cancel = function () {}) {
        let that = this;
        uni.showModal({
            title: item.title,
            content: item.content,
            showCancel: true,
            cancelColor: item.cancelColor || "#a6a6a6",
            cancelText: item.cancelText || "取消",
            confirmText: item.confirmText || "确定",
            confirmColor: item.confirmColor || "#ff5400",
            success: res=>{
                that.destroyInstance();
                if (res.confirm) {
                    confirm(res);
                    return;
                }

                cancel(res);
            }
        })
    }

    // 页面跳转
    pageTo(url, method = "navigateTo") {
        if (!uni[method]) {
            throw new Error("该页面跳转方法不存在");
        }

        uni[method]({
            url: url
        });
    }

    // 判断是否需要推送
    checkIsPush() {}
}

// 接收订单
class ReceiveOrder extends DefaultMsg{
    constructor(msg) {
        super(msg);
    }

    // msg => caseType;entrustId: 委托id;
    init() {
        if (!this.msg.title) {
            throw new Error("暂无title");
        }
        if (!this.msg.content) {
            throw new Error("暂无content");
        }
        if (!this.msg.caseType) {
            throw new Error("暂无caseType");
        }
        if (!this.msg.entrustId) {
            throw new Error("暂无委托id");
        }
        let item = super.modalItem();
        item.title = this.msg.title;
        item.content = this.msg.content;
        item.confirmText = "立即查看";
        super.setModal(item, () => {
            super.pageTo(new PageToDeal().getEntrustDetailUrl(this.msg.caseType, this.msg.entrustId));
        });
    }

    checkIsPush() {
        let routes = getCurrentPages() || [];
        if (routes.length === 0) return true;

        let currentPage = routes[routes.length - 1].route || "";
        if (!currentPage) return true;

        let noNeedPushPages = [
            "pagesTool/messageDetail/messageDetail",
			"pagesTool/messageDetailH5/messageDetailH5",
            "pages/message/message",
            "pagesEntrust/trustList/trustList",
            "pagesEntrust/entrustDetail/entrustDetail",
            "pagesTool/messageDetail/systemMessage"
        ];
        for (let page of noNeedPushPages) {
            if (currentPage.indexOf(page) >= 0) {
                return false;
            }
        }

        return true;
    }
}

// 推荐房源
class RecommendHouse extends DefaultMsg{
    constructor(msg) {
        super(msg);
    }

    // msg => archiveId: 经纪人id;
    init() {
        if (!this.msg.title) {
            throw new Error("暂无title");
        }
        if (!this.msg.archiveId) {
            throw new Error("暂无经纪人id");
        }
        if (!this.msg.content) {
            throw new Error("暂无content");
        }
        let item = super.modalItem();
        item.title = this.msg.title;
        item.content = this.msg.content;
        item.confirmText = "立即查看";
        super.setModal(item, () => {
            super.pageTo(new PageToDeal().getImDetailUrl(this.msg.archiveId));
        });
    }

    checkIsPush() {
        let routes = getCurrentPages() || [];
        if (routes.length === 0) return true;

        let currentPage = routes[routes.length - 1].route || "";
        if (!currentPage) return true;

        let noNeedPushPages = [
            "pagesTool/messageDetail/messageDetail",
            "pagesTool/messageDetailH5/messageDetailH5",
            "pages/message/message",
            "pagesEntrust/trustList/trustList",
            "pagesEntrust/entrustDetail/entrustDetail",
            "pagesTool/messageDetail/systemMessage"
        ];
        for (let page of noNeedPushPages) {
            if (currentPage.indexOf(page) >= 0) {
                return false;
            }
        }

        return true;
    }
}

// 带看评价
class TakeLookEvaluate extends DefaultMsg{
    constructor(msg) {
        super(msg);
    }

    // msg => archiveId: 经纪人id;
    init() {
        if (!this.msg.title) {
            throw new Error("暂无title");
        }
        if (!this.msg.content) {
            throw new Error("暂无content");
        }
        if (!this.msg.archiveId) {
            throw new Error("暂无经纪人id");
        }
        let item = super.modalItem();
        item.title = this.msg.title;
        item.content = this.msg.content;
        item.confirmText = "立即查看";
        super.setModal(item, () => {
            super.pageTo(new PageToDeal().getImDetailUrl(this.msg.archiveId));
        });
    }

    checkIsPush() {
        let routes = getCurrentPages() || [];
        if (routes.length === 0) return true;

        let currentPage = routes[routes.length - 1].route || "";
        if (!currentPage) return true;

        let noNeedPushPages = [
            "pagesTool/messageDetail/messageDetail",
            "pagesTool/messageDetailH5/messageDetailH5",
            "pages/message/message",
            "pagesEntrust/trustList/trustList",
            "pagesEntrust/entrustDetail/entrustDetail",
            "pagesTool/messageDetail/systemMessage"
        ];
        for (let page of noNeedPushPages) {
            if (currentPage.indexOf(page) >= 0) {
                return false;
            }
        }

        return true;
    }
}

// 佣金支付
class CommissionPay extends DefaultMsg{
    constructor(msg) {
        super(msg);
    }

    // msg => archiveId: 经纪人id;
    init() {
        if (!this.msg.title) {
            throw new Error("暂无title");
        }
        if (!this.msg.content) {
            throw new Error("暂无content");
        }
        if (!this.msg.archiveId) {
            throw new Error("暂无经纪人id");
        }
        let item = super.modalItem();
        item.title = this.msg.title;
        item.content = this.msg.content;
        item.confirmText = "立即查看";
        super.setModal(item, () => {
			super.pageTo(new PageToDeal().getImDetailUrl(this.msg.archiveId));
        });
    }

    checkIsPush() {
        let routes = getCurrentPages() || [];
        if (routes.length === 0) return true;

        let currentPage = routes[routes.length - 1].route || "";
        if (!currentPage) return true;

        let noNeedPushPages = [
            "pagesTool/messageDetail/messageDetail",
            "pagesTool/messageDetailH5/messageDetailH5",
            "pages/message/message",
            "pagesEntrust/trustList/trustList",
            "pagesEntrust/entrustDetail/entrustDetail",
            "pagesTool/messageDetail/systemMessage"
        ];
        for (let page of noNeedPushPages) {
            if (currentPage.indexOf(page) >= 0) {
                return false;
            }
        }

        return true;
    }
}

// 专属委托 -- 看房通知
class EntrustLookHouse extends DefaultMsg{
    constructor(msg) {
        super(msg);
    }

    // msg => entrustId: 委托id;caseType;
    init() {
        if (!this.msg.title) {
            throw new Error("暂无title");
        }
        if (!this.msg.content) {
            throw new Error("暂无content");
        }
        if (!this.msg.entrustId) {
            throw new Error("暂无委托id");
        }
        if (!this.msg.caseType) {
            throw new Error("暂无caseType");
        }
        let item = super.modalItem();
        item.title = this.msg.title;
        item.content = this.msg.content;
        item.confirmText = "立即查看";
        super.setModal(item, () => {
			super.pageTo(new PageToDeal().getEntrustDetailUrl(this.msg.caseType, this.msg.entrustId));
        });
    }

    checkIsPush() {
        let routes = getCurrentPages() || [];
        if (routes.length === 0) return true;

        let currentPage = routes[routes.length - 1].route || "";
        if (!currentPage) return true;

        let noNeedPushPages = [
            "pagesTool/messageDetail/messageDetail",
            "pagesTool/messageDetailH5/messageDetailH5",
            "pages/message/message",
            "pagesEntrust/trustList/trustList",
            "pagesEntrust/entrustDetail/entrustDetail",
            "pagesTool/messageDetail/systemMessage"
        ];
        for (let page of noNeedPushPages) {
            if (currentPage.indexOf(page) >= 0) {
                return false;
            }
        }

        return true;
    }
}

// 专属委托 -- 经纪人完成看房（委托中）
class EntrustFinishLookHouse extends DefaultMsg{
    constructor(msg) {
        super(msg);
    }

    // msg => entrustId: 委托id;caseType;
    init() {
        if (!this.msg.title) {
            throw new Error("暂无title");
        }
        if (!this.msg.content) {
            throw new Error("暂无content");
        }
        if (!this.msg.entrustId) {
            throw new Error("暂无委托id");
        }
        if (!this.msg.caseType) {
            throw new Error("暂无caseType");
        }
        let item = super.modalItem();
        item.title = this.msg.title;
        item.content = this.msg.content;
        item.confirmText = "立即查看";
        super.setModal(item, () => {
            super.pageTo(new PageToDeal().getEntrustDetailUrl(this.msg.caseType, this.msg.entrustId));
        });
    }

    checkIsPush() {
        let routes = getCurrentPages() || [];
        if (routes.length === 0) return true;

        let currentPage = routes[routes.length - 1].route || "";
        if (!currentPage) return true;

        let noNeedPushPages = [
            "pagesTool/messageDetail/messageDetail",
            "pagesTool/messageDetailH5/messageDetailH5",
            "pages/message/message",
            "pagesEntrust/trustList/trustList",
            "pagesEntrust/entrustDetail/entrustDetail",
            "pagesTool/messageDetail/systemMessage"
        ];
        for (let page of noNeedPushPages) {
            if (currentPage.indexOf(page) >= 0) {
                return false;
            }
        }

        return true;
    }
}

// 专属委托 -- 成交后服务评价
class EntrustDealService extends DefaultMsg{
    constructor(msg) {
        super(msg);
    }

    // msg => entrustId: 委托id;caseType;
    init() {
        if (!this.msg.title) {
            throw new Error("暂无title");
        }
        if (!this.msg.content) {
            throw new Error("暂无content");
        }
        if (!this.msg.entrustId) {
            throw new Error("暂无委托id");
        }
        if (!this.msg.caseType) {
            throw new Error("暂无caseType");
        }
        let item = super.modalItem();
        item.title = this.msg.title;
        item.content = this.msg.content;
        item.confirmText = "立即查看";
        super.setModal(item, () => {
            super.pageTo(new PageToDeal().getEntrustDetailUrl(this.msg.caseType, this.msg.entrustId));
        });
    }

    checkIsPush() {
        let routes = getCurrentPages() || [];
        if (routes.length === 0) return true;

        let currentPage = routes[routes.length - 1].route || "";
        if (!currentPage) return true;

        let noNeedPushPages = [
            "pagesTool/messageDetail/messageDetail",
            "pagesTool/messageDetailH5/messageDetailH5",
            "pages/message/message",
            "pagesEntrust/trustList/trustList",
            "pagesEntrust/entrustDetail/entrustDetail",
            "pagesTool/messageDetail/systemMessage"
        ];
        for (let page of noNeedPushPages) {
            if (currentPage.indexOf(page) >= 0) {
                return false;
            }
        }

        return true;
    }
}

// 抢单委托 -- 发布审核
class RobEntrustPublish extends DefaultMsg{
    constructor(msg) {
        super(msg);
    }

    // msg => entrustId: 委托id;caseType;
    init() {
        if (!this.msg.title) {
            throw new Error("暂无title");
        }
        if (!this.msg.content) {
            throw new Error("暂无content");
        }
        if (!this.msg.entrustId) {
            throw new Error("暂无委托id");
        }
        if (!this.msg.caseType) {
            throw new Error("暂无caseType");
        }
        let item = super.modalItem();
        item.title = this.msg.title;
        item.content = this.msg.content;
        item.confirmText = "立即查看";
        super.setModal(item, () => {
            super.pageTo(new PageToDeal().getEntrustDetailUrl(this.msg.caseType, this.msg.entrustId));
        });
    }

    checkIsPush() {
        let routes = getCurrentPages() || [];
        if (routes.length === 0) return true;

        let currentPage = routes[routes.length - 1].route || "";
        if (!currentPage) return true;

        let noNeedPushPages = [
            "pagesTool/messageDetail/messageDetail",
            "pagesTool/messageDetailH5/messageDetailH5",
            "pages/message/message",
            "pagesEntrust/trustList/trustList",
            "pagesEntrust/entrustDetail/entrustDetail",
            "pagesTool/messageDetail/systemMessage"
        ];
        for (let page of noNeedPushPages) {
            if (currentPage.indexOf(page) >= 0) {
                return false;
            }
        }

        return true;
    }
}

// 抢单委托 -- 修改审核
class RobEntrustEdit extends DefaultMsg{
    constructor(msg) {
        super(msg);
    }

    // msg => entrustId: 委托id;caseType;
    init() {
        if (!this.msg.title) {
            throw new Error("暂无title");
        }
        if (!this.msg.content) {
            throw new Error("暂无content");
        }
        if (!this.msg.entrustId) {
            throw new Error("暂无委托id");
        }
        if (!this.msg.caseType) {
            throw new Error("暂无caseType");
        }
        let item = super.modalItem();
        item.title = this.msg.title;
        item.content = this.msg.content;
        item.confirmText = "立即查看";
        super.setModal(item, () => {
            super.pageTo(new PageToDeal().getEntrustDetailUrl(this.msg.caseType, this.msg.entrustId));
        });
    }

    checkIsPush() {
        let routes = getCurrentPages() || [];
        if (routes.length === 0) return true;

        let currentPage = routes[routes.length - 1].route || "";
        if (!currentPage) return true;

        let noNeedPushPages = [
            "pagesTool/messageDetail/messageDetail",
            "pagesTool/messageDetailH5/messageDetailH5",
            "pages/message/message",
            "pagesEntrust/trustList/trustList",
            "pagesEntrust/entrustDetail/entrustDetail",
            "pagesTool/messageDetail/systemMessage"
        ];
        for (let page of noNeedPushPages) {
            if (currentPage.indexOf(page) >= 0) {
                return false;
            }
        }

        return true;
    }
}

// 抢单委托 -- 下架取消委托
class RobEntrustLowerShelfCancel extends DefaultMsg{
    constructor(msg) {
        super(msg);
    }

    // msg => entrustId: 委托id;caseType;
    init() {
        if (!this.msg.title) {
            throw new Error("暂无title");
        }
        if (!this.msg.content) {
            throw new Error("暂无content");
        }
        if (!this.msg.entrustId) {
            throw new Error("暂无委托id");
        }
        if (!this.msg.caseType) {
            throw new Error("暂无caseType");
        }
        let item = super.modalItem();
        item.title = this.msg.title;
        item.content = this.msg.content;
        item.confirmText = "立即查看";
        super.setModal(item, () => {
            super.pageTo(new PageToDeal().getEntrustDetailUrl(this.msg.caseType, this.msg.entrustId));
        });
    }

    checkIsPush() {
        let routes = getCurrentPages() || [];
        if (routes.length === 0) return true;

        let currentPage = routes[routes.length - 1].route || "";
        if (!currentPage) return true;

        let noNeedPushPages = [
            "pagesTool/messageDetail/messageDetail",
            "pagesTool/messageDetailH5/messageDetailH5",
            "pages/message/message",
            "pagesEntrust/trustList/trustList",
            "pagesEntrust/entrustDetail/entrustDetail",
            "pagesTool/messageDetail/systemMessage"
        ];
        for (let page of noNeedPushPages) {
            if (currentPage.indexOf(page) >= 0) {
                return false;
            }
        }

        return true;
    }
}

// 抢单委托 -- 提醒业主经纪人查看信息
class RobEntrustRemind extends DefaultMsg{
    constructor(msg) {
        super(msg);
    }

    // msg => entrustId: 委托id;caseType;
    init() {
        if (!this.msg.title) {
            throw new Error("暂无title");
        }
        if (!this.msg.content) {
            throw new Error("暂无content");
        }
        if (!this.msg.entrustId) {
            throw new Error("暂无委托id");
        }
        if (!this.msg.caseType) {
            throw new Error("暂无caseType");
        }
        let item = super.modalItem();
        item.title = this.msg.title;
        item.content = this.msg.content;
        item.confirmText = "立即查看";
        super.setModal(item, () => {
            super.pageTo(new PageToDeal().getEntrustDetailUrl(this.msg.caseType, this.msg.entrustId));
        });
    }

    checkIsPush() {
        let routes = getCurrentPages() || [];
        if (routes.length === 0) return true;

        let currentPage = routes[routes.length - 1].route || "";
        if (!currentPage) return true;

        let noNeedPushPages = [
            "pagesTool/messageDetail/messageDetail",
            "pagesTool/messageDetailH5/messageDetailH5",
            "pages/message/message",
            "pagesEntrust/trustList/trustList",
            "pagesEntrust/entrustDetail/entrustDetail",
            "pagesTool/messageDetail/systemMessage"
        ];
        for (let page of noNeedPushPages) {
            if (currentPage.indexOf(page) >= 0) {
                return false;
            }
        }

        return true;
    }
}

