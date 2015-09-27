function buildBasicUrl(hostname){
	return 'http://' + hostname;
}

function buildBasicPathUrl(hostname, path){
	return buildBasicUrl(hostname) + path;
}

function buildProtocolSpecificUrl(hostname, path, protocol){
	return protocol + '://' + hostname + path;
}

function buildPortSpecificUrl(hostname, path, protocol, port){
	return protocol + '://' + hostname + ':' + port + path;
}

function buildUrl(hostname, path, protocol, port){
	let url = '';
	
	if(Boolean(port)){
		url = buildPortSpecificUrl(hostname, path, protocol, port);
	} else if(Boolean(protocol)){
		url = buildProtocolSpecificUrl(hostname, path, protocol);
	} else if(Boolean(path)){
		url = buildBasicPathUrl(hostname, path);
	} else {
		url = buildBasicUrl(hostname);
	}
	
	return url;
}