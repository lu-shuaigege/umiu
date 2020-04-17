var baseUrl = 'https://admin.umu888.com';
// var baseUrl = 'http://umiu.dev.zhangxinkeji.com';
// var baseUrl = 'http://umu888.dev.zhangxinkeji.com';
var $http = function(options) {
	return new Promise((resolve, reject) => {
		var _header = {
			'content-type': 'application/json',
		}
		_header.Authorization = 'bearer ' + uni.getStorageSync('token') || ''
		uni.request({
			url: baseUrl + options.url,
			method: options.method || "GET",
			header: _header,
			data: options.data || {},
			success: res => {
				if (res.data.token) {
					uni.setStorageSync('token', res.data.token);
				}
				if (res.token) {
					uni.setStorageSync('token', res.token);
				}
				if (res.data.code == 3001) {
					// uni.navigateTo({
					// 	url: '/pages/login/login'
					// });
					// reject(res.data);
				}
				if (res.data.code !== 0 && res.data.code != 3001) {
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					});
					reject(res.data);
				}
				// if (res.data.code == 1001) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: res.data.msg
				// 	});
				// 	reject(res.data);
				// }
				resolve(res.data);
			},
			fail: res => {
				uni.showToast({
					icon: 'none',
					title: '服务器异常'
				});
				reject(res.data);
			}
		})
	})
}

export default $http;
