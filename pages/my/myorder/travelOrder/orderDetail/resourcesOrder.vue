<template>
	<view class="orderDetail">
		<!-- 倒计时 -->
		<view class="toptime" v-if="data.status_zh == '待支付'">
			<image src="../../../../../static/img/time_icon.png" mode=""></image>
			<view class="timetext">请在{{ min }}:{{ miao }}内完成支付</view>
		</view>
		<view class="toptimeok" v-if="data.status_zh == '预约中'">等待服务商确认...</view>
		<!-- 订单编号 -->
		<!-- <view class="ordertop">
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
		</view> -->
		<view class="orderlist_item">
			<view class="orderlist_item_bottom">
				<view class="orderlist_item_bottom_top">
					<view class="orderlist_item_bottom_top_left">订单号：{{ data.number || '' }}</view>
					<view class="orderlist_item_bottom_top_right">{{ data.status_zh }}</view>
				</view>
				<view class="orderlist_item_bottom_bottom">
					<view class="orderlist_itemcon">
						<image :src="data.product.cover_image" class="orderlist_itemcon_left" mode=""></image>
						<view class="orderlist_itemcon_right">
							<view class="orderlist_itemcon_right_name">{{ data.title || '' }}</view>
							<view class="specifications" v-if="data.product.exts.length > 0 && data.type == 'specialty'">
								{{ data.product.exts[0].field || '' }}/{{ data.product.exts[0].value || '' }}
							</view>
							<view class="specifications" v-if="data.type == 'hotel' || data.type == 'homestay'">{{ data.product.child[0].title }}</view>
							<view class="specifications" v-show="data.type == 'sight'">{{ data.address }}</view>
							<!-- <view class="orderlist_itemcon_right_moneya" v-if="data.type_zh == '酒店' || data.type_zh == '民宿'">
								<view class="item_moneytop_left_lefta">￥</view>
								<view class="item_moneytop_left_centera">{{ data.product.child[0].price }}</view>
								<view class="item_moneytop_left_righta">/间/晚</view>
							</view> -->
							<view class="orderlist_itemcon_right_money" v-if="data.type != 'hotel' && data.type != 'homestay'">
								<view class="item_moneytop_left_left">￥{{ data.product.amount }}</view>
								<view class="item_moneytop_left_right">X{{ data.product.quantity }}</view>
							</view>
						</view>
					</view>
					<view class="item_fly">
						共{{ data.product.quantity || 0 }}件商品
						<view class="item_fly_left">总计：</view>
						<view class="money">￥</view>
						<view class="item_fly_right">{{ data.amount }}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 酒店信息 -->
		<view class="hotelitem" v-if="data.type == 'hotel' || data.type == 'homestay'">
			<view class="hotelitem_top">
				<view class="hotelitem_top_left" v-if="data.type == 'hotel'">酒店信息</view>
				<view class="hotelitem_top_left" v-if="data.type == 'homestay'">民宿信息</view>
				<view class="hotelitem_top_right" @click="look(true)">
					<image src="../../../../../static/img/tips.png" class="hotelitem_top_right_img" mode=""></image>
					<view class="hotelitem_top_right_text">每晚明细</view>
				</view>
			</view>
			<view class="hotelitem_list">
				<view class="hotelitem_list_left">房型</view>
				<view class="hotelitem_list_right">{{ data.product.builtuparea }}{{ data.product.bed_type }}{{ data.product.capacity }}</view>
			</view>
			<view class="hotelitem_list">
				<view class="hotelitem_list_left">入住日期</view>
				<view class="hotelitem_list_right">{{ data.start_date.slice(5, 7) }}月{{ data.start_date.slice(8, 10) }}日</view>
			</view>
			<view class="hotelitem_list">
				<view class="hotelitem_list_left">离店日期</view>
				<view class="hotelitem_list_right">{{ data.end_date.slice(5, 7) }}月{{ data.end_date.slice(8, 10) }}日</view>
			</view>
			<view class="hotelitem_list">
				<view class="hotelitem_list_left">酒店数量</view>
				<view class="hotelitem_list_right">{{ data.quantity }}间 | {{ data.product.child.length }}晚</view>
			</view>
		</view>
		<!-- 入住人信息 -->
		<view class="checkDetail" v-if="data.type == 'hotel' || data.type == 'homestay'">
			<view class="checkDetail_top">入住人信息</view>
			<view class="checkDetail_list" v-for="(item, index) in data.supplement.check_in_names" :key="index">
				<view class="checkDetail_list_left">房间{{ index + 1 }}</view>
				<view class="checkDetail_list_right">{{ item }}</view>
			</view>
			<view class="checkDetail_list">
				<view class="checkDetail_list_left">手机号</view>
				<view class="checkDetail_list_right">{{ data.contact_phone }}</view>
			</view>
		</view>
		<!-- 订单详情 -->
		<view class="ordercontent">
			<!-- 联系供应商 -->
			<!-- <view class="ordercontent_top">
				<view class="ordercontent_top_left">
					<image :src="data.seller.avatar" mode=""></image>
					<view class="ordercontent_top_left_name">{{ data.seller.truename }}</view>
				</view>
				<view class="ordercontent_top_right" @click="tel">联系TA</view>
			</view> -->
			<view class="ordercontent_bottom">
				<view class="ordercontent_bottom_title">订单信息</view>
				<view class="ordercontent_bottom_item" v-if="data.type == 'sight' || data.type == 'repast' || data.type == 'hotel' || data.type == 'homestay'">
					<view class="ordercontent_bottom_item_left">订单编号</view>
					<view class="ordercontent_bottom_item_right">{{ data.number || '' }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type == 'sight' || data.type == 'repast' || data.type == 'hotel' || data.type == 'homestay'">
					<view class="ordercontent_bottom_item_left">创建时间</view>
					<view class="ordercontent_bottom_item_right">{{ data.created_at.slice(0, 10) }}</view>
				</view>

				<!-- <view class="ordercontent_bottom_item" v-if="data.type_zh == '景点'">
					<view class="ordercontent_bottom_item_left">景点价格</view>
					<view class="ordercontent_bottom_item_right">￥{{ data.product.amount }}*{{ data.product.quantity }}</view>
				</view> -->
				<!-- <view class="ordercontent_bottom_item" v-if="data.type_zh == '用餐'">
					<view class="ordercontent_bottom_item_left">用餐价格</view>
					<view class="ordercontent_bottom_item_right">￥{{ data.product.amount }}*{{ data.product.quantity }}</view>
				</view> -->
				<!-- <view class="ordercontent_bottom_item" v-if="data.type_zh == '酒店' || data.type_zh == '民宿'">
					<view class="ordercontent_bottom_item_left">房型</view>
					<view class="ordercontent_bottom_item_right">{{ data.product.child[0].title }}</view>
				</view> -->
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
				<!-- <view class="ordercontent_bottom_item" v-if="data.type_zh == '酒店' || data.type_zh == '民宿'">
					<view class="ordercontent_bottom_item_left">民宿价格</view>
					<view class="ordercontent_bottom_item_right">
						￥{{ data.product.child[0].price }}*{{ data.product.child[0].quantity1 }}*{{ data.product.child[0].quantity2 }}
					</view>
				</view> -->
				<view class="ordercontent_bottom_item" v-if="data.type == 'tour-group' || data.type == 'tour-surround'">
					<view class="ordercontent_bottom_item_left">出发时间</view>
					<view class="ordercontent_bottom_item_right">{{ data.product.child[0].travel_date }} {{ data.product.child[0].week_zh }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type == 'tour-group' || data.type == 'tour-surround'">
					<view class="ordercontent_bottom_item_left">线路价格</view>
					<view class="ordercontent_bottom_item_right">￥{{ data.product.child[0].price }}*{{ data.product.quantity }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type == 'specialty'">
					<view class="ordercontent_bottom_item_left">联系人</view>
					<view class="ordercontent_bottom_item_right">{{ data.contact }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type == 'specialty'">
					<view class="ordercontent_bottom_item_left">联系方式</view>
					<view class="ordercontent_bottom_item_right">{{ data.contact_phone }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type == 'specialty'">
					<view class="ordercontent_bottom_item_left">地址</view>
					<view class="ordercontent_bottom_item_right">{{ data.contact_address }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type == 'specialty'">
					<view class="ordercontent_bottom_item_left">下单时间</view>
					<view class="ordercontent_bottom_item_right">{{ data.created_at.slice(0, 10) }}</view>
				</view>
				<view class="ordercontent_bottom_item" v-if="data.type == 'specialty'">
					<view class="ordercontent_bottom_item_left">特产资源价格</view>
					<view class="ordercontent_bottom_item_right">￥{{ data.product.price }}*{{ data.product.quantity }}</view>
				</view>
			</view>
		</view>
		<!-- 酒店订单明细 -->
		<view class="detailed" v-if="islook">
			<view class="detailed_con">
				<view class="detailed_con_top">
					<view class="detailed_con_top_title">每晚明细</view>
					<view class="detailed_con_top_item" v-for="(item, index) in data.product.child" :key="index">
						<view class="detailed_con_top_item_left">{{ item.checkin_date.slice(5, 7) }}月{{ item.checkin_date.slice(8, 10) }}日</view>
						<view class="detailed_con_top_item_right">{{ data.quantity }}间*￥{{ data.product.child[index].price }}</view>
					</view>
					<view class="detailed_con_top_bottom">
						<view class="detailed_con_top_bottom_con">
							<view class="detailed_con_top_bottom_con_left">{{ data.product.child.length }}晚，{{ data.quantity }}间共</view>
							<view class="detailed_con_top_bottom_con_right">￥{{ data.amount }}</view>
						</view>
					</view>
				</view>
				<image src="../../../../../static/img/circleFork.png" @click="look(false)" class="detailed_con_close" mode=""></image>
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
			amount: '',
			islook: false,
			id: 0,
			active: 1,
			show: false,
			data: {},
			isclick: true,
			min: 60,
			miao: 0,
			datalist: [
				{
					name: '张晓文'
				},
				{
					name: '严小雨'
				}
			],
			detailed: [
				{
					date: '03月01日'
				},
				{
					date: '03月01日'
				}
			]
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
		//查看明细
		look(islook) {
			this.islook = islook;
		},
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
				this.amount = res.data.amount;
				if (this.data.status_zh == '待支付') {
					this.date();
				}
			});
		},
		gopay() {
			if (!this.isclick) {
				return;
			}
			this.isclick = false;
			payWechat(this.id, uni.getStorageSync('openid')).then(res1 => {
				this.isclick = false;
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
