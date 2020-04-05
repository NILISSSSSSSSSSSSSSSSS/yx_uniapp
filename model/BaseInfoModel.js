import {DefaultModel} from "./DefaultModel";
import {compare} from "../utils/common";


// 基本信息参数
export class BaseInfoModel extends DefaultModel{
    constructor() {
        super();
    }
    
    getKey() {
        return "BaseInfoModel"
    }
    
    getIsLocal() {
        return true;
    }
}

export class SetBaseInfoModel {
    // 区域列表
    static regList(regList) {
        let item = new BaseInfoModel().getModel() || {};
        item["regList"] = regList;
        new BaseInfoModel().setModel(item);
    }
    
    // 商圈map
    static sectionMap(sectionMap) {
        let item = new BaseInfoModel().getModel() || {};
        item["sectionMap"] = sectionMap;
        new BaseInfoModel().setModel(item);
    }
    
    // 字典dicDataMap
    static dicDataMap(dicDataMap) {
        let item = new BaseInfoModel().getModel() || {};
        item["dicDataMap"] = dicDataMap;
        new BaseInfoModel().setModel(item);
    }
    
    // 字典dicListMap
    static dicListMap(dicListMap) {
        let item = new BaseInfoModel().getModel() || {};
        item["dicListMap"] = dicListMap;
        new BaseInfoModel().setModel(item);
    }
}

export class GetBaseInfoModel {
    // 区域列表
    static regList() {
        let item = new BaseInfoModel().getModel() || {};
        return item["regList"] || [];
    }
    
    // 商圈map
    static sectionMap() {
        let item = new BaseInfoModel().getModel() || {};
        return item["sectionMap"] || {};
    }
    
    // 商圈列表
    static sectionList(regId) {
        let item = new BaseInfoModel().getModel() || {};
        let sectionMap = item["sectionMap"] || {};
        return sectionMap[regId] || [];
    }
    
    // 获取数据字典 通过dicCnMsg获取list
    static getDicListByType(dicType) {
        if(!dicType) return [];
        
        if(!new BaseInfoModel().getModel("dicListMap")) return [];
        
        let list = new BaseInfoModel().getModel("dicListMap")[dicType] || [];
        list = list.sort(new compare("seqNo").minToMax());
        return list;
    }
}
