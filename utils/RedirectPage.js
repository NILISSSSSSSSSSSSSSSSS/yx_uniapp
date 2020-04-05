

// 找不到页面时的页面重定向
import {LoginApp} from "./common";

export class RedirectPage{
    path = "";
    query = {};

    constructor(path = "", query = {}) {
        this.path = path;
        this.query = query;
    }

    // path映射
    redirectToPathMap() {
        let map = new Map()
            // B端分享
            .set("packageTool/pages/buildBook/buildBook", "pagesHouse/buildBook/buildBook")   // 新盘楼书
            .set("pages/personalStore/personalStore", "pagesStore/personalStore/personalStore")  // 个人微店
            .set("pages/houseDetail/houseDetail", "pagesHouse/erHouseDetail/erHouseDetail")  // 二手房详情/租房详情
            .set("pages/im/im", "pagesTool/messageDetail/messageDetail")   //  掌通分享优惠券
            .set("packageShare/pages/takeLook/takeLook", "pagesShare/takeLook/takeLook")  // 带看
            .set("packageShare/pages/aboutLook/aboutLook", "pagesShare/aboutLook/aboutLook")  // 约看

            // 以下是C端老的分享
            .set("pages/real_index/index", "pages/index/index")   // 首页
            .set("pages/news/news", "pages/message/message")    // 消息
            .set("pages/mine/mine", "pages/me/me")   // 我的
            .set("pages/search/search", "pagesHouse/search/search")   // 搜索
            .set("pages/chooseCity/chooseCity", "pages/chooseCity/chooseCity")  // 选择城市
            .set("pages/list/list", "pagesHouse/erHouseList/erHouseList")   // 二手房列表
            .set("pages/newHouseList/newHouseList", "pagesHouse/newHouseList/newHouseList")   // 新房列表
            .set("pages/apartmentList/list", "pagesHouse/apartmentList/apartmentList")  // 公寓列表
            .set("pages/leaseList/leaseList", "pagesHouse/leaseList/leaseList")   // 租房列表
            .set("pages/newHouseDetail/newHouseDetail", "pagesHouse/newHouseDetail/newHouseDetail")   // 新房详情
            .set("pages/apartmentDetail/apartmentDetail", "pagesHouse/apartmentDetail/apartmentDetail")  // 公寓详情
            .set("packageTool/pages/map/map", "pagesHouse/nearInfoMap/nearInfoMap")   // 周边地图
            .set("packageTool/pages/findHouseByMap/findHouseByMap", "pagesTool/mapFindHouse/mapFindHouse")  // 地图找房
            .set("pages/entrust/entrust", "pagesEntrust/entrust/entrust")  // 发布委托
            .set("pages/trustList/trustList", "pagesEntrust/trustList/trustList")  // 委托列表
            .set("pages/entrustDetail/entrustDetail", "pagesEntrust/entrustDetail/entrustDetail")   // 委托详情
            .set("pages/track/track", "pagesEntrust/entrustTrack/entrustTrack")  // 委托跟进
            .set("pages/findHouse/findHouse", "pagesEntrust/privilegeFindHouse/privilegeFindHouse")  // 特权找房
            .set("pages/trendOne/trendOne", "pagesTool/housePriceEvaluate/housePriceEvaluate")  // 房价评估
            .set("pages/im/im", "pagesTool/messageDetail/messageDetail")  // IM详情
            .set("packageTool/pages/collect/collect", "pagesHouse/collection/collection")   // 收藏
            .set("pages/myAccount/myAccount", "pagesTool/wallet/wallet")  // 我的钱包

        if(!map.has(this.path)) {
            return null;
        }

        return map.get(this.path);
    }

    // 参数key名的映射
    paramsKeyMap() {
        // 需要特殊处理的可以在这配置对应的字段
        let map = {
            "pages/personalStore/personalStore": {
                "scene" : "archiveId",
            },
            "pages/houseDetail/houseDetail": {
                "cityid" : "cityId",
                "casetype" : "caseType",
                "resource" : "resource",
                "caseid" : "caseId",
                "archive_id" : "archiveId",
                "source" : "pageFrom"
            },
            "pages/im/im": {
                "couponId": "couponId",
                "shareArchiveId": "messageId",
                "from": "accid",
                "to": "messageId"
            },
            "pages/search/search": {
                "fromindex": "nullKey"
            },
            "pages/leaseList/leaseList": {
                "caseType": "caseType"
            },
            "pages/newHouseDetail/newHouseDetail": {
                "cityid": "cityId",
                "buildid": "buildId",
            },
            "pages/apartmentDetail/apartmentDetail": {
                "apartmentUuid": "apartmentUuid",
                "roomUuid": "roomUuid",
                "rentType": "rentType"
            },
            "packageTool/pages/map/map": {
                "lat": "lat",
                "long": "lng",
                "buildname": "name"
            },
            "pages/entrust/entrust": {
                "casetype": "casetype",
                "caseType": "casetype"
            },
            "pages/entrustDetail/entrustDetail": {
                "pushLogId": "entrustId"
            },
            "pages/track/track": {
                "cityId": "cityId",
                "caseType": "caseType",
                "vipCaseId": "caseId"
            },
        };

        if(map[this.path]) {
            return map[this.path];
        }

        return {};
    }

    init() {
        let newPath = this.redirectToPathMap(this.path);

        if(!newPath) {
            wx.showModal({
                title: '页面不存在',
                content: '页面不存在，是否跳转到首页？',
                confirmColor: '#5ab38e',
                success(res) {
                    if (res.confirm) {
                        uni.switchTab({
                            url: new LoginApp().getEnterPage()
                        });
                    }
                }
            });
            return;
        }

        let params = "";
        let index = 0;
        let keyMap = this.paramsKeyMap();
        for(let key in this.query) {
            if(index > 0) {
                params += "&";
            }
            // 对key进行重定义
            params += (keyMap[key] ? keyMap[key] : key) + "=" + this.query[key];
            index++;
        }
        let url = "/" + newPath;

        if(params) {
            url += "?" + params;
        }
        let switchTabArr = [
            "pages/real_index/index",
            "pages/news/news",
            "pages/mine/mine",
        ];
        if(switchTabArr.includes(this.path)) {
            uni.switchTab({
            	url: url
            });
            return;
        }

        uni.reLaunch({url:  url });
    }
}
