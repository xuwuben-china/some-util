// 添加千位符      123456  => 123,456
function: kilobit(num) {
  return String(num).replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
},
