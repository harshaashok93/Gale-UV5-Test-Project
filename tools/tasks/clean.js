'use strict';

import del from 'del'

module.exports = (gulp, config) => {

    gulp.task('clean', () => {
        console.log(' └── clean');

        // clean the whole static autogenerated folder
        return del(config.dist.static_root);
    });
};