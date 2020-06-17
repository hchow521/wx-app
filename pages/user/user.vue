<template>
	<view class="content">
		<image class="user-bgi" src="/static/img/user-bgi.png" mode="widthFix"></image>
		<image class="logo-img" src="/static/img/logo.png"></image>
		<view class="user-wrap">
			<block v-if="hasLogin">
				<open-data class="user-avatar" type="userAvatarUrl"></open-data>
				<open-data class="text-view" type="userNickName"></open-data>
			</block>
			<block v-else>
				<view class="user-avatar not-login">
					<image src="/static/img/avatar.png"></image>
				</view>
				<button class="text-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">点击登录</button>
			</block>
		</view>
		<view class="full-column">
			<view class="like-wrap">
				<title-wrap icon="/static/img/like.png" :title="likeList.length === 0 ? '我的收藏' : '我的收藏（' + likeList.length + '）'">
					<picker @change="bindPickerChange" :value="index" :range="typeList">
						<view class="select-btn">{{typeList[index]}}</view>
					</picker>
				</title-wrap>
				<block v-if="!hasLogin">
					<view class="other-status-wrap">
							<image class="search-img" src="/static/img/search.png"></image>
							<text>登陆后可查看</text>
					</view>
				</block>
				<block v-else>
					<block v-if="likeList.length === 0">
							<view class="other-status-wrap">
									<image class="box-img" src="/static/img/box.png"></image>
									<text>收藏夹空空如也～</text>
							</view>
					</block>
					<block v-else>
						<view class="like-list">
							<div class="like-item" v-for="item in likeList" @click="likeClick(item.type)">
								<image class="like-icon" :src="item.icon"></image>
								<view class="like-title">{{item.title}}</view>
								<view class="like-time">{{parseTime(item.time)}}</view>
							</div>
						</view>
					</block>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				typeList: [
					'全部',
					'解决方案',
					'企业',
					'权益型'
				],
				list: [
					{
						icon: '/static/img/weixin.png',
						title: '急诊急救解决方案急诊急救解决方案急诊急救解决方案',
						time: 1591085043385,
						type: 1
					},
					{
						icon: '/static/img/weixin.png',
						title: '急诊急救解决方案',
						time: 1591085043385,
						type: 1
					},
					{
						icon: '/static/img/weixin.png',
						title: '急诊急救解决方案',
						time: 1591085043385,
						type: 1
					},
					{
						icon: '/static/img/demo.png',
						title: '企业名称',
						time: 1591085043385,
						type: 2
					},
					{
						icon: '/static/img/demo.png',
						title: '企业名称',
						time: 1591085043385,
						type: 2
					},
					{
						icon: '/static/img/demo.png',
						title: '企业名称',
						time: 1591085043385,
						type: 2
					},
					{
						icon: '/static/img/weixin.png',
						title: '权益类型',
						time: 1591085043385,
						type: 3
					},
					{
						icon: '/static/img/weixin.png',
						title: '权益类型',
						time: 1591085043385,
						type: 3
					},
					{
						icon: '/static/img/weixin.png',
						title: '权益类型',
						time: 1591085043385,
						type: 3
					}
				],
				type: '',
				index: 0
			}
		},
		computed: {
			...mapState(['hasLogin']),
			likeList() {
				return this.list.filter(item => this.index ? item.type === this.index : true)
			}
		},
		methods: {
			...mapMutations(['login']),
			getPhoneNumber({ detail }) {
				console.log(detail)
				if (detail.encryptedData) {
					this.login(15913656060)
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			},
			parseTime(date) {
				if (new Date(date).toString() === 'Invalid Date') return ''
				date = new Date(date)
				const month = this.add0(date.getMonth() + 1)
				const day = this.add0(date.getDate())
				const hour = this.add0(date.getHours())
				const minute = this.add0(date.getMinutes())
				const second = this.add0(date.getSeconds())
				return month + '-' + day + ' ' + hour + ':' + minute + ':' + second
			},
			add0(num) {
				return Number(num) <= 0 ? num : Number(num) < 10 ? '0' + Number(num) : num
			},
			bindPickerChange(e) {
				this.index = Number(e.target.value)
			},
			likeClick(type) {
				uni.navigateTo({
					url: '/pages/details/details?type=' + type
				});
			}
		}
	}
</script>

<style lang="less">
	.select-btn{
		height:50rpx;
		line-height:50rpx;
		border:1px solid rgba(227,228,230,1);
		border-radius:10rpx;
		color: #979899;
		font-size: 24rpx;
		padding: 0 57rpx 0 24rpx;
		position: relative;
		&::after{
			content: '';
			position: absolute;
			right: 17rpx;
			top: 2rpx;
			display: inline-block;
			width: 21rpx;
			height: 50rpx;
			background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAMCAMAAAC6EAb3AAAAxlBMVEUAAACAgICAgICZmZmqqqq2traqqqqdnZ2Pj4+Xl5eVlZWVnp6WlpaZmZmUlJqcnJybm5uYmJ2ZmZmbm5uYnJycnJyWmpqZmZyXmpqYmJuZnJyampqWmJqYmJqZmZuYmpqYmZmYmJiYmJqXmZmZmZuYmJqYmpqYmpuXmZuYmJqYmZmXmJiYmZqYmJqYmpqYmZmYmZqZmpqYmZqXmZqYmZqYmZuYmZqYmZqYmZqZmpqYmZqYmZqYmZqYmZqYmZqYmZqYmZqZmpvdnsOHAAAAQnRSTlMAAgQFBgcJDRAWHR0iIysxODlBQkNDRFBRXl9gbW1ub4qLi4yMjY2Sm6S3uLnExNra3t/g5ufo7u/09fb3+fr8/v7K0PHQAAAAi0lEQVQYGWXBhxpCUAAG0P+6iCKlqaWJSltGWb3/S7WLzzlQ5jLy5IUCM93UkVXbpiakVbpv4a+xS9cSULGTg0rwRtRjYpfxIFqh02fxxPac0BLxIkwjT6cA6MiLZgI+OCO4Dnnwg0tgcPhhdDeeVMfxWWeQQTU/OkW+RpHXdW9uBwXtZRNFpETwdQegVQ06IJUCfQAAAABJRU5ErkJggg==') no-repeat center center / 21rpx auto;
		}
		&:active{
			border-color: #999;
		}
	}
	.logo-img{
		width: 183rpx;
		height: 38rpx;
		position: absolute;
		top: 33rpx;
		left: 27rpx;
	}
	.like-wrap{
		width: 696rpx;
		margin: 27rpx 0 0 27rpx;
		max-height: calc(100% - 54rpx);
		background:rgba(255,254,255,1);
		box-shadow:0px 6rpx 30rpx 0px rgba(230,230,230,1);
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		position: relative;
		z-index: 1;
		.like-list{
			flex: 1;
			overflow-y: auto;
			padding: 0 28rpx;
			box-sizing: border-box;
			.like-item{
				display: flex;
				align-items: center;
				height: 148rpx;
				border-bottom:  1px solid #F0F0F0;
				&:last-child{
					border: 0;
				}
				.like-icon{
					flex: 0 0 48rpx;
					width: 48rpx;
					height: 48rpx;
				}
				.like-title{
					flex: 1;
					color: #3A4044;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding: 0 29rpx;
					font-size: 28rpx;
				}
				.like-time{
					color: #C0C1C2;
					font-size: 26rpx;
				}
			}
		}
		.other-status-wrap{
			height: 495rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			>text{
				font-size: 30rpx;
				color: #B3BBC7;
			}
			.box-img{
				width:238rpx;
				height:179rpx;
				margin-bottom: 27rpx;
			}
			.search-img{
				width:396rpx;
				height:226rpx;
				margin-bottom: 13rpx;
			}
		}
	}
	.full-column{
		overflow: hidden;
	}
	.user-wrap{
		display: flex;
		align-items: center;
		padding: 98rpx 66rpx 30rpx;
		box-sizing: border-box;
		position: relative;
		z-index: 1;
		.user-avatar{
			flex: 0 0 136rpx;
			width: 136rpx;
			height: 136rpx;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 39rpx;
			&.not-login{
				background-color: #FFFEFF;
				display: flex;
				align-items: center;
				justify-content: center;
				>image{
					width: 62rpx;
					height: 60rpx;
				}
			}
		}
		.text-btn, .text-view{
			flex: 1;
			background-color: transparent;
			text-align: left;
			color: #fff;
			font-size: 28rpx;
			padding: 0;
		}
		
		
		/* 按钮改文本样式 */
		button.text-btn,
		button.text-btn:active, 
		button.text-btn:focus{
			background-color: transparent;
			color: #fff;
		}
		button.text-btn::after{
			content: '';
			border: 0;
		}
	}
	.content{
		width: 100%;
		height: 100vh;
		position: relative;
		.user-bgi{
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>
