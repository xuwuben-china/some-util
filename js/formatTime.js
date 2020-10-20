// 格式化时间
const formatTime = (fmt, date) => {
  // 判断是否是时间戳
  if (/^\d{10,13}$/.test(Number(date))) {
    date = new Date(date)
  }
  let weekDays = ['日', '一', '二', '三', '四', '五', '六']
  let o = {
    "M+": date.getMonth() + 1, //月
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3),
    /*季度 */
    "w": date.getDay(),
    "S": date.getMilliseconds() //毫秒
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1 == 'w') ? weekDays[o[k]] : (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}