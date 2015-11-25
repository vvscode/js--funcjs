var gulp = require('gulp'),
  qunit = require('node-qunit-phantomjs');

gulp.task('test', function() {
  qunit('./spec/tests.html', { 'verbose': true });
});

gulp.task('watch', function() {
  gulp.watch(['spec/**/*.*', 'src/**/*.*'], ['test']);
});

gulp.task('default', ['watch', 'test']);