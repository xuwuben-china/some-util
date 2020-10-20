/**
 * @description 扁平化数组    
 * @param {Array} arr 需要扁平化的数组  [1,2,[3,4,[5,6]]] => [1,2,3,4,5,6]
 * @param {String} key 当需要扁平化数组是对象的key   [{},{key:[{},{}]}]=>[{},{},{}]
 * @param {Boolean} isRetain 是否保留key的数组  [{},{a:1,key:[{},{}]}]=>[{},{a:1,key:[{},{}]},{},{}]
 */
export const flatten = (arr, key, isRetain = false) => {
  return arr.reduce((result, item) => {
    if (key) {
      if (isRetain) {
        return result.concat(Array.isArray(item[key]) ? flatten(item[key], key, true) : item).concat(Array.isArray(item.subs) ? item : []);
      }
      return result.concat(Array.isArray(item[key]) ? flatten(item[key], key) : item);
    }
    return result.concat(Array.isArray(item) ? flatten(item) : item).concat(Array.isArray(item) ? item : []);
  }, []);
}