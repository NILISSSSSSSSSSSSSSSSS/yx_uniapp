<template>
	<!-- 经纪人推送的房源列表 -->
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
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: {}
			},
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
</style>
