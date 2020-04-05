<template>
    <view class="mine_view">
        <view class="title_view"></view>

        <view class="me_title">我的</view>

        <view class="top_cont">
            <view class="build_name">{{ buildName }}</view>

            <view class="top_info_view f_r_c">
                <view class="f_c_c top_info_item">
                    <view class="top_info_num">{{ dealNum }}</view>
                    <view class="top_info_text">签约数(组)</view>
                </view>
                <view class="f_c_c top_info_item">
                    <view class="top_info_num">{{ deptNum }}</view>
                    <view class="top_info_text">门店数(个)</view>
                </view>
                <view class="f_c_c top_info_item">
                    <view class="top_info_num">{{ consultantNum }}</view>
                    <view class="top_info_text">置业顾问(人)</view>
                </view>
            </view>
        </view>

        <view style="height: 48upx;width: 100%"></view>
        <block v-for="(item, index) in btnList" :key="index">
            <view class="btn_view f_r_b" @click.stop="goToPage(item)">
                <view class="btn_text"><collectFormId></collectFormId>{{ item.text }}</view>

                <image class="arrow_right" src="http://cdn.haofang.net/static/xfldDeveloper/mine/arrow_right.png"></image>
            </view>
        </block>
        <view style="height: 20upx;width: 100%"></view>
    </view>
</template>

<script>
    import {Notify} from "../../../utils/Notify";
    import {Notification} from "../../../utils/Notification";
    import {GetLoginModel} from "../../../model/LoginSuccessModel";
    import {BuildUserData} from "../../../net/SetNet";
    import {Const} from "../../../utils/Const";

    export default {
        data() {
            return {
                buildName: "",
                dealNum: "",  // 签约数
                deptNum: "",  // 门店数
                consultantNum: "",  // 置业顾问数
                btnList: [
                    {text: "置业顾问", pageToUrl: "/pagesStaff/staffList/staffList"},
                    {text: "个人中心", pageToUrl: "/pagesSet/personalCenter/personalCenter"},
                    {text: "通用设置", pageToUrl: "/pagesSet/setPage/setPage"},
                    {text: "关于我们", pageToUrl: "/pagesSet/aboutUs/aboutUs"}
                ]
            }
        },

        mounted() {
            this.initData();
            new Notification().addObserver(this, "PageShowChange", Notify.PageShowChange.Name);
            new Notification().addObserver(this, "LoginSuccessChange", Notify.LoginSuccessChange.Name);
        },

        destroyed() {
            new Notification().removeObserverAllNotification(this);
        },

        methods: {
            PageShowChange(name, params) {
                if (params.source === "mine") {
                    this.initData();
                }
            },

            // 登陆成功回调
            LoginSuccessChange() {
                this.initData();
            },

            // 初始化登录信息
            initData() {
                this.buildName = GetLoginModel.getBuildName() || "";
                new BuildUserData().send()
                    .then(res => {
                        if (res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        //  "buildName": "(string)楼盘名字",
                        //  "deptNum": "(int32)楼盘有多少个中介门店在卖",
                        //  "dealNum": "(int32)签约数",
                        //  "userNum": "(int32)置业顾问数"
                        let data = res.data || {};
                        this.dealNum = data.dealNum || "0";
                        this.deptNum = data.deptNum || "0";
                        this.consultantNum = data.userNum || "0";
                    })
                    .catch(err => {
                        this.DifferenceApi.showToast(err.errMsg || "获取楼盘信息失败");
                    });
            },

            // 页面跳转
            goToPage(item) {
                uni.navigateTo({
                    url: item.pageToUrl
                });
            }
        }
    }
</script>

<style>
    pages{
        width: 100%;
        height: 100%;
    }
    .mine_view{
        padding: 20upx 40upx 0;
        box-sizing: border-box;
        width: 100%;
    }
    .title_view{
        height: var(--status-bar-height);
        width: 100%;
    }
    .me_title{
        font-family: PingFang-SC-Bold;
        font-size: 48upx;
        font-weight: bold;
        font-stretch: normal;
        line-height: 134upx;
        color: #191f25;
    }
    .top_cont{
        height: 340upx;
        width: 100%;
        border-radius: 30upx;
        box-sizing: border-box;
        overflow: hidden;
        background: url("http://cdn.haofang.net/static/xfldDeveloper/mine/top_bg.png") center center no-repeat;
        background-size: cover;
        padding-top: 35upx;
    }
    .build_name{
        line-height: 110upx;
        height: 110upx;
        font-family: PingFang-SC-Bold;
        font-size: 44upx;
        font-stretch: normal;
        font-weight: bold;
        color: #ffffff;
        padding-left: 60upx;
        width: 100%;
        overflow: hidden;
        text-align: left;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .top_info_view{
        align-items: center;
        margin-top: 17upx;
    }
    .top_info_item{
        width: 100%;
        height: 155upx;
        text-align: center;
    }
    .top_info_num{
        font-size: 56upx;
        font-weight: bold;
        font-stretch: normal;
        line-height: 62upx;
        height: 62upx;
        color: #ffffff;
    }
    .top_info_text{
        font-family: PingFang-SC-Medium;
        font-size: 26upx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 53upx;
        color: #ffffff;
    }
    .btn_view{
        line-height: 120upx;
        border-bottom: 1upx solid #ebebeb;
        box-sizing: border-box;
        align-items: center;
    }
    .btn_text{
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        color: #191f25;
    }
    .arrow_right{
        width: 15upx;
        height: 28upx;
        flex-shrink: 0;
        margin: auto 0;
    }
</style>
