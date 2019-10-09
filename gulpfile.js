/**
 * @file
 */

"use strict";

var config_local = require('./config.local.json'),
    config_default = require('./config.default.json'),
    config = Object.assign(config_default, config_local),

    // Include nodejs default libs.
    gulp = require('gulp'),

    // Include vendor libs.
    autoprefixer    = require('gulp-autoprefixer'),
    browserSync     = require('browser-sync').create(),
    gulpif = require('gulp-if'),
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps');

// Compile sass into CSS & auto-inject into browsers.
function compile(){
    return gulp
        .src(config.src_dir + '/' + config.src_file)
        .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
        .pipe(sass({
          errLogToConsole: true,
          outputStyle: config.outputStyle
        }))
        .pipe(autoprefixer({
            'overrideBrowserslist' : config.browsers
        }))
        .pipe(rename(config.dest_file))
        .pipe(gulpif(config.sourcemaps, sourcemaps.write()))
        .pipe(gulp.dest(config.dest_dir))
        .pipe(browserSync.stream());
}

// Static Server.
function watch() {

    browserSync.init({
        host: config.c9url,
        logLevel: "debug",
        open: false,
        port: config.port,
        proxy: config.url,
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
        }
    });

    gulp.watch(config.src_dir + "/**/*.scss", compile);
}

// Tasks.
exports.watch = watch;
exports.compile = compile;
exports.default = function(){
    compile();    
    watch();   
};
