const gulp = require('gulp')

gulp.task('default', ['copy'], () => {})

gulp.task('copy', () => {
  gulp.src('src/**/*').pipe(gulp.dest('dist/src'))
  gulp.src('package.json').pipe(gulp.dest('dist'))
  gulp.src('README.md').pipe(gulp.dest('dist'))
})
