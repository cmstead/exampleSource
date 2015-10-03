// This is created as an object so we can pass in mocks and fakes
// for testing and abstraction purposes.
function MyDataService(httpService, urlConstantsFactory){
    this.httpService = httpService;
    this.urlConstantsFactory = urlConstantsFactory;
}

MyDataService.prototype = {
    get: function(id, callback){
        var request = {
                url: this.urlConstantsFactory.get('myDataUrl'),
                data: {
                    id: id
                }
            };
        
        this.httpService.get(request, callback);
    }
};

// This is a standalone, testable function
function transformInboundData(callback, error, data){
    var finalData = !error ? inboundTransformationFunction(data) : data;
    
    // This ensures we match the contract of the original callback
    callback(error, finalData)
}

// This is a wrapper around the original request 
function inboundDataTransform(id, callback){
    var transformCallback = transformInboundData.bind(null, callback);
    
    myDataServiceInstance.get(id, transformCallback);
}

// This will allow us to decorate callbacks with synchronous behavior
function decorateCallback(decoration, callback){
    return function(error, data){
        var updatedData = !error ? decoration(data) : data;
        
        callback(error, updatedData);
    }
}

function inboundDecoratedTransform(id, callback){
    var decoratedCallback = decorateCallback(inboundTransformationFunction, callback);
    
    myDataServiceInstance.get(id, decoratedCallback);
}