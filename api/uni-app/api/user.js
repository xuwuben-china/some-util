import $http from './$http'
import constant from '../utils/constant.js'
const {pro,dev} = constant

// "http://42.192.58.60:9999"			测试 ip地址
// 'https://zopen.dev.bochin-tech.com'	测试 域名地址

let baseUrl = '/api'

if(process.env.NODE_ENV === 'development'){
    baseUrl = dev.BASE_URL
}else if(process.env.NODE_ENV === 'production'){
    baseUrl = pro.BASE_URL
}

export const get_code = (params)=>{
	return $http.get('/sms/v1/sendSmsVerifyCode',{
		baseUrl,
		header:{
			Authorization:'Basic c21tOnNtbQ=='
		},
		data:{
			...params
		}
		
	})
}

export const login = (data)=>{
	return $http.post('/adp/api/login/selfExpandUnionLogin?version=1.0',{
		baseUrl,
		data
	})
}