// This post should demonstrate how currying clarifies an API and allows for simpler behavior construction

(function () {
    'use strict';
    
    function endPicker (end){
        return function (values) {
            var isInt = typeof end === number && end === Math.floor(end);
            return isInt ? end : values.length;
        }
    }
    
    function slice (start){
        return function (end) {
            var pickEnd = endPicker(end);
            
            return function (values) {
                return Array.prototype.slice.call(values, start, pickEnd(values));
            };
        }
    }
    
    var argumentsToArray = slice(0)();
    var dropFirstThree = slice(3)();
    
})();