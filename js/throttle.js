/*
  throttle(）  节流函数
  
*/
function throttle(method, context){
  clearTimeout(method.tId)
  method.tId = setTimeout(function(){
    method.call(context)
  })
}
