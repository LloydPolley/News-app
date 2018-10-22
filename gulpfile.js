var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');



gulp.task('styles', function(){
    gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/app/css'));
});

gulp.task('scripts', function(){
    gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./src/app/js/'));
});

gulp.task('watching', function(){
    gulp.watch('./src/scss/**/*.scss', ['styles']);
    gulp.watch('./src/js/*.js', ['scripts']);
});
