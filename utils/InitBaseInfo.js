import {GetDicMessage, GetRegSection} from "../net/CommonNet";
import {GpsInfoModel} from "../model/GpsInfoModel";
import {Const} from "./Const";
import {SetBaseInfoModel} from "../model/BaseInfoModel";
import {Notify} from "./Notify";
import {Notification} from "./Notification";
import {PersonalCenter} from "../net/SetNet";
import {UserInfoModel} from "../model/UserInfoModel";
import {GetLoginModel, SetLoginModel} from "../model/LoginSuccessModel";


export class InitBaseInfo {
    init() {
        this.dealRegSection();
        this.dealDicInfo();
        this.initPersonalInfo();
    }
    
    dealRegSection() {
        let cityInfo = new GpsInfoModel().getModel("cityInfo") || {};
        cityInfo.cityId = cityInfo.cityId || "1";
        return new GetRegSection({cityId: cityInfo.cityId}).send()
            .then((res) => {
                if(res.errCode !== Const.success || !res.data) return;
    
                let regList = res.data.regList || [];
                let sectionList = res.data.sectionList || [];
                let city = res.data.city || {};
                let sectionMap = {};
                for (let info of sectionList) {
                    if (!sectionMap[info.regId]) {
                        sectionMap[info.regId] = [];
                    }
                    sectionMap[info.regId].push(info);
                }
                SetBaseInfoModel.regList(regList);
                SetBaseInfoModel.sectionMap(sectionMap);
                new Notification().postNotification(Notify.RegSectionChange.Name);
            });
    }
    
    dealDicInfo() {
        let cityInfo = new GpsInfoModel().getModel("cityInfo") || {};
        cityInfo.cityId = cityInfo.cityId || "1";
        return new GetDicMessage({cityId: cityInfo.cityId}).send()
            .then((res) => {
                if(res.errCode !== Const.success || !res.data || !res.data.dicList) return;
    
                let dicList = res.data.dicList || [];
                let dicMap = {};
                let dicListMap = {};
                for (let info of dicList) {
                    if(!dicMap[info.dicType]) {
                        dicMap[info.dicType] = {};
                    }
                    if(!dicListMap[info.dicType]) {
                        dicListMap[info.dicType] = [];
                    }
                    dicListMap[info.dicType].push(info);
                    dicMap[info.dicType][info.dicValue] = info;
                    dicMap[info.dicType][info.dicCnMsg] = info;
                }
    
                // 住宅 HOUSING   别墅 VILLA   写字楼 OFFICE   厂房 MANUFACT  仓库 STORE  商铺 TRADE
                // 车库 GARAGE
                // 建筑类型字典 增加其他
                dicListMap["HOUSE_TYPE"] = dicListMap["HOUSE_TYPE"] || [];
                dicListMap["HOUSE_TYPE"].push({
                    cityId: 0,
                    dicCnMsg: "其他",
                    dicCnMsg2: "其他",
                    dicEnMsg: "OTHER",
                    dicType: "HOUSE_TYPE",
                    dicValue: "25",
                    dicValue1: "HOUSING",
                    seqNo: 9999
                });
                dicListMap["HOUSE_TYPE"].push({
                    cityId: 0,
                    dicCnMsg: "其他",
                    dicCnMsg2: "其他",
                    dicEnMsg: "OTHER",
                    dicType: "HOUSE_TYPE",
                    dicValue: "25",
                    dicValue1: "VILLA",
                    seqNo: 9999
                });
                dicListMap["HOUSE_TYPE"].push({
                    cityId: 0,
                    dicCnMsg: "其他",
                    dicCnMsg2: "其他",
                    dicEnMsg: "OTHER",
                    dicType: "HOUSE_TYPE",
                    dicValue: "25",
                    dicValue1: "OFFICE",
                    seqNo: 9999
                });
                dicListMap["HOUSE_TYPE"].push({
                    cityId: 0,
                    dicCnMsg: "其他",
                    dicCnMsg2: "其他",
                    dicEnMsg: "OTHER",
                    dicType: "HOUSE_TYPE",
                    dicValue: "25",
                    dicValue1: "TRADE",
                    seqNo: 9999
                });
    
                dicMap["cityId"] = cityInfo.cityId;
                SetBaseInfoModel.dicDataMap(dicMap);
                SetBaseInfoModel.dicListMap(dicListMap);
                new Notification().postNotification(Notify.DicMessageChange.Name);
                return res;
            });
    }
    
    // 初始化个人信息
    initPersonalInfo() {
        if (!new UserInfoModel().getModel("clientKey")) return;
        
        new PersonalCenter().send()
            .then(res => {
                if (res.errCode === Const.success) {
                    let data = res.data || {};
                    SetLoginModel.setCompAddress(data.compAddr || "");
                    SetLoginModel.setCompName(data.compName || "");
                    SetLoginModel.setCityName(data.cityName || "");
                    SetLoginModel.setTelephone(data.userMobile || "");
                    SetLoginModel.setUserPhoto(data.userPhoto || "");
                    SetLoginModel.setUserName(data.userName || "");
                    new Notification().postNotification(Notify.PersonalInfoChange.Name);
                }
            });
    }
}
