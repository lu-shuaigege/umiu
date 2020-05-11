<template>
	<view class="holdon">
		<!-- <navigator url="../my/myIndex/myIndex" class="gotomyCenterbtn"></navigator> -->
		<image
			class="ball"
			:style="'left:' + ((moveX == 0) & (x > 0) ? x + '%' : moveX + 'px') + ';top:' + ((moveY == 0) & (y > 0) ? y + '%' : moveY + 'px')"
			@touchstart="drag_start"
			@touchmove.prevent="drag_hmove"
			:src="image"
			mode="aspectFit"
			@click="navigator()"
		></image>
	</view>
</template>
<script>
export default {
	props: {
		x: {
			type: Number,
			default: 0
		},
		y: {
			type: Number,
			default: 0
		},
		image: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			start: [0, 0],
			moveY: 0,
			moveX: 0,
			windowWidth: '',
			windowHeight: ''
		};
	},
	mounted() {
		const { windowWidth, windowHeight } = uni.getSystemInfoSync();
		this.windowWidth = windowWidth;
		this.windowHeight = windowHeight;
	},
	methods: {
		navigator() {
			uni.navigateTo({
				url: `/pages/my/myIndex/myIndex`
			});
		},
		drag_start(event) {
			this.start[0] = event.touches[0].clientX - event.target.offsetLeft;
			this.start[1] = event.touches[0].clientY - event.target.offsetTop;
		},
		drag_hmove(event) {
			let tag = event.touches;
			if (tag[0].clientX < 0) {
				tag[0].clientX = 0;
			}
			if (tag[0].clientY < 0) {
				tag[0].clientY = 0;
			}
			if (tag[0].clientX > this.windowWidth) {
				tag[0].clientX = this.windowWidth;
			}
			if (tag[0].clientY > this.windowHeight) {
				tag[0].clientY = this.windowHeight;
			}
			this.moveX = tag[0].clientX - this.start[0];
			this.moveY = tag[0].clientY - this.start[1];
		}
	}
};
</script>

<style lang="less">
.holdon {
	width: 100%;
	height: 100%;
}
.ball {
	// width: 70upx;
	// height: 70upx;
	width: 122.4upx;
	height: 146.4upx;
	// background: linear-gradient(to bottom, #f8f8ff, #87cefa);
	border-radius: 50%;
	// box-shadow: 0 0 15upx #87cefa;
	color: #fff;
	font-size: 30upx;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed !important;
	z-index: 1000000;
}
</style>
