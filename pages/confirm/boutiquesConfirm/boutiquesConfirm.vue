<template>
	<view class="specialtyConfirm">
		<view class="resourceinfo">
			<view class="title">
				<image src="/static/img/resourceInfo.png" mode=""></image>
				<text>资源信息</text>
			</view>
			<view class="con">
				<view class="title1">{{ list.title }}</view>
				<view class="text">出发时间：{{ team.travel_date }} {{ team.week_zh }}</view>
				<view class="con1">
					<view class="l">
						￥{{ team.price }} x
						<input type="number" value="" placeholder="1" :focus="is" maxlength="5" @input="inputNum" />
					</view>
					<view class="r">￥{{ allprice }}</view>
				</view>
			</view>
		</view>

		<view class="confirm_bottom">
			<view class="l">
				合计：
				<text>￥{{ allprice }}</text>
			</view>
			<view class="r" @click="gopay(list.id)" :class="!isclick ? 'logodisabled' : ''">提交订单</view>
		</view>
	</view>
</template>

<script>
import { boutiquesDetail, boutiquesOrders, distributionDetail, distributionsOrders, payWechat } from '@/http/api.js';
export default {
	components: {},
	data() {
		return {
			list: [],
			quantity: '1',
			allprice: '',
			isclick: true,
			team: '',
			isDis: 0,
			uid: ''
		};
	},
	onShow() {
		wx.hideHomeButton();
	},
	onLoad(options) {
		if (options.isDis && options.isDis == 1) {
			this.isDis = 1;
		}
		if (options.uid) {
			this.uid = options.uid;
		}
		let pages = getCurrentPages();
		let prevPage = pages[pages.length - 2]; //上一个页面
		//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
		prevPage.setData({
			// isDis: this.isDis,
			isbuy: 1
		});
		this.getDetail(options.id);
		this.team = JSON.parse(options.team);
		this.allprice = this.team.price;
	},
	methods: {
		getDetail(id) {
			if (this.isDis == 1) {
				distributionDetail(id, 'boutique').then(res => {
					this.list = res.data;
				});
			} else {
				boutiquesDetail(id).then(res => {
					this.list = res.data;
				});
			}
		},
		gopay(id) {
			if (this.isDis == 1) {
				this.isclick = false;
				distributionsOrders(id, this.team.id, this.quantity, 'boutique', '', '', '', '', this.uid).then(res => {
					if (res.code !== 0) {
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
						if (res.msg == '请登录！') {
							uni.navigateTo({
								url: '/pages/login/login'
							});
						}
						this.isclick = true;
						return;
					}
					// uni.redirectTo({
					// 	url: '/pages/payGoapp/payGoapp'
					// });
					this.amount = res.data.amount;
					payWechat(res.data.id, uni.getStorageSync('openid')).then(res1 => {
						this.isclick = true;
						if (res1.code == 0) {
							this.pay(res1.data);
						}
					});
				});
			} else {
				this.isclick = false;
				boutiquesOrders(id, this.team.id, this.quantity, this.uid).then(res => {
					if (res.code !== 0) {
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
						if (res.msg == '请登录！') {
							uni.navigateTo({
								url: '/pages/login/login'
							});
						}
						this.isclick = true;
						return;
					}
					this.amount = res.data.amount;
					payWechat(res.data.id, uni.getStorageSync('openid')).then(res1 => {
						this.isclick = true;
						if (res1.code == 0) {
							this.pay(res1.data);
						}
					});
				});
			}
		},
		pay(data) {
			let that = this;
			uni.requestPayment({
				appId: data.appId,
				nonceStr: data.nonceStr,
				package: data.package,
				signType: data.signType,
				timeStamp: data.timeStamp,
				paySign: data.paySign,
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
					uni.redirectTo({
						url: '/pages/paySuccess/paySuccess?amount=' + that.amount
					});
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		},
		inputNum(e) {
			if (e.detail.value) {
				this.allprice = e.detail.value * this.team.price;
				this.quantity = e.detail.value;
			} else {
				this.allprice = this.team.price;
				this.quantity = 1;
			}
		}
	}
};
</script>

<style>
@import url('boutiquesConfirm.css');
</style>
