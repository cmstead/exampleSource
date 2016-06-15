// This post should demonstrate how currying clarifies an API and allows for simpler behavior construction

(function () {
    'use strict';

    function isInt(value) {
        return typeof value === 'number' && value === Math.floor(value);
    }

    function pickEnd(end, valueLength) {
        return isInt(end) ? end : valueLength;
    }

    (function () {

        function slice(start, values, end) {
            var cleanEnd = pickEnd(end, values.length);
            return Array.prototype.slice.call(values, start, cleanEnd);
        }

        var argumentsToArray = slice.bind(null, 0);
        var dropFirstThree = slice.bind(null, 3);

        function takeFrom1to3 (values){
            return slice(1, values, 3);
        }

    })();

    (function () {
        function lambda (a, b, c) {
            return op(a, b, c);
        }
        
        function lambda (a) {
            return function (b) {
                return function (c) {
                    return op(a, b, c);
                };
            };
        }
    })();

    (function () {
        
        function slice (start){
            return function (values) {
                return function (end) {
                    var cleanEnd = pickEnd(end, values.length);
                    return Array.prototype.slice.call(values, start, cleanEnd);
                };
            };
        }

        var argumentsToArray = function (values) { return slice(0)(values)(); }; 
        var dropFirstThree = function (values) { return slice(3)(values)(); }
        var takeFrom1to3 = function (values) { return slice(1)(values)(3); };

    })();

    (function () {
        
        function slice (start){
            return function (end) {
                return function (values) {
                    var cleanEnd = pickEnd(end, values.length);
                    return Array.prototype.slice.call(values, start, cleanEnd);
                };
            };
        }

        var argumentsToArray = slice(0)();
        var dropFirstThree = slice(3)();
        var takeFrom1to3 = slice(1)(3);

    })();

    (function () {

        function slice(start, end) {
            return function (values) {
                var cleanEnd = pickEnd(end, values.length);
                return Array.prototype.slice.call(values, start, cleanEnd);
            };
        }

        var argumentsToArray = slice(0);
        var dropFirstThree = slice(3);
        var takeFrom1to3 = slice(1, 3);

    })();

})();