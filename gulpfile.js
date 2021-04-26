const gulp = require('gulp');
const alias = require('./index.js');
gulp.task('default', ['test']);

gulp.task('test', () => {
  return gulp.src('src/**/*.js', { base: 'src' }).pipe(
    alias({
      config: {
        endpoint: '',         //传入Bucket所在区域域名
        credentials: {
          ak: '',         //您的AccessKey
          sk: '',      //您的SecretAccessKey
        }
      },
      bucket: 'this-is-a-bucket',
      ignoreExist: true,
      putOptions: {

      },
    })
  );
});
