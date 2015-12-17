function validateQuantities (recordList) {
    return recordList.map(record => record.quantity <= record.maxQuantity)
                     .reduce((a, b) => Boolean(a &&b), true);
}

Static Class Validator {
	
    public static boolean validateQuantities (List<Record> recordList) {
        return recordList.map((Record r) -> r.quantity <= r.maxQuantity)
                         .reduce(true, (a, b) -> a && b);
    }
	
}

(function () {
    'use strict';
    
    function validateQuantities (recordList) {
        return recordList.map(record => record.quantity <= record.maxQuantity)
                        .reduce((a, b) => Boolean(a &&b), true);
    }

    module.exports = {
        validateQuantities: validateQuantities
    };    
})();