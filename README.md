# gulp-cssjoin

> Join css that @import syntax loaded file for gulp.
> more info [cssjoin](https://github.com/suisho/cssjoin)

## Usage

```
npm install gulp-cssjoin --save
```

### Simple Usage

```js
var gulp = require('gulp');
var cssjoin = require('gulp-cssjoin');
gulp.task('cssjoin', function(){
  // default usage
  gulp.src("./some/css_file.css")
      .pipe(cssjoin())
      .pipe(gulp.dest("./output/css"))

  // with path option
  gulp.src(src)
      .pipe(
        cssjoin({
          paths : [
            "./htdocs",
          ]
        })
      )
      .pipe(gulp.dest("./output/css"))

})
```

### With less output
- sample for resolve @import after compile less

```js
gulp.task('css', function(){
  gulp.src('./less/*.less')
    .pipe(cssjoin())
    .pipe(gulp.dest('./css/'))
})

```