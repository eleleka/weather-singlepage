/**
 * @file
 * Clean functions.
 */

const del = require('del');
const options = require('../gulp-options');

function clean() {
  return del([
    options.theme.svg + '/**/*'
  ], {force: true});
}

function cleanCss() {
  return del([
    options.theme.css + '*',
  ], {force: true});
}

exports.clean = clean;
exports.cleanCss = cleanCss;
