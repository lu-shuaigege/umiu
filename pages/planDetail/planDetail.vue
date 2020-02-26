<template>
	<view class="planDetail">
		<view class="planDetail_banner">
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item, index) in list.images" :key="index"><image :src="item" mode="aspectFill"></image></swiper-item>
			</swiper>
		</view>
		<view class="planDetail_con">
			<luBarTabNav :tabList="tabList" :barFixed="barFixed" :barHeight="barHeight" :barTop="barTop" :barId="barId" ref="barTabNav">
				<view id="item1" class="tabbody">
					<view class="first_top">
						<view class="title">
							<text class="t">{{ list.title }}</text>
							<view class="r">
								<image src="/static/img/biaoqian_bg.png" mode=""></image>
								<text>{{ list.last_days }}天行程</text>
							</view>
						</view>
						<view class="con">
							<view class="top">
								出发地:
								<image src="/static/img/feiji.png" mode=""></image>
								途径地:
								<image src="/static/img/feiji.png" mode=""></image>
								返程地:
							</view>
							<view class="ud">
								<text class="city1">{{ list.departure }}</text>
								<text class="city2" v-if="list.midway">{{ list.midway }}</text>
								<text class="city3">{{ list.destination }}</text>
							</view>
						</view>
					</view>
					<view class="first_tip" v-if="list.tip_info">
						<text>行程亮点：</text>
						<view>{{ list.tip_info }}</view>
					</view>
				</view>
				<view id="item2" class="tabbody">
					<view class="tabbody_title">
						<text></text>
						行程概览
						<text></text>
					</view>
					<view class="second_map"><image mode="widthFix" :src="list.overview_image"></image></view>
					<view class="second_travels">
						<block v-for="(item, index) in list1.travels" :key="index">
							<tui-collapse :index="index" :current="item.id" translateY="0" @click="change">
								<template v-slot:title>
									<view class="travels_title">
										<view class="l">D{{ index + 1 }}</view>
										<view class="t">{{ item.departure }} - {{ item.destination }}</view>
									</view>
								</template>
								<template v-slot:content>
									<view class="tui-content">
										<view class="travels_time" v-if="item.havm == 1">上午</view>
										<!-- 上午交通 -->
										<view class="travels_con" v-if="item.traffic_morning">
											<view class="one">
												<view class="l">
													<image src="/static/img/icon_bus.png" mode=""></image>
													<view>交通</view>
													<text></text>
												</view>
												<view class="r bus">{{ item.traffic_morning }}</view>
											</view>
										</view>
										<!-- 上午交通 -->
										<!-- 上午资源 -->
										<view class="travels_con" v-for="item1 in item.items" :key="item1" v-if="item1.time == 'morning'">
											<!-- <view class="one" v-if="item1.resource_type == 'sight'||item1.resource_type == 'repast'||item1.resource_type == 'feature'"> -->
											<view class="one">
												<view class="l">
													<image src="/static/img/icon_jingdian.png" mode="" v-if="item1.resource_type == 'sight'"></image>
													<view v-if="item1.resource_type == 'sight'">景点</view>
													<image v-if="item1.resource_type == 'repast'" src="/static/img/icon_canyin.png" mode=""></image>
													<view v-if="item1.resource_type == 'repast'">用餐</view>
													<image v-if="item1.resource_type == 'feature'" src="/static/img/icon_tese.png" mode=""></image>
													<view v-if="item1.resource_type == 'feature'">特色</view>
													<image v-if="item1.resource_type == 'hotel'" src="/static/img/icon_jingdian.png" mode=""></image>
													<view v-if="item1.resource_type == 'hotel'">酒店</view>
													<image v-if="item1.resource_type == 'homestay'" src="/static/img/icon_jingdian.png" mode=""></image>
													<view v-if="item1.resource_type == 'homestay'">民宿</view>
													<text></text>
												</view>
												<view class="r sight">
													<view class="up" @click="toDetail(item1.id, item1.resource_type)">
														<image class="img" :src="item1.resource_image" mode=""></image>
														<view class="p">
															<view class="title">{{ item1.resource_title }}</view>
															<view class="con" v-if="item1.resource_description">{{ item1.resource_description }}</view>
														</view>
													</view>
													<view class="hotel_list" v-if="item1.resource_child.length">
														<view class="title" @click="change1(item1.id)">
															<text>房间信息</text>
															<image v-if="isopen.indexOf(item1.id) == -1" src="/static/img/plan_ud.png" mode=""></image>
															<image v-if="isopen.indexOf(item1.id) !== -1" src="/static/img/plan_up.png" mode=""></image>
														</view>
														<view class="con" v-for="(item2, index2) in item1.resource_child" :key="index2" v-if="isopen.indexOf(item1.id) !== -1">
															<view class="listone">
																<view class="first">
																	<text class="l1">精致大床房</text>
																	<text class="r1">x1</text>
																</view>
																<view class="second">
																	{{ item2.builtuparea }} &emsp; {{ item2.bed_type }} &emsp; {{ item2.capacity }}入住 &emsp; {{ item2.breakfast }}
																</view>
																<view class="second">入住：{{ item2.check_in_date }} &emsp;&emsp; 离店：{{ item2.departure_date }}</view>
															</view>
														</view>
													</view>
													<view class="ud" v-if="item1.remark">{{ item1.remark }}</view>
												</view>
											</view>
										</view>
										<!-- 上午资源 -->
									</view>
									<view class="tui-content">
										<view class="travels_time" v-if="item.hava == 1">下午</view>
										<view class="travels_con" v-for="item1 in item.items" :key="item1" v-if="item1.time == 'afternoon'">
											<view class="one">
												<view class="l">
													<image src="/static/img/icon_jingdian.png" mode="" v-if="item1.resource_type == 'sight'"></image>
													<view v-if="item1.resource_type == 'sight'">景点</view>
													<image v-if="item1.resource_type == 'repast'" src="/static/img/icon_canyin.png" mode=""></image>
													<view v-if="item1.resource_type == 'repast'">用餐</view>
													<image v-if="item1.resource_type == 'feature'" src="/static/img/icon_tese.png" mode=""></image>
													<view v-if="item1.resource_type == 'feature'">特色</view>
													<image v-if="item1.resource_type == 'hotel'" src="/static/img/icon_jingdian.png" mode=""></image>
													<view v-if="item1.resource_type == 'hotel'">酒店</view>
													<image v-if="item1.resource_type == 'homestay'" src="/static/img/icon_jingdian.png" mode=""></image>
													<view v-if="item1.resource_type == 'homestay'">民宿</view>
													<text></text>
												</view>
												<view class="r sight">
													<view class="up" @click="toDetail(item1.id, item1.resource_type)">
														<image class="img" :src="item1.resource_image" mode=""></image>
														<view class="p">
															<view class="title">{{ item1.resource_title }}</view>
															<view class="con" v-if="item1.resource_description">{{ item1.resource_description }}</view>
														</view>
													</view>
													<view class="hotel_list" v-if="item1.resource_child.length">
														<view class="title" @click="change1(item1.id)">
															<text>房间信息</text>
															<image v-if="isopen.indexOf(item1.id) == -1" src="/static/img/plan_ud.png" mode=""></image>
															<image v-if="isopen.indexOf(item1.id) !== -1" src="/static/img/plan_up.png" mode=""></image>
														</view>
														<view class="con" v-for="(item2, index2) in item1.resource_child" :key="index2" v-if="isopen.indexOf(item1.id) !== -1">
															<view class="listone">
																<view class="first">
																	<text class="l1">精致大床房</text>
																	<text class="r1">x1</text>
																</view>
																<view class="second">
																	{{ item2.builtuparea }}&emsp;{{ item2.bed_type }}&emsp;{{ item2.capacity }}入住&emsp;{{ item2.breakfast }}
																</view>
																<view class="second">入住：{{ item2.check_in_date }} &emsp;&emsp; 离店：{{ item2.departure_date }}</view>
															</view>
														</view>
													</view>
													<view class="ud" v-if="item1.remark">{{ item1.remark }}</view>
												</view>
											</view>
										</view>
									</view>
									<view class="tui-content">
										<view class="travels_time" v-if="item.have == 1">晚上</view>
										<view class="travels_con" v-for="item1 in item.items" :key="item1" v-if="item1.time == 'evening'">
											<view class="one">
												<view class="l">
													<image src="/static/img/icon_jingdian.png" mode="" v-if="item1.resource_type == 'sight'"></image>
													<view v-if="item1.resource_type == 'sight'">景点</view>
													<image v-if="item1.resource_type == 'repast'" src="/static/img/icon_canyin.png" mode=""></image>
													<view v-if="item1.resource_type == 'repast'">用餐</view>
													<image v-if="item1.resource_type == 'feature'" src="/static/img/icon_tese.png" mode=""></image>
													<view v-if="item1.resource_type == 'feature'">特色</view>
													<image v-if="item1.resource_type == 'hotel'" src="/static/img/icon_jingdian.png" mode=""></image>
													<view v-if="item1.resource_type == 'hotel'">酒店</view>
													<image v-if="item1.resource_type == 'homestay'" src="/static/img/icon_jingdian.png" mode=""></image>
													<view v-if="item1.resource_type == 'homestay'">民宿</view>
													<text></text>
												</view>
												<view class="r sight">
													<view class="up" @click="toDetail(item1.id, item1.resource_type)">
														<image class="img" :src="item1.resource_image" mode=""></image>
														<view class="p">
															<view class="title">{{ item1.resource_title }}</view>
															<view class="con" v-if="item1.resource_description">{{ item1.resource_description }}</view>
														</view>
													</view>
													<view class="hotel_list" v-if="item1.resource_child.length">
														<view class="title" @click="change1(item1.id)">
															<text>房间信息</text>
															<image v-if="isopen.indexOf(item1.id) == -1" src="/static/img/plan_ud.png" mode=""></image>
															<image v-if="isopen.indexOf(item1.id) !== -1" src="/static/img/plan_up.png" mode=""></image>
														</view>
														<view class="con" v-for="(item2, index2) in item1.resource_child" :key="index2" v-if="isopen.indexOf(item1.id) !== -1">
															<view class="listone">
																<view class="first">
																	<text class="l1">精致大床房</text>
																	<text class="r1">x1</text>
																</view>
																<view class="second">
																	{{ item2.builtuparea }} &emsp; {{ item2.bed_type }} &emsp; {{ item2.capacity }}入住 &emsp; {{ item2.breakfast }}
																</view>
																<view class="second">入住：{{ item2.check_in_date }} &emsp;&emsp; 离店：{{ item2.departure_date }}</view>
															</view>
														</view>
													</view>
													<view class="ud" v-if="item1.remark">{{ item1.remark }}</view>
												</view>
											</view>
										</view>
									</view>
								</template>
							</tui-collapse>
						</block>
					</view>
				</view>
				<view id="item3" class="tabbody">
					<view class="tabbody_title">
						<text></text>
						报价列表
						<text></text>
					</view>
					<view class="price_title">费用包含</view>
					<view class="price_resource">
						<view class="price_resource_one" v-for="(item, index) in list.quotation.resource" :key="index">
							<view class="top">
								<text class="title">{{ item.resource_type_zh }}</text>
								<view class="price" v-if="list.is_price_visible == 1">
									<text>¥{{ item.total_fee }}</text>
								</view>
							</view>
						</view>
						<view class="price_resource_one">
							<view class="top">
								<text class="title">其他费用</text>
								<view class="price" v-if="list.is_price_visible == 1">
									<text>¥{{ list.quotation.other_fee }}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="price_title">费用不包含</view>
					<view class="price_resource">
						<view class="price_resource_one">
							<view class="top">
								<text class="title">{{ list.quotation.not_included }}</text>
							</view>
						</view>
					</view>
					<view class="price_bottom">
						<text class="a">总计：</text>
						<text class="b">￥{{ list.quotation.total_fee }}</text>
					</view>
				</view>
			</luBarTabNav>
		</view>
		<view class="popup" v-if="popup">
			<view class="popup_content">
				<view class="popup_content_title">
					确定该定制师的行程报价内容后，
					<br />
					该定制师将为您确认报价资源，并且
					<br />
					将不再接收其他定制师的行程和报价。
				</view>
				<view class="popup_content_bottom">
					<view class="popup_content_bottom_left" @click="nook">取消</view>
					<view class="popup_content_bottom_right" @click="ok">确定</view>
				</view>
			</view>
		</view>
		<view class="bottom_btn" @click="popupfn" v-if="isgid">确认行程</view>
	</view>
</template>

<script>
import { plans, grabs } from '@/http/api.js';
import luBarTabNav from '@/plugins/lu-bar-tab-nav/lu-bar-tab-nav.vue';
import tuiCollapse from '@/plugins/thorui/components/tui-collapse/tui-collapse.vue';
export default {
	components: {
		luBarTabNav,
		tuiCollapse
	},
	data() {
		return {
			popup: false,
			id: '',
			isgid: false,
			gid: '',
			list: [],
			list1: [],
			scrollTop: 0,
			barFixed: true,
			barHeight: '38',
			barTop: 0,
			isopen: [],
			tabList: [
				{
					text: '基础信息',
					navTarget: '#item1'
				},
				{
					text: '行程概览',
					navTarget: '#item2'
				},
				{
					text: '报价列表',
					navTarget: '#item3'
				}
			]
		};
	},
	onShow() {
		wx.hideHomeButton();
	},
	onLoad(options) {
		if (options.id) {
			this.id = options.id;
		}
		if (options.gid) {
			this.gid = options.gid;
			this.isgid = true;
		}
		uni.showToast({
			icon: 'none',
			title: this.id
		});
		uni.showToast({
			icon: 'none',
			title: this.gid
		});
		if (getCurrentPages().length == 1) {
			// wx.getSetting({
			// 	success: res => {
			// 		//判断是否授权，如果授权成功
			// 		if (res.authSetting['scope.userInfo']) {
			// 			//获取用户信息
			// 			wx.getUserInfo({
			// 				success: res => {
			// 					this.userInfo = res.userInfo;
			// 				}
			// 			});
			// 		} else {
			// 			uni.navigateTo({
			// 				url: '/pages/login/login?id=' + this.id
			// 			});
			// 			return;
			// 		}
			// 	}
			// });
			if (!uni.getStorageSync('token')) {
				uni.navigateTo({
					url: '/pages/login/login?id=' + this.id + '&gid=' + this.gid
				});
				return;
			}
		}
		this.getDetail(this.id);
	},
	methods: {
		popupfn() {
			this.popup = true;
		},
		nook() {
			this.popup = false;
		},
		ok() {
			this.popup = false;
			grabs(this.gid).then(res => {
				uni.showToast({
					icon: 'none',
					title: res.msg
				});
			});
		},
		change(e) {
			let index = e.index;
			console.log(e.index);
			let item = this.list.travels[index];
			item.id = item.id == index ? -1 : index;
		},
		change1(id) {
			if (this.isopen.indexOf(id) == -1) {
				this.isopen.push(id);
			} else {
				this.isopen.splice(this.isopen.findIndex(i => i === id), 1);
			}
		},
		getDetail(id) {
			plans(id).then(res => {
				this.list = res.data;
				for (let i = 0; i < this.list.travels.length; i++) {
					this.list.travels[i].havm = 0;
					this.list.travels[i].hava = 0;
					this.list.travels[i].have = 0;
					for (let j = 0; j < this.list.travels[i].items.length; j++) {
						if (this.list.travels[i].items[j].time.indexOf('morning') !== -1) {
							this.list.travels[i].havm = 1;
						}
						if (this.list.travels[i].items[j].time.indexOf('afternoon') !== -1) {
							this.list.travels[i].hava = 1;
						}
						if (this.list.travels[i].items[j].time.indexOf('evening') !== -1) {
							this.list.travels[i].have = 1;
						}
					}
				}
				this.list1 = this.list;
			});
		},
		toDetail(id, type) {
			console.log(id, type);
			console.log(type == 'hotel');
			console.log(type == 'hotel');
			if (type == 'hotel') {
				uni.navigateTo({
					url: '/pages/details/hotelDetail/hotelDetail?id=' + id
				});
			}
			if (type == 'sight') {
				uni.navigateTo({
					url: '/pages/details/scenicSpotDetail/scenicSpotDetail?id=' + id
				});
			}
			if (type == 'repast') {
				uni.navigateTo({
					url: '/pages/details/restaurantDetail/restaurantDetail?id=' + id
				});
			}
			if (type == 'homestay') {
				uni.navigateTo({
					url: '/pages/details/homestayDetail/homestayDetail?id=' + id
				});
			}
			if (type == 'feature') {
				uni.navigateTo({
					url: '/pages/details/otherDetail/otherDetail?id=' + id
				});
			}
		}
	},
	//页面滚动执行方式
	onPageScroll: function(e) {
		this.$refs.barTabNav._selectedTab(e.scrollTop);
	}
};
</script>

<style>
@import url('planDetail.css');
</style>
