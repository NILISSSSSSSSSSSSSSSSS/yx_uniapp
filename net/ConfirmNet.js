import {RequestApi, RequestApiItem} from "../utils/RequestApi";

// 扫描二维码后获取对应的报备用户信息
export class GetCustInfoAfterScanQrcode extends RequestApi{
    constructor(responseData) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = responseData;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/app/newBuild/getCustInfoAfterScanQrcode";
    }
  
  getNeedClientKey(){
    return true;
  }
}

// 允许或者拒绝（status = 0）报备
export class CheckCustInfoByQrCode extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/app/newBuild/checkCustInfoByQrCode";
  }
  
  getNeedClientKey(){
    return true;
  }
}
