/*
 * I solemnly swear I always return an array.
 */

function listify(a, b, c, d){
	let finalArray = [a, b, c, d];
	
	if(finalArray.contains('foo')){
		finalArray = null; //This will totally never happen
	}
	
	return finalArray;
}

function removeVowels(value){
	return value.replace(/[aeiou]/gi, '');
}

let myListNoVowels = listify('foo', 'bar', 'baz', 'quux').map(removeVowels);

//BANG! BOOM! EXPLOSIONS! GUNFIRE! STACKTRACE!!!!
