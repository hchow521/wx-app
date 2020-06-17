<template>
	<view class="content details-view">
		<view class="details-top wrap-content wrap-bottom">
			<view class="logo-bg">
				<image :src="managerStyle || type === 2 ? details.enterprise.icon : details.icon" mode="aspectFit" />
			</view>
			<image class="app-logo" src="/static/img/logo.png" />
			<view class="details-title text-ellipsis">{{managerStyle || type === 2 ? details.enterprise.name : details.title}}</view>
			<view class="logo">
				<image :src="managerStyle || type === 2 ? details.enterprise.icon : details.icon" mode="aspectFit" />
			</view>
		</view>
		<view class="enterprise-info wrap-content wrap-bottom" v-if="managerStyle || type === 2">
			<title-wrap title="企业信息" icon="/static/img/enterprise.png"></title-wrap>
			<view class="content-wrap">
				<view class="text-style">广州顺裕信息科技有限公司为专职移动业务全代理，发展重心在于发展中国移动商业专线和宽带、电路等业务。</view>
				<block v-if="type === 4">
					<view class="enterprise-title">擅长业务</view>
					<view class="text-style">互联网语音专线、电路租赁、酒店包。</view>
					<view class="enterprise-title">优势客情区域分布</view>
					<view class="text-style">白云、天河、越秀等。</view>
					<view class="enterprise-title">优势客情行业分布</view>
					<view class="text-style">互联网信息相关行业、交通运输、医药行业。</view>
				</block>
				<view class="tag-wrap">
					<view class="tag-item" :class="'tag-' + (i % 4 + 1)" v-for="(item, i) in details.tag" :key="i">{{item.name}}</view>
				</view>
			</view>
		</view>
		<block v-if="type !== 4">
			<view class="project-wrap wrap-content wrap-bottom">
				<title-wrap :title="type === 3 ? '权益内容' : '方案介绍'" icon="/static/img/form.png" />
				<view class="content-wrap">
					<block v-if="details.project.length > 1 && type !== 3">
						<view v-for="(item, index) in details.project" :key="index">
							<view class="project-index">方案{{convertToChinaNum(index + 1)}}</view>
							<image :src="item.src" mode="widthFix" lazy-load />
						</view>
					</block>
					<block v-else>
						<image v-for="(item, index) in details.project" :key="index" :src="item.src" mode="widthFix" lazy-load />
					</block>
				</view>
			</view>
			<view class="project-wrap wrap-content wrap-bottom" v-if="details.success.length > 0">
				<title-wrap title="成功案例" icon="/static/img/book.png" />
				<view class="content-wrap">
						<image v-for="(item, index) in details.success" :key="index" :src="item.src" mode="widthFix" lazy-load />
				</view>
			</view>
		</block>
		<view class="connect-info wrap-content wrap-bottom">
			<title-wrap title="联系方式" icon="/static/img/phone.png" />
			<view class="shadow-box">
				<view class="list-wrap">
					<text>联系人：</text>
					<text>周生</text>
				</view>
				<view class="list-wrap">
					<text>联系电话：</text>
					<text @click="handleCall">15913666666</text>
				</view>
			</view>
		</view>
		<view class="like-wrap">
			<view class="like-item" @click="changeLike('add')">
				<image v-if="!details.add.status" src="/static/img/add_false.png" mode="aspectFit" />
				<image v-else src="/static/img/add_true.png" mode="aspectFit" />
				<text>{{details.add.status ? '已收藏' : '收藏'}}</text>
				<text class="number">({{details.add.number || 0}})</text>
			</view>
			<view class="like-item" @click="changeLike('like')">
				<image v-if="!details.like.status" src="/static/img/like_false.png" mode="aspectFit" />
				<image v-else src="/static/img/like_true.png" mode="aspectFit" />
				<text>{{details.like.status ? '已点赞' : '点赞'}}</text>
				<text class="number">({{details.like.number || 0}})</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				details: {},
				type: 1
			}
		},
		computed: {
			managerStyle() {
				return this.$store.state.managerStyle
			}
		},
		methods: {
			getDetails() {
				let details = {}
				if (this.type === 3) {
					details = {
						"icon": "/static/demo/demo.png",
						"title": "ASPEN",
						"enterprise": {
							"name": "上海米健信息技术有限公司",
							"icon": "/static/img/demo.png"
						},
						"tag": [
							{
								name: "语音专线"
							},
							{
								name: "互联网专线"
							},
							{
								name: "电路租用"
							},
							{
								name: "智慧酒店"
							},
							{
								name: "更多"
							}
						],
						"like": {
							status: 1,
							number: 10
						},
						"add": {
							status: 0,
							number: 100
						},
						"project": [
							{
								"src": "http://weiphone8.com/applet/images/gz/quanyi1.png"
							},
							{
								"src": "http://weiphone8.com/applet/images/gz/quanyi2.png"
							},
							{
								"src": "http://weiphone8.com/applet/images/gz/quanyi3.png"
							}
						],
						"success": []
					}
				} else {
					const list = [
						{
							"icon": "/static/demo/logo1.png",
							"title": "单病种急救解决方案",
							"enterprise": {
								"name": "上海米健信息技术有限公司",
								"icon": "/static/img/demo.png"
							},
							"tag": [
								{
									name: "语音专线"
								},
								{
									name: "互联网专线"
								},
								{
									name: "电路租用"
								},
								{
									name: "智慧酒店"
								},
								{
									name: "更多"
								}
							],
							"like": {
								status: 1,
								number: 10
							},
							"add": {
								status: 0,
								number: 100
							},
							"project": [
								{
									"src": "http://weiphone8.com/applet/images/gz/project1.png"
								},
								{
									"src": "http://weiphone8.com/applet/images/gz/project2.png"
								},
								{
									"src": "http://weiphone8.com/applet/images/gz/project3.png"
								},
								{
									"src": "http://weiphone8.com/applet/images/gz/project4.png"
								}
							],
							"success": [
								{
									"src": "http://weiphone8.com/applet/images/gz/success1.png"
								},
								{
									"src": "http://weiphone8.com/applet/images/gz/success2.png"
								},
								{
									"src": "http://weiphone8.com/applet/images/gz/success3.png"
								}
							]
						},
						{
							"icon": "/static/demo/logo2.png",
							"title": "急诊急救解决方案",
							"enterprise": {
								"name": "上海米健信息技术有限公司",
								"icon": "/static/img/demo.png"
							},
							"tag": [
								{
									name: "语音专线"
								},
								{
									name: "互联网专线"
								},
								{
									name: "电路租用"
								},
								{
									name: "智慧酒店"
								},
								{
									name: "更多"
								}
							],
							"like": {
								status: 1,
								number: 10
							},
							"add": {
								status: 0,
								number: 100
							},
							"project": [
								{
									"src": "http://weiphone8.com/applet/images/gz/project1.png"
								},
								{
									"src": "http://weiphone8.com/applet/images/gz/project2.png"
								},
								{
									"src": "http://weiphone8.com/applet/images/gz/project3.png"
								},
								{
									"src": "http://weiphone8.com/applet/images/gz/project4.png"
								}
							],
							"success": [
								{
									"src": "http://weiphone8.com/applet/images/gz/success1.png"
								},
								{
									"src": "http://weiphone8.com/applet/images/gz/success2.png"
								},
								{
									"src": "http://weiphone8.com/applet/images/gz/success3.png"
								}
							]
						},
						{
							"icon": "/static/demo/logo3.png",
							"title": "手术室麻醉解决方案",
							"enterprise": {
								"name": "上海米健信息技术有限公司",
								"icon": "/static/img/demo.png"
							},
							"tag": [
								{
									name: "语音专线"
								},
								{
									name: "互联网专线"
								},
								{
									name: "电路租用"
								},
								{
									name: "智慧酒店"
								},
								{
									name: "更多"
								}
							],
							"like": {
								status: 1,
								number: 10
							},
							"add": {
								status: 0,
								number: 100
							},
							"project": [
								{
									"src": "http://weiphone8.com/applet/images/gz/project1.png"
								},
								{
									"src": "http://weiphone8.com/applet/images/gz/project2.png"
								},
								{
									"src": "http://weiphone8.com/applet/images/gz/project3.png"
								},
								{
									"src": "http://weiphone8.com/applet/images/gz/project4.png"
								}
							],
							"success": [
								{
									"src": "http://weiphone8.com/applet/images/gz/success1.png"
								},
								{
									"src": "http://weiphone8.com/applet/images/gz/success2.png"
								},
								{
									"src": "http://weiphone8.com/applet/images/gz/success3.png"
								}
							]
						}
					]
					const index = Math.floor( Math.random() * list.length )
					details = list[index]
				}
				this.$nextTick(() => {
					uni.setNavigationBarTitle({
					    title: this.managerStyle ? details.enterprise.name : details.title
					});
				})
				this.details = details
			},
			changeLike(key) {
				const data = Object.assign({}, this.details[key])
				data.number = !!this.details[key].status ? data.number - 1 : data.number + 1;
				data.status = !this.details[key].status
				
				this.$set(this.details, key, data)
				let content = data.status ? '' : '取消'
				content += key === 'like' ? '点赞' : '收藏'
				uni.showToast({
					title: content + '成功'
				})
			},
			//将数字（整数）转为汉字，从零到一亿亿，需要小数的可自行截取小数点后面的数字直接替换对应arr1的读法就行了
			convertToChinaNum(num) {
			    var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
			    var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千','万', '十', '百', '千','亿');//可继续追加更高位转换值
			    if(!num || isNaN(num)){
			        return "零";
			    }
			    var english = num.toString().split("")
			    var result = "";
			    for (var i = 0; i < english.length; i++) {
			        var des_i = english.length - 1 - i;//倒序排列设值
			        result = arr2[i] + result;
			        var arr1_index = english[des_i];
			        result = arr1[arr1_index] + result;
			    }
			    //将【零千、零百】换成【零】 【十零】换成【十】
			    result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
			    //合并中间多个零为一个零
			    result = result.replace(/零+/g, '零');
			    //将【零亿】换成【亿】【零万】换成【万】
			    result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
			    //将【亿万】换成【亿】
			    result = result.replace(/亿万/g, '亿');
			    //移除末尾的零
			    result = result.replace(/零+$/, '')
			    //将【零一十】换成【零十】
			    //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
			    //将【一十】换成【十】
			    result = result.replace(/^一十/g, '十');
			    return result;
			},
			handleCall() {
				uni.makePhoneCall({
						phoneNumber: '114' //仅为示例
				});
			}
		},
		onLoad(option) {
			this.type = option.type ? Number(option.type) : 1
			this.getDetails()
		}
	}
</script>

<style scoped lang="less">
	.details-view{
		width: 100vw;
		.details-top{
			position: relative;
			padding: 33rpx 30rpx;
			.logo-bg{
				width: 100%;
				height: 307rpx;
				overflow: hidden;
				position: absolute;
				top: 0;
				left: 0;
				background-color: #0a1623;
				>image{
					width: 100%;
					background-color: #fff;
					opacity: .3;
				}
			}
			.app-logo{
				width: 183rpx;
				height: 38rpx;
				position: relative;
				z-index: 1;
			}
			.details-title{
				line-height:126rpx;
				color: #fff;
				font-size: 40rpx;
				text-shadow:0rpx 6rpx 30rpx rgba(173,176,179,1);
				text-align: center;
				position: relative;
				z-index: 1;
			}
			.logo{
				width:360rpx;
				height:235rpx;
				margin: 0 auto;
				background:rgba(255,255,255,1);
				box-shadow:0px 6rpx 30rpx 0px rgba(230,230,230,1);
				border-radius:20rpx;
				padding: 22rpx;
				position: relative;
				z-index: 1;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.enterprise-info{
			.text-style{
				font-size:26rpx;
				font-weight:bold;
				color:#656D71;
				line-height:52rpx;
				text-indent: 2em;
				padding-bottom: 30rpx;
			}
			.enterprise-title{
				font-size: 26rpx;
				color: #0485D2;
				line-height: 48rpx;
				&::before{
					content: '';
					display: inline-block;
					width:5rpx;
					height:25rpx;
					background:#0485D2;
					border-radius:2rpx;
					margin-right: 12rpx;
				}
			}
			.tag-wrap{
				display: flex;
				flex-wrap: wrap;				.tag-item{
					height: 57rpx;
					line-height: 57rpx;
					border-radius:29rpx;
					font-size: 24rpx;
					padding: 0 28rpx;
					margin-bottom: 15rpx;
					margin-right: 15rpx;
					min-width: 96rpx;
					text-align: center;
					&.tag-1{
						background:rgba(4,133,210,0.05);
						color: #5993B4;
					}
					&.tag-2{
						background:rgba(35,196,107,0.05);
						color: #7AB366;
					}
					&.tag-3{
						background:rgba(87,202,239,0.05);
						color: #5993B4;
					}
					&.tag-4{
						background:rgba(241,143,78,0.05);
						color: #C5905D;
					}
				}
			}
		}
		.shadow-box{
			margin: 0 30rpx 30rpx;
			box-shadow:0px 10rpx 30rpx 0px rgba(228,232,235,1);
			border-radius:10rpx;
			padding: 34rpx 57rpx;
			.list-wrap{
				line-height: 48rpx;
				text{
					&:first-child{
						font-size: 26rpx;
						color: #666666;
					}
					&:last-child{
						font-size: 30rpx;
						color: #0F8BD4;
					}
				}
			}
		}
		.like-wrap{
			display: flex;
			justify-content: flex-end;
			margin-bottom: 40rpx;
			padding: 0 30rpx;
			.like-item{
				margin-left: 48rpx;
				font-size: 26rpx;
				image{
					width: 30rpx;
					height: 30rpx;
					vertical-align: middle;
				}
				&:first-child{
					color: #E87223;
				}
				&:last-child{
					color: #0F8BD4;
				}
				.number{
					color: #CCC7C4;
				}
			}
		}
		.project-wrap{
			
			.project-index{
				font-size: 28rpx;
				color: #0485D2;
				text-align: center;
				line-height:126rpx;
				font-weight:bold;
			}
			image{
				width: 100%;
				box-shadow:0px 6rpx 40rpx 0px rgba(223,227,230,1);
				border-radius:8rpx;
				
				& + image{
					margin-top: 20rpx;
				}
			}
		}
		image{
			will-change: transform;
		}
		
		.content-wrap{
			padding: 0 30rpx 30rpx;
		}
	}
</style>
