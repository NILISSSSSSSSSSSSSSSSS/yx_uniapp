import {RequestApi, RequestApiItem} from "../../utils/RequestApi";

// 获取聊天列表
class GetChartListRequest extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "uuweb";
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




