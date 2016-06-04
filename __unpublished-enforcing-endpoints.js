(function () {
    'use strict';

    function computeTax(percent) {
        return function (total) {
            return percent * total;
        };
    }

    function computeTotal(taxCalculator) {
        return function (total) {
            return total + taxCalculator(total);
        };
    }

    function computeItemPrice(purchase) {
        return purchase.price * purchase.quantity;
    }

    function accumulateTotal(result, purchase) {
        return result + computePurchaseTotal(purchase);
    }

    function computeSubtotal(purchases) {
        return purchases.reduce(accumulateTotal, 0);
    }

    var api = {
        computeTax: computeTax,
        computeTotal: computeTotal,
        computeSubtotal: computeSubtotal
    };

    function simpleComputePurchaseTotal(tax, purchases) {
        return api.computeTotal(api.computeTax(tax))(api.computeSubtotal(purchases));
    }

    var enforcedApi = {
        computeTax: signet.enforce('number => number => number', computeTax),
        computeTotal: signet.enforce('function => number => number', computeTotal),
        computeSubtotal: signet.enforce('array => number', computeSubtotal)
    };

    function enforcedComputePurchaseTotal(tax, purchases) {
        return enforcedApi.computeTotal(enforcedApi.computeTax(tax))(enforcedApi.computeSubtotal(purchases));
    }

    var computePurchaseTotal = signet.enforce(
        'number, array => number',
        function computePurchaseTotal(tax, purchases) {
            return enforcedApi.computeTotal(enforcedApi.computeTax(tax))(enforcedApi.computeSubtotal(purchases));
        });

    var purchases = [
        { price: 10, quantity: 1 },
        { price: 5, quantity: 2 },
        { price: 100, quantity: 1 },
        { price: 0.25, quantity: 4 }
    ];

})();