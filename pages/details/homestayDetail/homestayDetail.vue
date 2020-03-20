<template>
	<view class="homestayDetail">
		<view class="homestayDetail_banner">
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
			<view class="con">
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
				<text>房型</text>
			</view>
			<view class="house_type_p">
				<checkbox-group class="block" @change="CheckboxChange">
					<view class="house_type_list" v-for="item in list.rooms" :key="item">
						<view class="cu-form-group"><checkbox class="round radio orange" :value="JSON.stringify(item)"></checkbox></view>
						<view class="">
							<view class="up">
								<view class="l">{{ item.title }}</view>
								<view class="r">
									门市价:
									<text>
										￥
										<text>{{ item.price }}</text>
									</text>
								</view>
							</view>
							<view class="ud">
								<view class="l">{{ item.builtuparea }}&emsp;{{ item.bed_type }}&emsp;{{ item.capacity }}入住&emsp;{{ item.breakfast }}</view>
								<view class="r"><!-- 门市价:￥{{item.price}} --></view>
							</view>
						</view>
					</view>
				</checkbox-group>
			</view>
			<view class="type_title" v-show="list.facility.length">
				<text class="dot"></text>
				<text>民宿设施</text>
			</view>
			<view class="facilities" v-show="list.facility.length">
				<view v-for="item in list.facility" :key="item">
					<text></text>
					{{ item }}
				</view>
			</view>
		</view>
		<view class="house_type">
			<view class="type_title">
				<text class="dot"></text>
				<text>入住须知</text>
			</view>
			<view class="house_policy">{{ list.check_in_instr }}</view>
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
			child: [],
			isDis: 0, //是否是分销过来的
			uid: '', //分享过来的用户id
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
		this.id = options.id;
		if (options.isDis && options.isDis == 1) {
			this.isDis = 1;
		}
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
			wx.getSetting({
				success: res => {
					//判断是否授权，如果授权成功
					if (res.authSetting['scope.userInfo']) {
						//获取用户信息
						wx.getUserInfo({
							success: res => {
								this.userInfo = res.userInfo;
								uni.setStorageSync('userInfo', res.userInfo);
								this.bindfans();
								this.getDetail(this.id);
							}
						});
					} else {
						uni.navigateTo({
							url: `/pages/login/login?id=${options.id}&isDis=${options.isDis}&uid=${options.uid}`
						});
						return;
					}
				}
			});
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
				distributionDetail(id, 'homestay').then(res => {
					this.list = res.data;
				});
			} else {
				sourcesDetail(id, 'homestay').then(res => {
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
			if (!_this.child.length) {
				uni.showToast({
					icon: 'none',
					title: '请选择套餐'
				});
				return;
			}
			if (!uni.getStorageSync('token')) {
				uni.navigateTo({
					url: `/pages/login/login?id=${_this.id}&isDis=${_this.isDis}`
				});
			} else {
				_this.child = _this.child.replace(/\&nbsp;/g, '');
				uni.navigateTo({
					url: `/pages/confirm/hotelConfirm/hotelConfirm?id=${_this.id}&type=homestay&child=${_this.child}&isDis=${_this.isDis}&uid=${_this.uid}`
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
					// 	_this.child = _this.child.replace(/\&nbsp;/g, '');
					// 	uni.navigateTo({
					// 		url: `/pages/confirm/hotelConfirm/hotelConfirm?id=${_this.id}&type=homestay&child=${_this.child}&isDis=${_this.isDis}`
					// 	});
					// }
				}
			});
		},
		CheckboxChange(e) {
			this.child = JSON.stringify(e.detail.value);
		}
	}
};
</script>

<style>
@import url('homestayDetail.css');
</style>
