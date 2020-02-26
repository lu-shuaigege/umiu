<template>
	<view class="paySuccess">
		<image src="/static/img/paysuccess.png" mode=""></image>
		<view class="first">预约成功</view>
		<view class="second">查看跟进更多订单状态，请前往应用商店下载游米游App查看更多细节！</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			amount: ''
		};
	},
	onShow() {
		wx.hideHomeButton();
	},
	onLoad(options) {
		this.amount = options.amount;
	},
	methods: {}
};
</script>

<style>
page {
	background: #ffffff;
}
.paySuccess {
	text-align: center;
	padding: 1upx 50upx;
	box-sizing: border-box;
}
.paySuccess image {
	width: 311upx;
	height: 210upx;
	margin-top: 80upx;
}
.paySuccess .first {
	font-size: 36upx;
	font-weight: bold;
	color: #28282c;
	margin-top: 30upx;
}
.paySuccess .second {
	font-size: 24upx;
	color: #666666;
	margin-top: 25upx;
}
</style>
