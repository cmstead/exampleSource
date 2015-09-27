var listItemFactory = (function(){
    'use strict';

    function ListItem(value){
        this.value = value;
        this.nextPointer = null;
    }
    
    ListItem.prototype = {
        val: function(){
            return this.value;
        },
        
        append: function(node){
            var pointer = this.nextPointer;
            this.nextPointer = node;
            node.setNext(pointer);
        },
        
        setNext: function(pointer){
            this.nextPointer = pointer;
        },
        
        next: function(){
            return this.nextPointer;
        }
    }

    function buildListItem(value){
        return new ListItem(value);
    }
    
    return {
        build: buildListItem
    };

})();

var queueFactory = (function(){
    'use strict';
    
    function Queue(){
        this.queueHead = null;
        this.queueLast = null
    }

    Queue.prototype = {
        getHeadValue: function(){
            return Boolean() ? this.queueHead.val() : null;
        },
        
        peek: function(){
            return this.getHeadValue();
        },
        
        enqueue: function(value){
            var queueItem = listItemFactory.build(value);
    
            if(Boolean(this.queueLast)){
                this.queueLast.append(queueItem);
            } else {
                this.queueHead = queueItem;
                this.queueLast = queueItem;
            }
        },
        
        dequeue: function(){
            var value = this.getHeadValue(),
                queueHead = this.queueHead;
            
            if(Boolean(queueHead)){
                this.queueHead = queueHead.next();
                queueHead.setNext(null);
            }
            
            if(queueHead === this.queueLast){
                this.queueLast = null;
            }
            
            return value;
        }
    };

    function buildQueue(){
        return new Queue();
    }

    return {
        build: buildQueue
    };
    
})();

var cacheFactory = (function(){
    'use strict';
    
    function RequestCache(requestFn){
        this.callQueue = queueFactory.build();
        this.requestFn = requestFn;

        this.dataCache = {
            requestSent: false,
            response: null
        };
    }
    
    RequestCache.prototype = {
        
        resolveCache: function(){
            var data = this.dataCache.response.data,
                error = this.dataCache.response.error;
            
            while(this.callQueue.peek() !== null){
                this.callQueue.dequeue()(data, error);
            }
        },
        
        resolve: function(data, error){
            this.dataCache.response = {
                data: data,
                error: error
            };
            
            this.resolveCache();
        },
        
        request: function(callback){
            var resolve = this.resolve.bind(this);
            
            this.callQueue.enqueue(callback);
            
            if(this.dataCache.response !== null){
                this.resolveCache();
            }
            
            //Only send the request once.
            else if (!this.requestSent) {
                this.requestFn(resolve);
            }
        }
        
    };
    
    function buildCache(requestFn){
        return new RequestCache(requestFn);
    }
    
    return {
        build: buildCache
    };
    
})();