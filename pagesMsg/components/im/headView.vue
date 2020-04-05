<template>
	<view class="head_view">
		<image @error="imgError" mode="aspectFill" :src="avatar"></image>
	</view>
</template>

<script>
	import {Const} from "../../../utils/Const";

	export default {
		data() {
			return {
				avatar: ""
			}
		},

		props: {
			headImg: {
				type: String,
				default: Const.imDefaultHeadImg
			},
		},

		mounted() {
			this.avatar = this.headImg;
		},

		watch: {
			headImg() {
				this.avatar = this.headImg;
			}
		},

		methods: {
			imgError() {
				this.avatar = Const.imDefaultHeadImg;
			}
		}
	}
</script>

<style scoped>
	.head_view{
		width: 80upx;
		height: 80upx;
		overflow:hidden;
		flex-shrink: 0;
		border-radius: 100%;
		box-sizing: border-box;
	}
	.head_view>image{
		width:80upx;
		display:inline;
	}
</style>
