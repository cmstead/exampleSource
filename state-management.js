// Use struct from data hiding post.

function getStateValue (struct, key) {
	return struct['get' + key]();
}

function setStateValue (struct, key, value) {
	return struct['set' + key](value);
}

function initializeStateKey (struct, key, value) {
	var sanitizedValue = typeof value === 'undefined' ? null : value;
	struct.addProperty(key);
	struct['set' + key](sanitizedValue);
}

class State {
	
	
	
}