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

    })();

})();