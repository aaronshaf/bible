const gulp = require('gulp')
const gutil = require('gulp-util')
const eslint = require('gulp-eslint')
const react = require('gulp-react')
const eslintConfig = require('./eslint.json')
const uglify = require('gulp-uglify')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const sass = require('gulp-sass')
const cache = require('gulp-cached')
const exorcist = require('exorcist')
const staticServer = require('node-static')

gulp.task('jsx', function() {
  return gulp.src(['app/**/*.js'])
    .pipe(cache('jsx'))
    .pipe(react())
    .pipe(gulp.dest('tmp/jsx'))
})

gulp.task('browserify', ['jsx'], function() {
  return browserify({
      entries: ['./tmp/jsx/main.js'],
      transform: ['envify'],
      debug: true
    })
    .bundle()
    // .pipe(exorcist('./dist/main.js.map'))
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist'))
})

// TODO: include this by default
gulp.task('uglify', ['browserify'], function () {
  return gulp.src(['dist/main.js'])
    .pipe(uglify({
      output: {
        // beautify: true
      },
      compress: {
        dead_code: true,
        unused: true
      }
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('assets', function () {
  return gulp.src(['assets/**/*'])
    .pipe(gulp.dest('dist'))
})

gulp.task('sass', function() {
  return gulp.src('./stylesheets/main.scss')
    .pipe(sass())
    .on('error', function (err) { gutil.log(err.message, err) })
    .pipe(gulp.dest('dist'))
})

gulp.task('lint', function () {
  return gulp.src(['app/**/*.js'])
    .pipe(cache('linting'))
    .pipe(react())
    .pipe(eslint(eslintConfig))
    .pipe(eslint.format())
})

gulp.task('server', function () {
  require('./main')
})

gulp.task('default', ['assets', 'sass', 'uglify'])

gulp.task('dev', ['assets', 'sass', 'browserify', 'lint', 'server'],
  function() {
    gulp.watch([
      'assets/**/*'
    ], ['assets'])

    gulp.watch([
      'stylesheets/**/*'
    ], ['sass'])

    gulp.watch([
      'app/**/*.js'
    ], ['lint', 'browserify'])
  }
)
