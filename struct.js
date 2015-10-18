function Struct () {
    var keys = Array.prototype.slice.call(arguments, 0),
        dataStore = {};
    
    this.get = {};
    this.set = {};
    
    // Bind data store to prototype functions
    this.addProperty = this.addProperty.bind(this, dataStore);
    this.equal = this.equal.bind(this, dataStore);
    this.dataStoresEqual = this.dataStoresEqual.bind(this, dataStore);
    this.instanceOf = this.instanceOf.bind(this, dataStore);

    keys.forEach(this.addProperty);    
}

Struct.prototype = {
    
    compareValue: function (localDataStore, foreignDataStore, result, key) {
        return result && localDataStore[key] === foreignDataStore[key];
    },
    
    dataStoresEqual: function (localDataStore, foreignDataStore) {
        var localKeys = Object.keys(localDataStore),
            foreignKeys = Object.keys(foreignDataStore),
            
            compare = this.compareValue.bind(null, localDataStore, foreignDataStore),
            equalKeyCount = localKeys.length === foreignKeys.length;
            
        return equalKeyCount && localKeys.reduce(compare, true);
    },
    
    equal: function (localDataStore, foreignStruct) {
        return foreignStruct.dataStoresEqual(localDataStore);
    },
    
    containsKey: function (foreignStruct, result, key) {
        return result && typeof foreignStruct.get[key] === 'function';
    },
    
    // Check instance sameness with duck-typing
	instanceOf: function (localDataStore, foreignStruct){
        return Object.keys(localDataStore).reduce(this.containsKey.bind(this, foreignStruct), true);
	},
	
    mergeKey: function (updateObj, key) {
        this.set[key](updateObj[key]);
    },
    
    merge: function (updateObj) {
        var keysToMerge = Object.keys(updateObj);
        keysToMerge.forEach(this.mergeKey.bind(this, updateObj));
        return this;
    },

    storeValue: function (result, key) {
        result[key] = this.get[key]();
        return result;
    },

    getData: function () {
        var keys = Object.keys(this.get);
        return keys.reduce(this.storeValue.bind(this), {});
    },

    // Generic accessor
    accessorBase: function (dataStore, key) {
        return dataStore[key];
    },
    
    // Generic mutator
    mutatorBase: function (dataStore, key, value) {
        dataStore[key] = value;
        return this;
    },
    
    // Generic property creation method. This will be bound and used later
    // to extend structs and maintain a homogenic interface.
    addProperty: function (dataStore, key) {
        dataStore[key] = null;
        
        this.get[key] = this.accessorBase.bind(this, dataStore, key);
        this.set[key] = this.mutatorBase.bind(this, dataStore, key);
        
        return dataStore;
    }
};

if(typeof module !== 'undefined' && Boolean(module.exports)){
	module.exports = Struct;
}