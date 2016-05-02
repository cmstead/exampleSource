(function () {
    'use strict';

    function TransactionController(transactionList) {
        this.transactionList = transactionList;
        this.setTotal();
    }

    TransactionController.prototype = {
        deleteItem: function (itemId) {
            this.transactionList = this.transactionList.filter(function (item) {
                item.id !== itemId;
            });
        },

        setTotal: function () {
            this.total = this.transactionList.reduce(function (total, item) {
                return total + item.price * item.quantity;
            }, 0);
        }

    };

})();

(function () {
    'use strict';

    function TransactionController(transactionList) {
        this.transactionList = transactionList;
        this.setTotal();
    }

    TransactionController.removeItem = function removeItem(itemId, transactionList) {
        return transactionList.filter(function (item) {
            return item.id !== itemId;
        });
    };

    TransactionController.getTotal = function getTotal(transactionList) {
        return transactionList.reduce(function (total, item) {
            return total + item.price * item.quantity;
        }, 0);
    };

    TransactionController.prototype = {
        deleteItem: function (itemId) {
            this.transactionList = TransactionController.removeItem(itemId, this.transactionList);
        },

        setTotal: function () {
            this.total = TransactionController.getTotal(this.transactionList);
        }
    };

})();

(function () {
    'use strict';

    function TransactionController(transactionList) {
        this.transactionList = transactionList;
        this.setTotal();
    }

    TransactionController.isNotSelected = function isNotSelected(itemId, item) {
        return item.id !== itemId;
    };

    TransactionController.removeItem = function removeItem(itemId, transactionList) {
        return transactionList.filter(TransactionController.isNotSelected.bind(null, itemId));
    };

    TransactionController.addToTotal = function addToTotal(total, item) {
        return total + item.price * item.quantity;
    }

    TransactionController.getTotal = function getTotal(transactionList) {
        return transactionList.reduce(TransactionController.addToTotal, 0);
    };

    TransactionController.prototype = {
        deleteItem: function (itemId) {
            this.transactionList = TransactionController.removeItem(itemId, this.transactionList);
        },

        setTotal: function () {
            this.total = TransactionController.getTotal(this.transactionList);
        }
    };

})();

(function () {
    'use strict';

    function simpleMerge (baseObj, extensionObj){
        return Object.keys(extensionObj).reduce(function (baseObj, propertyKey) {
            baseObj[propertyKey] = extensionObj[propertyKey];
            return baseObj;
        }, baseObj);
    }

    function getTransactionBehaviors(transactionController) {
        function isNotSelected(itemId, item) {
            return item.id !== itemId;
        }

        function removeItem(itemId, transactionList) {
            return transactionList.filter(isNotSelected.bind(null, itemId));
        }

        function addToTotal(total, item) {
            return total + item.price * item.quantity;
        }

        function getTotal(transactionList) {
            return transactionList.reduce(addToTotal, 0);
        };
        
        return {
            getTotal: getTotal,
            removeItem: removeItem
        };
    }

    function TransactionController(transactionList) {
        this.transactionList = transactionList;
        this.setTotal();
    }

    TransactionController = simpleMerge(TransactionController, getTransactionBehaviors());

    TransactionController.prototype = {
        deleteItem: function (itemId) {
            this.transactionList = TransactionController.removeItem(itemId, this.transactionList);
        },

        setTotal: function () {
            this.total = TransactionController.getTotal(this.transactionList);
        }
    };

})();

