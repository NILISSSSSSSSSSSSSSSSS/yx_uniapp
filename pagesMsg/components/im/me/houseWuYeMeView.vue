<template>
    <view class="houseMeWuYeView" v-if="item.content" @click="lookHouseDatail(item.content)">
        <collectFormId></collectFormId>
        <view class="houseMeView_title" v-if="item.content.houseTitle">{{ item.content.houseTitle }}</view>

        <view class="f_r_s houseMeWuYeView_cont">
            <view class="houseMeWuYeView_img_view">
                <image mode="aspectFill" :src="item.content.houseImg"></image>
            </view>

            <view class="houseMeWuYeView_content">
                <view class="houseMeWuYeView_ting">
                    {{ item.content.houseRoof || ""}}{{ item.content.houseUnit || ""}}{{ item.content.houseFloor || ""}}{{ item.content.houseNum || ""}}

                    {{ item.content.houseArea || ""}}{{ item.content.housePrice || ""}}
                </view>
                <view class="houseMeWuYeView_tip">
                    {{ item.content.tipMsg || ""}}
                </view>
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
    .houseMeWuYeView_img_view{
        width: 200upx;
        height: 160upx;
        border-radius: 8upx;
        will-change: transform;
        flex-shrink: 0;
        background:url('http://cdn.haofang.net/static/kdbweb/zdzfminiapp/list_wutu.jpg') #f5f5f5 no-repeat center;
        background-size:100% 100%;
        overflow: hidden;
    }
    .houseMeWuYeView_img_view>image{
        width:100%;
        height:100%;
    }
    .houseMeWuYeView_cont{
        width: 100%;
    }
    .houseMeWuYeView_content{
        box-sizing: border-box;
        background: #FFFFFF;
        padding-left: 20upx;
    }
    .houseMeWuYeView_ting{
        line-height: 32upx;
        font-size:28upx;
        color:#333333;
    }
    .houseMeWuYeView_tip{
        color:#898989;
        font-size:28upx;
        line-height: 32upx;
        margin-top: 10upx;
    }
</style>
