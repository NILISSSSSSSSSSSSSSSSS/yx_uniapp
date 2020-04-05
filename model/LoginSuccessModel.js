

import {DefaultModel} from "./DefaultModel";
import {UserInfoModel} from "./UserInfoModel";

export class LoginSuccessModel extends DefaultModel{
    constructor() {
        super();
    }
    
    getKey() {
        return "LoginSuccessModel"
    }
    
    getIsLocal() {
        return true;
    }
}

// 更新登录成功相关信息
export class SetLoginModel {
    // 设置楼盘id
    static setBuildId(buildId) {
        let item = new LoginSuccessModel().getModel() || {};
        item.buildId = buildId;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置楼盘name
    static setBuildName(buildName) {
        let item = new LoginSuccessModel().getModel() || {};
        item.buildName = buildName;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置buildStatus
    static setBuildStatus(buildStatus) {
        let item = new LoginSuccessModel().getModel() || {};
        item.buildStatus = buildStatus;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置clientKey
    static setClientKey(clientKey) {
        new UserInfoModel().setModel(clientKey, "clientKey");
    }
    
    // 设置completeMobileConfig
    static setCompleteMobileConfig(completeMobileConfig) {
        let item = new LoginSuccessModel().getModel() || {};
        item.completeMobileConfig = completeMobileConfig;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置distractionFree
    static setDistractionFree(distractionFree) {
        let item = new LoginSuccessModel().getModel() || {};
        item.distractionFree = distractionFree;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置panoramaDemo
    static setPanoramaDemo(panoramaDemo) {
        let item = new LoginSuccessModel().getModel() || {};
        item.panoramaDemo = panoramaDemo;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置payPwd
    static setPayPwd(payPwd) {
        let item = new LoginSuccessModel().getModel() || {};
        item.payPwd = payPwd;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置statisticsUrl
    static setStatisticsUrl(statisticsUrl) {
        let item = new LoginSuccessModel().getModel() || {};
        item.statisticsUrl = statisticsUrl;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置systemFlag
    static setSystemFlag(systemFlag) {
        let item = new LoginSuccessModel().getModel() || {};
        item.systemFlag = systemFlag;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置tariff=0.08
    static setTariff(tariff) {
        let item = new LoginSuccessModel().getModel() || {};
        item.tariff = tariff;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置userId=13713
    static setUserId(userId) {
        let item = new LoginSuccessModel().getModel() || {};
        item.userId = userId;
        new LoginSuccessModel().setModel(item);
        let me = new UserInfoModel().getModel("me") || {};
        me.userId = userId;
        new UserInfoModel().setModel(me, "me");
        new UserInfoModel().setModel("ld_"+userId,"accid");
    }
    
    // 设置userJurisdiction=1 2 3 4 5
    static setUserJurisdiction(userJurisdiction) {
        let item = new LoginSuccessModel().getModel() || {};
        item.userJurisdiction = userJurisdiction;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置userName=董大
    static setUserName(userName) {
        let item = new LoginSuccessModel().getModel() || {};
        item.userName = userName;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置userPhoto=http://pic.myfun7.com/oss/online/tmp/2019/10/11/db30673e204a44209c851ac711441f0b.jpeg
    static setUserPhoto(userPhoto) {
        let item = new LoginSuccessModel().getModel() || {};
        item.userPhoto = userPhoto;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置userPosition=BIZ_OPER
    static setUserPosition(userPosition) {
        let item = new LoginSuccessModel().getModel() || {};
        item.userPosition = userPosition;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置yunXinToken=0a7300db6dde5cb4db861ec95106effc
    static setYunXinToken(yunXinToken) {
        let item = new LoginSuccessModel().getModel() || {};
        item.yunXinToken = yunXinToken;
        new LoginSuccessModel().setModel(item);
        let me = new UserInfoModel().getModel("me") || {};
        me.token = yunXinToken;
        new UserInfoModel().setModel(me, "me");
    }
    
    // 设置是否自动登录
    static setAutoLogin(boolean) {
        let item = new LoginSuccessModel().getModel() || {};
        item.autoLogin = boolean;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置电话
    static setTelephone(tel) {
        let item = new LoginSuccessModel().getModel() || {};
        item.telephone = tel;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置密码
    static setPassword(password) {
        let item = new LoginSuccessModel().getModel() || {};
        item.password = password;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置账号来源  1 置业顾问端  2 开发商端
    static setAccountSource(source = 2) {
        let item = new LoginSuccessModel().getModel() || {};
        item.source = source;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置公司名称
    static setCompName(compName = "") {
        let item = new LoginSuccessModel().getModel() || {};
        item.compName = compName;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置公司地址
    static setCompAddress(compAddress = "") {
        let item = new LoginSuccessModel().getModel() || {};
        item.compAddress = compAddress;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置所属区域名称
    static setRegName(regName = "") {
        let item = new LoginSuccessModel().getModel() || {};
        item.regName = regName;
        new LoginSuccessModel().setModel(item);
    }
    
    // 设置城市名称
    static setCityName(cityName = "") {
        let item = new LoginSuccessModel().getModel() || {};
        item.cityName = cityName;
        new LoginSuccessModel().setModel(item);
    }
}

// 获取登录成功相关参数
export class GetLoginModel {
    // 楼盘id
    static getBuildId() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.buildId || "";
    }
    
    // 楼盘name
    static getBuildName() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.buildName || "";
    }
    
    // clientKey
    static getClientKey() {
        return new UserInfoModel().getModel("clientKey") || "";
    }
    
    // completeMobileConfig
    static getCompleteMobileConfig() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.completeMobileConfig || "";
    }
    
    // distractionFree
    static getDistractionFree() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.distractionFree || "";
    }
    
    // panoramaDemo
    static getPanoramaDemo() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.panoramaDemo || "";
    }
    
    // payPwd
    static getPayPwd() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.payPwd || "";
    }
    
    // statisticsUrl
    static getStatisticsUrl() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.statisticsUrl || "";
    }
    
    // systemFlag
    static getSystemFlag() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.systemFlag || "";
    }
    
    // tariff=0.08
    static getTariff() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.tariff || "";
    }
    
    // userId=13713
    static getUserId() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.userId || "";
    }
    
    // userJurisdiction=1 2 3 4 5
    static getUserJurisdiction() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.userJurisdiction || "";
    }
    
    // userName=董大
    static getUserName() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.userName || "";
    }
    
    // userPhoto=http://pic.myfun7.com/oss/online/tmp/2019/10/11/db30673e204a44209c851ac711441f0b.jpeg
    static getUserPhoto() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.userPhoto;
    }
    
    // userPosition=BIZ_OPER
    static getUserPosition() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.userPosition || "";
    }
    
    // yunXinToken=0a7300db6dde5cb4db861ec95106effc
    static getYunXinToken() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.yunXinToken || "";
    }
    
    // 获取是否开启自动登录
    static getAutoLogin() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.autoLogin || false;
    }
    
    // 获取电话
    static getTelephone() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.telephone || "";
    }
    
    // 获取密码
    static getPassword() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.password || "";
    }
    
    // 获取账号来源  1 置业顾问端  2 开发商端
    static getAccountSource() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.source || 2;
    }
    
    // 获取公司名称
    static getCompName() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.compName || "";
    }
    
    // 获取公司地址
    static getCompAddress() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.compAddress || "";
    }
    
    // 获取所属区域名称
    static getRegName() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.regName || "";
    }
    
    // 获取城市名称
    static getCityName() {
        let item = new LoginSuccessModel().getModel() || {};
        return item.cityName || "";
    }
}


// 通讯录
export class ConsultantListModel extends DefaultModel{
    constructor() {
        super();
    }
    
    getKey() {
        return "ConsultantListModel"
    }
    
    getIsLocal() {
        return true;
    }
}

