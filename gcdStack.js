function gcd(a, b){
    var memory = [a, b],
        _a = a,
        _b = b,
        temp;

    console.log(memory);

    while(memory.length > 0){
        
        if(_b !== 0){
            temp = _a;
            _a = _b;
            _b = temp % _b;
            memory.push(_b);
            console.log(memory);
        } else {
            memory.pop();
            console.log(memory);
        }
    }
    return _a;
}

module.exports = gcd;

// [ 150, 985 ]
// [ 150, 985, 150 ]
// [ 150, 985, 150, 85 ]
// [ 150, 985, 150, 85, 65 ]
// [ 150, 985, 150, 85, 65, 20 ]
// [ 150, 985, 150, 85, 65, 20, 5 ]
// [ 150, 985, 150, 85, 65, 20, 5, 0 ]
// [ 150, 985, 150, 85, 65, 20, 5 ]
// [ 150, 985, 150, 85, 65, 20 ]
// [ 150, 985, 150, 85, 65 ]
// [ 150, 985, 150, 85 ]
// [ 150, 985, 150 ]
// [ 150, 985 ]
// [ 150 ]
// []
// 5