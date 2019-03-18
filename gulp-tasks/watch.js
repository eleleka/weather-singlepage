/**
 * @file
 * Watch.
 */

const {series, watch} = require('gulp');
const {styles} = require('./styles');
const options = require('../gulp-options');

function watchFiles() {
  watch(
    options.theme.sass + '**/*.scss',
    options.gulpWatchOptions,
    series(styles, reload)
  );
}
exports.watch = series(watchFiles);
