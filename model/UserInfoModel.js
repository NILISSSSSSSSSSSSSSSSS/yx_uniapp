import {DefaultModel} from "./DefaultModel";

// 包含me，userInfo: {}, telephone, me: {userId, openId}, accid, clientKey
export class UserInfoModel extends DefaultModel{
    constructor() {
        super();
    }

    getKey() {
        return "UserInfoModel"
    }
    
    getIsLocal() {
        return true;
    }
}
