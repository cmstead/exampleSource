// Imperative single-loop behavior

function addEvensImperative (list) {
	var total = 0,
		listLength = list.length,
		index = 0;
	
	for(index; index < list.length; index++) {
		total += list[index] % 2 === 0 ? list[index] : 0;
	}
	
	return total;
}

// Functional, test and add abstracted, two-loop behavior

function isEven (value) {
	return value % 2 === 0;
}

function add (a, b) {
	return a + b;
}

function addEvensFunctional (list) {
	return list.filter(isEven).reduce(add, 0);
}

function range (start, end) {
	var output = [],
		current = start;
	
	for (current; current <= end; current++) {
		output.push(current);
	}
	
	return output;
}

module.exports = function test (endValue) {
	var rangeList = range(1, endValue),
		start,
		end;
	
	start = (new Date()).getTime();
	console.log(start);
	addEvensImperative(rangeList);
	end = (new Date()).getTime();
	console.log(end);
	console.log(end - start);
	
	start = (new Date()).getTime();
	console.log(start);
	addEvensFunctional(rangeList);
	end = (new Date()).getTime();
	console.log(end);
	console.log(end - start);
}