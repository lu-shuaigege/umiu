<template>
	<view class="studio">
		<!-- 上面信息 -->
		<view class="studioTop">
			<view class="studioTop-topimg">
				<image v-show="!data.user.cover_image" class="studioTop-topimg-img" src="../../static/img/shopbg.png" mode=""></image>
				<image v-show="data.user.cover_image" class="studioTop-topimg-img" :src="data.user.cover_image" mode=""></image>
			</view>
			<view class="studioTop-bottom">
				<view class="studioTop-bottom-top">
					<image class="studioTop-bottom-top-left" v-if="data.user.avatar" :src="data.user.avatar" mode=""></image>
					<image class="studioTop-bottom-top-left" v-if="!data.user.avatar" src="../../static/img/header_img.png" mode=""></image>
					<view class="studioTop-bottom-top-right">
						<view class="studioTop-bottom-top-right-top">
							<view class="studioTop-bottom-top-right-top-left">
								<view class="studioTop-bottom-top-right-title">
									<view class="studioTop-bottom-top-name">{{ data.user.nickname }}</view>
									<image v-if="data.user.sex == 1" class="studioTop-bottom-top-sex" src="/static/img/customized_manicon.png" mode=""></image>
									<image v-if="data.user.sex == 2" class="studioTop-bottom-top-sex" src="/static/img/customized_womanicon.png" mode=""></image>
								</view>
								<view class="studioTop-bottom-top-right-top-left-bottom">
									<view class="serve_num">{{ data.user.rating }}</view>
									<view class="role_zh">{{ data.user.role_zh }}</view>
								</view>
							</view>

							<view class="studioTop-bottom-top-right-phone" @click="tel">
								<image class="studioTop-bottom-top-right-phone-img" src="../../static/img/phone.png" mode=""></image>
							</view>
						</view>

						<view class="studioTop-bottom-top-right-word">{{ data.user.profile }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="studioCenter">
			<view class="studioCenter-top">
				<view class="studioCenter-top-list">
					<view class="studioCenter-top-list-item">
						<view class="studioCenter-top-list-item-top">{{ data.trade_number }}</view>
						<view class="studioCenter-top-list-item-bottom">交易量</view>
					</view>
					<view class="studioCenter-top-list-item">
						<view class="studioCenter-top-list-item-top">{{ data.play_number }}</view>
						<view class="studioCenter-top-list-item-bottom">玩法案例</view>
					</view>
					<!-- <view class="studioCenter-top-list-item">
						<view class="studioCenter-top-list-item-top">{{ data.service_number }}</view>
						<view class="studioCenter-top-list-item-bottom">服务人数</view>
					</view> -->
					<view class="studioCenter-top-list-item">
						<view class="studioCenter-top-list-item-top">{{ data.visitor_number }}</view>
						<view class="studioCenter-top-list-item-bottom">来访客户</view>
					</view>
				</view>
				<view class="studioCenter-top-bottom"><view class="studioCenter-top-bottom-btn" @click="gotolife">走进TA的生活</view></view>
			</view>
			<view class="studioCenter-bottom">
				<view class="studioCenter-bottom-top" @click="gotoscenicRecommend()">
					<view class="studioCenter-bottom-top-left">
						<image src="../../static/img/shop.png" class="shop-icon" mode=""></image>
						<view class="shop-title">进入我的小店</view>
					</view>
					<!-- <view class="studioCenter-bottom-top-right">查看更多</view> -->
					<image src="../../static/img/studio_rightImg.png" class="studioCenter-bottom-top-rightImg" mode=""></image>
				</view>
				<view class="studioCenter-bottom-bottom">
					<view v-for="(item, index) of data.plays" :key="index" @click="toDetail(item.id, item.type)" class="studioCenter-bottom-bottom-item">
						<image class="studioCenter-bottom-bottom-item-img" :src="item.cover_image" mode=""></image>
						<view class="studioCenter-bottom-bottom-item-name">{{ item.title }}</view>
						<view class="studioCenter-bottom-bottom-item-bottom">
							<view class="studioCenter-bottom-bottom-item-bottom-money">￥</view>
							<view class="studioCenter-bottom-bottom-item-bottom-moneynum">{{ item.price }}</view>
							<view class="studioCenter-bottom-bottom-item-bottom-right">起</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="studioBottom">
			<view class="studioBottom-top">
				<view class="studioBottom-top-item" @click="studioActive(item.id)" v-for="(item, index) of studioBottomList" :key="index">
					<image class="studioBottom-top-item-img" :src="item.img" mode=""></image>
					<view :class="studioBottomActive == item.id ? 'studioBottom-top-item-titleAvtive' : 'studioBottom-top-item-title'">{{ item.title }}</view>
				</view>
			</view>
			<view class="studioBottom-top studioBottomTop" v-show="fixTop < 0">
				<view class="studioBottom-top-item" @click="studioActive(item.id)" v-for="(item, index) of studioBottomList" :key="index">
					<image class="studioBottom-top-item-img" :src="item.img" mode=""></image>
					<view :class="studioBottomActive == item.id ? 'studioBottom-top-item-titleAvtive' : 'studioBottom-top-item-title'">{{ item.title }}</view>
				</view>
			</view>
			<view class="studioBottom-bottom">
				<!-- 我的圈子 -->
				<view class="studioBottom-bottom-content-no" v-if="studioBottomActive == 3 && recommendStudio.length == 0">
					<image class="studioBottom-bottom-noimg" src="../../static/img/nocontent.png" mode=""></image>
					<view class="studioBottom-bottom-noimgtitle">暂无相关内容哦~</view>
				</view>
				<view class="studioBottom-bottom-content" v-if="studioBottomActive == 3 && recommendStudio.length !== 0">
					<view class="studioBottom-bottom-content-title">我的推荐</view>
					<view class="studioBottom-bottom-content-title-content">
						<view class="studioBottom-recommendStudio-item" v-for="(item, index) of recommendStudiotop" :key="index" @click="gotoStudio(item.friend_id)">
							<image class="studioBottom-recommendStudio-item-left" :src="item.avatar" mode=""></image>
							<view class="studioBottom-recommendStudio-item-right">
								<view class="studioBottom-recommendStudio-item-title">{{ item.nickname }}</view>
								<view class="studioBottom-recommendStudio-item-right-bottom">
									<image class="studioBottom-recommendStudio-item-right-telimg" src="../../static/img/tel.png" mode=""></image>
									<view class="recommendStudio-item-right-telimg-shu"></view>
									<view class="studioBottom-recommendStudio-item-right-phone">{{ item.mobile }}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="studioBottom-circle-title">我的圈子</view>
					<view class="studioBottom-circle-list" v-for="(item, index) of recommendStudio" :key="index" @click="gotoStudio(item.friend_id)">
						<image class="studioBottom-circle-list-left" :src="item.avatar" mode=""></image>
						<view class="studioBottom-circle-list-right">
							<view class="studioBottom-circle-list-right-top">
								<view class="studioBottom-circle-list-right-top-title">{{ item.nickname }}</view>
								<image class="studioBottom-circle-list-right-top-sex" v-if="item.sex == 2" src="../../static/img/customized_womanicon.png" mode=""></image>
								<image class="studioBottom-circle-list-right-top-sex" v-if="item.sex == 1" src="../../static/img/customized_manicon.png" mode=""></image>
							</view>
							<view class="studioBottom-circle-list-right-bottom">
								<view class="studioBottom-circle-list-right-bottom-seniority">{{ item.role_zh }}</view>
								<view class="studioBottom-circle-list-right-bottom-shu"></view>
								<view class="studioBottom-circle-list-right-bottom-phone">{{ item.mobile }}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 攻略游记 -->
				<view class="studioBottom-bottom-travels" v-show="studioBottomActive == 4">
					<view class="studioBottom-bottom-travels-list" v-for="(item, index) of travels" :key="index" @click="toTraval(item.id)">
						<image class="studioBottom-bottom-travels-list-left" :src="item.cover_image" mode=""></image>
						<view class="studioBottom-bottom-travels-list-right">
							<view class="studioBottom-bottom-travels-list-right-title">{{ item.title }}</view>
							<view class="studioBottom-bottom-travels-list-right-center">
								<view class="studioBottom-bottom-travels-list-right-center-left">
									<image class="travels-list-right-center-left-img" :src="item.author.avatar" mode=""></image>
									<view class="travels-list-right-center-left-name">{{ item.author.nickname }}</view>
									<view class="zai">在</view>
									<view class="travels-list-right-center-left-name">{{ item.destination }}</view>
								</view>
								<view class="studioBottom-bottom-travels-list-right-center-right">
									<image class="travels-list-right-center-right-img" src="../../static/img/fabulous.png" mode=""></image>
									<view class="travels-list-right-center-right-fabulous">{{ item.voted }}</view>
								</view>
							</view>
							<view class="travels-list-right-center-right-word">{{ item.content }}</view>
						</view>
					</view>
				</view>
				<!-- 直播 -->
				<view class="studioBottom-bottom-live" v-show="studioBottomActive == 2">
					<view class="studioBottom-bottom-live-list" v-for="(item, index) of live" :key="index">
						<view v-show="item.status == 1" class="studioBottom-bottom-live-list-labelis">直播中</view>
						<view v-show="item.status == 2" class="studioBottom-bottom-live-list-labellive">已结束</view>
						<view v-show="item.status == 0" class="studioBottom-bottom-live-list-labelok">待开始</view>
						<image class="studioBottom-bottom-live-list-img" :src="item.img" mode=""></image>
					</view>
				</view>
				<!-- 短视频 -->
				<view class="studioBottom-bottom-video" v-show="studioBottomActive == 1">
					<view :key="index" class="studioBottom-bottom-video-list" v-for="(item, index) in video" @click="toVodeo(item.id)">
						<view class="studioBottom-bottom-video-list-top">
							<image class="studioBottom-bottom-video-list-top-img" :src="item.cover_image" mode="widthFix"></image>
							<!-- <video class="studioBottom-bottom-video-list-top-img" :src="item.video" mode="widthFix" objectFit="contain" controls></video> -->
						</view>
						<view class="studioBottom-bottom-video-list-bottom">
							<view class="studioBottom-bottom-video-list-bottom-title">{{ item.title }}</view>
							<view class="studioBottom-bottom-video-list-bottom-bottom">
								<view class="studioBottom-bottom-video-list-bottom-bottom-left">
									<image :src="item.author.avatar" class="studioBottom-bottom-video-list-bottom-bottom-left-img"></image>
									<view class="studioBottom-bottom-video-list-bottom-bottom-right">{{ item.author.truename }}</view>
								</view>
								<view class="studioBottom-bottom-video-list-bottom-bottom-right">
									<image class="studioBottom-bottom-video-list-bottom-bottom-right-img" src="../../static/img/like.png"></image>
									<view class="studioBottom-bottom-video-list-bottom-bottom-right-fabulous">{{ item.favorites_count }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 问答 -->
				<view class="studioBottom-bottom-dialogue" v-show="studioBottomActive == 5">
					<view class="studioBottom-bottom-dialogue-list" v-for="(item, index) of dialogue" :key="index" @click="toQuestion(item.id)">
						<view class="dialogue-list-top">
							<image class="dialogue-list-top-left" :src="item.author.avatar" mode=""></image>
							<view class="dialogue-list-top-right">
								<view class="dialogue-list-top-right-top">
									<view class="dialogue-list-top-right-top-name">{{ item.author.nickname }}</view>
									<view class="dialogue-list-top-right-top-time">{{ item.created_at }}</view>
								</view>
								<view class="dialogue-list-top-right-comment">{{ item.body }}</view>
							</view>
						</view>
						<view class="dialogue-list-bottom" v-for="(items, indexs) of item.answers" :key="indexs">
							<view class="dialogue-list-bottom-top">
								<image class="dialogue-list-bottom-top-left" :src="items.author.avatar" mode=""></image>
								<view class="dialogue-list-bottom-top-right">{{ items.author.nickname }}</view>
							</view>
							<view class="dialogue-list-bottom-word">{{ items.body }}</view>
							<view class="dialogue-list-bottom-time">{{ items.created_at }}</view>
						</view>
					</view>
					<!-- <view class="studioBottom-bottom-dialogue-answer">
						<image class="studioBottom-bottom-dialogue-answer-left" src="../../static/img/answer.png" mode=""></image>
						<view class="studioBottom-bottom-dialogue-answer-right">
							<input class="studioBottom-bottom-dialogue-answer-right-input" type="text" value="" v-model="answer" placeholder="请输入您的回答..." />
						</view>
					</view> -->
				</view>
			</view>
		</view>
		<!--加载loadding-->
		<tui-loadmore :visible="loadding"></tui-loadmore>
		<tui-nomore :visible="!pullUpOn"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>
<script>
import { usersStudio, videos, circles, circle, questions, travels, bindfans } from '@/http/api.js';
import tuiLoadmore from '@/plugins/thorui/components/loadmore/loadmore.vue';
import tuiNomore from '@/plugins/thorui/components/nomore/nomore';
export default {
	components: {
		tuiLoadmore,
		tuiNomore
	},
	data() {
		return {
			id: '', //详情id
			openid: '',
			topnocontent: false, //是否有我的定制师
			pagea: 1,
			pageb: 1,
			pagec: 1,
			paged: 1,
			loadding: false,
			pullUpOn: true,
			studioBottomActive: 1, //按钮选中状态
			answer: '', //回答
			fixTop: '', //区域离顶部的高度
			scrollTop: 0, //滑动条离顶部的距离
			studioBottomList: [
				{
					id: 1,
					img: '../../static/img/video.png',
					title: '短视频'
				},
				// {
				// 	id: 2,
				// 	img: '../../static/img/camera.png',
				// 	title: '直播'
				// },
				{
					id: 3,
					img: '../../static/img/people.png',
					title: '我的圈子'
				},
				{
					id: 4,
					img: '../../static/img/city.png',
					title: '攻略游记'
				},
				{
					id: 5,
					img: '../../static/img/speak.png',
					title: '问答'
				}
			],
			// 问答
			dialogue: [],
			// 短视频
			video: [],
			// 直播
			live: [
				{
					id: 1,
					img: '../../static/img/livea.jpg',
					status: 0
				},
				{
					id: 2,
					img: '../../static/img/liveb.jpg',
					status: 1
				},
				{
					id: 3,
					img: '../../static/img/livec.jpg',
					status: 2
				},
				{
					id: 4,
					img: '../../static/img/lived.jpg',
					status: 1
				}
			],
			// 攻略游记
			travels: [],
			// 我的圈子推荐
			recommendStudiotop: [],
			// 我的圈子
			recommendStudio: [],
			data: {
				user: {
					id: 0,
					supplier_id: 0,
					username: '',
					truename: '',
					mobile: '',
					avatar: '',
					nickname: '',
					sex: 2,
					wx_number: '',
					profile: '',
					rating: '',
					cover_image: '',
					role: '',
					role_zh: '',
					role_type: '',
					is_admin: 0
				},
				trade_number: 0,
				visitor_number: 0,
				service_number: 0,
				play_number: 0,
				plays: [],
				isDis: 0,
				uid: '',
				code: '',
				openid: '',
				userInfo: {}
			}
		};
	},
	onShow() {
		const pages = getCurrentPages();
		const currPage = pages[pages.length - 1]; // 当前页
		wx.hideHomeButton();
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
	onPageScroll(res) {
		wx.createSelectorQuery()
			.select('.studioBottom-top')
			.boundingClientRect(rect => {
				this.fixTop = rect.top;
			})
			.exec();
	},
	onLoad(options) {
		this.id = options.id;
		// this.getList();
		if (options.id) {
			uni.setStorageSync('studio', options.id);
		}
		if (options.isDis && options.isDis == 1) {
			this.isDis = 1;
		}
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
			// if (!uni.getStorageSync('token')) {
			// 	uni.navigateTo({
			// 		url: `/pages/authorizations/authorizations?id=${this.id}&needUserInfo=${1}&needToken=${1}`
			// 	});
			// }
			if (!uni.getStorageSync('userInfo')) {
				uni.navigateTo({
					url: `/pages/authorizations/authorizations?id=${this.id}&needUserInfo=${1}&needToken=${0}`
				});
			}
		} else {
			if (!uni.getStorageSync('userInfo')) {
				uni.navigateTo({
					url: `/pages/authorizations/authorizations?id=${this.id}&needUserInfo=${1}&needToken=${0}`
				});
			}

			// wx.getSetting({
			// 	success: res => {
			// 		//判断是否授权，如果授权成功
			// 		if (res.authSetting['scope.userInfo']) {
			// 			//获取用户信息
			// 			wx.getUserInfo({
			// 				success: res => {
			// 					this.userInfo = res.userInfo;
			// 					uni.setStorageSync('userInfo', res.userInfo);
			// 					this.getDetail();
			// 				}
			// 			});
			// 		} else {
			// 			this.authorizations();
			// 			return;
			// 		}
			// 	}
			// });
		}

		this.getDetail();
		this.videos();
		this.circle();
		this.circles(true);
		this.travelsfn();
		this.questions();
	},
	methods: {
		gotoStudio(friend_id) {
			uni.navigateTo({
				url: '/pages/studio/studio?id=' + friend_id
			});
		},
		tel() {
			wx.makePhoneCall({
				phoneNumber: this.data.user.mobile
			});
		},
		gotolife() {
			wx.pageScrollTo({
				scrollTop: 820,
				duration: 300
			});
		},
		bindfans() {
			bindfans('', this.uid, this.code, this.openid, this.userInfo).then(res => {
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

		// 用户信息
		getDetail() {
			usersStudio(this.id, this.openid).then(res => {
				this.data = res.data;
			});
		},
		// 短视频
		videos() {
			videos(this.pagea, this.id).then(res => {
				this.loadding = true;
				if (res.data.data.length == 0) {
					this.loadding = false;
					this.pullUpOn = false;
					return;
				}
				if (res.data.data.length !== 0) {
					this.loadding = false;
					this.pullUpOn = false;
					this.video = this.video.concat(res.data.data);
					this.pagea++;
					return;
				}
			});
		},
		//我的圈子推荐
		circles(recommend) {
			circles(this.id, recommend).then(res => {
				this.recommendStudiotop = res.data.slice(0, 1);
			});
		},
		// 我的圈子
		circle() {
			circle(this.pageb, this.id).then(res => {
				this.loadding = true;
				if (res.data.data.length == 0) {
					this.loadding = false;
					this.pullUpOn = false;
					return;
				}
				if (res.data.data.length !== 0) {
					this.loadding = false;
					this.pullUpOn = false;
					this.recommendStudio = this.recommendStudio.concat(res.data.data);
					this.pageb++;
					return;
				}
			});
		},
		travelsfn() {
			travels(this.pagec, this.id).then(res => {
				this.loadding = true;
				if (res.data.data.length == 0) {
					this.loadding = false;
					this.pullUpOn = false;
					return;
				}
				if (res.data.data.length !== 0) {
					this.loadding = false;
					this.pullUpOn = false;
					let travelsarr = res.data.data;
					for (let i = 0; i < travelsarr.length; i++) {
						for (let y = 0; y < travelsarr[i].content.length; y++) {
							if (travelsarr[i].content[y].indexOf('http') != -1) {
								travelsarr[i].content.splice(y, 1);
							}
						}
					}
					this.travels = this.travels.concat(travelsarr);
					this.pagec++;
					return;
				}
			});
		},
		// 问答
		questions() {
			questions(this.paged, this.id).then(res => {
				this.loadding = true;
				if (res.data.data.length == 0) {
					this.loadding = false;
					this.pullUpOn = false;
					return;
				}
				if (res.data.data.length !== 0) {
					this.loadding = false;
					this.pullUpOn = false;
					this.dialogue = this.dialogue.concat(res.data.data);
					this.paged++;
					return;
				}
			});
		},
		studioActive(active) {
			this.studioBottomActive = active;
			if (active == 1) {
				this.pagea = 1;
				this.video = [];
				this.videos();
			}
			if (active == 3) {
				this.pageb = 1;
				this.recommendStudio = [];
				this.circle();
			}
			if (active == 4) {
				this.pagec = 1;
				this.travels = [];
				this.travelsfn();
			}
			if (active == 5) {
				this.paged = 1;
				this.dialogue = [];
				this.questions();
			}
		},
		toDetail(id, type) {
			switch (type) {
				case 'hotel':
					uni.navigateTo({
						url: `/pages/details/hotelDetail/hotelDetail?id=${id}&isDis=1`
					});
					break;
				case 'repast':
					uni.navigateTo({
						url: `/pages/details/restaurantDetail/restaurantDetail?id=${id}&isDis=1`
					});
					break;
				case 'sight':
					uni.navigateTo({
						url: `/pages/details/scenicSpotDetail/scenicSpotDetail?id=${id}&isDis=1`
					});
					break;
				case 'homestay':
					uni.navigateTo({
						url: `/pages/details/homestayDetail/homestayDetail?id=${id}&isDis=1`
					});
					break;
				// case 'feature':
				// 	uni.navigateTo({
				// 		url: `/pages/details/otherDetail/otherDetail?id=${id}&isDis=1`
				// 	});
				// 	break;
				case 'specialty':
					uni.navigateTo({
						url: `/pages/details/otherDetail/otherDetail?id=${id}&isDis=1`
					});
					break;
				case 'boutique':
					uni.navigateTo({
						url: `/pages/details/standardDetail/standardDetail?id=${id}&isDis=1`
					});
					break;
			}
		},
		gotoscenicRecommend() {
			uni.navigateTo({
				url: '/pages/scenicRecommend/scenicRecommend?id=' + this.id
			});
		},
		//短视频详情
		toVodeo(id) {
			uni.navigateTo({
				url: '/pages/newDetail/videodetails/videodetails?id=' + id
			});
		},
		//游记详情
		toTraval(id) {
			uni.navigateTo({
				url: '/pages/newDetail/traveldetails/traveldetails?id=' + id
			});
		},
		//问答详情
		toQuestion(id) {
			uni.navigateTo({
				url: '/pages/newDetail/questionsdetails/questionsdetails?id=' + id
			});
		}
	},
	// 页面上拉触底事件的处理函数
	onReachBottom: function() {
		setTimeout(() => {
			if (this.studioBottomActive == 1) {
				this.loadding = false;
				this.pullUpOn = false;
				this.videos();
			}
			if (this.studioBottomActive == 3) {
				this.loadding = false;
				this.pullUpOn = false;
				this.circle();
			}
			if (this.studioBottomActive == 4) {
				this.loadding = false;
				this.pullUpOn = false;
				this.travelsfn();
			}
			if (this.studioBottomActive == 5) {
				this.loadding = false;
				this.pullUpOn = false;
				this.questions();
			}
		}, 1000);
	}
};
</script>

<style>
@import url('studio.css');
</style>
