(function () {
    'use strict';
    
    // Inquiry

    function areEqual(a, b) {
        return a === b;
    }

    function isType(type, value) {
        return areEqual(type, typeof value);
    }

    function isInstance(obj, value) {
        return value instanceof obj;
    }

    // First examples:
    
    areEqual(5, 5); // true
    areEqual(10, 'A'); // false
    isType('string', 'foo!'); // true
    isInstance(Number, {}); // false

    function isNumber(value) {
        return isType('number', value);
    }

    function isZero(value) {
        return areEqual(0, value);
    }

    function isEven(value) {
        return isNumber(value) && isZero(value % 2);
    }

    function isArray(value) {
        return isInstance(Array, value);
    }

    // Second examples
    
    isNumber(99); // true
    isNumber('bar'); // false
    isZero(0); // true
    isZero('A cat'); // false
    isEven(6); // true
    isArray({}); // false
    
    // Declaration
    
    function first(values) {
        return isArray(values) ? values[0] : null;
    }

    function rest(values) {
        return isArray(values) ? values.slice(1) : [];
    }

    function add (a, b){
        return a + b;
    }

    function sum (values){
        return isArray(values) ? values.reduce(add, 0) : 0;
    }

    function getEvens(values) {
        return isArray(values) ? values.filter(isEven) : [];
    }

    // declarative examples
    
    first([1, 2, 3, 4]); // 1
    rest([1, 2, 3, 4]); // [2, 3, 4]
    sum([1, 2, 3, 4]); // 10
    getEvens([1, 2, 3, 4]); // [2, 4]

    // Abstraction
    
    function getLength(values) {
        return isArray(values) ? values.length : 0;
    }
    
    function append (valueArray, value) {
        var result = isArray(valueArray) ? valueArray.slice(0) : [];
        
        return isType('undefined', value) ? result : result.concat([value]);
    }
    
    function filter (predicate, values, result){
        result = isType('undefined', result) ? [] : result;
        
        if(predicate(first(values))) {
            result = append(result, first(values));
        }
        
        return isZero(getLength(rest(values))) ? result : filter(predicate, rest(values), result);
    }

})();
