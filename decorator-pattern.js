function add (x, y) {
    return x + y
}

function square (x) {
    return x * x;
}

function divide (x, y) {
    return x / y;
}

function sum (valueList) {
    return valueList.reduce(add, 0);
}

function squareAll (valueList) {
    return valueList.map(square);
}

function sumSquares (valueList) {
    return sum(squareAll(valueList));
}

// The simpleMean function is decorating through composition.
// SimpleMean adheres to the same contract that sum does, which
// means we can still use sum where appropriate, but if we discover
// we need the mean somewhere, we can merely layer our behaviors
function simpleMean (valueList){
    return divide(sum(valueList), valueList.length);
}

function normalizeValues (valueList) {
    var xbar = simpleMean(valueList);
    return valueList.map(add.bind(null, -xbar));
}

function totalSumOfSquares(valueList){
    return sumSquares(normalizeValues(valueList));
}