<template>
	<view class="my-wallet-wd-status">
		<image src="../../../../../static/img/my_wallet_ic_wd_failed.png" class="status-image"></image>
		<view class="status-title">提现申请成功！</view>
		<view class="status-hit">我们会在3个工作日内审核完成并支付提现金额</view>
		<view class="status-hit-small">提现金额：￥{{amount}}</view>
		<view class="status-hit-small top">当前余额：￥{{balance}}</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				amount:'0.00',
				balance:'0.00'
			}
		},
		onLoad(options) {
			this.amount=parseFloat(options.amount)
			this.balance=parseFloat(options.balance)
		},
		onShow() {
			wx.hideHomeButton()
		}
	}
</script>

<style>
@import url('myWalletWDStatus');
</style>
