// Does stuff and stores it
function processAndEnqueue(queue, process, value){
    queue.enqueue(process(value));
}

function slowResolve(queue, resolutionProcess){
    setTimeout(function(){
        if(queue.peek() !== null){
            resolutionProcess(queue.dequeue());
            slowResolve(queue, resolutionProcess);
        }
    }, 0);
}

function fakeAsyncRequest(callback, value){
    setTimeout(callback(value), 10);
}

function square(value){
    return value * value;
}

function enqueueSquares(queue){
    var resolutionCallback = processAndEnqueue.bind(null, queue, square);
        
    for(let i = 0; i < 10; i++){
        fakeAsyncRequest(resolutionCallback, i);
    }
}

function logSquares(queue){
    var log = console.log.bind(console);
    slowResolve(queue, log);
}

var squareQueue = new Queue();

enqueueSquares(squareQueue);
logSquares(squareQueue);

//Linked-list-backed queue

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
        var queueItem = new ListItem(value);
        
        // Append item to the end of the list
        if(Boolean(this.queueLast)){
            this.queueLast.append(queueItem);
        }
        
        // If there is no current list, create it with
        // the new value as the single item.
        else {
            this.queueHead = queueItem;
            this.queueLast = queueItem;
        }
    },
    
    dequeue: function(){
        var value = this.getHeadValue(),
            queueHead = this.queueHead;
        
        // If there is a head element, move to the next
        // otherwise leave queueHead as null
        if(Boolean(queueHead)){
            this.queueHead = queueHead.next();
            queueHead.setNext(null); // Avoid memory leaks!
        }
        
        // This checks to see if the head and the last point to
        // the same object. If so, the queue is now empty.
        if(queueHead === this.queueLast){
            this.queueLast = null;
        }
        
        return value;
    }
};

// Array-backed queue

function ArrayQueue(){
    this.queue = [];
}

ArrayQueue.prototype = {
    peek: function(){
        return (this.queue.length > 0) ? this.queue[0] : null;
    },
    
    enqueue: function(value){
        this.queue.push(value);
    },
    
    dequeue: function(){
        return this.queue.shift();
    }
};