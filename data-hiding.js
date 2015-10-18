// Object initializer

function createStructVar (struct, key, defRecord) {
	let value = typeof defRecord.value !== 'undefined' ? defRecord.value : null;
	
	struct.addProperty(key);
	struct['set' + key](value);
}

function attachBehaviors (instance, struct, defRecord, key) {
	if(defRecord.get === true) {
		instance['get' + key] = struct['get' + key];
	}
	
	if(defRecord.set === true) {
		instance['set' + key] = struct['set' + key]; 
	}
}

function attachVars (instance, struct, definition, key) {
	let defRecord = definition[key];
	
	createStructVar(struct, defRecord, key);
	attachBehaviors(instance, struct, defRecord, key);		
}

function initHiddenVars (instance, definition) {
	var struct = new Struct();
	
	Object.keys(definition).forEach(attachVars.bind(null, instance, struct, definition));
	
	return struct;
}

// Class example

class InterestCalculator {
	
	constructor () {
		var loanTerms = this.initClassProperties();
		
		// We create this at constructor time to access the newly
		// created struct and work with that data
		this.computeTotal = this.computeTermTotal.bind(this, loanTerms);
	}
	
	// With this exposed we can unit test it but it doesn't have
	// access to the constructed struct from the constructor
	computeTermTotal (loanTerms) {
		var principle = loanTerms.getPrinciple(),
			paymentsPerYear = loanTerms.getpaymentsPerYear(),
			
			monthlyRate = loanTerms.getrate() / paymentsPerYear,
			growthExponent = paymentsPerYear * loanTerms.getTime(),
			interestFactor = Math.pow(1 + monthlyRate, growthExponent);
		
		return principle * interestFactor; // P(1 + r/n)^nt standard compound interest
	}
	
	initClassProperties () {
		var loanTerms = initHiddenVars(this, {
				principle: {
					value: 5000,
					set: true // write-only
				},
				rate: {
					value: 0.0575, // 5.75% interest
					get: true // read-only
				},
				time: {
					value: 1,
					get: true, // readable
					set: true // writeable
				},
				paymentsPerYear: {
					value: 12 // Fixed. No read, no write
				}
			});
		
		return loanTerms;
	}
	
}

var myCalculator = new InterestCalculator();

myCalculator.computeTotal(); // 5295.199156407986

myCalculator.setprinciple(10000);
myCalculator.computeTotal(); // 10590.398312815973

myCalculator.gettime(); // 1
myCalculator.settime(5);
myCalculator.gettime(); // 5

myCalculator.setrate(0.6); // undefined is not a function
myCalculator.getpaymentsPerYear(); // undefined is not a function
myCalculator.setpaymentsPerYear(6); // undefined is not a function
myCalculator.getprinciple(); // undefined is not a function

myCalculator.getprinciple = function () {
	return this.loanTerms.getprinciple();
}

myCalculator.getprinciple(); // undefined is not an object