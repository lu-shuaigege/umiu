<template>
	<view class="paySuccess">
		<image src="/static/img/paysuccess.png" mode=""></image>
		<view class="first">支付成功</view>
		<view class="second">支付金额：￥{{ amount }}</view>
		<view class="third">请与销售人员联系获取物流信息</view>
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
@import url('paySuccess.css');
</style>
