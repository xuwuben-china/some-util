const defaultConfig = {
	// 设置请求的 header，header 中不能设置 Referer。
	header:{},
	// 超时时间，单位 ms
	timeout:6000,
	// 如果设为 json，会尝试对返回的数据做一次 JSON.parse
	dataType:"json",
	// 设置响应的数据类型。合法值：text、arraybuffer
	responseType:'text',
	// 验证 ssl 证书
	sslVerify:true,
	// 跨域请求时是否携带凭证（cookies）
	withCredentials:false,
	// DNS解析时优先使用ipv4
	firstIpv4:false,
}

export default defaultConfig