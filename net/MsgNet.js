import {RequestApi, RequestApiItem} from "../utils/RequestApi";
import {Config} from "../config/config";


// 通讯录 置业顾问端
export class GetBrokerList extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/app/newBuild/getBrokerList";
    }
    
    getNeedClientKey() {
        return true;
    }
}


// 获取通讯录 java
export class GetConsultantList extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/app/newBuild/getConsultantList";
    }
    
    getNeedClientKey() {
        return true;
    }
}

// 获取经纪人电话
export class GetUserMobile extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/app/newBuild/getUserMobile";
    }
    
    getNeedClientKey() {
        return true;
    }
}

// 开发商端获取所有员工
export class GetAllUserList extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/pad/userManage/getAllUserList";
    }
    
    getNeedClientKey() {
        return true;
    }
    
    getHeader() {
        return {
            deviceType: 2
        }
    }
}


// 获取置业顾问信息
export class UserDeptName extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/dvlp/cust/userDeptName";
    }
    
    getNeedClientKey() {
        return true;
    }
    
    getHeader() {
        return {
            deviceType: 2
        }
    }
}

// 获取经纪人信息
export class GetBrokerContactInfo extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/uuhfWeb/archiveManager/getBrokerContactInfo";
    }
    
    getNeedClientKey() {
        return false;
    }
    
    getHeader() {
        return {
            "content-type": "application/x-www-form-urlencoded",
            "U-FS": "zdzfmini"
        }
    }
}

