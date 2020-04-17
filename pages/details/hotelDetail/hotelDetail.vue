<template>
	<view class="hotelDetail">
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
					<view class="labela">{{ list.room.title }}</view>
					<!-- <view class="labelb">库存：20</view> -->
					<!-- <view class="l">{{ list.address }}</view> -->
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
		<!-- <view class="house_type">
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
							</view>
						</view>
					</view>
				</checkbox-group>
			</view>
			<view class="type_title" v-show="list.hotel_amenities.length">
				<text class="dot"></text>
				<text>酒店设施</text>
			</view>
			<view class="facilities" v-show="list.hotel_amenities.length">
				<view v-for="item in list.hotel_amenities" :key="item">
					<text></text>
					{{ item }}
				</view>
			</view>
		</view> -->
		<view class="house_type">
			<view class="orderDetail">
				<view class="orderDetail_left" @click="calendar(list.room.id)">
					<view class="orderDetail_left_left">{{ start_date.slice(5, 7) }}月{{ start_date.slice(8, 10) }}日</view>
					<view class="orderDetail_left_heng">——</view>
					<view class="orderDetail_left_right">{{ end_date.slice(5, 7) }}月{{ end_date.slice(8, 10) }}日</view>
					<view class="orderDetail_left_all">共{{ daysLength }}晚</view>
				</view>
				<view class="orderDetail_right" @click="gocheck()">
					<view class="orderDetail_right_left">{{ check[0].num }}间</view>
					<view class="orderDetail_right_center">{{ check[1].num }}成人</view>
					<view class="orderDetail_right_right">{{ check[2].num }}儿童</view>
				</view>
			</view>
			<view class="type_title" v-show="list.hotel_amenities.length">
				<text class="dot"></text>
				<text>房型描述</text>
			</view>
			<view class="facilitiesa" v-show="list.hotel_amenities.length">
				<view class="facilitiesa_bottom">
					<view class="facilities_bottom_left">{{ list.room.title }}</view>
					<view class="facilities_bottom_right">{{ list.room.builtuparea }} {{ list.room.bed_type }} {{ list.room.capacity }} {{ list.room.description }}</view>
				</view>
			</view>
			<view class="type_title" v-show="list.hotel_amenities.length">
				<text class="dot"></text>
				<text>酒店设施</text>
			</view>
			<view class="facilities" v-show="list.hotel_amenities.length">
				<view v-for="item in list.hotel_amenities" :key="item">
					<text></text>
					{{ item }}
				</view>
			</view>
		</view>
		<view class="house_type">
			<view class="type_title">
				<text class="dot"></text>
				<text>酒店政策</text>
			</view>
			<view class="house_policy">{{ list.hotel_policy }}</view>
		</view>
		<view class="tobuy" @click="tobuy()">立即购买</view>
	</view>
</template>

<script>
import { sourcesDetail, distributionDetail, bindfans, hotelCalendar } from '@/http/api.js';
import dayjs from '@/plugins/dayjs/index.js';
export default {
	data() {
		return {
			start_date: '0000-00-00',
			end_date: '0000-00-00',
			daysArr: [],
			daysLength: 0, //共几日
			quantity: 0, //房间数量
			number_of_adults: 0, //成人数量
			number_of_children: 0, //儿童数量
			list: [],
			id: '',
			child: [],
			isDis: 0,
			uid: '',
			user_id: '', //现在的用户id
			isbuy: 0,
			code: '',
			openid: '',
			userInfo: {},
			check: [
				{
					id: 1,
					name: '房间数',
					num: 0
				},
				{
					id: 2,
					name: '成人数',
					num: 0
				},
				{
					id: 3,
					name: '儿童数',
					num: 0
				}
			],
			isOne: false
		};
	},
	onShow() {
		wx.hideHomeButton();
		const pages = getCurrentPages();
		const currPage = pages[pages.length - 1]; // 当前页
		// 登陆
		if (currPage.data.id != '') {
			this.id = currPage.data.id;
			this.isDis = currPage.data.isDis;
			this.getDetail(this.id);
		}
		// 入住条件
		if (currPage.data.check) {
			this.check = currPage.data.check;
			console.log(this.check);
			this.quantity = currPage.data.check[0].num;
			this.number_of_adults = currPage.data.check[1].num;
			this.number_of_children = currPage.data.check[2].num;
		}
		// 入住日期
		if (currPage.data.daysArr) {
			this.start_date = currPage.data.start_date;
			this.end_date = currPage.data.end_date;
			this.daysArr = currPage.data.daysArr;
			this.daysLength = this.daysArr.length;
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
		if (options.isDis && options.isDis == 1) {
			this.isDis = 1;
		}
		this.id = options.id;
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
			// wx.getSetting({
			// 	success: res => {
			// 		//判断是否授权，如果授权成功
			// 		if (res.authSetting['scope.userInfo']) {
			// 			//获取用户信息
			// 			wx.getUserInfo({
			// 				success: res => {
			// 					this.userInfo = res.userInfo;
			// 					uni.setStorageSync('userInfo', res.userInfo);
			// 					this.bindfans();
			// 					this.getDetail(this.id);
			// 				}
			// 			});
			// 		} else {
			// 			uni.navigateTo({
			// 				url: `/pages/login/login?id=${options.id}&isDis=${options.isDis}&uid=${options.uid}`
			// 			});
			// 			return;
			// 		}
			// 	}
			// });
			if (!uni.getStorageSync('userInfo')) {
				// uni.navigateTo({
				// 	url: `/pages/authorizations/authorizations?id=${options.id}&isDis=${options.isDis}&uid=${options.uid}`
				// });
				uni.navigateTo({
					url: `/pages/authorizations/authorizations?id=${options.id}&isDis=${options.isDis}&uid=${options.uid}&needUserInfo=${1}&needToken=${0}`
				});
			}
		}
		this.getDetail(options.id);
	},
	// computed: {
	// 	// 计算属性的 getter
	// 	totalPrice: function() {
	// 		let allPrice = 0;
	// 		//总价格
	// 		for (let i = 0; i < this.daysArr.length; i++) {
	// 			allPrice += parseInt(this.daysArr[i].price) || 0;
	// 		}
	// 		return allPrice;
	// 	}
	// },
	methods: {
		// 跳转日历
		calendar(id) {
			uni.navigateTo({
				url: `/pages/details/calendar/calendar?id=${id}`
			});
		},
		//获取日历
		timelist() {
			hotelCalendar(this.list.room.id, '').then(res => {
				let thistime = dayjs().format('YYYY-MM-DD');
				console.log(thistime);
				console.log(res.data);
				for (let i = 0; i < res.data.length; i++) {
					if (res.data[i].checkin_date == thistime) {
						this.daysArr.push(res.data[i]);
						this.daysArr.push(res.data[i + 1]);
					}
				}
				console.log(this.daysArr);
				this.start_date = this.daysArr[0].checkin_date;
				this.end_date = this.daysArr[1].checkin_date;
				let arr = this.daysArr;
				arr.pop();
				this.daysArr = arr;
				this.daysLength = this.daysArr.length;
				// if (this.daysArr[0].quantity == '0') {
				// 	console.log(111111);
				// 	this.daysArr = [];
				// }
				console.log(this.daysArr);
			});
		},
		// 跳转到选择房间数量
		gocheck() {
			let check = JSON.stringify(this.check);
			uni.navigateTo({
				url: `/pages/details/check/check?check=${check}`
			});
		},
		// 绑定粉丝
		bindfans() {
			bindfans(this.id, this.uid, this.code, this.openid, this.userInfo).then(res => {
				console.log(res);
			});
		},
		getDetail(id) {
			if (this.isDis == 1) {
				distributionDetail(id, 'hotel').then(res => {
					this.list = res.data;
					if (!this.isOne) {
						this.timelist();
					}
					this.isOne = true;
				});
			} else {
				sourcesDetail(id, 'hotel').then(res => {
					this.list = res.data;
					if (!this.isOne) {
						this.timelist();
					}
					this.isOne = true;
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
			if (_this.daysArr[0].quantity == 0) {
				uni.showToast({
					icon: 'none',
					title: '当前日期没有房间了'
				});
				return;
			}
			if (_this.daysArr.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '请选择入住日期'
				});
				return;
			}
			if (_this.check[0].num == 0) {
				uni.showToast({
					icon: 'none',
					title: '请选择房间数量'
				});
				return;
			}
			if (_this.check[1].num == 0) {
				uni.showToast({
					icon: 'none',
					title: '请选择成人数量'
				});
				return;
			}
			let data = {
				start_date: _this.start_date, //开始时间
				end_date: _this.end_date, //结束时间
				daysArr: _this.daysArr,
				quantity: _this.quantity, //房间数量
				number_of_adults: _this.number_of_adults, //成人数量
				number_of_children: _this.number_of_children //儿童数量
			};
			let datas = JSON.stringify(data);
			if (!uni.getStorageSync('token')) {
				// uni.navigateTo({
				// 	url: `/pages/login/login?id=${_this.id}&isDis=${_this.isDis}`
				// });
				// uni.navigateTo({
				// 	url: `/pages/authorizations/authorizations?id=${_this.id}&isDis=${_this.isDis}&uid=${_this.uid}`
				// });
				uni.navigateTo({
					url: `/pages/authorizations/authorizations?id=${_this.id}&isDis=${_this.isDis}&uid=${_this.uid}&needUserInfo=${0}&needToken=${1}`
				});
			} else {
				// _this.child = _this.child.replace(/\&nbsp;/g, '');
				uni.navigateTo({
					url: `/pages/confirm/order/order?id=${_this.id}&type=hotel&child=${_this.child}&isDis=${_this.isDis}&uid=${_this.uid}&datas=${datas}`
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
					// 		url: `/pages/confirm/hotelConfirm/hotelConfirm?id=${_this.id}&type=hotel&child=${_this.child}&$isDis={_this.isDis}`
					// 	});
					// }
				}
			});
		},
		CheckboxChange(e) {
			this.child = JSON.stringify(e.detail.value);
		}
	}

	// 转发
	// onShareAppMessage() {
	// 	let _this = this;
	// 	return {
	// 		title: '酒店详情',
	// 		path: `/pages/details/hotelDetail/hotelDetail?id=${_this.id}&isDis=${_this.isDis}`
	// 	};
	// }
};
</script>

<style>
@import url('hotelDetail.css');

.sticky-box {
	/* #ifndef APP-PLUS-NVUE */
	display: flex;
	position: -webkit-sticky;
	/* #endif */
	position: sticky;
	top: var(--window-top);
	z-index: 99;
	flex-direction: row;
	margin: 0px;
	padding: 15px 0 15px 0;
	background-color: #f4f5f6;
	border-bottom-style: solid;
	border-bottom-color: #e2e2e2;
}

.textcenter {
	text-align: center;
	font-size: 18px;
}

.navclick {
	position: sticky;
	top: 0;
	z-index: 99;
}
</style>
