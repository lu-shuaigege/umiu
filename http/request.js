// var baseUrl = 'https://admin.umu888.com';
var baseUrl = 'http://umiu.dev.zhangxinkeji.com';
// var baseUrl = 'http://umu888.dev.zhangxinkeji.com';

var $http = function(options) {
	console.log("接口参数", options)
	// uni.setStorageSync('token',
	// 	'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC91bWl1LmRldi56aGFuZ3hpbmtlamkuY29tXC9hcGlcL2xvZ2luXC9wYXNzd29yZCIsImlhdCI6MTU4ODE1MTk1OCwiZXhwIjoxNTg4NzU2NzU4LCJuYmYiOjE1ODgxNTE5NTgsImp0aSI6IjFOanlEbVhNN2ZYdE40RXoiLCJzdWIiOjEwMDAwMDIsInBydiI6ImI5MTI3OTk3OGYxMWFhN2JjNTY3MDQ4N2ZmZjAxZTIyODI1M2ZlNDgifQ.ys1oqJuX_asdDIuvxm271pcdQkPz2XGE-2C6o-eS5bg'
	// );

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
				if (res.data.code == 3003) {
					uni.navigateTo({
						url: `/pages/authorizations/authorizations?needUserInfo=0&needToken=1`
					});
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
