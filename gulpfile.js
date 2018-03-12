// Define paths
var path = {
	css: 'src/css/',
	scss: 'src/scss/',
	fonts: 'src/fonts/',
	dist: 'dist/',
	node: 'node_modules/',
	dripicons: 'dripicons/webfont/'
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

gulp.task('webfonts-css', function(){
	return gulp.src(path.node + path.dripicons + 'webfont.css')
		.pipe($.rename({
			prefix: '_',
			extname: '.scss'
		}))
		.pipe(gulp.dest(path.scss + 'layout'));
});

gulp.task('webfonts', ['webfonts-css'], function(){
	return gulp.src(path.node + path.dripicons + 'fonts/*')
		.pipe(gulp.dest(path.fonts + 'dripicons'));
});

gulp.task('default', ['scss'], function(){});

gulp.task('watch', function(){
	gulp.watch(path.scss + '**/*.scss', ['scss']);
	gulp.watch(path.node + path.dripicons, ['webfonts']);
});
