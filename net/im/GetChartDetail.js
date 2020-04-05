import {RequestApi, RequestApiItem} from "../../utils/RequestApi";

// 初始化im
export class GetChartDetail extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "kdb";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/zdapi/im/history";
    }
}
