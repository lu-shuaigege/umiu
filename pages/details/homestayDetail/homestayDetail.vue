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
import { sourcesDetail, distributionDetail } from '@/http/api.js';
export default {
	components: {},
	data() {
		return {
			list: [],
			id: '',
			child: [],
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
		this.id = options.id;
		if (options.isDis && options.isDis == 1) {
			this.isDis = 1;
		}
		this.getDetail(options.id);
	},
	methods: {
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
					url: `/pages/confirm/hotelConfirm/hotelConfirm?id=${_this.id}&type=homestay&child=${_this.child}&isDis=${_this.isDis}`
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
