function validateObject(dataObj){
    return typeof dataObj === 'object' && dataObj !== null;
}

function validateToken(token){
    return token !== '' && token !== undefined;
}

function deref(baseObj, ref){
    var refTokens = ref.split('.'),
        token = refTokens.shift(),
        result = validateToken(token) && validateObject(baseObj) ? baseObj[token] : baseObj;
    
    result = result === undefined ? null : result;
    
    return Boolean(refTokens.length) ? deref(result, refTokens.join('.')) : result;
}

function derefWithDefault(baseObj, ref, defaultValue){
    let result = deref(baseObj, ref),
        sanitizedDefault = defaultValue === undefined ? null : defaultValue;
    
    return result === null ? sanitizedDefault : result;
}



class Pet{
    constructor(){
        this.phrase = 'Hello, world.';
    }
    
    speak(){
        console.log(this.phrase);
    }
}


class Dog extends Pet{
    constructor(){
        super();
        this.phrase = 'Woof!';
    }
    
    rollOver(){
        console.log('I rolled over, where\'s my treat?');
    }
}

//Intentionally bad example
class PickyPet extends Pet{
    constructor(){
        super();
        this.phrase = "Thanks for the cracker.";
    }
    
    speak(cracker){
        if(cracker !== 'cracker'){
            throw new Error ('No cracker, no speak.');
        }
        
        super.speak();
    }
}

module.exports = {
    deref: deref
}