var gulp = require('gulp'),
	watch = require('gulp-watch'),
	jade = require('gulp-jade'),
	less = require('gulp-less'),
	svgstore = require('gulp-svgstore'),
	svgmin = require('gulp-svgmin'),
	path = require('path'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');


gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

// gulp.task('js', function(){
//     .pipe(connect.reload());
// });

gulp.task('jade', function(){
	return gulp.src('jade/**/*.jade')
		.pipe(jade({
            pretty: true
        }))
		.pipe(gulp.dest(''))
        .pipe(connect.reload());
});

gulp.task('less', function(){
	return gulp.src('src/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('css'))
        .pipe(connect.reload());
});

gulp.task('js', function(){
    gulp.src('src/js/*.js')
    .pipe(connect.reload());
});

gulp.task('html', function(){
    gulp.src('*.html')
    .pipe(connect.reload());
});

gulp.task('svgstore', function () {
    return gulp
        .src('assets/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('img'));
});

gulp.task('watch', function(){
	gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch(['src/js/*.js'], ['js']);
    gulp.watch(['*.html'], ['html']);
});

gulp.task('default', ['connect', 'watch']);