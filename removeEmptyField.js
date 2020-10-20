// 去空对象
export const removeEmptyField = (obj) => {
  let newObj = {}
  if (typeof obj === 'string') {
    obj = JSON.parse(obj)
  }
  if (obj instanceof Array) {
    newObj = []
  }
  // 属性值不为'',null,undefined才加入新对象里面(去掉'',null,undefined)
  if (obj instanceof Object) {
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr) && obj[attr] !== '' && obj[attr] !== null && obj[attr] !== undefined) {
        if (obj[attr] instanceof Object) {
          // 空数组或空对象不加入新对象(去掉[],{})
          if (JSON.stringify(obj[attr]) === '{}' || JSON.stringify(obj[attr]) === '[]') {
            continue
          }
          // 属性值为对象,则递归执行去除方法
          newObj[attr] = removeEmptyField(obj[attr])
        } else if (
          typeof obj[attr] === 'string' &&
          ((obj[attr].indexOf('{') > -1 && obj[attr].indexOf('}') > -1) ||
            (obj[attr].indexOf('[') > -1 && obj[attr].indexOf(']') > -1))
        ) {
          // 属性值为JSON时
          try {
            var attrObj = JSON.parse(obj[attr])
            if (attrObj instanceof Object) {
              newObj[attr] = removeEmptyField(attrObj)
            }
          } catch (e) {
            newObj[attr] = obj[attr]
          }
        } else {
          newObj[attr] = obj[attr]
        }
      }
    }
  }
  return newObj
}