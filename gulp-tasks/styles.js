/**
 * @file
 * Styles.
 */

'use strict';

const options = require('../gulp-options');

const {dest, lastRun, src} = require('gulp');
const gulpif               = require('gulp-if');
const rename               = require('gulp-rename');
const sass                 = require('gulp-sass');
const size                 = require('gulp-size');

function styles() {
  return src(options.sassFiles, {since: lastRun(styles)})
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe(rename({dirname: ''}))
    .pipe(gulpif(!options.isProduction, size({showFiles: true})))
    .pipe(dest(options.theme.css));
}

exports.styles = styles;
