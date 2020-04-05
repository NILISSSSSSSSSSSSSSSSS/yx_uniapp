<script>
    import { UserInfoModel } from "./model/UserInfoModel.js";
    import { RedirectPage } from "./utils/RedirectPage.js";
    import { Config } from "./config/config.js";
    import {ImChart} from "./utils/ImChart";
    import { GetLoginModel, SetLoginModel } from "./model/LoginSuccessModel";
    import Vue from "vue";
    import {LoginApp, CheckUserStatus} from "./utils/common";
    import {CommonModel} from "./model/CommonModel";
    import {GpsInfoModel} from "./model/GpsInfoModel";
    import { getAdcodeHere } from './utils/addressGps.js';
    import { GetCityInfoByGps } from './net/CommonNet';
    import { Notification } from './utils/Notification.js';
    import { Notify } from './utils/Notify.js';
    import {AppUserModel} from "./model/AppUserModel";
    import {InitBaseInfo} from "./utils/InitBaseInfo";
    import {DealChartListModel} from "./model/im/ChatListModel";
    import {UpUnReadNumTab} from "./utils/ImChart";
    import {ConsultantListModel} from "./model/LoginSuccessModel";
    import {UpWxApp} from "./utils/UpdateManager";

    export default {
        globalData: {
            imChartClass: null,
            netcall: null,
            notifyNames: Object.create(null),
            uChartsBaoBeiVal: null,
            uChartsDaiKanVal: null,
            uChartsSignVal: null,
            uChartsJieYongVal: null,
        },

        onLaunch() {
            new LoginApp().upSetTab();
            this.initData();
            new AppUserModel().setModel(1, "enterOnLaunch");
            new LoginApp().autoLogin().then(res => {
                new LoginApp().upContractList().then(res => {
                    new DealChartListModel().sendMsgListNc();
                });
                new AppUserModel().setModel(2, "enterOnLaunch");
                if (res || !GetLoginModel.getYunXinToken()) return;

                if (!new UserInfoModel().getModel("clientKey")) return;

                // 更新聊天列表 和 重连im
                ImChart.setToken(GetLoginModel.getYunXinToken());
                ImChart.setUuAccid(new UserInfoModel().getModel("accid"));
                if (ImChart.imChartVal) {
                    ImChart.imChartVal.setOptions({
                        token: GetLoginModel.getYunXinToken(),
                        account: ImChart.getUuAccid()
                    });
                    ImChart.imChartVal.connect();
                    return;
                }

                ImChart.token = "";
                ImChart.initConfig();
            });

            if(process.env.NODE_ENV === 'development'){
                console.log('开发环境');
                // #ifdef APP-PLUS || APP-PLUS-NVUE || H5
                this.h5SetTestUserId();
                // #endif
            }

            // #ifdef MP-WEIXIN
            wx.onPageNotFound(function(res){
                new RedirectPage(res.path || "", res.query || {}).init();
            });
            // #endif
        },

        onShow: function(options) {
            // 小程序检查更新
            new UpWxApp();

            // 更新消息tab展示的未读数
            UpUnReadNumTab.setTab();

            CheckUserStatus.isLogin();

            new InitBaseInfo().init();

            // 全局设置设备信息
            Vue.prototype.getSystemInfo = function () {
                return uni.getSystemInfoSync();
            };
        },

        onHide: function() {},

        methods: {
            RemindChange() {
                // uni.setTabBarBadge({
                //     index: 0,
                //     text: '1'
                // });
            },

            // 地理位置信息
            initData() {
                let enterAppTime = new CommonModel().getModel("enterAppTime") || 0;
                enterAppTime = parseInt(enterAppTime);
                let nowTime = new Date().getTime();
                // 5 分钟内无需定位
                if(new GpsInfoModel().getModel("gpsInfo") && new GpsInfoModel().getModel("gpsInfo").cityId
                    && enterAppTime && (nowTime - enterAppTime < (5 * 60 * 1000))) {
                    return;
                }

                new CommonModel().setModel(nowTime, "enterAppTime");
                let that = this;
                let item = {
                    lng: 104.04311,
                    lat: 30.64242,
                    adcode: "5101",
                    cityName: "成都"
                };
                getAdcodeHere(
                    function(lng, lat, adcode, cityName) {
                        item = {lng, lat, adcode, cityName};
                        that.setCityInfo(item)
                            .then((data) => {
                                if(data.needNc) {
                                    new Notification().postNotification(Notify.GpsChanged.Name, data.cityInfo);
                                }
                            });
                    },
                    function() {
                        // 定位失败默认显示成都的数据
                        that.setCityInfo(item)
                            .then((data) => {
                                if(data.needNc) {
                                    new Notification().postNotification(Notify.GpsChanged.Name, data.cityInfo);
                                }
                            });
                    }
                );
            },

            setCityInfo(item) {
                return new Promise((resolve, reject) => {
                    new GpsInfoModel().setModel(item, "gpsInfo");
                    if(!item.lat || !item.lng) {
                        resolve({cityInfo: new GpsInfoModel().getModel("cityInfo") || {}, needNc: false});
                        return;
                    }

                    new GetCityInfoByGps({lat: item.lat, lng: item.lng}).send()
                        .then(res => {
                            let data = res.data || {};
                            console.log(data);
                            if(!data.cityId || !data.cityName) {
                                resolve({cityInfo: new GpsInfoModel().getModel("cityInfo") || {}, needNc: false});
                                return;
                            }

                            let cityInfo = new GpsInfoModel().getModel("cityInfo") || {};
                            let needNc = false;
                            if(cityInfo.cityId != item.cityId) {
                                needNc = true;
                            }
                            item.provinceId = data.provinceId || 1;
                            item.cityId = data.cityId;
                            item.cityName = data.cityName;
                            item.regId = data.regId || "";
                            item.regName = data.regName || "";
                            new GpsInfoModel().setModel(item, "gpsInfo");
                            if(!new GpsInfoModel().getModel("cityInfo")) {
                                new GpsInfoModel().setModel(data, "cityInfo");
                            }
                            resolve({cityInfo: new GpsInfoModel().getModel("cityInfo") || {}, needNc: needNc});
                        })
                        .catch(err => {
                            reject(err);
                        });
                });
            },

            // h5 方便测试，再h5上设置默认的userId
            h5SetTestUserId() {
                if(Config.env === "pro") {
                    // SetLoginModel.setClientKey("f3b88655bb11daea153");
                    // SetLoginModel.setBuildId("2081068");
                }
                if(Config.env === "beta") {
                    new UserInfoModel().setModel("uu_1249942", "accid");
                }
                if(Config.env === "dev") {
                    new UserInfoModel().setModel({userInfo: {}}, "userInfo");
                }
            },
        }
    }
</script>

<style>
    /*每个页面公共css */
    @import './common/common.css';

    /* 初始化默认样式 */
    .uni-page-head__title {
        font-weight: normal !important;
    }
    body,
    html {
        max-width: 640px;
        margin: 0 auto;
    }
    uni-tabbar,
    uni-tabbar .uni-tabbar {
        max-width: 640px;
        margin: 0 auto;
        left: 50%;
        transform: translateX(-50%);
    }
    button {
        padding: 0;
        margin: 0;
        background: inherit;
        text-align: left;
        border: none;
        border-radius: 0;
        line-height: normal;
    }
    button::after {
        border: none;
        border-radius: 0;
    }
</style>
