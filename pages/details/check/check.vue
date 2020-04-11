<template>
	<view class="check">
		<view class="checkcon">
			<view class="checkcon_item" v-for="(item, index) in check" :key="index">
				<view class="checkcon_item_left">{{ item.name }}</view>
				<view class="checkcon_item_right">
					<image src="../../../static/img/reduce_icon.png" class="checkcon_item_right_left" @click="reduce(index, item.num)" mode=""></image>
					<view class="checkcon_item_right_center">{{ item.num }}</view>
					<image src="../../../static/img/add_icon.png" class="checkcon_item_right_left" @click="add(index, item.num)" mode=""></image>
				</view>
			</view>
			<view class="btn" @click="btn()">完成</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			check: [
				{
					id: 1,
					name: '房间数',
					num: 0
				},
				{
					id: 2,
					name: '成人数',
					num: 0
				},
				{
					id: 3,
					name: '儿童数',
					num: 0
				}
			]
		};
	},
	onShow() {
		wx.hideHomeButton();
	},
	onLoad(options) {
		this.check = JSON.parse(options.check);
	},
	methods: {
		reduce(index, num) {
			if (num == 0) {
				return;
			} else {
				this.check[index].num--;
			}
		},
		add(index, num) {
			this.check[index].num++;
		},
		btn() {
			let pages = getCurrentPages();
			let prevPage = pages[pages.length - 2]; //上一个页面
			//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
			prevPage.setData({
				check: this.check
			});
			wx.navigateBack({
				//返回
				delta: 1
			});
		}
	}
};
</script>

<style>
.check {
	width: 750upx;
	height: 100vh;
	padding-top: 20upx;
}
.checkcon {
	height: 100%;
	padding: 1upx 30upx;
	box-sizing: border-box;
	background: #ffffff;
}
.checkcon_item {
	width: 100%;
	height: 100upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #e7e7e7;
}
.checkcon_item_left {
	font-family: MicrosoftYaHei;
	font-size: 26rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 100rpx;
	letter-spacing: 2rpx;
	color: #333333;
}
.checkcon_item_right {
	display: flex;
	align-items: center;
}
.checkcon_item_right_left {
	width: 49rpx;
	height: 49rpx;
	border-radius: 7rpx;
}
.checkcon_item_right_center {
	margin: 0upx 30upx;
	font-family: MicrosoftYaHei;
	font-size: 30rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 30rpx;
	letter-spacing: 2rpx;
	color: #333333;
}
.checkcon_item_right_right {
	width: 49rpx;
	height: 49rpx;
	border-radius: 7rpx;
}
.btn {
	width: 691rpx;
	height: 79rpx;
	background-color: #ff6600;
	border-radius: 8rpx;
	margin: 196upx auto 0upx;
	font-family: PingFang-SC-Medium;
	font-size: 34rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 79rpx;
	letter-spacing: 0rpx;
	color: #ffffff;
	text-align: center;
}
</style>
