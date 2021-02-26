import $http from './$http'

export const get_list = ()=>{
	return $http.get('/api',{
		data:{},
		header:{
			ccc:222
		}
	})
}
export const get_list1 = ()=>{
	return $http.get({
		url:'/api1',
		data:{},
		header:{
			ccc:222
		}
	})
}
