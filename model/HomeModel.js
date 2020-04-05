import {DefaultModel} from "./DefaultModel";
import {GetLoginModel} from "./LoginSuccessModel";


export class HomeModel extends DefaultModel{
    constructor() {
        super();
    }
    
    getKey() {
        return "HomeModel"
    }
    
    getIsLocal() {
        return true;
    }
}

export class SetHomeModel {
    // 新客户数量
    static setNewCustomNum(newCustomNum) {
        let userId = GetLoginModel.getUserId() || "";
        let modelMap = new HomeModel().getModel() || {};
        let model = modelMap[userId] || {};
        model["newCustomNum"] = newCustomNum || 0;
        modelMap[userId] = model;
        new HomeModel().setModel(modelMap);
    }
    
    // 已到访数量
    static setArriveVisitNum(arriveVisitNum) {
        let userId = GetLoginModel.getUserId() || "";
        let modelMap = new HomeModel().getModel() || {};
        let model = modelMap[userId] || {};
        model["arriveVisitNum"] = arriveVisitNum || 0;
        modelMap[userId] = model;
        new HomeModel().setModel(modelMap);
    }
    
    // 待结佣数量
    static setWaitCommissionNum(waitCommissionNum) {
        let userId = GetLoginModel.getUserId() || "";
        let modelMap = new HomeModel().getModel() || {};
        let model = modelMap[userId] || {};
        model["waitCommissionNum"] = waitCommissionNum || 0;
        modelMap[userId] = model;
        new HomeModel().setModel(modelMap);
    }
    
    
    // 新客户已读数量
    static setNewCustomReadNum() {
        let userId = GetLoginModel.getUserId() || "";
        let modelMap = new HomeModel().getModel() || {};
        let model = modelMap[userId] || {};
        model["newCustomReadNum"] = model["newCustomNum"] || 0;
        modelMap[userId] = model;
        new HomeModel().setModel(modelMap);
    }
    
    // 已到访已读数量
    static setArriveVisitReadNum() {
        let userId = GetLoginModel.getUserId() || "";
        let modelMap = new HomeModel().getModel() || {};
        let model = modelMap[userId] || {};
        model["arriveVisitReadNum"] = model["arriveVisitNum"] || 0;
        modelMap[userId] = model;
        new HomeModel().setModel(modelMap);
    }
    
    // 待结佣已读数量
    static setWaitCommissionReadNum() {
        let userId = GetLoginModel.getUserId() || "";
        let modelMap = new HomeModel().getModel() || {};
        let model = modelMap[userId] || {};
        model["waitCommissionReadNum"] = model["waitCommissionNum"] || 0;
        modelMap[userId] = model;
        new HomeModel().setModel(modelMap);
    }
}

// 获取未读数量
export class GetHomeUnReadNumModel {
    // 新客户数量
    static getNewCustomNum() {
        let userId = GetLoginModel.getUserId() || "";
        let modelMap = new HomeModel().getModel() || {};
        let model = modelMap[userId] || {};
        if (!model["newCustomNum"]) return 0;
    
        model["newCustomReadNum"] = Number(model["newCustomReadNum"] || 0);
        model["newCustomNum"] = Number(model["newCustomNum"]);
        if (model["newCustomNum"] <= model["newCustomReadNum"]) return 0;
        
        return (model["newCustomNum"] - model["newCustomReadNum"]);
    }
    
    // 已到访数量
    static getArriveVisitNum() {
        let userId = GetLoginModel.getUserId() || "";
        let modelMap = new HomeModel().getModel() || {};
        let model = modelMap[userId] || {};
        if (!model["arriveVisitNum"]) return 0;
    
        model["arriveVisitReadNum"] = Number(model["arriveVisitReadNum"] || 0);
        model["arriveVisitNum"] = Number(model["arriveVisitNum"]);
        if (model["arriveVisitNum"] <= model["arriveVisitReadNum"]) return 0;
    
        return (model["arriveVisitNum"] - model["arriveVisitReadNum"]);
    }
    
    // 待结佣数量
    static getWaitCommissionNum() {
        let userId = GetLoginModel.getUserId() || "";
        let modelMap = new HomeModel().getModel() || {};
        let model = modelMap[userId] || {};
        if (!model["waitCommissionNum"]) return 0;
    
        model["waitCommissionReadNum"] = Number(model["waitCommissionReadNum"] || 0);
        model["waitCommissionNum"] = Number(model["waitCommissionNum"]);
        if (model["waitCommissionNum"] <= model["waitCommissionReadNum"]) return 0;
    
        return (model["waitCommissionNum"] - model["waitCommissionReadNum"]);
    }
}