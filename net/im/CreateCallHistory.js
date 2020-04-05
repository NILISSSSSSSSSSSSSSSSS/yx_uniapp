import {RequestApi, RequestApiItem} from "../../utils/RequestApi";

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
