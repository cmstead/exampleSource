function loopReduce(valueList, reduction, initialValue){
    var index = 0,
        result = initialValue !== undefined ? initialValue : valueList[0];
    
    index += result !== initialValue ? 1 : 0;
    
    while(valueList[index] !== undefined){
        result = reduction(result, valueList[index]);
        index++;
    }
    
    return result;
}

function first(valueList){
    return valueList[0];
}

function rest(valueList){
    return valueList.slice(1);
}

function isUndefined(value){
    return value === undefined;
}

function recursiveReduce(valueList, reduction, initialValue){
    var _a = !isUndefined(initialValue) ? initialValue : first(valueList),
        _b = isUndefined(initialValue) ? first(rest(valueList)) : first(valueList),
        remainderList = isUndefined(initialValue) ? rest(rest(valueList)) : rest(valueList);
    
    return remainderList.length > 0 ?
           recursiveReduce(remainderList, reduction, reduction(_a, _b)) :
           reduction(_a, _b);
}

function recurReduce(recur, valueList, reduction, initialValue){
    var _a = !isUndefined(initialValue) ? initialValue : first(valueList),
        _b = isUndefined(initialValue) ? first(rest(valueList)) : first(valueList),
        remainderList = isUndefined(initialValue) ? rest(rest(valueList)) : rest(valueList);
    
    return remainderList.length > 0 ?
           recur(remainderList, reduction, reduction(_a, _b)) :
           reduction(_a, _b);
}

function reduce(valueList, reduction, initialValue){
    return j.recur(recurReduce, valueList, reduction, initialValue);
}

function recurFilter(recur, valueList, filterFn, initialSet){
    var sanitizedSet = isUndefined(initialSet) ? [] : initialSet,
        testValue = first(valueList),
        remainderList = rest(valueList);
    
    if(filterFn(testValue)){
        sanitizedSet.push(testValue);
    }
    
    return remainderList.length ? recur(remainderList, filterFn, sanitizedSet) : sanitizedSet;
}

function filterer(filterFn, newList, value){
    if(filterFn(value)){
        newList.push(value);
    }
    
    return newList;
}

function filter(valueList, filterFn){
    return reduce(valueList, filterer.bind(null, filterFn), []);
}

function mapper(mapFn, newList, value){
    newList.push(mapFn(value));
    return newList;
}

function map(valueList, mapFn){
    return reduce(valueList, mapper.bind(null, mapFn), []);
}

var myList = [1, 2, 3, 4];

function add(a, b){
    return a + b;
}

console.log(loopReduce(myList, add, 0));
console.log(recursiveReduce(myList, add, 0));