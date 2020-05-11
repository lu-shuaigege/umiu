<template>
	<view class="my-wallet-wd-status">
		<image src="../../../../../static/img/my_wallet_ic_wd_success.png" class="status-image"></image>
		<view class="status-title">提现申请失败!</view>
		<view class="status-hit">您的银行卡信息有误</view>
	</view>
</template>

<script>
	export default{
		onShow() {
			wx.hideHomeButton()
		}
	}
</script>

<style>
@import url('myWalletWDStatus');
</style>