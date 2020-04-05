<template>
	<view @click="playAudio" :style="{maxWidth: voiceMaxWidth, width: voiceWidth}"
		  class="voiceMeView global-confirm-btn f_r_e">
		<view v-if="item.isSendUser && !item.sendFail" class="loading_view f_c_c">
			<circle1></circle1>
		</view>

		<image v-if="item.sendFail" @click.stop="againSend" class="again_send" src="http://cdn.haofang.net/static/xffx-uniapp/msg/again_send.png"></image>

		<view class="f_r_b" style="width: 100%">
			<view class="voice_length">{{ item.voiceLength }}″</view>

			<image v-if="!isPlayIng" class="voiceMeView_img voiceMeView_img_translate"
				   src="http://cdn.haofang.net/static/xfldDeveloper/msg/voice_play_white.png"></image>
			<image v-if="isPlayIng" class="voiceMeView_img"
				   src="http://cdn.haofang.net/static/uuminiapp/im/voice_me.gif"></image>
		</view>

		<readStatus :isRead="item.isRead"></readStatus>
	</view>
</template>

<script>
	import readStatus from "@/pagesMsg/components/im/readStatus.vue";
	import circle1 from "@/components/loading/circle1.vue";
	import {ImSendMessage} from "../../../../utils/ImChart";

	export default {
		data() {
			return {
				isPlayIng: false,
				voiceMaxWidth: "70%",
				voiceWidth: "50%",
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

		components:{
			readStatus,
			circle1
		},

		mounted() {
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
			playAudio() {
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
			},

			againSend() {
				new ImSendMessage(this.item.messageId)
					.againSend(this.item.msg, this.item.content);
			}
		},
	}
</script>

<style scoped>
	.voiceMeView{
		background-image: linear-gradient(
				#0084ff,
				#0084ff),
		linear-gradient(
				#ffffff,
				#ffffff);
		background-blend-mode: normal,
		normal;
		color:#ffffff;
		line-height:1.5;
		margin-right:16upx;
		min-height:40upx;
		padding:20upx 20upx;
		box-sizing:border-box;
		max-width:70%;
		border-radius:16upx;
		will-change: transform;
		word-break:break-all;
		font-size: 32upx;
		text-align:center;
		width:200upx;
		position: relative;
		margin-bottom: 34upx;
	}
	.loading_view{
		position: absolute;
		line-height:1.5;
		height:40upx;
		left: -40upx;
		top: 50%;
		transform: translateY(-50%);
	}
	.again_send{
		position: absolute;
		width: 40upx;
		height: 40upx;
		left: -50upx;
		top: 50%;
		transform: translateY(-50%);
	}
	/*.voiceMeView::after{*/
		/*content: '';*/
		/*position: absolute !important;*/
		/*top: 15upx;*/
		/*width: 20upx;*/
		/*height: 20upx;*/
		/*right: -17upx;*/
		/*background: url('http://cdn.haofang.net/static/uuminiapp/pageNewUi/common/right_icon.png') no-repeat;*/
		/*background-size: 17upx 13upx;*/
	/*}*/
	.voiceMeView_img{
		width: 22upx;
		height: 32upx;
		margin: auto 0;
		flex-shrink: 0;
	}
	.voiceMeView_img_translate{
		transform: rotate(180deg);
	}
	.voice_length{
		margin-right: 20upx;
	}
</style>
