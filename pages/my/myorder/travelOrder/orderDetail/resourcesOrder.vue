<template>
	<view class="orderDetail">
		<!-- 倒计时 -->
		<view class="toptime" v-if="data.status_zh == '待支付'">
			<image src="../../../../../static/img/time_icon.png" mode=""></image>
			<view class="timetext">请在{{ min }}:{{ miao }}内完成支付</view>
		</view>
		<view class="toptimeok" v-if="data.status_zh == '预约中'">等待服务商确认...</view>
		<!-- 订单编号 -->
		<view class="ordertop">
			<view class="ordertop_top">
				<view class="ordertop_top_name">{{ data.title }}</view>
				<view class="ordertop_top_right">{{ data.status_zh }}</view>
			</view>
			<view class="ordertop_bottom">
				<view class="ordertop_bottom_left">订单号：{{ data.number || '' }}</view>
				<view class="ordertop_bottom_right">
					<view class="ordertop_bottom_right_moneyicon">￥</view>
					<view class="ordertop_bottom_right_moneynum">{{ data.amount }}</view>
				</view>
			</view>
		</view>
		<!-- 订单详情 -->
		<view class="ordercontent">
			<view class="ordercontent_top">
				<view class="ordercontent_top_left">
					<image :src="data.seller.avatar" mode=""></image>
					<view class="ordercontent_top_left_name">{{ data.seller.truename }}</view>
				</view>
				<view class="ordercontent_top_right" @click="tel">联系TA</view>
			</view>
			<view class="ordercontent_bottom">
				<view class="ordercontent_bottom_item" v-if="data.type_zh == '景点' || data.type_zh == '用餐'">
					<view class="ordercontent_bottom_item_left">下单时间</view>
					<view class="ordercontent_bottom_item_right">{{ data.created_at.slice(0, 10) }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type_zh == '景点'">
					<view class="ordercontent_bottom_item_left">景点价格</view>
					<view class="ordercontent_bottom_item_right">￥{{ data.product.amount }}*{{ data.product.quantity }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type_zh == '用餐'">
					<view class="ordercontent_bottom_item_left">用餐价格</view>
					<view class="ordercontent_bottom_item_right">￥{{ data.product.amount }}*{{ data.product.quantity }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type_zh == '酒店' || data.type_zh == '民宿'">
					<view class="ordercontent_bottom_item_left">房型</view>
					<view class="ordercontent_bottom_item_right">{{ data.product.child[0].title }}</view>
				</view>
				<!-- <view class="ordercontent_bottom_item" v-if="data.type_zh == '酒店'">
					<view class="ordercontent_bottom_item_left">入住日期</view>
					<view class="ordercontent_bottom_item_right">{{ data.start_date }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type_zh == '酒店'">
					<view class="ordercontent_bottom_item_left">离店日期</view>
					<view class="ordercontent_bottom_item_right">{{ data.start_date }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type_zh == '酒店'">
					<view class="ordercontent_bottom_item_left">酒店价格</view>
					<view class="ordercontent_bottom_item_right">{{ data.start_date }}</view>
				</view> -->
				<view class="ordercontent_bottom_item" v-if="data.type_zh == '酒店' || data.type_zh == '民宿'">
					<view class="ordercontent_bottom_item_left">民宿价格</view>
					<view class="ordercontent_bottom_item_right">
						￥{{ data.product.child[0].price }}*{{ data.product.child[0].quantity1 }}*{{ data.product.child[0].quantity2 }}
					</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type_zh == '特产'">
					<view class="ordercontent_bottom_item_left">联系人</view>
					<view class="ordercontent_bottom_item_right">{{ data.contact }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type_zh == '特产'">
					<view class="ordercontent_bottom_item_left">联系方式</view>
					<view class="ordercontent_bottom_item_right">{{ data.contact_phone }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type_zh == '特产'">
					<view class="ordercontent_bottom_item_left">地址</view>
					<view class="ordercontent_bottom_item_right">{{ data.contact_address }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type_zh == '特产'">
					<view class="ordercontent_bottom_item_left">下单时间</view>
					<view class="ordercontent_bottom_item_right">{{ data.created_at.slice(0, 10) }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type_zh == '特产'">
					<view class="ordercontent_bottom_item_left">特产资源价格</view>
					<view class="ordercontent_bottom_item_right">￥{{ data.product.price }}*{{ data.product.quantity }}</view>
				</view>
			</view>
		</view>
		<!-- 订单支付按钮 -->
		<view class="orderbottom" v-if="data.status_zh == '待支付'">
			<view class="orderbottom_left" @click="ordersCancel()">取消订单</view>
			<view class="orderbottom_right" @click="gopay()">立即支付</view>
		</view>
		<view class="orderbottomno" v-if="data.status_zh == '预约中'" @click="ordersCancel()">取消预约</view>
		<!-- 确认提示框 -->
		<popupok :show="show" v-on:isokfn="isok"></popupok>
	</view>
</template>

<script>
import { ordersDetail, payWechat, ordersCancel } from '@/http/api.js';
import popupok from '@/pages/components/popupok/popupok.vue';
export default {
	data() {
		return {
			id: 0,
			active: 1,
			show: false,
			data: {},
			isclick: true,
			min: 60,
			miao: 0
		};
	},
	components: {
		popupok
	},
	onShow() {
		wx.hideHomeButton();
	},
	onLoad(options) {
		this.id = options.id;
		this.ordersDetail();
	},
	methods: {
		isok(isokfn) {
			console.log(isokfn);
			if (!isokfn) {
				this.show = isokfn;
			} else {
				ordersCancel({ id: this.data.id }).then(res => {
					this.show = false;
					uni.showToast({
						icon: 'none',
						title: '订单已取消'
					});
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/my/myIndex/myIndex'
						});
					}, 1000);
				});
			}
		},
		tel() {
			wx.makePhoneCall({
				phoneNumber: this.data.seller.mobile
			});
		},
		date() {
			setInterval(() => {
				var nowalldate = this.data.auto_close_time;
				// var nowalldatea = this.data.auto_close_time.replace(/-/g, ',');
				// var nowalldateb = nowalldatea.replace(/:/g, ',');
				// var nowalldatec = nowalldateb.replace(/ /g, ',');
				// var nowalldated = '2020' + nowalldatec.slice(4, 20).replace(/0/g, '');
				var Year = nowalldate.slice(0, 4);
				var Month = nowalldate.slice(5, 7);
				var Datea = nowalldate.slice(9, 11);
				var Hoursa = nowalldate.slice(11, 13);
				var Mina = nowalldate.slice(14, 16);
				var Secondsa = nowalldate.slice(17, 19);
				if (Month.slice(0, 1) == 0) {
					Month = Month.slice(1, 2);
				}
				if (Datea.slice(0, 1) == 0) {
					Datea = Datea.slice(1, 2);
				}
				if (Hoursa.slice(0, 1) == 0) {
					Hoursa = Hoursa.slice(1, 2);
				}
				if (Mina.slice(0, 1) == 0) {
					Mina = Mina.slice(1, 2);
				}
				if (Secondsa.slice(0, 1) == 0) {
					Secondsa = Secondsa.slice(1, 2);
				}
				// console.log(nowalldate);
				//创建时间（现在）
				var nowDate = new Date();
				//2018年时间对象
				var nextDate = new Date(Year, Month, Datea, Hoursa, Mina, Secondsa);
				//获取两个时间点 距离1970.0.1的时间（毫秒数）
				var nowTime = nowDate.getTime();
				var nextTime = nextDate.getTime();
				//根据差值可以计算出 现在距离2018年的毫秒数 进而计算出秒数（毫秒数/1000）
				var dSecond = parseInt((nextTime - nowTime) / 1000);
				//通过现在距离2018年的秒数求出天数（秒数/24*60*60）
				var dDay = parseInt(dSecond / (24 * 60 * 60));
				//通过现在距离2018年的秒数取余 求出 去掉天数剩下的秒数
				var reSecond = dSecond % (24 * 60 * 60);
				//通过计算完剩下的秒数  求出小时数
				var dHour = parseInt(reSecond / 3600);
				//通过计算小时 剩下的秒数 求分钟数
				var reSecond1 = reSecond % 3600;
				var dMinute = parseInt(reSecond1 / 60);
				this.min = dMinute;
				//通过计算分钟数 剩下的秒数  就是我们想要的描述
				var nowSecond = reSecond1 % 60;
				this.miao = nowSecond;
			}, 1000);
		},
		ordersDetail() {
			ordersDetail({ id: this.id }).then(res => {
				this.data = res.data;
				if (this.data.status_zh == '待支付') {
					this.date();
				}
			});
		},
		gopay() {
			this.isclick = false;
			payWechat(this.id, uni.getStorageSync('openid')).then(res1 => {
				this.isclick = true;
				if (res1.code == 0) {
					this.pay(res1.data);
				}
			});
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
						uni.redirectTo({
							url: '/pages/my/myIndex/myIndex'
						});
					}, 1000);
				}
			});
		},
		ordersCancel() {
			this.show = true;
		}
	}
};
</script>

<style>
@import url('resourcesOrder');
</style>
