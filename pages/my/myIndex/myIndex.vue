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
			<view class="myCenter">
				<view class="myCenter-top">
					<view class="myCenter-top-list">
						<view class="myCenter-top-list-item" @click="golist(1)">
							<image class="myCenter-top-list-item-top" src="../../../static/img/travelorder_icon.png" mode=""></image>
							<view class="myCenter-top-list-item-bottom">旅游订单</view>
						</view>
						<view class="myCenter-top-list-item" @click="golist(2)">
							<image class="myCenter-top-list-item-top" src="../../../static/img/specialorders_icon.png" mode=""></image>
							<view class="myCenter-top-list-item-bottom">特产订单</view>
						</view>
					</view>
				</view>
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
	},
	onLoad(options) {
		if (!uni.getStorageSync('token')) {
			uni.navigateTo({
				url: `/pages/authorizations/authorizations`
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
			if (go == 1) {
				uni.navigateTo({
					url: '/pages/my/myorder/travelOrder/orderList/orderList'
				});
			}
			if (go == 2) {
				uni.navigateTo({
					url: '/pages/my/myorder/specialtyOrder/orderList/orderList'
				});
			}
		}
	}
};
</script>

<style>
@import url('myIndex');
</style>
