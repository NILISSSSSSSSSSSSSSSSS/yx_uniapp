

<template>
    <view class="home_view">
        <view class="title_view"></view>
        <!--logo-->
        <view class="f_r_s top_cont">
            <image src="http://cdn.haofang.net/static/xfldDeveloper/index/top_logo.png"></image>
            <view>新房联动营销</view>
        </view>
        <!--顶部 描述-->
        <view class="top_des">百万经纪人联合营销平台</view>
        <!--推广信息-->
        <view class="tg_info f_c_c" @click="showChangeBuild">
            <view class="build_name">{{ buildName }}</view>
            <view class="tg_cont f_r_s">
                <view>已报备<text>{{!buildDataNumMap[buildId]?0:buildDataNumMap[buildId].reportedNum||0}}</text></view>
                <view>已带看<text>{{!buildDataNumMap[buildId]?0:buildDataNumMap[buildId].bandNum||0}}</text></view>
                <view>已签约<text>{{!buildDataNumMap[buildId]?0:buildDataNumMap[buildId].subscribeNum||0}}</text></view>
            </view>

            <image v-if="buildList.length > 1" class="build_arrow" src="http://cdn.haofang.net/static/xfldDeveloper/index/build_arrow.png?t=222"></image>
        </view>
        <!--今日客户情况-->
        <view class="custom_view">
            <view class="custom_title" @click.stop="todayEvent">今日客户情况</view>

            <view class="custom_cont f_c_b">
                <view class="custom_cont_item f_r_s">
                    <view class="custom_info f_c_s">
                        <view class="custom_info_val f_c_s">
                            <view :class="[showGun && customInfo.oldBaoBeiNum !== customInfo.baoBeiNum
                                  ? 'custom_info_val_active' : '']"
                                  class="f_c_s">
                                <view>{{ customInfo.oldBaoBeiNum }}</view>
                                <view>{{ customInfo.baoBeiNum }}</view>
                            </view>
                        </view>
                        <view class="custom_info_text">报备(组)</view>
                    </view>

                    <view class="custom_info f_c_s">
                        <view class="custom_info_val f_c_s">
                            <view :class="[showGun && customInfo.oldDaiKanNum !== customInfo.daiKanNum
                                  ? 'custom_info_val_active' : '']"
                                  class="f_c_s">
                                <view>{{ customInfo.oldDaiKanNum }}</view>
                                <view>{{ customInfo.daiKanNum }}</view>
                            </view>
                        </view>
                        <view class="custom_info_text">带看(组)</view>
                    </view>

                    <view class="custom_info f_c_s">
                        <view class="custom_info_val f_c_s">
                            <view :class="[showGun && customInfo.oldRenGouNum !== customInfo.renGouNum
                                  ? 'custom_info_val_active' : '']"
                                  class="f_c_s">
                                <view>{{ customInfo.oldRenGouNum }}</view>
                                <view>{{ customInfo.renGouNum }}</view>
                            </view>
                        </view>
                        <view class="custom_info_text">认购(组)</view>
                    </view>
                </view>

                <view class="custom_cont_item f_r_s">
                    <view class="custom_info f_c_s">
                        <view class="custom_info_val f_c_s">
                            <view :class="[showGun && customInfo.oldSignNum !== customInfo.signNum
                                  ? 'custom_info_val_active' : '']"
                                  class="f_c_s">
                                <view>{{ customInfo.oldSignNum }}</view>
                                <view>{{ customInfo.signNum }}</view>
                            </view>
                        </view>
                        <view class="custom_info_text">签约(组)</view>
                    </view>

                    <view class="custom_info f_c_s">
                        <view class="custom_info_val f_c_s">
                            <view :class="[showGun && customInfo.oldJieYongNum !== customInfo.jieYongNum
                                  ? 'custom_info_val_active' : '']"
                                  class="f_c_s">
                                <view>{{ customInfo.oldJieYongNum }}</view>
                                <view>{{ customInfo.jieYongNum }}</view>
                            </view>
                        </view>
                        <view class="custom_info_text">结佣(组)</view>
                    </view>

                    <view class="custom_info f_c_s">
                        <view class="custom_info_val f_c_s">
                            <view :class="[showGun && customInfo.oldJieYongPrice !== customInfo.jieYongPrice
                                  ? 'custom_info_val_active' : '']"
                                  class="f_c_s">
                                <view>{{ customInfo.oldJieYongPrice }}</view>
                                <view>{{ customInfo.jieYongPrice }}</view>
                            </view>
                        </view>
                        <view class="custom_info_text">结佣金额(万)</view>
                    </view>
                </view>
            </view>
        </view>
        <!--客户跟进-->
        <view v-if="customGenJinInfo.haveCustom" @click="goToRemindMsg"
              class="custom_genjin f_r_b">
            <view class="f_r_s custom_genjin_left">
                <collectFormId></collectFormId>
                <image class="msg_genjin" src="http://cdn.haofang.net/static/xfldDeveloper/index/msg.png"></image>
                <view class="custom_genjin_text" v-if="customGenJinInfo.unLookMsgNum === 0">{{ customGenJinInfo.lastMsgText }}</view>
                <view class="custom_genjin_text" v-if="customGenJinInfo.unLookMsgNum === 1">您有未看的客户跟进</view>
                <view class="custom_genjin_text" v-if="customGenJinInfo.unLookMsgNum > 1">您有{{customGenJinInfo.unLookMsgNum}}条未看的客户跟进</view>
                <view class="custom_genjin_time">{{customGenJinInfo.time}}</view>
            </view>

            <view class="f_r_e custom_genjin_right">
                <view class="custom_red_point" v-if="customGenJinInfo.unLookMsgNum > 0"></view>

                <image class="more_arrow" src="http://cdn.haofang.net/static/xfldDeveloper/index/more_arrow.png"></image>
            </view>
        </view>

        <!--客户转化率-->
        <view class="custom_zhl">
            <view class="f_r_b custom_zhl_title">
                <view>客户转化率</view>

                <view @click.stop="goToStatistics" class="f_r_e">
                    <collectFormId></collectFormId>
                    <view class="custom_zhl_more">更多</view>

                    <image class="more_arrow" src="http://cdn.haofang.net/static/xfldDeveloper/msg/arrow_right.png"></image>
                </view>
            </view>

            <view v-if="!buildModel" class="custom_zhl_cont f_c_s">
                <view class="f_r_c custom_zhl_cont_info">
                    <view class="f_c_c custom_zhl_cont_item">
                        <circleProcess :globalType="'uChartsBaoBeiVal'" :seriesData="customZhlInfo.baoBeiLv"></circleProcess>
                        <view class="custom_zhl_cont_text">有效报备率</view>
                    </view>

                    <view class="f_c_c custom_zhl_cont_item">
                        <circleProcess :globalType="'uChartsDaiKanVal'" :seriesData="customZhlInfo.daiKanLv"></circleProcess>
                        <view class="custom_zhl_cont_text">带看率</view>
                    </view>
                </view>

                <view class="f_r_c custom_zhl_cont_info">
                    <view class="f_c_c custom_zhl_cont_item">
                        <circleProcess :globalType="'uChartsSignVal'" :seriesData="customZhlInfo.signLv"></circleProcess>
                        <view class="custom_zhl_cont_text">签约率</view>
                    </view>

                    <view class="f_c_c custom_zhl_cont_item">
                        <circleProcess :globalType="'uChartsJieYongVal'" :seriesData="customZhlInfo.jieYongLv"></circleProcess>
                        <view class="custom_zhl_cont_text">结佣率</view>
                    </view>
                </view>
            </view>
            <view v-if="buildModel" class="custom_zhl_cont f_c_s"></view>
        </view>

        <!--销售占比-->
        <view class="xs_zb">
            <view class="f_r_b xs_zb_top">
                <view class="xs_zb_top_title">销售占比</view>

                <view class="f_r_e xs_zb_btn_view" v-if="(saleBiInfo.list && saleBiInfo.list.length > 0) || deptBiInfo.show">
                    <view :class="{'xs_zb_btn_active' : saleBiActiveIndex === 1}"
                          @click="changeSaleType(1)"
                          class="xs_zb_btn"><collectFormId></collectFormId>户型销售</view>
                    <view :class="{'xs_zb_btn_active' : saleBiActiveIndex === 2}"
                          v-if="deptBiInfo.show"
                          @click="changeSaleType(2)"
                          class="xs_zb_btn xs_zb_btn_dept"><collectFormId></collectFormId>门店销售</view>
                </view>
            </view>

            <view v-if="saleBiActiveIndex === 1 && saleBiInfo.list && saleBiInfo.list.length > 0" class="xs_zb_cont f_r_s">
                <view class="xs_zb_chart">
                    <ringChart :subName="'户型销售'" :titleName="saleBiInfo.allVal"
                               :seriesData="saleBiInfo.list"></ringChart>
                </view>

                <view class="xs_zb_list f_c_c">
                    <block v-for="(item, index) in saleBiInfo.list" :key="index">
                        <view class="f_r_s xs_zb_item">
                            <view class="xs_zb_color" :style="{'background' : item.color}"></view>
                            <view class="xs_zb_text">{{ item.text }}</view>
                            <view class="xs_zb_bl">{{ item.biLi }}</view>
                            <view class="xs_zb_val">{{ item.val }}</view>
                        </view>
                    </block>
                </view>
            </view>

            <view v-if="(saleBiActiveIndex === 1 || !deptBiInfo.show) && saleBiInfo.list && saleBiInfo.list.length === 0" class="f_c_c no_hx_data_view">
                <image class="no_hx_data_img" src="http://cdn.haofang.net/static/xfldDeveloper/statistics_img/no_data.png"></image>
                <view class="no_hx_data_text">{{ deptBiInfo.show ? '暂时没有户型数据' : '暂时没有销售数据' }}</view>
            </view>

            <view v-if="saleBiActiveIndex === 2" class="xs_zb_cont f_r_s">
                <view class="xs_zb_chart">
                    <ringChart :subName="'门店销售'" :titleName="deptBiInfo.allVal"
                               :seriesData="deptBiInfo.list"></ringChart>
                </view>

                <view class="xs_zb_list f_c_c">
                    <block v-for="(item, index) in deptBiInfo.list" :key="index">
                        <view class="f_r_s xs_zb_item">
                            <view class="xs_zb_color" :style="{'background' : item.color}"></view>
                            <view class="xs_zb_text">{{ item.text }}</view>
                            <view class="xs_zb_bl">{{ item.biLi }}</view>
                            <view class="xs_zb_val">{{ item.val }}</view>
                        </view>
                    </block>
                </view>
            </view>
        </view>

        <view class="empty_view"></view>

        <!--楼盘切换组件-->
        <view @click="closeBuildModal" @touchmove.stop.prevent=""
              :class="[buildContModel ? 'build_model_show' : 'build_model_hide']"
              class="change_build f_c_e" v-if="buildModel">
            <scroll-view :class="[buildContModel ? 'change_build_active' : 'change_build_default']"
                         class="change_build_cont f_c_e" scroll-y="true">
                <view :class="[item.isActive == 1 ? 'build_item_active' : '',buildList.length===2&&index===1 ? 'hide_line' :'']"
                      @click.stop="changeBuild(item)" class="build_item"
                      v-for="(item, index) in buildList"
                      :key="index"><collectFormId></collectFormId>{{ item.buildName }}
                    <image class="check_icon" mode="aspectFit" src="http://cdn.haofang.net/static/xfldDeveloper/build/check_build.png" v-if="item.isActive == 1"></image>
                </view>
                <!--<view @click.stop="closeBuildModal" class="build_cancel">取消</view>-->
            </scroll-view>
        </view>
    </view>
</template>

<script>
    import {GetLoginModel, SetLoginModel} from "../../../model/LoginSuccessModel";
    import {Const} from "../../../utils/Const";
    import {
        ChangeBuild,
        CustStatisticInfo,
        GetSpreadParam,
        GetUserManageBuildList, SellProportion,
        TodayCustStc
    } from "../../../net/IndexNet";
    import {UnReadMsgModel} from "../../../model/im/UnReadMsgModel";
    import {ImSendMessage, UpUnReadNumTab} from "../../../utils/ImChart";
    import {ProjectConfigConst} from "../../../utils/ProjectConfigConst";
    import {Notify} from "../../../utils/Notify";
    import {Notification} from "../../../utils/Notification";
    import circleProcess from "@/components/echarts/circleProcess.vue";
    import ringChart from "@/components/echarts/ringChart.vue";
    import {compare, formatTimeNew} from "../../../utils/common";
    import { ListUserRelativeBuilding } from "@/net/BuildNet.js";

    class PrivateData {
        static colorMap = new Map()
            .set(0, "#0084ff")
            .set(1, "#13c2c2")
            .set(2, "#ffb109")
            .set(3, "#9083f8")
            .set(4, "#ff625b");
    }

    export default {
        components: {
            circleProcess,
            ringChart
        },

        data() {
            return {
                buildId: "",
                buildDataNumMap: {}, // 数量
                buildName: "",
                tuiGuangWeekNum: "",  //本周推广
                tuiGuangMonthNum: "",  //本月推广
                buildList: [], // 楼盘列表

                // 楼盘切换相关参数
                buildModel: false,
                buildContModel: false,

                // 客户相关参数
                customInfo: {
                    baoBeiNum: 0, // 报备数
                    oldBaoBeiNum: 0, // 报备数
                    daiKanNum: 0, // 带看数
                    oldDaiKanNum: 0, // 带看数
                    renGouNum: 0, // 认购数
                    oldRenGouNum: 0, // 认购数
                    signNum: 0, // 签约数
                    oldSignNum: 0, // 签约数
                    jieYongNum: 0, // 结佣数
                    oldJieYongNum: 0, // 结佣数
                    jieYongPrice: 0, // 结佣钱数
                    oldJieYongPrice: 0, // 结佣钱数
                },
                showGun: false,

                // 客户跟进参数
                customGenJinInfo: {
                    haveCustom: false, // 是否有客户跟进
                    unLookMsgNum: 0,  // 未看数
                    lastMsgText: "", // 最新消息
                    time: "", // 时间
                },

                // 客户转化率
                customZhlInfo: {
                    baoBeiLv: 0,
                    daiKanLv: 0,
                    signLv: 0,
                    jieYongLv: 0,
                },

                // 户型占比
                saleBiInfo: {
                    allVal: 0, // 总的值
                    list: []
                },
                // 门店占比
                deptBiInfo: {
                    allVal: 0, // 总的值
                    list: [],
                    show: false
                },
                saleBiActiveIndex: 1, // 当前点击的销售占比索引  1 户型  2 门店
            }
        },

        mounted() {
            this.initData();
            // 监听消息
            new Notification().addObserver(this, "UpChartMsgChanged", Notify.UpChartMsgChanged.Name);
            // 监听页面可见 刷新组件
            new Notification().addObserver(this, "PageShowChange", Notify.PageShowChange.Name);
            // 监听页面隐藏
            new Notification().addObserver(this, "PageHideChange", Notify.PageHideChange.Name);
            // 监听Im连接成功
            new Notification().addObserver(this, "ImLinkSuccessChange", Notify.ImLinkSuccessChange.Name);
        },

        destroyed() {
            new Notification().removeObserverAllNotification(this);
        },

        methods: {
            // 新消息回调
            UpChartMsgChanged() {
                this.initRemindMsg();
                this.initRemindList();
            },

            // im链接成功回调
            ImLinkSuccessChange() {
                this.buildName = GetLoginModel.getBuildName();
                this.initRemindList();
            },

            // 页面可见回调
            PageShowChange(name, params) {
                if (params.source === "index") {
                    this.initData();
                }
            },
            // 页面隐藏回调
            PageHideChange(name, params) {
                if (params.source === "index") {
                    this.showGun = false;
                }
            },

            initData() {
                new ListUserRelativeBuilding().send()
                    .then(res => {
                       if (res.errCode === Const.success) {
                           let buildDataNumMap = {};
                           let buildingList = res.data ? res.data.buildingList || [] : [];
                           for (let info of buildingList) {
                               buildDataNumMap[info.buildId] = info;
                           }
                           this.buildDataNumMap = buildDataNumMap;
                       }
                    });
                this.buildId = GetLoginModel.getBuildId();
                this.buildName = GetLoginModel.getBuildName();
                this.initBuildList();
                this.initBuildSpreadParam();
                this.initCustomStatus();
                this.initRemindList();
                this.initRemindMsg();
                this.initCustomZhl();
                this.initSaleBi();
            },

            // 初始化楼盘列表
            initBuildList() {
                if (!GetLoginModel.getBuildId() || GetLoginModel.getBuildId() == 0) return;

                return new GetUserManageBuildList().send()
                    .then(res => {
                        if (res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        let buildingList = res.data ? res.data.buildList || [] : [];
                        let buildList = [];
                        for (let info of buildingList) {
                            if (!info.buildId || !info.buildName) continue;

                            buildList.push({
                                buildId: info.buildId,
                                buildName: info.buildName,
                                isActive: info.isActive || 0,  // 当前选择楼盘 0=否 1=是
                            });
                        }
                        this.buildList = buildList;
                    })
                    .catch(err => {
                        this.DifferenceApi.showToast(err.errMsg || "获取楼盘列表失败啦");
                    });
            },
            // 初始化楼盘推广数
            initBuildSpreadParam() {
                return new GetSpreadParam().send()
                    .then(res => {
                        if (res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        this.tuiGuangWeekNum = res.data ? res.data.spreadDay || 0 : 0;
                        this.tuiGuangMonthNum = res.data ? res.data.spreadMonth || 0 : 0;
                    })
                    .catch(err => {
                        // this.DifferenceApi.showToast(err.errMsg || "获取推广数失败啦");
                    });
            },
            // 初始化提醒消息
            initRemindMsg() {
                this.customGenJinInfo.unLookMsgNum = UpUnReadNumTab.getUnReadNum(ProjectConfigConst.remindMsgMessageId) || 0;
            },
            // 初始化提醒发消息列表
            initRemindList() {
                if (!this.ImChart.imChartVal) return;

                this.ImChart.getHistoryOriginal(ProjectConfigConst.remindMsgMessageId)
                    .then(res => {
                        let msgs = res ? res.msgs || [] : [];
                        let customGenJinInfo = this.customGenJinInfo;
                        if (msgs.length === 0) {
                            this.customGenJinInfo.haveCustom = false;
                            return;
                        }

                        msgs = msgs.sort(new compare("time").maxToMin());
                        let content = JSON.parse(msgs[0].content);
                        let data = content.data || {};
                        customGenJinInfo.haveCustom = true;
                        customGenJinInfo.lastMsgText = data.CONTENT || "暂无内容";
                        customGenJinInfo.time = formatTimeNew(msgs[0].time || new Date().getTime());
                        this.customGenJinInfo = customGenJinInfo;
                    });
            },
            // 初始化今日客户情况
            initCustomStatus() {
                return new TodayCustStc().send()
                    .then(res => {
                        if (res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        let data = res.data || {};
                        let customInfo = this.customInfo || {};
                        customInfo.oldBaoBeiNum = customInfo.baoBeiNum;
                        customInfo.oldDaiKanNum = customInfo.daiKanNum;
                        customInfo.oldRenGouNum = customInfo.renGouNum;
                        customInfo.oldSignNum = customInfo.signNum;
                        customInfo.oldJieYongNum = customInfo.jieYongNum;
                        customInfo.oldJieYongPrice = customInfo.jieYongPrice;

                        customInfo.baoBeiNum = data.report || 0; // 报备数
                        customInfo.daiKanNum = data.band || 0; // 带看数
                        customInfo.renGouNum = data.subscription || 0; // 认购数
                        customInfo.signNum = (data.sign || 0); // 签约数
                        customInfo.jieYongNum = data.settle || 0; // 结佣数
                        customInfo.jieYongPrice = data.commission || 0; // 结佣钱数
                        this.customInfo = customInfo;
                        this.showGun = true;
                        setTimeout(() => {
                            customInfo.oldBaoBeiNum = customInfo.baoBeiNum;
                            customInfo.oldDaiKanNum = customInfo.daiKanNum;
                            customInfo.oldRenGouNum = customInfo.renGouNum;
                            customInfo.oldSignNum = customInfo.signNum;
                            customInfo.oldJieYongNum = customInfo.jieYongNum;
                            customInfo.oldJieYongPrice = customInfo.jieYongPrice;
                            this.customInfo = customInfo;
                        }, 150);
                    })
                    .catch(err => {
                        this.DifferenceApi.showToast(err.errMsg || "获取今日客户情况失败");
                    });
            },
            // 初始化转换率
            initCustomZhl() {
                return new CustStatisticInfo({date: ""}).send()
                    .then(res => {
                        if (res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        let data = res.data || {};
                        this.customZhlInfo = {
                            baoBeiLv: data.reportRate || 0,
                            daiKanLv: data.bandRate || 0,
                            signLv: data.signRate || 0,
                            jieYongLv: data.commissionRate || 0,
                        };
                    })
                    .catch(err => {
                        this.DifferenceApi.showToast(err.errMsg || "获取客户转换率失败");
                    });
            },
            // 销售占比
            initSaleBi() {
                // "type": "(int32)统计类型 1=户型销售 2=门店销售"
                return Promise.all([
                    new SellProportion({type: 1}).send(),
                    new SellProportion({type: 2}).send()
                ]).then(res => {
                    let huXingItem = this.dealSaleBi(res[0].data || []);
                    let deptItem = this.dealSaleBi(res[1].data || []);
                    this.saleBiInfo = {
                        allVal: huXingItem.allNum,
                        list: huXingItem.list
                    };
                    this.deptBiInfo = {
                        allVal: deptItem.allNum,
                        list: deptItem.list,
                        show: !!((res[1].data || []).length > 1)
                    };
                })
            },
            // 处理销售占比
            dealSaleBi(dataList = []) {
                let list = [], allNum = 0;
                let otherInfo = {
                    color: PrivateData.colorMap.get(4),
                    biLi: 0,
                    val: 0,
                    text: "其他"
                };
                for (let i = 0;i<dataList.length;i++) {
                    let item = dataList[i] || {};
                    allNum += (item.sellNum || 0);
                    if (dataList.length > 5 && i > 3) {
                        otherInfo.biLi += (item.percent || 0);
                        otherInfo.val += (item.sellNum || 0);
                        continue;
                    }

                    list.push({
                        color: PrivateData.colorMap.get(i),
                        text: item.name || "未知",
                        biLi: item.percent ? Math.round((item.percent*100)*1000)/1000 : 0,
                        val: item.sellNum || 0
                    });
                }
                if (dataList.length > 5) {
                    otherInfo.biLi = Math.round((otherInfo.biLi*100)*1000)/1000;
                    list.push(otherInfo);
                }
                let [newList,lastItem, otherAllNum]  = [[], {}, 0];
                for (let m = 0;m<list.length;m++) {
                    let info = list[m] || {};
                    if (m === list.length - 1 && otherAllNum !== 100) {
                        lastItem = info;
                        lastItem.biLi = (100 - otherAllNum) + "%";
                        continue;
                    }

                    otherAllNum += info.biLi;
                    info.biLi += "%";
                    newList.push(info);
                }
                if (Object.keys(lastItem).length > 0) {
                    newList.push(lastItem);
                }
                return {list: newList, allNum};
            },

            // 切换楼盘
            showChangeBuild() {
                if (this.buildList.length <= 1) return;

                this.buildContModel = true;
                this.buildModel = true;
            },
            changeBuild(item, index) {
                if (item.buildId == GetLoginModel.getBuildId()) {
                    this.closeBuildModal();
                    this.DifferenceApi.showToast("切换成功");
                    this.saleBiActiveIndex = 1;
                    return;
                }

                new ChangeBuild({buildId: item.buildId}).send()
                    .then(res => {
                        if (res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        this.closeBuildModal();
                        this.saleBiActiveIndex = 1;
                        this.DifferenceApi.showToast("切换成功");
                        SetLoginModel.setBuildId(item.buildId);
                        SetLoginModel.setBuildName(item.buildName);
                        let buildList = [];
                        for (let info of this.buildList) {
                            info.isActive = 0;
                            if (info.buildId == item.buildId) {
                                info.isActive = 1;
                            }
                            buildList.push(info);
                        }
                        this.buildList = buildList;
                        this.initData();
                    })
                    .catch(err => {
                        this.DifferenceApi.showToast(err.errMsg || "切换失败");
                    });
            },
            // 取消楼盘弹窗
            closeBuildModal() {
                this.buildContModel = false;
                setTimeout(() => {
                    this.buildModel = false;
                }, 100);
            },

            // 查看提醒消息
            goToRemindMsg() {
                UpUnReadNumTab.removeReadNum(ProjectConfigConst.remindMsgMessageId);
                this.customGenJinInfo.unLookMsgNum = 0;
                uni.navigateTo({
                    url: "/pagesMsg/remindMsg/remindMsg"
                });
            },

            // 切换销售类型
            changeSaleType(index) {
                this.saleBiActiveIndex = Number(index);
            },

            // 跳转到更多统计
            goToStatistics() {
                uni.navigateTo({
                    url: "/pagesStatistics/analysis/analysis"
                });
            },
        }
    }
</script>

<style scoped>
    .check_icon{
        width: 35rpx;
        height: 23rpx;
        position: absolute;
        top: 72rpx;
        right: 50rpx;
    }
    .home_view{
        width: 100%;
        padding: 0 40upx;
        box-sizing: border-box;
    }
    .title_view{
        height: var(--status-bar-height);
        width: 100%;
    }
    .top_cont{
        margin-top: 40upx;
        align-items: center;
    }
    .top_cont>image{
        width: 56upx;
        height: 52upx;
        flex-shrink: 0;
        margin: auto 20upx auto 0;
    }
    .top_cont>view{
        font-family: PingFang-SC-Heavy;
        font-size: 50upx;
        font-weight: bold;
        font-stretch: normal;
        color: #191f25;
    }
    .top_des{
        font-size: 22upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 60upx;
        height: 60upx;
        letter-spacing: 11upx;
        color: #7d8184;
        width: 380upx;
        margin: auto auto auto 0;
        text-align: justify;
    }
    .top_des::after {
        width: 100%;
        display: inline-block;
        content: '';
    }
    .tg_info{
        background: url("http://cdn.haofang.net/static/xfldDeveloper/index/bg_home.png") center center no-repeat;
        background-size: cover;
        width: 100%;
        height: 350upx;
        margin-top: -39upx;
        /*border-radius: 15upx;*/
        overflow: hidden;
        /*-webkit-box-shadow: #9DD2FD 0 0 40rpx;*/
        /*box-shadow: #9DD2FD 0 0 40rpx;*/
        position: relative;
        padding-left: 47upx;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-left: -2upx;
        margin-bottom: -51upx;
    }
    .build_name{
        font-family: PingFang-SC-Medium;
        font-size: 38upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 40upx;
        height: 40upx;
        color: #ffffff;
        margin-bottom: 48upx;
    }
    .tg_cont{
        font-family: "PingFang SC";
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 41upx;
        color: rgba(255,255,255,0.8);
        align-items: center;
    }
    .tg_cont>view{
        display: flex;
        align-items: center;
        margin-right: 40upx;
    }
    .tg_cont>view:last-child{
        margin-right: 0;
    }
    .tg_cont>view text{
        font-size: 41upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 41upx;
        /*color: #ffffff;*/
        color: rgba(255,255,255,0.8);
        margin-left: 16upx;
    }
    .build_arrow{
        width: 18upx;
        height: 33upx;
        position: absolute;
        right: 28upx;
        /*top: 117upx;*/
        /*top: 50%;*/
        flex-shrink: 0;
        transform: rotate(180deg);
    }

    /*切换楼盘*/
    .change_build{
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 999;
    }
    .change_build_list{
        width: 100%;
        height: 330upx;
        padding: 0 40upx;
        box-sizing: border-box;
        background-color: #ffffff;
    }
    .change_build_cont{
        background-color: #ffffff;
        width: 100%;
        height: 410upx;
        position: relative;
    }
    .build_item{
        line-height: 163upx;
        border-bottom: 1px solid #ebebeb;
        box-sizing: border-box;
        text-align: center;
        font-family: "PingFang SC";
        font-size: 34upx;
        font-weight: normal;
        font-stretch: normal;
        color: #191f25;
    }
    .hide_line{
        border: none;
    }
    .build_cancel{
        font-family: "PingFang SC";
        font-size: 30upx;
        font-weight: normal;
        font-stretch: normal;
        color: #a3a5a8;
        text-align: center;
        line-height: 120upx;
    }
    .change_build_cont .build_item_active{
        color: #0084ff;
    }
    .change_build_active{
        animation: buildMove 0.2s ease;
    }
    .change_build_default{}
    .build_model_show{
        animation: buildModelShow 0.1s ease;
    }
    .build_model_hide{
        opacity: 0;
    }
    @keyframes buildMove {
        from {bottom: -450upx}
        to {bottom: 0}
    }
    @keyframes buildHide {
        from {bottom:0}
        to {bottom: -450upx}
    }
    @keyframes buildModelShow {
        from {opacity: 0}
        to {opacity: 0.5}
    }
    @keyframes buildModelHide {
        from {opacity: 0.5}
        to {opacity: 0}
    }

    /*客户情况*/
    .custom_view{
        margin-top: 20upx;
    }
    .custom_title{
        line-height: 120upx;
        text-align: left;
        font-family: PingFang-SC-Bold;
        font-size: 38upx;
        font-weight: bold;
        font-stretch: normal;
        color: #191f25;
    }
    .custom_cont{
        width: 100%;
        height: 370upx;
        background-color: #ffffff;
        box-shadow: 0 0 28upx 2upx
        rgba(224, 224, 224, 0.5);
        border-radius: 10upx;
        padding: 58upx 0 60upx 20upx;
        box-sizing: border-box;
    }
    .custom_cont_item{
        align-items: center;
    }
    .custom_info{
        width: 224upx;
        padding-left: 30upx;
        box-sizing: border-box;
        align-items: center;
    }
    .custom_info_val{
        height: 50upx;
        font-size: 50upx;
        font-stretch: normal;
        line-height: 50upx;
        color: #191f25;
        margin: 0 auto 0 0;
        position: relative;
        overflow: hidden;
    }
    .custom_info_val_cont{
        height: 50upx;
        line-height: 50upx;
    }
    .custom_info_text{
        height: 24upx;
        font-family: "PingFang SC";
        font-size: 24upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24upx;
        color: #7d8184;
        margin: 25upx auto 0 0;
    }
    .custom_info_val_active{
        position: relative;
        top: -50upx;
        animation: gunShow 0.2s ease;
    }
    @keyframes gunShow {
        from {top: 0}
        to {top: -50upx}
    }

    /*客户跟进*/
    .custom_genjin{
        width: 100%;
        height: 120upx;
        background-color: #ffffff;
        box-shadow: 0 0 28upx 2upx
        rgba(224, 224, 224, 0.5);
        border-radius: 10upx;
        margin-top: 33upx;
        padding: 0 30upx 0 35upx;
        box-sizing: border-box;
        align-items: center;
    }
    .custom_genjin_left{
        align-items: center;
    }
    .custom_genjin_right{
        align-items: center;
    }
    .msg_genjin{
        width: 35upx;
        height: 38upx;
        flex-shrink: 0;
        margin: auto 20upx auto 0;
    }
    .custom_genjin_text{
        font-family: PingFang-SC-Bold;
        font-size: 30upx;
        font-stretch: normal;
        color: #191f25;
        font-weight: bold;
        text-align: left;
        max-width: 11em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .custom_genjin_time{
        font-family: "PingFang SC";
        font-size: 24upx;
        font-weight: normal;
        font-stretch: normal;
        color: #a3a5a8;
        margin-left: 30upx;
        flex-shrink: 0;
        margin-right: 10upx;
    }
    .custom_red_point{
        width: 12upx;
        height: 12upx;
        background-color: #ff625b;
        border-radius: 100%;
        margin: auto 12upx auto 0;
        flex-shrink: 0;
    }
    .more_arrow{
        width: 12upx;
        height: 22upx;
        flex-shrink: 0;
        margin: auto 0;
    }

    /*客户转化率*/
    .custom_zhl{
        margin-top: 24upx;
    }
    .custom_zhl_title{
        line-height: 120upx;
        align-items: center;
    }
    .custom_zhl_title>view{
        font-family: PingFang-SC-Bold;
        font-size: 38upx;
        font-weight: bold;
        color: #191f25;
    }
    .custom_zhl_more{
        font-family: "PingFang SC";
        font-size: 30upx;
        font-weight: normal;
        color: #a3a5a8;
        margin-right: 20upx;
    }
    .custom_zhl_cont{
        width: 100%;
        height: 560upx;
        background-color: #ffffff;
        box-shadow: 0 0 28upx 2upx
        rgba(224, 224, 224, 0.5);
        border-radius: 10upx;
    }
    .custom_zhl_cont_info:first-child{
        margin-top: 50upx;
        margin-bottom: 46upx;
    }
    .custom_zhl_cont_info>.custom_zhl_cont_item:first-child{
        margin-right: 156upx;
    }
    .custom_zhl_cont_text{
        font-family: "PingFang SC";
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 28upx;
        color: #191f25;
        text-align: center;
        margin-top: 33upx;
    }

    /*销售占比*/
    .xs_zb{
        width: 100%;
        margin-top: 25upx;
    }
    .xs_zb_top{
        line-height: 120upx;
        align-items: center;
    }
    .xs_zb_top_title{
        font-family: PingFang-SC-Bold;
        font-size: 38upx;
        font-weight: bold;
        font-stretch: normal;
        color: #191f25;
    }
    .no_hx_data_view{
        width: 100%;
        background-color: #ffffff;
        align-content: center;
        padding-bottom: 60upx;
        padding-top: 60upx;
        box-sizing: border-box;
    }
    .no_hx_data_img{
        width: 561upx;
        height: 222upx;
        margin: 0 auto;
    }
    .no_hx_data_text{
        height: 30upx;
        font-family: "PingFang SC";
        font-size: 30upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30upx;
        color: #c0c1c3;
        text-align: center;
        margin-top: 50upx;
    }
    .xs_zb_cont{
        width: 100%;
        height: 330upx;
        background-color: #ffffff;
        box-shadow: 0 0 28upx 2upx
        rgba(224, 224, 224, 0.5);
        border-radius: 10upx;
        align-content: center;
    }
    .xs_zb_chart{
        width: 250upx;
        height: 250upx;
        margin: auto 0 auto 20upx;
    }
    .xs_zb_list{
        padding-left: 30upx;
        margin: auto 0;
    }
    .xs_zb_item{
        line-height: 43upx;
        align-content: center;
    }
    .xs_zb_color{
        width: 18upx;
        height: 18upx;
        background-color: #0084ff;
        border-radius: 2upx;
        flex-shrink: 0;
        margin: auto 15upx auto 0;
    }
    .xs_zb_text{
        font-family: "PingFang SC";
        font-size: 24upx;
        color: #7d8184;
        text-align: left;
        max-width: 120upx;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-right: 10upx;
        width: 120upx;
    }
    .xs_zb_bl{
        width: 80upx;
        text-align: left;
        font-size: 32upx;
        font-weight: normal;
        font-stretch: normal;
        color: #191f25;
        margin-right: 10upx;
    }
    .xs_zb_val{
        font-size: 32upx;
        font-weight: normal;
        font-stretch: normal;
        color: #191f25;
    }
    .xs_zb_btn_view{
        align-items: center;
    }
    .xs_zb_btn{
        font-family: PingFang-SC-Bold;
        font-size: 26upx;
        color: #7d8184;
        position: relative;
    }
    .xs_zb_btn_dept{
        margin-left: 50upx;
    }
    .xs_zb_btn_active{
        font-size: 30upx!important;
        color: #191f25!important;
        position: relative;
        font-weight: bold;
    }
    .xs_zb_btn_active::after{
        content: "";
        position: absolute;
        width: 43upx;
        height: 6upx;
        background-color: #0084ff;
        border-radius: 6upx;
        top: 80upx;
        left: 50%;
        transform: translateX(-50%);
        overflow: hidden;
    }

    /*底部空站位 兼容ios*/
    .empty_view{
        height: 60upx;
        flex-shrink: 0;
        width: 100%;
    }
</style>
