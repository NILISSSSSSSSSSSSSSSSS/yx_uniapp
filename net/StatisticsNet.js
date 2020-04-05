import {RequestApi, RequestApiItem} from "../utils/RequestApi";

export class GetStatisticalAnalysis extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/commssion/getStatisticalAnalysis";
    }
}
// 交易走势
export class CommissionDealTrend extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }  
    getUrl() {
        return "/newBuildWeb/dvlp/commission/dealTrend";
    }
    getNeedClientKey(){
        return true;
    }
}
//客户转化对比
export class CustDataInfo extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }   
    getUrl() {
        return "/newBuildWeb/dvlp/statistics/custDataInfo";
    }
    getNeedClientKey(){
        return true;
    }
}
// 客户转化率
export class CustStatisticInfo extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }   
    getUrl() {
        return "/newBuildWeb/dvlp/statistics/custStatisticInfo";
    }
    getNeedClientKey(){
        return true;
    }
}
// 户型销售占比
export class SellProportion extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }   
    getUrl() {
        return "/newBuildWeb/dvlp/cust/sellProportion";
    }
    getNeedClientKey(){
        return true;
    }
}
// 门店排行
export class GetDptsCustRanking extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }   
    getUrl() {
        return "/newBuildWeb/dvlp/statistics/getDptsCustRanking"
    }
    getNeedClientKey(){
        return true;
    }
}
// 起始日期初始化
export class CustReportSmallTime extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }   
    getUrl() {
        return "/newBuildWeb/dvlp/cust/custReportSmallTime"
    }
    getNeedClientKey(){
        return true;
    }
}
