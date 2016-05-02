(function() {
    // Mockery example

    beforeEach(function() {
        var mysqlFake = {
            query: function(query, params, callback) {
                callback(null, []); // Returns a null error and an empty array
            }
        };

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock('mysql', mysqlFake);
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

})();

(function() {
    'use strict';
    
    var router = require('express').Router();

    router.get('/mypath/myentity', function(req, res) {
        // Do stuff here
        res.status(200).send('Everything worked out fine').end();
    });
    
    module.exports = router;
})();

(function() {
    'use strict';

    var assert = require('chai').assert;
    var expressFake = require('express-route-fake');
    var mockery = require('mockery');

    describe('Testing Express Routes', function() {
        var myRoutes;
        var req;
        var res;

        beforeEach(function() {
            req = {};
            res = {
                resData: {
                    status: 0,
                    response: ''
                },
                status: function(status) {
                    res.resData.status = status;
                },
                send: function(response) {
                    res.resData.response = response;
                },
                end: function() { }
            };

            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false
            });

            expressFake.reset();

            mockery.registerMock('express', expressFake);
            myRoutes = require('../routes/myRoutes');
        });

        afterEach(function() {
            mockery.deregisterAll();
            mockery.disable();
        });

        it('should set status to 200', function() {
            var routeAction = expressFake.getRouteAction('get', '/mypath/myentity');

            routeAction(req, res);

            assert(res.resData.status === 200);
        });

        it('should respond with appropriate message', function() {
            var routeAction = expressFake.getRouteAction('get', '/mypath/myentity');

            routeAction(req, res);

            assert(res.resData.message === 'Everything worked out fine');
        });

    });

})();