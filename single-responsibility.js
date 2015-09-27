function returnAdder(){
	
	let latestSum = 0;
	
	return function addStuff(a, b){
		if(typeof a !== 'number' || typeof b !== 'number' || isNaN(a + b)){
			throw new Error('Something isn\'t a number, yo');
		}
		
		latestSum = a + b;
		
		return latestSum;
	}

}

function returnComplexAdder(){

	let latestSum = 0;

	function storeLatestSum(sum){
		latestSum = sum;
	}
	
	function validateArguments(a, b){
		let aIsValid = typeof a === 'number' && !isNaN(a),
			bIsValid = typeof b === 'number' && !isNaN(b);
			
		return aIsValid && bIsValid;
	}

	function add(a, b){
		return a + b;
	}
	
	return function complexAdder(a, b){
		if(!validateArguments(a, b)){
			throw new Error(`Either ${a} or ${b} is not a valid number.`);
		}

		storeLatestSum(add(a, b));
		return latestSum;
	}
	
}

class memAdder{
	constructor(){
		// Since the world can access this and we haven't done anything yet
		// we want to use a non-number falsey value that accurately describes
		// the current state of our object.
		this.latestResult = null;
	}
	
	storeLatestResult(result){
		this.latestResult = result;
	}
	
	validateArguments(a, b){
		let aIsValid = typeof a === 'number' && !isNaN(a),
		    bIsValid = typeof b === 'number' && !isNaN(b);
		
		return aIsValid && bIsValid;
	}
	
	add(a, b){
		a + b;
	}
	
	computeAndStore(a, b){
		if(this.validateArguments(a, b)){
			throw new Error(`Either ${a} or ${b} is not a valid number.`);
		}
		
		this.storeLatestResult(this.add(a, b));
		return this.latestResult;
	}
}

let arithmeticValidatorFactory = (function(){
	
	function numberValidator(a, b){
		let aIsValid = typeof a === 'number' && !isNaN(a),
		    bIsValid = typeof b === 'number' && !isNaN(b);
		
		return aIsValid && bIsValid;
	}
	
	function getValidator(key){
		let validators = {
			addition: numberValidator
		};
		
		return Boolean(validators[key]) ? validators[key] : numberValidator;  
	}
	
	return {
		get: getValidator
	};
	
})();

let arithmeticFunctionFactory = (function(){
	
	function zeroFunction(){
		return 0;
	}
	
	function add(a, b){
		return a + b;
	}
	
	function getFunction(key){
		let arithemticFunctions = {
			zero: zeroFunction,
			addition: add
		};
		
		return Boolean(arithemticFunctions[key]) ? arithmeticFunctions[key] : zeroFunction;
	}
	
	return {
		get: getFunction
	};
	
});

class memComputor{
	constructor(method, validator){
		this.compute = method;
		this.validator = validator;
		this.latestResult = null;
	}
	
	setLatestResult(result){
		this.latestResult = result;
	}
	
	computeAndStore(a, b){
		if(!this.validator(a, b)){
			throw new Error(`Either ${a} or ${b} is not an acceptable argument.`);
		}
		
		this.setLatestResult(this.compute(a, b));
		return this.latestResult;
	}
}
