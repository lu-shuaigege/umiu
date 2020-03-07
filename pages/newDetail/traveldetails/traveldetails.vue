<template>
	<view class="traveldetails">
	    <view class="traveldetails_top">
	      <image :src="list.author.avatar" alt="">
	      <view class="title">{{list.author.nickname}}</view>
	    </view>
	    <view class="cover_image">
	      <image class="bg" :src="list.cover_image" alt="">
	      <view class="location" v-if="list.type ==2">
	        <image src="/static/img/location.png" alt="">
	        <text>{{list.destination}}</text>
	      </view>
	    </view>
	    <view class="content_title_top">
	    </view>
	    <view class="content_title">
	      <view class="title">{{list.title}}</view>
	      <view class="gonglue" v-if="list.type ==2">
	        <view class="up">
	          <view class="one" style="width:55%">
	            <image src="/static/img/traveldetails_icon4.png" alt="">
	            <text>出发日期</text>
	            <view>{{list.departure_date}}</view>
	          </view>
	          <view class="one" style="width:48%">
	            <image src="/static/img/traveldetails_icon7.png" alt="">
	            <text>人均花费</text>
	            <view>¥{{list.price}}</view>
	          </view>
	        </view>
	        <view class="up">
	          <view class="one" style="width:55%">
	            <image src="/static/img/traveldetails_icon5.png" alt="">
	            <text>出行人物</text>
	            <view>{{list.traveler}}</view>
	          </view>
	          <view class="one" style="width:48%">
	            <image src="/static/img/traveldetails_icon6.png" alt="">
	            <text>出行天数</text>
	            <view>{{list.last_days}}天</view>
	          </view>
	        </view>
	      </view>
	    </view>
	    <view class="content">
	      <!-- <view class="con" v-html="list.content_trans"></view> -->
		  <view class="con">
		  	<u-parse :content="list.content_trans" />
		  </view>
	      <view class="bottom">
	        本游记著作权归@{{list.author.nickname}}所有，任何形式转载请联系作者。
	      </view>
	    </view>
	    <view class="under">
	      <view class="under_p">
	        <view class="one">
	          <image src="/static/img/traveldetails_icon1.png" alt="">
	          <view class="con">
	            <view class="c">
	              {{list.votes_count}}<text v-if="list.votes_count>999">+</text>
	            </view>
	          </view>
	        </view>
	        <view class="line"></view>
	        <view class="one">
	          <image src="/static/img/traveldetails_icon2.png" alt="">
	          <view class="con">
	            <view class="c">
	              {{list.favorites_count}}<text v-if="list.favorites_count>999">+</text>
	            </view>
	          </view>
	        </view>
	        <view class="line"></view>
	        <view class="one">
	          <image src="/static/img/traveldetails_icon3.png" alt="">
	          <view class="con">
	            <view class="c">
	              {{list.comments_count}}<text v-if="list.comments_count>999">+</text>
	            </view>
	          </view>
	        </view>
	      </view>
	    </view>
	    <view class="comments">
	      <view class="title">
	        热门评论 <text>({{list.comments.length}})</text>
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
	      <view class="none" v-if="!list.comments.length">
	        <image src="/static/img/none.png" alt="">
	      </view>
	    </view>
	</view>
</template>

<script>
	import uParse from '@/plugins/gaoyia-parse/parse.vue';
	import { travelsDetail } from '@/http/api.js';
	export default {
		components: {
			uParse
		},
		data() {
			return {
				id:'41',
				list:[]
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
		},
		methods: {
			getDetail(id){
				travelsDetail(id).then(res => {
					this.list = res.data;
				});
			},
			toAll(){
				uni.navigateTo({
					url: "/pages/newDetail/comments/comments?id=" + this.id +"&type=travels"
				});
			}
		}
	}
</script>

<style>
	@import url("traveldetails.css");
</style>
