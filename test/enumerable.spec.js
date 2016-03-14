var Enumerable = require('../Enumerable');

describe('Enumerable', function () {

    describe('instantiation', function () {


        it('should return an Enumerable object', function () {
            var enumerable = Enumerable();
            expect(enumerable instanceof Enumerable).toBe(true);
        });

        it('should throw if values are not all strings', function () {
            expect(Enumerable.bind(null, ['foo', 'bar', 1])).toThrow();
        });

        it('should set values on Enumerable at indices', function () {
            var enumerable = Enumerable('foo', 'bar', 'baz');
            var values = [enumerable[0], enumerable[1], enumerable[2]];

            expect(JSON.stringify(values)).toBe('["foo","bar","baz"]');
        });

        it('should set keyed numbers on Enumerable', function () {
            var enumerable = Enumerable('foo', 'bar', 'baz');
            var keyedValues = [enumerable.foo, enumerable.bar, enumerable.baz];

            expect(JSON.stringify(keyedValues)).toBe('[0,1,2]');
        });

        it('should be correctly newble', function () {
            var enumerable = new Enumerable('foo', 'bar', 'baz');
            var values = [enumerable[0], enumerable[1], enumerable[2]];

            expect(JSON.stringify(values)).toBe('["foo","bar","baz"]');
        });

        it('should have a set length based on values provided', function () {
            var enumerable = Enumerable('foo', 'bar', 'baz');

            expect(enumerable.length).toBe(3);
        });

    });
    
    describe('valueOf', function () {
        
        it('should return original values as an array', function () {
            var values = Enumerable('foo', 'bar', 'baz').valueOf();
            expect(JSON.stringify(values)).toBe('["foo","bar","baz"]');
        });
        
    });
    
    describe('toString', function () {
        
        it('should return a stringified array', function () {
            var result = Enumerable('foo', 'bar', 'baz').toString();
            expect(result).toBe('["foo","bar","baz"]');
        });
        
    });

});