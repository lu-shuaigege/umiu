<template>
	<view class="my">
		<view class="mytoplist">
			<view class="mytopitem" v-for="(item, index) in topbtnlist" :key="index" @click="activefn(item.id)">
				<view :class="active == item.id ? 'mytopitem_name_active' : 'mytopitem_name'">{{ item.name }}</view>
				<view :class="active == item.id ? 'mytopitem_name_heng' : 'mytopitem_name_heng_active'"></view>
			</view>
		</view>
		<view class="orderlist">
			<view class="orderlist_item" v-for="(item, index) in orderList" :key="index" @click="orderDetail(item.id, item.status_zh, item.type_zh)">
				<view class="orderlist_item_bottom">
					<view class="orderlist_item_bottom_top">
						<view class="orderlist_item_bottom_top_left">订单号：{{ item.number || '' }}</view>
						<view class="orderlist_item_bottom_top_right">{{ item.status_zh }}</view>
					</view>
					<view class="orderlist_item_bottom_bottom">
						<view class="orderlist_itemcon">
							<image :src="item.product.cover_image" class="orderlist_itemcon_left" mode=""></image>
							<view class="orderlist_itemcon_right">
								<view class="orderlist_itemcon_right_name">{{ item.title || '' }}</view>
								<view class="specifications" v-show="item.product.exts.length > 0">
									{{ item.product.exts[0].field || '' }}/{{ item.product.exts[0].value || '' }}
								</view>
								<view class="orderlist_itemcon_right_money">
									<view class="item_moneytop_left_left">￥{{ item.amount }}</view>
									<view class="item_moneytop_left_right">X1</view>
								</view>
							</view>
						</view>
						<view class="item_fly">
							共{{ item.product.quantity || 0 }}件商品
							<view class="item_fly_left">总计：</view>
							<view class="money">￥</view>
							<view class="item_fly_right">{{ item.amount }}</view>
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
			topbtnlist: [{ id: 1, name: '全部订单' }, { id: 2, name: '待付款' }, { id: 3, name: '待发货' }, { id: 4, name: '已完成' }],
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
			travelOrders({ type: 'specialty', page: this.pagea, status_en: this.status_en }).then(res => {
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
				url: `/pages/my/myorder/specialtyOrder/orderDetail/orderDetail?id=${id}`
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
