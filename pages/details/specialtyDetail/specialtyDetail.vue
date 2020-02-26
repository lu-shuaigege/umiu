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
				</view>
				<view class="second">
					<view class="l">{{ list.address }}</view>
				</view>
				<view class="third">
					<view class="l">{{ list.exts[0].field }}/{{ list.exts[0].value }}</view>
					<view class="r">
						售卖价:
						<text>
							￥
							<text>{{ list.price }}</text>
						</text>
					</view>
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
		<view class="specialtycontext"><u-parse :content="list.body" /></view>
		<view class="tobuy" @click="tobuy()">立即购买</view>
	</view>
</template>

<script>
import { sourcesDetail, distributionDetail } from '@/http/api.js';
import uParse from '@/plugins/gaoyia-parse/parse.vue';
export default {
	components: {
		uParse
	},
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
				distributionDetail(id, 'specialty').then(res => {
					this.list = res.data;
				});
			} else {
				sourcesDetail(id, 'specialty').then(res => {
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
					url: `/pages/confirm/specialtyConfirm/specialtyConfirm?id=${_this.id}&type=specialty&isDis=${_this.isDis}`
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
					// 		url: `/pages/confirm/specialtyConfirm/specialtyConfirm?id=${_this.id}&type=specialty&isDis=${_this.isDis}`
					// 	});
					// }
				}
			});
		}
	}
};
</script>

<style>
@import url('specialtyDetail.css');
</style>
