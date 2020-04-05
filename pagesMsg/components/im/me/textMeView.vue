<template>
	<view class="textMeView" :style="{maxWidth: textMaxWidth}">
		<text v-if="!item.hasEmoji">{{ item.content }}</text>

		<block v-if="item.hasEmoji && item.emoji && item.emoji.length>0"
			v-for="(info, key) in (item.emoji[0])" :key="key">
			<block v-if="info.emoji">
				<image :src="info.url" mode="aspectFit" class='emoji_text'></image>
			</block>

			<block v-else-if="info != null">{{ info }}</block>
		</block>

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
				textMaxWidth: this.getSystemInfo() && this.getSystemInfo().windowWidth
						? this.getSystemInfo().windowWidth * 0.6 + "px" : "70%"
			}
		}
	}
</script>

<style scoped>
	.textMeView{
		background-image: linear-gradient(
				#0084ff,
				#0084ff),
		linear-gradient(
				#ffffff,
				#ffffff);
		background-blend-mode: normal,
		normal;
		border-radius: 16upx;
		word-break: break-all;
		line-height: 1.5;
		position:relative;
		margin-right:16upx;
		min-height:80upx;
		padding:20upx 28upx;
		box-sizing: border-box;
		max-width:70%;
		will-change: transform;
		text-align:left;
		margin-bottom: 34upx;
		min-width: 50upx;
		font-size: 32upx;
		color: #ffffff;
	}
	.textMeView>text{
		padding:0;
		margin:0;
		width:100%;
		height:100%;
	}
    .textMeView .textMeView_right{
        position: absolute !important;
        top: 15upx;
        width:  17upx;
        height: 13upx;
        right: -17upx;
    }
	/* .textMeView::before{
		content: '';
		position: absolute !important;
		top: 15upx;
		width: 20upx;
		height: 20upx;
		right: -17upx;
		background: url('') no-repeat;
		background-size: 17upx 13upx;
	} */
	.emoji_text{
		width: 46upx;
		height: 46upx;
		vertical-align:middle;
		line-height: 23px;
	}
</style>
