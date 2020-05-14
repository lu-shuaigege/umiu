<template>
	<view class="homestayDetail">
		<navigator url="../../my/myIndex/myIndex" class="gotomyCenterbtn"></navigator>
		<view class="homestayDetail_banner">
			<view class="sharetitle" v-if="uid">
				<image :src="shareDetail.avatar" class="sharetitleimg" mode=""></image>
				<view class="sharetitletext">{{ shareDetail.truename || shareDetail.nickname }}给您分享了一个民宿资源商品</view>
			</view>
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
					<view class="labela">{{ list.room.title }}</view>
					<view class="labela">预估收益:￥{{ list.commission }}</view>
					<!-- <view class="labelb">库存：20</view> -->
					<!-- <view class="l">{{ list.address }}</view> -->
					<!-- <view class="r">门市价:￥{{list.price}}</view> -->
				</view>
			</view>
			<view class="hoteldate" @click="calendar(list.room.id)">
				<view class="hoteldate_left">
					<view class="hoteldate_left_top">入住日期</view>
					<view class="hoteldate_left_bottom">{{ start_date.slice(5, 7) }}月{{ start_date.slice(8, 10) }}日</view>
				</view>
				<view class="hoteldate_center">
					<view class="hoteldate_center_shu"></view>
					<view class="hoteldate_center_con">{{ daysLength }}晚</view>
					<view class="hoteldate_center_shu"></view>
				</view>
				<view class="hoteldate_left">
					<view class="hoteldate_left_top">离店日期</view>
					<view class="hoteldate_left_bottom">{{ end_date.slice(5, 7) }}月{{ end_date.slice(8, 10) }}日</view>
				</view>
			</view>
			<view class="con">
				<image src="/static/img/yinhao.png" class="yinhao" mode=""></image>
				<view class="conDescription" v-if="opencon">{{ list.description }}</view>
				<view class="conDescriptionall" v-if="!opencon">{{ list.description }}</view>
				<view class="opencon" v-if="opencon" @click="openconfn(false)">
					<view class="opencon_left">展开全部介绍</view>
					<image src="../../../static/img/open.png" class="opencon_right" mode=""></image>
				</view>
				<view class="opencon" v-if="!opencon" @click="openconfn(true)">
					<view class="opencon_left">收起全部介绍</view>
					<image src="../../../static/img/retract.png" class="opencon_right" mode=""></image>
				</view>
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
		<view class="house_type">
			<view class="orderDetail">
				<view class="orderDetail_left" @click="calendar(list.room.id)">
					<view class="orderDetail_left_left">{{ start_date.slice(5, 7) }}月{{ start_date.slice(8, 10) }}日</view>
					<view class="orderDetail_left_heng">——</view>
					<view class="orderDetail_left_right">{{ end_date.slice(5, 7) }}月{{ end_date.slice(8, 10) }}日</view>
					<view class="orderDetail_left_all">共{{ daysLength }}日</view>
				</view>
				<view class="orderDetail_right" @click="gocheck()">
					<view class="orderDetail_right_left">{{ check[0].num }}间</view>
					<view class="orderDetail_right_center">{{ check[1].num }}成人</view>
					<view class="orderDetail_right_right">{{ check[2].num }}儿童</view>
				</view>
			</view>
			<!-- <view class="type_title" v-show="list.facility.length"> -->
			<view class="type_title" v-show="list.facility.length">
				<text class="dot"></text>
				<text>房型描述</text>
			</view>
			<view class="facilitiesa" v-show="list.facility.length">
				<view class="facilitiesa_bottom">
					<view class="facilities_bottom_left">{{ list.room.title }}</view>
					<view class="facilities_bottom_right">{{ list.room.builtuparea }} {{ list.room.bed_type }} {{ list.room.capacity }} {{ list.room.description }}</view>
				</view>
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
		<view class="tobuyover" v-if="list.offlined_status == 1">产品已下架</view>
		<view class="tobuy" v-if="list.offlined_status != 1">
			<view class="tobuyleft_nomyid" v-if="!myid" @click="nomyid()">
				<view class="tobuyleft_nomyidtop">分享</view>
				<view class="tobuyleft_nomyiddown">收益￥{{ list.commission }}</view>
			</view>
			<button class="tobuyleft" v-if="myid" v-show="isShare != 1" open-type="share">
				<view class="tobuyleft_nomyidtop">分享</view>
				<view class="tobuyleft_nomyiddown">收益￥{{ list.commission }}</view>
			</button>
			<view class="tobuyright" v-show="isShare != 1" @click="tobuy()">立即采购</view>
			<view class="nowbuy" v-show="isShare == 1" @click="tobuy()">立即采购</view>
		</view>
	</view>
</template>

<script>
import { userInfo, usersDetail, sourcesDetail, distributionDetail, bindfans, hotelCalendar } from '@/http/api.js';
import dayjs from '@/plugins/dayjs/index.js';
export default {
	components: {},
	data() {
		return {
			opencon: true, //是否查看全部介绍
			start_date: '0000-00-00', //入住日期
			end_date: '0000-00-00', //离店日期
			daysArr: [], //选择日期的列表
			daysLength: 0, //共几日
			quantity: 0, //房间数量
			number_of_adults: 0, //成人数量
			number_of_children: 0, //儿童数量
			list: { commission: '' }, //页面总数居
			id: '',
			shareDetail: '', //分享人的信息
			child: [],
			isShare: 0, // 1:普通分享   2:普通分销   3:我要分销
			useisShare: 0, // 1:普通分享   2:普通分销   3:我要分销
			isDis: 0, //是否是分销过来的用于获取详情 0:普通分享  1：分销
			uid: '', //分享过来的用户id
			user_id: '', //现在的用户id
			myid: '', //自己的id
			usemyid: '', //要使用的自己id
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
		if (currPage.data.isShare) {
			this.isShare = currPage.data.isShare;
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
		if (currPage.data.uid) {
			this.uid = currPage.data.uid;
			this.bindfans();
			this.shareDetailfn();
		}
		if (uni.getStorageSync('token')) {
			this.userInfofn();
		}
	},
	onLoad(options) {
		this.id = options.id;
		console.log(options.id);
		if (options.isDis && options.isDis == 1) {
			this.isDis = 1;
		}
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
		this.shareDetailfn();
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
		// 接口没有获取到个人信息
		nomyid() {
			uni.showToast({
				icon: 'none',
				title: '网络有点慢呢，请稍等一下再试'
			});
		},
		//获取个人信息
		userInfofn() {
			userInfo().then(res => {
				console.log(res.data);
				this.myid = res.data.id;
				this.usemyid = res.data.id;
			});
		},
		// 获取分享人的信息
		shareDetailfn() {
			usersDetail({ userid: this.uid }).then(res => {
				console.log(res);
				this.shareDetail = res.data;
			});
		},
		//点击查看简介详情
		openconfn(open) {
			this.opencon = open;
		},
		// 跳转日历
		calendar() {
			uni.navigateTo({
				url: `/pages/details/calendar/calendar?id=${id}`
			});
		},
		//获取日历
		timelist() {
			console.log(this.list.room.id);
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
			uni.navigateTo({
				url: `/pages/details/check/check`
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
				distributionDetail(id, 'homestay').then(res => {
					this.list = res.data;
					if (!this.isOne) {
						this.timelist();
					}
					this.isOne = true;
				});
			} else {
				sourcesDetail(id, 'homestay').then(res => {
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
					url: `/pages/authorizations/authorizations?id=${_this.id}&isDis=${_this.isDis}&uid=${_this.uid}&isShare=${_this.isShare}&needUserInfo=${0}&needToken=${1}`
				});
			} else {
				_this.child = _this.child.replace(/\&nbsp;/g, '');
				uni.navigateTo({
					url: `/pages/confirm/order/order?id=${_this.id}&type=homestay&child=${_this.child}&isDis=${_this.isDis}&uid=${_this.uid}&isShare=${
						_this.isShare
					}&datas=${datas}`
				});
			}
		},
		CheckboxChange(e) {
			this.child = JSON.stringify(e.detail.value);
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
			title: this.list.title,
			path: `/pages/details/homestayDetail/homestayDetail?id=${this.id}&isDis=${this.isDis}&uid=${this.uid}&isShare=${this.isShare}`,
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
@import url('homestayDetail.css');

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
