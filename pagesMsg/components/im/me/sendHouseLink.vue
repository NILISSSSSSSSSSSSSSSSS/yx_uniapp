<template>
	<view v-if="item.content" class="sendHouseLink">
		<view class="sendHouseLink_empty"></view>
		<view class="f_r_s sendHouseLink_cont">
			<view class="sendHouseLink_img_view">
				<image :src="item.content.houseImg" mode="aspectFill"></image>
			</view>

			<view class="sendHouseLink_info">
				<view class="sendHouseLink_name f_r_s">
					<image v-if="item.content.caseType != 6" src="http://cdn.haofang.net/static/uuminiapp/im/sale.png"
						mode="aspectFill" class="sendHouseLink_tag_img"></image>
					<image v-if="item.content.caseType == 6" src="http://cdn.haofang.net/static/uuminiapp/im/lease.png"
						mode="aspectFill" class="sendHouseLink_tag_img"></image>
					<view>{{ item.content.regionName }}</view>
					<view class="sendHouseLink_margin" v-if="item.content.sectionName"> {{ item.content.sectionName }}</view>
					<view class="sendHouseLink_margin" v-if="item.content.houseName"> {{ item.content.houseName }}</view>
				</view>
				<view class="sendHouseLink_ting">{{ item.content.houseTing }}{{ item.content.houseArea }}{{ item.content.houseAreaUnit }}</view>
				<view v-if="item.content.houseTotalPrice" class="main_color sendHouseLink_total">{{ item.content.houseTotalPrice }}<text>{{ item.content.houseTotalPriceUnit }}</text></view>
				<view class="gray_color sendHouseLink_no_price" v-else>价格面议</view>
			</view>
		</view>
		<view @click="sendHouseLink" class="sendHouseLink_btn"><collectFormId></collectFormId>发送房源链接</view>
	</view>
</template>

<script>
	import { ChartDetailItem } from "@/utils/ImChart.js";
	import { Notify } from "@/utils/Notify.js";
	import { Notification } from "@/utils/Notification.js";
	import { formatTimeNew } from "@/utils/common.js";

	export default {
		props: {
			item: {
				type: Object,
				default: {}
			},
			messageId: {
				type: String,
				default: ""
			},
			autoSendLisk: {
				type: String | Number,
				default: 1
			}
		},

		watch: {
			autoSendLisk(newValue, oldValue) {
				this.sendHouseLink();
			}
		},

		methods: {
			sendHouseLink() {
				let that = this;
				let houseInfo = this.item.content;
				let sub_content = (houseInfo.houseTitle || "")
					+ (houseInfo.houseArea ? houseInfo.houseArea + "m²" : "")
					+ (houseInfo.houseTotalPrice ? houseInfo.houseTotalPrice + houseInfo.houseTotalPriceUnit : "")
					+ ' ' + (houseInfo.houseTing || "");
				if(houseInfo.caseType == 6){
					sub_content = houseInfo.shareTitle;
				}
				let content = {
					type: 14,
					data: {
						TITLE: sub_content,
						CONTENT: sub_content,
						PHOTO: houseInfo.houseImg,
						HOUSEROOM: houseInfo.houseRoom,
						HOUSETING: houseInfo.houseHall,
						HOUSEAREA: houseInfo.houseArea,
						HOUSEREG: houseInfo.regionName,
						HOUSEPRICE: houseInfo.houseTotalPrice,
						HOUSEPRICEUNIT: houseInfo.houseTotalPriceUnit,
						BUILDNAME: houseInfo.houseName,
                        HOUSEUNITPRICE: houseInfo.housePriceOfArea
					}
				};
				let ext = {
					CASE_ID: houseInfo.houseId,
					CASE_TYPE: houseInfo.caseType,
					cityId: houseInfo.cityId,
					reSource: houseInfo.reSource,
					RE_SOURCE: houseInfo.reSource,
					FROM_EXPERT: 0
				};
				this.ImChart.imChartVal.sendCustomMsg({
					scene: 'p2p',
					to: that.messageId,
					content: JSON.stringify(content),
					custom: JSON.stringify(ext),
					done: function (err, msg) {
						let item = new ChartDetailItem();
						item.type = "house";
						item.content = that.item.content;
						item.mySend = true;
						item.isRead = false;
						item.time = formatTimeNew(new Date().getTime());
						new Notification().postNotification(Notify.UpChartMsgChanged.Name, item);
					}
				});
			}
		},
	}
</script>

<style scoped>
	.sendHouseLink_empty{
		height: 20upx;
		background: #f2f2f2;
		flex-shrink: 0;
		width: 100%;
	}
	.sendHouseLink_margin{
		margin-left: 5upx;
	}
	.sendHouseLink_tag_img{
		width: 65upx;
		height: 37upx;
		margin: auto 4upx auto 0;
	}
	.sendHouseLink{
		position:fixed;
		top:0;
		border-radius:6upx;
		will-change: transform;
		background:#fff;
		width:100%;
		margin:0 auto;
		z-index:200;
		padding-bottom: 30upx;
		box-sizing: border-box;
	}
	/* #ifdef H5 */
	.sendHouseLink{
		top: 88upx;
	}
	/* #endif */
	.sendHouseLink_cont{
		display:-webkit-box;
		-webkit-box-align:start;
		-webkit-box-pack:start;
		padding:20upx;
		padding-top:34upx;
		height:140upx;
		position:relative;
	}
	.sendHouseLink_img_view{
		width:180upx;
		height:130upx;
		background:#f8f8f8 url(http://cdn.haofang.net/static/kdbweb/zdzfminiapp/list_wutu.jpg?t=20190717) no-repeat center center;
		background-size:cover;
		overflow:hidden;
		margin:0 20upx;
	}
	.sendHouseLink_img_view>image{
		width: 100%;
		height: 100%;
	}
	.sendHouseLink_info{
		line-height:1.6;
	}
	.sendHouseLink_name{
		font-size:30upx;
		color:#424242;
		font-weight:800;
		height:40upx;
		line-height:40upx;
		position:relative;
	}
	.sendHouseLink_ting{
		font-size:26upx;
		color:#898989;
		height:45upx;
		line-height:50upx;
	}
	.sendHouseLink_total{
		font-size:33upx;
		color:#ff4c11;
		font-weight:bold;
		margin:0;
		padding:0;
	}
	.sendHouseLink_total>text{
		display:inline-block;
		font-size:23upx;
	}
	.sendHouseLink_btn{
		background:#fff;
		color:#4daaf0;
		border:1upx solid #4daaf0;
		border-radius: 6upx;
		will-change: transform;
		width:264upx;
		height:54upx;
		line-height:54upx;
		font-size:28upx;
		text-align:center;
		box-sizing: border-box;
		margin: 0 auto;
	}
</style>
