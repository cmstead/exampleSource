var messageFactory = {
        build: function(url){
            var message = new Message;
            message.url = url;
            return message;
        }
    },
    mailboxFactory = {
        build: function(){
            return new Mailbox;
        }
    };

describe('messages', function(){
    
    var factory;
    
    beforeEach(function(){
        factory = {
            build: function(){
                /* noop */
            }
        };
    });
    
    it('should set an event on the messages object', function(){
        var spy = jamine.createSpy('on');
        
        messageFactory = Object.create(factory);
        messageFactory.build = function(){ return { on: spy }; };
        
        mailboxFactory.build();
        
        expect(spy.calls.mostRecent().args[0]).toBe('reset');
        expect(typeof spy.calls.mostRecent().args[1]).toBe(function);
    });
    
});
