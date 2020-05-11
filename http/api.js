import http from "@/http/request.js";
//////////////////////////////////////////////////////////新建

//授权登陆
export function get_phoneLogin(data) {
	return http({
		url: "/api/wechat/get_phone",
		method: 'POST',
		data: data
	})
}
//筛选条件接口-定制师列表
export function users() {
	return http({
		url: "/api/users/authorizations"
	})
}

//筛选条件接口-定制师列表
export function getcustomDesignerselct() {
	return http({
		url: "/api/customizers/configs"
	})
}
//热门城市
export function citysHot() {
	return http({
		url: "/api/citys/hot"
	})
}
//预约导游-列表
export function getCustomizers(page, city_code, sex, goodat_type, sort) {
	return http({
		url: "/api/customizers",
		data: {
			page: page,
			city_code: city_code,
			sex: sex,
			goodat_type: goodat_type,
			sort: sort
		}
	})
}
//访客记录
export function visitors(data) {
	return http({
		url: `/api/wechat/visitors`,
		method: 'POST',
		data: data
	})
}
//工作室(其他用户)-详情
export function usersStudio(id, openid) {
	return http({
		url: "/api/users/" + id + "/studio?openid=" + openid
	})
}
//短视频-列表
export function videos(page, id) {
	return http({
		url: `/api/users/${id}/short-videos`,
		data: {
			page: page
		}
	})
}
//圈子(我的)-列表
export function circle(page, id) {
	return http({
		url: `/api/users/${id}/circle`,
		data: {
			page: page
		}
	})
}
//圈子推荐(我的)-列表
export function circles(id, recommend) {
	return http({
		url: `/api/users/${id}/circle`,
		data: {
			recommend: recommend
		}
	})
}
//游记(我的)-列表
export function travels(page, id) {
	return http({
		url: `/api/users/${id}/travels`,
		data: {
			page: page
		}
	})
}
//其他用户-问答
export function questions(page, id) {
	return http({
		url: `/api/users/${id}/questions`,
		data: {
			page: page
		}
	})
}

//登录
export function loginPassword(mobile, password, userInfo, openid, code) {
	return http({
		url: "/api/wechat/authorizeLogin",
		method: 'POST',
		data: {
			mobile: mobile,
			password: password,
			userInfo: userInfo,
			openid: openid,
			code: code
		}
	})
}
//预约导游-导游档期（月视图）
export function guidesSchedules(id, month) {
	return http({
		url: "/api/guides/" + id + "/schedules",
		data: {
			month: month
		}
	})
}
//酒店民宿日历（月视图）
export function hotelCalendar(id, month) {
	return http({
		url: `/api/hotel-rooms/${id}/calendars?month=${month}`,
		data: {
			month: month
		}
	})
}

//获取资源列表
export function getResources(id, page, type, keywords, city_code, destination_code, client) {
	let data = {}
	// if (id) {
	// 	data["id"] = id
	// }
	if (page) {
		data["page"] = page
	}
	if (type) {
		data["type"] = type
	}
	if (keywords) {
		data["q"] = keywords
	}
	// if(keywords){
	// 	data["keywords"]=keywords
	// }
	if (city_code) {
		data["city_code"] = city_code
	}
	if (destination_code) {
		data["destination_code"] = destination_code
	}
	if (client) {
		data["client"] = client
	}
	return http({
		url: `/api/users/${id}/distributions`,
		data: data
	})
}
//资源-详情
export function sourcesDetail(id, type) {
	return http({
		url: "/api/resources/" + id,
		data: {
			type: type
		}
	})
}
//分销的资源-详情
export function distributionDetail(id, type) {
	return http({
		url: "/api/distributions/" + id,
		data: {
			type: type
		}
	})
}

//标品-详情
export function boutiquesDetail(id, type) {
	return http({
		url: `/api/${type}/${id}`
	})
}
//标品-线路-时间
export function boutiquesTeams(id, date, type) {
	return http({
		url: `/api/${type}/${id}/teams/${date}`
	})
}
//参数配置-订单评价
export function evaluationsConfigs() {
	return http({
		url: "/api/evaluations/configs"
	})
}

//评价-新增(对已完成订单评价)
export function evaluationsOrders(id, service_attitude, sight_explain, travel_execution, tags, userInfo, openid) {
	return http({
		url: "/api/orders/" + id + "/evaluations/wechat",
		method: 'POST',
		data: {
			service_attitude: service_attitude,
			sight_explain: sight_explain,
			travel_execution: travel_execution,
			tags: tags,
			userInfo: userInfo,
			openid: openid
		}
	})
}

//评价订单信息
export function orders(id) {
	return http({
		url: "/api/orders/" + id
	})
}
//小程序-粉丝绑定
export function bindfans(id, user_id, code, openid, userInfo) {
	return http({
		url: "/api/wechat/fans",
		method: 'POST',
		data: {
			id: id,
			user_id: user_id,
			code: code,
			openid: openid,
			userInfo: userInfo
		}
	})
}
//获取openid
export function getOpenid(code) {
	return http({
		url: "/api/wechat/openid",
		data: {
			code: code,
			// app: 'old'
		}
	})
}
//方案-详情
export function plans(id) {
	return http({
		url: "/api/plans/" + id
	})
}
//定制游-方案确认微信
export function grabs(id) {
	return http({
		url: `/api/grabs/${id}/confirm`,
		method: 'PUT',
	})
}
//登录
export function loginPasswords(mobile, userInfo, openid, wx_code, code) {
	return http({
		url: "/api/wechat/authorizeLogin",
		method: 'POST',
		data: {
			mobile: mobile,
			userInfo: userInfo,
			openid: openid,
			wx_code: wx_code,
			code: code,
			// app: "old"
		}
	})
}
//获取验证码
export function code(mobile) {
	return http({
		url: "/api/sms-code?type=2",
		method: 'POST',
		data: {
			mobile: mobile
		}
	})
}
//定制师-浏览历史列表
export function access_records(openid) {
	return http({
		url: "/api/customizers/access-records?openid=" + openid
	})
}
//定制师-浏览历史删除
export function access_records_del(id) {
	return http({
		url: "/api/customizers/access-records/" + id,
		method: 'DELETE',
	})
}
//微信支付
export function payWechat(id, openid) {
	return http({
		url: "/api/orders/" + id + "/pay/wechatminiapp",
		method: 'PUT',
		data: {
			openid: openid
		}
	})
}
//资源特产-下单
export function sourcesOrders(id, type, quantity, contact, contact_phone, contact_address, sharer_id) {
	return http({
		url: "/api/resources/" + id + "/orders?type=" + type,
		method: 'POST',
		data: {
			quantity: quantity,
			contact: contact,
			contact_phone: contact_phone,
			contact_address: contact_address,
			sharer_id: sharer_id
		}
	})
}
//资源-下单
export function sourcesOrdersa(id, type, quantity, sharer_id) {
	return http({
		url: "/api/resources/" + id + "/orders?type=" + type,
		method: 'POST',
		data: {
			quantity: quantity,
			sharer_id: sharer_id
		}
	})
}
//资源酒店-下单
// sourcesOrdersb(id, type, child, sharer_id)
export function resourcesHotel(data) {
	if (data.quantity) {
		data['quantity'] = data.quantity
	}
	// if (type) {
	// 	data['type'] = type
	// }
	if (data.contact_phone) {
		data['contact_phone'] = data.contact_phone
	}
	if (data.start_date) {
		data['start_date'] = data.start_date
	}
	if (data.end_date) {
		data['end_date'] = data.end_date
	}
	if (data.number_of_adults) {
		data['number_of_adults'] = data.number_of_adults
	}
	if (data.number_of_children) {
		data['number_of_children'] = data.number_of_children
	}
	if (data.contact_phone) {
		data['contact_phone'] = data.contact_phone
	}
	if (data.check_in_names) {
		data['check_in_names'] = data.check_in_names
	}
	if (data.sharer_id) {
		data['sharer_id'] = data.sharer_id
	}
	return http({
		url: `/api/resources/${data.id}/orders?type=${data.type}`,
		method: 'POST',
		data: data
	})
}

//资源线路-下单-普通标品
export function boutiquesOrders(id, team_id, quantity, sharer_id, type) {
	return http({
		url: `/api/${type}/${id}/orders`,
		method: 'POST',
		data: {
			team_id: team_id,
			quantity: quantity,
			sharer_id: sharer_id
		}
	})
}

//资源-下单-分销
// distributionsOrders(id, team_id, quantity, type, child, contact, contact_phone, contact_address,sharer_id)
export function distributionsOrders(data) {
	// let data = {}
	if (data.team_id) {
		data['team_id'] = data.team_id
	}
	if (data.quantity) {
		data['quantity'] = data.quantity
	}
	// if (type) {
	// 	data['type'] = type
	// }
	if (data.child) {
		data['child'] = data.child
	}
	if (data.contact) {
		data['contact'] = data.contact
	}
	if (data.contact_phone) {
		data['contact_phone'] = data.contact_phone
	}
	if (data.contact_address) {
		data['contact_address'] = data.contact_address
	}
	if (data.start_date) {
		data['start_date'] = data.start_date
	}
	if (data.end_date) {
		data['end_date'] = data.end_date
	}
	if (data.number_of_adults) {
		data['number_of_adults'] = data.number_of_adults
	}
	if (data.number_of_children) {
		data['number_of_children'] = data.number_of_children
	}
	if (data.contact_phone) {
		data['contact_phone'] = data.contact_phone
	}
	if (data.check_in_names) {
		data['check_in_names'] = data.check_in_names
	}
	if (data.sharer_id) {
		data['sharer_id'] = data.sharer_id
	}
	return http({
		url: `/api/distributions/${data.id}/orders?type=${data.type}`,
		method: 'POST',
		data: data
	})
}
//资源-下单-普通资源
// resourcesOrders(id, team_id, quantity, type, child, contact, contact_phone, contact_address, sharer_id)
export function resourcesOrders(data) {
	// let data = {}
	if (data.team_id) {
		data['team_id'] = data.team_id
	}
	if (data.quantity) {
		data['quantity'] = data.quantity
	}
	// if (type) {
	// 	data['type'] = type
	// }
	if (data.child) {
		data['child'] = data.child
	}
	if (data.contact) {
		data['contact'] = data.contact
	}
	if (data.contact_phone) {
		data['contact_phone'] = data.contact_phone
	}
	if (data.contact_address) {
		data['contact_address'] = data.contact_address
	}
	if (data.sharer_id) {
		data['sharer_id'] = data.sharer_id
	}
	return http({
		url: `/api/resources/${id}/orders?type=${type}`,
		method: 'POST',
		data: data
	})
}



//游记攻略-详情
export function travelsDetail(id) {
	return http({
		url: "/api/travels/" + id + "?w=800"
	})
}

//短视频-详情
export function shortvideos(id) {
	return http({
		url: "/api/short-videos/" + id
	})
}
//评论列表
export function comments(page, type, id) {
	return http({
		url: "/api/" + type + "/" + id + "/comments",
		data: {
			page: page
		}
	})
}
//问题-详情
export function questionDetail(id) {
	return http({
		url: "/api/questions/" + id
	})
}
//问题-详情
export function questionAnswers(page, order, id) {
	return http({
		url: "/api/questions/" + id + "/answers",
		data: {
			page: page,
			per_page: 10,
			order: order
		}
	})
}
//个人中心
export function userInfo() {
	return http({
		url: "/api/users/me",
	})
}
//订单列表
export function travelOrders(data) {
	return http({
		url: "/api/users/orders",
		data: data
	})
}
//订单详情
export function ordersDetail(data) {
	return http({
		url: `/api/orders/${data.id}`,
	})
}
//取消订单
export function ordersCancel(data) {
	return http({
		url: `/api/orders/${data.id}/cancel`,
		method: 'PUT',
	})
}
//我的钱包
export function getWallet() {
	return http({
		url: "/api/users/wallet"
	})
}
//分佣记录
export function getCommissionRecord(data) {
	return http({
		url: "/api/users/commission_record",
		data: data
	})
}
//提现记录
export function getWithDrawals(data) {
	return http({
		url: "/api/users/withdrawals",
		data: data
	})
}

//申请提现
export function applyForWithdrawal(data) {
	return http({
		url: '/api/withdrawals',
		method: 'POST',
		data: data
	})
}
