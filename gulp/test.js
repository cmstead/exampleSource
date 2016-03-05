'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

function test (){
    gulp.src('tests/**/*.test.js').pipe(mocha({ reporter: 'nyan' }));
}

module.exports = test;