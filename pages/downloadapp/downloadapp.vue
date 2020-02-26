<template>
	<view class="page-body"><web-view :src="url + '/download'"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			url: ''
		};
	},
	onLoad(options) {
		this.url = this.$url;
	}
};
</script>

<style></style>
