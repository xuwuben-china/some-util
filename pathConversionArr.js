/**
 * @description 将字符串路径转换为数组   
 * @param {String} pathname 路径      "/home/demo/detail" => ["/home","/home/demo/","/home/demo/detail"]
 * @param {Boolean} isPop 是否去掉最后的路径 "/home/demo/detail" => ["/home","/home/demo/"] 去掉了最后一个值（在menu的openkeys中需要去掉）
 */

export const pathConversionArr = (pathname, isPop = false) => {
  let pathnameKeys = pathname.split('/')
  pathnameKeys.shift()
  isPop && pathnameKeys.pop()
  let pathnameArr = pathnameKeys.map(item => "/" + item).map((item, index, arr) => {
    if (index > 0) {
      let path = ''
      for (let i = 0; i <= index; i++) {
        path += arr[i]
      }
      return path
    }
    return item
  })
  return pathnameArr
}