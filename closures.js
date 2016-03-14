(function () {
    'use strict';
    
    // This has not been posted yet.
    // focus on leveling
    // go from repeated behavior to abstracted actions
    
    function add(a, b) {
        return a + b;
    }

    function increment(a) {
        return a + 1;
    }

    function incrementWithAdd(a) {
        return add(1, a);
    }

    function increaseBy(a) {
        return function (b) {
            return add(a, b);
        };
    }

    var add1 = increaseBy(1);
    var add5 = increaseBy(5);

    add1(10); //11
    add5(10); //15
    
    function multiply(a, b) {
        return a * b;
    }

    function times2(a) {
        return a * 2;
    }

    function times2Withmultiply(a) {
        return multiply(2, a);
    }

    function timesBy(a) {
        return function (b) {
            return multiply(a, b);
        };
    }
    
    
    //TimesBy and AddBy are almost the same
    
    function enclosedOperate (operation) {
        return function (a) {
            return function (b) {
                return operation(a, b);
            };
        };
    }
    
    var addBy = enclosedOperate(add);
    var multiplyBy = enclosedOperate(multiply);
    
    // Explain arity - how many arguments a function takes
    
    function strict2ArityCurry (operation) {
        return function (a) {
            return function (b) {
                return operation(a, b);
            };
        };
    }
    
    function slice (obj, start){
        return Array.prototype.slice(obj, start);
    }
    
    function partial (operation){
        var initialArgs = slice(arguments, 1);
        return function () {
            var latterArgs = slice(arguments, 0);
            return operation.apply(null, initialArgs.concat(latterArgs));
        };
    }
    
    partial(add, 5)(10); // 15
})();