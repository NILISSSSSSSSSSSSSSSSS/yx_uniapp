

import {Const} from "./Const";
import { Config } from "../config/config.js";
import {UserInfoModel} from "../model/UserInfoModel";
import {GetLoginModel} from "../model/LoginSuccessModel";
import {DifferenceApi} from "./DifferenceApi";
import {CommonModel} from "../model/CommonModel";
import {ImChart} from "./ImChart";

export class RequestTimeOut {
  static isTokenError = false;
  static timeoutFun = null;
  static isInLoginPage = false;

  constructor() {
    this.timeoutTime = 50000;
  }

  send() {
    return new Promise((resolve, reject) => {
      RequestTimeOut.timeoutFun = setTimeout(() => {
        RequestTimeOut.timeoutFun = null;
        reject("超时");
      }, this.timeoutTime);
    });
  }
}


export class RequestApiItem {
  method = "post"; // 默认get
  domain = "java";  // 域名
  header = {};
  data = {};
}

export class RequestApi {
    url = "";
    domain = "";
    constructor(item = new RequestApiItem()) {
        this.request = item;
        this.domain = item.domain;
        this.url = item.domain.indexOf("http") === -1
            ? Config[item.domain] + this.getUrl()
            : item.domain + this.getUrl();
    }

    factoryMap() {
        let map = new Map([
            ["get", "getRequest"]
            ,["post", "postRequest"]
        ]);
        if (!map.has(this.request.method)) return  "nullRequest";

        return map.get(this.request.method);
    }

    send() {
        return new Promise((resolve, reject) => {
            if (!this.url) {
                throw new Error("请配置请求的url");
            }

            if (typeof this.request.data === "object"
              && this.request.data instanceof Array) {
                throw new Error("data类型是对象");
            }
            
            if (this.getNeedClientKey() && this.getNeedTokenDomain()
                && !new UserInfoModel().getModel("clientKey")) {
                this.tokeError("");
                return;
            }
           
            Promise.race([this[this.factoryMap()](), new RequestTimeOut().send()])
                .then((res) => {
                    RequestTimeOut.timeoutFun = null;
                    resolve(res);
                })
                .catch(err => {
                    RequestTimeOut.timeoutFun = null;
                    reject(err)
                });
        });
    }

    getRequest() {
        let header = this.getHeader();
        if(this.getNeedClientKey()) {
            header["clientKey"] = GetLoginModel.getClientKey();
        }
        header["appSource"] = GetLoginModel.getAccountSource() == 2 ? 4 : 3;
        header["U-FS"] = "erpappv1";
        return new Promise((resolve, reject) => {
            uni.request({
                url: this.url,
                data: this.request.data,
                header: header,
                method: "GET",
                success: (res) => {
                    if (res.status && res.status !== Const.success) {
                      reject(res);
                      return;
                    }

                    if (res.statusCode && res.statusCode !== Const.success) {
                      reject(res);
                      return;
                    }

                    let data = res.data || {};
                    if(data.errCode && this.getNeedTokenDomain()
                        && data.errCode === Const.tokenExpireCode) {
                        this.tokeError(data.errMsg || "");
                        // resolve(data);
                        return;
                    }
    
                    if(data.errCode && this.getNeedTokenDomain()
                        && data.errCode === 400) {
                        this.tokeError(data.errMsg || "");
                        // resolve(data);
                        return;
                    }
                    
                    if(data.errCode && this.getNeedTokenDomain()
                        && data.errCode === 500 && data.errMsg
                        && data.errMsg.indexOf("重新登录") >= 0) {
                        this.tokeError(data.errMsg || "");
                        // resolve(data);
                        return;
                    }
    
                    resolve(data);
                },
                fail: (res) => {
                    reject(res);
                }
            });
        });
    }

    postRequest() {
        let header = this.getHeader();
        if(this.getNeedClientKey() && GetLoginModel.getClientKey()) {
            header["clientKey"] = GetLoginModel.getClientKey();
        }
        header["appSource"] = GetLoginModel.getAccountSource() == 2 ? 4 : 3;
        header["U-FS"] = "erpappv1";
        return new Promise((resolve, reject) => {
             uni.request({
                url: this.url,
                data: this.request.data,
                method: "POST",
                header: header,
                success: (res) => {
                   if (res.status && res.status !== Const.success) {
                     reject(res);
                     return;
                   }

                   if (res.statusCode && res.statusCode !== Const.success) {
                     reject(res);
                     return;
                   }
    
                    let data = res.data || {};
                    if(data.errCode && this.getNeedTokenDomain()
                        && data.errCode === Const.tokenExpireCode) {
                        this.tokeError(data.errMsg || "");
                        // resolve(data);
                        return;
                    }
    
                    if(data.errCode && this.getNeedTokenDomain()
                        && data.errCode === 400) {
                        this.tokeError(data.errMsg || "");
                        // resolve(data);
                        return;
                    }
    
                    if(data.errCode && this.getNeedTokenDomain()
                        && data.errCode === 500 && data.errMsg
                        && data.errMsg.indexOf("重新登录") >= 0) {
                        this.tokeError(data.errMsg || "");
                        // resolve(data);
                        return;
                    }
                    
                   resolve(data);
                },
                fail: (res) => {
                    reject(res);
                }
            });
        });
    }

    nullRequest() {
        return new Promise((resolve, reject) => {
            reject("");
            throw new Error("请求method不是get/post");
        });
    }
    
    // 判断那些域名才校验域名
    getNeedTokenDomain() {
        let needTokenDomains = ["java"];
        return needTokenDomains.includes(this.domain);
    }
    
    tokeError(errMsg = "") {
        if (!this.checkClientKey()) return;
        
        if(RequestTimeOut.isTokenError) return;
        
        new DifferenceApi().showToast(errMsg || "登录已失效,请重新登录");
        RequestTimeOut.isTokenError = true;
        new UserInfoModel().setModel("", "clientKey");
        let routePath = getCurrentPages() && getCurrentPages().length > 0
            ? getCurrentPages()[0].route || "pages/index/index"
            : "pages/index/index";
        new CommonModel().setModel("/"+routePath, "routePath");
        for (let info of (getCurrentPages() || [])) {
            if(info.route.indexOf("login/login") >= 0) {
                RequestTimeOut.isInLoginPage = true;
                break;
            }
        }
        if(!RequestTimeOut.isInLoginPage) {
            RequestTimeOut.isInLoginPage = true;
            ImChart.exitLogin();
            setTimeout(() => {
                uni.reLaunch({
                    url: "/pagesSet/login/login"
                });
            }, 800);
        }
    }

    getUrl() {
        return ""
    }
    
    getHeader() {
        return {}
    }
    
    getNeedClientKey() {
        return true;
    }
    
    // 是否检测clientKey
    checkClientKey() {
        return true;
    }
}
