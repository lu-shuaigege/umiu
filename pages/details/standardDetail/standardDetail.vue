<template>
	<view class="standardDetail">
		<navigator url="../../my/myIndex/myIndex" class="gotomyCenterbtn"></navigator>
		<view class="standardDetail_banner">
			<view class="sharetitle" v-if="sharetitle">
				<image :src="shareDetail.avatar" class="sharetitleimg" mode=""></image>
				<view class="sharetitletext">{{ shareDetail.truename || shareDetail.nickname }}给您分享了一个跟团游资源商品</view>
			</view>
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item, index) in list.images" :key="index"><image :src="item" mode="aspectFill"></image></swiper-item>
			</swiper>
		</view>
		<view class="standardDetail_top">
			<view class="name">{{ list.title }}</view>
			<view class="days">
				<view class="destination">目的地：{{ list.destination }}</view>
				<text></text>
				行程天数：{{ list.last_days }}天
				<text></text>
				销量：{{ list.sales_volume }}
			</view>
			<!-- <view class="total">销量：{{list.sales_volume}}</view> -->
			<view class="price">
				<view class="l">
					<view class="l">售卖价:</view>
					<view class="r">
						<text>
							￥
							<text>{{ list.price }}</text>
						</text>
						起
					</view>
				</view>
				<!-- <view class="r">
					同行价:￥{{list.price}}
				</view> -->
				<!-- <view class="moneytip">预估收益:￥{{ list.commission }}</view> -->
			</view>
			<view class="setmeal">
				<view class="setmeal_l">
					<view>
						<text>套餐</text>
						<text>价格</text>
					</view>
					<text class="yinying"></text>
				</view>
				<view class="setmeal_r">
					<view class="one" v-for="item in list.teams" :key="item" @click="chooseItem(item)">
						<view class="one_p" :class="chooseStart == item.id ? 'borderFF6600' : item.quantity != 0 ? '' : 'bg999'">
							<view class="up">{{ item.travel_date.substring(5) }} {{ item.week_zh }}</view>
							<view class="ud" v-if="item.quantity != 0">￥{{ item.price }}</view>
							<view class="ud" v-if="item.quantity == 0">暂无库存</view>
						</view>
					</view>
					<view class="one" @click="show">
						<view class="one_p"><view class="more">查看更多</view></view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="guideDetail_info" v-if="isDis != 0"> -->
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
				<!-- <view class="button" @click="toUpload()">进入工作室</view> -->
				<view class="button" @click="toUpload(list.distributor.id)">进入工作室</view>
			</view>
		</view>
		<!-- <view class="guideDetail_info" v-if="isDis == 0">
			<view class="guideDetail_info_con">
				<view class="guideDetail_info_con_l">
					<image class="img" v-if="list.author.avatar" :src="list.author.avatar" mode=""></image>
					<image class="img" v-if="!list.author.avatar" src="../../../static/img/header_img.png" mode=""></image>
					<view class="first">
						<text class="name">{{ list.author.truename || list.author.nickname }}</text>
						<view class="title">
							<image src="/static/img/clockinSuccess_icon.png" mode=""></image>
							<text>{{ list.author.role_zh }}</text>
						</view>
					</view>
				</view>
				<view class="button" @click="toUpload(list.author.id)">进入工作室</view>
			</view>
		</view> -->
		<view class="standardDetail_con">
			<luBarTabNav :tabList="tabList" :barFixed="barFixed" :barHeight="barHeight" :barTop="barTop" :barId="barId" ref="barTabNav">
				<view id="item1" class="tabbody"><u-parse :content="list.feature" @preview="preview" @navigate="navigate" /></view>
				<view id="item2" class="tabbody">
					<view class="tabbody_title">
						<text></text>
						行程路线
						<text></text>
					</view>
					<view class="tabbody1_con" v-for="item in list.travels" :key="item">
						<view class="title">
							<text class="t1">D{{ item.sort }}</text>
							<text class="t2">第{{ item.sort }}天</text>
						</view>
						<view class="con">
							<view class="l"></view>
							<view class="r"><u-parse :content="item.content" /></view>
						</view>
					</view>
				</view>
				<view id="item3" class="tabbody">
					<view class="tabbody_title">
						<text></text>
						费用说明
						<text></text>
					</view>
					<view class="tabbody_con">
						<text>费用包含</text>
						<u-parse :content="list.fee_include" />
						<text>费用不包含</text>
						<u-parse :content="list.fee_notinclude" />
					</view>
				</view>
				<view id="item4">
					<view class="tabbody">
						<view class="tabbody_title">
							<text></text>
							补充说明
							<text></text>
						</view>
						<view class="tabbody_con"><u-parse :content="list.additional_instruction" /></view>
					</view>
					<view class="tabbody">
						<view class="tabbody_title">
							<text></text>
							同业提醒
							<text></text>
						</view>
						<view class="tabbody_con"><u-parse :content="list.industry_reminder" /></view>
					</view>
					<view class="tabbody">
						<view class="tabbody_title">
							<text></text>
							购物说明
							<text></text>
						</view>
						<view class="tabbody_con"><u-parse :content="list.shopping_instruction" /></view>
					</view>
					<view class="tabbody">
						<view class="tabbody_title">
							<text></text>
							游客须知
							<text></text>
						</view>
						<view class="tabbody_con"><u-parse :content="list.visitor_information" /></view>
					</view>
				</view>
			</luBarTabNav>
		</view>
		<tui-modal :show="modal" @cancel="hide" :custom="true">
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
						:class="chooseStart == item.id ? 'sbgFF6600' : item.quantity != 0 ? '' : ''"
					>
						<view class="day" :class="item.price === 0 || item.travel_date <= today ? 'colorc1' : 'color6'">{{ item.day }}</view>
						<view class="price" v-if="item.price !== 0 && item.travel_date > today && item.quantity != 0">
							<text v-if="item.price !== undefined">¥</text>
							{{ item.price }}
						</view>
					</view>
				</view>
			</view>
		</tui-modal>
		<!-- 复制微信号弹框 -->
		<!-- <view class="wc1">
			<tui-modal :show="modal1" @cancel="hide1" :custom="true">
				<view class="wechatnum">
					<image class="wechatnum_bg" src="/static/img/wechat_bg.png" mode=""></image>
					<image @click="closewc()" class="wechatnum_close" src="/static/img/wechat_close.png" mode=""></image>
					<text class="title">微信号</text>
					<text class="num">{{ list.author.wx_number }}</text>
					<view class="copy" @click="copy(list.author.wx_number)">
						<image src="/static/img/wechat_copy.png" mode=""></image>
						<text>复制微信号</text>
					</view>
				</view>
			</tui-modal>
		</view> -->
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
import { userInfo, usersDetail, boutiquesTeams, boutiquesDetail, distributionDetail, bindfans } from '@/http/api.js';
import dayjs from '@/plugins/dayjs/index.js';
import uParse from '@/plugins/gaoyia-parse/parse.vue';
import luBarTabNav from '@/plugins/lu-bar-tab-nav/lu-bar-tab-nav.vue';
import tuiModal from '@/plugins/thorui/components/modal/modal.vue';
export default {
	components: {
		luBarTabNav,
		uParse,
		tuiModal
	},
	data() {
		return {
			list: {
				commission: '',
				title: '',
				destination: '',
				last_days: 0,
				sales_volume: 0,
				price: 0,
				author: {
					truename: ''
				},
				distributable_id: 0
			},
			distributable_id: 0,
			id: '',
			shareDetail: {
				truename: '',
				nickname: ''
			}, //分享人的信息
			sharetitle: false, //没有分享人
			isnew: false, //是否是分享进来的
			code: '',
			openid: '',
			userInfo: {},
			isClick: false,
			scrollTop: 0,
			barFixed: true,
			barHeight: '38',
			barTop: 0,
			iconShow: true,
			barId: '0',
			intro: '',
			tabList: [
				{
					text: '图文介绍',
					navTarget: '#item1'
				},
				{
					text: '行程路线',
					navTarget: '#item2'
				},
				{
					text: '费用说明',
					navTarget: '#item3'
				},
				{
					text: '购买须知',
					navTarget: '#item4'
				}
			],

			//日历
			daysList: [],
			modal: false,
			dates: '', //格式化后日期
			currentDate: new Date(),
			date: '',
			lefticon: false, //左边按钮
			chooseStart: -1,
			today: '',
			team: '',
			//微信号弹框
			modal1: false,
			isShare: 0, // 1:普通分享   2:普通分销   3:我要分销
			useisShare: 0, // 1:普通分享   2:普通分销   3:我要分销
			isDis: 0,
			uid: '', //分享过来的用户id
			uidb: '', //分享过来的用户id备用
			user_id: '', //现在的用户id
			myid: '', //自己的id
			usemyid: '', //要使用的自己id
			isbuy: 0
		};
	},
	onShow() {
		wx.hideHomeButton();
		const pages = getCurrentPages();
		// console.log(pages);
		const currPage = pages[pages.length - 1]; // 当前页
		if (currPage.data.id != '') {
			this.id = currPage.data.id;
			this.isDis = currPage.data.isDis;
			// this.uid = currPage.data.uid;
			this.isbuy = currPage.data.isbuy;
			this.getDetail(this.id);
			// this.bindfans();
		}
		if (currPage.data.isShare) {
			this.isShare = currPage.data.isShare;
		}
		if (currPage.data.useisShare) {
			this.useisShare = currPage.data.useisShare;
		}
		if (currPage.data.uid) {
			this.uid = currPage.data.uid;
			if (this.sharetitle) {
				this.uid = currPage.data.uidb;
			}
			this.bindfans();
			this.shareDetailfn();
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
			this.shareDetailfn();
		}
	},
	onLoad(options) {
		if (options.isDis && options.isDis == 1) {
			this.isDis = 1;
			this.distributable_id = options.id;
		}
		this.id = options.id;
		console.log(options.id);
		if (options.uid) {
			this.uid = options.uid;
			this.uidb = options.uid;
			this.shareDetailfn();
			this.sharetitle = true;
		} else {
			this.sharetitle = false;
		}
		if (options.isShare) {
			this.isShare = options.isShare;
			this.useisShare = options.isShare;
			console.log('isShare', this.isShare);
		}
		// console.log('detail' + this.uid);
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
		this.getDetail(this.id);
		this.shareDetailfn();
	},
	methods: {
		// 接口没有获取到个人信息
		nomyid() {
			if (!uni.getStorageSync('token')) {
				this.userInfofn();
				return;
			}
			
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
		bindfans() {
			bindfans(this.id, this.uid, this.code, this.openid, this.userInfo).then(res => {
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

		//选择套餐
		chooseItem(item) {
			if (item.travel_date > this.today && item.price > 0) {
				this.chooseStart = item.id;
				this.team = item;
				setTimeout(() => {
					this.hide();
				}, 500);
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
				url: `/pages/studio/studio?id=${this.user_id}&isDis=${this.isDis}&uid=${this.uid}&isShare=${this.isShare}`
			});
		},
		// //关闭微信号弹框
		// closewc() {
		// 	this.modal1 = false;
		// },
		// //复制微信号
		// copy(data) {
		// 	wx.setClipboardData({
		// 		data: data,
		// 		success(res) {
		// 			wx.getClipboardData({
		// 				success(res) {
		// 					wx.hideLoading();
		// 					uni.showToast({
		// 						icon: 'none',
		// 						title: '微信号复制成功，去添加好友吧'
		// 					});
		// 				}
		// 			});
		// 		}
		// 	});
		// },
		getDetail(id) {
			if (this.isDis == 1) {
				distributionDetail(id, 'tour-group').then(res => {
					this.list = res.data;
					this.list.author = res.data.distributor;
					// this.chooseStart = this.list.teams[0].id;
					// this.team = this.list.teams[0];
					for (let i = 0; i < this.list.teams.length; i++) {
						if (this.list.teams[i].quantity > 0) {
							this.chooseStart = this.list.teams[i].id;
							this.team = this.list.teams[i];
							break;
						}
					}
					this.distributable_id = res.data.distributable_id;
				});
			} else {
				boutiquesDetail(id, 'tour-groups').then(res => {
					this.list = res.data;
					// this.chooseStart = this.list.teams[0].id;
					// this.team = this.list.teams[0];
					for (let i = 0; i < this.list.teams.length; i++) {
						if (this.list.teams[i].quantity > 0) {
							this.chooseStart = this.list.teams[i].id;
							this.team = this.list.teams[i];
							break;
						}
					}
				});
			}
		},
		//获取日历&&价格
		getTeams(id) {
			boutiquesTeams(id, this.date, 'tour-groups').then(res => {
				this.daysList = res.data;
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
			});
		},
		// 隐藏日历
		hide() {
			this.modal = false;
			this.currentDate = new Date();
		},
		// 显示日历
		show() {
			this.modal = true;
			this.dates = this.currentDate.setMonth(this.currentDate.getMonth());
			this.times(this.dates);
			this.getTeams(this.id);
		},
		// 获取时间
		times(dates) {
			this.dates = new Date(dates);
			this.today = dayjs().format('YYYY-MM-DD');
			let now = new Date().getFullYear() + '-' + this.checkMonth(new Date().getMonth() + 1);
			this.date = this.dates.getFullYear() + '-' + this.checkMonth(this.dates.getMonth() + 1); // "2019-03"
			this.dates = this.dates.getFullYear() + ' 年 ' + this.checkMonth(this.dates.getMonth() + 1) + ' 月 ';
			if (this.date == now) {
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
		tobuy() {
			let _this = this;
			if (!_this.team) {
				uni.showToast({
					icon: 'none',
					title: '请选择套餐'
				});
				return;
			}
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
				_this.team = JSON.stringify(_this.team);
				uni.navigateTo({
					// url: `/pages/confirm/boutiquesConfirm/boutiquesConfirm?id=${_this.id}&type='boutique'&team=${_this.team}&isDis=1&uid=${_this.uid}`
					url: `/pages/confirm/boutiquesConfirm/boutiquesConfirm?id=${_this.id}&type='tour-group'&team=${_this.team}&isDis=1&uid=${_this.uid}&isShare=${_this.isShare}`
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
					// 	_this.team = JSON.stringify(_this.team);
					// 	uni.navigateTo({
					// 		url: `/pages/confirm/boutiquesConfirm/boutiquesConfirm?id=${_this.id}&type='boutique'&team=${_this.team}&isDis=1&uid=${_this.uid}`
					// 	});
					// }
				}
			});
		}
	},
	//页面滚动执行方式
	onPageScroll: function(e) {
		this.$refs.barTabNav._selectedTab(e.scrollTop);
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
			path: `/pages/details/standardDetail/standardDetail?id=${this.id}&isDis=${this.isDis}&uid=${this.uid}&isShare=${this.isShare}`,
			success: function(res) {
				console.log(res);
			},
			fail: function(res) {
				this.uid = this.uidb;
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
@import url('standardDetail.css');

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
