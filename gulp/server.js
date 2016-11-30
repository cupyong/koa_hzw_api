'use strict';

var gulp = require('gulp');
var path = require('path');
var nodemon = require('gulp-nodemon');

//默认development模式
gulp.task('nodemon',function () {
	nodemon({
	  script: path.join(__dirname,'../src/index.js'), 
	  ext: 'js',
	  watch: [
	   path.join(__dirname,'../src'), 
	  ],
    "execMap": {
      "js": "node --harmony"
    },
	  env: { 'NODE_ENV': 'development' }
	})
});
gulp.task('serve',['nodemon']);



