<template>
	<view class="textMe_read_text" 
		:class="isRead ? 'textMe_read' : 'textMe_unread'">{{ isRead ? "已读" : "未读"}}</view>
</template>

<script>
	export default {
		props: {
			isRead: {
				type: Boolean,
				default: false
			},
		},
	}
</script>

<style scoped>
	.textMe_read_text{
		position: absolute;
		bottom: -40upx;
		text-align: right;
		right: 4upx;
		font-size: 24upx;
        word-break: keep-all;
	}
	.textMe_unread{
		color: #4DAAF0;
	}
	.textMe_read{
		color: #D2D2D2;
	}
</style>
