<template>
	<view class="playRecommend">
		<navigator url="../my/myIndex/myIndex" class="gotomyCenterbtn"></navigator>
		<view class="cu-bar search fixed" style="background: #ff8532;">
			<view class="search-form round" style="background: rgba(255,255,255,0.2);">
				<!-- <text class="cuIcon-search" style="color: #FFFFFF;"></text> -->
				<!-- <view class="address" @click="gotocity()">{{ cityName }}</view>
				<image class="address-img" src="../../static/img/citydown.png" mode=""></image>
				<view class="shu"></view> -->
				<input
					class="search_input"
					type="text"
					style="font-weight: 300;"
					:value="inputVal"
					placeholder="请输入名称进行搜索"
					confirm-type="search"
					@confirm="search()"
					@input="searchIcon"
					placeholder-style="color:#fff"
				/>
			</view>
		</view>
		<view class="topbtn">
			<view class="playRecommend_nav">
				<view class="nav" :class="isSelected === 5 ? 'nav_selected' : ''" @click="navSelect(5)">特产</view>
				<!-- <view class="nav" :class="isSelected === 6 ? 'nav_selected' : ''" @click="navSelect(6)">跟团</view> -->
				<view class="nav" :class="isSelected === 7 ? 'nav_selected' : ''" @click="navSelect(7)">周边</view>
				<view class="nav" :class="isSelected === 1 ? 'nav_selected' : ''" @click="navSelect(1)">酒店</view>
				<view class="nav" :class="isSelected === 2 ? 'nav_selected' : ''" @click="navSelect(2)">景点</view>
				<view class="nav" :class="isSelected === 3 ? 'nav_selected' : ''" @click="navSelect(3)">餐饮</view>
				<view class="nav" :class="isSelected === 4 ? 'nav_selected' : ''" @click="navSelect(4)">民宿</view>
			</view>
		</view>
		<!-- 筛选条件 -->
		<!-- <view class="topsel">
			<view class="topsel_list">
				<view class="topsel_list_item" @click="isdownafn()">
					<view class="topsel_list_item_left" :class="!isdowna ? 'topsel_list_itemcolor' : ''">区域推荐</view>
					<image src="../../static/img/guide_ud.png" v-if="isdowna" class="topsel_list_item_right" mode=""></image>
					<image src="../../static/img/guide_up.png" v-if="!isdowna" class="topsel_list_item_right" mode=""></image>
				</view>
				<view class="topsel_list_item" @click="price_sortfn()">
					<view class="topsel_list_item_left">价格</view>
					<image src="../../static/img/moneyno.png" v-if="price_sort == ''" class="topsel_list_item_rightmoney" mode=""></image>
					<image src="../../static/img/moneyup.png" v-if="price_sort == 'asc'" class="topsel_list_item_rightmoney" mode=""></image>
					<image src="../../static/img/moneydown.png" v-if="price_sort == 'desc'" class="topsel_list_item_rightmoney" mode=""></image>
				</view>
				<view class="topsel_list_item" @click="isdownbfn()">
					<view class="topsel_list_item_left" :class="!isdownb ? 'topsel_list_itemcolor' : ''">品类</view>
					<image src="../../static/img/guide_ud.png" v-if="isdownb" class="topsel_list_item_right" mode=""></image>
					<image src="../../static/img/guide_up.png" v-if="!isdownb" class="topsel_list_item_right" mode=""></image>
				</view>
			</view>
			<view class="sel_con" v-if="(!isdowna && isprice_sort) || (!isdownb && isprice_sort)"><view class="sel_content"></view></view>
		</view> -->
		<view class="list">
			<view class="list_one" v-for="item in list" :key="item" @click="toDetail(item.id, item.type)">
				<image v-if="item.cover_image" :src="item.cover_image" mode=""></image>
				<image v-if="!item.cover_image" src="../../static/img/noTopcontent.png" mode=""></image>
				<view class="list_one_r">
					<view class="title">{{ item.title }}</view>
					<view class="intro">{{ item.description }}</view>
					<view class="introb" v-if="type == 'boutique'">
						<view class="l">目的地：{{ item.destination }}</view>
						<text></text>
						<view class="r">行程天数：{{ item.last_days }}天</view>
					</view>
					<view class="price">
						<!-- <text v-if="type != 'specialty'">门市价:</text> -->
						<text v-if="type != 'specialty'">售卖价:</text>
						<text v-if="type == 'specialty'">售卖价:</text>
						<text class="text">￥</text>
						<text class="price">{{ item.price }}</text>
					</view>
				</view>
			</view>
		</view>
		<!--加载loadding-->
		<tui-loadmore :visible="loadding"></tui-loadmore>
		<tui-nomore :visible="!pullUpOn" :bgcolor="'#FFFFFF'"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>

<script>
import uniIcons from '@/plugins/components/uni-icons/uni-icons.vue';
import tuiLoadmore from '@/plugins/thorui/components/loadmore/loadmore.vue';
import tuiNomore from '@/plugins/thorui/components/nomore/nomore';
import { getResources, specialties } from '@/http/api.js';
export default {
	components: {
		uniIcons,
		tuiLoadmore,
		tuiNomore
	},
	data() {
		return {
			isShare: 1, // 1:普通分享   2:普通分销   3:我要分销
			list: [], //列表拿到的所有的数据
			inputVal: '', //搜索的内容
			keywords: '', //接口里面用到的搜索内容
			page: 1, //页码
			cityName: '全部', //城市地址
			cityCode: '', //城市code
			loadding: false,
			pullUpOn: true,
			isSelected: 5, //选择的资源类型
			type: 'specialty', //选择的资源类型的类型
			isdowna: true, //左边区域选择
			price_sort: '', //中间价格图片展示
			isprice_sort: false, //中间价格点击状态
			isdownb: true, //右边类型选择
			specialtylist: [] //特产城市列表
		};
	},
	onShow() {
		wx.hideHomeButton();
		let pages = getCurrentPages();
		let currPage = pages[pages.length - 1]; //当前页面
		this.cityName = currPage.data.cityName;
		this.cityCode = currPage.data.cityCode;
		if (this.cityName !== '区域') {
			this.list = [];
			this.page = 1;
			this.pullUpOn = true;
			this.getList(this.keywords, this.cityCode);
		}
	},
	onLoad(options) {
		this.id = options.id;
		if (options.isShare) {
			this.isShare = options.isShare;
		} else {
			this.isShare = '1';
		}
		console.log(this.isShare);
		this.getList();
		this.specialties();
	},
	methods: {
		//点击区域推荐
		isdownafn() {
			this.isdowna = !this.isdowna;
			this.isprice_sort = true;
		},
		//点击价格排序
		price_sortfn() {
			this.isdowna = true;
			this.isdownb = true;
			this.isprice_sort = false;
			if (this.price_sort == '') {
				this.price_sort = 'asc';
				this.pullUpOn = true;
				this.page = 1;
				this.list = [];
				this.getList();
				return;
			}
			if (this.price_sort == 'asc') {
				this.price_sort = 'desc';
				this.pullUpOn = true;
				this.page = 1;
				this.list = [];
				this.getList();
				return;
			}
			if (this.price_sort == 'desc') {
				this.price_sort = 'asc';
				this.pullUpOn = true;
				this.page = 1;
				this.list = [];
				this.getList();
				return;
			}
			console.log(this.price_sort);
		},
		//点击类型选择
		isdownbfn() {
			this.isdownb = !this.isdownb;
			this.isprice_sort = true;
		},
		specialties() {
			specialties().then(res => {
				console.log(res);
			});
		},
		gotocity() {
			uni.navigateTo({
				url: '/pages/selectCity/selectCity'
			});
		},
		getList(keywords, cityCode) {
			if (keywords == undefined) {
				this.keywords = '';
			} else {
				this.keywords = keywords;
			}
			if (cityCode == undefined) {
				this.cityCode = '';
			} else {
				this.cityCode = cityCode;
			}
			let destination_code = this.cityCode;
			let city_Code = this.cityCode;
			if (this.type == 'boutique') {
				city_Code = '';
				destination_code = this.cityCode;
			} else {
				city_Code = this.cityCode;
				destination_code = '';
			}
			//当时为了处理特产上架审核过不去问题
			let client = '';
			if (this.type == 'specialty') {
				client = 'wx-mini-program-0320-1';
			} else {
				client = '';
			}
			getResources(this.id, this.page, this.type, this.keywords, city_Code, destination_code, client, this.price_sort).then(res => {
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
			});
		},
		searchIcon(e) {
			this.keywords = e.detail.value;
			this.inputVal = e.detail.value;
		},
		search() {
			this.page = 1;
			this.list = [];
			this.pullUpOn = true;
			this.getList(this.keywords);
		},
		toDetail(id, type) {
			let that = this;
			console.log(that.id);
			switch (type) {
				case 'hotel':
					uni.navigateTo({
						url: `/pages/details/hotelDetail/hotelDetail?id=${id}&isDis=1&isShare=${this.isShare}`
					});
					break;
				case 'repast':
					uni.navigateTo({
						url: `/pages/details/restaurantDetail/restaurantDetail?id=${id}&isDis=1&isShare=${this.isShare}`
					});
					break;
				case 'sight':
					uni.navigateTo({
						url: `/pages/details/scenicSpotDetail/scenicSpotDetail?id=${id}&isDis=1&isShare=${this.isShare}`
					});
					break;
				case 'homestay':
					uni.navigateTo({
						url: `/pages/details/homestayDetail/homestayDetail?id=${id}&isDis=1&isShare=${this.isShare}`
					});
					break;
				case 'specialty':
					uni.navigateTo({
						url: `/pages/details/otherDetail/otherDetail?id=${id}&isDis=1&isShare=${this.isShare}`
					});
					break;
				case 'tour-group':
					uni.navigateTo({
						url: `/pages/details/standardDetail/standardDetail?id=${id}&isDis=1&isShare=${this.isShare}`
					});
					break;
				case 'tour-surround':
					uni.navigateTo({
						url: `/pages/details/surround/surround?id=${id}&isDis=1&isShare=${this.isShare}`
					});
					break;
				// case 'specialty':
				// 	uni.navigateTo({
				// 		url: `/pages/details/specialtyDetail/specialtyDetail?id=${id}&isDis=1&isShare=3`
				// 	});
				// 	break;
			}
		},
		navSelect(index) {
			this.page = 1;
			this.list = [];
			this.inputVal = '';
			this.pullUpOn = true;
			this.isSelected = index;
			if (index === 1) {
				this.type = 'hotel';
			}
			if (index === 2) {
				this.type = 'sight';
			}
			if (index === 3) {
				this.type = 'repast';
			}
			if (index === 4) {
				this.type = 'homestay';
			}
			if (index === 5) {
				this.type = 'specialty';
			}
			if (index === 6) {
				// this.type = 'boutique';
				this.type = 'tour-group';
			}
			if (index === 7) {
				this.type = 'tour-surround';
			}
			this.getList(this.keywords, this.cityCode);
		}
	},
	// 页面上拉触底事件的处理函数
	onReachBottom: function() {
		this.getList(this.keywords);
	}
};
</script>

<style>
@import url('scenicRecommend.css');
</style>
