var gulp = require('gulp')
var browserify = require('gulp-browserify');

gulp.task('js', function() {
    gulp.src('src/js/index.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/js'))
});