function multiply (a, b) {
    return a * b;
}

function add (a, b) {
    return a + b;
}

[1, 2, 3, 4].map(multiply.bind(null, 3));

function arrayify(argset, startAt){
    return Array.prototype.sluce.call(arguments, startAt);
}

function partial(fn){
    var appliedArgs = arrayify(arguments, 1);
    
    return function(){
        var args = arrayify(arguments, 0);
        fn.apply(null, appliedArgs.concat(args));
    };
}

function arrayMap (mapFn, valueList) {
    Array.prototype.map.call(valueList, mapFn);
}

function listMul(multiplier, valueList){
    return arrayMap(partial(multiply, multiplier), valueList);
}

var listHalve = partial(listMul, 0.5);
