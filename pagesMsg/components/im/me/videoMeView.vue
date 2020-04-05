<template>
	<view class="videoReceiveView f_r_s">
		<view class="videoReceiveView_cont">
			<video :show-fullscreen-btn="falseVal" :show-play-btn="falseVal"
				   :controls="falseVal" :src="item.content"
				   :enable-progress-gesture="falseVal"
				   objectFit="fill"
				   :show-center-play-btn="falseVal"></video>
			<view @click="playVideo" class="videoReceiveView_bg"></view>
		</view>

		<view v-if="playVideoIng" class="video_fixed f_c_c">
			<view @click.stop="closeVideo" class="close_video"></view>
		</view>

		<readStatus :isRead="item.isRead"></readStatus>
	</view>
</template>

<script>
    import readStatus from "@/pagesMsg/components/im/readStatus.vue"

    export default {
		data() {
			return {
                playVideoIng: false,
				falseVal: false,
                windowHeight: "40%",
            }
		},

        components:{
            readStatus
        },

		props: {
			item: {
				type: Object,
				default: {}
			},
		},

        mounted() {
            let res = uni.getSystemInfoSync();
            this.windowHeight = res.windowWidth + "px";
            this.videoValue = uni.createVideoContext('myVideo');
        },

		methods: {
            playVideo() {
                this.playVideoIng = true;
                this.videoValue.play();
			},

            closeVideo() {
                this.playVideoIng = false;
                this.videoValue.pause();
            }
		},
	}
</script>

<style scoped>
	.videoReceiveView{
		background-color:#fff;
		position:relative;
		margin-right:16upx;
		padding: 0;
		box-sizing:border-box;
		max-width:70%;
		word-break:break-all;
		font-size:15px;
		text-align:center;
		width: 250upx;
		height: 400upx;
		margin-bottom: 34upx;
	}
	.videoReceiveView_cont{
		overflow: hidden;
		border-radius:16upx;
		width: 100%;
		height: 100%;
	}
	.videoReceiveView video{
		width: 100%;
		height: 100%;
	}
	.videoReceiveView_bg{
		position: absolute;
		top: 0;
		z-index: 80;
		background: rgba(0,0,0,0);
		width: 100%;
		left: 0;
		height: 100%;
	}
	.uni-video-cover-play-button{
		display: none!important;
	}
	/* 视频播放 */
	.video_fixed{
		position: fixed;
		width:100%;
		height:100%;
		left: 0;
		top: 0;
		background:#000;
		z-index:50000;
	}
	.me_video{
		width: 100%;
		margin: auto 0;
	}
	.close_video{
		position:absolute;
		left:0;
		right:0;
		margin:auto;
		bottom:120upx;
		width:70upx;
		height:70upx;
		background:url(http://cdn.haofang.net/static/uuminiapp/detail/close-viedo.png) no-repeat;
		background-size:100%;
	}
</style>
