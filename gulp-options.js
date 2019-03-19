/**
 * @file
 * Config file for gulp.
 */

'use strict';

const magicImporter = require('node-sass-magic-importer');

let env = process.env.NODE_ENV || 'testing';
let isProduction = (env === 'production');
let options = {};

options.isProduction = isProduction;

options.rootPath = {
  project: __dirname + '/',
  src: __dirname + '/src/',
};

options.theme = {
  name: 'weather-singlepage',
  root: options.rootPath.theme,
  sass: options.rootPath.src + 'scss/',
  css: options.rootPath.src + 'css/',
  icons: options.rootPath.src + 'icons/',
  svg: options.rootPath.src + 'svg/'
};

options.sassFiles = [
  options.theme.sass + '**/*.scss',
  // Do not open Sass partials as they will be included as needed.
  '!' + options.theme.sass + '**/_*.scss'
];

// Svg sprite options.
options.svgConfig = {
  shape: {
    dimension: {
      maxWidth: 500,
      maxHeight: 500,
      transform: ['svgo']
    },
    id: {
      separator: ''
    }
  },
  mode: {
    view: {
      dest: './mixin/',
      sprite: '../svg',
      bust: true,
      prefix: '@mixin svg-sprite--%s',
      layout: 'diagonal',
      mixin: true,
      render: {
        scss: {
          dest: 'svg-sprite-mixins.scss',
          template: options.rootPath.src + '/icons/_svg-sprite-template.scss'
        }
      },
      example: true
    }
  },
  "variables": {
    scale: options.iconScale
  }
};

options.sass = {
  importer: magicImporter(),
  outputStyle: (isProduction ? 'compresssed' : 'expanded')
};

// If your files are on a network share, you may want to turn on polling for
// Gulp watch. Since polling is less efficient, we disable polling by default.
// Use `options.gulpWatchOptions = {interval: 1000, mode: 'poll'};` as example.
options.gulpWatchOptions = {};

// Set the URL used to access the Drupal website under development. This will
// allow Browser Sync to serve the website and update CSS changes on the fly.

module.exports = options;
