import {RequestApi, RequestApiItem} from "../../utils/RequestApi";

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
