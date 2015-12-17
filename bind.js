function Greeter () {
	this.defaultGreeting = 'Hello';
	this.defaultName = 'person';
}

Greeter.prototype = {
	cleanString: function(defaultValue, userValue) {
		return typeof userValue === 'string' ? userValue : defaultValue;
	},
	
	greet: function (greeting, name) {
		var cleanGreeting = this.cleanString(this.defaultGreeting, greeting),
			cleanName = this.cleanString(this.defaultName, name);
			
		console.log(cleanGreeting + ', ' + cleanName);
	},
	
	sayHello: function (name) {
		this.greet('Hello', name);
	}
};

var myGreeter = new Greeter();

myGreeter.sayHello('Chris'); // Hello, Chris;
myGreeter.sayHello(); // Hello, person

myGreeter.greet(); // Hello, person
myGreeter.greet('Hey', 'Chris'); // Hey, Chris

var hi = myGreeter.sayHello;

hi('Chris'); // undefined is not a function

var boundHi = myGreeter.sayHello.bind(myGreeter);

boundHi('Chris'); // Hello, Chris

function add(a, b) {
	return a + b;
}

add(5, 3); // 8

var increment = add.bind(null, 1);
increment(10); // 11

//Putting it all together

var hiChris = myGreeter.sayHello.bind(myGreeter, 'Chris');
hiChris(); // Hello, Chris

var sayHola = myGreeter.greet.bind(myGreeter, 'Hola');
sayHola(); // Hola, person
sayHola('Chris'); // Hola, Chris