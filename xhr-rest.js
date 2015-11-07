var xhr = (function () {
	'use strict';
	
	function buildParamPair (requestData, paramList, key) {
		paramList.push(key + '=' + requestData[key].toString());
		return paramList;
	}
	
	function buildGetParams (requestData) {
		return Object.keys(requestData).reduce(buildParamPair.bind(null, requestData)).join('&');
	}
	
	function buildRequestBody (requestData) {
		return typeof requestData === 'object' ? JSON.stringify(requestData) : undefined;
	}
	
	function buildGetUrl (baseUrl, options) {
		var urlParams = buildGetParams(options.data);
		return baseUrl + (urlParams === '' ? '' : '?' + urlParams);
	}
	
	function isNotNullObject (obj) {
		return typeof obj === 'object' && obj !== null;
	}
	
	function sanitizeOptions (options) {
		var defaultOptions = {
				data: {},
				headers: {},
				stateActions: {
					
				}
			},
			requestOptions = isNotNullObject(options) ? options : defaultOptions,
			derefData = requestOptions.data,
			derefHeaders = requestOptions.headers;
		
		requestOptions.data = isNotNullObject(derefData) ? derefData : defaultOptions.data;
		requestOptions.headers = isNotNullObject(derefHeaders) ? derefHeaders : defaultOptions.headers;
	}
	
	function readyStateHandler(xhrObj, callback) {
		var done = xhrObj.DONE === xhrObj.readyState,
			status = done ? xhrObj.status : null,
			response = done ? xhrObj.response : null,
			error = done && response !== null ? null : { 
				error: new Error ('Request was unsuccessful and returned status ' + status),
				status: status
			};

		if(done) {
			callback(error, response);
		}
	}
	
	function setXHRHeaders (xhrObj, headers) {
		Object.keys(headers).forEach(function (key) {
			xhrObj.setRequestHeader(key, headers[key]);
		});
	}
	
	function request (method, url, callback, options) {
		var requestOptions = sanitizeOptions(options),
			isDataRequest = ['GET', 'DELETE'].includes(method.toUpperCase()),
			requestUrl = !isDataRequest ? buildGetUrl(url, options) : url,
			xhrObj = new XMLHttpRequest();
		
		xhrObj.open(method.toUpperCase(), requestUrl);
		setXHRHeaders(xhrObj, requestOptions.headers);
		xhrObj.onreadystatechange = readyStateHandler.bind(null, xhrObj, callback);
		
		if (isDataRequest) {
			xhrObj.send(buildRequestBody(options.data));
		} else {
			xhrObj.send();
		}
	}
	
	return {
		delete: request.bind(null, 'DELETE'),
		get: request.bind(null, 'GET'),
		post: request.bind(null, 'POST'),
		put: request.bind(null, 'PUT'),
		request: request
	};
})();