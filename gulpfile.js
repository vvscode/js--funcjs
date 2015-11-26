const gulp = require('gulp');
const qunit = require('node-qunit-phantomjs');
const sourceMaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const plumber = require('gulp-plumber');

gulp.task('test', function() {
  qunit('./spec/tests.html', { 'verbose': true });
});

gulp.task("build", function () {
  return gulp.src("src/**/*.js") //get all js files under the src
    .pipe(plumber())
    .pipe(sourceMaps.init()) //initialize source mapping
    .pipe(babel()) //transpile
    .pipe(sourceMaps.write(".")) //write source maps
    .pipe(gulp.dest("build")); //pipe to the destination folder
});

gulp.task("build_spec", function () {
  return gulp.src("spec/**/*.js") //get all js files under the src
    .pipe(plumber())
    .pipe(sourceMaps.init()) //initialize source mapping
    .pipe(babel()) //transpile
    .pipe(sourceMaps.write(".")) //write source maps
    .pipe(gulp.dest("build_spec")); //pipe to the destination folder
});

gulp.task('watch', function() {
  gulp.watch(['spec/**/*.js', 'src/**/*.js'], ['build', 'build_spec', 'test']);
});

gulp.task('default', ['build', 'build_spec', 'test', 'watch']);