<template>
	<view class="my">
		<view class="myTop">
			<view class="myTop-topimg">
				<image v-show="!data.cover_image" class="myTop-topimg-img" src="../../../static/img/shopbg.png" mode=""></image>
				<image v-show="data.cover_image" class="myTop-topimg-img" :src="data.cover_image" mode=""></image>
			</view>
			<view class="myTop-bottom">
				<view class="myTop-bottom-top">
					<image class="myTop-bottom-top-left" v-if="data.avatar" :src="data.avatar" mode=""></image>
					<image class="myTop-bottom-top-left" v-if="!data.avatar" src="../../../static/img/header_img.png" mode=""></image>
					<view class="myTop-bottom-top-right">
						<view class="myTop-bottom-top-right-top">
							<view class="myTop-bottom-top-right-top-left">
								<view class="myTop-bottom-top-right-title">
									<view class="myTop-bottom-top-name">{{ data.nickname }}</view>
									<image v-if="data.sex == 1" class="myTop-bottom-top-sex" src="../../../static/img/customized_manicon.png" mode=""></image>
									<image v-if="data.sex == 2" class="myTop-bottom-top-sex" src="../../../static/img/customized_womanicon.png" mode=""></image>
								</view>
								<view class="myTop-bottom-top-right-top-left-bottom">
									<view class="role_zh">{{ data.role_zh }}</view>
								</view>
							</view>
						</view>

						<view class="myTop-bottom-top-right-word">{{ data.profile }}</view>
					</view>
				</view>
			</view>
		</view>
	<view class="myCenter-list">
		<view class="myCenter-list-item" @click="golist(1)">
			<view class="myCenter-list-item-label">
				<image class="label-img" src="../../../static/img/travelorder_icon.png" mode=""></image>
				<view class="label-text">旅游订单</view>
			</view>
			<image class="myCenter-list-item-right"  src="../../../static/img/my_ic_more.png" ></image>
		</view>
		<view class="myCenter-list-item" @click="golist(2)">
			<view class="myCenter-list-item-label">
				<image class="label-img" src="../../../static/img/specialorders_icon.png" mode=""></image>
				<view class="label-text">特产订单</view>
			</view>
			<image class="myCenter-list-item-right"  src="../../../static/img/my_ic_more.png" ></image>
		</view>
		<view class="myCenter-list-item" @click="golist(3)">
			<view class="myCenter-list-item-label">
				<image class="label-img" src="../../../static/img/order_ic_wallet.png" mode=""></image>
				<view class="label-text">我的钱包</view>
			</view>
			<image class="myCenter-list-item-right"  src="../../../static/img/my_ic_more.png" ></image>
		</view>
	</view>
	</view>
</template>

<script>
import { userInfo } from '@/http/api.js';
export default {
	data() {
		return {
			data: {}
		};
	},
	onShow() {
		wx.hideHomeButton();
		this.userInfo();
	},
	onLoad(options) {
		if (!uni.getStorageSync('token')) {
			uni.navigateTo({
				url: `/pages/authorizations/authorizations?needUserInfo=${1}&needToken=${1}`
			});
		}
		if (!uni.getStorageSync('userInfo')) {
			uni.navigateTo({
				url: `/pages/authorizations/authorizations?needUserInfo=${1}&needToken=${1}`
			});
		}
		this.userInfo();
	},
	methods: {
		userInfo() {
			userInfo().then(res => {
				this.data = res.data;
			});
		},
		golist(go) {
			let url=''
			switch (go){
				case 1:
					url='/pages/my/myorder/travelOrder/orderList/orderList'
					break;
				case 2:
					url='/pages/my/myorder/specialtyOrder/orderList/orderList'
					break;
				case 3:
					url='/pages/my/myWallet/index/myWalletIndex'
					break;
				default:
					break;
			}
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style>
@import url('myIndex');
</style>
