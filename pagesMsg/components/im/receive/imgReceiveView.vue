<template>
	<view class="img_view">
		<view class="imgMeView" @click.stop="lookMaxImg(item)">
			<image :style="{width: imgSizeInfo.width/2+'px',height: imgSizeInfo.height/2+'px'}"
				   class="imgMeView_src"
				   mode="widthFix" :lazy-load="'true'" :src="imgSrc">
			</image>
		</view>
	</view>
</template>

<style scoped>
	.img_view{
		margin-left: 22upx;
	}
	.imgMeView {
		color:#041c0c;
		line-height:1.5;
		position:relative;
		min-height:40upx;
		padding:0;
		box-sizing:border-box;
		border-radius:16upx;
		text-align:left;
		font-size:15upx;
		background: transparent;
	}
	.imgMeView_src{
		border-radius:15upx;
		will-change: transform;
		width:200upx;
	}
	.loading_view{
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		align-items: center;
		box-sizing: border-box;
		transform: translateY(-20upx);
	}
</style>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: {}
			},
		},
		computed: {
			imgSrc() {
				if (!this.item.content) return "";

				if (this.item.content.indexOf("nim-nosdn.netease.im") >= 0
						&& this.item.content.indexOf("imageView&thumbnail") === -1
						&& this.item.content.indexOf("?") === -1) {
					return this.item.content + "?imageView&thumbnail=140z200";
				}

				if (this.item.content.indexOf("nim-nosdn.netease.im") >= 0
						&& this.item.content.indexOf("imageView&thumbnail") === -1) {
					return this.item.content + "&imageView&thumbnail=140z200";
				}

				return this.item.content;
			},
			imgSizeInfo() {
				if (!this.item) return {};

				let maxWidth = 750 * 0.5;  // 450
				let maxHeight = 350;
				let maxBi = maxWidth/maxHeight;
				let imgBi = this.item.width/this.item.height;
				if (this.item.width > maxWidth && this.item.height < maxHeight) {
					return {
						width: maxWidth,
						height: maxWidth/imgBi
					}
				}

				if (this.item.width < maxWidth && this.item.height > maxHeight) {
					return {
						width: this.item.height*imgBi,
						height: this.item.height
					}
				}

				if (this.item.width < maxWidth && this.item.height < maxHeight) {
					return {
						width: this.item.width,
						height: this.item.height
					}
				}

				if (this.item.width > maxWidth && this.item.height > maxHeight) {
					if (this.item.height*imgBi > maxWidth) {
						return {
							width: maxWidth,
							height: maxWidth/imgBi
						}
					}

					return {
						width: maxHeight*imgBi,
						height: maxHeight
					}
				}
			},
		},
		data() {
			return {
				maxWidth: uni.getSystemInfoSync() && uni.getSystemInfoSync().windowWidth
						? uni.getSystemInfoSync().windowWidth : null
			}
		},
		methods: {
			lookMaxImg(item) {
				this.$emit("lookMaxImgChange", item);
			}
		}
	}
</script>

