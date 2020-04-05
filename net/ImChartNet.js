import {RequestApi, RequestApiItem} from "../utils/RequestApi";


// 初始化im
export class InitImChart extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "kdb";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/api/im/index";
    }
}

// 系统消息列表
export class GetSysMessageAction extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/uuhfWeb/systemMessageManager/getsysMessageAction";
    }
}

// 更新系统消息列表红点
export class UpdateSysMsgReadPoint extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/uuhfWeb/systemMessageManager/updateSysmsg4Readed";
    }
}

// 获取经纪人所在公司信息
export class GetBrokerContactInfo extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/uuhfWeb/archiveManager/getBrokerContactInfo";
    }
}

// 领取优惠券
export class ReceiveCoupon extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "kdb";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/zdapi/active/receiveCouponAction";
    }
}

// 获取优惠券信息
export class GetCouponDetail extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "kdb";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/zdapi/active/getCouponReceiveInfo";
    }
}

// 进入app调用（每隔十分钟再调用一次）
export class UpdateUserLoginInfo extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "kdb";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/zdapi/appUser/updateUserLoginInfo";
    }
}

// 撩客：进入和收藏
export class SendAutomaticMessage extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/uuhfWeb/houseInfoManager/sendAutomaticMessage";
    }
}

// 撩客：微店区域筛选后并且有房源
export class SendWeiDianMessage extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/uuhfWeb/houseInfoManager/sendWeiDianMessage";
    }
}

// 撩客：回复撩客消息
export class ReplyChart extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.method = "post";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/uuhfWeb/openApi/entrust/replyChart";
    }
}

// 创建拨打记录
//callType 1语音拨打 2直拨 3IP拨打 4;400拨打 5:IM聊天 其中1语音拨打 3IP拨打小程序不行
// callType: 5,
// cityId: that.data.cityId,
// callImid: callImid,
// calledImid: calledImid,
// callSource: callSource,
// resource: that.data.resource,
// deviceType: tool.isIOS() ? 2 : 1,
// caseId: that.data.caseType,
// caseType: that.data.caseType
export class CreateCallHistory extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "kdb";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/zdapi/app/createCallHistory";
    }
}

// 获取聊天列表
class GetChartListRequest extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "uuweb";
        item.method = "get";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/Mini/Im/getContactList";
    }
}
export class GetChartList {
    response = {};
    constructor(response) {
        this.response = response;
    }
    
    send() {
        return new GetChartListRequest(this.response).send()
            .then((res) => {
                if(!res.data || !res.data.contactList) {
                    res["data"] = {
                        contactList: res.contactList || []
                    }
                }
                return res;
            })
    }
}

// im 获取委托房源列表
export class GetImEntrustHouseList extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "kdb";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/zdapi/im/queryImEntrustHouseList";
    }
}

// 客服问题数组
export class GetServiceProblemList extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "kdb";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/zdapi/im/getCustomerConsultation";
    }
}

// 判断是否是屏蔽
export class IsInBlackList extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "kdb";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/zdapi/im/isInBlackList";
    }
}

// 客服智能回复
export class SmartService extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "kdb";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/zdapi/im/smartServiceNew";
    }
}

// 获取云信token
export class GetYunXinToken extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/kdbWeb/brokerApi/im/getYunXinToken";
    }
    
    getNeedClientKey() {
        return true;
    }
    
    getHeader() {
        return {
            "U-FS": "erpappv1",
            'appSource' : '5',
        }
    }
}
