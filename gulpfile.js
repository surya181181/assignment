"use strict";

var gulp = require('gulp');
var less = require('gulp-less');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');

// first task to test Gulp running
gulp.task('hello', function () {
    console.log('Hello World');
});

// task to convert less to css
gulp.task('less', function () {
    return gulp.src('app/less/grossaryList.less')
      .pipe(less())
      .pipe(gulp.dest('app/css'));
});

// Watchers Task
gulp.task('watch', function () {
    gulp.watch('app/less/grossaryList.less', ['less']);
    // Other watchers
});

//Optimizing JavaScript & CSS file
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});