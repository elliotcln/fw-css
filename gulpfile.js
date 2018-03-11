// Define paths
var path = {
	css: 'src/css/',
	scss: 'src/scss/',
	dist: 'dist/'
}

// Requires
var gulp = require('gulp'),
	$ = require('gulp-load-plugins')();

//  Tasks
gulp.task('scss', function(){
	return gulp.src(path.scss + '**/*.scss')
		.pipe($.sass().on('error', $.sass.logError))
		.pipe(gulp.dest(path.css));
});

gulp.task('css-prod', function(){
	// Rename and minify css
	return gulp.src(path.css + '*.css')
	.pipe($.autoprefixer())
	.pipe($.cssnano())
	.pipe($.rename(function (path) {
    path.basename += ".min";
  }))
	.pipe(gulp.dest(path.dist + 'css'));
});

gulp.task('prod', ['css-prod'], function(){
	return gulp.src(path.css + '*.css')
	.pipe($.autoprefixer())
	.pipe(gulp.dest(path.dist + 'css'));
});

gulp.task('default', ['scss'], function(){});

gulp.task('watch', function(){
	gulp.watch(path.scss + '**/*.scss', ['scss']);
});
