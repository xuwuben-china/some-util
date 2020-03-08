/*
  常用事件方法兼容包装（跨浏览器方法）
  addHandler(element, type, handler)      添加事件
  getEvent(event)                         获取event对象
  getTarget(event)                        获取目标元素
  preventDefault(event)                   阻止默认事件
  getRelatedTarget(event)                 获取事件相关目标
  getButton(event)                        获取点击鼠标按钮    返回（0：鼠标左键  1：鼠标中键  2: 鼠标右键）
  getWeelDelta(event)                     获取滚轮事件
  getCharCode(event)                      获取按键键码
  removeHandler(element, type, handler)   移除事件
  stopPropagation(event)                  阻止冒泡
*/
var EventUtil = {
  //添加事件
  addHandler: function(element, type, handler){
    if (element.addEventListener) {
      element.addEventListener(type, handler, false)
    } else if (element.attachEvent){
      element.attachEvent("on" + type, handler)
    } else {
      element["on" + type] = handler
    }
  },
  //获取event对象
  getEvent: function(event){
    return event ? event : window.event
  },
  //获取目标元素
  getTarget: function(event){
    return event.target || event.srcElement
  },
  //阻止默认事件
  preventDefault: function(event){
    if(event.preventDefault){
      event.preventDefault()
    } else {
      event.returnValue = false
     }
  },
  //获取事件相关目标
  getRelatedTarget: function (event){
    if(event.relatedTarget){
      return event.relatedTarget
    } else if (event.toElement){
      return event.toElement
    } else if (event.formElement){
      return event.formElement
    } else {
      return null
    }
  },
  //获取点击鼠标按钮
  getButton: function (event){
    if (document.implementation.hasFeature("MouseEvents", "2.0")){
      return event.button
    } else {
      switch(event.button){
        case 0:
        case 1:
        case 3:
        case 5:
        case 7:
          return 0;
         case 2:
         case 6:
          return 2;
         case 4:
          return 1
      }
    }
  },
  //获取滚轮事件
  getWeelDelta: function(event){
     if(event.wheelDelta){
      return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta)
     } else {
      return -event.detail * 40
     }
  },
  //获取按键键码
  getCharCode: function(event){
    if(typeof event.charCode == "number"){
      return event.charCode
    } else {
      return event.keCode
    }
  },
  //移除事件
  removeHandler: function (element, type, handler){
    if(element.removeEventListener) {
      element.removeEventListener(type, handler, false)
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler)
    } else {
      element["on" + type] = null
    }
  }，
  //阻止冒泡
  stopPropagation: function(){
    if(event.stopPropagation){
      event.stopPropagation()
    } else {
      event.cancelBubble = true
    }
  }
}
