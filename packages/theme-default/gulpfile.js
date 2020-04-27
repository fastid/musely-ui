'use strict'

const { watch, series, src, dest, parallel } = require('gulp')
const postcss = require('gulp-postcss')
const sass = require('gulp-sass')
const cssmin = require('gulp-cssmin')
const cssnano = require('cssnano')
const presetenv = require('postcss-preset-env')
const tobem = require('postcss-bem-fix')

const bemConfig = {
  shortcuts: {
    component: 'b',
    modifier: 'm',
    descendent: 'e'
  },
  separators: {
    descendent: '__',
    modifier: '--'
  }
}

function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(
      postcss([
        tobem(bemConfig),
        presetenv(),
        cssnano({
          'cssnano-preset-advanced': {
            zindex: false,
            autoprefixer: false
          }
        })
      ])
    )
    .pipe(cssmin())
    .pipe(dest('./lib'))
}

function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'))
}

function watchCss() {
  return watch('./src/*.scss', parallel(compile))
}

function watchFonts() {
  return watch('./src/fonts/**', copyfont)
}
exports.build = series(compile, copyfont)
exports.default = series(compile, copyfont, parallel(watchCss, watchFonts))
