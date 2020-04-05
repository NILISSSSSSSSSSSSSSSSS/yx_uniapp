<template>
	<view class="houseMeView" :style="{maxWidth: maxWidth}"
		  v-if="item.content" @click="lookHouseDatail(item.content)">
		<collectFormId></collectFormId>
		<view class="houseMeView_img_view">
			<image mode="aspectFill" :src="item.content.houseImg"></image>
		</view>

		<view class="houseMeView_content">
			<view class="houseMeView_title">{{ item.content.houseTitle }}</view>

			<view class="houseMeView_ting">
				{{ item.content.houseTing || ""}}
				<text class="houseMeView_line_info" v-if="item.content.houseArea && item.content.houseTing"></text>
				{{ item.content.houseArea ? item.content.houseArea + '㎡' : '' }}
				<text class="houseMeView_line_name"></text>
				{{ item.content.houseName }}
			</view>
			<view class="f_r_s houseMeView_price_view">
				<view v-if="item.content.houseTotalPrice" class="main_color houseMeView_total">{{ item.content.houseTotalPrice }}{{ item.content.houseTotalPriceUnit }}</view>
				<view class="gray_color houseMeView_no_price" v-else>价格面议</view>

                <view class="housePriceOfArea_me" v-if="item.content.housePriceOfArea">{{ item.content.housePriceOfArea }}{{ item.content.housePriceOfAreaUnit }}</view>
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

		data() {
			return {
				maxWidth: this.getSystemInfo() && this.getSystemInfo().windowWidth
						? this.getSystemInfo().windowWidth * 0.6 + "px" : "70%"
			}
		},

		methods: {
			lookHouseDatail(item) {
				// #ifdef MP-WEIXIN || H5
				uni.navigateTo({
				    url: "/pagesHouse/erHouseDetail/erHouseDetail?cityId="+item.cityId+"&caseId="+item.houseId
				        +"&caseType="+item.caseType+"&resource="+item.reSource+"&houseName="+item.houseName
						+"&pageFrom=im"
				});
				// #endif
			}
		},
	}
</script>

<style scoped>
	.houseMeView{
		background-color: #FFFFFF;
		color: #fff;
		word-break: break-all;
		line-height: 1.5;
		position:relative;
		margin-right:22upx;
		min-height:80upx;
		box-sizing: border-box;
		border-radius:15upx;
		will-change: transform;
		text-align:left;
		font-size:30upx;
		margin-bottom: 34upx;
	}
	.houseMeView_img_view{
		width:100%;
		height: 270upx;
		border-radius: 15upx 15upx 0 0;
		will-change: transform;
		flex-shrink: 0;
		background:url('http://cdn.haofang.net/static/kdbweb/zdzfminiapp/list_wutu.jpg') #f5f5f5 no-repeat center;
		background-size:100% 100%;
		overflow: hidden;
	}
	.houseMeView_img_view>image{
		width:100%;
		height:100%;
	}
	.houseMeView_content{
		padding: 0 24upx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 0 0 15upx 15upx;
		will-change: transform;
	}
	.houseMeView_title{
		line-height: 47upx;
		margin-top: 10upx;
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:1;
		font-size:30upx;
		color:#101D36;
		font-weight:800;
	}
	.houseMeView_name{
		max-width:100%;
		text-overflow:ellipsis;
		overflow:hidden;
		line-height:1;
		white-space:nowrap;
		padding-bottom:10upx;
		color:#898989;
		font-size:28upx;
	}
	.houseMeView_line_info{
		height: 16upx;
		width: 1px;
		background: #b9b9b9;
		flex-shrink: 0;
		margin: auto 8upx;
		display: inline-block;
	}
	.houseMeView_line_name{
		height: 16upx;
		width: 1px;
		background: #b9b9b9;
		flex-shrink: 0;
		margin: auto 8upx;
		display: inline-block;
	}
	.houseMeView_ting{
		max-width:100%;
		text-overflow:ellipsis;
		overflow:hidden;
		white-space:nowrap;
		font-size: 24upx;
		height: 40upx;
		color: #101D36;
		line-height: 40upx;
	}
	.houseMeView_price_view{
		line-height: 40upx;
		margin-bottom: 23upx;
	}
	.houseMeView_total{
		line-height:1.5;
		max-width:100%;
		text-overflow:ellipsis;
		overflow:hidden;
		white-space:nowrap;
		font-size:33rpx;
		font-weight: bold;
	}
	.houseMeView_total>text{
		display:inline-block;
		font-size:22rpx!important;
		font-weight:normal;
	}
    .housePriceOfArea_me{
        margin-left: 14upx;
        color: #8e94a1;
        font-size: 20upx;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
</style>
