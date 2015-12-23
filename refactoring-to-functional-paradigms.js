(function () {
    function sumMultiplesOf3And5 (list) {
        var total = 0,
            index = 0;
        
        if (typeof list === 'object' && Object.prototype.toString.call(list) === '[object Array]') {
            for (index; index < list.length; index++) {
                if (list[index] % 3 === 0 || list[index] % 5 === 0) {
                    total += list[index];
                }
            }
        }
        
        return total;
    }
})();

// Refactor array check

(function () {

    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(list) === '[object Array]';
    }
    
    function sumMultiplesOf3And5 (list) {
        var values = isArray(list) ? values : [],
            total = 0,
            index = 0;
        
        for (index; index < values.length; index++) {
            if (values[index] % 3 === 0 || values[index] % 5 === 0) {
                total += values[index];
            }
        }
        
        return total;
    }

})();

// Refactor modulus check

(function () {

    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(list) === '[object Array]';
    }

    function equal (a, b) {
        return a === b;
    }

    function mod (value, base) {
        return value % base;
    }

    function sumMultiplesOf3And5 (list) {
        var values = isArray(list) ? values : [],
            total = 0,
            index = 0;
        
        for (index; index < values.length; index++) {
            if (equal(0, mod(values[index], 3)) || equal(0, mod(values[index], 5))) {
                total += values[index];
            }
        }
        
        return total;
    }

})();

// Add composition

(function () {

    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(list) === '[object Array]';
    }

    function equal (a, b) {
        return a === b;
    }

    function mod (value, base) {
        return value % base;
    }

    function compose (fnA, fnB) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            return fnA(fnB.apply(null, args));
        }
    }

    function sumMultiplesOf3And5 (list) {
        var values = isArray(list) ? values : [],
            checkModulus = compose(equal.bind(null, 0), mod),
            total = 0,
            index = 0;
        
        for (index; index < values.length; index++) {
            if (checkModulus(values[index], 3) || checkModulus(values[index], 5)) {
                total += values[index];
            }
        }
        
        return total;
    }

})();

// Add or composition

(function () {

    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]';
    }

    function equal (a, b) {
        return a === b;
    }

    function mod (value, base) {
        return value % base;
    }

    function or (a, b) {
        return Boolean(a) || Boolean(b);
    }

    function compose (fnA, fnB) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            return fnA(fnB.apply(null, args));
        }
    }

    function sumMultiplesOf3And5 (list) {
        var values = isArray(list) ? values : [],
            checkModulus = compose(equal.bind(null, 0), mod),
            modValues = [3, 5],
            total = 0,
            index = 0;
        
        for (index; index < values.length; index++) {
            if (modValues.map(checkModulus.bind(null, values[index])).reduce(or, false)) {
                total += values[index];
            }
        }
        
        return total;
    }

})();

// Abstract modulus check

(function () {

    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]';
    }

    function equal (a, b) {
        return a === b;
    }

    function mod (value, base) {
        return value % base;
    }

    function or (a, b) {
        return Boolean(a) || Boolean(b);
    }

    function compose (fnA, fnB) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            return fnA(fnB.apply(null, args));
        }
    }

    function isMultipleOf (baseValues, value) {
        var checkModulus = compose(equal.bind(null, 0), mod);
        return baseValues.map(checkModulus.bind(null, value)).reduce(or);
    }

    function sumMultiplesOf3And5 (list) {
        var values = isArray(list) ? values : [],
            isValueAcceptable = isMultipleOf.bind(null, [3, 5]),
            total = 0,
            index = 0;
        
        for (index; index < values.length; index++) {
            if (isValueAcceptable(values[index])) {
                total += values[index];
            }
        }
        
        return total;
    }

})();

// for-if to filter

(function () {

    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]';
    }

    function equal (a, b) {
        return a === b;
    }

    function mod (value, base) {
        return value % base;
    }

    function or (a, b) {
        return Boolean(a) || Boolean(b);
    }

    function compose (fnA, fnB) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            return fnA(fnB.apply(null, args));
        }
    }

    function isMultipleOf (baseValues, value) {
        var checkModulus = compose(equal.bind(null, 0), mod);
        return baseValues.map(checkModulus.bind(null, value)).reduce(or);
    }

    function sumMultiplesOf3And5 (list) {
        var values = isArray(list) ? values : [],
            isValueAcceptable = isMultipleOf.bind(null, [3, 5]),
            multiples = values.filter(isValueAcceptable),
            total = 0,
            index = 0;
        
        for (index; index < multiples.length; index++) {
            total += multiples[index];
        }
        
        return total;
    }

})();

// For loop to reduce

(function () {

    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]';
    }

    function equal (a, b) {
        return a === b;
    }

    function add (a, b) {
        return a + b;
    }

    function mod (value, base) {
        return value % base;
    }

    function or (a, b) {
        return Boolean(a) || Boolean(b);
    }

    function compose (fnA, fnB) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            return fnA(fnB.apply(null, args));
        }
    }

    function isMultipleOf (baseValues, value) {
        var checkModulus = compose(equal.bind(null, 0), mod);
        return baseValues.map(checkModulus.bind(null, value)).reduce(or);
    }

    function sumMultiplesOf3And5 (list) {
        var values = isArray(list) ? values : [],
            isValueAcceptable = isMultipleOf.bind(null, [3, 5]),
            multiples = values.filter(isValueAcceptable);
                
        return multiples.reduce(add, 0);
    }

})();

// Combining expressions

(function () {

    /* Library functions */
    
    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]';
    }

    function equal (a, b) {
        return a === b;
    }

    function add (a, b) {
        return a + b;
    }

    function mod (value, base) {
        return value % base;
    }

    function or (a, b) {
        return Boolean(a) || Boolean(b);
    }

    function compose (fnA, fnB) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            return fnA(fnB.apply(null, args));
        }
    }

    function sanitizeArray (value) {
        return isArray(value) ? value : [];
    }

    /* final output */

    function isMultipleOf (baseValues, value) {
        var checkModulus = compose(equal.bind(null, 0), mod);
        return sanitizeArray(baseValues).map(checkModulus.bind(null, value)).reduce(or);
    }

    function sumMultiplesOf3And5 (list) {
        var isValueAcceptable = isMultipleOf.bind(null, [3, 5]);
        return sanitizeArray(values).filter(isValueAcceptable).reduce(add, 0);
    }

})();
