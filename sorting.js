var numberArray = [5, 9, 3, 8, 7, 6, 2, 5, 4, 8],
    stringArray = ['foo', 'baz', 'quux', 'bar', 'snafu', 'woot'],
    objectArray = [{ id: 1 }, { id: 4 }, { id: 2 }, { id:7 }, { id: 3 }],
    people = [
        { lastName: 'Jones', firstName: 'Bob' },
        { lastName: 'Smith', firstName: 'John' },
        { lastName: 'Jones', firstName: 'Arlene' }
    ];

function sortNumbers(a, b){
    return a - b;
}

function reverseNumbers(a, b){
    return b - a;
}

function reverseStrings(a, b){
    var result = a < b ? 1 : -1;
    return a === b ? 0 : result;
}

function objectSort(a, b){
    var aId = a.id,
        bId = b.id,
        result = aId < bId ? -1 : 1;

    return aId === bId ? 0 : result;
}

//Generalizing object sort
function keySort(key, a, b){
    var aValue = a[key],
        bValue = b[key],
        result = aValue < bValue ? -1 : 1;
        
    return aValue === bValue ? 0 : result;
}

function nameSort(a, b){
    var firstNameSort = keySort.bind(null, 'firstName'),
        lastNameSort = keySort.bind(null, 'lastName'),
        result = firstNameSort(a, b);
   
   return result === 0 ? lastNameSort(a, b) : result;
}

function complexKeyedSort(keys, a ,b){
    var sortFunctions = keys.map(key => keySort.bind(null, key)),
        result = 0;
    
    sortFunctions.reverse();
    
    while(result === 0 && sortFunctions.length > 0){
        result = sortFunctions.pop()(a, b);
    }
    
    return result;
}

function reducedComplexKeyedSort(sortArray, a, b){
    var result = 0,
        index = 0,
        
        // Only read the length once for a micro-enhancement
        sortArrayLength = sortArray.length;
    
    // Updated while loop to be array-non-destructive
    while(result === 0 && index < sortArrayLength){
        result = sortArray[index](a, b);
    }
    
    return result
}

function complexKeyedSortFactory(keys){
    // Performs sort algorithm array construction only once
    var sortFunctions = keys.map(key => keySort.bind(null, key));
    
    // Returns bound, ready to use sort algorithm
    return reducedComplexKeyedSort.bind(null, sortFunctions);
}

function reverseSort(sortFunction){
    return function(a, b){
        return -1 * sortFunction(a, b);
    }
}

numberArray.sort(); // [2, 3, 4, 5, 5, 6, 7, 8, 8, 9]
numberArray.sort(reverseNumbers); // [9, 8, 8, 7, 6, 5, 5, 4, 3, 2]
stringArray.sort(reverseStrings); // ['woot', 'snafu', 'quux', 'foo', baz', 'bar']
objectArray.sort(objectSort); // [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 7 }]


// Full sorting factory with SQL-like ascending and descending sort functionality
var keyedSortFactory = (function(){
    'use strict';
    
    function keyedSort(sortArray, a, b){
        var result = 0,
            index = 0,
            sortArrayLength = sortArray.length;
        
        while(result === 0 && index < sortArrayLength){
            result = sortArray[index](a, b);
        }
        
        return result
    }
    
    function keySort(key, a, b){
        var aValue = a[key],
            bValue = b[key],
            result = aValue < bValue ? -1 : 1;
            
        return aValue === bValue ? 0 : result;
    }
    
    function reverseSort(sortFunction){
        return function(a, b){
            return -1 * sortFunction(a, b);
        }
    }
    
    function sortFactory(sortString){
        var sortTokens = sortString.split(' '),
            key = sortTokens[0],
            direction = Boolean(sortTokens[1]) ? sortTokens[1].toLowerCase() : 'asc',
            sortFunction = keyedSort.bind(null, key);
        
        return direction === 'desc' ? reverseSort(sortFunction) : sortFunction;
    }
    
    function keyedSortFactory(sortStrings){
        var sortFunctions = sortStrings.map(sortFactory);
        return keyedSort.bind(null, sortFunctions);
    }

    return {
        build: keyedSortFactory
    };
})();
