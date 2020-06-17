<script>
	// export default {
	// 	onLaunch: function() {
	// 		console.log('App Launch');
	// 	},
	// 	onShow: function() {
	// 		console.log('App Show');
	// 	},
	// 	onHide: function() {
	// 		console.log('App Hide');
	// 	}
	// }
</script>

<style>

	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
		font-size: 16px;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #f5f5f5;
	}
	.wrap-content{
		background-color: #fff;
	}
	.wrap-bottom{
		margin-bottom: 18rpx;
	}
	.text-ellipsis{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.full-column{
		flex: 1;
	}
</style>
