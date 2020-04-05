

import {GetLoginModel} from "../model/LoginSuccessModel";
import {Const} from "./Const";
import {Config} from "../config/config";
// import {CheckNewVersion} from "../net/SetNet";

export class Utils {
    // 判断是否含有英文和数字
    checkHaveLetterNumber(text) {
        let pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}');
        return !!(pwdRegex.test(text));
    }

    // 判断是否只有英文和数字
    checkMustLetterNumber(text) {
        let regx =/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
        return !(text.match(regx)==null);
    }

    // 判断手机号是否正确
    checkTelephone(tel) {
        return !!(/^1[23456789]\d{9}$/.test(tel));
    }

    // 上传图片
    upLoadImg(filePath) {
        return new Promise((resolve, reject) => {
            if(!filePath) {
                uni.showToast({title:  "请上传文件", icon: "none"});
                reject("请上传临时文件");
                return;
            }

            uni.uploadFile({
                url: Config.java + "/newBuildWeb/openApi/common/upload",
                filePath: filePath,
                name: 'file',
                header: {
                    "Content-Type": "multipart/form-data",
                    "clientKey": GetLoginModel.getClientKey()
                },
                success: (uploadFileRes) => {
                    if(uploadFileRes.statusCode !== Const.success || !uploadFileRes.data) {
                        reject(uploadFileRes);
                        return;
                    }

                    resolve(JSON.parse(uploadFileRes.data));
                },
                fail: (err) => {
                    reject(err);
                }
            });
        });
    }

    // 检查更新
    // checkUpVersion() {
    //     // #ifdef APP-PLUS
    //     return new Promise((resolve, reject) => {
    //         plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
    //             // deviceType : ios = 2   android = 1
    //             let deviceType = 1;
    //             if (uni.getSystemInfoSync().platform === "ios") {
    //                 deviceType = 2;
    //             }
    //             new CheckNewVersion({deviceType: deviceType, versionName: widgetInfo.version})
    //                 .send()
    //                 .then(res => {
    //                     console.error(res,"--res--");
    //
    //                     if(res.errCode !== Const.success) {
    //                         reject(res);
    //                         return;
    //                     }
    //
    //                     let data = res.data || {};
    //                     if(!data.upgradeUrl) {
    //                         resolve({msg: "已经是最新版了", status: 1});
    //                         return;
    //                     }
    //
    //                     //我的后台会返回一个安装包地址（pkgUrl），升级包地址（wgtUrl）
    //                     //判空来判断是非是整包升级还是资源包升级
    //                     //content是版本更新内容 \n换行
    //                     //ios用户pkgUrl是苹果市场App地址，android自定义下载地址
    //                     resolve({
    //                         type: "wgt",
    //                         content: data.upgradeDesc,
    //                         url: data.upgradeUrl
    //                     });
    //                 })
    //                 .catch(err => {
    //                     reject(err);
    //                 });
    //         });
    //     });
    //     // #endif
    // }

    // 对象排序
    ObjectSort(obj) {
        let newKey = Object.keys(obj).sort();
        let newObj = {};
        for (let i = 0; i < newKey.length; i++) {
            newObj[newKey[i]] = obj[newKey[i]];
        }
        return newObj;
    }
    
    // 处理图片尺寸
    dealImgSrcSize(url, w = 80, h = 80) {
        if(!url) return "";
        
        if(url.indexOf("x-oss-process=image") >= 0) return url;
        
        return `${url}?x-oss-process=image/resize,m_fill,h_${h},w_${w}`;
    }
    
    // 获取地图图片
    getMapStaticImg(lat, lng, w, h, zoom = 14, scale = 2) {
        return "https://apis.map.qq.com/ws/staticmap/v2/?center="
            +lat+","+lng+"&zoom="+zoom+"&scale="+scale+"&markers=size:large|icon:https://cd.haofang.net/Public/images/wap/icon_mylocation.png|"
            +lng+","+lat+"&key=DGFBZ-3IFW2-PDEUL-CBLCE-XOSYK-K5B5I&size=" +
            +w+"*"+h;
    }
}

// 获取设备平台
export class Platform {
    android = false;
    ios = false;
    utils = false;  // 是否是工具
    constructor() {
        switch(uni.getSystemInfoSync().platform){
            case 'android':
                this.android = true;
                break;
            case 'ios':
                this.ios = true;
                break;
            default:
                this.utils = true;
                break;
        }
    }
    
    getIsAndroid() {
        return this.android;
    }
    
    getIsIos() {
        return this.ios;
    }
    
    getIsUtils() {
        return this.utils;
    }
}

// app 现有模式
export class AppUtils {
    constructor() {
    
    }
    
    // 隐藏软键盘
    hideSoftKeybord() {
        plus.key.hideSoftKeybord();
    }
    
    // 获取参数值
    getParam(name) {
        let val = "";
        let url = decodeURI(weex.config.bundleUrl); //取得整个地址栏
        let result = url.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result) {
            val = result[1];
        }
        val = val.replace(".js", "");
        return val;
    }
}
