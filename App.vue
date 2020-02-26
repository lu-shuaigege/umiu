<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import 'plugins/colorui/main.css';
@import 'plugins/colorui/icon.css';
/*每个页面公共css */
.wc1 .tui-modal-box {
	background: none;
	top: 38% !important;
}
.wc2 .tui-modal-box {
	background: none;
	top: 12% !important;
}
.wechatnum {
	width: 537upx;
	margin: 0 auto;
	position: relative;
}
.wechatnum_bg {
	width: 537upx;
	height: 676upx;
	position: absolute;
}
.wechatnum_close {
	width: 96upx;
	height: 96upx;
	position: absolute;
	right: 22upx;
	top: 22upx;
	padding: 28upx;
}
.wechatnum .title {
	position: absolute;
	color: rgb(51, 51, 51);
	font-size: 34upx;
	display: block;
	text-align: center;
	z-index: 1;
	width: 100%;
	margin-top: 250upx;
}
.wechatnum .num {
	position: absolute;
	color: rgb(255, 35, 35);
	font-size: 30upx;
	display: block;
	text-align: center;
	z-index: 1;
	width: 100%;
	margin-top: 320upx;
}
.wechatnum .copy {
	width: 554upx;
	height: 94upx;
	position: absolute;
	margin-top: 700upx;
}
.wechatnum .copy image {
	width: 554upx;
	height: 94upx;
	position: absolute;
}
.wechatnum .copy text {
	font-size: 30upx;
	color: rgb(255, 14, 44);
	position: absolute;
	display: block;
	text-align: center;
	width: 100%;
	margin-top: 18upx;
}

.tobuy {
	width: 100%;
	height: 100upx;
	line-height: 100upx;
	font-size: 30upx;
	color: #ffffff;
	background-color: #ff6600;
	text-align: center;
	position: fixed;
	bottom: 0;
	z-index: 9;
}
.confirm_bottom {
	width: 100%;
	height: 100upx;
	line-height: 100upx;
	font-size: 30upx;
	position: fixed;
	bottom: 0;
	background: #fff;
	display: flex;
	justify-content: space-between;
	z-index: 9;
}
.confirm_bottom .l {
	font-size: 24upx;
	color: #28282c;
	text-align: center;
	width: 375upx;
}
.confirm_bottom .l text {
	font-size: 36upx;
	font-weight: bold;
	color: #f03030;
}
.confirm_bottom .r {
	text-align: center;
	width: 375upx;
	height: 100upx;
	background-color: #ff6600;
	font-size: 30upx;
	color: #ffffff;
}
.logodisabled {
	pointer-events: none;
}
</style>
