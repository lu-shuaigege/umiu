<template>
	<view class="scenicSpotDetail">
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
			<view class="con">
				<image src="/static/img/yinhao.png" mode=""></image>
				{{ list.description }}
			</view>
			<view class="tip">
				<text v-for="item in list.tags" :key="item">#{{ item }}#</text>
			</view>
		</view>
		<view class="house_type">
			<view class="type_title">
				<text class="dot"></text>
				<text>开放时间</text>
			</view>
			<view class="house_policy">{{ list.opening_hours }}</view>
			<view class="type_title">
				<text class="dot"></text>
				<text>交通指南</text>
			</view>
			<view class="house_policy">{{ list.traffic_info }}</view>
		</view>
		<view class="house_type">
			<view class="type_title">
				<text class="dot"></text>
				<text>预定须知</text>
			</view>
			<view class="house_policy">{{ list.booking_instr }}</view>
		</view>
		<view class="tobuy" @click="tobuy()">立即购买</view>
	</view>
</template>

<script>
import { sourcesDetail, distributionDetail } from '@/http/api.js';
export default {
	components: {},
	data() {
		return {
			list: [],
			id: '',
			isDis: 0
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
	},
	onLoad(options) {
		if (options.isDis && options.isDis == 1) {
			this.isDis = 1;
		}
		this.id = options.id;
		this.getDetail(options.id);
	},
	methods: {
		getDetail(id) {
			if (this.isDis == 1) {
				distributionDetail(id, 'sight').then(res => {
					this.list = res.data;
				});
			} else {
				sourcesDetail(id, 'sight').then(res => {
					this.list = res.data;
				});
			}
		},
		tobuy() {
			let _this = this;
			if (!uni.getStorageSync('token')) {
				uni.navigateTo({
					url: `/pages/login/login?id=${_this.id}&isDis=${_this.isDis}`
				});
			} else {
				uni.navigateTo({
					url: `/pages/confirm/sceneConfirm/sceneConfirm?id=${_this.id}&type=sight&isDis=${_this.isDis}`
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
					// 		url: `/pages/confirm/sceneConfirm/sceneConfirm?id=${_this.id}&type=sight&isDis=${_this.isDis}`
					// 	});
					// }
				}
			});
		}
	}
};
</script>

<style>
@import url('scenicSpotDetail.css');
</style>
