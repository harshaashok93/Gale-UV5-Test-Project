'use strict';

module.exports = (gulp, config) => {

    gulp.task('watch', ['build'], (done) => {
        console.log(' └── watch');

        gulp.watch(config.source.main.app.stylus).on('change', (event) => { gulp.start('compile-stylus'); });
        gulp.watch(config.source.main.app.js).on('change', (event) => { gulp.start('compile-jsx'); });

        return true
    });
};
