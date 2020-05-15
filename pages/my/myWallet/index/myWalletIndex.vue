<template>
	<view class="my-wallet">
		<view class="my-wallet-money">
			<view class="my-wallet-money-body">
				<view class="my-wallet-money-title">
					<view class="my-wallet-money-title-body">
						<view class="normal">账户余额</view>
						<view class="small">(元)</view>
					</view>
				</view>
				<view class="my-wallet-money-sum">{{ wallet.balance.toFixed(2) }}</view>
				<view class="my-wallet-money-forze">冻结账户金额：{{ wallet.frozen_balance.toFixed(2) }}</view>
			</view>
		</view>
		<view class="my-wallet-center">
			<view class="center-item border">
				<view class="title">累计分佣总收益</view>
				<view class="num">{{ wallet.total_commission.toFixed(2) }}</view>
			</view>
			<view class="center-item">
				<view class="title">已提现总金额</view>
				<view class="num">{{ wallet.total_withdrawal.toFixed(2) }}</view>
			</view>
		</view>
		<view class="my-wallet-list">
			<view class="my-wallet-list-item" @click="goWithdraw()">
				<view class="item-left">
					<image class="item-left-image" src="../../../../static/img/my_wallet_ic_withdrawable.png"></image>
					<view class="item-left-text">提现</view>
				</view>
				<view class="item-right">
					<view class="item-right-text">{{ wallet.can_withdrawal.toFixed(2) }}可提现</view>
					<image class="item-right-image" src="../../../../static/img/my_wallet_ic_more.png"></image>
				</view>
			</view>
			<view class="my-wallet-list-item" @click="goDetail()">
				<view class="item-left">
					<image class="item-left-image" src="../../../../static/img/my_wallet_ic_detail.png"></image>
					<view class="item-left-text">明细</view>
				</view>
				<view class="item-right">
					<view class="item-right-text">查看明细</view>
					<image class="item-right-image" src="../../../../static/img/my_wallet_ic_more.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getWallet } from '@/http/api.js';
export default {
	data() {
		return {
			wallet: {
				total: '00.00',
				forze: '00.00',
				trevenue: '00.00',
				withdrawn: '00.00',
				withdrawable: '00.00',
				frozen_balance: '00.00'
			},
			refresh: false
		};
	},
	onLoad() {
		this.getWalletInfo();
	},
	onShow() {
		wx.hideHomeButton();
	},
	methods: {
		getWalletInfo() {
			getWallet().then(res => {
				console.log(res);
				if (this.refresh) {
					this.refresh = !this.refresh;
					uni.stopPullDownRefresh();
				}
				if (res.data != null) {
					let data = res.data;
					this.wallet = res.data;
					// this.wallet.total = parseFloat(data.balance).toFixed(2);
					// this.wallet.forze = parseFloat(data.frozen_commission).toFixed(2);
					// this.wallet.trevenue = parseFloat(data.total_commission).toFixed(2);
					// this.wallet.withdrawn = parseFloat(data.total_withdrawal).toFixed(2);
					// this.wallet.withdrawable = parseFloat(data.can_withdrawal).toFixed(2);
				} else {
					uni.showToast({
						title: '金额获取有点儿问题，下拉刷新试试'
					});
				}
			});
		},
		goWithdraw() {
			uni.navigateTo({
				url: '/pages/my/myWallet/withdraw/myWalletWithdraw'
			});
		},
		goDetail() {
			uni.navigateTo({
				url: '/pages/my/myWallet/detail/myWalletDetail'
			});
		},
		onPullDownRefresh() {
			this.refresh = true;
			this.getWalletInfo();
		}
	}
};
</script>

<style>
@import url('myWalletIndex');
</style>
