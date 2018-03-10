var gulp = require('gulp'),
	cssnano = require('gulp-cssnano'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass');

gulp.task('scss', function(){
	return gulp.src('assets/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('assets/css'));
});

gulp.task('css-prod', function(){
	// Rename and minify css
	return gulp.src('assets/css/*.css')
	.pipe(autoprefixer())
	.pipe(cssnano())
	.pipe(rename(function (path) {
    path.basename += ".min";
  }))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('prod', ['css-prod'], function(){
	return gulp.src('assets/css/*.css')
	.pipe(autoprefixer())
	.pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['scss'], function(){});

gulp.task('watch', function(){
	gulp.watch('assets/scss/**/*.scss', ['scss']);
});
