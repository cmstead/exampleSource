function Greeter (greeting, name) {
	this.defaultGreeting = this.cleanString('Hi', greeting);
	this.defaultName = this.cleanString('person', name);
}

Greeter.prototype = {
	cleanString: function (defaultValue, value) {
		return typeof value === 'undefined' ? defaultValue : value;
	},
	
	greet: function (greeting, name) {
		var cleanGreeting = this.cleanString(this.defaultGreeting, greeting),
			cleanName = this.cleanString(this.defaultName, name);
		
		return cleanGreeting + ', ' + cleanName + '.';
	}
};

typeof Object; // function
typeof Object.prototype; // object
Object.prototype.toString(Object.prototype); // [object Object]

var firstAdd = new Function(['a', 'b'], 'return a + b;');
var secondAdd = Function(['a', 'b'], 'return a + b;');

firstAdd(1, 2); // 3
secondAdd(4, 5); // 9

function identity (value) {
	return value;
}

typeof identity; // function
identity instanceof Function; // true

identity.valueOf() === identity; // true

Function.prototype.hasOwnProperty('valueOf'); // false
Object.prototype.hasOwnProperty('valueOf'); // true (!!!)

Function instanceof Object; // true
identity instanceof Object; // true

function checkValidity (value) {
	return value > 0 && value < 100;
}

function isValid (value) {
	var result = Object(checkValidity(value));
	result.error = result.valueOf() ? null : 'Number must be positive and less than 100.';
	return result;
}

isValid(7).error; // null
isValid(15).valueOf(); // true
isValid(999).error; // Number must be positive and less than 100.