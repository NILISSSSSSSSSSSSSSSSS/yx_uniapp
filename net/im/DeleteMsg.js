import {RequestApi, RequestApiItem} from "../../utils/RequestApi";

// 删除消息
export class DeleteMsg extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "uuweb";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/Mini/im/delLinkMan";
    }
}
