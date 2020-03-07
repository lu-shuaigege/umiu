<template>
	<view class="questions" @click="tohide()">
		<view class="questions_top">
			<view class="questions_top_up">
				<view class="title">
					{{detail.title}}
				</view>
				<view class="questions_info">
					<image :src="detail.author.avatar" mode=""></image>
					<text class="name">{{detail.author.nickname}}</text>
					<text class="time">问于{{detail.created_at}}</text>
				</view>
			</view>
			<view class="questions_top_con">
				{{detail.body}}
			</view>
			<view class="questions_top_bottom">
				<view class="one">
					<image src="/static/img/fabulous.png" mode=""></image>
					<view>{{detail.votes_count}}<text>个赞</text></view>
				</view>
				<view class="one">
					<image src="/static/img/thanks.png" mode=""></image>
					<view>{{detail.favorites_count}}<text>个感谢</text></view>
				</view>
				<view class="one">
					<image src="/static/img/traveldetails_icon3.png" mode=""></image>
					<view>{{detail.comments_count}}<text>条回答</text></view>
				</view>
			</view>
		</view>
		<view class="questions_con_top">
			<view class="title">
				{{total}}条回答
			</view>
			<view class="right">
				<view class="one" @click.stop="right()">
					<text>{{isdefaut}}</text>
					<image v-if="isud" src="/static/img/guide_ud.png" mode=""></image>
					<image v-if="!isud" src="/static/img/question_up.png" mode=""></image>
				</view>
				<view class="two" v-if="isshow">
					<view class="" @click.stop="choose(1)" :class="isSelected === 1?'isselected':''">
						默认排序
					</view>
					<view class="" @click.stop="choose(2)" :class="isSelected === 2?'isselected':''">
						按时间排序
					</view>
				</view>
			</view>
		</view>
		<view class="questions_con">
			<view class="listone" v-for="item in list" :key="item">
				<view class="listone-top">
					<view class="listone-top_l">
						<image class="photo" :src="item.author.avatar" mode=""></image>
						<view class="info">
							<view class="name">
								{{item.author.nickname}}
							</view>
							<view class="time">
								发布于{{item.created_at}}
								<text></text>
								著作权归作者所有
							</view>
						</view>
					</view>
					<view class="vote">
						<image src="/static/img/fabulous.png" mode=""></image>
						1222
					</view>
				</view>
				<view class="listone-con">
					{{item.body}}
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
	import tuiLoadmore from '@/plugins/thorui/components/loadmore/loadmore.vue';
	import tuiNomore from '@/plugins/thorui/components/nomore/nomore';
	import { questionDetail } from '@/http/api.js';
	import { questionAnswers } from '@/http/api.js';
	export default {
		components: {
			tuiLoadmore,
			tuiNomore
		},
		data() {
			return {
				id:1,
				detail:[],
				list:[],
				loadding: false,
				pullUpOn: true,
				page: 1,
				order:'',
				total:0,
				isshow:false,
				isud:true,
				isdefaut:'默认排序',
				isSelected:1
			}
		},
		onShow() {
			wx.hideHomeButton()
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id;
			}
			this.getDetail(this.id)
			this.getList(this.id)
		},
		methods: {
			getDetail(id){
				questionDetail(id).then(res => {
					this.detail = res.data;
				});
			},
			getList(id){
				questionAnswers(this.page,this.order,id).then(res => {
					// this.list = res.data.data;
					this.total = res.data.total
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
			right(){
				if(this.isshow){
					this.isshow = false
					this.isud = true
				}else{
					this.isshow = true
					this.isud = false
				}
			},
			choose(x){
				this.page = 1
				this.list = []
				this.loadding = false
				this.pullUpOn = true
				this.isshow = false
				this.isud = true
				if(x == 1){
					this.isdefaut = "默认排序"
					this.order = 'default'
					this.isSelected = 1
					this.getList(this.id);
					console.log(this.list)
				}else{
					this.isSelected = 2
					this.isdefaut = "按时间排序"
					this.order = "created"
					this.getList(this.id);
				}
			},
			tohide(){
				this.isshow = false
				this.isud = true
			}
		},
		// 页面上拉触底事件的处理函数
		onReachBottom: function() {
			this.getList(this.id);
		}
	}
</script>

<style>
	@import url("questionsdetails.css");
</style>
