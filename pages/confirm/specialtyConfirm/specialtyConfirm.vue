<template>
	<view class="specialtyConfirm">
		<view class="resourceinfo">
			<view class="title">
				<image src="/static/img/resourceInfo.png" mode=""></image>
				<text>资源信息</text>
			</view>
			<view class="con">
				<view class="text">{{ list.title }}</view>
				<view class="con1">
					<view class="l">
						￥{{ list.price }} x
						<input type="number" value="" placeholder="1" :focus="is" maxlength="5" @input="inputNum" />
						个
					</view>
					<view class="r">￥{{ allprice }}</view>
				</view>
			</view>
		</view>
		<view class="contactinfo">
			<view class="title">
				<image src="/static/img/contactinfo.png" mode=""></image>
				<text>联系人信息</text>
			</view>
			<view class="contactinfo_info">
				<text>姓名</text>
				<input type="text" value="" placeholder="请填写联系人姓名" placeholder-class="placeho" @input="inputName" />
			</view>
			<view class="contactinfo_info">
				<text>手机号</text>
				<input type="tel" value="" placeholder="请填写联系人手机号" placeholder-class="placeho" maxlength="11" @input="inputTel" />
			</view>
			<view class="contactinfo_info">
				<text>收货地址</text>
				<input type="text" value="" placeholder="请填写商品产地" placeholder-class="placeho" @input="inputAdress" />
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
			quantity: '1',
			contact: '',
			contact_phone: '',
			contact_address: '',
			allprice: '',
			isclick: true,
			type: '',
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
		this.type = options.type;
		this.getDetail(options.id, options.type);
	},
	methods: {
		getDetail(id, type) {
			if (this.isDis == 1) {
				distributionDetail(id, type).then(res => {
					this.list = res.data;
					this.allprice = this.list.price;
				});
			} else {
				sourcesDetail(id, type).then(res => {
					this.list = res.data;
					this.allprice = this.list.price;
				});
			}
		},
		gopay(id, type) {
			if (!this.contact) {
				uni.showToast({
					icon: 'none',
					title: '请输入姓名'
				});
				return;
			}
			// if(!this.contact_phone){
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: "请输入手机号"
			// 	});
			// 	return
			// }
			if (this.contact_phone) {
				if (!/^1[3456789]\d{9}$/.test(this.contact_phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					});
					return;
				}
			}
			if (!this.contact_address) {
				uni.showToast({
					icon: 'none',
					title: '请输入联系地址'
				});
				return;
			}
			if (this.isDis == 1) {
				this.isclick = false;
				distributionsOrders(id, '', this.quantity, type, '', this.contact, this.contact_phone, this.contact_address,this.uid).then(res => {
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
				resourcesOrders(id, '', this.quantity, type, '', this.contact, this.contact_phone, this.contact_address,this.uid).then(res => {
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
					console.log('fail:' + JSON.stringify(err));
				}
			});
		},
		inputNum(e) {
			if (e.detail.value) {
				this.allprice = e.detail.value * this.list.price;
				this.quantity = e.detail.value;
			} else {
				this.allprice = this.list.price;
				this.quantity = 1;
			}
		},
		inputName(e) {
			this.contact = e.detail.value;
		},
		inputTel(e) {
			this.contact_phone = e.detail.value;
		},
		inputAdress(e) {
			this.contact_address = e.detail.value;
		}
	}
};
</script>

<style>
@import url('specialtyConfirm.css');
</style>
