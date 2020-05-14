<template>
	<view class="my-wallet-detail">
		<view class="my-wallet-detail-amount">
			<view class="hit">未提现总收益</view>
			<view class="total">{{ wallet.withdrawable }}</view>
			<view class="total-income">累计分佣总收益：{{ wallet.withdrawn }}</view>
		</view>
		<view class="my-wallet-detail-choose">
			<view class="choose-item" @click="changeList(1)"><view class="choose-item-name" :class="isCR == 1 ? 'active' : ''">分佣收益</view></view>
			<view class="choose-item" @click="changeList(2)"><view class="choose-item-name" :class="isCR == 2 ? 'active' : ''">提现记录</view></view>
		</view>
		<view>
			<view class="my-wallet-detail-list" v-show="isCR == 1">
				<view class="my-wallet-detail-list-item" v-for="(cr, crindex) of list" :key="crindex">
					<image src="../../../../static/img/orderlist_icon_f.png" v-if="cr.order_type == 'plan'" class="item-image" mode=""></image>
					<image src="../../../../static/img/orderlist_icon_l.png" v-if="cr.order_type == 'car'" class="item-image" mode=""></image>
					<image src="../../../../static/img/orderlist_icon_d.png" v-if="cr.order_type == 'guide'" class="item-image" mode=""></image>
					<image src="../../../../static/img/orderlist_icon_i.png" v-if="cr.order_type == 'homestay'" class="item-image" mode=""></image>
					<image src="../../../../static/img/orderlist_icon_h.png" v-if="cr.order_type == 'hotel'" class="item-image" mode=""></image>
					<image src="../../../../static/img/orderlist_icon_a.png" v-if="cr.order_type == 'repast'" class="item-image" mode=""></image>
					<image src="../../../../static/img/orderlist_icon_g.png" v-if="cr.order_type == 'sight'" class="item-image" mode=""></image>
					<image src="../../../../static/img/orderlist_icon_m.png" v-if="cr.order_type == 'specialty'" class="item-image" mode=""></image>
					<image src="../../../../static/img/orderlist_icon_b.png" v-if="cr.order_type == 'tour-group'" class="item-image" mode=""></image>
					<image src="../../../../static/img/orderlist_icon_b.png" v-if="cr.order_type == 'tour-surround'" class="item-image" mode=""></image>
					<image src="../../../../static/img/orderlist_icon_c.png" v-if="cr.order_type == 'customized-guide'" class="item-image" mode=""></image>
					<image src="../../../../static/img/orderlist_icon_e.png" v-if="cr.order_type == 'customized-travel'" class="item-image" mode=""></image>
					<view class="item-text">
						<view class="flex-horizontal-between">
							<view class="item-name">{{ cr.order_title }}</view>
							<view class="item-money">+{{ cr.secondary_distribution_actual_amount }}</view>
						</view>
						<view class="flex-horizontal-between item-text-bottom">
							<view class="item-num">订单号：{{ cr.order_number }}</view>
							<view class="item-time">{{ cr.created_at }}</view>
						</view>
					</view>
				</view>
				<!-- <view class="my-wallet-detail-list-empty" v-show="list.length == 0">
					<image src="../../../../static/img/my_wallet_ic_no_data.png"></image>
					<view class="empty-data">暂无相关内容</view>
				</view> -->
			</view>
			<view class="my-wallet-detail-list" v-show="isCR == 2">
				<view class="my-wallet-detail-list-item" v-for="(wd, index) of list" :key="index">
					<image class="item-image" src="../../../../static/img/money_icon.png"></image>
					<view class="item-text">
						<view class="flex-horizontal-between">
							<view class="item-num">流水号：{{ wd.number }}</view>
							<view class="item-money">-{{ wd.amount }}</view>
						</view>
						<view class="flex-horizontal-between item-text-bottom">
							<view class="item-time">{{ wd.created_at }}</view>
							<view class="item-status status-success" v-show="wd.audited_status === 1">提现成功</view>
							<view class="history-item-status" v-show="wd.audited_status === 2">提现中</view>
							<view class="history-item-status status-failed" v-show="wd.audited_status === 3">提现驳回</view>
						</view>
					</view>
				</view>
				<!-- <view class="my-wallet-detail-list-empty" v-show="list.length == 0">
					<image src="../../../../static/img/my_wallet_ic_no_data.png"></image>
					<view class="empty-data">暂无相关内容</view>
				</view> -->
			</view>
			<!-- <view class="my-wallet-detail-list-empty" v-show="list.length == 0">
				<image src="../../../../static/img/my_wallet_ic_no_data.png"></image>
				<view class="empty-data">暂无相关内容</view>
			</view> -->
		</view>
		<!--加载loadding-->
		<tui-loadmore :visible="loadding"></tui-loadmore>
		<tui-nomore :visible="!pullUpOn"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>

<script>
import { getWallet, getCommissionRecord, getWithDrawals } from '@/http/api.js';
import tuiLoadmore from '@/plugins/thorui/components/loadmore/loadmore.vue';
import tuiNomore from '@/plugins/thorui/components/nomore/nomore';
export default {
	components: {
		tuiLoadmore,
		tuiNomore
	},
	data() {
		return {
			//收益价格
			wallet: {
				withdrawable: '',
				withdrawn: ''
			},
			isCR: 1, //按钮状态
			page: 1, //页码
			loadding: false, //圆圈加载状态
			pullUpOn: true,
			list: [], //获取列表数据
			crList: [], //分佣收益列表
			crLoading: false,
			crTotalPage: 1,
			wdList: [], //提现列表
			wdCurrentPage: 1,
			wdTotalPage: 1, //提现总页码
			loadingMore: false, //加载状态
			crRefresh: false, //分佣下拉刷新状态
			wdRefresh: false //提现下拉刷新状态
		};
	},
	onLoad() {
		this.getWalletInfo(); //未提现收益接口
		this.getCommissionRecord(); //分佣收益
	},
	onShow() {
		wx.hideHomeButton();
	},
	methods: {
		// 点击按钮切换状态
		changeList(change) {
			if (change == 1) {
				this.isCR = 1;
				// if (this.crList.length == 0) {
				this.page = 1;
				this.list = [];
				this.getCommissionRecord();
				// }
			} else {
				this.isCR = 2;
				// if (this.wdList.length == 0) {
				this.page = 1;
				this.list = [];
				this.getWithDrawals();
				// }
			}
		},
		//未提现收益接口
		getWalletInfo() {
			getWallet().then(res => {
				console.log(res);
				if (res.data != null) {
					this.wallet.withdrawn = parseFloat(res.data.total_withdrawal).toFixed(2);
					this.wallet.withdrawable = parseFloat(res.data.can_withdrawal).toFixed(2);
				}
			});
		},
		// 分佣收益
		getCommissionRecord() {
			this.loadingMore = true;
			getCommissionRecord({ page: this.page }).then(res => {
				console.log(res);
				this.loadding = true;
				if (res.data.length == 0) {
					this.loadding = false;
					this.pullUpOn = false;
					return;
				}
				if (res.data.length !== 0) {
					this.loadding = false;
					this.pullUpOn = false;
					this.list = this.list.concat(res.data.data);
					console.log(this.list);
					this.page++;
					return;
				}
				// this.loadingMore = false;
				// if (res.data != null) {
				// 	if (this.crRefresh) {
				// 		this.crList.clear();
				// 	}
				// 	this.crList = this.crList.concat(res.data);
				// }
			});
		},
		//提现明细
		getWithDrawals() {
			this.loadingMore = true;
			getWithDrawals({ page: this.page }).then(res => {
				this.loadding = true;
				if (res.data.length == 0) {
					this.loadding = false;
					this.pullUpOn = false;
					return;
				}
				if (res.data.length !== 0) {
					this.loadding = false;
					this.pullUpOn = false;
					this.list = this.list.concat(res.data.data);
					this.page++;
					console.log(this.list);
					return;
				}
				// this.loadingMore = false;
				// if (res.data != null) {
				// 	if (this.wdRefresh) {
				// 		this.wdList.clear();
				// 	}
				// 	this.wdList = this.wdList.concat(res.data);
				// }
			});
		}
	},
	//切换按钮
	onReachBottom: function() {
		this.loadingMore = true;
		if (this.isCR == 1) {
			// this.crCurrentPage++;
			this.getCommissionRecord();
		} else {
			// this.wdCurrentPage++;
			this.getWithDrawals();
		}
	},
	//下拉刷新
	onPullDownRefresh() {
		if (this.isCR) {
			this.crRefresh = true;
			this.crCurrentPage = 1;
			this.getCommissionRecord();
		} else {
			this.wdRefresh = true;
			this.wdCurrentPage = 1;
			this.getWithDrawals();
		}
	},
	// 页面上拉触底事件的处理函数
	onReachBottom: function() {
		if (this.isCR == 1) {
			this.getCommissionRecord();
		}
		if (this.isCR == 2) {
			this.getWithDrawals();
		}
	}
};
</script>

<style>
@import url('myWalletDetail');
</style>
