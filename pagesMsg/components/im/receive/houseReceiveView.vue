<template>
	<view class="houseMeView" v-if="item.content" @click="lookHouseDatail(item.content)">
		<collectFormId></collectFormId>
		<view class="houseMeView_title">{{ item.content.houseTitle }}</view>
		<view class="f_r_s">
			<view class="houseMeView_img_view">
				<image mode="aspectFill" :src="item.content.houseImg"></image>
			</view>

			<view class="houseMeView_cont">
				<view class="houseMeView_name">{{ item.content.houseName }}</view>
				<view class="f_r_s houseMeView_ting">
					<view class="houseMeView_ting_info">{{ item.content.houseTing }}</view>
					<view v-if="item.content.houseArea">面积{{ item.content.houseArea }}{{ item.content.houseAreaUnit }}</view>
				</view>
				<view v-if="item.content.houseTotalPrice" class="main_color houseMeView_total">{{ item.content.houseTotalPrice }}<text>{{ item.content.houseTotalPriceUnit }}</text></view>
				<view class="gray_color houseMeView_no_price" v-else>价格面议</view>
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
		min-height:40px;
		padding:19upx 20upx;
		box-sizing: border-box;
		max-width:70%;
		width:70%;
		border-radius:15upx;
		text-align:left;
		font-size:15px;
	}
	.houseMeView_title{
		margin-bottom:20upx;
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
		font-size:30upx;
		color:#424242;
		font-weight:800;
	}
	.houseMeView_img_view{
		width:150upx;
		height:120upx;
		margin-right:20upx;
		flex-shrink: 0;
		background:url('http://cdn.haofang.net/static/kdbweb/zdzfminiapp/list_wutu.jpg') #f5f5f5 no-repeat center;
		background-size:100% 100%;
	}
	.houseMeView_img_view>image{
		width:100%;
		height:100%;
	}
	.houseMeView_cont{
		overflow:hidden;
		-webkit-box-flex:1;
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
	.houseMeView_ting{
		font-size:26rpx;
		color:#898989;
		line-height:1.5;
		max-width:100%;
		text-overflow:ellipsis;
		overflow:hidden;
		white-space:nowrap;
	}
	.houseMeView_ting_info{
		margin-right: 10upx;
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
	.houseMeView_no_price{}
</style>
