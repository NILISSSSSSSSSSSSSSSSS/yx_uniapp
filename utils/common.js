

import {UserInfoModel} from "../model/UserInfoModel";
import {Config} from "../config/config";
import {Const} from "./Const";
import {SetLoginModel, GetLoginModel, ConsultantListModel} from "../model/LoginSuccessModel";
import {Notify} from "./Notify";
import {Notification} from "./Notification";
import {ImChart} from "./ImChart";
import {DealChartListModel} from "../model/im/ChatListModel";
import {GetSetting, LoginAppJava, PersonalCenter} from "../net/SetNet";
import {RequestTimeOut} from "./RequestApi";
import {GetAllUserList, GetConsultantList} from "../net/MsgNet";
import {InitBaseInfo} from "./InitBaseInfo";
import {GetBrokerList} from "../net/CustomerNet";
import {GetOpenIdByCode} from "../net/CommonNet";

// 检测是否已登录
export class CheckUserStatus {
    static isLogin(type = "reLaunch") {
        let clientKey = new UserInfoModel().getModel("clientKey") || "";
        if(!clientKey && !RequestTimeOut.isInLoginPage) {
            RequestTimeOut.isTokenError = true;
            uni[type]({
                url: "/pagesSet/login/login"
            });
            return false;
        }

        return true;
    }
}

// 登录
export class LoginApp {
    send(tel, passWord, autoLogin = true) {
        let responseVal = null;
        return new LoginAppJava({account: tel, passWord: passWord, deviceType: 1}).send()
            .then(res => {
                if(res.errCode !== Const.success) {
                    return Promise.reject(res);
                }

                RequestTimeOut.isTokenError = false;
                let data = res.data || {};
                SetLoginModel.setBuildId(data.buildId || "0");
                SetLoginModel.setBuildName(data.buildName || "");
                SetLoginModel.setBuildStatus(data.buildStatus === undefined ? "" : data.buildStatus);
                SetLoginModel.setClientKey(data.clientKey || "");
                SetLoginModel.setCompleteMobileConfig(data.completeMobileConfig === undefined ? "" : data.completeMobileConfig);
                SetLoginModel.setDistractionFree(data.distractionFree === undefined ? "" : data.distractionFree);
                SetLoginModel.setPanoramaDemo(data.panoramaDemo === undefined ? "" : data.panoramaDemo);
                SetLoginModel.setPayPwd(data.payPwd === undefined ? "" : data.payPwd);
                SetLoginModel.setStatisticsUrl(data.statisticsUrl || "");
                SetLoginModel.setSystemFlag(data.systemFlag === undefined ? "" : data.systemFlag);
                SetLoginModel.setTariff(data.tariff || "");
                SetLoginModel.setUserId(data.userId || "");
                SetLoginModel.setUserJurisdiction(data.userJurisdiction || "");
                SetLoginModel.setUserName(data.userName || "");
                SetLoginModel.setUserPhoto(data.userPhoto || "");
                SetLoginModel.setUserPosition(data.userPosition || "");
                SetLoginModel.setYunXinToken(data.yunXinToken || "");
                SetLoginModel.setAutoLogin(autoLogin);
                SetLoginModel.setTelephone(tel);
                SetLoginModel.setPassword(passWord);
                ImChart.token = "";
                let me = new UserInfoModel().getModel("me") || {};
                me.userId = data.userId || "";
                new UserInfoModel().setModel(me, "me");
                new UserInfoModel().setModel(data.clientKey || "", "clientKey");
                ImChart.initConfig();
                this.upContractList().then(res => {
                    new DealChartListModel().sendMsgListNc();
                });
                responseVal = res;
                new InitBaseInfo().init();
                return new GetSetting().send();
            })
            .then(res => {
                SetLoginModel.setAccountSource(1);
                if (res.errCode === Const.success) {
                    SetLoginModel.setAccountSource(2);
                    SetLoginModel.setUserJurisdiction("1 2 3 4 5");
                    // 开发商同同步个人信息
                    new PersonalCenter().send()
                        .then(res => {
                            if (res.errCode === Const.success) {
                                let data = res.data || {};
                                SetLoginModel.setCompAddress(data.compAddr || "");
                                SetLoginModel.setCompName(data.compName || "");
                                SetLoginModel.setCityName(data.cityName || "");
                                new Notification().postNotification(Notify.PersonalInfoChange.Name);
                            }
                        });
                }
                if (res.errCode === 500) {
                    SetLoginModel.setAccountSource(1);
                }
                new Notification().postNotification(Notify.LoginSuccessChange.Name);
                return responseVal;
            });
    }

    autoLogin() {
        if(!GetLoginModel.getAutoLogin()) {
            return Promise.resolve(false);
        }

        if(!GetLoginModel.getPassword() || !GetLoginModel.getTelephone()) return Promise.resolve(false);

        return this.send(GetLoginModel.getTelephone(), GetLoginModel.getPassword(), GetLoginModel.getAutoLogin())
    }

    upContractList(request = {}) {
        class ContractListItem {
            avatar = "";  // 头像
            consultantId = "";  // 置业顾问 id
            consultantImId = "";  // 置业顾问 云信 id
            consultantMobile = "";  // 置业顾问 电话
            consultantName = "";  // 置业顾问 姓名
            firstLetter = "";  // 姓名首字母
            firstName = ""; // 名字的第一个字
        }
        new ConsultantListModel().removeModel();
        
        // 开发商端
        if (GetLoginModel.getAccountSource() == 2) {
            return new GetAllUserList().send()
                .then(res => {
                    if (res.errCode !== Const.success) {
                        return Promise.reject(res);
                    }
                    
                    let userList = res.data ? res.data.userList || [] : [];
                    let contractMap = new ConsultantListModel().getModel() || {}, list = [];
                    for (let info of userList) {
                        if (info.userId == GetLoginModel.getUserId()) continue;
                        
                        let item = new ContractListItem();
                        item.avatar = info.userPhoto || Const.imDefaultHeadImg;
                        item.consultantId = info.userId || "";
                        item.consultantImId = info.userId ? "ld_"+info.userId : "";
                        item.consultantMobile = info.userMobile || "";
                        item.consultantName = info.userName || "";
                        contractMap[item.consultantImId] = item;
    
                        item.backCommssionCount = info.backCommssionCount || 0;
                        item.custNum = info.custNum || 0;
                        item.dealCount = info.dealCount || 0;
                        item.seeCount = info.seeCount || 0;
                        item.userJurisdiction = info.userJurisdiction || "";
                        list.push(item);
                    }
                    return {
                        data: {
                            consultantList: list
                        },
                        errCode: Const.success,
                        errMsg: res.errMsg || "",
                        serverTime: res.serverTime || "",
                        status: res.status || "",
                    };
                });
        }
        
        // 置业顾问端
        this.getBrokeList();
        return new GetConsultantList(request).send()
            .then(res => {
                if(res.errCode !== Const.success) {
                    return Promise.reject(res);
                }

                let consultantList = res.data ? res.data.consultantList || [] : [];
                let contractMap = new ConsultantListModel().getModel() || {};
                for (let info of consultantList) {
                    let item = new ContractListItem();
                    item.avatar = info.avatar || "";
                    item.consultantId = info.consultantId || "";
                    item.consultantImId = info.consultantImId || "";
                    item.consultantMobile = info.consultantMobile || "";
                    item.consultantName = info.consultantName || "";
                    item.firstLetter = info.firstLetter || "";
                    item.firstName = info.consultantName ? info.consultantName.substring(0, 1) : "";
                    contractMap[item.consultantImId] = item;
                }
                new ConsultantListModel().setModel(contractMap);
                return res;
            });
    }
    
    // 获取经纪人通讯录 - 置业顾问端
    getBrokeList(pageOffset = 1, pageRows = 10, keyword = "") {
        class ContractListItem {
            avatar = "";  // 头像
            consultantId = "";  // 置业顾问 id
            consultantImId = "";  // 置业顾问 云信 id
            consultantMobile = "";  // 置业顾问 电话
            consultantName = "";  // 置业顾问 姓名
            firstLetter = "";  // 姓名首字母
            firstName = ""; // 名字的第一个字
        }
        
        return new GetBrokerList({
            pageRows: pageRows,
            pageOffset: pageOffset,
            keyword: keyword
        }).send().then(res => {
            if (res.errCode !== Const.success) {
                return Promise.reject(res);
            }
            
            let list = res.data ? res.data.list || [] : [];
            let contractMap = new ConsultantListModel().getModel() || {};
            for (let info of list) {
                let item = new ContractListItem();
                item.avatar = info.brokerAvatarUrl || "";
                item.consultantId = info.archiveId || "";
                item.consultantImId = info.archiveId || "";
                item.consultantMobile = info.brokerMobile || "";
                item.consultantName = info.brokerName || "";
                contractMap[item.consultantImId] = item;
            }
            new ConsultantListModel().setModel(contractMap);
            return res;
        }).catch(res => {
            return res;
        });
    }
    
    // 获取跳转那个页面
    getEnterPage() {
        return "/pages/index/index"
    }
    
    // 动态设置tab
    upSetTab() {
        // 动态设置tab
        if (new UserInfoModel().getModel("clientKey")) {
            uni.setTabBarItem({
                index: 3,
                text : GetLoginModel.getAccountSource() == 2
                    ? "楼盘" : "统计",
                iconPath : GetLoginModel.getAccountSource() == 2
                    ? "static/images/tabbar/build_default.png"
                    : "static/images/tabbar/tj_default.png",
                selectedIconPath : GetLoginModel.getAccountSource() == 2
                    ? "static/images/tabbar/build_active.png"
                    : "static/images/tabbar/tj_active.png"
            });
        }
    }
}

// 格式化时间
export class formatDate {
    now = "";

    constructor(now) {
        this.now = now;
    }

    getYear() {
        return (this.now.getYear()+1900).toString()
    }

    getMonth() {
        let month = this.now.getMonth()+1;
        return (month<10 ? "0"+month : month.toString());
    }

    getDay() {
        let date = this.now.getDate();
        return (date<10 ? "0"+date : date.toString());
    }

    getHour() {
        let hour = this.now.getHours();
        return (hour<10 ? "0"+hour : hour.toString());
    }

    getMinute() {
        let minute = this.now.getMinutes();
        return (minute<10 ? "0"+minute : minute.toString());
    }

    getSecond() {
        let second = this.now.getSeconds();
        return (second<10 ? "0"+second : second.toString());
    }
    getBigTime(times){
        var formatTime = times.replace(/-/g, '/')
        var Time = new Date(formatTime);
        var timestamp = Time.getTime();
        var mistiming = Math.round((Date.now() - timestamp) / 1000);
        var arrr = ['年', '月', '周', '天', '小时', '分钟', '秒'];
        var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
        for (var i=0;i<=arrn.length; i++) {
            var inm = Math.floor(mistiming / arrn[i]);
            if (inm != 0) {
                return inm + arrr[i] + '前';
            }
        }
    }

    getTime() {
        return this.getYear() +'-'+ this.getMonth() +'-'+ this.getDay() +' '+ this.getHour() +':'+ this.getMinute() +':'+ this.getSecond();
    }
}

// 格式化时间
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n
}
export function formatTimeNew(number = "") {
    let formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    let returnArr = [];
    let currentArr = [];

    //当前时间
    let date = new Date();
    let curYear = date.getFullYear();
    let curMonth = formatNumber(date.getMonth() + 1);
    let curDay = formatNumber(date.getDate());
    let curHour = formatNumber(date.getHours());
    let curMin = formatNumber(date.getMinutes());
    let curSec = formatNumber(date.getSeconds());
    //需要格式化的时间
    let targetDate = new Date(number);
    let tarYear = targetDate.getFullYear();
    let tarMonth = formatNumber(targetDate.getMonth() + 1);
    let tarDay = formatNumber(targetDate.getDate());
    let tarHour = formatNumber(targetDate.getHours());
    let tarMin = formatNumber(targetDate.getMinutes());
    let tarSec = formatNumber(targetDate.getSeconds());

    //格式化输出日期
    if (curDay == tarDay && tarHour < 12){
        return '上午 ' + tarHour + ':'+tarMin;
    }

    if (curDay == tarDay && tarHour >= 12 && tarHour < 18){
        return '下午 0' + (tarHour - 12) + ':' + tarMin;
    }

    if (curDay == tarDay && tarHour >= 18 && tarHour <= 24){
        return '晚上 ' + ((tarHour - 12) < 10 ? "0"+(tarHour - 12) : (tarHour - 12)) + ':' + tarMin;
    }

    if(curDay - tarDay == 1){
        return '昨天 ' + tarHour + ':' + tarMin;
    }

    if (curDay - tarDay == 2) {
        return '前天 ' + tarHour + ':' + tarMin;
    }

    return tarMonth + '月' + tarDay + '日 ' +  tarHour + ':' + tarMin;
}

// 比较大小
export class compare {
    prop = null;
    compareBoolean = true;
    constructor(prop) {
        this.prop = prop;
    }

    init(){
        let prop = this.prop;
        let that = this;
        return function(obj_1,obj_2) {
            let val_1 = obj_1[prop] instanceof Array ? obj_1[prop].length : obj_1[prop];
            let val_2 = obj_2[prop] instanceof Array ? obj_2[prop].length : obj_2[prop];
            if (!isNaN(Number(val_1)) && !isNaN(Number(val_2))) {
                val_1 = Number(val_1);
                val_1 = Number(val_1);
            }
            return that.initSuccess(val_1,val_2);
        }
    }

    initSuccess(val_1, val_2) {
        const eventMap = {
            true: 'maxToMinEvent'
            ,false: 'minToMaxEvent'
        };

        return this[eventMap[this.compareBoolean]](val_1, val_2);
    }

    maxToMin() {
        this.compareBoolean = true;
        return this.init();
    }

    minToMax() {
        this.compareBoolean = false;
        return this.init();
    }

    maxToMinEvent(val_1, val_2) {
        if (val_1 > val_2) return -1;

        if (val_1 < val_2) return 1;

        return 0;
    }

    minToMaxEvent(val_1, val_2) {
        if (val_1 < val_2) return -1;

        if (val_1 > val_2) return 1;

        return 0;
    }
}

// 更新资料（用于蒙层授权和我的更新）
export class DealUserInfoFromLogin {
    init(userInfoParams = {}, needNc = true) {
        return new Promise((resolve, reject) => {
            // #ifdef MP-WEIXIN
            // new UserInfoModel().setModel(userInfoParams || {}, "userInfo");
            uni.login({
                provider: 'weixin',
                success: function (loginRes) {
                    console.log("--loginRes--", loginRes);
                    new GetOpenIdByCode({code:loginRes.code,source: "xfldyx"})
                        .send()
                        .then(res => {
                            if (res.code !== Const.success) {
                                return Promise.reject(res);
                            }
                            
                            resolve(res.data || "");
                        })
                        .catch(err => {
                            reject(err);
                        });
                },
                fail: function(err) {
                    reject(err);
                }
            });
            // #endif
        });
    }
}

