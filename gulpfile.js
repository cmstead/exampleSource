'use strict';

var gulp = require('gulp');
var test = require('./gulp/test');

gulp.task('test', test);
gulp.task('default', ['test']);