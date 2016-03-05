'use strict';

function prettyJson(data) {
    var indent = 4;
    return JSON.stringify(data, null, indent);
}


module.exports = {
	prettyJson: prettyJson
}