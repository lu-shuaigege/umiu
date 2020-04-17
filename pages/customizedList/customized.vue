<template>
	<view class="guideList">
		<view class="guideList_top">
			<view class="guideList_top_con">
				<view class="guideList_top_select" @click="checkSorts(checkSort)">
					<text :class="checkSort ? 'guideList_top_select_one' : 'guideList_top_select_oneactive'">服务评分</text>
					<!-- <image src="/static/img/guide_ud.png" mode=""></image> -->
				</view>
				<view class="guideList_top_select" @click="navSelect(1)">
					<text :class="isSelected === 1 ? 'navselected' : ''">性别</text>
					<image v-if="isSelected !== 1" src="/static/img/guide_ud.png" mode=""></image>
					<image v-if="isSelected === 1" src="/static/img/guide_up.png" mode=""></image>
				</view>
				<view class="guideList_top_select" @click="navSelect(2)">
					<text :class="isSelected === 2 ? 'navselected' : ''">擅长带团</text>
					<image v-if="isSelected !== 2" src="/static/img/guide_ud.png" mode=""></image>
					<image v-if="isSelected === 2" src="/static/img/guide_up.png" mode=""></image>
				</view>
				<view class="guideList_top_select" @click="navSelect(3)">
					<text class="">区域</text>
					<image src="/static/img/guide_ud.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="uploadimg" @click="uploadimg"></view>
		<view class="guideList_list">
			<view class="list_one" v-for="item in list" :key="item" @click="toDetail(item.id)">
				<view class="score">4.9</view>
				<image class="list_one_img" v-if="item.avatar" :src="item.avatar" mode=""></image>
				<image class="list_one_img" v-if="!item.avatar" src="../../static/img/header_img.png" mode=""></image>
				<view class="list_one_r">
					<view class="first">
						<text class="name">{{ item.nickname }}</text>
						<view class="first_sex">
							<image v-if="item.sex == 1" class="sex" src="/static/img/customized_manicon.png" mode=""></image>
							<image v-if="item.sex == 2" class="sex" src="/static/img/customized_womanicon.png" mode=""></image>
						</view>
					</view>
					<view class="service_people">已服务{{ item.service_people }}次</view>
					<view class="service_area">擅长：{{ item.service_area }}</view>
				</view>
			</view>
		</view>
		<view class="tc_bg" v-if="isSelected === 1 || isSelected === 2">
			<view class="tc_con">
				<view class="tc_con_p">
					<!-- 性别 -->
					<view class="tc_con_p_language" v-if="isSelected === 1">
						<view class="language1" :class="sexSelected == item.value ? 'tc_selected' : ''" v-for="item in sex" :key="item" @click="checkSex(item.value)">
							{{ item.name }}
						</view>
					</view>
					<!-- 擅长带团 -->
					<view class="tc_con_p_year" v-if="isSelected === 2">
						<view
							class="year1"
							:class="goodat_typeSelected.indexOf(item.value) !== -1 ? 'tc_selected' : ''"
							v-for="item in goodat_type"
							:key="item"
							@click="checkGoodat_type(item.value)"
						>
							{{ item.name }}
						</view>
					</view>
				</view>
				<view class="tc_con_bottom">
					<view class="tc_con_bottom_l" @click="reset()">重置</view>
					<view class="tc_con_bottom_r" @click="complete()">完成</view>
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
import { getCustomizers, getcustomDesignerselct } from '@/http/api.js';
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
			//参数数组
			sex: [],
			goodat_type: [],
			//参数选择
			checkSort: true,
			sorts: 'rating desc',
			goodat_typeSelected: [],
			sexSelected: '',
			lowPrice: '',
			highPrice: '',
			isSelected: -1, //标签切换
			isActive: true,
			cityName: '区域',
			cityCode: '',
			page: 1,
			loadding: false,
			pullUpOn: true
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
			this.getList();
		}
	},
	onLoad(options) {
		this.getConfig();
		this.getList();
	},
	methods: {
		getList() {
			getCustomizers(this.page, this.cityCode, this.sexSelected, this.goodat_typeSelected.toString(), this.sorts).then(res => {
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
		//筛选条件接口
		getConfig() {
			getcustomDesignerselct().then(res => {
				res.data.forEach((item, index) => {
					if (item.key == 'sex') {
						this.sex = item.value;
					}
					if (item.key == 'goodat-type') {
						this.goodat_type = item.value;
					}
				});
			});
		},
		//性别参数选择
		checkSex(item) {
			this.sexSelected = item;
		},
		//擅长带团参数选择
		checkGoodat_type(item) {
			if (this.goodat_typeSelected.indexOf(item) == -1) {
				this.goodat_typeSelected.push(item);
			} else {
				this.goodat_typeSelected.splice(this.goodat_typeSelected.findIndex(i => i === item), 1);
			}
		},
		checkSorts(checkSort) {
			this.checkSort = !checkSort;
			if (checkSort) {
				this.sorts = 'rating';
			} else {
				this.sorts = 'rating desc';
			}
			this.list = [];
			this.page = 1;
			this.pullUpOn = true;
			this.getList();
		},
		navSelect(index) {
			if (index == 3) {
				uni.navigateTo({
					url: '/pages/selectCity/selectCity'
				});
			}
			if (this.isSelected === index) {
				this.isSelected = -1;
			} else {
				this.isSelected = index;
			}
		},
		lowP(e) {
			this.lowPrice = e.detail.value;
		},
		highP(e) {
			this.highPrice = e.detail.value;
		},
		//重置
		reset() {
			this.list = [];
			// this.goodat_type = [];
			this.goodat_typeSelected = [];
			this.page = 1;
			this.pullUpOn = true;
			this.languageSelected = [];
			this.yearsSelected = '';
			this.sexSelected = '';
			this.ageSelected = '';
			this.lowPrice = '';
			this.highPrice = '';
			this.isSelected = -1;
			this.getList();
		},
		//完成
		complete() {
			this.list = [];
			this.page = 1;
			this.pullUpOn = true;
			this.getList();
			this.languageSelected = [];
			this.yearsSelected = '';
			// this.sexSelected = '';
			this.ageSelected = '';
			this.isSelected = -1;
			this.lowPrice = '';
			this.highPrice = '';
		},
		toDetail(id) {
			uni.navigateTo({
				url: `/pages/studio/studio?id=${id}`
			});
			uni.setStorageSync('studio', id);
		}
	},
	// 页面上拉触底事件的处理函数
	onReachBottom: function() {
		this.getList();
	}
};
</script>

<style>
@import url('customized.css');
</style>
