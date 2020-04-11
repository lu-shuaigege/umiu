<template>
	<view class="calendar">
		<!-- 日历 -->
		<view class="guideDetail_schedule">
			<!-- <view class="guideDetail_schedule_title">
				<text class="line"></text>
				<text>档期选择</text>
			</view> -->
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
						<!-- <view class="day" :class="item.status !== 1 ? 'colorc1' : 'color6'">{{ item.traveldate }}</view> -->
						<view class="day" :class="item.quantity == 0 || item.checkin_date <= thisdate ? 'colorc1' : 'color6'">{{ item.traveldate }}</view>
						<!-- <view class="price" v-if="item.status === 1"> -->
						<view class="price" v-if="item.quantity > 0">
							<text v-if="item.price !== undefined">¥</text>
							{{ item.price }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom_btn" @click="okcalendar()">确定</view>
	</view>
</template>

<script>
import { hotelCalendar } from '@/http/api.js';
import isSameOrAfter from '@/plugins/dayjs/plugin/isSameOrAfter/index.js'; // load on demand
import dayjs from '@/plugins/dayjs/index.js';
dayjs.extend(isSameOrAfter); // use plugin
import isSameOrBefore from '@/plugins/dayjs/plugin/isSameOrBefore/index.js'; // load on demand
dayjs.extend(isSameOrBefore); // use plugin
dayjs().format('Q Do k kk X x'); // more available formats
export default {
	data() {
		return {
			id: '',
			list: [],
			thisdate: dayjs().format('YYYY-MM-DD'), //今天的日期
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
			daysObject: {} //缓存每月日历
		};
	},
	onShow() {
		wx.hideHomeButton();
	},
	onLoad(options) {
		this.id = options.id;
		this.getTeams(options.id);
		this.month = this.currentDate.setMonth(this.currentDate.getMonth());
		this.times(this.month);
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
	},
	methods: {
		// 跳转到详情页
		okcalendar() {
			if (this.daysArr.length == 0) {
				wx.navigateBack({
					//返回
					delta: 1
				});
				return;
			}
			let arr = this.daysArr;
			arr.pop();
			let pages = getCurrentPages();
			let prevPage = pages[pages.length - 2]; //上一个页面
			//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
			prevPage.setData({
				start_date: this.startDate,
				end_date: this.endDate,
				daysArr: arr
			});
			wx.navigateBack({
				//返回
				delta: 1
			});
		},
		//选择套餐
		//获取导游档期
		async getTeams(id) {
			this.daysList = [];
			if (!this.daysObject[this.month]) {
				let res = await hotelCalendar(id, this.month);
				for (let i = 0; i < res.data.length; i++) {
					let newList = res.data[i];
					newList.traveldate = newList.checkin_date.substring(8);
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
		// 点击日历
		chooseItem(item) {
			console.log(item);
			if (!item.checkin_date) {
				return;
			}
			// this.chooseStart = id
			this.daysArr = [];
			// if (item.status !== 1) {
			// 没有房间
			if (item.quantity == 0 || item.checkin_date <= dayjs().format('YYYY-MM-DD')) {
				return;
			}

			//是否设置出发点
			if (this.startDate == '') {
				this.daysArr.push(item);
				// (this.startDate = item.travel_date), (this.endDate = '');
				(this.startDate = item.checkin_date), (this.endDate = '');
				this.chooseEnd = '';
				this.chooseMid = [];
				this.checkstyle(item);
				return;
			}

			//出发结尾均有 点击重设出发点
			if (this.startDate !== '' && this.endDate !== '') {
				this.daysArr.push(item);
				// (this.startDate = item.travel_date), (this.endDate = '');
				(this.startDate = item.checkin_date), (this.endDate = '');
				this.chooseEnd = '';
				this.chooseMid = [];
				this.checkstyle(item);
				return;
			}

			//已有出发点 并且选在出发点前面
			// if (item.travel_date <= this.startDate) {
			if (item.checkin_date <= this.startDate) {
				this.daysArr.push(item);
				//前面重设开始点
				// (this.startDate = item.travel_date), (this.endDate = '');
				(this.startDate = item.checkin_date), (this.endDate = '');
				this.chooseEnd = '';
				this.chooseMid = [];
				this.checkstyle(item);
				return;
			}

			//点击到后面
			// if (item.travel_date > this.startDate) {
			if (item.checkin_date > this.startDate) {
				//判断中间是否有间隔
				let hasDisable = false;
				//判断是否同月
				// if (dayjs(item.travel_date).isSame(dayjs(this.startDate), 'month')) {
				if (dayjs(item.checkin_date).isSame(dayjs(this.startDate), 'month')) {
					// let currentMonth = this.daysObject[dayjs(item.travel_date).format('YYYY-MM')] || [];
					let currentMonth = this.daysObject[dayjs(item.checkin_date).format('YYYY-MM')] || [];
					for (let i = 0; i < currentMonth.length; i++) {
						let currentItem = currentMonth[i];
						if (
							// dayjs(currentItem.travel_date).isAfter(dayjs(this.startDate)) &&
							// dayjs(currentItem.travel_date).isBefore(dayjs(item.travel_date)) &&
							// currentItem.status !== 1
							dayjs(currentItem.checkin_date).isAfter(dayjs(this.startDate)) &&
							dayjs(currentItem.checkin_date).isBefore(dayjs(item.checkin_date)) &&
							currentItem.quantity == 0
						) {
							hasDisable = true;
							break;
						}
					}
				} else {
					let startDate = this.startDate;
					// let endDate = item.travel_date;
					let endDate = item.checkin_date;
					let startMonth = this.daysObject[dayjs(startDate).format('YYYY-MM')] || [];
					let endMonth = this.daysObject[dayjs(endDate).format('YYYY-MM')] || [];
					for (let i = 0; i < startMonth.length; i++) {
						let currentItem = startMonth[i];
						// if (dayjs(currentItem.travel_date).isAfter(dayjs(startDate)) && currentItem.status !== 1) {
						if (dayjs(currentItem.checkin_date).isAfter(dayjs(startDate)) && currentItem.quantity == 0) {
							hasDisable = true;
							break;
						}
					}
					for (let i = 0; i < endMonth.length; i++) {
						let currentItem = endMonth[i];
						// if (dayjs(currentItem.travel_date).isBefore(dayjs(endDate)) && currentItem.status !== 1) {
						if (dayjs(currentItem.checkin_date).isBefore(dayjs(endDate)) && currentItem.quantity == 0) {
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
					// (this.startDate = item.travel_date), (this.endDate = '');
					(this.startDate = item.checkin_date), (this.endDate = '');
					this.chooseEnd = '';
					this.chooseMid = [];
					this.checkstyle(item);
				} else {
					//此处设定enddate
					//计算天数和价格
					// let length = this.getMonthRe(dayjs(item.travel_date).format('YYYY-MM'), dayjs(this.startDate).format('YYYY-MM')) + 1;
					let length = this.getMonthRe(dayjs(item.checkin_date).format('YYYY-MM'), dayjs(this.startDate).format('YYYY-MM')) + 1;
					for (let i = 0; i < length; i++) {
						let currentMonth = dayjs(this.startDate).add(i, 'month');
						let currentDaysArr = this.daysObject[currentMonth.format('YYYY-MM')] || [];
						currentDaysArr.forEach(el => {
							// if (dayjs(el.travel_date).isSameOrAfter(dayjs(this.startDate)) && dayjs(el.travel_date).isSameOrBefore(dayjs(item.travel_date))) {
							if (dayjs(el.checkin_date).isSameOrAfter(dayjs(this.startDate)) && dayjs(el.checkin_date).isSameOrBefore(dayjs(item.checkin_date))) {
								this.daysArr.push(el);
								this.checkstyle(el);
							}
						});
					}
					// this.endDate = item.travel_date;
					this.endDate = item.checkin_date;
					this.checkstyle(item);
					for (let i = 0; i < this.daysArr.length; i++) {
						// if (this.daysArr[i].travel_date > this.startDate && this.daysArr[i].travel_date < this.endDate) {
						if (this.daysArr[i].checkin_date > this.startDate && this.daysArr[i].checkin_date < this.endDate) {
							this.chooseMid.push(this.daysArr[i].id);
						}
					}
				}
			}
		},
		checkstyle(item) {
			// if (item.travel_date == this.startDate) {
			if (item.checkin_date == this.startDate) {
				this.chooseStart = 'start' + item.id;
			}
			// if (item.travel_date == this.endDate) {
			if (item.checkin_date == this.endDate) {
				this.chooseEnd = 'end' + item.id;
				for (let i = 0; i < this.daysList.length; i++) {
					// if (this.daysList[i].travel_date > this.startDate && this.daysList[i].travel_date < this.endDate) {
					if (this.daysList[i].checkin_date > this.startDate && this.daysList[i].checkin_date < this.endDate) {
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
@import url('calendar.css');

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
