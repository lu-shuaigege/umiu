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
					<view class="labela">豪华大床房</view>
					<view class="labelb">库存：5</view>
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
		<!-- 日历 -->
		<view class="guideDetail_schedule">
			<view class="guideDetail_schedule_title">
				<text class="line"></text>
				<text>档期选择</text>
			</view>
			<view class="tui-modal-custom">
				<view class="calendar_title">
					<image v-if="lefticon" src="/static/img/leftcolor.png" mode="" @click="left"></image>
					<image v-if="!lefticon" src="/static/img/left.png" mode=""></image>
					<text>{{ dates }}</text>
					<image src="/static/img/right.png" mode="" @click="right"></image>
				</view>
				<view class="calendar_week">
					<view>日</view>
					<view>一</view>
					<view>二</view>
					<view>三</view>
					<view>四</view>
					<view>五</view>
					<view>六</view>
				</view>
				<view class="calendar_days">
					<view
						class="dayone"
						v-for="item in daysList"
						:key="item"
						@click="chooseItem(item)"
						:class="{ sbgFF6600: chooseStart == 'start' + item.id, ebgFF6600: chooseEnd == 'end' + item.id, bgFFEFE5: chooseMid.indexOf(item.id) !== -1 }"
					>
						<view class="day" :class="item.status !== 1 ? 'colorc1' : 'color6'">{{ item.traveldate }}</view>
						<view class="price" v-if="item.status === 1">
							<text v-if="item.price !== undefined">¥</text>
							{{ item.price }}
						</view>
					</view>
				</view>
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
				<view class="orderDetail_left">
					<view class="orderDetail_left_left">6月2日</view>
					<view class="orderDetail_left_heng">——</view>
					<view class="orderDetail_left_right">6月3日</view>
					<view class="orderDetail_left_all">共1日</view>
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
					<view class="facilities_bottom_left">精致大床房</view>
					<view class="facilities_bottom_right">20m2 大床 2人入住 不含早</view>
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
import { sourcesDetail, distributionDetail, bindfans, guidesSchedules } from '@/http/api.js';
import isSameOrAfter from '@/plugins/dayjs/plugin/isSameOrAfter/index.js'; // load on demand
import dayjs from '@/plugins/dayjs/index.js';
dayjs.extend(isSameOrAfter); // use plugin
import isSameOrBefore from '@/plugins/dayjs/plugin/isSameOrBefore/index.js'; // load on demand
dayjs.extend(isSameOrBefore); // use plugin
dayjs().format('Q Do k kk X x'); // more available formats
export default {
	data() {
		return {
			list: [],
			lists: {
				rating: 0,
				rating_user: 0,
				rating_agency: 0,
				rating_platform: 0
			},
			id: '',
			child: [],
			isDis: 0,
			uid: '',
			user_id: '', //现在的用户id
			isbuy: 0,
			code: '',
			openid: '',
			userInfo: {},
			//日历
			daysList: [],
			modal: false,
			dates: '', //格式化后日期
			currentDate: new Date(),
			month: '',
			lefticon: false, //左边按钮
			chooseStart: '',
			chooseEnd: '',
			chooseMid: [],
			paydata: [],
			isclick: true,
			startDate: '', //选中开始日期
			endDate: '', //选中结束日期
			daysArr: [], //选中日期数组
			daysObject: {}, //缓存每月日历
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
			]
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
			wx.getSetting({
				success: res => {
					//判断是否授权，如果授权成功
					if (res.authSetting['scope.userInfo']) {
						//获取用户信息
						wx.getUserInfo({
							success: res => {
								this.userInfo = res.userInfo;
								uni.setStorageSync('userInfo', res.userInfo);
								this.bindfans();
								this.getDetail(this.id);
							}
						});
					} else {
						uni.navigateTo({
							url: `/pages/login/login?id=${options.id}&isDis=${options.isDis}&uid=${options.uid}`
						});
						return;
					}
				}
			});
		}
		this.getDetail(options.id);
		this.getTeams('1000048');
		this.month = this.currentDate.setMonth(this.currentDate.getMonth());
		this.times(this.month);
	},
	computed: {
		// 计算属性的 getter
		totalPrice: function() {
			let allPrice = 0;
			//总价格
			for (let i = 0; i < this.daysArr.length; i++) {
				allPrice += parseInt(this.daysArr[i].price) || 0;
			}
			return allPrice;
		}
	},
	methods: {
		// 跳转到选择房间数量
		gocheck() {
			uni.navigateTo({
				url: `/pages/details/check/check`
			});
		},
		// 绑定粉丝
		bindfans() {
			bindfans(this.distributable_id, this.uid, this.code, this.openid, this.userInfo).then(res => {
				// this.list = res.data;
				console.log(res);
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
				distributionDetail(id, 'hotel').then(res => {
					this.list = res.data;
				});
			} else {
				sourcesDetail(id, 'hotel').then(res => {
					this.list = res.data;
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
			// if (!_this.child.length) {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: '请选择套餐'
			// 	});
			// 	return;
			// }
			if (!uni.getStorageSync('token')) {
				uni.navigateTo({
					url: `/pages/login/login?id=${_this.id}&isDis=${_this.isDis}`
				});
			} else {
				// _this.child = _this.child.replace(/\&nbsp;/g, '');
				uni.navigateTo({
					url: `/pages/confirm/hotelConfirm/hotelConfirm?id=${_this.id}&type=hotel&child=${_this.child}&isDis=${_this.isDis}&uid=${_this.uid}`
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
		},
		//选择套餐
		//获取导游档期
		async getTeams(id) {
			this.daysList = [];
			if (!this.daysObject[this.month]) {
				let res = await guidesSchedules(id, this.month);
				for (let i = 0; i < res.data.length; i++) {
					let newList = res.data[i];
					newList.traveldate = newList.travel_date.substring(8);
					this.daysList.push(newList);
				}
				if (this.daysList[0].week_zh == '周日') {
					this.daysList.unshift();
				} else if (this.daysList[0].week_zh == '周一') {
					this.daysList.unshift({});
				} else if (this.daysList[0].week_zh == '周二') {
					this.daysList.unshift({}, {});
				} else if (this.daysList[0].week_zh == '周三') {
					this.daysList.unshift({}, {}, {});
				} else if (this.daysList[0].week_zh == '周四') {
					this.daysList.unshift({}, {}, {}, {});
				} else if (this.daysList[0].week_zh == '周五') {
					this.daysList.unshift({}, {}, {}, {}, {});
				} else if (this.daysList[0].week_zh == '周六') {
					this.daysList.unshift({}, {}, {}, {}, {}, {});
				}
				this.daysObject[this.month] = this.daysList;
			} else {
				this.daysList = this.daysObject[this.month];
			}
		},
		// 获取时间
		times(dates) {
			this.dates = new Date(dates);
			let now = new Date().getFullYear() + '-' + this.checkMonth(new Date().getMonth() + 1);
			this.month = this.dates.getFullYear() + '-' + this.checkMonth(this.dates.getMonth() + 1); // "2019-03"
			this.dates = this.dates.getFullYear() + ' 年 ' + this.checkMonth(this.dates.getMonth() + 1) + ' 月 ';
			if (this.month == now) {
				this.lefticon = false;
			} else {
				this.lefticon = true;
			}
		},
		checkMonth(i) {
			if (i < 10) {
				i = '0' + i;
			}
			return i;
		},
		left() {
			this.dates = this.currentDate.setMonth(this.currentDate.getMonth() - 1); // 输出日期格式为毫秒形式1551398400000
			this.times(this.dates);
			this.getTeams(this.id);
		},
		right() {
			this.dates = this.currentDate.setMonth(this.currentDate.getMonth() + 1); // 输出日期格式为毫秒形式1551398400000
			this.times(this.dates);
			this.getTeams(this.id);
		},
		chooseItem(item) {
			// this.chooseStart = id
			this.daysArr = [];
			if (item.status !== 1) {
				return;
			}

			//是否设置出发点
			if (this.startDate == '') {
				this.daysArr.push(item);
				(this.startDate = item.travel_date), (this.endDate = '');
				this.chooseEnd = '';
				this.chooseMid = [];
				this.checkstyle(item);
				return;
			}

			//出发结尾均有 点击重设出发点
			if (this.startDate !== '' && this.endDate !== '') {
				this.daysArr.push(item);
				(this.startDate = item.travel_date), (this.endDate = '');
				this.chooseEnd = '';
				this.chooseMid = [];
				this.checkstyle(item);
				return;
			}

			//已有出发点 并且选在出发点前面
			if (item.travel_date <= this.startDate) {
				this.daysArr.push(item);
				//前面重设开始点
				(this.startDate = item.travel_date), (this.endDate = '');
				this.chooseEnd = '';
				this.chooseMid = [];
				this.checkstyle(item);
				return;
			}

			//点击到后面
			if (item.travel_date > this.startDate) {
				//判断中间是否有间隔
				let hasDisable = false;

				//判断是否同月
				if (dayjs(item.travel_date).isSame(dayjs(this.startDate), 'month')) {
					let currentMonth = this.daysObject[dayjs(item.travel_date).format('YYYY-MM')] || [];
					for (let i = 0; i < currentMonth.length; i++) {
						let currentItem = currentMonth[i];
						if (
							dayjs(currentItem.travel_date).isAfter(dayjs(this.startDate)) &&
							dayjs(currentItem.travel_date).isBefore(dayjs(item.travel_date)) &&
							currentItem.status !== 1
						) {
							hasDisable = true;
							break;
						}
					}
				} else {
					let startDate = this.startDate;
					let endDate = item.travel_date;
					let startMonth = this.daysObject[dayjs(startDate).format('YYYY-MM')] || [];
					let endMonth = this.daysObject[dayjs(endDate).format('YYYY-MM')] || [];
					for (let i = 0; i < startMonth.length; i++) {
						let currentItem = startMonth[i];
						if (dayjs(currentItem.travel_date).isAfter(dayjs(startDate)) && currentItem.status !== 1) {
							hasDisable = true;
							break;
						}
					}
					for (let i = 0; i < endMonth.length; i++) {
						let currentItem = endMonth[i];
						if (dayjs(currentItem.travel_date).isBefore(dayjs(endDate)) && currentItem.status !== 1) {
							hasDisable = true;
							break;
						}
					}
				}
				// for(let i = 0; i< this.daysList.length; i++){
				// 	// this.daysList[i]
				// 	if(this.daysList[i].travel_date>this.startDate&&this.daysList[i].travel_date < item.travel_date){
				// 		if(this.daysList[i].status !==1){
				// 			hasDisable = true
				// 		}
				// 	}
				// }
				if (hasDisable) {
					//有间隔重设开始点
					this.daysArr.push(item);
					(this.startDate = item.travel_date), (this.endDate = '');
					this.chooseEnd = '';
					this.chooseMid = [];
					this.checkstyle(item);
				} else {
					//此处设定enddate
					//计算天数和价格
					let length = this.getMonthRe(dayjs(item.travel_date).format('YYYY-MM'), dayjs(this.startDate).format('YYYY-MM')) + 1;
					for (let i = 0; i < length; i++) {
						let currentMonth = dayjs(this.startDate).add(i, 'month');
						let currentDaysArr = this.daysObject[currentMonth.format('YYYY-MM')] || [];
						currentDaysArr.forEach(el => {
							if (dayjs(el.travel_date).isSameOrAfter(dayjs(this.startDate)) && dayjs(el.travel_date).isSameOrBefore(dayjs(item.travel_date))) {
								this.daysArr.push(el);
								this.checkstyle(el);
							}
						});
					}
					this.endDate = item.travel_date;
					this.checkstyle(item);
					for (let i = 0; i < this.daysArr.length; i++) {
						if (this.daysArr[i].travel_date > this.startDate && this.daysArr[i].travel_date < this.endDate) {
							this.chooseMid.push(this.daysArr[i].id);
						}
					}
					console.log(this.daysArr);
				}
			}
		},
		checkstyle(item) {
			if (item.travel_date == this.startDate) {
				this.chooseStart = 'start' + item.id;
			}
			if (item.travel_date == this.endDate) {
				this.chooseEnd = 'end' + item.id;
				for (let i = 0; i < this.daysList.length; i++) {
					if (this.daysList[i].travel_date > this.startDate && this.daysList[i].travel_date < this.endDate) {
						this.chooseMid.push(this.daysList[i].id);
					}
				}
			}
		},
		getMonthRe(date1, date2) {
			date1 = date1.split('-');
			date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
			date2 = date2.split('-');
			date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
			return Math.abs(date1 - date2);
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
