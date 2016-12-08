'use strict';

import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import babelify from 'babelify'
import browserify from 'browserify'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'
import livereload from 'gulp-livereload'
import gutil from 'gulp-util'
import chalk from 'chalk'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import watchify from 'watchify'
import merge from 'utils-merge'
import duration from 'gulp-duration'
import stripDebug from 'gulp-strip-debug'
// import resolutions from 'browserify-resolutions'


var env = process.env.NODE_ENV || 'development';


module.exports = (gulp, config) => {

    gulp.task('compile-jsx', [
        'compile-vendor-js',
        'compile-app-jsx'
    ], (done) => {
        console.log(' └── compile-js');
    });

    // Gulp task for build
    gulp.task('compile-app-jsx', (done) => {

        var args = merge(watchify.args, {
            debug: true,
        });

        var bundler = browserify(
            [config.source.main.app.jsx],
            args
        )
        .transform(babelify, { presets: ['es2015', 'react'],plugins:['transform-class-properties'] });
        // .plugin(["transform-class-properties"])
        // .plugin(resolutions, '*')

        if(env === 'development'){
            bundler = bundler.plugin(watchify, {ignoreWatch: ['**/node_modules/**']});
        }

        bundle(bundler);

        bundler.on('update', () => {
            bundle(bundler);
        });

        return true
    });

    gulp.task('compile-vendor-js', function(done) {
        handleVendorJsFiles('vendor', config.source.vendor.js, config.dist.vendor.js, done);

        return true
    });

    // Error reporting function
    function mapError(err) {
        if (err.fileName) {
            // Regular error
            gutil.log(chalk.red(err.name)
                + ': '+ chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
                + ': ' + 'Line '
                + chalk.magenta(err.lineNumber)
                + ' & ' + 'Column '
                + chalk.magenta(err.columnNumber || err.column)
                + ': ' + chalk.blue(err.description));

        } else {
            // Browserify error..
            gutil.log(chalk.red(err.name) + ': ' + chalk.yellow(err.message));
        }

        process.exit(1)
    }

    function bundle(bundler) {

        var bundleTimer = duration('Javascript bundle time');

        var stream = bundler.bundle()
            .on('error', mapError)
            .pipe(source('main.jsx')) // set the source file name
            .pipe(buffer()) // Convert to gulp pipeline
            .pipe(rename(config.project.name + ".js")) // Rename the output file

        if (env === 'production') {
            stream = stream
                .pipe(stripDebug())
        }

        stream = stream
            .pipe(gulp.dest(config.dist.app.js)) // Set the output folder
            .pipe(bundleTimer) // Output time timing of the file creation

        if(env === 'development'){
            stream = stream
                .pipe(livereload());
        }
    }

    function handleVendorJsFiles(name, source, dist, done) {
        console.log(' └── compile-' + name + '-js');

        var stream = gulp.src(source);

        if (config.environment.sourcemaps) { stream = stream.pipe(sourcemaps.init()); }
        if (config.environment.concat) { stream = stream.pipe(concat(name + '.js')); }
        if (config.environment.uglify) { stream = stream.pipe(uglify()); }
        if (config.environment.sourcemaps) { stream = stream.pipe(sourcemaps.write('./')); }

        stream.on('end', done);
        stream.on('error', done);

        stream.pipe(gulp.dest(dist));
    }

};
