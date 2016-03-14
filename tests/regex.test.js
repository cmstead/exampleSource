'use strict';

require('./utils/approvals')();

var utils = require('./utils/testUtils');
var regexExample = require('../regex');
var patternMatcher = regexExample.patternMatcher

describe('Regex examples', function () {

    it('should display lorem ipsum text', function () {
        this.verify(regexExample.loremIpsum);
    });

    it('should pick a simple instance of lorem', function () {
        var pattern = /lorem/;
        var result = patternMatcher(pattern);
        this.verify(utils.prettyJson(result));
    });

    it('should pick a case insensitive instance of lorem', function () {
        var pattern = /lorem/i;
        var result = patternMatcher(pattern);
        this.verify(utils.prettyJson(result));
    });

    it('should pick all instances of lorem', function () {
        var pattern = /lorem/ig;
        var result = patternMatcher(pattern);
        this.verify(utils.prettyJson(result));
    });

    it('should pick lorem or lorem ipsum', function () {
        var pattern = /lorem( ipsum)?/ig;
        var result = patternMatcher(pattern);
        this.verify(utils.prettyJson(result));
    });

    it('should pick anything starting with l and ending with m', function () {
        var pattern = /l.*m/ig;
        var result = patternMatcher(pattern);
        this.verify(utils.prettyJson(result));
    });

    it('should pick anything starting with l and ending with m which contains no spaces', function () {
        var pattern = /l[^\s]*m/ig;
        var result = patternMatcher(pattern);
        this.verify(utils.prettyJson(result));
    });

    it('should pick only the first lorem', function () {
        var pattern = /^l[^\s]*m/ig;
        var result = patternMatcher(pattern);
        this.verify(utils.prettyJson(result));
    });

    it('should pick nothing', function () {
        var pattern = /^l[^\s]*m$/ig; // 'lorem' or 'lum'
        var result = patternMatcher(pattern);
        this.verify(utils.prettyJson(result));
    });

    it('should pick each non-space token', function () {
        var pattern = /[^\s]+/ig;
        var result = patternMatcher(pattern);
        this.verify(utils.prettyJson(result));
    });

    it('should pick every token containing an l and maybe an m', function () {
        var pattern = /[^\s]*l[^\s]*m?/ig;
        var result = patternMatcher(pattern);
        this.verify(utils.prettyJson(result));
    });

});