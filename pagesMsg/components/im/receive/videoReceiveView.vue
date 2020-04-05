<template>
	<view class="videoReceiveView f_r_s">
		<view @click="playVideo" class="videoReceiveView_bg f_c_c"
			:style="{backgroundImage: 'url(' + videoFirstImg + ')'}">
			<image src="http://cdn.haofang.net/static/uuminiapp/index/video_icon.png" class="videoReceiveView_cover_img"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                playVideoIng: false,
				falseVal: false,
                windowHeight: "40%",
            }
		},

		computed: {
			videoFirstImg() {
				// 链接 + "?vframe" 即是视频的首图
				return this.item.content + "?vframe";
			}
		},

		props: {
			item: {
				type: Object,
				default() {
					return {}
				}
			},
		},

        mounted() {
            let res = uni.getSystemInfoSync();
            this.windowHeight = res.windowWidth + "px";
        },

		methods: {
            playVideo() {
				this.$emit("videoPlayChange", {
					url: this.item.content,
					videoFirstImg: this.videoFirstImg
				});
            },

            closeVideo() {
                this.playVideoIng = false;
                this.videoValue.pause();
                // this.videoValue.exitFullScreen();
                // this.videoValue.showStatusBar();
                this.videoValue.stop();
            }
		},
	}
</script>

<style scoped>
	.videoReceiveView{
		background-color:#fff;
		position:relative;
		margin-left:16upx;
		padding: 0;
		box-sizing:border-box;
		max-width:70%;
		border-radius:16upx;
		word-break:break-all;
		font-size:15px;
		text-align:center;
		width: 250upx;
		height: 400upx;
		overflow: hidden;
	}
	.videoReceiveView_bg{
		position: absolute;
		top: 0;
		z-index: 80;
		width: 100%;
		left: 0;
		height: 100%;
		background-repeat: no-repeat;
		background-size: cover;
	}
    .videoReceiveView_cover_img{
        width: 80upx;
        height: 80upx;
        margin: auto;
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
	.receive_video{
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
