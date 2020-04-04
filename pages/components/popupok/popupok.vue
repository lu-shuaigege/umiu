<template>
	<view class="pop" v-if="show">
		<view class="popup">
			<view class="popup_top"><view class="popup_top_text">确认取消</view></view>
			<view class="popup_bottom">
				<view class="popup_bottom_left" @click="click(false)">取消</view>
				<view class="popup_bottom_right" @click="click(true)">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['show'],
	data() {
		return {
			isok: false
		};
	},
	onShow() {
		wx.hideHomeButton();
	},
	onLoad(options) {
		this.id = options.id;
	},
	methods: {
		click(isok) {
			this.$emit('isokfn', isok);
			// console.log(isok);
		}
	}
};
</script>

<style>
.pop {
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	z-index: 99;
	top: 0upx;
	left: 0upx;
}
.popup {
	width: 600upx;
	height: 300upx;
	border-radius: 10upx;
	background: #ffffff;
}
.popup_top {
	height: 200upx;
	padding: 30upx;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid #e1e1e1;
}
.popup_bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.popup_bottom_left {
	width: 50%;
	border-right: 1px solid #e1e1e1;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(193, 193, 193, 1);
	line-height: 100rpx;
	text-align: center;
}
.popup_bottom_right {
	width: 50%;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(255, 102, 0, 1);
	line-height: 100rpx;
	text-align: center;
}
</style>
