var Enumerable = (function () {
    'use strict';

    function Enumerable() {
        var enumerable = this instanceof Enumerable ? this : new Enumerable();
        var values = Array.prototype.slice.call(arguments, 0);

        if (!Enumerable.areValuesAcceptable(values)) {
            throw new TypeError('Enumerable values can only be strings.');
        }

        values.forEach(Enumerable.attachValue.bind(null, enumerable));
        
        return enumerable;
    }

    Enumerable.prototype = {
        toString: function () {
            return JSON.stringify(this.valueOf());
        },
        
        valueOf: function () {
            var result = [];
            var index = 0;
            
            while (index < this.length) {
                result[index] = this[index];
                index++;
            }
            
            return result;
        }
    };

    Enumerable.attachValue = function (enumerable, value, index) {
        enumerable[index] = value;
        enumerable[value] = index;
        enumerable.length = index + 1;
    };

    Enumerable.areValuesAcceptable = function (values) {
        return values.reduce(function (result, value) {
            return result && typeof value === 'string';
        }, true);
    };

    return Enumerable;

})();

if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Enumerable;
}