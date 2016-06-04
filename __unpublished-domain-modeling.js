(function () {
    'use strict';

    // Picks up after enforcing endpoints post

    var api = {
        computeTax: signet.enforce('number => number => number', computeTax),
        computeTotal: signet.enforce('function => number => number', computeTotal),
        computeSubtotal: signet.enforce('array => number', computeSubtotal)
    };

    var computePurchaseTotal = signet.enforce(
        'number, array => number',
        function computePurchaseTotal(tax, purchases) {
            return enforcedApi.computeTotal(enforcedApi.computeTax(tax))(enforcedApi.computeSubtotal(purchases));
        }
    );

    function checkPercent (value){
        return 0 <= value && value <= 1;
    }

    function checkPrice (value){
        return 0 <= value;
    }

    signet.subtype('number')('percent', checkPercent);
    signet.subtype('number')('price', checkPrice);

    function checkPurchase (value){
        return value !== null
            && signet.isTypeOf('price')(value.price)
            && signet.isTypeOf('int')(value.quantity);
    }

    signet.subtype('object')('purchase', checkPurchase);
    signet.alias('tax', 'percent');
    signet.alias('taxAmount', 'price');
    signet.alias('purchaseTotal', 'price');

    api = {
        computeTax: signet.enforce('tax => price => taxAmount', computeTax),
        computeTotal: signet.enforce('function<price> => price => purchaseTotal', computeTotal),
        computeSubtotal: signet.enforce('array<purchase> => price', computeSubtotal)
    };

    computePurchaseTotal = signet.enforce(
        'tax, array<purchase> => purchaseTotal',
        function computePurchaseTotal(tax, purchases) {
            return enforcedApi.computeTotal(enforcedApi.computeTax(tax))(enforcedApi.computeSubtotal(purchases));
        }
    );

})();