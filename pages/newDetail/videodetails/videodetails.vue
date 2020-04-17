<template>
	<view class="videodetails">
		<view class="videodetails_video">
			<video id="myVideo" autoplay :src="list.video" @click="stop()" :controls="iscontrols" objectFit="contain" @ended="end" @timeupdate="time"></video>
		</view>
		<view class="author">
		  <view class="author_top">
			<image :src="list.author.avatar" alt="">
			<view>{{list.author.nickname}}</view>
		  </view>
		  <view class="author_under">
			{{list.title}}
		  </view>
		</view>
		<view class="right">
		  <view class="one">
			<image src="/static/img/videodetails_icon1.png" alt="">
			<view>{{list.votes_count}}</view>
		  </view>
		  <view class="one">
			<image src="/static/img/videodetails_icon2.png" alt="">
			<view>{{list.favorites_count}}</view>
		  </view>
		  <view class="one">
			<image @click="showpop()" src="/static/img/videodetails_icon3.png" alt="">
			<view>{{list.comments_count}}</view>
		  </view>
		</view>
		<image class="play" v-if="isplay" @click="playc()" src="/static/img/play.png" alt="">
		<view id="durationbar">
			<!-- <cmd-progress :percent="percent" :showInfo="false" stroke-shape="square" :stroke-width="2" stroke-color="#666"></cmd-progress> -->
			<view class="cu-progress margin-top xs">
				<view class="bg-white" :style="[{ width:percent}]"></view>
			</view>
		</view>
		<view class="mask-screen" @tap="hideModal" v-show="showModalStatus"></view>
		<view  class="region-box" v-show="showModalStatus">
			<view class="comments">
			  <view class="title">
			    评论
				<image @click="hideModal" class="close" src="/static/img/close.png" mode=""></image>
			  </view>
			  <view class="comments_list">
			    <view v-for="(item,index) in list.comments" :key="index">
			      <view class="listone">
			        <image class="headimage" :src="item.author.avatar" alt="">
			        <view class="con">
			          <view class="p">
			            <view class="name">{{item.author.nickname}}</view>
			            <view class="time">{{item.created_at.substring(0,10)}}</view>
			          </view>
			          <view class="comment">
			            {{item.comment}}
			          </view>
			        </view>
			        <view class="vote">
			          <image src="/static/img/traveldetails_icon1.png" alt="">
			          <view>{{item.votes_count}}</view>
			        </view>
			      </view>
			      <view class="listone_iner" v-if="item.comments.length">
			        <view class="listone_inerp" v-for="(items,index1) in item.comments" :key="index1">
			          <view class="listone">
			            <image class="headimage" :src="items.author.avatar" alt="">
			            <view class="con">
			              <view class="p">
			                <view class="name">{{items.author.nickname}}</view>
			                <view class="time">{{items.created_at.substring(0,10)}}</view>
			              </view>
			              <view class="comment">
			                {{items.comment}}
			              </view>
			            </view>
			            <view class="vote">
			              <image src="/static/img/traveldetails_icon1.png" alt="">
			              <view>{{items.votes_count}}</view>
			            </view>
			          </view>
			        </view>
			      </view>
			    </view>
				<view class="lookall" @click="toAll()" v-if="list.comments.length>2">
					查看全部评论 >
				</view>
			  </view>
			  <!-- <view class="none" v-if="!comments.length">
			    <image src="/static/img/none.png" alt="">
			  </view> -->
			  <!--加载loadding-->
			  <!-- <tui-loadmore :visible="loadding"></tui-loadmore> -->
			  <!-- <tui-nomore :visible="!pullUpOn"></tui-nomore> -->
			  <!--加载loadding-->
			</view>
		</view>
	</view>
</template>

<script>
	import { shortvideos } from '@/http/api.js';
	import { comments } from '@/http/api.js';
	import tuiDrawer from "@/plugins/thorui/components/drawer/drawer.vue"
	import cmdProgress from '@/plugins/cmd-progress/cmd-progress.vue';
	import tuiLoadmore from '@/plugins/thorui/components/loadmore/loadmore.vue';
	import tuiNomore from '@/plugins/thorui/components/nomore/nomore';
	export default {
		components: {
			cmdProgress,
			tuiDrawer,
			tuiLoadmore,
			tuiNomore
		},
		data() {
			return {
				showModalStatus: false,
				id:'29',
				isplay:false,
				percent:0,
				list:[],
				iscontrols:false,
				loadding: false,
				pullUpOn: true,
				page: 1,
				comments:[],
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
			// this.getComments(this.id)
		},
		methods: {
			getDetail(id){
				shortvideos(id).then(res => {
					this.list = res.data;
					wx.createVideoContext("myVideo").play()
				});
			},
			toAll(){
				uni.navigateTo({
					url: "/pages/newDetail/comments/comments?id=" + this.id +"&type=short-videos"
				});
				this.showModalStatus = false
			},
			getComments(id){
				comments("short-videos",id).then(res => {
					// this.comments = res.data.data;
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
						this.comments = this.comments.concat(res.data.data);
						this.page = this.page + 1;
						return;
					}
					this.comments = this.comments.concat(res.data.data);
					this.page = this.page + 1;
				});
			},
			stop(){
				uni.createVideoContext('myVideo').pause()
				this.isplay = true
			},
			playc(){
				uni.createVideoContext('myVideo').play()
				this.isplay = false
			},
			end(){
				this.isplay = true
			},
			time(e){
				this.percent = (e.detail.currentTime/e.detail.duration)*100
				this.percent = this.percent + '%'
			},
			hideModal(){
				this.showModalStatus = false
			},
			showpop(){
				if(this.list.comments_count){
					this.showModalStatus = true
				}	
			}
		},
		// 页面上拉触底事件的处理函数
		// onReachBottom: function() {
		// 	this.getComments(this.id);
		// }
	}
</script>

<style>
	@import url("videodetails.css");
	/*底部抽屉样式 start*/
	
	.mask-screen {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #000;
		opacity: 0.5;
		overflow: hidden;
		z-index: 9;
	}
	
	.region-box {
		width: 100%;
		overflow: scroll;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		background: #fff;
		padding-top: 20upx;
		height: 712upx;
		padding: 40upx 30upx 48upx 30upx;
		box-sizing: border-box;
		/* display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start; */
	}
	
	/*底部抽屉样式 end*/
</style>
