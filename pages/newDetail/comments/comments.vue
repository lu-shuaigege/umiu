<template>
	<view class="comments">
      <view class="title">
        热门评论 <text>({{comments.length}})</text>
      </view>
      <view class="comments_list">
        <view v-for="(item,index) in comments" :key="index">
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
      </view>
      <!-- <view class="none" v-if="!comments.length">
        <image src="/static/img/none.png" alt="">
      </view> -->
	  <!--加载loadding-->
	  <tui-loadmore :visible="loadding"></tui-loadmore>
	  <tui-nomore :visible="!pullUpOn"></tui-nomore>
	  <!--加载loadding-->
    </view>
</template>

<script>
	import tuiLoadmore from '@/plugins/thorui/components/loadmore/loadmore.vue';
	import tuiNomore from '@/plugins/thorui/components/nomore/nomore';
	import { comments } from '@/http/api.js';
	export default {
		components: {
			tuiLoadmore,
			tuiNomore
		},
		data() {
			return {
				id:'41',
				comments:[],
				loadding: false,
				pullUpOn: true,
				page: 1,
				type:'travels'
			}
		},
		onShow() {
			wx.hideHomeButton()
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id;
			}
			if(options.type){
				this.type = options.type;
			}
			this.getDetail(this.type,this.id)
		},
		methods: {
			getDetail(type,id){
				comments(this.page,type,id).then(res => {
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
		},
		// 页面上拉触底事件的处理函数
		onReachBottom: function() {
			this.getDetail(this.type,this.id);
		}
	}
</script>

<style>
	@import url("comments.css");
</style>
