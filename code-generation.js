(function(){
    'use strict';
    
    var moduleName = 'basic.module';
    angular.module(moduleName, []);
    
    class Controller{
        
        constructor($scope){
            'ngInject';
            
            this.$scope = $scope;
        }
        
    }
    
    angular.module(moduleName)
           .controller('basic.controller', Controller);
})();

(function(){
    'use strict';
    
    var moduleName = '<%= controllerName %>.module';
    angular.module(moduleName, []);
    
    class Controller{
        
        constructor($scope){
            'ngInject';
            
            this.$scope = $scope;
        }
        
    }
    
    angular.module(moduleName)
           .controller('<%= controllerName %>.controller', Controller);
})();

'use strict';

var generators = require('yeoman-generator'),
    path = require('path');

module.exports = generators.Base.extend({

    constructor: function(){
        generators.Base.apply(this, arguments);
        this.argument('controllerPath', { type: String, required: true });
    },

    setup: function(){
        this.controllerName = this.controllerPath.split('/').pop();
        this.localPath = this.controllerPath.split('/').join(path.sep);
        this.config.save();
    },

    performCopy: function(){
        var controllerDestination = ['app', 'controllers', this.localPath].join(path.sep),
            controllerOutput = [controllerDestination, this.controllerName + '.js'].join(path.sep),
            context = {
                controllerName: this.controllerName
            };

        this.template('controller.js', controllerOutput, context);
    }
});