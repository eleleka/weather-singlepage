/**
 * @file
 * Lint.
 */

const options = require('../gulp-options');
const sassLint = require('gulp-sass-lint');
const {src} = require('gulp');

function lintCss() {
  return src(options.theme.sass + '**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
}

exports.lintCss = lintCss;
