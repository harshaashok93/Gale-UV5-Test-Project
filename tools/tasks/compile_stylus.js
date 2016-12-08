'use strict';

import concat from 'gulp-concat';
import stylus from 'gulp-stylus';
import minifyCSS from 'gulp-minify-css';
import autoprefixer from 'gulp-autoprefixer';
import include from 'gulp-include';
import bootstrap from 'bootstrap-styl';


module.exports = (gulp, config) => {

    gulp.task('compile-stylus', [
        'compile-app-stylus',
        'compile-vendor-stylus',
        'compile-vendor-fonts'
    ], () => {
        console.log(' └── compile-stylus');
    });

    gulp.task('compile-app-stylus', (done) => {
        handleStylusFiles(config.project.name, config.source.main.app.stylus, config.dist.app.css, done);
    });

    gulp.task('compile-vendor-stylus', (done) => {
        handleStylusFiles('vendor', config.source.vendor.css, config.dist.vendor.css, done);
    });

    gulp.task('compile-vendor-fonts', (done) => {
        handleFontFiles('vendor', config.source.vendor.font, config.dist.app.font, done);
    });

    // Error reporting function
    function mapError(err) {
        if (err.fileName) {
            // Regular error
            gutil.log(chalk.red(err.name) + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', '')) + ': ' + 'Line ' + chalk.magenta(err.lineNumber) + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column) + ': ' + chalk.blue(err.description));
        } else {
            // Browserify error..
            gutil.log(chalk.red(err.name) + ': ' + chalk.yellow(err.message));
        }

        process.exit(1)
    }

    function handleStylusFiles(name, source, dist, done) {
        console.log(' └── compile-'+name+'-stylus');

        var stream = gulp.src(source);

        // include any files referenced by the styles
        stream = stream.pipe(include());

        // compile stylus into css
        stream = stream.pipe(stylus({use: bootstrap(), compress: true}));

        // minify CSS
        if (config.environment.minify) {
            stream = stream.pipe(minifyCSS({
                keepBreaks        : true,
                advanced          : false,
                aggressiveMerging : false,
                compatibility     : 'ie8'
            }));
        }

        // Auto prefix css
        stream = stream.pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'));

        if (config.environment.concat) {
            stream = stream.pipe(concat(name+'.css'));
        }

        stream.on('end', done);
        stream.on('error', mapError);

        // Output css
        stream.pipe(gulp.dest(dist));
    }

    function handleFontFiles(name, source, dist, done) {
        console.log(' └── compile-'+name+'-stylus');

        var stream = gulp.src(source);

        stream.on('end', done);
        stream.on('error', mapError);

        // Output css
        stream.pipe(gulp.dest(dist));
    }
};
