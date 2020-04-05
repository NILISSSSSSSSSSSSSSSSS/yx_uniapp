<template>
    <view class="houseMeWuYeView" v-if="item.content">
        <view class="houseMeView_title" v-if="item.content.houseTitle">{{ item.content.houseTitle }}</view>

        <view class="houseMeWuYeView_cont">
            <view class="houseMeWuYeTextView_ting">{{item.content.buildName || ""}}</view>
            <view class="houseMeWuYeView_tip">
                {{ item.content.houseRoom || ""}}
                {{ item.content.houseArea || ""}}
                {{ item.content.houseFitment || ""}}
                {{ item.content.houseUseage || ""}}
            </view>
            <view class="houseMeWuYeView_tip f_r_s">
                预算为 <text class="main_color">{{ item.content.housePrice || ""}}</text>
            </view>
            <view class="houseMeWuYeView_tip">
                {{ item.content.tipMsg || ""}}
            </view>
        </view>

        <readStatus :isRead="item.isRead"></readStatus>
    </view>
</template>

<script>
    import readStatus from "@/pagesMsg/components/im/readStatus.vue"

    export default {
        props: {
            item: {
                type: Object,
                default: {}
            },
        },

        components:{
            readStatus
        },

        methods: {
            lookHouseDatail(item) {
                // #ifdef MP-WEIXIN || H5
                uni.navigateTo({
                    url: "/pagesHouse/entrustHouseDetail/entrustHouseDetail?cityId="+item.cityId+"&caseId="+item.houseId
                        +"&caseType="+item.caseType+"&resource="+item.reSource+"&houseName="+item.houseName
                        +"&pageFrom=entrust"
                });
                // #endif
            }
        },
    }
</script>

<style scoped>
    .houseMeWuYeView{
        background-color: #FFFFFF;
        color: #fff;
        word-break: break-all;
        line-height: 1.5;
        position:relative;
        margin-right:22upx;
        min-height:80upx;
        box-sizing: border-box;
        max-width:70%;
        width:70%;
        border-radius:8upx;
        will-change: transform;
        text-align:left;
        font-size:28upx;
        margin-bottom: 34upx;
        padding: 20upx;
    }
    .houseMeWuYeView_cont{
        width: 100%;
    }
    .houseMeWuYeTextView_ting{
        line-height: 38upx;
        margin-bottom: 10upx;
        font-size:32upx;
        color:#333333;
        margin-top: 10upx;
    }
    .houseMeWuYeView_tip{
        color:#898989;
        font-size:28upx;
        line-height: 32upx;
        margin-top: 10upx;
    }
</style>
