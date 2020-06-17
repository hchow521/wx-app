<template>
	<view class="content">
		<view class="search-wrap wrap-content">
			<image class="logo-img" src="/static/img/logo.png"></image>
			<view class="input">
				<view class="search-logo" @click="handleSearch">
					<view class="logo"></view>
					<text>搜索</text>
				</view>
			</view>
			<view class="switch" v-if="manager" @click="changeStyle">
				<image src="/static/img/switch.png"></image>
				<view>{{managerStyle ? '客户版' : '经理版'}}</view>
			</view>
		</view>
		<view class="list-container">
			<view class="label-list">
				<scroll-view class="label-scroll" scroll-y scroll-with-animation :scroll-top="labelTop">
				<view class="label-item" :class="{active: i === activeIndex}" v-for="(list, i) in dataList" @click="handleClick(i)" :key="i">{{list.label}}</view>
				</scroll-view>
			</view>
			<view class="list-content">
				<scroll-view class="main-scroll" scroll-y scroll-with-animation @scroll="handleScroll" :scroll-into-view="toView">
					<view :id="'main' + index" class="scroll-view-item" v-for="(list, index) in dataList" :key="index">
						<view class="main-type">
							<view class="main-title">{{list.title}}</view>
							<view class="main-item-wrap">
								<view class="main-item" v-for="(item, i) in list.list" :key="i" @click="itemClick(item.type)">
									<view class="main-item-icon">
										<image :src="managerStyle ? item.enterprise.icon : item.icon"></image>
									</view>
									<view class="main-item-title">{{managerStyle ? item.enterprise.name : item.title}}</view>
								</view>
								<view style="width: 135rpx;"></view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	const json = require('./list.json')
	export default{
		data() {
			return {
				dataList: [],
				toView: '',
				labelTop: 0,
				activeIndex: 0,
				topList: [],
				title: ''
			}
		},
		computed: {
			manager() {
				return this.$store.state.manager
			},
			managerStyle() {
				return this.$store.state.managerStyle
			}
		},
		methods: {
			itemClick(type) {
				uni.navigateTo({
					url: "/pages/details/details?type=" + (type ? type : this.type)
				});
			},
			changeStyle() {
				this.$store.commit('SET_STYLE', !this.managerStyle)
			},
			handleClick(i) {
				this.activeIndex = i
				this.toView = 'main' + i
			},
			handleScroll(e) {
				if (this.getTopList()) {
					let scrollTop = e.detail.scrollTop;
					for (let i = 0; i < this.topList.length; i++) {
						if (scrollTop > this.topList[i].top && scrollTop < this.topList[i].bottom) {
							this.labelTop = (i - 1) * 50
							this.activeIndex = i
							// console.log(scrollTop)
							return false
						}
					}
				}
			},
			getTopList() {
				if(this.topList.length) return true
				let tabHeight = 0;
				for(let i=0;i<this.dataList.length;i++) {
					let view = uni.createSelectorQuery().select("#main" + i);
					view.fields({
						size: true
					}, data => {
						const item = {}
						item.top = tabHeight
						tabHeight = tabHeight + data.height;
						item.bottom = tabHeight;
						this.topList.push(item)
					}).exec();
				}
				return true
			},
			handleSearch() {
				uni.navigateTo({
					url: "/pages/search/search"
				});
			}
		},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			this.title = option.title
			this.type = Number(option.type)
			if (this.type === 4) {
				this.dataList	= json['渠道']
			} else if (this.type === 3) {
				this.dataList = json['权益']
			} else {
				this.dataList = json['其他']
			}
			this.$nextTick(() => {
				uni.setNavigationBarTitle({
						title: this.title
				});
			})
		},
		created() {
		},
		mounted() {
		},
	}
</script>

<style lang="less" scoped>
	.content{
		height: 100vh;
		background-color: #fafafa;
	}
	.search-wrap{
		flex: 0 0 112rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.input{
			flex: 1;
			position: relative;
			margin: 0 31rpx 0 24rpx;
			.search-logo{
				width: 100%;
				height: 72rpx;
				background-color: #f5f5f5;
				border-radius: 8rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				// pointer-events: none;
				text{
					color: #BBBBBB;
					font-size: 24rpx;
					font-weight: blod;
				}
				.logo{
					width: 25rpx;
					height: 25rpx;
					margin-right: 11.5rpx;
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAMAAAAc9R5vAAABklBMVEUAAAD///+AgICqqqq/v7+ZmZnMzMyqqqrV1dW2traqqqq5ubmqqqq/v7+xsbHExMS/v7/Dw8O8vLyzs7O/v7+8vLy4uLi9vb22tra5ubm7u7u9vb23t7e8vLy9vb28vLy5ubm/v7+8vLy4uLi5ubm6urq9vb26urq3t7e8vLy9vb28vLy6urq+vr64uLi8vLy6urq5ubm9vb25ubm9vb26urq8vLy6urq6urq9vb28vLy6urq7u7u7u7u5ubm6urq7u7u6urq7u7u7u7u7u7u5ubm8vLy8vLy7u7u6urq7u7u7u7u8vLy7u7u7u7u8vLy7u7u7u7u7u7u6urq7u7u6urq7u7u6urq8vLy6urq7u7u7u7u7u7u6urq7u7u8vLy7u7u8vLy6urq7u7u7u7u7u7u7u7u6urq7u7u7u7u7u7u6urq8vLy7u7u7u7u6urq7u7u7u7u7u7u6urq7u7u7u7u7u7u7u7u7u7u7u7u6urq7u7u7u7u6urq7u7u8vLy7u7u7u7u6urq7u7u7u7u7u7vEe6ymAAAAhXRSTlMAAQIDBAUFBgYHCQsMDA0NEBETFBQXGRscHR4fICIjJigoKissMDI0NTU2OTs7PUFDRUlNTU5QUVVVW1xeYWNkZWtscHF1dnp8gYSLjZOXmJ2epauvsrW2trq7vsPIyMnNzdDR0tfa293e4ePj5ebq6uvs7e3v8PHy8/X29/n6+vv8/f3+h4XXNQAAARpJREFUGBltwQc7QgEABdBbESESyt57771nVkSDZCUiRCHKKrr/W3mt19c5EFSuHd76PWc7AxKkUumDjLH3IKn5hsG9EY2ssF13x9Aq4hqfeNoAgWLjh+sQKJ00KZAwHgyP4t8m7XlIsUR3ASLUgd82pJIccxkRCzRDbJgORBg5BbGsF2oBXLEWaawcBOBjDtIYOAvglXKk2eUcgGtWIc0BhwBYOAExqYc1AFa4D7F+OhGh/QzWQ8RKHaL0tMmQYpreYkSp72mQIqHvnTMQdAVo0UAgWfzgVzdiej182+rMBirmLxh20deBmHJjmPx+9JN0jeXb+NyCuNbtyxDpNU3mAkUnfGhCkrxUCYHqnO46ZFLi4BEyKjNX/wE8YEkEtFYVkwAAAABJRU5ErkJggg==) no-repeat center center / 24rpx auto;
				}
			}
		}
		.logo-img{
			flex: 0 0 182rpx;
			width: 182rpx;
			height: 44rpx;
		}
		.switch{
			text-align: center;
			color: #0485D2;
			font-size: 22rpx;
			font-weight:bold;
			>image{
				width: 37rpx;
				height: 27rpx;
			}
			&:active{
				opacity: .5;
			}
		}
	}
	.list-container{
		flex: 1;
		overflow: hidden;
		padding: 0 30rpx 52rpx;
		display: flex;
		.label-list{
			flex: 0 0 218rpx;
			width: 218rpx;
			height: 100%;
			padding-top: 50rpx;
			box-sizing: border-box;
			.label-item{
				width: 100%;
				height: 50px;
				line-height: 50px;
				text-align: center;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 26rpx;
				color: #51585D;
				font-weight:bold;
				position: relative;
				background-color: #fff;
				&.active{
					background-color: #FAFAFA;
					color: #0485D2;
					&::before{
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						height: 50px;
						width: 6rpx;
						background-color: #0485D2;
					}
				}
			}
		}
		.list-content{
			flex: 1;
			height: 100%;
			padding-left: 30rpx;
			box-sizing: border-box;
			overflow: hidden;
			.scroll-view-item{
				width: 100%;
				.main-type{
					width: 100%;
					padding-bottom: 30rpx;
					.main-title{
						color: #16181A;
						font-size: 24rpx;
						line-height: 126rpx;
						font-weight:bold;
					}
					.main-item-wrap{
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
						.main-item{
							width: 135rpx;
							text-align: center;
							padding-bottom: 36rpx;
							.main-item-icon{
								width: 135rpx;
								height: 135rpx;
								line-height: 135rpx;
								border-radius: 10rpx;
								background-color: #fff;
								margin-bottom: 10rpx;
								box-shadow:0px 0px 20rpx 0px rgba(235,235,235,1);
								>image{
									width: 68rpx;
									height: 68rpx;
									vertical-align: middle;
								}
							}
							.main-item-title{
								font-size: 24rpx;
								color: #656D71;
								font-weight:bold;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
					}
				}
			}
		}
	}
	.label-scroll, .main-scroll{
		height: 100%;
	}
	
	image{
		will-change: transform
	}
</style>
