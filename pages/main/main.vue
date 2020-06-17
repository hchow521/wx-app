<template>
	<view class="content">
		<!-- 轮播 -->
		<view class="swiper-wrap wrap-content">
				<swiper class="swiper-container" previous-margin="45rpx" next-margin="45rpx" circular interval="3000" @change="swiperChange" :autoplay="autoplay">
					<swiper-item class="swiper-item" :class="{active: swiperCurrent === index}" v-for="(item,index) in swiperList" :key="index" :item-id="index">
						<image class="app-logo" src="/static/img/logo.png" />
						<video v-if="item.isVideo" :id="'video_' + index" :ref="'video_' + index" class="swiper-content" src="https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/cae-legoup-video-target/6e07f4d5-307c-48e4-8093-3c224ddc4c1c.mp4" @error="videoErrorCallback" loop object-fit="cover" @pause="autoplay=true" @play="autoplay=false"></video>
						<image v-else class="swiper-content" :src="item.src" lazy-load></image>
					</swiper-item>
				</swiper>
			</swiper>
			<!-- 轮播指示点样式修改 -->
			<view class="dots">
					<block v-for="(item,index) in swiperList.length" :key="index">
							<view class="dot" :class="index==swiperCurrent ? ' active' : ''"></view>
					</block>
			</view>
		</view>
		<!-- 公告轮播 -->
		<notice-bar class="wrap-content wrap-bottom" :list="noticeList" />
		<view class="nav-grid-wrap wrap-content wrap-bottom" v-if="navList.length >= 6">
			<view class="plan-item" :class="{ 'first-row': i < 3, 'first-column': i % 3 === 0, 'last-column': (i + 1) % 3 === 0 }" v-for="(item, i) in navList" :key="i" @click="toList(i, item.title)">
				<image class="plan-icon" :src="item.icon" mode="aspectFit"></image>
				<view class="plan-title">{{item.title}}</view>
			</view>
		</view>
		<view class="plan-wrap wrap-content wrap-bottom" v-else>
			<view class="plan-item" v-for="(item, i) in navList" :key="i" @click="toList(item)">
				<image class="plan-icon" :src="item.icon" mode="aspectFit"></image>
				<view class="plan-title">{{item.title}}</view>
			</view>
		</view>
		<view class="wrap-content wrap-bottom">
			<title-wrap title="热门方案" icon="/static/img/hot.png"></title-wrap>
			<view class="hot-plan-list">
				<view class="hot-plan-item" v-for="(item, i) in hot" :key="i" @click="hotClick" :class="{ 'column-end':  i > 0 && i % 2 === 0 }">
					<view class="hot-plan-img">
						<image :src="item.icon"></image>
					</view>
					<view class="hot-plan-title">{{item.title}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				autoplay: false,
				swiperCurrent: 0,
				// 轮播
				swiperList: [
					{
						src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3687173686,831911132&fm=26&gp=0.jpg'
					},
					{
						src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2601388974,2460884874&fm=26&gp=0.jpg'
					},
					{
						src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2294966447,248611631&fm=26&gp=0.jpg'
					},
					{
						isVideo: true
					}
				],
				videoContext: null,
				// 公告
				noticeList: [
					{
						title: '送餐机器人方案来了'
					},
					{
						title: '这里是公告2'
					},
					{
						title: '这里是公告这里是公告这里是公告这里是公告这里是公告这里是公告这里是公告这里是公告'
					}
				],
				navListAll: [
					{
						icon: '/static/nav_icon/icon_1.png',
						title: '集成服务'
					},
					{
						icon: '/static/nav_icon/icon_2.png',
						title: '行业终端'
					},
					{
						icon: '/static/nav_icon/icon_3.png',
						title: '集团产品'
					},
					{
						icon: '/static/nav_icon/icon_4.png',
						title: '渠道销售',
						type: 4
					},
					{
						icon: '/static/nav_icon/icon_5.png',
						title: '咨询规划'
					},
					{
						icon: '/static/nav_icon/icon_6.png',
						title: '权益型',
						type: 3
					}
				],
				hot: [
					{
						title: '手术室麻醉解决方案',
						icon: '/static/demo/logo1.png'
					},
					{
						title: '急诊急救解决方案',
						icon: '/static/demo/logo2.png'
					},
					{
						title: '重症监护解决方案',
						icon: '/static/demo/logo3.png'
					},
					{
						title: '重症监护解决方案',
						icon: '/static/demo/logo3.png'
					},
					{
						title: '重症监护解决方案',
						icon: '/static/demo/logo3.png'
					}
				]
			}
		},
		computed: {
			...mapState(['hasLogin', 'userName']),
			videoList() {
				let list = []
				this.swiperList.map((item, index) => {
					item.isVideo ? list.push(index) : false
				})
				return list
			},
			
			managerStyle() {
				return this.$store.state.managerStyle
			},
			navList() {
				let arr = JSON.parse(JSON.stringify(this.navListAll))
				!this.managerStyle ? arr.splice(3, 1) : 1
				return arr
			}
		},
    methods: {
			swiperChange(e) {
				// 暂停视频
				this.videoContext && this.videoContext.pause()
				// 切换轮播指示点
				const index = e.detail.current
				this.swiperCurrent = index;
				// 视频播放
				// if (this.videoList.indexOf(index) != -1) {
				// 	this.autoplay = false
				// 	this.videoContext = uni.createVideoContext('video_' + index)
				// 	this.videoContext.play()
				// }
			},
			videoErrorCallback(e){
				console.log(e)
				uni.showToast({
				    title: '视频播放出错'
				});
			},
			toList(item) {
				uni.navigateTo({
					url: '/pages/list/list?type=' + (item.type || 1) + '&title=' + item.title
				});
			},
			hotClick() {
				uni.navigateTo({
					url: '/pages/details/details?id=1'
				});
			}
		},
		
		onLoad() {
			if (!this.hasLogin) {
				return
				uni.showModal({
					title: '温馨提示',
					content: '请先进行登录',
					confirmText: '去登录',
					success: (res) => {
						if (res.confirm) {
							uni.switchTab({
								url: '../user/user'
							});
						}
					}
				});
			}
		},
		onShow() {
			this.autoplay = true
		},
		onHide() {
			this.autoplay = false
		}
	}
</script>

<style scoped lang="less">
	.swiper-wrap{
		position: relative;
		.swiper-container {
			width: 750rpx;
			height: 380rpx;
		}
	
		.swiper-item {
			height: 350rpx !important;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: initial;
			position: relative;
			.app-logo{
				width: 173rpx;
				height: 36rpx;
				position: absolute;
				top: 22rpx;
				left: 34rpx;
				z-index: 1;
			}
			
			.swiper-content {
				width: 630rpx;
				height: 315rpx;
				border-radius:12rpx;
				// transition: transform 0.6s;
			}
			&.active {
				.swiper-content{
					transform: scale(1, 1.1);
					box-shadow:0px 10rpx 25rpx 0px rgba(187,193,206,0.75);
				}
			}
		}
		.dots {
			position: absolute;
			bottom: 46rpx;
			left: 50%;
			// 这里一定要注意兼容不然很可能踩坑          
			transform: translate(-50%, 0);
			-webkit-transform: translate(-50%, 0);        
			z-index: 99;
			display: flex;
			flex-direction: row;
			justify-content: center;
	
			.dot {
					width: 6rpx;
					height: 6rpx;
					transition: all .6s;
					background: #fff;
					margin-right: 10rpx;
					border-radius: 50%;
					opacity: .5;
			}
	
			.active {
					width: 18rpx;
					opacity: 1;
					border-radius: 6rpx;
			}
		}
	}
	.plan-wrap{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 220rpx;
		padding: 0 28rpx;
		box-sizing: border-box;
		.plan-item{
			flex: 0 0 20%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			.plan-icon{
				width: 96rpx;
				height: 96rpx;
			}
			.plan-title{
				width: 100%;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				color: #656D71;
				font-size: 24rpx;
				text-align: center;
				margin-top: 19rpx;
			}
		}
	}
	.nav-grid-wrap{
		display: flex;
		flex-wrap: wrap;
		.plan-item{
			flex: 0 0 calc(100% / 3);
			height: 211rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			box-sizing: border-box;
			position: relative;
			/* 左边框 */
			&::before{
				content: '';
				position: absolute;
				width: 1px;
				height: 100%;
				background-color: #F5F8FA;
				bottom: 43rpx;
				left: 0;
			}
			/* 上边框 */
			&::after{
				content: '';
				position: absolute;
				width: 100%;
				height: 1px;
				background-color: #F5F8FA;
				top: 0;
			}
			&.first-row{
				&::before{
					top: 41rpx;
				}
				&::after{
					height: 0;
				}
			}
			&.first-column{
				&::before{
					width: 0;
				}
				&::after{
					left: 71rpx;
				}
			}
			&.last-column{
				&::after{
					right: 71rpx;
				}
			}
			.plan-icon{
				width: 96rpx;
				height: 96rpx;
				margin-bottom: 19rpx;
			}
			.plan-title{
				width: 100%;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				color: #656D71;
				font-size: 24rpx;
				text-align: center;
			}
		}
	}
	.hot-plan-list{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 0 28rpx;
		box-sizing: border-box;
			// display: flex;
		.hot-plan-item{
			flex: 0 0 calc((100% - 38rpx) / 3);
			// margin: 28rpx 0 38rpx;
			// width: calc(100% / 3 - 12.6rpx);
			height: 329rpx;
			margin: 28rpx 19rpx 0 0;
			background:rgba(255,255,255,1);
			text-align: center;
			&.column-end{
				margin-right: 0;
			}
			
			.hot-plan-img{
				// flex: 0 0 225rpx;
				// width: 218rpx;
				width: 100%;
				height: 225rpx;
				border-radius:6rpx;
				box-shadow:0px 0px 49rpx 0px rgba(224,222,222,1);
				text-align: center;
				line-height: 225rpx;
				>image{
					width: 120rpx;
					height: 120rpx;
					vertical-align: middle;
				}
			}
			.hot-plan-title{
				width: 100%;
				overflow: hidden;
				font-size: 26rpx;
				line-height: 40rpx;
				color: #3A4044;
				padding: 14rpx;
				box-sizing: border-box;
				text-align: left;
			}
		}
	}
</style>
