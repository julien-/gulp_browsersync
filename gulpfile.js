"use strict";
try {
    var config_local = require('./config.local.json');
} catch (error) {
}
try {
    var config_project = require('./config.project.json');
} catch (error) {
}
var config_default = require('./config.default.json'),
    config = Object.assign({}, config_default, config_project, config_local),
    
    config_minified = Object.assign({}, config, {
        dest_file : config.dest_file.replace(/.css/, '.min.css').replace(/.min/, ''),
        outputStyle : 'compressed',
    }),

    config_expanded = Object.assign({}, config, {
        dest_file : config.dest_file.replace(/.min/, ''),
        outputStyle : 'expanded',
    }),

    // Include nodejs default libs.
    gulp = require('gulp'),

    // ========= Include vendor libs.
    // Prefix css propoerties for different browsers.
    autoprefixer    = require('gulp-autoprefixer'),
    // Refresh the browsers stylesheets without refresh the page.
    browserSync     = require('browser-sync').create(),
    // Format the extanded css.
    csscomb         = require('gulp-csscomb'),
    // Manage conditions in gulp.
    gulpif          = require('gulp-if'),
    // Set name of file to generate.
    rename          = require('gulp-rename'),
    // Replace content in file.
    replace         = require( 'gulp-replace' ),
    // Generate CSS file from SCSS files.
    sass            = require('gulp-sass'),
    // Indicate the provider SCSS file in generated CSS file.
    sourcemaps      = require('gulp-sourcemaps');

// Compile sass into CSS & auto-inject into browsers.
function compile(){
    return gulp
        .src(config.src_dir + '/' + config.src_file)
        .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
        // Minified.
        .pipe(sass({
          errLogToConsole: true,
          outputStyle: config_minified.outputStyle
        }))
        .pipe(autoprefixer({
            'overrideBrowserslist' : config.browsers
        }))
        .pipe(rename(config_minified.dest_file))
        .pipe(gulpif(config_minified.sourcemaps, sourcemaps.write()))
        .pipe(gulp.dest(config_minified.dest_dir))
        .pipe(browserSync.stream())
        // Expanded
        .pipe(csscomb())
        .pipe(sass({
          outputStyle: config_expanded.outputStyle
        }))
        .pipe( replace( '@charset "UTF-8";\n', '' ) )
        .pipe(rename(config_expanded.dest_file))
        .pipe(gulp.dest(config_expanded.dest_dir));
}

// Static Server.
function watch() {

    browserSync.init({
        host: config.c9url,
        logLevel: "silent",
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
