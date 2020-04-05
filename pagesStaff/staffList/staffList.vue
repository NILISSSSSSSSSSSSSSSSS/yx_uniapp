<template>
    <scroll-view @scroll="onScroll" class="staff_list" scroll-y @click="pageClick">
        <view class="null_view" v-if="userList.length>0"></view>
        <block v-for="(item,index) in userList" :key="index" v-if="userList.length>0">
            <view @click="goToDetail(item)" style="background-color: #ffffff;" class="f_r_s">
                <view>
                    <image class="avatar" mode="aspectFill" :src="item.userPhoto||'http://cdn.haofang.net/static/xfldDeveloper/customer/default_avater.png'"></image>
                </view>

                <view class="right_box">
                    <!--信息-->
                    <view class="f_r_b right_box_info">
                        <view class="f_r_s" style="align-items: center;">
                            <view class="name">{{item.userName||''}}</view>
                            <view class="phone">{{item.userMobile||''}}</view>
                        </view>

                        <view class="dian_icon_view f_r_e" @click.stop="openOperationList(item, index)">
                            <image class="dian_icon" src="http://cdn.haofang.net/static/xfldDeveloper/customer/dian_icon.png"></image>
                        </view>
                    </view>
                    <!--权限-->
                    <view class="f_r_s">
                        <view class="jurisdiction_title">权限</view>
                        <view class="jurisdiction_all f_r_s" v-if="item.userJurisdiction.length>0">
                            <block v-for="(val,key) in item.userJurisdiction" :key="key">
                                <view class="jurisdiction_content" v-if="val==1">报备审核</view>
                                <view class="jurisdiction_content" v-if="val==2">带看确客</view>
                                <view class="jurisdiction_content" v-if="val==3">认购管理</view>
                                <view class="jurisdiction_content" v-if="val==4">签约管理</view>
                                <view class="jurisdiction_content" v-if="val==5">结佣管理</view>
                            </block>
                        </view>
                    </view>

                    <view class="commission_box f_r_s">
                        <view class="one_type">
                            <text class="type_text">带看：</text>
                            <text class="type_num">{{item.seeCount||0}}</text>
                        </view>
                        <view class="one_type">
                            <text class="type_text">已签约：</text>
                            <text class="type_num">{{item.dealCount||0}}</text>
                        </view>
                        <view class="one_type">
                            <text class="type_text">已退佣：</text>
                            <text class="type_num">{{item.backCommssionCount||0}}</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="null_view"></view>
        </block>

        <view @click.stop="addStaff" v-if="userList.length>0">
            <image class="add" mode="aspectFill" src="http://cdn.haofang.net/static/xfldDeveloper/build/add.png"></image>
        </view>
        <!--无数据-->
        <noData v-if="userList && userList.length === 0"></noData>

        <view v-if="userList.length>0" class="empty_bottom_view"></view>

        <!--設置弹窗-->
        <view v-show="showSetModal" class="fixed_view f_c_c" :style="{top: fixTop+'px'}">
            <block v-for="(item, index) in setList" :key="index">
                <view @click.stop="setConfig(item)" class="f_r_c fixed_item">
                    <image :class="item.className" :src="item.imgSrc"></image>

                    <view :class="[item.classNameDisabled]" class="fixed_item_text">{{ item.text }}</view>
                </view>
            </block>
        </view>

        <!--权限分配弹窗-->
        <view @touchmove.stop.prevent="" class="authority_fixed f_c_c" v-if="authorityModal"
              @click="cancelAuthority">
            <view class="authority_view f_c_s" @click.stop="">
                <view class="authority_title">权限分配</view>
                <view class="authority_cont">
                    <checkbox-group @change="authorityChange">
                        <block v-for="(item, index) in authorityList" :key="index">
                            <label class="f_c_s authority_label">
                                <view class="f_r_s authority_label_info">
                                    <image class="authority_icon" :src="checkedAuthorityMap[item.value]?checkedImgSrc:checkImgSrc"></image>
                                    <checkbox style="display: none;" :value="item.value" :checked="checkedAuthorityMap[item.value]" />
                                    <view class="authority_label_title">{{ item.title }}</view>
                                </view>
                                <view class="authority_sub">{{ item.subject }}</view>
                            </label>
                        </block>
                    </checkbox-group>
                </view>
                <view class="authority_btn_view f_r_c">
                    <view @click.stop="cancelAuthority" class="authority_btn_cancel">取消</view>
                    <view @click.stop="confirmAuthority" class="authority_btn_confirm">确定</view>
                </view>
            </view>
        </view>

        <show-modal ref="modal" :modal="{
            title: '温馨提示',
            content: '您确定要注销'+(currentItem.userName||'')+'，确认操作？',
            confirmText: '确定',
        }" @onModalChanged="onModalChanged"></show-modal>

        <show-modal ref="ygModal" :modal="{
            title: '调动员工',
            content: '请先移交该员工的客户，才能进行调动',
            confirmText: '确定',
        }" @onModalChanged="onYgModalChanged"></show-modal>

        <!--选择楼盘-->
        <view @click="cancelChooseBuild" v-if="chooseBuildModal" class="choose_build_fixed f_c_e" @touchmove.stop.prevent="">
            <view class="choose_build_cont">
                <view class="choose_build_top f_r_b">
                    <view @click.stop="cancelChooseBuild" class="choose_build_cancel">取消</view>
                    <view @click.stop="confirmChooseBuild" class="choose_build_confirm">确定</view>
                </view>

                <picker-view class="choose_build_picker" @change="chooseBuildChange">
                    <picker-view-column class="choose_build_column">
                        <view class="choose_build_item" v-for="(item,index) in buildList"
                              @click.stop="chooseBuild(item)"
                              :key="index">{{ item.buildName }}</view>
                    </picker-view-column>
                </picker-view>
            </view>
        </view>
    </scroll-view>
</template>

<script>
    import {CancelUser, ChangeBuildConsultant, GetAllUserListForStaff, PermissionsAllocation} from "../../net/Staff";
    import noData from "../components/noData";
    import {Const} from "../../utils/Const";
    import {GetLoginModel} from "../../model/LoginSuccessModel";
    import {GetUserManageBuildList} from "../../net/IndexNet";

    class PrivateData {
        static nodeAll = [];
        static requesting = false;
        static buildList = [];
        static chooseBuildItem = null;
        static scrollTop = 0;
    }

    export default {
        components : {
            noData,
        },

        data(){
            return{
                userList : null,// 员工列表
                fixTop: "",
                showSetModal: false,
                setList: [
                    {
                        imgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/custom_qx.png",
                        text: "权限配置",
                        className: "custom_qx",
                        event: "qxConfig"
                    },
                    {
                        imgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/custom_dd.png",
                        text: "人员调动",
                        className: "custom_dd",
                        event: "ryConfig"
                    },
                    {
                        imgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/custom_yj.png",
                        text: "客户移交",
                        className: "custom_yj",
                        event: "yjConfig"
                    },
                    {
                        imgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/custom_close.png",
                        text: "账号注销",
                        className: "custom_close",
                        event: "zxConfig"
                    },
                ],
                currentIndex: 0,
                currentItem: {
                    userName: ""
                },
                authorityList: [
                    {
                        title: "报备审核",
                        subject: "报备客户后审核是否同意带看",
                        value: 1
                    },
                    {
                        title: "带看确客",
                        subject: "客户到现场后确认是否进入带看",
                        value: 2
                    },
                    {
                        title: "认购管理",
                        subject: "确认客户是否达成购买意向",
                        value: 3
                    },
                    {
                        checked: false,
                        title: "签约管理",
                        subject: "确认客户是否签署购房合同",
                        value: 4
                    },
                    {
                        checked: false,
                        title: "结佣管理",
                        subject: "对审核结佣的信息进行确认和结算",
                        value: 5
                    },
                ],
                checkedAuthorityMap: {},
                checkImgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/yg_check.png",
                checkedImgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/yg_checked.png",
                authorityModal: false,
                buildList: [],
                chooseBuildModal: false
            }
        },

        onShow(){
            this.iniData();
            this.showSetModal = false;
        },

        /* 去掉下拉刷新
        onPullDownRefresh() {
            this.iniData().then(() => {
                this.DifferenceApi.showToast("数据更新成功");
                uni.stopPullDownRefresh();
            }).catch(() => {
                this.DifferenceApi.showToast("数据更新成功");
                uni.stopPullDownRefresh();
            });
        },*/

        methods : {
            // 初始化楼盘列表
            initBuildList() {
                if (!GetLoginModel.getBuildId() || GetLoginModel.getBuildId() == 0) {
                    PrivateData.buildList = [];
                    return;
                }

                return new GetUserManageBuildList().send()
                    .then(res => {
                        if (res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        PrivateData.buildList = res.data ? res.data.buildList || [] : [];
                        let buildList = [];
                        for (let info of PrivateData.buildList) {
                            if (!info.buildId || !info.buildName || info.isActive == 1) continue;

                            buildList.push({
                                buildId: info.buildId,
                                buildName: info.buildName,
                                isActive: info.isActive || 0,  // 当前选择楼盘 0=否 1=是
                            });
                        }
                        this.buildList = buildList;
                    })
                    .catch(err => {
                        PrivateData.buildList = [];
                    });
            },
            iniData(){
                this.initBuildList();
                return new GetAllUserListForStaff().send()
                    .then((res)=>{
                        if (res.errCode != 200){
                            this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                            this.userList = [];
                            return res;
                        }

                        if (res.data.userList && res.data.userList.length<0){
                            this.userList = [];
                            return res;
                        }

                        let userList = [];
                        for (let item of res.data.userList){
                            if (item.userJurisdiction){
                                item.userJurisdiction = item.userJurisdiction.split(' ');
                            }else {
                                item.userJurisdiction = [];
                            }
                            userList.push(item);
                        }
                        this.userList = userList;
                        setTimeout(() => {
                            this.createSelectorQuery(this).selectAll(".dian_icon")
                                .boundingClientRect(data => {
                                    PrivateData.nodeAll = [];
                                    for (let info of data) {
                                        info.top += PrivateData.scrollTop;
                                        PrivateData.nodeAll.push(info);
                                    }
                            }).exec();
                        }, 200);
                        return res;
                    })
                    .catch((res)=>{
                        this.DifferenceApi.showToast(res.errMsg || "请求失败");
                        return res;
                    });
            },
            addStaff(){
                uni.navigateTo({
                    url: '/pagesStaff/addStaff/addStaff'
                });
            },
            pageClick() {
                this.showSetModal = false;
            },
            openOperationList(item, index){
                let setList = this.setList;
                setList[1].classNameDisabled = "";
                setList[2].classNameDisabled = "";
                if (!item.seeCount || item.seeCount == 0) {
                    setList[2].classNameDisabled = "fixed_item_disabled";
                }
                if (PrivateData.buildList.length < 2) {
                    setList[1].classNameDisabled = "fixed_item_disabled";
                }
                this.setList = setList;
                this.currentItem = item;
                let fixTop = PrivateData.nodeAll[index].top;
                console.log(fixTop,'--fixTop--');
                if (!this.showSetModal) {
                    this.currentIndex = index;
                    this.fixTop = fixTop;
                    setTimeout(() => {
                        this.showSetModal = true;
                    }, 20);
                    return;
                }

                this.currentIndex = index;
                this.showSetModal = false;
                setTimeout(() => {
                    this.fixTop = fixTop;
                }, 10);
                setTimeout(() => {
                    this.showSetModal = true;
                }, 20);
            },

            // 监听滚动条
            onScroll(e) {
                PrivateData.scrollTop = e.detail.scrollTop || 0;
            },

            // 操作
            setConfig(item) {
                this[item.event](item);
            },

            // 注销
            zxConfig(item) {
                this.$refs.modal.show();
            },
            onModalChanged(val) {
                if (val) {
                    if (PrivateData.requesting) return;

                    PrivateData.requesting = true;
                    new CancelUser({'userId':this.currentItem.userId}).send()
                        .then((res)=>{
                            if (res.errCode !== Const.success){
                                return Promise.reject(res);
                            }

                            this.showSetModal = false;
                            this.DifferenceApi.showToast("注销成功");
                            this.iniData();
                            PrivateData.requesting = false;
                        })
                        .catch((res)=>{
                            PrivateData.requesting = false;
                            this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
                        });
                }
            },

            // 权限
            qxConfig(item) {
                let checkedAuthorityMap = {};
                for (let val of (this.currentItem.userJurisdiction || [])) {
                    checkedAuthorityMap[Number(val)] = true;
                }
                this.checkedAuthorityMap = checkedAuthorityMap;
                this.authorityModal = true;
            },

            // 人员调动
            ryConfig(item) {
                if (PrivateData.buildList.length < 2) return;

                if (this.currentItem.seeCount && this.currentItem.seeCount > 0) {
                    this.$refs.ygModal.show();
                    return;
                }

                this.chooseBuildModal = true;
                this.chooseBuildChange({detail: {value: [0]}})
            },
            onYgModalChanged(val) {
                if (val) {
                    uni.navigateTo({
                       url: "/pagesStaff/customerTransfer/chooseCustomer?userId=" + this.currentItem.userId
                    });
                }
            },
            // 选择楼盘
            chooseBuildChange(e) {
                PrivateData.chooseBuildItem = this.buildList[e.detail.value[0]];
            },
            chooseBuild(item) {
                PrivateData.chooseBuildItem = item;
                this.confirmChooseBuild();
            },
            // 取消
            cancelChooseBuild() {
                this.chooseBuildModal = false;
            },
            // 确定
            confirmChooseBuild() {
                if (PrivateData.requesting) return;

                uni.showLoading({title: "设置中...", mask: true});
                PrivateData.requesting = true;
                new ChangeBuildConsultant({
                    buildId: PrivateData.chooseBuildItem.buildId,
                    userId: this.currentItem.userId
                }).send().then(res => {
                    if (res.errCode !== Const.success) {
                        return Promise.reject(res);
                    }

                    this.showSetModal = false;
                    this.iniData();
                    uni.hideLoading();
                    this.cancelAuthority();
                    PrivateData.requesting = false;
                    this.chooseBuildModal = false;
                    this.DifferenceApi.showToast("人员调动成功");
                }).catch((res) => {
                    uni.hideLoading();
                    PrivateData.requesting = false;
                    this.DifferenceApi.showToast(res.errMsg || "人员调动失败");
                });
            },

            // 客户移交
            yjConfig(item) {
                if (item.classNameDisabled
                    && item.classNameDisabled.indexOf("fixed_item_disabled") >= 0 ) return;

                this.onYgModalChanged(true);
            },
            // 权限change
            authorityChange(e) {
                let checkedAuthorityMap = {};
                for (let val of (e.detail.value || [])) {
                    checkedAuthorityMap[Number(val)] = true;
                }
                this.checkedAuthorityMap = checkedAuthorityMap;
            },
            // 取消
            cancelAuthority() {
                this.authorityModal = false;
            },
            // 确定
            confirmAuthority() {
                let userJurisdictionList = [];
                let userJurisdiction = "";
                for (let k in this.checkedAuthorityMap) {
                    if (this.checkedAuthorityMap[k]) {
                        userJurisdictionList.push(Number(k));
                    }
                }
                if (userJurisdictionList.length > 0) {
                    userJurisdiction = userJurisdictionList.join(" ");
                }
                if (PrivateData.requesting) return;

                uni.showLoading({title: "设置中...", mask: true});
                PrivateData.requesting = true;
                new PermissionsAllocation({
                    userJurisdiction: userJurisdiction,
                    userId: this.currentItem.userId
                }).send().then(res => {
                    if (res.errCode !== Const.success) {
                        return Promise.reject(res);
                    }

                    this.showSetModal = false;
                    this.iniData();
                    uni.hideLoading();
                    this.cancelAuthority();
                    PrivateData.requesting = false;
                    this.DifferenceApi.showToast("权限设置成功");
                }).catch((res) => {
                    uni.hideLoading();
                    PrivateData.requesting = false;
                    this.DifferenceApi.showToast(res.errMsg || "权限设置失败");
                });
            },

            // 置业顾问详情
            goToDetail(item) {
                uni.navigateTo({
                    url: "/pagesStaff/staffCustomerList/staffCustomerList?userId=" + item.userId + '&userName=' + item.userName
                });
            },
        },
    }
</script>

<style>
    /*选择楼盘*/
    .choose_build_fixed{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        z-index: 120;
    }
    .choose_build_cont{
        width: 100%;
        background: #ffffff;
    }
    .choose_build_top{
        height: 100upx;
        line-height: 100upx;
        border-bottom: 1upx solid #ebebeb;
        padding: 0 40upx;
        box-sizing: border-box;
    }
    .choose_build_cancel{
        font-family: PingFang-SC-Medium;
        font-size: 32upx;
        font-weight: normal;
        font-stretch: normal;
        color: #c0c1c3;
        text-align: left;
    }
    .choose_build_confirm{
        font-family: PingFang-SC-Medium;
        font-size: 32upx;
        font-weight: normal;
        font-stretch: normal;
        color: #0084ff;
        position: relative;
        text-align: right;
    }
    .choose_build_picker{
        height: 400upx;
    }
    .choose_build_column{
        flex: 1;
    }
    .choose_build_item{
        text-align: center;
        font-size: 34upx;
        color: #101d36;
        height: 80upx;
        line-height: 80upx;
    }

    /*彈窗*/
    .fixed_view{
        z-index: 99;
        position: absolute;
        right: 20upx;
        top: 30px;
        background: url("http://cdn.haofang.net/static/xfldDeveloper/customer/people_bg.png?t=5454") center center no-repeat;
        background-size: cover;
        width: 324upx;
        height: 412upx;
    }
    .fixed_item{
        align-items: center;
        margin-bottom: 42upx;
    }
    .fixed_item:last-child{
        margin-bottom: 0;
    }
    .custom_qx{
        width: 30upx;
        height: 34upx;
        margin: auto 6upx;
    }
    .custom_dd{
        width: 42upx;
        height: 34upx;
        margin: auto 0;
    }
    .custom_yj{
        width: 37upx;
        height: 37upx;
        margin: auto 2.5upx;
    }
    .custom_close{
        width: 34upx;
        height: 37upx;
        margin: auto 4upx;
    }
    .fixed_item_text{
        line-height: 30upx;
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        font-weight: normal;
        font-stretch: normal;
        color: #191f25;
        padding-left: 23upx;
        box-sizing: border-box;
    }
    .empty_bottom_view{
        height: 200upx;
        background: #f8f8f8;
    }
    .fixed_item .fixed_item_disabled{
        color: #c0c1c3;
    }

    /*权限配置弹窗*/
    .authority_fixed{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        z-index: 110;
    }
    .authority_view{
        margin: auto;
        width: 560upx;
        background-color: #ffffff;
        border-radius: 30upx;
        padding-top: 60upx;
        box-sizing: border-box;
    }
    .authority_title{
        font-family: PingFang-SC-Bold;
        font-size: 38upx;
        font-weight: bold;
        font-stretch: normal;
        line-height: 38upx;
        color: #191f25;
        text-align: center;
    }
    .authority_cont{
        padding: 56upx 0 56upx 45upx;
        box-sizing: border-box;
        width: 100%;
    }
    .authority_label{
        margin-bottom: 36upx;
    }
    .authority_label:last-child{
        margin-bottom: 0;
    }
    .authority_icon{
        width: 40upx;
        height: 40upx;
        margin: auto 20upx auto 0;
        flex-shrink: 0;
    }
    .authority_label_info{
        align-items: center;
    }
    .authority_sub{
        font-family: PingFang-SC-Medium;
        font-size: 24upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24upx;
        color: #c0c1c3;
        text-align: left;
        padding-left: 60upx;
        box-sizing: border-box;
        margin-top: 15upx;
    }
    .authority_label_title{
        font-family: PingFang-SC-Medium;
        font-size: 32upx;
        font-weight: bold;
        font-stretch: normal;
        line-height: 32upx;
        color: #191f25;
    }
    .authority_btn_view{
        height: 100upx;
        line-height: 100upx;
        align-items: center;
        border-top: 1upx solid #ebebeb;
    }
    .authority_btn_view>view{
        flex: 1;
        text-align: center;
    }
    .authority_btn_cancel{
        font-family: PingFang-SC-Medium;
        font-size: 32upx;
        font-weight: normal;
        font-stretch: normal;
        color: #c0c1c3;
    }
    .authority_btn_confirm{
        font-family: PingFang-SC-Medium;
        font-size: 32upx;
        font-weight: normal;
        font-stretch: normal;
        color: #0084ff;
        position: relative;
    }
    .authority_btn_confirm::after{
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 2upx;
        height: 70upx;
        background-color: #ebebeb;
        border-radius: 1upx;
    }


    page,.staff_list{
        width: 100%;
        height: 100%;
        background-color: #f8f8f8;
    }
    .null_view{
        width: 100%;
        height: 20upx;
        background-color: #f8f8f8;
    }
    .avatar{
        width: 96upx;
        height: 96upx;
        margin: 40upx 30upx auto 30upx;
        border-radius: 100%;
        overflow: hidden;
        flex-shrink: 0;
    }
    .no_broker_avatar{
        width: 96upx;
        height: 96upx;
        margin: 40upx 30upx auto 30upx;
        border-radius: 100%;
        background-color: #3396fb;
        overflow: hidden;
        flex-shrink: 0;
        color: #ffffff;
        font-size: 30upx;
        text-align: center;
        line-height: 90upx;
    }
    .right_box{
        flex: 1;
        margin-top: 55upx;
    }
    .right_box_info{
        align-items: center;
    }
    .name{
        font-family: PingFang-SC-Bold;
        font-size: 34upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #191f25;
        margin: auto 18upx auto 0;
        max-width: 300upx;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .phone{
        font-family: PingFang-SC-Medium;
        font-size: 28upx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0upx;
        color: #788184;
        margin: auto 18upx auto 0;
    }
    .dian_icon_view{
        width: 170upx;
        height: 100upx;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 80;
    }
    .dian_icon{
        width: 25upx;
        height: 5upx;
        margin: auto 50upx auto auto;
    }

    .jurisdiction_title{
        font-family: PingFang-SC-Medium;
        font-size: 22upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 22upx;
        letter-spacing: 0upx;
        color: #a3a5a8;
        margin:16upx 10upx auto 0;
    }
    .jurisdiction_all{
        width: 350upx;
        flex-wrap:wrap;
    }
    .jurisdiction_content{
        font-family: PingFang-SC-Medium;
        font-size: 22upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 22upx;
        letter-spacing: 0upx;
        color: #7d8184;
        padding: 6upx;
        background-color: #f8f8f8;
        margin-right: 10upx;
        margin-top: 10upx;
    }

    .commission_box{
        margin-top: 40upx;
        margin-bottom: 40upx;
    }
    .one_type{
        margin-right: 50upx;
    }
    .type_text{
        font-family: PingFang-SC-Medium;
        font-size: 26upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 26upx;
        letter-spacing: 0upx;
        color: #a3a5a8;
        margin-top: auto;
        margin-bottom: auto;
    }
    .type_num{
        font-family: PingFang-SC-Bold;
        font-size: 30upx;
        font-weight: normal;
        letter-spacing: 0upx;
        color: #191f25;
        margin-top: auto;
        margin-bottom: auto;
    }
    .add{
        position: fixed;
        right: 48upx;
        bottom: 54upx;
        width: 90upx;
        height: 90upx;
        z-index: 88;
    }
</style>
