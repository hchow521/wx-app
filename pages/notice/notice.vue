<template>
	<view class="content">
		<view class="content-wrap wrap-content">
			<image class="app-logo" src="/static/img/logo.png" />
			<view class="notice-title">送餐机器人方案来了</view>
			<image class="notice-img" mode="widthFix" src="/static/img/notice_demo.png"></image>
		</view>
		<view class="notice-time">2020-05-21 12:12:00</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				notice: {}
			}
		},
		methods: {
			getNotice() {
				
			}
		},
		created() {
			this.getNotice()
		}
	}
</script>

<style scoped lang="less">
	.content-wrap{
		padding: 15rpx 30rpx 30rpx;
		margin-top: 18rpx;
		.app-logo{
			width:183rpx;
			height:38rpx;
		}
		.notice-title{
			font-size:40rpx;
			font-weight:400;
			color:#3A4044;
			text-shadow:0px 6rpx 30rpx rgba(173,176,179,0.48);
			text-align: center;
			padding: 34rpx 0 52rpx;
		}
		.notice-img{
			width: 100%;
			box-shadow:0px 6rpx 40rpx 0px rgba(223,227,230,1);
			border-radius:8rpx;
		}
	}
	.notice-time{
		font-size:30rpx;
		color: #B1B2B3;
		line-height:126rpx;
		text-align: right;
		padding: 0 30rpx;
	}
</style>
