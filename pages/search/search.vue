<template>
	<view class="content">
		<view class="search-wrap wrap-content">
			<image class="logo-img" src="/static/img/logo.png"></image>
			<view class="input">
				<input v-model="searchVal" type="text" confirm-type="search" @confirm="search" focus>
				<!-- <view class="search-logo" @click="handleSearch">
					<view class="logo"></view>
					<text>搜索</text>
				</view> -->
			</view>
		</view>
		<view class="full-column">
			<view class="title">
				<text>搜索记录</text>
				<image src="/static/img/delete.png" @click="clear"></image>
			</view>
			<view class="search-history-list">
				<text class="search-history-item" v-for="(item, i) in history" :key="i" @click="itemClick(item)">{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				searchVal: '',
				history: []
			}
		},
		created() {
			uni.getStorage({
				key: 'search_keys',
				success: res => {
					this.history = JSON.parse(res.data)
				}
			});
		},
		methods:{
			itemClick(key) {
				this.searchVal = key
				this.search()
			},
			search() {
				if (this.searchVal === '') return
				if(!this.history.includes(this.searchVal)) {
					this.history.push(this.searchVal)
					uni.setStorage({
						key: 'search_keys',
						data: JSON.stringify(this.history)
					});
				}
				uni.showToast({
					icon: 'none',
					title: '搜索结果为空'
				})
			},
			clear() {
				uni.removeStorage({
					key: 'search_keys',
					success: () => {
						this.history = []
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-wrap{
		flex: 0 0 112rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.input{
			flex: 1;
			position: relative;
			margin-left: 24rpx;
			font-size: 26rpx;
			.search-logo{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				pointer-events: none;
				text{
					color: #BBBBBB;
					font-weight: blod;
				}
				.logo{
					width: 25rpx;
					height: 25rpx;
					margin-right: 11.5rpx;
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAMAAAAc9R5vAAABklBMVEUAAAD///+AgICqqqq/v7+ZmZnMzMyqqqrV1dW2traqqqq5ubmqqqq/v7+xsbHExMS/v7/Dw8O8vLyzs7O/v7+8vLy4uLi9vb22tra5ubm7u7u9vb23t7e8vLy9vb28vLy5ubm/v7+8vLy4uLi5ubm6urq9vb26urq3t7e8vLy9vb28vLy6urq+vr64uLi8vLy6urq5ubm9vb25ubm9vb26urq8vLy6urq6urq9vb28vLy6urq7u7u7u7u5ubm6urq7u7u6urq7u7u7u7u7u7u5ubm8vLy8vLy7u7u6urq7u7u7u7u8vLy7u7u7u7u8vLy7u7u7u7u7u7u6urq7u7u6urq7u7u6urq8vLy6urq7u7u7u7u7u7u6urq7u7u8vLy7u7u8vLy6urq7u7u7u7u7u7u7u7u6urq7u7u7u7u7u7u6urq8vLy7u7u7u7u6urq7u7u7u7u7u7u6urq7u7u7u7u7u7u7u7u7u7u7u7u6urq7u7u7u7u6urq7u7u8vLy7u7u7u7u6urq7u7u7u7u7u7vEe6ymAAAAhXRSTlMAAQIDBAUFBgYHCQsMDA0NEBETFBQXGRscHR4fICIjJigoKissMDI0NTU2OTs7PUFDRUlNTU5QUVVVW1xeYWNkZWtscHF1dnp8gYSLjZOXmJ2epauvsrW2trq7vsPIyMnNzdDR0tfa293e4ePj5ebq6uvs7e3v8PHy8/X29/n6+vv8/f3+h4XXNQAAARpJREFUGBltwQc7QgEABdBbESESyt57771nVkSDZCUiRCHKKrr/W3mt19c5EFSuHd76PWc7AxKkUumDjLH3IKn5hsG9EY2ssF13x9Aq4hqfeNoAgWLjh+sQKJ00KZAwHgyP4t8m7XlIsUR3ASLUgd82pJIccxkRCzRDbJgORBg5BbGsF2oBXLEWaawcBOBjDtIYOAvglXKk2eUcgGtWIc0BhwBYOAExqYc1AFa4D7F+OhGh/QzWQ8RKHaL0tMmQYpreYkSp72mQIqHvnTMQdAVo0UAgWfzgVzdiej182+rMBirmLxh20deBmHJjmPx+9JN0jeXb+NyCuNbtyxDpNU3mAkUnfGhCkrxUCYHqnO46ZFLi4BEyKjNX/wE8YEkEtFYVkwAAAABJRU5ErkJggg==) no-repeat center center / 24rpx auto;
				}
			}
			>input{
				height: 72rpx;
				line-height: 72rpx;
				background-color: #f5f5f5;
				border-radius: 8rpx;
				padding: 0 20rpx;
				&:hover + .search-logo{
					display: none;
				}
			}
		}
		.logo-img{
			flex: 0 0 182rpx;
			width: 182rpx;
			height: 44rpx;
		}
	}
	.full-column{
		.title{
			background-color: #fff;
			font-size: 28rpx;
			margin-top: 15rpx;
			line-height: 72rpx;
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			>image{
				width: 32rpx;
				height: 32rpx;
			}
		}
		.search-history-list{
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx;
			.search-history-item{
				margin-right: 15rpx;
				margin-bottom: 15rpx;
				padding: 10rpx 15rpx;
				line-height: 52rpx;
				background-color: #fff;
				border-radius: 8rpx;
				font-size: 26rpx;
				color: #666;
				white-space: nowrap;
			}
		}
	}
</style>
