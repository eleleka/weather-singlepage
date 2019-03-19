/**
 * @file
 * Clean functions.
 */

const del = require('del');
const options = require('../gulp-options');

// function cleanSvg() {
//   return del([
//     options.theme.svg + '/**/*'
//   ], {force: true});
// }

function cleanCss() {
  return del([
    options.theme.css + '*',
  ], {force: true});
}

// exports.cleanSvg = cleanSvg;
exports.cleanCss = cleanCss;
