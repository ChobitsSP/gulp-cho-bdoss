# gulp-cho-bdoss
gulp-cho-bdoss

## Usage

```shell
npm install --save-dev gulp-cho-bdoss
```

Then, add it to your `gulpfile.js`:

### Simple
```javascript
var alias = require('gulp-cho-bdoss');

gulp.task('test', () => {
  return gulp.src('dist/**/*', { base: 'dist' })
    .pipe(alias({
      config: {
        endpoint: '',         //传入Bucket所在区域域名
        credentials: {
          ak: '',         //您的AccessKey
          sk: '',      //您的SecretAccessKey
        }
      },
      bucket: 'this-is-a-bucket',
      ignoreExist: false,
      putOptions: {

      },
    }));
});
```
