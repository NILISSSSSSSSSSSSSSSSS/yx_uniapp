<template>
    <!--聊天评价-->
    <view class="finish_evaluate_view_im">
        <view class="see-evaluate-header_im">
            <view class="see-evaluate-tt-im">请为我的服务进行评价吧！</view>
            <!-- <view class="see-evaluate-close-im" @click="completeEvaClose"></view> -->
        </view>

        <view class="f_r_c finish_evaluate_star_view_im">
            <block v-for="(url, index) in noFinishServiceStarList" :key="index">
                <image @click="noFinishStarBtn(index)" class="finish_evaluate_star_im"
                       :src="url"><collectFormId></collectFormId></image>
            </block>
        </view>

        <view class="starTexMap_des_evaluate" v-if="starTexMap[serviceStarVal]">{{ starTexMap[serviceStarVal] }}</view>

        <view class="evaluate_reason_view_im">
            <!-- 原因 -->
            <view class="no_finish_reason_view_im f_r_s">
                <block v-for="(text, index) in (noMeetReasonMap[serviceStarVal] || [])" :key="index">
                    <view :class="[noMeetReasonSelectedMap[serviceStarVal] && ((noMeetReasonSelectedMap[serviceStarVal][0] && noMeetReasonSelectedMap[serviceStarVal][0] == index) || (noMeetReasonSelectedMap[serviceStarVal][1] && noMeetReasonSelectedMap[serviceStarVal][1] == index) || (noMeetReasonSelectedMap[serviceStarVal][2] && noMeetReasonSelectedMap[serviceStarVal][2] == index) || (noMeetReasonSelectedMap[serviceStarVal][3] && noMeetReasonSelectedMap[serviceStarVal][3] == index) || (noMeetReasonSelectedMap[serviceStarVal][4] && noMeetReasonSelectedMap[serviceStarVal][4] == index) || (noMeetReasonSelectedMap[serviceStarVal][5] && noMeetReasonSelectedMap[serviceStarVal][5] == index) || (noMeetReasonSelectedMap[serviceStarVal][6] && noMeetReasonSelectedMap[serviceStarVal][6] == index) || (noMeetReasonSelectedMap[serviceStarVal][7] && noMeetReasonSelectedMap[serviceStarVal][7] == index)) ? 'no_finish_reason_item_active_im' : '',text.length > 6 ? 'no_finish_reason_item_im_more' : '']"
                          @click="noMeetReasonChoose(index)"
                          class="no_finish_reason_item_im"><collectFormId></collectFormId>{{ text }}</view>
                </block>
            </view>

            <!--输入框-->
            <view class="no_finish_remark_im">
			<textarea
                    placeholder="其他建议或吐槽(匿名提交、请放心评价)"
                    @input="completeEvaContentInput"
                    class="no_finish_textarea_im"
                    placeholder-class="no_finish_textarea_pl_im"
                    maxlength="100"></textarea>
                <!--<view class="no_finish_textarea_num_im">{{completeEvaContent.length}}/100字</view>-->
            </view>

            <!--提交-->
            <view class="no_finish_confirm_btn_im" @click='submitCompleteEvaData'><collectFormId></collectFormId>提交</view>
        </view>
    </view>
</template>

<script>
    import { PaySuccessWriteServiceEvaluate } from "@/net/entrust/EntrustDetail.js";
    import { UserInfoModel } from "@/model/UserInfoModel.js";
    import { GetStarList } from "@/utils/common.js";
    import {ChartDetailItem, EvaluateChartItem} from "@/utils/ImChart";
    import { formatTimeNew } from "@/utils/common.js";
    import { Notify } from "@/utils/Notify.js";
    import { Notification } from "@/utils/Notification.js";

    export default {
        data() {
            return {
                finishServiceStarList: [],  // 已评价的星数组
                noFinishServiceStarList: [],  // 未评价的星数
                serviceStarVal: 4,  // 未评价星
                // 不满意的原因
                noMeetReasonMap: {
                    1: ["虚假宣传", "反馈不及时", "服务态度恶劣", "专业知识不强", "不了解房源信息", "不了解市场行情"],
                    2: ["虚假宣传", "反馈不及时", "服务态度恶劣", "专业知识不强", "不了解房源信息", "不了解市场行情"],
                    3: ["虚假宣传", "反馈不及时", "服务态度恶劣", "专业知识不强", "不了解房源信息", "不了解市场行情"],
                    4: ["虚假宣传", "反馈不及时", "服务态度恶劣", "专业知识不强", "不了解房源信息", "不了解市场行情"],
                    5: ["熟悉市场行情", "了解周边配套", "房源讲解细致", "服务周到", "诚实可信"]
                },
                starTexMap: {
                    1: "非常不满意，各方面都很差",
                    2: "不满意，比较差",
                    3: "一般，还需改善",
                    4: "比较满意，仍可改善",
                    5: "非常满意，无可挑剔"
                },
                noMeetReasonSelectedMap: {
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                    5: []
                },
                completeEvaContent: "",  // 未评价输入原因
            }
        },

        props: {
            // 经纪人id
            archiveId: {
                type: String,
                default: ""
            },
            // 服务初始化评分
            evaStar: {
                type: String | Number,
                default: 4
            },
        },

        watch: {
            evaStar(newValue, oldValue) {
                this.serviceStarVal = this.evaStar;
                this.initNoFinishStarList();
            }
        },

        mounted() {
            this.serviceStarVal = this.evaStar;
            this.initNoFinishStarList();
        },

        methods: {
            // 关闭
            completeEvaClose() {
                this.$emit("onEvaluateChanged", {show: false});
            },

            // 支付后未评价
            initNoFinishStarList() {
                this.noFinishServiceStarList = new GetStarList(this.serviceStarVal,
                    "../../", 5, 0).getList(true,
                    "https://zdzfapi.haofang.net/Public/wxApp/images/entrustDetail/ic_star_yellow.png",
                    "https://zdzfapi.haofang.net/Public/wxApp/images/entrustDetail/ic_star_gray.png");
            },

            // 未评价星点击事件
            noFinishStarBtn(index) {
                this.serviceStarVal = index + 1;
                this.initNoFinishStarList();
            },
            // 选择原因
            noMeetReasonChoose(i) {
                let selected = this.noMeetReasonSelectedMap[this.serviceStarVal];
                let index = (selected).findIndex((info) => {
                    return info == i;
                });
                do{
                    if(index >= 0) {
                        selected.splice(index, 1);
                        break;
                    }

                    // 暂时没有限制
                    // if(selected.length >= 5) {
                    //     selected.shift();
                    //     selected.push(i);
                    //     break;
                    // }

                    selected.push(i);
                }while(false);
                this.noMeetReasonSelectedMap[this.serviceStarVal] = selected;
            },
            // 输入原因
            completeEvaContentInput(e) {
                this.completeEvaContent = e && e.detail ? e.detail.value || "" : "";
            },
            // 匿名提交
            submitCompleteEvaData() {
                let that = this;
                let me = new UserInfoModel().getModel("me") || {};
                let reasonSelected = this.noMeetReasonSelectedMap[this.serviceStarVal] || [];
                // 原来有小于四颗星的必填
                // if(this.serviceStarVal < 4 && reasonSelected.length == 0
                //     && this.completeEvaContent.length == 0) {
                //     uni.showToast({
                //         icon: "none",
                //         title: "请选择标签或填写评论指出经纪人的不足吧"
                //     });
                //     return;
                // }

                let request = {
                    userId: me.userId || "",
                    archiveId: this.archiveId,
                    evaContent: this.completeEvaContent,
                    evaTagIndex: reasonSelected.join(","),
                    evaStar: this.serviceStarVal
                };
                console.error("---request---", request);
                let content = {
                    type: 140,
                    data: {
                        evaContent: request.evaContent,
                        evaTagIndex: request.evaTagIndex,
                        evaStar: request.evaStar,
                    }
                };
                let ext = {
                    evaContent: request.evaContent,
                    evaTagIndex: request.evaTagIndex,
                    evaStar: request.evaStar,
                };
                let ncItem = new EvaluateChartItem();
                ncItem.evaContent = request.evaContent;
                ncItem.evaTagIndex = request.evaTagIndex;
                ncItem.evaStar = request.evaStar;
                this.ImChart.imChartVal.sendCustomMsg({
                    scene: 'p2p',
                    to: this.archiveId,
                    content: JSON.stringify(content),
                    custom: JSON.stringify(ext),
                    done: function (err, msg) {
                        let item = new ChartDetailItem();
                        item.type = "evaluate";
                        item.content = ncItem;
                        item.mySend = true;
                        item.isRead = false;
                        item.time = formatTimeNew(new Date().getTime());
                        that.completeEvaClose();
                        new Notification().postNotification(Notify.UpChartMsgChanged.Name, item);
                    }
                });
            },
        },
    }
</script>

<style scoped>
    .no_finish_reason_item_im_more{
        font-size: 22upx!important;
    }
    .evaluate_reason_view_im{
        padding: 0 30upx;
        box-sizing: border-box;
    }
    .starTexMap_des_evaluate{
        text-align: center;
        color: #f7a023;
        font-size: 24upx;
    }
    .see-evaluate-header_im{
        position: relative;
        text-align: center;
        font-size: 24upx;
        color: #101D36;
        height: 80upx;
        line-height: 80upx;
        border-bottom: 1upx solid #f5f5f5;
        margin-bottom: 20upx;
    }
    .see-evaluate-tt-im{
        font-weight: 400;
        font-size: 30upx;
    }
    .see-evaluate-close-im{
        position: absolute;
        width: 80upx;
        height: 80upx;
        top: 0;
        right: 0;
        background: url(http://cdn.haofang.net/static/uuminiapp/entrustDetail/close2.png) center center no-repeat;
        background-size: 26upx 26upx;
    }
    .finish_evaluate_view_im{
        background:#fff;
        width:100%;
        box-sizing:border-box;
        border-radius: 12upx;
        overflow: hidden;
        padding-bottom: 40upx;
        margin-top: 20upx;
    }
    .no_finish_reason_view_im{
        width: 100%;
        margin: 35upx auto 26upx;
        flex-wrap:wrap;
        padding: 0 10upx;
        box-sizing: border-box;
    }
    .no_finish_reason_item_im{
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        padding: 0 10upx;
        width: 30%;
        height:60upx;
        line-height:54upx;
        box-sizing:border-box;
        text-align:center;
        border:1upx solid #F5F5F5;
        border-radius: 30upx;
        background-color: #ffffff;
        color:#999;
        font-size: 26upx;
        position:relative;
        margin-right: 5%;
        margin-bottom: 17upx;
    }
    .no_finish_reason_view_im .no_finish_reason_item_im:nth-child(3n){
        margin-right: 0;
    }
    .no_finish_reason_view_im .no_finish_reason_item_active_im{
        border:1upx solid #ffba68;
        color:#f7a023;
        background-color:#fff8ec;
    }
    .no_finish_remark_im{
        position:relative;
        width: 100%;
        height:130upx;
        overflow:hidden;
        margin:0 auto 0;
        box-sizing: border-box;
    }
    .no_finish_textarea_im{
        background-color:#f8f8f8;
        width:100%;
        height:100%;
        font-size:28upx;
        border-radius:8upx;
        padding:15upx 20upx;
        box-sizing:border-box;
        color:#101D36;
    }
    .no_finish_textarea_num_im{
        font-size:26upx;
        position:absolute;
        right:15upx;
        bottom:18upx;
        color:#888;
    }
    .no_finish_textarea_pl_im{
        font-size: 28upx;
        color: #c6cacf;
        background-color: #f8f8f8;
    }
    .no_finish_confirm_btn_im{
        height:80upx;
        line-height:80upx;
        border-radius:40upx;
        text-align:center;
        border: 1px solid #ff5400;
        color:#ff5400;
        font-size:30upx;
        letter-spacing:1upx;
        margin-top: 40upx;
    }
    .finish_evaluate_star_view_im{
        height: 50upx;
        margin: 44upx auto 20upx;
    }
    .finish_evaluate_star_im{
        width:50upx;
        height:50upx;
        flex-shrink: 0;
        margin: auto 57upx auto 0;
    }
    .finish_evaluate_star_view_im .finish_evaluate_star_im:last-child{
        margin-right: 0;
    }
</style>
