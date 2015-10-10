// Common patterns

function sumImperative (values) {
	var result = 0;
	
	for (let i = 0; i < values.length; i++) {
		result += values[i];
	}
	
	return result;
}

function findMaxImperative (values) {
	var max = -Number.MAX_VALUE;
	
	for(let i = 0; i < values.length; i++) {
		if(values[i] > max) {
			max = values[i];
		}
	}
	
	return max;
}

function filterEvensImperative (values) {
	var result = [];
	
	for (let i = 0; i < values.length; i++) {
		if (values[i] % 2 === 0) {
			result.push(values[i]);
		}
	}
	
	return result;
}

// Reduction to simple, destructive recursion

function sumRecursive (values, accumulator) {
	accumulator += values.pop();
	return values.length === 0 ? accumulator : sumRecursive(values, accumulator);
}

sumRecursive([1, 2, 3, 4, 5].slice(0), 0); // 15

function findMaxRecursive (values, max) {
	var value = values.pop();
	max = max > value ? max : value;
	return values.length === 0 ? max : findMaxRecursive(values, max);
}

findMaxRecursive([2, -5, 12, 3, 89, 7, 6].slice(0), -Number.MAX_VALUE); // 89

// Abstracted recursion

function add (a, b) {
	return a + b;
}

function max (a, b) {
	return a > b ? a : b;
}

function genericRecursor (behavior, values, accumulator) {
	accumulator = behavior(accumulator, values.pop());
	return values.length === 0 ? accumulator : genericRecursor(behavior, values, accumulator);
}

genericRecursor(add, [1, 2, 3, 4, 5].slice(0), 0); // 15
genericRecursor(max, [2, -5, 12, 3, 89, 7, 6].slice(0), -Number.MAX_VALUE); // 89

// Accumulation

var integers = [1, 2, 3, 4, 5],
	records = [{ value: 2 },
			   { value: 4 },
			   { value: 6 },
			   { value: 8 },
			   { value: 10 }];

function add (a, b) {
	return a + b;
}

integers.reduce(add); // 15
integers.reduce(add, 0); // 15

function addValues (a, b) {
	return add(a, b.value);
}

records.reduce(addValues, 0); // 30


// Maxima/Minima

function max (a, b) {
	return a > b ? a : b;
}

function min (a, b) {
	return a < b ? a : b;
}

var values = [2, -5, 12, 3, 89, 7, 6];

values.reduce(max, -Number.MAX_VALUE); // 89
values.reduce(min, Number.MAX_VALUE); // -5


// Filtering

function filterEvens (accumulator, value) {
	if(value % 2 === 0) {
		accumulator.push(value);
	}
	
	return accumulator;
}

[1, 2, 3, 4, 5].reduce(filterEvens, []); // [2, 4]


// Mapping

function multiplyBy10 (accumulator, value) {
	accumulator.push(value * 10);
	return accumulator;
}

[1, 2, 3, 4, 5].reduce(multiplyBy10, []); // [10, 20, 30, 40, 50]


// Copying

function shallowCopy (original, accumulator, key) {
	accumulator[key] = original[key];
	return accumulator;
}

var originalObject = { 'foo': 'bar', 'baz': 'quux' };

Object.keys(originalObject).reduce(shallowCopy.bind(null, originalObject), {}); // { 'foo': 'bar', 'baz': 'quux' }

// FizzBuzz

function fizzBuzzify (value) {
	var result = value % 3 === 0 ? 'Fizz' : '';
	
	result += value % 5 === 0 ? 'Buzz' : '';
	
	return result === '' ? value : result;
}

function fizzBuzz (output, value) {
	output.push(fizzBuzzify(value));
	return output;
}

var integers = [1, 2, 3, /* ... */, 100];

integers.reduce(fizzBuzz, []);