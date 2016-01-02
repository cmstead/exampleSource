(function () {

    function doAsyncStuff(condition) {
        myAsyncFn(condition).then(function (data) {
            var moreConditions = {
                foo: data.foo,
                bar: data.bar.baz
            };
            return anotherAsyncFn(moreConditions);
        }, function (error) {
            logger.log(error);
        }).then(function (data) {
            updateState(data.newValue);
        }, function (error) {
            logger.log(error);
        });
    }

})();

(function () {

    // First refactoring

    function logError (error){
        logger.log(error);
    }

    function doAsyncStuff(condition) {
        myAsyncFn(condition).then(function (data) {
            var moreConditions = {
                foo: data.foo,
                bar: data.bar.baz
            };
            return anotherAsyncFn(moreConditions);
        }, logError).then(function (data) {
            updateState(data.newValue);
        }, logError);
    }

})();

(function () {

    function logError (error) {
        logger.log(error);
    }

    function getChainedCondition(data) {
        var moreConditions = {
            foo: data.foo,
            bar: data.bar.baz
        };
        return anotherAsyncFn(moreConditions);
    }
    
    function captureNewState (data){
        updateState(data.newValue);
    }
    
    function doAsyncStuff (condition){
        myAsyncFn(condition).then(getChainedCondition, logError)
                            .then(captureNewState, logError);
    }

})();