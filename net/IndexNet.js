import {RequestApi, RequestApiItem} from "../utils/RequestApi";

// 获取首页信息 java 置业顾问端
export class GetIndexInfo extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/consultant/getIndexInfo";
    }
    
    getNeedClientKey() {
        return true;
    }
}

// 切换楼盘
export class ChangeBuild extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/pad/userManage/changeBuild";
    }
    
    getNeedClientKey() {
        return true;
    }
}

// 楼盘管理员管理的楼盘列表
export class GetUserManageBuildList extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/pad/userManage/getUserManageBuildList";
    }
    
    getNeedClientKey() {
        return true;
    }
}

// 楼盘推广数
export class GetSpreadParam extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/pad/index/getSpreadParam";
    }
    
    getNeedClientKey() {
        return true;
    }
}

// 今日客户情况
export class TodayCustStc extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/dvlp/statistics/todayCustStc";
    }
    
    getNeedClientKey() {
        return true;
    }
}

// 客户转化率
export class CustStatisticInfo extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/dvlp/statistics/custStatisticInfo";
    }
    
    getNeedClientKey() {
        return true;
    }
}

// 销售占比
export class SellProportion extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/dvlp/cust/sellProportion";
    }
    
    getNeedClientKey() {
        return true;
    }
}
