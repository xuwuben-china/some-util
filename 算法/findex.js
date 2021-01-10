/**
  *顺序查找
  * @param {Array} arr
  * @param {Number|String} val
  * @returns {Number} 
*/
const linearSearch = (arr, val) => {
  for (let i = 0, len = arr.length; i < len; i++){
    if (arr[i] === val) {
      return i
    } 
  }
  return -1
}
/** 
  *二分查找
  * @param {Array} arr
  * @param {Number|String} val
  * @returns {Number} 
*/
const binarySearch = (arr, val) => {
  let len = arr.length, left = 0, right = len - 1;
  while (left <= right) {
    let min = Math.floor((left+right)/2)
    if (arr[min] === val) {
      return min
    } else if (arr[min] > val) {
      right = min-1
    } else {
      left = min +1
    }
  }
  return -1
}