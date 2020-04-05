import {DefaultModel} from "../DefaultModel";
import {Notification} from "../../utils/Notification";
import {Notify} from "../../utils/Notify";
import {Const} from "../../utils/Const";
import {ImChart, ImChartConst, UpUnReadNumTab} from "../../utils/ImChart";
import {ConsultantListModel, GetLoginModel} from "../LoginSuccessModel";
import {ProjectConfigConst} from "../../utils/ProjectConfigConst";


// IM列表model
export class ChatListModel extends DefaultModel{
    constructor() {
        super();
    }

    getKey() {
        return "ChatListModel"
    }

    getIsLocal() {
        return true;
    }
}

// 处理本地列表
export class DealChartListModel {
    // 会话的 messageId 指的就是 archiveId
    messageId = "";

    constructor(messageId) {
        this.messageId = messageId;
    }

    // 发送会话列表改变的通知
    sendMsgListNc() {
        setTimeout(() => {
            new Notification().postNotification(Notify.UpChartListChanged.Name);
        }, 100);
    }

    // 获取当前会话map
    getMessageMap() {
        if(!this.messageId) return {};
    
        let userId = GetLoginModel.getUserId() || "";
        let listModel = new ChatListModel().getModel() || {};
        let map = listModel[userId] || {};
        return map[this.messageId] || {};
    }

    // 更新当前会话map
    upMessageMap(item = {}) {
        if(!this.messageId) return;
    
        let userId = GetLoginModel.getUserId() || "";
        let listModel = new ChatListModel().getModel() || {};
        let map = listModel[userId] || {};
        if(Object.keys(item).length === 0) return;

        map[this.messageId] = item;
        listModel[userId] = map;
        new ChatListModel().setModel(listModel);
    }

    // 获取聊天列表
    getMsgList() {
        let userId = GetLoginModel.getUserId() || "";
        let listModel = new ChatListModel().getModel() || {};
        let map = listModel[userId] || {};
        if (Object.keys(map).length > 0) {
            return Object.keys(map).map(key=> map[key]);
        }

        return [];
    }

    // 屏蔽和解除屏蔽
    // blockUserId 屏蔽的id
    // status == true ? 屏蔽 : 解除屏蔽
    blockMsg(status) {
        let obj = this.getMessageMap();
        obj.isShield = status ? 1 : 0;
        obj.isShowBtn = false;
        this.upMessageMap(obj);
        this.sendMsgListNc();
    }

    // 删除消息
    // removeId 删除id
    deleteMsg() {
        if(!this.messageId) return;
    
        let userId = GetLoginModel.getUserId() || "";
        let listModel = new ChatListModel().getModel() || {};
        let map = listModel[userId] || {};
        if(!map[this.messageId]) return;

        delete map[this.messageId];
        // 同时删除对应的未读数
        UpUnReadNumTab.removeReadNum(this.messageId);
        listModel[userId] = map;
        new ChatListModel().setModel(listModel);
        this.sendMsgListNc();
    }
    
    // 更新置顶
    upTopStatus(isTop) {
        if(!this.messageId) return;
    
        let userId = GetLoginModel.getUserId() || "";
        let listModel = new ChatListModel().getModel() || {};
        let map = listModel[userId] || {};
        if(!map[this.messageId]) return;
    
        map[this.messageId].isTop = isTop;
        listModel[userId] = map;
        new ChatListModel().setModel(listModel);
        this.sendMsgListNc();
    }

    // 接受新消息
    newMsg(item, session = {}) {
        let userId = GetLoginModel.getUserId() || "";
        let listModel = new ChatListModel().getModel() || {};
        let map = listModel[userId] || {};
        let lastMsg = session.lastMsg || {};
        if (ProjectConfigConst.getNoDealIds().includes(session.to)) return;
        
        if(!item.messageId) return;
    
        // 获取用户信息
        ImChart.imChartVal.getUser({
            account: item.messageId,
            sync: true,
            done: (error, user) => {
                let obj = map[item.messageId] || {};
                let icon = obj.icon || Const.imDefaultHeadImg;
                if(user && user.avatar) {
                    icon = user.avatar;
                }
                if(new ConsultantListModel().getModel()
                    && new ConsultantListModel().getModel()[item.messageId]
                    && new ConsultantListModel().getModel()[item.messageId].avatar) {
                    icon = new ConsultantListModel().getModel()[item.messageId].avatar;
                }
                obj.msg_timestamp = item.msg_timestamp;
                obj.msg_type = item.msg_type;
                obj.body = item.msg;
                if(lastMsg.type === "custom") {
                    let content = JSON.parse(lastMsg.content);
                    if (content.type == ImChartConst.positionType) {
                        obj.body = content.data && content.data.locationAddTitle
                            ? `[位置] ${content.data.locationAddTitle}`
                            : item.msg;
                    }
                }
                obj.accid = item.messageId;
                obj.name = obj.name || item.name || "";
                if(item.messageId == lastMsg.from && lastMsg.fromNick) {
                    obj.name = lastMsg.fromNick;
                }
                if(user && user.nick) {
                    obj.name = user.nick;
                }
                obj.isShield = 0;
                obj.id = item.messageId;
                obj.from_account = item.messageId;
                obj.to = item.to;
                obj.msg_timestamp = item.msg_timestamp;
                obj.icon = icon;
                map[item.messageId] = obj;
                listModel[userId] = map;
                new ChatListModel().setModel(listModel);
                this.sendMsgListNc();
            }
        });
    }
}
