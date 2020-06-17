<template>
	<view class="notice-wrap">
		<image class="notice-icon" src="/static/img/notice.png" mode="widthFix"></image>
		<view class="divider"></view>
		<view class="label">公告</view>
		<swiper class="notice-swiper" vertical circular interval="3000" duration="300" :autoplay="list.length > 1">
			<swiper-item class="notice-swiper-item" v-for="item in list" :key="index" @click="noticeClick">
				<view class="notice-item">{{item.title}}</view>
			</swiper-item>
		</swiper>
</view>
</template>
<script>
	export default {
		props: {
			list: {
				type: Array,
				default:() => []
			}
		},
		methods:{
			noticeClick() {
				uni.navigateTo({
					url: '/pages/notice/notice?id=0'
				});
			}
		}
	}
</script>
<style scoped lang="less">
	.notice-wrap{
		padding: 0 28rpx;
		display: flex;
		align-items: center;
		position: position;
		// &::after{
		// 	content: '';
		// 	position: absolute;
		// 	width: 100%;
		// 	height: 100%;
		// 	z-index: 1;
		// }
		.notice-icon{
			width: 32rpx;
			height: 32rpx;
			flex: 0 0 32rpx;
		}
		.divider{
			width: 1px;
			height: 30rpx;
			background-color: #DDDDDD;
			margin: 0 20rpx;
		}
		.label{
			flex: 0 0 51rpx;
			border:1px solid rgba(4,133,210,1);
			border-radius:6rpx;
			font-size: 18rpx;
			color: #0485D2;
			height: 27rpx;
			line-height: 27rpx;
			text-align: center;
			margin-right: 12rpx;
		}
		.notice-swiper{
			flex: 1;
			height: 80rpx;
			overflow: hidden;
			.notice-swiper-item{
				height: 80rpx;
				.notice-item{
					width: 100%;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					line-height: 80rpx;
					color: #51585D;
					font-size: 28rpx;
				}
			}
		}
	}
</style>