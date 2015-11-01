var xhr = (function () {
	
	function buildParamPair (paramData, paramList, key) {
		paramList.push(key + '=' + paramData[key].toString());
		return paramList;
	}
	
	function buildGetParams (paramData) {
		return Object.keys(paramData).reduce(buildParamPair.bind(null, paramData)).join('&');
	}
	
	function buildRequestBody (paramData) {
		return typeof paramData === 'object' ? JSON.stringify(paramData) : undefined;
	}
	
	function buildGetUrl (baseUrl, options) {
		var urlParams = buildGetParams(options.requestData);
		return baseUrl + (urlParams === '' ? '' : '?' + urlParams);
	}
	
	function request (method, url, options) {
		
	}
	
	function delete () {}
	
	function get () {}
	
	function post () {}
	
	function put () {}
	
	return {
		delete: delete,
		get: get,
		post: post,
		put: put,
		request: request
	};
})();