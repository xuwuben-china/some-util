/**
 *冒泡排序
 @param {Array} arr
 @param {Number|Boolean}
*/
const bubbeSort = (arr, rule) => {
  let r = (rule === undefined || rule === true ||rule > 0) ? true : false;
  for (let i = 0, len = arr.length; i <= len - 1; i++) {
    let exchange = false
    for (let j = 0, l = len - 1 - i; j <= l; j++) {
      if (!r && arr[j] < arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        exchange = true
      } else if (r && arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        exchange = true
      }
    }
    if (!exchange) {
      return
    }
  }
}

/** 
  *选择排序
  @param  {Array} arr
*/
const selectSort = (arr) => {
  for (let i = 0, len = arr.length; i < len - 1; i++){
    let min_index = i
    for (let j = i + 1; j < len; j++){
      if (arr[j] < arr[min_index]) {
        min_index = j
      }
    }
    [arr[i],arr[min_index]] = [arr[min_index],arr[i]]
  }
}
/**
  *插入排序
  @param {Array} arr
*/
const insetSort = (arr) => {
  for (let i = 1, len = arr.length; i < len; i++){
    let tmp = arr[i], j = i - 1
    while (j>=0 && tmp < arr[j]) {
      [arr[i]] = [arr[j]]
      j = j - 1
    }
    arr[j+1]=tmp
  }
}
/** 
  *归位
  @param {Array} arr
  @param {Number} left
  @param {Numer}  right
  @returns {Number}
*/
const partition = (arr,left,right) => {
  let tmp = arr[left]
  while (left < right) {
    while (left < right&&arr[right]>=tmp) {
      right-=1
    }
    arr[left] = arr[right]
    while (left<right&&arr[left]<=tmp) {
      left+=1
    }
    arr[right] = arr[left]
  }
  arr[left] = tmp
  return left
}
/** 
  *快速排序
  @param  {Array} arr
  @param  {Number} left
  @param  {Number} right
*/
const quickSort = (arr, left, right) => {
  if (left < right) {
    let min = partition(arr, left, right)
    quickSort(arr,left,min-1)
    quickSort(arr,min+1,right)
  }
}
/** 
*大分堆调整
* @param {Array} arr
* @param  {Number} low
* @param  {Number} high
*/
const sift = (arr,low,high)=>{
  let i = low, j = 2 * i + 1, tmp = arr[low];
  while (j <= high) {
    if (j+1<=high&&arr[j+1]>arr[j]) {
      j = j+1
    }
    if (arr[j]>tmp) {
      arr[i]=arr[j]
      i = j
      j = 2 * i + 1
    } else {
      break
    }
  }
  arr[i]=tmp
}
/** 
*小分堆调整
* @param {Array} arr
* @param  {Number} low
* @param  {Number} high
*/
const siftDown = (arr,low,high)=>{
  let i = low, j = 2 * i + 1, tmp = arr[low];
  while (j <= high) {
    if (j+1<=high&&arr[j+1]<arr[j]) {
      j = j+1
    }
    if (arr[j]<tmp) {
      arr[i]=arr[j]
      i = j
      j = 2 * i + 1
    } else {
      break
    }
  }
  arr[i]=tmp
}
/** 
* 堆排序
* @param {Array} arr
*/
const heapSort = (arr) => {
  let n = arr.length
  for (let i = Math.floor((n - 2) / 2); i >= 0; i--){
    sift(arr,i,n-1)
  }
  for (let i = n - 1; i >= 0; i--){
    [arr[0], arr[i]] = [arr[i], arr[0]];
    sift(arr,0,i-1)
  }
}
/** 
* 取数组最大的k个值
* @param {Array} arr
* @param {Number} k
* @returns {Array}
*/
const topk = (arr,k) => {
  let heap = arr.slice(0, k), len = arr.length
  for (let i = Math.floor((k - 2) / 2); i >= 0; i--){
    siftDown(heap,i,k-1)
  }
  for (let i = k; i <= len - 1;i++) {
    if (arr[i]>heap[0]) {
      heap[0] = arr[i]
      siftDown(heap,0,k-1)
    }
  }
  for (let i = k - 1; i >= 0; i--){
    [heap[0], heap[i]] = [heap[i], heap[0]];
    siftDown(heap,0,i-1)
  }
  return heap
}
/**
* @param {Array} leftArr
* @param {Array} rightArr
* @returns {Array} 
 */
const merge = (leftArr,rightArr) => {
  let newArr = []
  while (leftArr.length&&rightArr.length) {
    if (leftArr[0]<=rightArr[0]) {
      newArr.push(leftArr.shift())
    } else {
      newArr.push(rightArr.shift())
    }
  }
  while (leftArr.length) {
    newArr.push(leftArr.shift())
  }
  while (rightArr.length) {
    newArr.push(rightArr.shift())
  }
  // arr = newArr
  return newArr
}
/**
* @param {Array} arr
* @returns {Array} 
 */
const mergeSort = (arr) => {
  let len = arr.length
  if (len < 2) {
    return arr
  }
  let mid = Math.floor(len/ 2)
  // 拆分成两个数组
  let leftArr = arr.slice(0,mid)
  let rightArr = arr.slice(mid, len)
  // 递归拆分
  let mergeSortLeft = mergeSort(leftArr)
  let mergeSortRight = mergeSort(rightArr)
  return merge(mergeSortLeft,mergeSortRight)
}
let arr = [2,5,7,9,3,5,1,4,7]
console.log(mergeSort(arr));
console.log(arr);