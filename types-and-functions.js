(function () {
    'use strict';

    function Vector() {
        Vector.attachPoints(this, arguments);
    }

    // Inherted behaviors

    Vector.prototype = {

        getValues: function (result, index) {
            var point = this[index];
            var pointExists = typeof point !== 'undefined';

            return pointExists ? this.getValues(Vector.pushPoint(result, point), index + 1) : result;
        },

        // Overrides Object.prototype.toString
        toString: function () {
            return '<' + this.valueOf().join(',') + '>';
        },

        // Overrides Object.prototype.valueOf
        valueOf: function () {
            return this.getValues([], 0);
        }
    };

    // Static functions
    
    Vector.build = function buildVector(point1, point2) {
        var vector = new Vector();

        return Vector.attachPoints(vector, arguments);
    };

    Vector.attachPoints = function attachPoints(vector, args) {
        var points = Array.prototype.slice.call(args);

        points.reduce(Vector.attachPoint, vector);

        return vector;
    };

    Vector.attachPoint = function attachPoint(vector, point, index) {
        vector[index] = point;
        vector.length = index + 1;

        return vector;
    };

    Vector.pushPoint = function pushPoint(result, point) {
        result.push(point);

        return result;
    }

    // Vector-specific functions

    function addSquare(sum, value) {
        return sum + Math.pow(value, 2);
    }

    function addParallelValue (vector, value, index){
        return vector[index] + value;
    }

    // (Vector) -> number
    function magnitude(vector) {
        var sumOfSquares = vector.valueOf().reduce(addSquare, 0);

        return Math.pow(sumOfSquares, 0.5);
    }

    // Magnitude example
    var vector = Vector.build(3, 4);
    magnitude(vector); // 5

    // (Vector, Vector) -> Vector
    function addVectors(vector1, vector2) {
        if (vector1.length !== vector2.length) {
            throw new Error('Cannot add two vectors of different lengths.');
        }
        
        var newPoints = vector1.valueOf().map(addParallelValue.bind(null, vector2));

        return Vector.build.apply(null, newPoints);
    }

    // Addition example
    var vector1 = Vector.build(1, 2, 3);
    var vector2 = Vector.build(4, 5, 6);
    addVectors(vector1, vector2).toString(); // <5,7,9>

    module.exports = Vector;

})();