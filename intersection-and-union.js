(function () {
    'use strict';

    function addToMap (map, value){
        map[value] = true;
        return map;
    }

    function addIfIntersect (map, accumulator, value){
        return map[value] ? accumulator.concat([value]) : accumulator;
    }

    function buildSetMap (list){
        return list.reduce(addToMap, {});
    }

    function unique (list){
        return Object.getKeys(buildSetMap(list));
    }    
    
    function union (lista, listb) {
        return unique(lista.concat(listb));
    }
    
    function intersect (lista, listb){
        var mapb = buildSetMap(listb);
        return unique(lista).reduce(addIfIntersect.bind(null, mapb), []);
    }
    
})();