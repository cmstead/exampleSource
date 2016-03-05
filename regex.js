'use strict';

var loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan tempor vulputate. Morbi id turpis a lorem imperdiet vestibulum. Suspendisse.';

function patternMatcher (pattern){
    return loremIpsum.match(pattern);
}

module.exports = {
	patternMatcher: patternMatcher,
    loremIpsum: loremIpsum
};