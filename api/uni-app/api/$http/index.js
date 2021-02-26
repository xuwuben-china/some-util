import defaultConfig from './defaultConfig.js'

/**  
 * @$http 封装request 用法类似axios
 * @param {String|Object} options
 * @param {Object} objData
 */

// #region 

// 自定义请求配置 可在此修改默认配置和设置token等
// baseUrl 设置pai前缀

// 如需取消请求  方法同axios  在第二个参数传入cancle回调
/* 
    取消请求实例
	let requestTask = null
	
	$http('api',{
		data:{},
		cancle:t=>{
			requestTask = t
		}
	})
	requestTask.abort()  // 取消请求
 
 */


// #endregion 

// 自定义全局请求设置
const customConfig = {
	
}

const request = ({
	url,
	method,
	data,
	config,
	cancle
}) => {
	return new Promise((reslove, reject) => {
		const requestTask = uni.request({
			url,
			method,
			data,
			...config,
			success(res) {
				if (res.data.code === 0) {
					reslove(res.data)
				} else {
					reject(res.data)
				}
			},
			fail(err) {
				reject(err.data)
			}
		})
		cancle && cancle(requestTask)
	})
}

const http = (
	method = 'GET'
) => {
	return function(options, objData = {}) {
			let {
				header = {}
			} = customConfig
		if (typeof options === 'string') {
			let addHeader = objData.header

			let url = options

			if (addHeader) {
				Object.assign(header, addHeader)
				objData.header = header
			}
			if (customConfig.baseUrl) {
				url = customConfig.baseUrl + options
			}
			if (objData.baseUrl) {
				url = objData.baseUrl + options
			}
			const {
				cancle
			} = objData

			delete objData.method
			delete objData.cancle
			delete objData.baseUrl

			if (objData.data !== undefined) {
				const {
					data
				} = objData
				delete objData.data

				const config = {
					...defaultConfig,
					...customConfig,
					...objData,
				}
				return request({
					url,
					method,
					data,
					config,
					cancle
				})
			} else {
				const config = {
					...defaultConfig,
					...customConfig,
				}
				return request({
					url,
					method,
					data: objData,
					config,
					cancle
				})
			}
		} else if (Object.prototype.toString.call(options) === '[object Object]') {
			let {
				url,
				data = {},
				cancle,
			} = options
			let addHeader = options.header
			if (customConfig.baseUrl) {
				url = customConfig.baseUrl + url
			}
			if (options.baseUrl) {
				url = options.baseUrl + url
			}
			if(addHeader){
				Object.assign(header,addHeader)
				options.header = header
			}
			delete options.url
			delete options.data
			delete options.method
			delete options.cancle
			delete options.baseUrl

			const config = {
				...defaultConfig,
				...customConfig,
				...options,
			}
			return request({
				url,
				method,
				data,
				config,
				cancle
			})
		}
	}
}


const Http = function(h) {
	this.ajax = uni.request
}

const $http = new Http(http);

['GET', 'POST', 'DELETE', 'PUT'].forEach(methods => {
	const method = methods.toLowerCase()
	console.log(method);
	Http.prototype[method] = http(methods)
})

export default $http
