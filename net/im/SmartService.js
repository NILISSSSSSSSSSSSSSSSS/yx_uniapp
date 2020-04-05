import {RequestApi, RequestApiItem} from "../../utils/RequestApi";

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
