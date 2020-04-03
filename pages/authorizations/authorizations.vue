<template>
	<view class="users">
		<view class="users-content">
			<image class="users-content-img" src="../../static/img/welcome.png" mode=""></image>
			<button class="users-content-btn" open-type="getUserInfo" @getuserinfo="getConfig()">欢迎进入</button>
			<image class="users-content-imglogo" src="../../static/img/welcomelogo.png" mode=""></image>
		</view>
	</view>
</template>

<script>
import { users, getOpenid } from '@/http/api.js';
export default {
	data() {
		return {
			id: '',
			data: '',
			code: '',
			userInfo: [],
			openid: ''
			// openidUrl: 'https://api.weixin.qq.com/sns/jscode2session', //获取openid接口
			// APP_SECRET: 'ddec28ff357d206e32a42b41575de883',
			// APP_ID: 'wx620e699d34566854'
		};
	},
	onShow() {},
	onLoad(options) {
		// this.getConfig();
		this.id = options.id;
		console.log(this.id);
	},
	methods: {
		//获取用户信息
		getConfig() {
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
												uni.setStorageSync('userInfo', infoRes.userInfo);
												uni.navigateTo({
													url: '/pages/studio/studio?id=' + that.id
												});
											}
										});
									}
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
	background-color: #e7f1f0;
}
.users-content {
	width: 100vw;
	height: 100vh;
	background-color: #e7f1f0;
	text-align: center;
}
.users-content-img {
	width: 674upx;
	height: 674upx;
	margin: 30upx auto 0upx;
}
.users-content-btn {
	width: 280upx;
	height: 78upx;
	background-color: #f16666;
	border-radius: 39upx;
	text-align: center;
	margin: 110upx auto;
	font-family: PingFang-SC-Medium;
	font-size: 30upx;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0upx;
	color: #ffffff;
	line-height: 78upx;
}
.users-content-imglogo {
	height: 65upx;
	width: 195upx;
}
</style>
