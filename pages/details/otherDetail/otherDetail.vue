<template>
	<view class="otherDetail">
		<navigator url="../../my/myIndex/myIndex" class="gotomyCenterbtn"></navigator>
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
						售卖价:
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
		<view class="house_type" v-if="list.exts.length > 0">
			<view v-for="item in list.exts" :key="item">
				<view class="type_title">
					<text class="dot"></text>
					<text>{{ item.field }}</text>
				</view>
				<view class="house_policy">{{ item.value }}</view>
			</view>
		</view>
		<view class="otherDetailHtml" v-if="list.body" v-html="body"></view>
		<!-- <view class="otherDetailHtml"><u-parse :content="body" /></view> -->
		<view class="tobuy">
			<view class="tobuyleft" v-show="isShare != 1" @click="tobuy()">立即购买</view>
			<button class="tobuyright" v-show="isShare != 1" open-type="share">我要分销</button>
			<view class="nowbuy" v-show="isShare == 1" @click="tobuy()">立即购买</view>
		</view>
	</view>
</template>

<script>
import { userInfo, sourcesDetail, distributionDetail, bindfans } from '@/http/api.js';
import uParse from '@/plugins/gaoyia-parse/parse.vue';
export default {
	components: {
		uParse
	},
	data() {
		return {
			list: [],
			body: '',
			id: '',
			isShare: 0, // 1:普通分享   2:普通分销   3:我要分销
			useisShare: 0, // 1:普通分享   2:普通分销   3:我要分销
			isDis: 0,
			uid: '', //分享过来的用户id
			user_id: '', //现在的用户id
			myid: '', //自己的id
			usemyid: '', //要使用的自己id
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
		console.log(currPage.data);
		if (currPage.data.id != '') {
			this.id = currPage.data.id;
			this.isDis = currPage.data.isDis;
			console.log(this.id);
			this.getDetail(this.id);
		}
		if (currPage.data.uid) {
			this.uid = currPage.data.uid;
			this.bindfans();
		}
		if (currPage.data.isShare) {
			this.isShare = currPage.data.isShare;
			console.log(this.isShare);
		}
		if (currPage.data.useisShare) {
			this.useisShare = currPage.data.useisShare;
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
		if (uni.getStorageSync('token')) {
			this.userInfofn();
		}
	},
	onLoad(options) {
		console.log('options', options);
		if (options.isDis && options.isDis == 1) {
			this.isDis = 1;
		}
		this.id = options.id;
		console.log(options.id);
		if (options.uid) {
			this.uid = options.uid;
		}
		if (options.isShare) {
			this.isShare = options.isShare;
			this.useisShare = options.isShare;
			console.log('isShare', this.isShare);
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
			if (!uni.getStorageSync('token') && !uni.getStorageSync('userInfo')) {
				uni.navigateTo({
					url: `/pages/authorizations/authorizations?id=${options.id}&isDis=${options.isDis}&uid=${options.uid}&isShare=${
						options.isShare
					}&needUserInfo=${1}&needToken=${1}`
				});
				return;
			}
			if (!uni.getStorageSync('userInfo')) {
				uni.navigateTo({
					url: `/pages/authorizations/authorizations?id=${options.id}&isDis=${options.isDis}&uid=${options.uid}&isShare=${
						options.isShare
					}&needUserInfo=${1}&needToken=${0}`
				});
				return;
			}
			if (!uni.getStorageSync('token')) {
				uni.navigateTo({
					url: `/pages/authorizations/authorizations?id=${options.id}&isDis=${options.isDis}&uid=${options.uid}&isShare=${
						options.isShare
					}&needUserInfo=${0}&needToken=${1}`
				});
				return;
			} else {
				this.bindfans();
			}
		}
		this.getDetail(options.id);
	},
	methods: {
		//获取个人信息
		userInfofn() {
			userInfo().then(res => {
				console.log(res.data);
				this.myid = res.data.id;
				this.usemyid = res.data.id;
			});
		},
		bindfans() {
			bindfans(this.id, this.uid, this.code, this.openid, this.userInfo).then(res => {
				// this.list = res.data;
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
				distributionDetail(id, 'specialty').then(res => {
					this.list = res.data;
					this.body = this.list.body.replace(/\<img/gi, '<img class="rich-img"');
				});
			} else {
				sourcesDetail(id, 'specialty').then(res => {
					this.list = res.data;
					this.body = this.list.body.replace(/\<img/gi, '<img class="rich-img"');
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
				// uni.navigateTo({
				// 	url: `/pages/authorizations/authorizations?id=${_this.id}&isDis=${_this.isDis}&uid=${_this.uid}`
				// });

				uni.navigateTo({
					url: `/pages/authorizations/authorizations?id=${_this.id}&isDis=${_this.isDis}&uid=${_this.uid}&isShare=${_this.isShare}&needUserInfo=${0}&needToken=${1}`
				});
			} else {
				console.log(this.uid);
				uni.navigateTo({
					url: `/pages/confirm/order/order?id=${_this.id}&type=specialty&isDis=${_this.isDis}&uid=${_this.uid}&isShare=${_this.isShare}`
				});
			}
		}
	},
	// 转发
	onShareAppMessage(res) {
		console.log(res);
		if (res.from === 'button') {
			// 来自页面内转发按钮
			this.isShare = 3;
			this.uid = this.usemyid;
		}
		return {
			title: '特产详情',
			path: `/pages/details/otherDetail/otherDetail?id=${this.id}&isDis=${this.isDis}&uid=${this.uid}&isShare=${this.isShare}`,
			success: function(res) {
				console.log(res);
			},
			fail: function(res) {
				this.uid = this.myid;
				this.isShare = this.useisShare;
				// 转发失败
				console.log('用户点击了取消', res);
				console.log('uid', this.uid);
				console.log('isShare', this.isShare);
			}
		};
	}
};
</script>
<style>
@import url('otherDetail.css');
</style>
