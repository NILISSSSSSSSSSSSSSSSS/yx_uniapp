import {RequestApi, RequestApiItem} from "../utils/RequestApi";

// 根据状态获取客户列表
export class GetCustomerListByStatus extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/app/newBuild/getCustListByStatus";
    }

    getNeedClientKey(){
        return true;
    }
}

// 获取客户列表
export class GetCustomerListByStatusNew extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/app/newBuild/getCustListByStatusNew";
    }

    getNeedClientKey(){
        return true;
    }
}

// 获取客户详情
export class GetCustomerDetailInfo extends RequestApi{
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

// 直客登记
export class AddDirectCustomer extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/pad/cust/addDirectCustomer";
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

// 上传带看确认书
export class UploadSeeReadConfirmation extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/app/newBuild/custBiz/uploadSeeReadConfirmation";
    }

    getNeedClientKey(){
        return true;
    }
}

// 删除带看确认书
export class DeleteSeeReadConfirmation extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/app/newBuild/custBiz/deleteSeeReadConfirmation";
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

// 获取经纪人管理列表
export class GetBrokerList extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/app/newBuild/getBrokerList";
    }

    getNeedClientKey(){
        return true;
    }
}

// 确认认购接口
export class RequestOrConfirmBuy extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/app/newBuild/requestOrConfirmBuy";
    }

    getNeedClientKey(){
        return true;
    }
}

//确认签约
export class RequestOrSign extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/app/newBuild/requestOrSign";
    }

    getNeedClientKey(){
        return true;
    }
}

//添加跟进
export class CreateTrack extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/app/newBuild/createTrack";
    }

    getNeedClientKey(){
        return true;
    }
}

//撤销认购 http://hft.myfun7.com/newBuildWeb/app/newBuild/requestOrSign
export class CancelConfirm extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/app/newBuild/cancelConfirm";
    }

    getNeedClientKey(){
        return true;
    }
}
