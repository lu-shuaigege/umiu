<template>
	<view class="login">
		<image class="logo" src="/static/img/logo.png" mode=""></image>
		<view class="tel">
			<input type="number" maxlength="11" value="" placeholder="请输入手机号" @input="inputMobile" />
			<image src="/static/img/mobile.png" mode=""></image>
		</view>
		<view class="yzm">
			<input type="password" value="" placeholder="请输入短信验证码" @input="inputPassword" />
			<button v-if="!isCode" class="getcode" @click="getCode()">获取验证码</button>
			<button v-if="isCode" disabled class="disabled">{{ time }}秒后重新发送</button>
			<text class="line"></text>
			<image src="/static/img/yzm.png" mode=""></image>
		</view>
		<button class="submit" open-type="getUserInfo" @getuserinfo="wxGetUserInfo">登录</button>
		<tui-toast ref="toast"></tui-toast>
		<view class="cu-load load-modal" v-if="loadModal"><view class="gray-text">加载中...</view></view>
	</view>
</template>

<script>
import { loginPasswords } from '@/http/api.js';
import { getOpenid } from '@/http/api.js';
import { code } from '@/http/api.js';
import tuiToast from '@/plugins/thorui/components/extend/toast/toast.vue';
export default {
	components: {
		tuiToast
	},
	data() {
		return {
			id: '',
			isDis: 0,
			uid: 0,
			gid: '',
			mobile: '',
			password: '',
			isCode: false,
			code: '',
			time: '59',
			userInfo: [],
			openid: '',
			loadModal: false
			// openidUrl:'https://api.weixin.qq.com/sns/jscode2session',//获取openid接口
			// APP_SECRET:'cd3a365bbd2e41105726075d9bc886b9',
			// APP_ID:'wxc9a6128df4210b90',
		};
	},
	onShow() {
		wx.hideHomeButton();
	},
	onLoad(options) {
		this.id = options.id;
		if (options.isDis) {
			this.isDis = options.isDis;
		}
		if (options.uid) {
			this.uid = options.uid;
		}
		console.log('loin' + this.uid);
		if (options.gid) {
			this.gid = options.gid;
		}
	},
	methods: {
		getCode() {
			this.time = '59';
			if (!this.mobile) {
				uni.showToast({
					icon: 'none',
					title: '请输入手机号'
				});
				return;
			}
			if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
				uni.showToast({
					icon: 'none',
					title: '请输入正确的手机号'
				});
				return;
			}
			this.isCode = true;
			setInterval(() => {
				this.time--;
				if (this.time == 0) {
					this.isCode = false;
					return;
				}
			}, 1000);
			code(this.mobile).then(res => {
				if (res.code !== 0) {
					uni.showToast({
						icon: 'none',
						title: res.msg
					});
				}
			});
		},
		wxGetUserInfo() {
			let that = this;
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					that.code = loginRes.code;
					uni.setStorageSync('code', loginRes.code);
					getOpenid(loginRes.code).then(res => {
						if (res.code == 0) {
							that.openid = res.data;
							uni.setStorageSync('openid', res.data);
							uni.getSetting({
								success(res) {
									if (res.authSetting['scope.userInfo']) {
										uni.getUserInfo({
											success: function(infoRes) {
												that.userInfo = infoRes.userInfo;
												that.login();
											}
										});
									}
								}
							});
						}
					});
					// uni.request({
					//     url: that.openidUrl,
					//     data:{
					// 		appid:that.APP_ID,
					// 		secret:that.APP_SECRET,
					// 		js_code:loginRes.code,
					// 		grant_type:'authorization_code'
					// 	},
					// 	method:'GET',
					// 	success: function(res) {
					// 		that.openid = res.data.openid
					// 		uni.setStorageSync('openid', res.data.openid);
					// 		wx.getSetting({
					// 		  success (res){
					// 			if (res.authSetting['scope.userInfo']) {
					// 			  wx.getUserInfo({
					// 				success: function(infoRes) {
					// 					that.userInfo = infoRes.userInfo
					// 					that.login()
					// 				  }
					// 			  })
					// 			}
					// 		  }
					// 		})
					//     }
					// });
				}
			});
		},
		inputPassword(e) {
			this.password = e.detail.value;
		},
		inputMobile(e) {
			this.mobile = e.detail.value;
		},
		login() {
			if (!this.mobile) {
				uni.showToast({
					icon: 'none',
					title: '请输入手机号'
				});
				return;
			}
			if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
				uni.showToast({
					icon: 'none',
					title: '请输入正确的手机号'
				});
				return;
			}
			if (!this.password) {
				uni.showToast({
					icon: 'none',
					title: '请输入验证码'
				});
				return;
			}
			this.loadModal = true;
			loginPasswords(this.mobile, this.userInfo, this.openid, this.code, this.password).then(res => {
				if (res.code == 2006) {
					uni.showToast({
						icon: 'none',
						title: res.msg
					});
					this.loadModal = false;
					return;
				}
				if (res.code !== 0) {
					uni.showToast({
						icon: 'none',
						title: res.msg
					});
					return;
				}
				this.loadModal = false;
				uni.showToast({
					icon: 'none',
					title: '登录成功'
				});
				uni.setStorageSync('token', res.token);

				// uni.navigateTo({
				// 	url: '/pages/planDetail/planDetail?id=' + this.id + '&gid=' + this.gid
				// });

				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2]; //上一个页面
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				prevPage.setData({
					id: this.id,
					gid: this.gid,
					isDis: this.isDis,
					uid: this.uid
				});
				console.log(this.id);
				wx.navigateBack({
					//返回
					delta: 1
				});
				return;
			});
		}
	}
};
</script>

<style>
@import url('login.css');
</style>
