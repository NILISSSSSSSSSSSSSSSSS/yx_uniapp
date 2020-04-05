<template>
    <!--聊天评价-->
    <view class="finish_evaluate_view_me_im">
        <view class="see-evaluate-header_im">
            <view class="see-evaluate-tt-im">感谢你的评价哦</view>
        </view>

        <view class="f_r_c finish_evaluate_star_view_im">
            <block v-for="(url, index) in noFinishServiceStarList" :key="index">
                <image class="finish_evaluate_star_im"
                       :src="url"></image>
            </block>
        </view>

        <view class="starTexMap_des_evaluate" v-if="starTexMap[serviceStarVal]">{{ starTexMap[serviceStarVal] }}</view>

        <view class="evaluate_reason_view_im">
            <!-- 原因 -->
            <view class="no_finish_reason_view_im f_r_s"
                v-if="noMeetReasonMap[serviceStarVal] && noMeetReasonMap[serviceStarVal].length > 0">
                <block v-for="(text, index) in (noMeetReasonMap[serviceStarVal] || [])" :key="index">
                    <view v-if="noMeetReasonSelectedMap[serviceStarVal] && ((noMeetReasonSelectedMap[serviceStarVal][0] && noMeetReasonSelectedMap[serviceStarVal][0] == index) || (noMeetReasonSelectedMap[serviceStarVal][1] && noMeetReasonSelectedMap[serviceStarVal][1] == index) || (noMeetReasonSelectedMap[serviceStarVal][2] && noMeetReasonSelectedMap[serviceStarVal][2] == index) || (noMeetReasonSelectedMap[serviceStarVal][3] && noMeetReasonSelectedMap[serviceStarVal][3] == index) || (noMeetReasonSelectedMap[serviceStarVal][4] && noMeetReasonSelectedMap[serviceStarVal][4] == index) || (noMeetReasonSelectedMap[serviceStarVal][5] && noMeetReasonSelectedMap[serviceStarVal][5] == index) || (noMeetReasonSelectedMap[serviceStarVal][6] && noMeetReasonSelectedMap[serviceStarVal][6] == index) || (noMeetReasonSelectedMap[serviceStarVal][7] && noMeetReasonSelectedMap[serviceStarVal][7] == index))"
                        :class="text.length > 6 ? 'no_finish_reason_item_im_more' : ''"
                        class="no_finish_reason_item_im no_finish_reason_item_active_im">{{ text }}</view>
                </block>
            </view>

            <!--输入框-->
            <view class="no_finish_remark_im_me" v-if="item.content.evaContent">
                <view class="no_finish_textarea_im_me">{{ item.content.evaContent }}</view>
            </view>
        </view>

        <readStatus :isRead="item.isRead"></readStatus>
    </view>
</template>

<script>
    import { GetStarList } from "@/utils/common.js";
    import { EvaluateChartItem } from "@/utils/ImChart";
    import readStatus from "@/pagesMsg/components/im/readStatus.vue"

    export default {
        data() {
            return {
                noFinishServiceStarList: [],
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
            }
        },

        components:{
            readStatus
        },

        props: {
            item: {
                type: Object,
                default() {
                    return new EvaluateChartItem();
                }
            },
        },

        watch: {
            item(newValue, oldValue) {
                this.serviceStarVal = this.item.content.evaStar;
                this.initNoFinishStarList();
            }
        },

        mounted() {
            this.serviceStarVal = this.item.content.evaStar;
            this.initNoFinishStarList();
        },

        methods: {
            initNoFinishStarList() {
                let evaTagIndex = this.item.content.evaTagIndex || "";
                let evaTags = [];
                if(this.noMeetReasonSelectedMap[this.serviceStarVal]) {
                    for (let val of (evaTagIndex ? evaTagIndex.split(",") : [])) {
                        evaTags.push(Number(val));
                    }
                    this.noMeetReasonSelectedMap[this.serviceStarVal] = evaTags;
                }
                this.noFinishServiceStarList = new GetStarList(this.serviceStarVal,
                    "../../", 5, 0).getList(true,
                    "https://zdzfapi.haofang.net/Public/wxApp/images/entrustDetail/ic_star_yellow.png",
                    "https://zdzfapi.haofang.net/Public/wxApp/images/entrustDetail/ic_star_gray.png");
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
        border-bottom: 1upx solid #ececec;
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
    .finish_evaluate_view_me_im{
        background:#fff;
        width:100%;
        box-sizing:border-box;
        border-radius: 12upx;
        padding-bottom: 40upx;
        margin-top: 20upx;
        margin-bottom: 34upx;
        position: relative;
    }
    .no_finish_reason_view_im{
        width: 100%;
        margin: 35upx auto 0;
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
        border:1upx solid #d5d5d5;
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
    .no_finish_remark_im_me{
        position:relative;
        width: 100%;
        overflow:hidden;
        margin:26upx auto 0;
        box-sizing: border-box;
    }
    .no_finish_textarea_im_me{
        background-color:#f8f8f8;
        width:100%;
        height:100%;
        font-size:28upx;
        border-radius:8upx;
        padding:20upx 20upx;
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
