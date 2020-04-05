<template>
	<!-- 撩客的房源 -->
	<view class="houseLiaoKeReceiveView" v-if="item.content"
		@click="lookHouseDatail(item.content)">
		<collectFormId></collectFormId>
		<view class="f_r_s">
			<view class="houseLiaoKeReceiveView_img_view">
				<image mode="aspectFill" :src="item.content.houseImg"></image>
			</view>

			<view class="houseMeView_cont">
				<view class="houseMeView_title">{{ item.content.houseTitle }}</view>

				<view class="houseMeView_name">{{ item.content.tingWeiText }}</view>
				<view class="f_r_s houseLiaoKeReceiveView_price">
					<view v-if="item.content.houseTotalPrice" class="main_color houseMeView_total">{{ item.content.houseTotalPrice }}<text>{{ item.content.houseTotalPriceUnit }}</text></view>
					<view class="gray_color houseMeView_no_price" v-else>价格面议</view>

					<view class="houseLiaoKeReceiveView_unit_price f_c_e">{{ item.content.houseUnitPrice }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import readStatus from "@/pagesMsg/components/im/readStatus.vue"

	export default {
		props: {
			item: {
				type: Object,
				default() {
					return {}
				}
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
	.houseLiaoKeReceiveView{
		background-color: #FFFFFF;
		color: #fff;
		word-break: break-all;
		line-height: 1.5;
		position:relative;
		margin-right:22upx;
		min-height:40px;
		padding:19upx 20upx;
		box-sizing: border-box;
		width:100%;
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
		-webkit-line-clamp:1;
		font-size:30upx;
		color:#424242;
		font-weight:800;
	}
	.houseLiaoKeReceiveView_img_view{
		width:222upx;
		height:170upx;
		margin-right:20upx;
		flex-shrink: 0;
		background:url('http://cdn.haofang.net/static/kdbweb/zdzfminiapp/list_wutu.jpg') #f5f5f5 no-repeat center;
		background-size:100% 100%;
		border-radius: 6upx;
		overflow: hidden;
		box-sizing: border-box;
	}
	.houseLiaoKeReceiveView_img_view>image{
		width:100%;
		height:100%;
	}
	.houseMeView_cont{
		overflow:hidden;
		-webkit-box-flex:1;
	}
	.houseLiaoKeReceiveView_price{
		margin-top: 20upx;
	}
	.houseLiaoKeReceiveView_unit_price{
		max-width:100%;
		text-overflow:ellipsis;
		overflow:hidden;
		line-height:1;
		white-space:nowrap;
		padding-bottom:10upx;
		color:#898989;
		font-size:28upx;
		margin-left: 30upx;
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
