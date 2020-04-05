import {RequestApi, RequestApiItem} from "../utils/RequestApi";

// 获取客户列表 http://hft.myfun7.com/newBuildWeb/pad/cust/getCustList
export class GetCustList extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/pad/cust/getCustList";
    }

    getNeedClientKey(){
        return true;
    }
}

// 佣金列表获取门店数据 http://dev.51vfang.cn/newBuildWeb/dvlp/commission/commissionList
export class GetCommissionList extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/dvlp/commission/commissionList";
    }

    getNeedClientKey(){
        return true;
    }
}

// 佣金列表下查询某门店客户信息 http://dev.51vfang.cn/newBuildWeb/dvlp/commission/deptCustInfoList
export class GetDeptCustInfoList extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/dvlp/commission/deptCustInfoList";
    }

    getNeedClientKey(){
        return true;
    }
}

// 获取用户详情 http://hft.myfun7.com/newBuildWeb/app/newBuild/custBiz/getCustDetailInfo
export class GetCustDetailInfo extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/app/newBuild/custBiz/getCustDetailInfo";
    }

    getNeedClientKey(){
        return true;
    }
}

// 更改客户状态
export class UpdateCustStatus extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/app/newBuild/updateCustStatus";
    }

    getNeedClientKey(){
        return true;
    }
}

// 申请权限
export class ApplyNextStep extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/app/newBuild/requestNextStep"
    }

    getNeedClientKey(){
        return true;
    }
}

// 认购下拉户型接口 http://dev.51vfang.cn/newBuildWeb/openApi/build/getBuildLayouts
export class GetBuildLayouts extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/openApi/build/getBuildLayouts"
    }

    getNeedClientKey(){
        return true;
    }
}

// 获取员工列表 http://dev.51vfang.cn/newBuildWeb/pad/userManage/getAllUserList
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
