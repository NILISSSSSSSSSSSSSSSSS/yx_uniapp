import {RequestApi, RequestApiItem} from "../utils/RequestApi";

export class GetCommissionManageInfo extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/commssion/getCommissionManageInfo";
  }
}

export class GetBrokerCustList extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/app/newBuild/custBiz/getBrokerCustList";
  }
}
