// var baseUrl = 'https://admin.umu888.com';
var baseUrl = 'https://umiu.dev.zhangxinkeji.com';

var $http = function(options) {
	return new Promise((resolve, reject) => {
		var _header = {
			'content-type': 'application/json',
		}
		console.log(uni.getStorageSync('token'))
		_header.Authorization = 'bearer ' + uni.getStorageSync('token') || ''
		// _header.Authorization = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdW1pdS5kZXYuemhhbmd4aW5rZWppLmNvbVwvYXBpXC9sb2dpblwvcGFzc3dvcmQiLCJpYXQiOjE1NzgyOTUxODYsImV4cCI6MTU3ODg5OTk4NiwibmJmIjoxNTc4Mjk1MTg2LCJqdGkiOiJ6SWFwMXVEQ2tYaEozWU5vIiwic3ViIjoxMDAwMDIwLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.tcqu3-1mxMcc52Rn_SkjdRR0Rg_8UQXRBjAPF7qXmGU'
		uni.request({
			url: baseUrl + options.url,
			method: options.method || "GET",
			header: _header,
			data: options.data || {},
			success: res => {
				if (res.data.token) {
					uni.setStorageSync('token', res.data.token);
					console.log("newtoken")
					console.log(uni.getStorageSync('token'))
				}
				if (res.data.code == 3001) {
					// uni.navigateTo({
					// 	url: '/pages/login/login'
					// });
					// reject(res.data);
				}
				if (res.data.code !== 0) {
					// uni.showToast({
					// 	icon: 'none',
					// 	title: res.msg
					// });
					// reject(res.data);
				}
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
