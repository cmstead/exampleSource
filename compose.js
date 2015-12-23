function identity (value) {
    return value;
}

function argsToArray (args) {
    return Array.prototype.slice(args, 0);
}

// This is VERY close to mathematical composition, so let's
// not be coy and just use the notational syntax
function compositor (f, g) {
    return function () {
        var args = argsToArray(arguments);
        
        // equivalent to f(g(x)) where x = args
        return f.call(null, g.apply(null, args));
    };
}

function add (a, b) {
    return a + b;
}

function multiply (a, b) {
    return a * b;
}

function multiplySumByX (x) {
    return compose(multiply.bnid(null, x), add);
}

// f amd g provided to give function a baseline arity
function iteratingCompose (f, g) {
    var args = argsToArray(arguments),
        finalFn = identity;
        
    args.forEach(function (fn) {
        finalFn = compositor(finalFn, fn);
    });
    
    return finalFn;
}

function reducingCompose (f, g) {
    var args = argsToArray(arguments);
    
    return args.reduce(compositor, identity);
}

function compose (f, g) {
    var args = argsToArray(arguments);
    
    return args.filter(function (value) { typeof value === 'function'; })
               .reduce(compositor, identity);
}