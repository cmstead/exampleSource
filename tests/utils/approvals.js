'use strict';

function approvalsSetup() {
    var defaultConfig = {
        reporters: [
            "beyondCompare"
        ]
    };

    require('approvals').mocha('./tests/approvals');
}

module.exports = approvalsSetup;