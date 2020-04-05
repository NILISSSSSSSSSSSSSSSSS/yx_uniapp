<template>
	<view class="textReceiveView" :style="{maxWidth: textMaxWidth}">
		<text v-if="!item.hasEmoji">{{ item.content }}</text>

		<block v-if="item.hasEmoji && item.emoji && item.emoji.length>0"
			v-for="(info, key) in (item.emoji[0])" :key="key">
			<block v-if="info.emoji">
				<image :src="info.url" mode="aspectFit" class='emoji_text'></image>
			</block>

			<block v-else-if="info != null">{{ info }}</block>
        </block>
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
		data() {
			return {
				textMaxWidth: this.getSystemInfo() && this.getSystemInfo().windowWidth
						? this.getSystemInfo().windowWidth * 0.6 + "px" : "70%"
			}
		}
	}
</script>

<style scoped>
	.textReceiveView{
		background-color: #ffffff;
		border-radius: 16upx;
		border: solid 1px rgba(0, 0, 0, 0.04);
		color:#041c0c;
		line-height:1.5;
		position:relative;
		margin-left:16upx;
		min-height:40upx;
		padding:20upx 28upx;
		box-sizing:border-box;
		max-width:70%;
		text-align:left;
		word-break:break-all;
		font-size: 32upx;
		min-width: 50upx;
	}
	.textReceiveView>text{
		padding:0;
		margin:0;
		width:100%;
		height:100%;
	}
	/*.textReceiveView::before{*/
		/*content: '';*/
		/*position: absolute;*/
		/*top: 15upx;*/
		/*width: 20upx;*/
		/*height: 20upx;*/
		/*left:-16upx;*/
		/*border-right: 10upx solid #fff;*/
		/*background: url('http://cdn.haofang.net/static/uuminiapp/im/left_icon.png') no-repeat;*/
		/*background-size: 17upx 13upx;*/
	/*}*/
	.emoji_text{
		width: 46upx;
		height: 46upx;
		vertical-align:middle;
		line-height: 23px;
	}
</style>
