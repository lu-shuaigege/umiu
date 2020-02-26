<template>
	<view class="guideList">
		<view class="list" v-for="(item, index) of list" :key="index">
			<view class="item">
				<view class="item_left">
					<view class="del" @click="access_records_del(item.id)"><image src="../../static/img/del.png" mode="" class="del_img"></image></view>
					<view class="top_img"><image :src="item.avatar" class="top_img_img" mode=""></image></view>
					<view class="content">
						<view class="title">{{ item.nickname }}</view>
						<view class="phone">{{ item.mobile }}</view>
					</view>
				</view>
				<view class="item_right" @click="gotoStudio(item.user_id)">进入工作室</view>
			</view>
		</view>
		<!--加载loadding-->
		<tui-loadmore :visible="loadding"></tui-loadmore>
		<tui-nomore :visible="!pullUpOn"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>
<script>
import { access_records, access_records_del } from '@/http/api.js';
import tuiLoadmore from '@/plugins/thorui/components/loadmore/loadmore.vue';
import tuiNomore from '@/plugins/thorui/components/nomore/nomore';
export default {
	components: {
		tuiLoadmore,
		tuiNomore
	},
	data() {
		return {
			list: [],
			page: 1,
			loadding: false,
			pullUpOn: true,
			openid: ''
		};
	},
	onShow() {
		wx.hideHomeButton();
		let pages = getCurrentPages();
		let currPage = pages[pages.length - 1]; //当前页面
	},
	onLoad(options) {
		if (uni.getStorageSync('openid')) {
			this.openid = uni.getStorageSync('openid');
		}
		this.getList();
	},
	methods: {
		getList() {
			access_records(this.openid).then(res => {
				if (!this.pullUpOn) return;
				this.loadding = true;
				if (res.data.data.length == 0) {
					this.loadding = false;
					this.pullUpOn = false;
					return;
				}
				if (res.data.current_page == res.data.last_page) {
					this.loadding = false;
					this.pullUpOn = false;
					this.list = this.list.concat(res.data.data);
					this.page = this.page + 1;
					return;
				}
				this.list = this.list.concat(res.data.data);
				this.page = this.page + 1;
				console.log(this.list);
			});
		},
		gotoStudio(id) {
			uni.navigateTo({
				url: '/pages/studio/studio?id=' + id
			});
		},
		access_records_del(id) {
			access_records_del(id).then(res => {
				uni.showToast({
					// icon: 'none',
					title: '删除成功'
				});
				this.list = [];
				this.pullUpOn = true;
				this.page = 1;
				this.getList();
				console.log(this.list);
			});
		}
	},
	// 页面上拉触底事件的处理函数
	onReachBottom: function() {
		this.getList();
	}
};
</script>

<style>
.guideList {
	width: 100%;
	min-height: 100vh;
	background-color: #ffffff;
	padding: 1upx 0upx;
	box-sizing: border-box;
}
.list {
	width: 100%;
	border-bottom: 1px solid #e1e1e1;
}
.item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 38upx 30upx;
	box-sizing: border-box;
}
.item_left {
	display: flex;
	align-items: center;
}
.del {
	width: 34upx;
	height: 34upx;
	margin-right: 30upx;
}
.del_img {
	width: 100%;
	height: 100%;
}
.top_img {
	width: 100upx;
	height: 100upx;
	margin-right: 20upx;
	border-radius: 50%;
	overflow: hidden;
}
.top_img_img {
	width: 100%;
	height: 100%;
}
.title {
	font-family: PingFang-SC-Bold;
	font-size: 30upx;
	font-weight: bold;
	font-stretch: normal;
	line-height: 30upx;
	letter-spacing: 0upx;
	color: #28282c;
}
.phone {
	font-family: PingFang-SC-Medium;
	font-size: 26upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 26upx;
	letter-spacing: 0px;
	color: #666666;
	margin-top: 20upx;
}
.item_right {
	width: 151upx;
	height: 49upx;
	background-image: linear-gradient(235deg, #ff7112 0%, #ff8532 100%), linear-gradient(#ff6600, #ff6600);
	background-blend-mode: normal, normal;
	border-radius: 24upx;
	text-align: center;
	font-family: PingFang-SC-Medium;
	font-size: 24upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 49upx;
	letter-spacing: 0upx;
	color: #ffffff;
}
</style>
