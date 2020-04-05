

<template>
    <view class="manage_view">
        <!--搜索-->
        <view class="input_view f_r_c">
            <image class="search_icon" mode="aspectFit" src="http://cdn.haofang.net/static/xffx-uniapp/msg/search.png"></image>
            <input @input="inputName"
                   :value="requestInfo.searchArchiveName"
                   class="input_default"
                   placeholder-class="input_pla"
                   placeholder="请输入经纪人姓名" />
            <view @click="removeName" class="cha_icon_view f_r_e" v-if="requestInfo.searchArchiveName">
                <image class="cha_icon" mode="aspectFit" src="http://cdn.haofang.net/static/xffx-uniapp/msg/chacha.png"></image>
            </view>
        </view>

        <scroll-view @scrolltolower="scrolltolower" scroll-y class="scroll_view"
                     v-if="list && list.length > 0">
            <block v-for="(item, index) in list" :key="index">
                <view class="f_r_s list_item" @click="goToList(item)">
                    <view class="f_r_s header_view">
                        <image mode="aspectFill" v-if="item.headerImg" :src="item.headerImg"></image>
                        <view class="avatar_empty" v-else>{{ item.firstName }}</view>
                    </view>

                    <view class="f_r_b list_cont">
                        <view class="f_c_s name_view">
                            <view class="dept_name">{{ item.deptName }}</view>
                            <view class="name">{{ item.name }}</view>
                        </view>

                        <view class="f_r_e info_right">
                            <view class="num">{{ item.num }}</view>
                            <view class="icon_view f_r_c" @click.stop="goChart(item)">
                                <image class="chart_icon" src="http://cdn.haofang.net/static/xffx-uniapp/customer/chat.png"></image>
                            </view>
                            <view class="icon_view f_r_c" @click.stop="takePhone(item)">
                                <image class="tel_icon" src="http://cdn.haofang.net/static/xffx-uniapp/customer/voice_call.png"></image>
                            </view>
                        </view>
                    </view>
                </view>
            </block>

            <scrollLoading v-if="isScrollIng && haveMoreData" :isScrollIng="true"></scrollLoading>
        </scroll-view>

        <!--无数据-->
        <noData v-if="list && list.length === 0"></noData>

        <showModal :modal='{
            title: "温馨提示",
            content: phone,
            confirmText: "呼叫",
            cancelColor: "rgba(0,0,0,0.6)",
            confirmColor: "#3396fb",
        }' ref="modal" @onModalChanged="onModalChanged"></showModal>
    </view>
</template>

<script>
    import {GetBrokerList} from "../../net/CustomerNet";
    import {Const} from "../../utils/Const";
    import scrollLoading from "@/components/scrollLoading.vue";
    import noData from  "@/components/noData.vue";
    import {Utils} from "../../utils/Utils";

    class ListItem {
        headerImg = ""; // 头像
        deptName = ""; // 门店
        name = ""; // 姓名
        firstName = ""; // 名字的第一个字
        num = 0; // 数量
        archiveId = ""; // 经纪人id
        cityId  = ""; // 城市id
        phone = "";  // 电话
    }

    class PrivateData {
        static pageRows = 10;
        static pageOffset = 1;
        static timeOutVal = null;
    }

    export default {
        components: {
            scrollLoading,
            noData
        },

        data() {
            return {
                requestInfo: {
                    searchArchiveName: ""
                },
                list: null,
                isScrollIng: false,
                haveMoreData: true,
                phone: ""
            }
        },

        onShow() {
            setTimeout(() => {
                uni.startPullDownRefresh();
            }, 100);
        },

        // 监听下拉刷新
        onPullDownRefresh() {
            PrivateData.pageOffset = 1;
            this.initData().then(list => {
                this.list = list;
                uni.stopPullDownRefresh();
            })
            .catch(() => {
                uni.stopPullDownRefresh();
            });
        },

        methods: {
            inputName(e) {
                this.requestInfo.searchArchiveName = e.detail.value;
                clearTimeout(PrivateData.timeOutVal);
                PrivateData.timeOutVal = setTimeout(() => {
                    PrivateData.pageOffset = 1;
                    this.initData().then(list => {
                        this.list = list;
                    });
                }, 250);
            },
            removeName() {
                this.requestInfo.searchArchiveName = "";
                PrivateData.pageOffset = 1;
                this.initData().then(list => {
                    this.list = list;
                });
            },

            initData() {
                let requestData = {
                    pageRows: PrivateData.pageRows,
                    pageOffset: PrivateData.pageOffset,
                    keyword: this.requestInfo.searchArchiveName
                };
                this.isScrollIng = true;
                return new GetBrokerList(requestData).send()
                    .then(res => {
                        if (res.errCode !== Const.success) {
                            return Promise.reject(res);
                        }

                        let data = res.data || {};
                        let list = data.list || [];
                        this.isScrollIng = false;
                        if (requestData.pageRows > list.length) {
                            this.haveMoreData = false;
                        }
                        let dealList = [];
                        for (let info of list) {
                            let item = new ListItem();
                            item.deptName = info.deptName || "";
                            item.name = info.brokerName || "";
                            item.headerImg = info.brokerAvatarUrl || "";
                            if (item.headerImg) {
                                item.headerImg = new Utils().dealImgSrcSize(
                                    item.headerImg, 120, 120
                                );
                            }
                            item.firstName = info.brokerName ? info.brokerName.substring(0, 1) : "";
                            item.num = info.custCount || 0;
                            item.archiveId = info.archiveId || "";
                            item.cityId = info.brokerCityId || "";
                            item.phone = info.brokerMobile || "";
                            dealList.push(item);
                        }
                        return dealList;
                    })
                    .catch(err => {
                        this.isScrollIng = false;
                        this.DifferenceApi.showToast(err.errMsg || "获取失败");
                        return err;
                    });
            },

            // 触底
            scrolltolower(e) {
                if(this.isScrollIng || !this.haveMoreData) return;

                this.isScrollIng = true;
                PrivateData.pageOffset++;
                this.initData().then(list => {
                   this.list = (this.list || []).concat(list);
                });
            },

            // 跳转到列表
            goToList(item) {
                uni.navigateTo({
                    url: "/pagesCustomer/archiveCustomerList/archiveCustomerList" +
                        "?archiveId=" + item.archiveId + "&name=" + item.name
                });
            },

            // 跳转都im
            goChart(item) {
                uni.navigateTo({
                    url: "/pagesMsg/msgDetail/msgDetail" +
                        "?messageId=" + item.archiveId + "&name=" + item.name
                });
            },

            // 拨打电话
            takePhone(item) {
                this.phone = item.phone;
                this.$refs.modal.show();
            },
            onModalChanged(val) {
                if (!val) return;

                if (!this.phone) {
                    this.DifferenceApi.showToast("暂无电话");
                    return;
                }

                this.DifferenceApi.makePhoneCall(this.phone);
            }
        }
    }
</script>

<style>
    page,.manage_view{
        width: 100%;
        height: 100%;
    }
    .input_view{
        width: 100%;
        height: 70upx;
        background: #f5f5f5;
        padding: 0 30upx;
        box-sizing: border-box;
        position: fixed;
        left: 0;
        top: 0;
        /*#ifdef H5*/
        top: 44px;
        /*#endif*/
        z-index: 99;
    }
    .input_pla{
        font-size: 24upx;
        color: #bbbbbb;
    }
    .input_default{
        width: 100%;
        text-align: left;
        height: 38upx;
        line-height: 38upx;
        margin: auto 0;
        font-size: 24upx;
        color: #101d36;
    }
    .search_icon{
        width: 26upx;
        height: 26upx;
        flex-shrink: 0;
        margin: auto 13upx auto 0;
        position: relative;
        top: -2upx;
    }
    .cha_icon_view{
        width: 72upx;
        height: 100%;
        flex-shrink: 0;
        margin-right: -25upx;
    }
    .cha_icon{
        width: 34upx;
        height: 34upx;
        margin: auto;
    }

    .scroll_view{
        width: 100%;
        height: 100%;
        padding-left: 30upx;
        box-sizing: border-box;
        padding-top: 70upx;
    }
    .list_item{
        padding-top: 20upx;
        background: #ffffff;
        box-sizing: border-box;
    }
    .header_view{
        margin: 0 26upx auto 0;
        flex-shrink: 0;
        width: 80upx;
        height: 80upx;
        border-radius: 100%;
        overflow: hidden;
    }
    .header_view>image{
        width: 100%;
        height: 100%;
    }
    .list_cont{
        height: 104upx;
        border-bottom: 1upx solid #f5f5f5;
        box-sizing: border-box;
        width: 100%;
    }
    .name_view{
        padding-top: 4upx;
        width: 100%;
        box-sizing: border-box;
    }
    .dept_name{
        height: 40upx;
        line-height: 40upx;
        text-align: left;
        font-size: 30upx;
        color: #333333;
    }
    .name{
        height: 30upx;
        font-size: 20upx;
        color: #999999;
        line-height: 30upx;
        margin-bottom: 30upx;
    }
    .info_right{
        flex-shrink: 0;
        height: 48upx;
        line-height: 48upx;
        margin: 20upx 0 auto 0;
    }
    .num{
        width: 90upx;
        text-align: center;
        font-size: 28upx;
        color: #666666;
    }
    .icon_view{
        width: 90upx;
        height: 48upx;
        border-left: 1upx solid #f5f5f5;
        box-sizing: border-box;
    }
    .chart_icon{
        width: 44upx;
        height: 42upx;
        flex-shrink: 0;
        margin: auto;
    }
    .tel_icon{
        width: 42upx;
        height: 42upx;
        flex-shrink: 0;
        margin: auto;
    }
    .avatar_empty{
        width: 100%;
        height: 100%;
        background: #3396fb;
        text-align: center;
        line-height: 80upx;
        color: #ffffff;
        font-size: 36upx;
    }
</style>
