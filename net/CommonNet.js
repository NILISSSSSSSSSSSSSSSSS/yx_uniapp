import {RequestApi, RequestApiItem} from "../utils/RequestApi";
import {Config} from "../config/config";

// 获取城市信息根据gps
export class GetCityInfoByGps extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "kdb";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/api/index/getCityIdByLocation";
    }
}

// 收集formId {formId: formId,
//         userId: userId,
//         openId: openId,}
export class CollectFormId extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "uuweb";
        item.method = "get";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/mini/app/collectFormIdNew";
    }
}


// 获取行政区商圈列表
export class GetRegSection extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "kdbJava";
        if (Config.env === "dev") {
            item.domain = "http://dev.51vfang.cn"
        }
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/kdbWeb/openApi/sys/getRegSection";
    }
    
    getNeedClientKey() {
        return false;
    }
}

// 获取数据字典
export class GetDicMessage extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "kdbJava";
        if (Config.env === "dev") {
            item.domain = "http://dev.51vfang.cn"
        }
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/kdbWeb/openApi/sys/getDicMessage";
    }
    
    getNeedClientKey() {
        return false;
    }
}

// 通过code解析openId
export class GetOpenIdByCode extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "publicWeb";
        item.data = responseData;
        item.method = "get";
        super(item);
    }
    
    getUrl() {
        return "/api/weixin/getOpenIdByCode";
    }
    
    getNeedClientKey() {
        return false;
    }
}

// 更新微信openId
export class UpdateUserWxOpenId extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/openApi/org/updateUserWxOpenId";
    }
    
    getNeedClientKey() {
        return true;
    }
}

