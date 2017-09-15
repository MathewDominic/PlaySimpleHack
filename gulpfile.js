var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    paths;

paths = {
    css:    'src/css/*.css',
    js:     'src/js/*.js',
    entry: './src/js/index.js',
    dist:   './build/js'
};

gulp.task('js', function() {
    gulp.src(paths.js)
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(
            gulp.dest(paths.dist)
        )
});

gulp.task('build', ['js']);