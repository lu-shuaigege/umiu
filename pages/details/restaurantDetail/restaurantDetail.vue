<template>
	<view class="restaurantDetail">
		<view class="hotelDetail_banner">
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item, index) in list.images" :key="index"><image :src="item" mode="aspectFill"></image></swiper-item>
			</swiper>
		</view>
		<view class="detail_intro">
			<view class="top">
				<view class="first">
					<view class="l">{{ list.title }}</view>
					<view class="r">
						门市价:
						<text>
							￥
							<text>{{ list.price }}</text>
						</text>
					</view>
				</view>
				<view class="second">
					<view class="l">{{ list.address }}</view>
					<!-- <view class="r">门市价:￥{{list.price}}</view> -->
				</view>
			</view>
			<view class="con" v-show="list.description">
				<image src="/static/img/yinhao.png" mode=""></image>
				{{ list.description }}
			</view>
			<view class="tip">
				<text v-for="item in list.tags" :key="item">#{{ item }}#</text>
			</view>
		</view>
		<view class="guideDetail_info">
			<view class="guideDetail_info_con">
				<view class="guideDetail_info_con_l">
					<image class="img" v-if="list.distributor.avatar" :src="list.distributor.avatar" mode=""></image>
					<image class="img" v-if="!list.distributor.avatar" src="../../../static/img/header_img.png" mode=""></image>
					<view class="first">
						<text class="name">{{ list.distributor.truename || list.distributor.nickname }}</text>
						<view class="title">
							<image src="/static/img/clockinSuccess_icon.png" mode=""></image>
							<text>{{ list.distributor.role_zh }}</text>
						</view>
					</view>
				</view>
				<view class="button" @click="toUpload(list.distributor.id)">进入工作室</view>
			</view>
		</view>
		<view class="house_type">
			<view class="type_title">
				<text class="dot"></text>
				<text>联系电话</text>
			</view>
			<view class="house_policy">{{ list.telephones }}</view>
			<view class="type_title">
				<text class="dot"></text>
				<text>营业时间</text>
			</view>
			<view class="house_policy">{{ list.opening_hours }}</view>
			<view class="type_title">
				<text class="dot"></text>
				<text>推荐菜系</text>
			</view>
			<view class="house_policy">{{ list.recommended }}</view>
		</view>
		<view class="tobuy" @click="tobuy()">立即购买</view>
	</view>
</template>

<script>
import { sourcesDetail, distributionDetail, bindfans } from '@/http/api.js';
export default {
	components: {},
	data() {
		return {
			list: [],
			id: '',
			isDis: 0,
			uid: '',
			user_id: '', //现在的用户id
			isbuy: 0,
			code: '',
			openid: '',
			userInfo: {}
		};
	},
	onShow() {
		wx.hideHomeButton();
		const pages = getCurrentPages();
		const currPage = pages[pages.length - 1]; // 当前页
		if (currPage.data.id != '') {
			this.id = currPage.data.id;
			this.isDis = currPage.data.isDis;
			this.getDetail(this.id);
		}
		if (uni.getStorageSync('code')) {
			this.code = uni.getStorageSync('code');
		}
		if (uni.getStorageSync('openid')) {
			this.openid = uni.getStorageSync('openid');
		}
		if (uni.getStorageSync('userInfo')) {
			this.userInfo = uni.getStorageSync('userInfo');
		}
		if (currPage.data.uid) {
			this.uid = currPage.data.uid;
			this.bindfans();
		}
	},
	onLoad(options) {
		if (options.isDis && options.isDis == 1) {
			this.isDis = 1;
		}
		this.id = options.id;
		if (options.uid) {
			this.uid = options.uid;
		}
		if (uni.getStorageSync('code')) {
			this.code = uni.getStorageSync('code');
		}
		if (uni.getStorageSync('openid')) {
			this.openid = uni.getStorageSync('openid');
		}
		if (uni.getStorageSync('userInfo')) {
			this.userInfo = uni.getStorageSync('userInfo');
		}
		if (getCurrentPages().length == 1) {
			// wx.getSetting({
			// 	success: res => {
			// 		//判断是否授权，如果授权成功
			// 		if (res.authSetting['scope.userInfo']) {
			// 			//获取用户信息
			// 			wx.getUserInfo({
			// 				success: res => {
			// 					this.userInfo = res.userInfo;
			// 					uni.setStorageSync('userInfo', res.userInfo);
			// 					this.bindfans();
			// 					this.getDetail(this.id);
			// 				}
			// 			});
			// 		} else {
			// 			uni.navigateTo({
			// 				url: `/pages/login/login?id=${options.id}&isDis=${options.isDis}&uid=${options.uid}`
			// 			});
			// 			return;
			// 		}
			// 	}
			// });
			if (!uni.getStorageSync('token')) {
				uni.navigateTo({
					url: `/pages/authorizations/authorizations?id=${options.id}&isDis=${options.isDis}&uid=${options.uid}`
				});
			}
		}
		this.getDetail(options.id);
	},
	methods: {
		bindfans() {
			bindfans(this.distributable_id, this.uid, this.code, this.openid, this.userInfo).then(res => {
				// this.list = res.data;
				console.log(res);
				if (res.code == 0) {
					// uni.showToast({
					// 	icon: 'none',
					// 	title: '绑定粉丝成功'
					// });
				}
			});
		},
		getDetail(id) {
			if (this.isDis == 1) {
				distributionDetail(id, 'repast').then(res => {
					this.list = res.data;
				});
			} else {
				sourcesDetail(id, 'repast').then(res => {
					this.list = res.data;
				});
			}
		},
		//进入工作室
		toUpload(id) {
			// if (this.isDis == 1 && this.uid) {
			// 	this.user_id = this.list.distributor.id;
			// }
			// if (this.isDis != 1 && this.uid) {
			// 	this.user_id = this.list.author.id;
			// }
			// if (!this.uid) {
			// 	this.user_id = id;
			// }
			this.user_id = id;
			uni.navigateTo({
				url: `/pages/studio/studio?id=${this.user_id}&isDis=${this.isDis}`
			});
		},
		tobuy() {
			let _this = this;
			if (!uni.getStorageSync('token')) {
				// uni.navigateTo({
				// 	url: `/pages/login/login?id=${_this.id}&isDis=${_this.isDis}`
				// });
				uni.navigateTo({
					url: `/pages/authorizations/authorizations?id=${_this.id}&isDis=${_this.isDis}&uid=${_this.uid}`
				});
			} else {
				uni.navigateTo({
					url: `/pages/confirm/order/order?id=${_this.id}&type=repast&isDis=${_this.isDis}&uid=${_this.uid}`
				});
			}
			uni.getSetting({
				success(res) {
					// if (!res.authSetting['scope.userInfo']) {
					// if (uni.getStorageSync('token')) {
					// 	uni.navigateTo({
					// 		url: `/pages/login/login?id=${_this.id}&isDis=${_this.isDis}`
					// 	});
					// } else {
					// 	uni.navigateTo({
					// 		url: `/pages/confirm/sceneConfirm/sceneConfirm?id=${_this.id}&type=repast&isDis=${_this.isDis}`
					// 	});
					// }
				}
			});
		}
	}
};
</script>

<style>
@import url('restaurantDetail.css');
</style>
