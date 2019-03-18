/**
 * @file
 * Clean functions.
 */

const del = require('del');
const options = require('../gulp-options');

// function clean() {
//   return del([
//     options.rootPath.dist + '/**/*'
//   ], {force: true});
// }

function cleanCss() {
  return del([
    options.theme.css + '*',
  ], {force: true});
}

// exports.clean = clean;
exports.cleanCss = cleanCss;
