(function () {
    'use strict';

    function isInSet (set, value){
        return typeof set[value] !== 'undefined';
    }

    function diffFactory(set, value) {
        return function (value) {
            return !isInSet(set, value);
        };
    }

    function difference(lista, listb) {
        return unique(lista).filter(diffFactory(buildSetMap(listb)));
    }

    function symmetricDifference(lista, listb) {
        return difference(union(lista, listb), intersect(listb, lista));
    }

})();