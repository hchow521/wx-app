<template>
	<view class="title-wrap">
		<image class="title-icon" :src="icon"></image>
		<view class="title-text">{{title}}</view>
		<slot></slot>
	</view>
</template>

<script>
	export default{
		props: {
			icon: {
				type: String,
				default: '/static/img/weixin.png'
			},
			title: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style scoped lang="less">
	.title-wrap{
		width: 100%;
		max-width: 750rpx;
		display: flex;
		padding: 28rpx;
		box-sizing: border-box;
		overflow: hidden;
		.title-icon{
			flex: 0 0 43rpx;
			width: 43rpx;
			height: 43rpx;
			margin-right: 12rpx;
		}
		.title-text{
			flex: 1;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			color: #3A4044;
			font-size: 30rpx;
			font-weight: 500;
		}
	}
</style>
