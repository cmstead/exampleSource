(function () {
    'use strict';
    
    // Shared state - AKA global variable
    function SneakyObj () {
        this.value = 0;
    }
    
    SneakyObj.prototype = {
        getValue: function () {
            var current = this.value;
            this.value++;
            return current;
        }
    };
    
    // Shared state, but modifier is highlighted
    function LessSneakyObj () {
        this.value = 0;
    }
    
    LessSneakyObj.prototype = {
        getAndUpdateValue: function () {
            var current = this.value;
            this.value++;
            return current;
        }
    };

    // Shared state - getter only gets, setter only sets, internal value is exposed
    function ObviousObj () {
        this.value = 0;
    }
    
    ObviousObj.prototype = {
        get: function () {
            return this.value
        },
        
        update: function () {
            this.value++;
        }
    };
    
    // Shared state - getter only gets, setter only sets, internal value is not exposed, get starts as a pure function
    function EncapsulatedObj () {
        var internalState = {
            value: 0
        };
        
        this.get = this.get.bind(null, internalState);
        this.update = this.update.bind(null, internalState);
    }
    
    EncapsulatedObj.prototype = {
        get: function (state) {
            return state.value;
        },
        
        update: function (state) {
            state.value++;
        }
    };
    
    // No shared state, set is a kind of copy constructor. What now!!?!!?!
    function isNumber (value){
        return typeof value === 'number';
    }
    
    function isInt (value){
        return isNumber(value) && Math.floor(value) === value;
    }
    
    function SafeObj (initialValue) {
        var value = SafeObj.cleanValue(initialValue);
        
        this.get = this.get.bind(null, value);
        this.update = this.update.bind(null, value);
    }

    SafeObj.cleanValue = function (value) {
        return isInt(value) ? value : 0;
    };
    
    SafeObj.prototype = {
        get: function (value) {
            return value;
        },
        
        update: function (value) {
            return new SafeObj(value + 1);
        }
    };

})();