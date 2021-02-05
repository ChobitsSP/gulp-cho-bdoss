const gulp = require('gulp');
const alias = require('./index.js');
gulp.task('default', ['test']);

gulp.task('test', () => {
  return gulp.src('src/**/*.js', { base: 'src' }).pipe(
    alias({
      credentials: {
        ak: 'ak',
        sk: 'sk'
      },
      endpoint: 'http://10.105.97.15',
      bucket: 'this-is-a-bucket',
    })
  );
});
