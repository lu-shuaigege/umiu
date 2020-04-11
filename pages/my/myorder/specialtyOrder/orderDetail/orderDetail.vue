<template>
	<view class="orderDetail">
		<view class="detailtop">
			<view class="detailtop_left" v-if="data.status_zh == '待支付'">等待买家付款</view>
			<view class="detailtop_left" v-if="data.status_zh == '待发货'">等待供应商发货</view>
			<view class="detailtop_left" v-if="data.status_zh == '预约中'">订单预约中</view>
			<view class="detailtop_left" v-if="data.status_zh == '已完成'">订单已完成</view>
			<view class="detailtop_left" v-if="data.status_zh == '已取消'">订单已取消</view>
		</view>
		<view class="topcon">
			<image src="../../../../../static/img/orderlist_icon_k.png" class="topcon_left" mode=""></image>
			<view class="topcon_right">
				<view class="topcon_right_top">
					<view class="topcon_right_top_name">收货人：{{ data.contact }}</view>
					<view class="topcon_right_top_tel">{{ data.contact_phone }}</view>
				</view>
				<view class="topcon_right_bottom">{{ data.contact_address }}</view>
			</view>
		</view>
		<view class="logistics">
			<view class="logistics_list" v-if="data.logistics">承运来源：{{ data.logistics.type_zh }}</view>
			<view class="logistics_list" v-if="data.logistics">承运来源：{{ data.logistics.express_no }}</view>
			<view class="logistics_listno" v-if="!data.logistics">暂无配送信息</view>
		</view>
		<view class="orderlist_item">
			<view class="orderlist_item_bottom">
				<view class="orderlist_item_bottom_top">订单商品</view>
				<view class="orderlist_item_bottom_bottom">
					<view class="orderlist_itemcon">
						<image :src="data.product.cover_image" class="orderlist_itemcon_left" mode=""></image>
						<view class="orderlist_itemcon_right">
							<view class="orderlist_itemcon_right_name">{{ data.title || '' }}</view>
							<view class="specifications" v-show="data.product.exts.length > 0">{{ data.product.exts[0].field || '' }}/{{ data.product.exts[0].value || '' }}</view>
							<view class="orderlist_itemcon_right_money">
								<view class="item_moneytop_left_left">￥{{ data.product.show_price }}</view>
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
		<!-- 联系供应商 -->
		<!-- <view class="guideDetail_info">
			<view class="guideDetail_info_con">
				<view class="guideDetail_info_con_l">
					<image class="img" v-if="data.product.author.avatar" :src="data.product.author.avatar" mode=""></image>
					<image class="img" v-if="!data.product.author.avatar" src="../../../static/img/header_img.png" mode=""></image>
					<view class="first">
						<text class="name">{{ data.product.author.truename || data.product.author.nickname }}</text>
						<view class="title">
							<image src="/static/img/clockinSuccess_icon.png" mode=""></image>
							<text>{{ data.product.author.role_zh }}</text>
						</view>
					</view>
				</view>
				<view class="button" @click="tel()">联系供应商</view>
			</view>
		</view> -->
		<view class="orderlist">
			<view class="orderlistitem">
				<view class="orderlistitem_left">订单编号：</view>
				<view class="orderlistitem_right">{{ data.number }}</view>
			</view>
			<view class="orderlistitem">
				<view class="orderlistitem_left">创建时间：</view>
				<view class="orderlistitem_right">{{ data.created_at }}</view>
			</view>
			<view class="orderlistitem" v-if="data.status_zh == '待发货' || data.status_zh == '已完成'">
				<view class="orderlistitem_left">付款时间：</view>
				<view class="orderlistitem_right">{{ data.paid_at }}</view>
			</view>
			<view class="orderlistitem" v-if="data.status_zh == '已完成'">
				<view class="orderlistitem_left">发货时间：</view>
				<view class="orderlistitem_right">{{ data.shipped_at }}</view>
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
			id: 0,
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
		// 打电话
		tel() {
			wx.makePhoneCall({
				phoneNumber: this.data.product.author.mobile
			});
		},
		// 获取详情
		ordersDetail() {
			ordersDetail({ id: this.id }).then(res => {
				this.data = res.data;
				this.amount = res.data.amount;
			});
		},
		// 支付
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
		// 唤起支付
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
@import url('orderDetail');
</style>
