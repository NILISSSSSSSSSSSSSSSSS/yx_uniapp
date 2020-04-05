import {RequestApi, RequestApiItem} from "../../utils/RequestApi";

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
    
    getNeedClientKey() {
        return false;
    }
}
