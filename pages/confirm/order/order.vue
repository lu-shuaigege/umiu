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
				<view class="order_right_specifications" v-if="list.type == 'hotel' || list.type == 'homestay'">{{ list.address }}</view>
				<view class="order_right_specifications_sight" v-if="type == 'sight' || type == 'repast' || type == 'specialty'">{{ list.address }}</view>
				<view class="order_right_money">
					<view class="order_right_money_icon" v-if="list.type != 'hotel' && list.type != 'homestay'">￥</view>
					<view class="order_right_money_num" v-if="list.type != 'hotel' && list.type != 'homestay'">{{ list.price }}</view>
					<!-- <view class="order_right_money_right" v-if="list.type_zh == '酒店' || list.type_zh == '民宿'">/间/晚</view> -->
					<view class="order_right_money_right" v-if="list.type_zh == 'specialty'">/个</view>
					<view class="order_right_money_right" v-if="list.type_zh == 'sight'">/张</view>
					<view class="order_right_money_right" v-if="list.type_zh == 'repast'">/人</view>
				</view>
			</view>
		</view>
		<!-- 酒店信息 -->
		<view class="hotelitem" v-if="list.type == 'hotel' || list.type == 'homestay'">
			<view class="hotelitem_top">
				<view class="hotelitem_top_left" v-if="list.type == 'hotel'">酒店信息</view>
				<view class="hotelitem_top_left" v-if="list.type == 'homestay'">民宿信息</view>
				<view class="hotelitem_top_right" @click="look(true)">
					<image src="@/static/img/tips.png" class="hotelitem_top_right_img" mode=""></image>
					<view class="hotelitem_top_right_text">每晚明细</view>
				</view>
			</view>
			<view class="hotelitem_list">
				<view class="hotelitem_list_left">房型</view>
				<view class="hotelitem_list_right">{{ list.room.title }}</view>
			</view>
			<view class="hotelitem_list">
				<view class="hotelitem_list_left">入住日期</view>
				<view class="hotelitem_list_right">{{ start_date.slice(5, 7) }}月{{ start_date.slice(8, 10) }}日</view>
			</view>
			<view class="hotelitem_list">
				<view class="hotelitem_list_left">离店日期</view>
				<view class="hotelitem_list_right">{{ end_date.slice(5, 7) }}月{{ end_date.slice(8, 10) }}日</view>
			</view>
		</view>
		<!-- 入住人信息 -->
		<view class="checkDetail" v-if="list.type == 'hotel' || list.type == 'homestay'">
			<view class="checkDetail_top">入住人信息</view>
			<view class="checkDetail_list" v-for="(item, index) in nameslist" :key="index">
				<view class="checkDetail_list_left">房间{{ index + 1 }}</view>
				<!-- <view class="checkDetail_list_right">{{ item.name }}</view> -->
				<input type="text" value="" class="checkDetail_list_right" v-model="item.name" placeholder="请填写入住人姓名" />
			</view>
			<view class="checkDetail_list">
				<view class="checkDetail_list_left">手机号</view>
				<!-- <view class="checkDetail_list_right">18756895484</view> -->
				<input type="tel" value="" class="checkDetail_list_right" v-model="contact_phone" maxlength="11" placeholder="请填写联系人手机号" />
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
		<!-- 酒店订单明细 -->
		<view class="detailed" v-if="islook">
			<view class="detailed_con">
				<view class="detailed_con_top">
					<view class="detailed_con_top_title">每晚明细</view>
					<view class="detailed_con_top_item" v-for="(item, index) in daysArr" :key="index">
						<view class="detailed_con_top_item_left">{{ item.checkin_date.slice(5, 7) }}月{{ item.checkin_date.slice(8, 10) }}日</view>
						<view class="detailed_con_top_item_right">{{ quantity }}间*￥{{ item.price }}</view>
					</view>
					<view class="detailed_con_top_bottom">
						<view class="detailed_con_top_bottom_con">
							<view class="detailed_con_top_bottom_con_left">{{ daysArr.length }}晚，{{ quantity }}间共</view>
							<view class="detailed_con_top_bottom_con_right">￥{{ totalPrices }}</view>
						</view>
					</view>
				</view>
				<image src="@/static/img/circleFork.png" @click="look(false)" class="detailed_con_close" mode=""></image>
			</view>
		</view>
		<!-- 页面下方金额及按钮 -->
		<view class="orderBottom">
			<view class="orderBottom_left">
				<view class="orderBottom_left_con">
					<view class="orderBottom_left_con_left">合计：</view>
					<view class="orderBottom_left_con_right" v-if="list.type == 'hotel' || list.type == 'homestay'">￥{{ totalPrices }}</view>
					<view class="orderBottom_left_con_right" v-if="list.type != 'hotel' && list.type != 'homestay'">￥{{ totalPrice }}</view>
				</view>
			</view>
			<view class="orderBottom_right" @click="gopay(list.id, list.type)">提交订单</view>
		</view>
	</view>
</template>

<script>
import { sourcesDetail, distributionDetail, distributionsOrders, resourcesOrders, payWechat, resourcesHotel } from '@/http/api.js';
export default {
	data() {
		return {
			islook: false, //查看明细
			amount: '', //传到支付成功页面的总价
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
			quantity: 1,
			totle: 0,
			contact: '',
			contact_phone: '',
			contact_address: '',
			detailed: [
				{
					date: '03月01日'
				},
				{
					date: '03月01日'
				}
			],
			start_date: '', //开始时间
			end_date: '', //结束时间
			daysArr: [],
			// quantity: 0, //房间数量
			number_of_adults: 0, //成人数量
			number_of_children: 0, //儿童数量
			nameslist: [] //酒店入住人名字
		};
	},
	onShow() {
		wx.hideHomeButton();
		const pages = getCurrentPages();
		const currPage = pages[pages.length - 1]; // 当前页
		if (currPage.data.id != '') {
			let datas = JSON.parse(options.datas);
			for (let i = 0; i < datas.quantity; i++) {
				this.nameslist.push({ name: '' });
			}
			// this.datalist = options.datas;
			console.log(datas);
			this.start_date = datas.start_date;
			this.end_date = datas.end_date;
			this.daysArr = datas.daysArr;
			this.quantity = datas.quantity;
			this.number_of_adults = datas.number_of_adults;
			this.number_of_children = datas.number_of_children;
			this.getDetail(this.id);
		}
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
		if (options.datas) {
			let datas = JSON.parse(options.datas);
			for (let i = 0; i < datas.quantity; i++) {
				this.nameslist.push({ name: '' });
			}
			// this.datalist = options.datas;
			console.log(datas);
			this.start_date = datas.start_date;
			this.end_date = datas.end_date;
			this.daysArr = datas.daysArr;
			this.quantity = datas.quantity;
			this.number_of_adults = datas.number_of_adults;
			this.number_of_children = datas.number_of_children;
		}
		this.getDetail(options.id, options.type);
	},
	computed: {
		// 计算属性的 getter
		totalPrices: function() {
			let allPrice = 0;
			//总价格
			for (let i = 0; i < this.daysArr.length; i++) {
				allPrice += parseInt(this.daysArr[i].price * this.quantity) || 0;
			}
			return allPrice;
		},
		// 计算属性的 getter
		totalPrice() {
			return this.list.price * this.quantity;
			// return allPrice;
		}
	},
	methods: {
		//查看明细
		look(islook) {
			this.islook = islook;
		},
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
			if (this.list.type == 'hotel' || this.list.type == 'homestay') {
				for (let i = 0; i < this.nameslist.length; i++) {
					if (this.nameslist[i].name == '') {
						uni.showToast({
							icon: 'none',
							title: '请输入入住人名字'
						});
						return;
					}
				}
			}
			if (this.contact_phone && (this.type == 'specialty' || this.list.type == 'hotel' || this.list.type == 'homestay')) {
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
			let check_in_names = [];
			for (let i = 0; i < this.nameslist.length; i++) {
				check_in_names.push(this.nameslist[i].name);
			}
			// if (this.type == 'hotel') {
			// 	resourcesHotel({
			// 		id: id,
			// 		start_date: this.start_date,
			// 		end_date: this.end_date,
			// 		quantity: this.quantity,
			// 		number_of_adults: this.number_of_adults,
			// 		number_of_children: this.number_of_children,
			// 		check_in_names: check_in_names,
			// 		type: type,
			// 		contact_phone: this.contact_phone,
			// 		sharer_id: this.uid
			// 	}).then(res => {
			// 		this.downbtn = false;
			// 		if (res.code !== 0) {
			// 			uni.showToast({
			// 				icon: 'none',
			// 				title: res.msg
			// 			});
			// 			if (res.msg == '请登录！') {
			// 				uni.navigateTo({
			// 					url: '/pages/login/login'
			// 				});
			// 			}
			// 			return;
			// 		}
			// 		// uni.redirectTo({
			// 		// 	url: '/pages/payGoapp/payGoapp'
			// 		// });
			// 		this.amount = res.data.amount;
			// 		payWechat(res.data.id, uni.getStorageSync('openid')).then(res1 => {
			// 			if (res1.code == 0) {
			// 				this.pay(res1.data);
			// 			}
			// 		});
			// 	});
			// } else {
			if (this.isDis == 1) {
				this.downbtn = true;
				distributionsOrders({
					id: id,
					start_date: this.start_date,
					end_date: this.end_date,
					quantity: this.quantity,
					number_of_adults: this.number_of_adults,
					number_of_children: this.number_of_children,
					check_in_names: check_in_names,
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
							let data = {
								nameslist: this.nameslist,
								start_date: this.start_date,
								end_date: this.end_date,
								daysArr: this.daysArr,
								quantity: this.quantity,
								number_of_adults: this.number_of_adults,
								number_of_children: this.number_of_children
							};
							let datas = JSON.stringify(data);
							uni.navigateTo({
								url: `/pages/authorizations/authorizations?id=${this.id}&isDis=${this.isDis}&uid=${this.uid}&datas=${datas}&needUserInfo=${0}&needToken=${1}`
							});
						}
						if (res.code == '3002') {
							uni.setStorageSync('token', '');
							let data = {
								nameslist: this.nameslist,
								start_date: this.start_date,
								end_date: this.end_date,
								daysArr: this.daysArr,
								quantity: this.quantity,
								number_of_adults: this.number_of_adults,
								number_of_children: this.number_of_children
							};
							let datas = JSON.stringify(data);
							uni.navigateTo({
								url: `/pages/authorizations/authorizations?id=${this.id}&isDis=${this.isDis}&uid=${this.uid}&datas=${datas}&needUserInfo=${0}&needToken=${1}`
							});
						}
						return;
					}
					// uni.redirectTo({
					// 	url: '/pages/payGoapp/payGoapp'
					// });
					this.amount = res.data.amount;
					payWechat(res.data.id, uni.getStorageSync('openid')).then(res1 => {
						if (res1.code == 0) {
							this.pay(res1.data);
						}
					});
				});
			} else {
				this.downbtn = true;
				resourcesOrders({ id: id, quantity: this.quantity, type: type, sharer_id: this.uid }).then(res => {
					this.downbtn = false;
					if (res.code !== 0) {
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
						if (res.msg == '请登录！') {
							let data = {
								nameslist: this.nameslist,
								start_date: this.start_date,
								end_date: this.end_date,
								daysArr: this.daysArr,
								quantity: this.quantity,
								number_of_adults: this.number_of_adults,
								number_of_children: this.number_of_children
							};
							let datas = JSON.stringify(data);
							uni.navigateTo({
								url: `/pages/authorizations/authorizations?id=${this.id}&isDis=${this.isDis}&uid=${this.uid}&datas=${datas}&needUserInfo=${0}&needToken=${1}`
							});
						}
						if (res.msg == '请登录！') {
							uni.setStorageSync('token', '');
							let data = {
								nameslist: this.nameslist,
								start_date: this.start_date,
								end_date: this.end_date,
								daysArr: this.daysArr,
								quantity: this.quantity,
								number_of_adults: this.number_of_adults,
								number_of_children: this.number_of_children
							};
							let datas = JSON.stringify(data);
							uni.navigateTo({
								url: `/pages/authorizations/authorizations?id=${this.id}&isDis=${this.isDis}&uid=${this.uid}&datas=${datas}&needUserInfo=${0}&needToken=${1}`
							});
						}
						return;
					}
					this.amount = res.data.amount;
					payWechat(res.data.id, uni.getStorageSync('openid')).then(res1 => {
						if (res1.code == 0) {
							this.pay(res1.data);
						}
					});
				});
			}
			// }
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
						url: `/pages/paySuccess/paySuccess?amount=${that.amount}&type=${that.type}`
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
