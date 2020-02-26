<template>
	<view class="tui-tabbar" :class="{'tui-tabbar-fixed':isFixed,'tui-unlined':unlined}" :style="{background:backgroundColor}">
		<block v-for="(item,index) in tabBar" :key="index">
			<view class="tui-tabbar-item" :class="{'tui-item-hump':item.hump}"
			 :style="{backgroundColor:item.hump?backgroundColor:'none'}" @tap="tabbarSwitch(index,item.hump,item.pagePath,item.verify)">
				<view class="tui-icon-box" :class="{'tui-tabbar-hump':item.hump}">
					<image :src="current==index?item.selectedIconPath:item.iconPath" :class="[item.hump?'':'tui-tabbar-icon']"></image>
					<view :class="[item.isDot?'tui-badge-dot':'tui-badge']" :style="{color:badgeColor,backgroundColor:badgeBgColor}"
					 v-if="item.num">{{item.isDot?"":item.num}}</view>
				</view>
				<view class="tui-text-scale" :class="{'tui-text-hump':item.hump}" :style="{color:current==index?selectedColor:color}">{{item.text}}</view>
			</view>
		</block>
		<view :class="{'tui-hump-box':hump}" v-if="hump && !unlined"></view>
	</view>
</template>

<script>
	export default {
		name: "tuiTabbar",
		props: {
			//当前索引
			current: {
				type: Number,
				default: 0
			},
			//字体颜色
			color: {
				type: String,
				default: "#666"
			},
			//字体选中颜色
			selectedColor: {
				type: String,
				default: "#5677FC"
			},
			//背景颜色
			backgroundColor: {
				type: String,
				default: "#FFFFFF"
			},
			//是否需要中间凸起按钮
			hump: {
				type: Boolean,
				default: false
			},
			//固定在底部
			isFixed: {
				type: Boolean,
				default: true
			},
			//tabbar
			// "pagePath": "/pages/my/my", 页面路径
			// "text": "thor", 标题
			// "iconPath": "thor_gray.png", 图标地址
			// "selectedIconPath": "thor_active.png", 选中图标地址
			// "hump": true, 是否为凸起图标
			// "num": 2,   角标数量
			// "isDot": true,  角标是否为圆点
			// "verify": true  是否验证  （如登录）
			tabBar: {
				type: Array,
				default () {
					return []
				}
			},
			//角标字体颜色
			badgeColor: {
				type: String,
				default: "#fff"
			},
			//角标背景颜色
			badgeBgColor: {
				type: String,
				default: "#F74D54"
			},
			unlined: {
				type: Boolean,
				default: false
			}

		},
		watch: {
			current() {
               
			}
		},
		data() {
			return {

			};
		},
		methods: {
			tabbarSwitch(index, hump, pagePath,verify) {
				this.$emit("click", {
					index: index,
					hump: hump,
					pagePath: pagePath,
					verify:verify
				})
			}
		}
	}
</script>

<style>
	.tui-tabbar {
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}

	.tui-tabbar-fixed {
		position: fixed;
		z-index: 99999;
		left: 0;
		bottom: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-tabbar::before {
		content: '';
		width: 100%;
		border-top: 1upx solid #B2B2B2;
		position: absolute;
		top: 0;
		left: 0;
		transform: scaleY(0.5);
		transform-origin: 0 100%;
	}

	.tui-tabbar-item {
		height: 100%;
		flex: 1;
		display: flex;
		text-align: center;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		padding: 10upx 0;
		box-sizing: border-box;

	}

	.tui-icon-box {
		position: relative;
	}

	.tui-item-hump {
		height: 98upx;
		z-index: 2;
	}

	.tui-tabbar-icon {
		width: 52upx;
		height: 52upx;
		display: block;
	}

	.tui-hump-box {
		width: 120upx;
		height: 120upx;
		background: #FFFFFF;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: -50upx;
		border-radius: 50%;
		z-index: 1;
	}

	.tui-hump-box::before {
		content: '';
		height: 200%;
		width: 200%;
		border: 1upx solid #B2B2B2;
		position: absolute;
		top: 0;
		left: 0;
		transform: scale(0.5) translateZ(0);
		transform-origin: 0 0;
		border-radius: 100%;
	}

	.tui-unlined::before {
		border: 0 !important
	}

	.tui-tabbar-hump {
		width: 100upx;
		height: 100upx;
		position: absolute;
		left: 50%;
		transform: translateX(-50%) rotate(0deg);
		top: -40upx;
		transition: all 0.2s linear;
	}

	.tui-tabbar-hump image {
		width: 100upx;
		height: 100upx;
		display: block;
	}

	.tui-hump-active {
		transform: translateX(-50%) rotate(135deg);
	}

	.tui-text-hump {
		position: absolute;
		bottom: 10upx;
	}

	.tui-text-scale {
		font-weight: bold;
		transform: scale(0.8);
		font-size: 25upx;
		line-height: 28upx;
		transform-origin: center 100%;
	}

	.tui-badge {
		position: absolute;
		font-size: 24upx;
		height: 32upx;
		min-width: 20upx;
		padding: 0 6upx;
		border-radius: 40upx;
		right: 0;
		top: -5upx;
		transform: translateX(70%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-badge-dot {
		position: absolute;
		height: 16upx;
		width: 16upx;
		border-radius: 50%;
		right: -4upx;
		top: -4upx;
	}
</style>
