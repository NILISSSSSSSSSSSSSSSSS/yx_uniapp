import {RequestApi, RequestApiItem} from "../../utils/RequestApi";

// 进入app调用（每隔十分钟再调用一次）
export class UpdateUserLoginInfo extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "kdb";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "//zdapi/appUser/updateUserLoginInfo";
    }
}

// 撩客：进入和收藏
export class SendAutomaticMessage extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "uuhf";
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
        item.domain = "uuhf";
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
        item.domain = "uuhf";
		item.method = "post";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/uuhfWeb/openApi/entrust/replyChart";
    }
}