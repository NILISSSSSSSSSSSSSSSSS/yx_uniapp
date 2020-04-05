import {RequestApi, RequestApiItem} from "../../utils/RequestApi";

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
        item.domain = "uuhf";
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
        item.domain = "uuhf";
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
        item.domain = "uuhf";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/uuhfWeb/archiveManager/getBrokerContactInfo";
    }
}
