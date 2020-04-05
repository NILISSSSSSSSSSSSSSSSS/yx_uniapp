import {RequestApi, RequestApiItem} from "../utils/RequestApi";

// 楼盘列表
export class ListUserRelativeBuilding extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/pad/building/listUserRelativeBuilding";
  }
}

// 添加编辑楼盘
export class SaveBuildingInfo extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/pad/building/saveBuildingInfo";
  }
}

// 楼盘 - 详情
export class GetBuildDetails extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/pad/newBuild/getBuildDetails";
  }
}

// 楼盘详情 - 置业顾问端
export class GetNewBuildDetail extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/app/newBuild/getNewBuildDetail";
  }
}

// 详情
export class GetNewBuildBasicDetail extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/app/newBuild/getNewBuildBasicDetail";
  }
}

// 户型
export class GetHouseTypeImagesList extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/app/newBuild/getHouseTypeImagesList";
  }
}

// 佣金方案
export class GetCommissionDetail extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/app/newBuild/getCommissionDetail";
  }
}

// 获取相册列表 - 商家端
export class GetBuildPhotoList extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/pad/newBuild/getBuildPhotoList";
  }
}

// 获取相册列表 - 置业顾问端
export class GetNewBuildPhotoListByType extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/app/newBuild/getNewBuildPhotoListByType";
  }
}

// 楼盘动态列表 - 商家端
export class GetActivityList extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/pad/spread/getActivityList";
  }
}

// 楼盘动态列表 - 置业顾问端
export class GetBuildDynamicList extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/app/newBuild/getBuildDynamicList";
  }
}

// 楼盘动态详情
export class GetBuildDynamicDetails extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/app/newBuild/getBuildDynamicDetails";
  }
}

// 拓客技巧详情
export class GetTalkSkills extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/app/newBuild/getTalkSkills";
  }
}

// 楼盘卖点详情
export class GetBuildSellingPointDetailsList extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/app/newBuild/getBuildSellingPointDetailsList";
  }
}

// 发布楼盘动态
export class CreateActivity extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/pad/spread/createActivity";
  }
}

// 获取保存的楼盘信息
export class GetBuildingInfo extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/pad/building/getBuildingInfo";
  }
}

// 楼盘相册上传
export class AddBuildPhoto extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/pad/newBuild/addBuildPhoto";
  }
}

// 楼盘相册删除
export class DeleteOneLayOutPhoto extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/pad/newBuild/deleteOneLayOutPhoto";
  }
}

// 分销户型列表
export class GetLayOutPhotoList extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/pad/newBuild/getLayOutPhotoList";
  }
}

// 添加分销户型
export class AddAndChangLayOutPhoto extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/pad/newBuild/addAndChangLayOutPhoto";
  }
}

// 删除户型 layoutId
export class DeleteLayOut extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/pad/newBuild/deleteLayOut";
  }
}

// 编辑合作规则 佣金规则 注意事项
export class SaveCooperationRule extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/pad/cooperationRule/saveCooperationRule";
  }
}

// 获取合作规则 佣金规则 注意事项
export class GetCooperationRule extends RequestApi{
  constructor(responseData) {
    let item = new RequestApiItem();
    item.domain = "java";
    item.data = responseData;
    super(item);
  }
  
  getUrl() {
    return "/newBuildWeb/pad/cooperationRule/getCooperationRule";
  }
}
