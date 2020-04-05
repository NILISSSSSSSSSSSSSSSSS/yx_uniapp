<template>
	<view @click="playAudio" :style="{maxWidth: voiceMaxWidth, width: voiceWidth}"
		  class="voiceReceiveView f_r_b">
		<image v-if="!isPlayIng" class="voiceReceiveView_img"
			src="http://cdn.haofang.net/static/xfldDeveloper/msg/voice_play_black.png"></image>

		<image v-if="isPlayIng" class="voiceReceiveView_img"
			src="http://cdn.haofang.net/static/kdbweb/zdzfminiapp/zdzfPlatform/common/laba_l.gif"></image>
		<view class="voice_length">{{ item.voiceLength }}″</view>
		<view class="voice_unread" v-if="unReadVoiceMap[item.voiceMd5]"></view>
	</view>
</template>

<script>
	import {UnReadVoiceModel} from "../../../../model/im/UnReadMsgModel";
	import {Notification} from "../../../../utils/Notification";
	import {Notify} from "../../../../utils/Notify";

	export default {
		data() {
			return {
				isPlayIng: false,
				voiceMaxWidth: "70%",
				voiceWidth: "50%",
				unReadVoiceMap: new UnReadVoiceModel().getModel() || {}
			}
		},

		props: {
			item: {
				type: Object,
				default: {}
			},
			index: {
				type: String | Number,
				default() {
					return "null";
				}
			},
			currentClickIndex: {
				type: String | Number,
				default() {
					return "err";
				}
			}
		},

		mounted() {
			// 监听消息
			new Notification().addObserver(this, "UpChartMsgChanged", Notify.UpChartMsgChanged.Name);
			let width = this.getSystemInfo().windowWidth;
			let voiceMaxWidth = width * 0.6;
			let voiceWidth = (voiceMaxWidth/16 * (this.item.voiceLength
			&& this.item.voiceLength <= 16 ? this.item.voiceLength : 16));
			if(voiceWidth < 80) {
				voiceWidth = 80;
			}
			this.voiceWidth = voiceWidth + "px";
			this.voiceMaxWidth = voiceMaxWidth + "px";
		},

		destroyed() {
			// 反注册通知
			new Notification().removeObserverAllNotification(this);
		},

		watch: {
			currentClickIndex(newValue, oldValue) {
				if(this.currentClickIndex != this.index) {
					this.isPlayIng = false;
				}else {
					this.isPlayIng = true;
				}
			}
		},

		methods: {
			// 新消息回调
			UpChartMsgChanged() {
				this.unReadVoiceMap = new UnReadVoiceModel().getModel() || {};
			},

			playAudio() {
				let unReadVoiceMap = new UnReadVoiceModel().getModel() || {};
				unReadVoiceMap[this.item.voiceMd5] = false;
				new UnReadVoiceModel().setModel(unReadVoiceMap);
				this.unReadVoiceMap = unReadVoiceMap;
				if(this.isPlayIng) {
					this.$emit("voicePlayChange", {
						url: src,
						isPlayIng: this.isPlayIng,
						index: "err"
					});
					return;
				}

				let src = this.item.content;
				if (src.indexOf("?audioTrans&type=mp3") >= -1){
					src = src.replace("?audioTrans&type=mp3", "");
				}
				this.$emit("voicePlayChange", {
					url: src,
					isPlayIng: this.isPlayIng,
					index: this.index
				});
			}
		},
	}
</script>

<style scoped>
	.voiceReceiveView{
		background-color:#fff;
		color:#041c0c;
		line-height:1.5;
		position:relative;
		margin-left:16upx;
		min-height:40upx;
		padding: 20upx 20upx;
		box-sizing:border-box;
		max-width:70%;
		border-radius:16upx;
		word-break:break-all;
		font-size:32upx;
		text-align:center;
		line-height:1.5;
		width:200upx;
	}
	/*.voiceReceiveView::before{*/
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
	.voiceReceiveView_img{
		width: 22upx;
		height: 32upx;
		margin: auto 0;
		flex-shrink: 0;
	}
	.voice_length{
		margin-left: 20upx;
	}
	.voice_unread{
		position: absolute;
		right: -32upx;
		border-radius: 100%;
		background: red;
		width: 16upx;
		height: 16upx;
		overflow: hidden;
		top: 32upx;
	}
</style>
