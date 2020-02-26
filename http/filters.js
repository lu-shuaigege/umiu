//课堂-群数量
// function unreadnum(val){
// 	if(val>=100){
// 		return '99+'
// 	}else {
// 		return val
// 	}
// }
// //课堂-课堂调研选择题
// function selectType(type){
// 	switch(type){
// 		case 1:
// 			return '单选题'
// 		break;
// 		case 2:
// 			return '多选题'
// 		break;
// 		case 3:
// 			return '问答题'
// 		break;
// 	}
// }
// //课堂-课程类型
// function classType(val){
// 	switch(val){
// 		case 1:
// 			return '线下内训课'
// 		break;
// 		case 2:
// 			return '线下公开课'
// 		break;
// 		case 3:
// 			return '线上直播语音课'
// 		break;
// 		case 4:
// 			return '其他'
// 		break;
// 	}
// }
// //课堂-课堂详情图片自适应
// function htmlImg(html){
//     let newContent = html.replace('/\<img/gi','<img style="max-width:100%;height:auto;display:block;"')

//   return newContent;
// }
// //课堂的状态
// function statusIf(time){
// 	// if(time =='1'){
// 		return '2'
// 	// }
// }
// //最后一条消息的时间
// function lasttime(time){
// 	let ltime =  parseInt((time % (1000 * 60)) / 1000)
// 	if(ltime==0){
// 		return '刚刚'
// 	}else{
// 		return ltime + '秒前'
// 	}
// }
// export {unreadnum,statusIf,lasttime,classType,htmlImg,selectType}

//课数字转大写
// function numChange(num){
// 	switch(num){
// 		case 1:
// 			return '一'
// 		break;
// 		case 2:
// 			return '二'
// 		break;
// 		case 3:
// 			return '三'
// 		break;
// 		case 4:
// 			return '四'
// 		break;
// 		case 5:
// 			return '五'
// 		break;
// 		case 6:
// 			return '六'
// 		break;
// 		case 7:
// 			return '七'
// 		break;
// 		case 8:
// 			return '八'
// 		break;
// 		case 9:
// 			return '九'
// 		break;
// 		case 10:
// 			return '十'
// 		break;
// 		case 11:
// 			return '十一'
// 		break;
// 		case 12:
// 			return '十二'
// 		break;
// 	}
// }
// export {numChange}