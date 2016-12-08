'use strict';

module.exports = (gulp, config) => {

    gulp.task('build', ['clean'], () => {
        console.log(' └── build');

        gulp.start('compile-jsx');
        gulp.start('compile-stylus');

        return true
    });
};
