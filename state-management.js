// Maybe and either function from sanitary data post
// Struct from generic type post

// Simple state factory

var stateFactory = (function () {
	
	var stateCache = {
		data: false
	};
	
	function build () {
		stateCache.data = either({}, stateCache.data, 'object');
		return stateCache.data;
	}
	
	return {
		build: build
	};
	
})();

// Updated build method:

(function () {
	
	/* ... State factory code here ... */
	
	function build () {
		stateCache.data = either(new Struct(), stateCache.data, 'object');
		return stateCache.data;
	}
	
	/* ... Remaining state factory code here ... */
	
})();


function State (initialState) {
	var sanitizedInitialState = j.either({}, initialState, 'object'),
		stateStruct = new Struct(),
		stateKeys = Object.keys(sanitizedInitialState);
		
	Struct.prototype.constructor.apply(stateStruct, stateKeys);
	stateStruct.merge(sanitizedInitialState);
	
	this.get = {};
	this.set = {};

	this.addState = this.addState.bind(this, stateStruct);
	stateKeys.foreach(this.attachStructMethods.bind(this, stateStruct));
}

State.prototype = {
	
	accessorBase: function (struct, key) {
		return j.clone(struct.get[key]());
	},
	
	attachStructMethods: function (struct, key) {
		this.get[key] = this.accessorBase.bind(this, struct, key);
		this.set[key] = struct.set[key];
	},
	
	addState: function (struct, key, value) {
		struct.addProperty(key);
		struct.set[key](maybe(value));
		
		this.attachStructMethods(struct, key);
	}
	
};

// Final build method:

(function () {
	
	/* ... State factory code here ... */
	
	function build (initialState) {
		if(typeof initialState !== 'undefined' && stateCache.data instanceof State) {
			throw new Error('Cannot bootstrap existing state object.');
		}
		
		stateCache.data = either(new State(initialState), stateCache.data, 'object');
		return stateCache.data;
	}
	
	/* ... Remaining state factory code here ... */
	
})();
