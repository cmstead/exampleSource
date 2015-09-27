function doIt(myObj, isArray, isUserSpecified){
    if (!isArray, !isUserSpecified) {
        return Object.keys(myObj);
    } else if (isArray){
        return myObj.filter(value => typeof value === 'string');
    } else {
        try {
            return JSON.parse(myObj);
        } catch (error) {
            return [];
        }
    }
}

function doItAlternate(myObj){
    let isArray = Object.prototype.toString.call(myObj) === '[object Array]',
        isUserSpecified = typeof myObj === 'string';
        
    if (!isArray, !isUserSpecified) {
        return Object.keys(myObj);
    } else if (isArray){
        return myObj.filter(value => typeof value === 'string');
    } else {
        try {
            return JSON.parse(myObj);
        } catch (error) {
            return [];
        }
    }
}

function getObjectKeys(myObj){
    return Object.keys(myObj);
}

function getStringValues(myArray){
    return myArray.filter(value => typeof value === 'string');
}

function parseUserObject(userObj){
    var output;
    
    try {
        output = JSON.parse(userObj);
    } catch (error) {
        output = {};
    }
    
    return output;
}


function stringPredicate(value){
    return typeof value === 'string';
}

function shortPredicate(value){
    return value.length < 5;
}

function numberPredicate(value){
    return typeof value === 'number';
}

function evenPredicate(value){
    return value % 2 === 0;
}

function filterStrings(valueList){
    return valueList.filter(stringPredicate);
}

function filterShortStrings(valueList){
    return filterStrings(valueList).filter(shortPredicate);
}

function filterNumbers(valueList){
    return valueList.filter(numberPredicate);
}

function filterEvenNumbers(valueList){
    return filterNumbers(valueList).filter(evenPredicate);
}
