

<template>
    <view class="list">
        <scroll-view v-if="contractList && contractList.length > 0"
                     @scrolltolower="scrolltolower"
                     scroll-y class="scroll_view">
            <view class="scroll_cont">
                <block v-for="(item, index) in contractList" :key="index">
                    <view class="f_r_s list_item">
                        <view class="f_r_s list_right">
                            <view class="f_c_s avatar_view">
                                <image @error="imgError(index)" class="avatar" mode="aspectFill" :src="item.avatar"></image>
                            </view>

                            <view class="f_r_b list_right_info">
                                <view class="f_c_s name_mobile">
                                    <view class="consultantName">{{ item.consultantName }}<text v-if="item.status != 3" class="consultant_status">{{ item.status == 2 ? '置业顾问' : item.status == 1 ? '经纪人' : '' }}</text></view>
                                    <view class="consultantMobile">{{ item.consultantMobile }}</view>
                                </view>

                                <view class="f_r_e">
                                    <image @click="goIm(item)" class="im_msg_icon" mode="aspectFill" src="http://cdn.haofang.net/static/xfldDeveloper/msg/mgs_list.png"></image>
                                    <image @click="takePhone(item)" class="mobile_icon" mode="aspectFill" src="http://cdn.haofang.net/static/xfldDeveloper/msg/tel_list.png"></image>
                                </view>
                            </view>
                        </view>
                    </view>
                </block>
            </view>

            <!--触底-->
            <block v-if="accountSource == 1">
                <scrollLoading v-if="isScrollIng && haveMoreData" :isScrollIng="true"></scrollLoading>
                <view v-if="!isScrollIng && !haveMoreData && contractList.length" class="no_more_data">没有更多数据了</view>
            </block>

            <view class="empty_view"></view>
        </scroll-view>

        <view v-if="contractList && contractList.length === 0" class="no_list_view f_c_c">
            <image mode="aspectFit" src="http://cdn.haofang.net/static/xfldDeveloper/msg/no_lian.png"></image>
            <view>暂时没有联系人</view>
        </view>

        <showModal :modal='{
            title: "拨打电话",
            content: currentClickItem.consultantMobile || "",
            confirmText: "呼叫",
            cancelColor: "rgba(0,0,0,0.6)",
            confirmColor: "#3396fb",
        }' ref="modal" @onModalChanged="onModalChanged"></showModal>
    </view>
</template>

<script>
    import {Const} from "../../utils/Const";
    import showModal from "@/components/showModal.vue";
    import {Utils} from "../../utils/Utils";
    import {LoginApp} from "../../utils/common";
    import {GetLoginModel} from "../../model/LoginSuccessModel";

    class ContractListItem {
        avatar = "";  // 头像
        consultantId = "";  // 置业顾问 id
        consultantImId = "";  // 置业顾问 云信 id
        consultantMobile = "";  // 置业顾问 电话
        consultantName = "";  // 置业顾问 姓名
        firstLetter = "";  // 姓名首字母
        firstName = ""; // 名字的第一个字
        status = 0; // 1 经纪人 2 置业顾问 3 管理员
    }

    class PrivateData {
        static pageOffset = 1;
        static pageRows = 20;
    }

    export default {
        components:{
            showModal
        },

        data() {
            return {
                contractList: null,
                currentClickItem: {},
                isScrollIng: false,
                haveMoreData: true,
                accountSource: GetLoginModel.getAccountSource()
            }
        },

        onLoad() {
            if (GetLoginModel.getAccountSource() == 2) {
                this.initData();
            }
            if (GetLoginModel.getAccountSource() == 1) {
                this.initAdviserList();
            }
        },

        methods: {
            initData() {
                this.haveMoreData = true;
                if (GetLoginModel.getAccountSource() == 2) {
                    return new LoginApp().upContractList()
                        .then(res => {
                            if(res.errCode !== Const.success) {
                                return Promise.reject(res);
                            }

                            let consultantList = res.data ? res.data.consultantList || [] : [];
                            let newConsultantList = [];
                            let developerList = [];
                            for (let info of consultantList) {
                                let item = new ContractListItem();
                                item.avatar = info.avatar || "";
                                if (item.avatar) {
                                    item.avatar = new Utils().dealImgSrcSize(
                                        item.avatar, 120, 120
                                    );
                                }
                                if (GetLoginModel.getAccountSource() == 2) {
                                    item.status = 3;
                                }
                                item.avatar = item.avatar || Const.imDefaultHeadImg;
                                item.consultantId = info.consultantId || "";
                                item.consultantImId = info.consultantImId || "";
                                item.consultantMobile = info.consultantMobile || "";
                                item.consultantName = info.consultantName || "";
                                item.firstLetter = info.firstLetter || "";
                                item.firstName = info.consultantName ? info.consultantName.substring(0, 1) : "";
                                if (info.managerFlag && info.managerFlag == 1) {
                                    developerList.push(item);
                                    continue;
                                }

                                newConsultantList.push(item);
                            }
                            this.contractList = developerList.concat(newConsultantList);
                            return this.contractList;
                        })
                        .catch(err => {
                            this.DifferenceApi.showToast(res.errMsg || "请求失败");
                        });
                }

                return new LoginApp().upContractList()
                    .then(res => {
                        if(res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        let consultantList = res.data ? res.data.consultantList || [] : [];
                        let newConsultantList = [];
                        let developerList = [];
                        for (let info of consultantList) {
                            let item = new ContractListItem();
                            item.avatar = info.avatar || "";
                            if (item.avatar) {
                                item.avatar = new Utils().dealImgSrcSize(
                                    item.avatar, 120, 120
                                );
                            }
                            item.avatar = item.avatar || Const.imDefaultHeadImg;
                            item.consultantId = info.consultantId || "";
                            item.consultantImId = info.consultantImId || "";
                            item.consultantMobile = info.consultantMobile || "";
                            item.consultantName = info.consultantName || "";
                            item.firstLetter = info.firstLetter || "";
                            item.status = 2;
                            item.firstName = info.consultantName ? info.consultantName.substring(0, 1) : "";
                            if (info.managerFlag && info.managerFlag == 1) {
                                developerList.push(item);
                                item.status = 3;
                                continue;
                            }

                            newConsultantList.push(item);
                        }
                        return developerList.concat(newConsultantList);
                    })
                    .catch(err => {
                        this.DifferenceApi.showToast(res.errMsg || "请求失败");
                    });
            },

            // 初始化置業顧問通讯录
            initAdviserList() {
                return Promise.all([
                    this.initData(),
                    this.dealArchiveList()
                ]).then(res => {
                    console.error(res);
                    this.contractList = res[1].concat(res[0]);
                })
            },

            // 处理经纪人列表
            dealArchiveList() {
                return new LoginApp().getBrokeList(PrivateData.pageOffset, PrivateData.pageRows)
                    .then(res => {
                        if(res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        let consultantList = res.data ? res.data.list || [] : [];
                        let newConsultantList = [];
                        let developerList = [];
                        if (consultantList.length < PrivateData.pageRows) {
                            this.haveMoreData = false;
                        }
                        for (let info of consultantList) {
                            let item = new ContractListItem();
                            item.avatar = info.brokerAvatarUrl || "";
                            if (item.avatar) {
                                item.avatar = new Utils().dealImgSrcSize(
                                    item.avatar, 120, 120
                                );
                            }
                            item.avatar = item.avatar || Const.imDefaultHeadImg;
                            item.consultantId = info.archiveId || "";
                            item.consultantImId = info.archiveId || "";
                            item.consultantMobile = info.brokerMobile || "";
                            item.consultantName = info.brokerName || "";
                            item.status = 1;
                            if (info.manageFlag && info.manageFlag == 1) {
                                item.status = 3;
                                item.consultantImId = "ld_" + item.consultantImId;
                                developerList.push(item);
                                continue;
                            }

                            newConsultantList.push(item);
                        }
                        return developerList.concat(newConsultantList);
                    });
            },

            // 跳转IM
            goIm(item) {
                if (!item.consultantImId) {
                    this.DifferenceApi.showToast("暂为找到该经纪人云信Id");
                    return;
                }

                uni.navigateTo({
                    url: "/pagesMsg/msgDetail/msgDetail?messageId="
                        + item.consultantImId + "&name=" + item.consultantName
                });
            },
            // 拨打电话
            takePhone(item) {
                if(!item.consultantMobile) {
                    this.DifferenceApi.showToast("暂无电话");
                    return;
                }

                this.currentClickItem = item;
                this.$refs.modal.show();
            },
            onModalChanged(val) {
                if(val) {
                    this.DifferenceApi.makePhoneCall(this.currentClickItem.consultantMobile);
                }
            },

            // 触底刷新
            scrolltolower() {
                if (GetLoginModel.getAccountSource() == 2) return;

                if (!this.haveMoreData || this.isScrollIng) return;

                this.isScrollIng = true;
                PrivateData.pageOffset++;
                this.dealArchiveList()
                    .then(list => {
                        this.contractList = (this.contractList || []).concat(list);
                        this.isScrollIng = false;
                    });
            },

            imgError(index) {
                let item = this.contractList[index] || {};
                item.avatar = Const.imDefaultHeadImg;
                this.$set(this.contractList, index, item)
            }
        }
    }
</script>

<style>
    page{
        width: 100%;
        height: 100%;
    }
    .list{
        width: 100%;
        height: 100%;
    }
    .scroll_view{
        width: 100%;
        height: 100%;
    }
    .scroll_cont{
        padding: 0 40upx;
        box-sizing: border-box;
    }
    .list_item{
        box-sizing: border-box;
        width: 100%;
    }
    .list_right{
        width: 100%;
        padding: 30upx 0 0;
        height: 152upx;
        box-sizing: border-box;
    }
    .avatar_view{
        width: 94upx;
        height: 94upx;
        border-radius: 94upx;
        overflow: hidden;
        flex-shrink: 0;
        margin: 0 30upx auto 0;
    }
    .avatar{
        width: 100%;
        height: 100%;
    }
    .list_right_info{
        height: 100%;
        border-bottom: 1upx solid #ebebeb;
        box-sizing: border-box;
        width: 100%;
    }
    .consultantName{
        font-size: 32upx;
        color: #191f25;
        line-height: 32upx;
        margin-top: 10upx;
        align-content: center;
    }
    .consultant_status{
        height: 32upx;
        line-height: 32upx;
        border-radius: 4upx;
        border: solid 1upx rgb(125,129,132,0.2);
        margin-left: 10upx;
        padding: 0 8upx;
        box-sizing: border-box;
        width: 85px;
        font-family: PingFang-SC-Medium;
        font-size: 22upx;
        font-weight: normal;
        font-stretch: normal;
        color: #a3a5a8;
        text-align: center;
        position: relative;
        top: -2upx;
    }
    .consultantMobile{
        font-size: 28upx;
        color: #a3a5a8;
        margin-top: 20upx;
        line-height: 28upx;
    }
    .im_msg_icon{
        width: 70upx;
        height: 70upx;
        flex-shrink: 0;
        margin: 16upx 40upx auto 0;
    }
    .mobile_icon{
        width: 70upx;
        height: 70upx;
        flex-shrink: 0;
        margin: 16upx 0 auto 0;
    }
    .empty_view{
        height: 30upx;
        flex-shrink: 0;
        width: 100%;
    }
    .no_list_view{
        flex: 1;
        background: #ffffff;
        height: 100%;
    }
    .no_list_view>image{
        width: 374upx;
        height: 168upx;
        margin: -100upx auto 0;
    }
    .no_list_view>view{
        text-align: center;
        line-height: 30upx;
        margin-top: 50upx;
        font-size: 30upx;
        color: #c0c1c3;
    }

    .no_more_data {
        height: 80upx;
        line-height: 80upx;
        text-align: center;
        font-size: 26upx;
        color: #666666;
    }
</style>
