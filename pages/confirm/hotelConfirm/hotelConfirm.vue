<template>
	<view class="specialtyConfirm">
		<view class="resourceinfo">
			<view class="title">
				<image src="/static/img/resourceInfo.png" mode=""></image>
				<text>资源信息</text>
			</view>
			<view class="con">
				<view class="text">{{ list.title }}</view>
			</view>
		</view>
		<view class="hotelinfo">
			<view class="con" v-for="(item, index) in child" :key="index">
				<view class="text">{{ item.title }}</view>
				<view class="con2">{{ item.builtuparea }}&emsp;{{ item.bed_type }}&emsp;{{ item.capacity }}入住&emsp;{{ item.breakfast }}</view>
				<view class="con1">
					<view class="l">
						￥{{ item.price }} x
						<input type="number" value="" placeholder="1" :focus="true" maxlength="5" @input="inputNum($event, index)" />
						间/
						<input type="number" value="" placeholder="1" :focus="true" maxlength="5" @input="inputNum1($event, index)" />
						晚
					</view>
					<view class="r">￥{{ item.oneprice }}</view>
				</view>
			</view>
		</view>
		<view class="confirm_bottom">
			<view class="l">
				合计：
				<text>￥{{ allprice }}</text>
			</view>
			<view class="r" @click="gopay(list.id, list.type)" :class="!isclick ? 'logodisabled' : ''">提交订单</view>
		</view>
	</view>
</template>

<script>
import { sourcesDetail, distributionDetail, distributionsOrders, resourcesOrders, payWechat } from '@/http/api.js';
export default {
	components: {},
	data() {
		return {
			list: [],
			quantity1: 1,
			quantity2: 1,
			allprice: 0,
			isclick: true,
			child: [],
			type: '',
			isDis: 0,
			uid: '',
			downbtn: false
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
		this.type = options.type;
		this.getDetail(options.id, options.type);
		let arr = JSON.parse(options.child);
		for (let i = 0; i < arr.length; i++) {
			let arr1 = JSON.parse(arr[i]);
			this.child.push(arr1);
		}
		for (let i = 0; i < this.child.length; i++) {
			this.child[i].oneprice = this.child[i].price;
			this.child[i].quantity1 = 1;
			this.child[i].quantity2 = 1;
			this.allprice = this.allprice + this.child[i].oneprice;
		}
	},
	methods: {
		getDetail(id, type) {
			console.log(this.isDis);
			if (this.isDis == 1) {
				distributionDetail(id, type).then(res => {
					this.list = res.data;
				});
			} else {
				sourcesDetail(id, type).then(res => {
					this.list = res.data;
				});
			}
		},
		gopay(id, type) {
			if (this.downbtn) {
				return;
			}
			if (this.isDis == 1) {
				this.isclick = false;
				distributionsOrders(id, '', '', type, this.child, '', '', '', this.uid).then(res => {
					this.downbtn = false;
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
				resourcesOrders(id, '', '', type, this.child, '', '', '', this.uid).then(res => {
					this.downbtn = false;
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
					uni.showToast({
						icon: 'none',
						title: '支付失败'
					});
					console.log('fail:' + JSON.stringify(err));
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/my/myIndex/myIndex'
						});
					}, 1000);
				}
			});
		},
		inputNum(e, index) {
			this.allprice = 0;
			if (e.detail.value) {
				// this.allprice = e.detail.value*this.list.price;
				this.child[index].quantity1 = Number(e.detail.value);
				this.child[index].oneprice = this.child[index].price * this.child[index].quantity1 * this.child[index].quantity2;
				console.log(this.child[index].oneprice);
				console.log(this.allprice);
				for (let i = 0; i < this.child.length; i++) {
					this.allprice = this.allprice + this.child[i].oneprice;
				}
			} else {
				// this.allprice = this.list.price;
				this.child[index].quantity1 = 1;
				this.child[index].oneprice = this.child[index].price * this.child[index].quantity1 * this.child[index].quantity2;
				for (let i = 0; i < this.child.length; i++) {
					this.allprice = this.allprice + this.child[i].oneprice;
				}
			}
			console.log(this.child);
		},
		inputNum1(e, index) {
			this.allprice = 0;
			if (e.detail.value) {
				// this.allprice = e.detail.value*this.list.price;
				this.child[index].quantity2 = Number(e.detail.value);
				this.child[index].oneprice = this.child[index].price * this.child[index].quantity1 * this.child[index].quantity2;
				console.log(this.allprice);
				for (let i = 0; i < this.child.length; i++) {
					this.allprice = this.allprice + this.child[i].oneprice;
				}
			} else {
				// this.allprice = this.list.price;
				this.child[index].quantity2 = 1;
				this.child[index].oneprice = this.child[index].price * this.child[index].quantity1 * this.child[index].quantity2;
				for (let i = 0; i < this.child.length; i++) {
					this.allprice = this.allprice + this.child[i].oneprice;
				}
			}
			console.log(this.child);
		}
	}
};
</script>

<style>
@import url('hotelConfirm.css');
</style>
