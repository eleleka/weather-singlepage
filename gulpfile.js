/**
 * @file
 * Scripts to build the theme.
 */

'use strict';

const {parallel, series} = require('gulp');

// Load tasks.
const {clean, cleanCss} = require('./gulp-tasks/clean');
const {lintCss} = require('./gulp-tasks/lint');
const {styles} = require('./gulp-tasks/styles');
const {watch} = require('./gulp-tasks/watch');

// If we need specific task in cli.
// exports.clean = clean;
exports.lint = parallel(lintCss);
exports.styles = series(cleanCss, styles);
exports.watch = watch;

exports.default = series(
  parallel(lintCss),
  parallel(cleanCss),
  parallel(styles)
);
