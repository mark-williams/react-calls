var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var config = require('./webpack.config.js');
var useref = require('gulp-useref');
var del = require('del');
var gulpConfig = require('./gulp-config');

var assets = useref({searchPath: ['./', './bower_components']});


gulp.task('build', ['assets', 'build-app'], function() {
});

gulp.task('build-app', function() {
	 gulp.src(gulpConfig.sourceJs)
		.pipe(webpackStream(config))
		.pipe(gulp.dest(gulpConfig.assets + 'scripts'));	
});

gulp.task('assets', ['clean-assets'], function() {
	return gulp
	.src(gulpConfig.index)
	.pipe(assets)
	.pipe(gulp.dest('./build'));
});

gulp.task('clean-assets', function(done) {
	return clean(gulpConfig.assets + '**/*', done)
});

gulp.task('watch', function() {
	gulp.watch(gulpConfig.sourceJs, ['build-app']);
});

gulp.task('default', ['build'], function() {
});

function clean(path, done) {
    del(path).then(function() {
       done(); 
    });
}


