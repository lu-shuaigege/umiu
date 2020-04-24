<template>
	<view class="users">
		<view class="users-content">
			<image class="logo" src="../../static/img/ymyoverlogo.png" mode=""></image>
			<view class="con_title">授权体验游米游小程序</view>
			<view class="btna" v-if="needUserInfo == 1">
				<view class="btna_top">
					<image class="btna_top_img" src="../../static/img/landa_icon.png" mode=""></image>
					<view class="btna_top_right">登录权限</view>
				</view>
				<button :class="needUserInfo_active == 0 ? 'users-content-btn' : 'users-content-btnactive'" open-type="getUserInfo" @getuserinfo="getConfiguser">
					<image class="users-content-btn_img" src="../../static/img/one.png" mode=""></image>
					查看详情
				</button>
			</view>
			<view class="btna" v-if="needToken == 1">
				<view class="btna_top">
					<image class="btna_top_img" src="../../static/img/phonenum_icon.png" mode=""></image>
					<view class="btna_top_right">手机号授权</view>
				</view>
				<button :class="needToken_active == 0 ? 'users-content-btn' : 'users-content-btnactive'" open-type="getPhoneNumber" @getphonenumber="getConfig">
					<image class="users-content-btn_img" src="../../static/img/one.png" mode=""></image>
					授权手机号
				</button>
			</view>
		</view>
	</view>
</template>

<script>
import { users, getOpenid, get_phoneLogin } from '@/http/api.js';
export default {
	data() {
		return {
			id: '',
			isDis: '',
			uid: '',
			needUserInfo_active: 0,
			needToken_active: 0,
			data: '',
			code: '',
			userInfo: '',
			openid: '',
			session_key: '',
			token: '',
			needUserInfo: 0,
			needToken: 0,
			phones: 0,
			datas: ''
			// openidUrl: 'https://api.weixin.qq.com/sns/jscode2session', //获取openid接口
			// APP_SECRET: 'ddec28ff357d206e32a42b41575de883',
			// APP_ID: 'wx620e699d34566854'
		};
	},
	onShow() {},
	onLoad(options) {
		this.id = options.id;
		this.isDis = options.isDis;
		this.uid = options.uid;

		if (options.needUserInfo) {
			this.needUserInfo = options.needUserInfo;
		}
		if (options.needToken) {
			this.needToken = options.needToken;
		}
		if (options.datas) {
			this.datas = options.datas;
		}
		wx.getSetting({
			success: res => {
				//判断是否授权，如果授权成功
				if (res.authSetting['scope.userInfo']) {
					//获取用户信息
					wx.getUserInfo({
						success: res => {
							this.userInfo = res.userInfo;
							uni.setStorageSync('userInfo', res.userInfo);
							this.needUserInfo = 0;
						}
					});
				}
			}
		});
	},
	methods: {
		//获取用户信息
		getConfiguser(e) {
			let auth_param = e.detail;
			let that = this;
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					that.code = loginRes.code;
					uni.setStorageSync('code', loginRes.code);
					getOpenid(loginRes.code).then(res => {
						if (res.code == 0) {
							that.openid = res.data.openid;
							uni.setStorageSync('openid', res.data.openid);
							that.session_key = res.data.session_key;
							uni.setStorageSync('session_key', res.data.session_key);
							uni.getSetting({
								success(res) {
									if (res.authSetting['scope.userInfo']) {
										uni.getUserInfo({
											success: function(infoRes) {
												that.userInfo = infoRes.userInfo;
												uni.setStorageSync('userInfo', infoRes.userInfo);
												that.needUserInfo_active = 1;
												//需要用户信息并且用户已经授权并且不需要授权手机号
												if (that.needUserInfo == 1 && that.needUserInfo_active == 1 && that.needToken == 0) {
													let pages = getCurrentPages();
													let prevPage = pages[pages.length - 2]; //上一个页面
													console.log(prevPage);
													//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
													prevPage.setData({
														id: that.id,
														isDis: that.isDis,
														uid: that.uid
													});
													wx.navigateBack({
														//返回
														delta: 1
													});
												} else if (that.needToken_active == 1 && that.needToken_active == 1 && that.needUserInfo == 1 && that.needUserInfo_active == 1) {
													//需要用户信息并且用户已经授权并且需要授权手机号并且手机号已经授权
													let pages = getCurrentPages();
													let prevPage = pages[pages.length - 2]; //上一个页面
													console.log(prevPage);
													//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
													prevPage.setData({
														id: that.id,
														isDis: that.isDis,
														uid: that.uid
													});
													wx.navigateBack({
														//返回
														delta: 1
													});
												}
											}
										});
									}
								}
							});
						}
					});
				}
			});
		},
		//用户授权手机号
		getConfig(e) {
			console.log(e);
			// return false;
			let auth_param = e.detail;
			let that = this;
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log(loginRes);
					that.code = loginRes.code;
					uni.setStorageSync('code', loginRes.code);
					getOpenid(loginRes.code).then(res => {
						if (res.code == 0) {
							that.openid = res.data.openid;
							uni.setStorageSync('openid', res.data.openid);
							that.session_key = res.data.session_key;
							uni.setStorageSync('session_key', res.data.session_key);
							get_phoneLogin({
								code: loginRes.code,
								encryptedData: auth_param.encryptedData,
								iv: auth_param.iv,
								openid: that.openid,
								session_key: that.session_key
							}).then(res => {
								console.log(res);
								if (res.token) {
									uni.setStorageSync('token', res.token);
									that.needToken_active = 1;
								}
								// 需要手机号并且手机号已经授权并且不需要用户信息
								if (that.needToken_active == 1 && that.needToken == 1 && that.needUserInfo == 0) {
									let pages = getCurrentPages();
									let prevPage = pages[pages.length - 2]; //上一个页面
									console.log(prevPage);
									//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
									prevPage.setData({
										id: that.id,
										isDis: that.isDis,
										uid: that.uid
									});
									wx.navigateBack({
										//返回
										delta: 1
									});
								} else if (that.needToken_active == 1 && that.needToken_active == 1 && that.needUserInfo == 1 && that.needUserInfo_active == 1) {
									// 需要手机号并且手机号已经授权并且需要用户信息并且用户信息已经授权
									let pages = getCurrentPages();
									let prevPage = pages[pages.length - 2]; //上一个页面
									console.log(prevPage);
									//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
									prevPage.setData({
										id: that.id,
										isDis: that.isDis,
										uid: that.uid
									});
									wx.navigateBack({
										//返回
										delta: 1
									});
								}
							});
						}
					});
				}
			});
		}
	}
};
</script>

<style>
.users {
	width: 100vw;
	height: 100vh;
	background-image: url(../../static/img/loginbg.jpg);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.users-content {
	width: 690rpx;
	/* height: 1000rpx; */
	background-color: #f9fcfc;
	border-radius: 10rpx;
	text-align: center;
	padding: 1upx 36upx 0upx 31upx;
	box-sizing: border-box;
}
.logo {
	width: 130rpx;
	height: 132rpx;
	display: inline-block;
	margin: 93upx auto 0upx;
}
.con_title {
	font-family: PingFang-SC-Bold;
	font-size: 30rpx;
	font-weight: normal;
	font-stretch: normal;
	/* line-height: 36rpx; */
	letter-spacing: 0rpx;
	color: #28282c;
	text-align: center;
	margin: 36upx auto 89upx;
}
.btna {
	width: 100%;
	height: 305upx;
}
.btna_top {
	display: flex;
	align-items: center;
}
.btna_top_img {
	width: 60rpx;
	height: 60rpx;
}
.btna_top_right {
	font-family: PingFang-SC-Bold;
	font-size: 30rpx;
	font-weight: normal;
	font-stretch: normal;
	/* line-height: 36rpx; */
	letter-spacing: 0rpx;
	color: #999999;
	margin-left: 20upx;
}
.users-content-btn {
	width: 586rpx;
	height: 88rpx;
	background-color: #fa9747;
	border-radius: 44rpx;
	border: 0upx !important;
	text-align: center;
	margin: 32upx 0upx 0upx 37upx;
	font-family: PingFang-SC-Medium;
	font-size: 30upx;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0upx;
	color: #ffffff;
	line-height: 88rpx;
	position: relative;
	padding: 0upx !important;
}
.users-content-btnactive {
	width: 586rpx;
	height: 88rpx;
	background-color: #e1e1e1;
	border-radius: 44rpx;
	border: 0upx !important;
	text-align: center;
	margin: 32upx 0upx 0upx 37upx;
	font-family: PingFang-SC-Medium;
	font-size: 30upx;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0upx;
	color: #ffffff;
	line-height: 88rpx;
	position: relative;
	padding: 0upx !important;
}
.users-content-btn_img {
	width: 47upx;
	height: 47upx;
	position: absolute;
	left: 32upx;
	top: 22upx;
}
button::after {
	border: 0upx;
}
</style>
