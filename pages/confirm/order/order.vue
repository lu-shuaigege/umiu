<template>
	<view class="order">
		<!-- 头部产品信息 -->
		<view class="ordertop">
			<image :src="list.cover_image" mode="" class="ordertop_left"></image>
			<view class="order_right">
				<view class="order_right_name">{{ list.title }}</view>
				<view class="order_right_specifications" v-if="type == 'specialty' && list.exts.length > 0">
					{{ data.product.exts[0].field || '' }}/{{ data.product.exts[0].value || '' }}
				</view>
				<view class="order_right_specifications" v-if="list.type_zh == '酒店' || list.type_zh == '民宿'">{{ list.address }}</view>
				<view class="order_right_specifications_sight" v-if="type == 'sight' || type == 'repast'">{{ list.address }}</view>
				<view class="order_right_money">
					<view class="order_right_money_icon">￥</view>
					<view class="order_right_money_num">{{ list.price }}</view>
					<view class="order_right_money_right">/个</view>
				</view>
			</view>
		</view>
		<!-- 酒店信息 -->
		<view class="hotelitem" v-if="list.type_zh == '酒店' || list.type_zh == '民宿'">
			<view class="hotelitem_top">
				<view class="hotelitem_top_left" v-if="list.type_zh == '酒店'">酒店信息</view>
				<view class="hotelitem_top_left" v-if="list.type_zh == '民宿'">民宿信息</view>
				<view class="hotelitem_top_right">
					<image src="../../../../../static/img/add_icon.png" class="hotelitem_top_right_img" mode=""></image>
					<view class="hotelitem_top_right_text">每晚明细</view>
				</view>
			</view>
			<view class="hotelitem_list">
				<view class="hotelitem_list_left">房型</view>
				<view class="hotelitem_list_right">{{ list.product.child[0].title }}</view>
			</view>
			<view class="hotelitem_list">
				<view class="hotelitem_list_left">入住日期</view>
				<view class="hotelitem_list_right">02月29日</view>
			</view>
			<view class="hotelitem_list">
				<view class="hotelitem_list_left">离店日期</view>
				<view class="hotelitem_list_right">03月01日</view>
			</view>
		</view>
		<!-- 入住人信息 -->
		<view class="checkDetail" v-if="list.type_zh == '酒店' || list.type_zh == '民宿'">
			<view class="checkDetail_top">入住人信息</view>
			<view class="checkDetail_list" v-for="(item, index) in datalist" :key="index">
				<view class="checkDetail_list_left">房间{{ index + 1 }}</view>
				<!-- <view class="checkDetail_list_right">{{ item.name }}</view> -->
				<input type="text" value="" class="checkDetail_list_right" v-model="item.name" placeholder="请填写入住人姓名" />
			</view>
			<view class="checkDetail_list">
				<view class="checkDetail_list_left">手机号</view>
				<!-- <view class="checkDetail_list_right">18756895484</view> -->
				<input type="tel" value="" class="checkDetail_list_right" v-model="phone" maxlength="11" placeholder="请填写联系人手机号" />
			</view>
		</view>
		<!-- 特产数量 -->
		<view class="orderOther" v-if="type == 'specialty'">
			<view class="orderOther_title">特产信息</view>
			<view class="orderOther_bottom">
				<view class="orderOther_bottom_left">特产数量</view>
				<view class="orderOther_bottom_right">
					<image src="../../../static/img/reduce_icon.png" class="orderOther_bottom_right_reduce" mode="" @click="reduce()"></image>
					<view class="orderOther_bottom_right_num">{{ quantity }}</view>
					<image src="../../../static/img/add_icon.png" class="orderOther_bottom_right_add" mode="" @click="add()"></image>
				</view>
			</view>
		</view>
		<!-- 门票数量 -->
		<view class="orderOther" v-if="type == 'sight'">
			<view class="orderOther_title">景点信息</view>
			<view class="orderOther_bottom">
				<view class="orderOther_bottom_left">门票数量</view>
				<view class="orderOther_bottom_right">
					<image src="../../../static/img/reduce_icon.png" class="orderOther_bottom_right_reduce" mode="" @click="reduce()"></image>
					<view class="orderOther_bottom_right_num">{{ quantity }}</view>
					<image src="../../../static/img/add_icon.png" class="orderOther_bottom_right_add" mode="" @click="add()"></image>
				</view>
			</view>
		</view>
		<!-- 食用人数 -->
		<view class="orderOther" v-if="type == 'repast'">
			<view class="orderOther_title">餐饮信息</view>
			<view class="orderOther_bottom">
				<view class="orderOther_bottom_left">食用人数</view>
				<view class="orderOther_bottom_right">
					<image src="../../../static/img/reduce_icon.png" class="orderOther_bottom_right_reduce" mode="" @click="reduce()"></image>
					<view class="orderOther_bottom_right_num">{{ quantity }}</view>
					<image src="../../../static/img/add_icon.png" class="orderOther_bottom_right_add" mode="" @click="add()"></image>
				</view>
			</view>
		</view>
		<!-- 特产联系人信息 -->
		<view class="orderOtherInformation" v-if="type == 'specialty'">
			<view class="orderOtherInformation_title">联系人信息</view>
			<view class="orderOtherInformation_list">
				<view class="orderOtherInformation_list_left">姓名</view>
				<input type="text" value="" placeholder="请填写联系人姓名" v-model="contact" class="orderOtherInformation_list_right" />
			</view>
			<view class="orderOtherInformation_list">
				<view class="orderOtherInformation_list_left">手机号</view>
				<input type="text" value="" placeholder="请填写联系人手机号" v-model="contact_phone" maxlength="11" class="orderOtherInformation_list_right" />
			</view>
			<view class="orderOtherInformation_list">
				<view class="orderOtherInformation_list_left">地址</view>
				<input type="text" value="" placeholder="请填写联系人地址" v-model="contact_address" class="orderOtherInformation_list_right" />
			</view>
		</view>
		<!-- 页面下方金额及按钮 -->
		<view class="orderBottom">
			<view class="orderBottom_left">
				<view class="orderBottom_left_con">
					<view class="orderBottom_left_con_left">合计：</view>
					<view class="orderBottom_left_con_right">￥{{ totalPrice }}</view>
				</view>
			</view>
			<view class="orderBottom_right" @click="gopay(list.id, list.type)">提交订单</view>
		</view>
	</view>
</template>

<script>
import { sourcesDetail, distributionDetail, distributionsOrders, resourcesOrders, payWechat } from '@/http/api.js';
export default {
	data() {
		return {
			list: {},
			id: '',
			type: '',
			child: [],
			isDis: 0,
			uid: '',
			user_id: '', //现在的用户id
			isbuy: 0,
			code: '',
			openid: '',
			userInfo: {},
			downbtn: false,
			isclick: true,
			quantity: 1,
			totle: 0,
			contact: '',
			contact_phone: '',
			contact_address: '',
			phone: '',
			datalist: [
				{
					name: ''
				},
				{
					name: ''
				}
			]
		};
	},
	onShow() {
		wx.hideHomeButton();
	},
	onLoad(options) {
		if (options.isDis && options.isDis == 1) {
			this.isDis = 1;
		}
		this.id = options.id;
		this.type = options.type;
		if (options.uid) {
			this.uid = options.uid;
		}
		this.getDetail(options.id, options.type);
	},
	computed: {
		// 计算属性的 getter
		// totalPrice: function() {
		// 	let allPrice = 0;
		// 	//总价格
		// 	for (let i = 0; i < this.daysArr.length; i++) {
		// 		allPrice += parseInt(this.daysArr[i].price) || 0;
		// 	}
		// 	return allPrice;
		// }
		// 计算属性的 getter
		totalPrice() {
			return this.list.price * this.quantity;
			// return allPrice;
		}
	},
	methods: {
		getDetail(id, type) {
			if (this.isDis == 1) {
				distributionDetail(id, type).then(res => {
					console.log(res);
					this.list = res.data;
				});
			} else {
				sourcesDetail(id, type).then(res => {
					console.log(res);
					this.list = res.data;
				});
			}
		},
		reduce() {
			if (this.quantity == 1) {
				return;
			} else {
				this.quantity--;
			}
		},
		add() {
			this.quantity++;
		},
		gopay(id, type) {
			if (this.downbtn) {
				return;
			}
			if (!this.contact && this.type == 'specialty') {
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
			if (this.contact_phone && this.type == 'specialty') {
				if (!/^1[3456789]\d{9}$/.test(this.contact_phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					});
					return;
				}
			}
			if (!this.contact_address && this.type == 'specialty') {
				uni.showToast({
					icon: 'none',
					title: '请输入联系地址'
				});
				return;
			}
			if (this.isDis == 1) {
				this.isclick = false;
				distributionsOrders({
					id: id,
					quantity: this.quantity,
					type: type,
					contact: this.contact,
					contact_phone: this.contact_phone,
					contact_address: this.contact_address,
					sharer_id: this.uid
				}).then(res => {
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
				resourcesOrders({ id: id, quantity: this.quantity, type: type, sharer_id: this.uid }).then(res => {
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
						if (that.type == 'specialty') {
							uni.redirectTo({
								url: `/pages/my/myorder/specialtyOrder/orderList/orderList?active=2`
							});
						} else {
							uni.redirectTo({
								url: `/pages/my/myorder/travelOrder/orderList/orderList?active=2`
							});
						}
					}, 1000);
				}
			});
		}
		// // 跳转到选择房间数量
		// gocheck() {
		// 	uni.navigateTo({
		// 		url: `/pages/details/check/check`
		// 	});
		// }
	}
};
</script>

<style>
@import url('order.css');
</style>
