<template>
	<view class="my">
		<view class="mytoplist">
			<view class="mytopitem" v-for="(item, index) in topbtnlist" :key="index" @click="activefn(item.id)">
				<view :class="active == item.id ? 'mytopitem_name_active' : 'mytopitem_name'">{{ item.name }}</view>
				<view :class="active == item.id ? 'mytopitem_name_heng' : 'mytopitem_name_heng_active'"></view>
			</view>
		</view>
		<view class="orderlist">
			<view class="orderlist_item" v-for="(item, index) in orderList" :key="index">
				<view class="orderlist_item_top">
					<view class="kuai"></view>
					<view class="orderlist_item_top_right">预定日期：{{ item.created_at.slice(0, 10) || '' }}</view>
				</view>
				<view class="orderlist_item_bottom" @click="orderDetail(item.id, item.status_zh, item.type_zh)">
					<view class="orderlist_item_bottom_top">
						<view class="orderlist_item_bottom_top_left">订单号：{{ item.number || '' }}</view>
						<view class="orderlist_item_bottom_top_right">{{ item.status_zh }}</view>
					</view>
					<view class="orderlist_item_bottom_bottom">
						<view class="item_moneytop">
							<view class="item_moneytop_left">
								<image src="../../../../../static/img/orderlist_icon_f.png" v-if="item.type == 'plan'" class="item_moneytop_left_img" mode=""></image>
								<image src="../../../../../static/img/orderlist_icon_l.png" v-if="item.type == 'car'" class="item_moneytop_left_img" mode=""></image>
								<image src="../../../../../static/img/orderlist_icon_d.png" v-if="item.type == 'guide'" class="item_moneytop_left_img" mode=""></image>
								<image src="../../../../../static/img/orderlist_icon_i.png" v-if="item.type == 'homestay'" class="item_moneytop_left_img" mode=""></image>
								<image src="../../../../../static/img/orderlist_icon_h.png" v-if="item.type == 'hotel'" class="item_moneytop_left_img" mode=""></image>
								<image src="../../../../../static/img/orderlist_icon_a.png" v-if="item.type == 'repast'" class="item_moneytop_left_img" mode=""></image>
								<image src="../../../../../static/img/orderlist_icon_g.png" v-if="item.type == 'sight'" class="item_moneytop_left_img" mode=""></image>
								<image src="../../../../../static/img/orderlist_icon_m.png" v-if="item.type == 'specialty'" class="item_moneytop_left_img" mode=""></image>
								<image src="../../../../../static/img/orderlist_icon_b.png" v-if="item.type == 'tour-group'" class="item_moneytop_left_img" mode=""></image>
								<image src="../../../../../static/img/orderlist_icon_b.png" v-if="item.type == 'tour-surround'" class="item_moneytop_left_img" mode=""></image>
								<image src="../../../../../static/img/orderlist_icon_c.png" v-if="item.type == 'customized-guide'" class="item_moneytop_left_img" mode=""></image>
								<image src="../../../../../static/img/orderlist_icon_e.png" v-if="item.type == 'customized-travel'" class="item_moneytop_left_img" mode=""></image>
								<view class="item_moneytop_left_name">{{ item.title || '' }}</view>
							</view>
							<view class="item_moneytop_right">
								<view class="item_moneytop_left_left">￥</view>
								<view class="item_moneytop_left_right">{{ item.amount }}</view>
							</view>
						</view>
						<view class="item_fly" v-if="item.type == 'tour-group' || item.type == 'tour-surround'">
							<view class="item_fly_left">
								<image src="../../../../../static/img/fly_icon.png" mode=""></image>
								{{ item.start_date }}
							</view>
							<view class="item_fly_right">合同待签订</view>
						</view>
					</view>
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
import { travelOrders } from '@/http/api.js';
import tuiLoadmore from '@/plugins/thorui/components/loadmore/loadmore.vue';
import tuiNomore from '@/plugins/thorui/components/nomore/nomore';
export default {
	components: {
		tuiLoadmore,
		tuiNomore
	},
	data() {
		return {
			topbtnlist: [{ id: 1, name: '全部订单' }, { id: 2, name: '待付款' }, { id: 3, name: '未出行' }, { id: 4, name: '待点评' }],
			active: 1,
			status_en: '',
			orderList: [],
			data: {},
			pagea: 1,
			loadding: false,
			pullUpOn: true
		};
	},
	onShow() {
		wx.hideHomeButton();
	},
	onLoad(options) {
		if (options.active) {
			this.active = options.active;
		}
		this.getList();
	},
	methods: {
		activefn(active) {
			this.active = active;
			if (active == 1) {
				this.status_en = '';
			}
			if (active == 2) {
				this.status_en = 'to_be_paid';
			}
			if (active == 3) {
				this.status_en = 'paid';
			}
			if (active == 4) {
				this.status_en = 'completed';
			}
			this.pagea = 1;
			this.orderList = [];
			this.loadding = true;
			this.getList();
		},
		getList(active) {
			travelOrders({ page: this.pagea, status_en: this.status_en }).then(res => {
				this.loadding = true;
				if (res.data.data.length == 0) {
					this.loadding = false;
					this.pullUpOn = false;
					return;
				}
				if (res.data.data.length !== 0) {
					this.loadding = false;
					this.pullUpOn = false;
					this.orderList = this.orderList.concat(res.data.data);
					this.pagea++;
					return;
				}
				// this.data = res.data;
			});
		},
		orderDetail(id, status_zh, type_zh) {
			uni.navigateTo({
				url: `/pages/my/myorder/travelOrder/orderDetail/resourcesOrder?id=${id}`
			});
		},

		// 页面上拉触底事件的处理函数
		onReachBottom() {
			this.getList();
		}
	}
};
</script>

<style>
@import url('orderList');
</style>
