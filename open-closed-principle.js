// Original requirement: Validation, must be a string

// Important note: contract states value can be type any, return type is boolean
function isString(value){
    return typeof value === 'string';
}

// New requirement: Validation, must be a short string -- 10 chars or less

// We adhere to the contract here, value {any}, return {boolean}
function isShortString(value){
    // We are extending the original function with a new criterion 
    // by calling the original function and then adding a new
    // predicate upon return
    return isString(value) && value.length <= 10;
}

//Rectangle class

class Rectangle{
    constructor(height, width){
        this.height = height;
        this.width = width;
    }
    
    getArea(){
        return this.height * this.width;
    }
    
    getPerimeter(){
        return this.height * 2 + this.width * 2;
    }
}

class Square extends Rectangle{
    constructor(height, width){
        this.checkSize(height, width);
        super(height, width);
    }
    
    checkSize(height, width){
        if(height !== width){
            throw new Error('Height and width must be equal.');
        }
    }
}