<template>
	<div class="position_view">
		<div @click="lookPosition" class="positionReceiveView f_c_s">
			<text class="positionReceiveName"
				  v-if="item.content && item.content.name">{{ item.content.name }}</text>
			<text class="positionReceiveAddress"
				  v-if="item.content && item.content.address">{{ item.content.address }}</text>
			<div class="positionReceiveView_img">
				<image mode="aspectFill" class="positionReceiveView_url"
					   v-if="mapImgSrc" :src="mapImgSrc"></image>

				<image src="http://cdn.haofang.net/static/xfyx-uniapp/msg/map_position.png"
					   class="position_map_center_icon"></image>
			</div>
		</div>
	</div>
</template>

<script>
	import {Utils} from "../../../../utils/Utils";

	export default {
		props: {
			item: {
				type: Object,
				default() {
					return {};
				}
			},
		},

		computed: {
			mapImgSrc() {
				if (!this.item.content) return "";

				if (!this.item.content.staticImg) {
					return new Utils().getMapStaticImg(
							this.item.content.lat,
							this.item.content.lng,
							428,270
					);
				}

				return this.item.content.staticImg;
			}
		},

		methods: {
			lookPosition() {
				uni.openLocation({
					name: this.item.content.name,
					address: this.item.content.address,
					latitude: Number(this.item.content.lat),
					longitude:Number(this.item.content.lng),
				});
			}
		},
	}
</script>

<style scoped>
	.position_view{
		margin-bottom: 34upx;
		margin-left: 22upx;
	}
	.positionReceiveView {
		position:relative;
		box-sizing:border-box;
		width: 488upx;
		border-radius:16upx;
		background-color: #FFFFFF;
		padding-top: 30upx;
		padding-bottom: 30upx;
		padding-left: 30upx;
		padding-right: 30upx;
	}
	.positionReceiveName{
		font-size: 32upx;
		line-height: 44upx;
		color: #191f25;
		font-weight: bold;
		text-align: left;
		flex: 1;
		max-width: 420upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		box-sizing: border-box;
	}
	.positionReceiveAddress{
		font-size: 24upx;
		line-height: 32upx;
		color: #a3a5a8;
		margin-top: 10upx;
		margin-bottom: 20upx;
		text-align: left;
		max-width: 420upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		box-sizing: border-box;
	}
	.positionReceiveView_img{
		width: 428upx;
		height: 270upx;
		background-color: #efefef;
		position: relative;
	}
	.positionReceiveView_url{
		width: 428upx;
		height: 270upx;
	}
	.position_map_center_icon{
		position: absolute;
		left: 189upx;
		top: 101upx;
		width: 50upx;
		height: 68upx;
		z-index: 1;
	}
	.loading_view{
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		align-items: center;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>

