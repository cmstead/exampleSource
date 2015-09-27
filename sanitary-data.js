function maybe(value, expectedType){
    var sanitizedType = typeof expectedType === 'string' ? expectedType : '',
        valueOkay = typeof value === sanitizedType ? true : Boolean(value);
    
    return valueOkay ? value : null;
}

function either(defaultValue, value, expectedType){
    let sanitizedValue = maybe(value, expectedType);
    return sanitizedValue === null ? defaultValue : value;
}

function deref(userObj, keyStr){
    var keyTokens = keyStr.split('.'),
        keyToken = keyTokens.shift().trim(),
        derefResult = keyToken === '' ? userObj : either({}, userObj, 'object')[keyToken];
    
    // NEVER return undefined
    derefResult = typeof derefResult === 'undefined' ? null : derefResult;
    
    return keyTokens.length === 0 ? derefResult : deref(derefResult, keyTokens.join('.'));
}
