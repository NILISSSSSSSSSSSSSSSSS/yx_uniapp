import {RequestApi, RequestApiItem} from "../utils/RequestApi";

//　添加员工
export class AddStaff extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/pad/userManage/addUser";
    }

    getNeedClientKey(){
        return true;
    }
}

// 获取员工列表
export class GetAllUserListForStaff extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/pad/userManage/getAllUserList"
    }

    getNeedClientKey(){
        return true;
    }
}

// 注销员工
export class CancelUser extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/pad/userManage/cancelUser"
    }

    getNeedClientKey(){
        return true;
    }
}

// 设置权限
export class PermissionsAllocation extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/pad/userManage/permissionsAllocation"
    }

    getNeedClientKey(){
        return true;
    }
}

// 查询员工下的客户
export class GetCustListForStaff extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/dvlp/cust/getCustList"
    }

    getNeedClientKey(){
        return true;
    }
}

// 员工调动
export class ChangeBuildConsultant extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/pad/userManage/changeBuildConsultant"
    }
    
    getNeedClientKey(){
        return true;
    }
}

// 移交客户
export class TransferCust extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/pad/userManage/transferCust"
    }

    getNeedClientKey(){
        return true;
    }
}