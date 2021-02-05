# gulp-cho-bdoss
https://www.npmjs.com/package/ali-oss

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
      region: 'oss-cn-beijing',
      accessKeyId: 'accessKeyId',
      accessKeySecret: 'accessKeySecret',
      bucket: 'chobits',
      prefix: 'gulp-cho-bdoss',
      ignoreExist: false,
      putOptions: {}
    }));
});
```
