<template>
	<view class="paySuccess">
		<image src="@/static/img/payok_icon.png" mode=""></image>
		<view class="first">支付成功</view>
		<view class="second">支付金额：￥{{ amount }}</view>
		<!-- <view class="third">请与销售人员联系获取物流信息</view> -->
		<view class="bottomview">
			<view class="bottomview_left" @click="gohome()">返回首页</view>
			<view class="bottomview_right" @click="order()">查看订单</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			amount: '',
			type: ''
		};
	},
	onShow() {
		wx.hideHomeButton();
	},
	onLoad(options) {
		this.amount = options.amount;
		this.type = options.type;
	},
	methods: {
		gohome() {
			uni.navigateTo({
				url: '/pages/my/myIndex/myIndex'
			});
		},
		order() {
			if (this.type == 'specialty') {
				uni.navigateTo({
					url: '/pages/my/myorder/specialtyOrder/orderList/orderList'
				});
			} else {
				uni.navigateTo({
					url: '/pages/my/myorder/travelOrder/orderList/orderList'
				});
			}
		}
	}
};
</script>

<style>
@import url('paySuccess.css');
</style>
