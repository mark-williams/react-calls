var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var config = require('./webpack.config.js');
var useref = require('gulp-useref');
var del = require('del');
var gulpConfig = require('./gulp-config');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha'); 
var babel = require('babel-core/register');


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


gulp.task('tests', function() {
    return gulp.src(gulpConfig.sourceTests, {read: false})
        .pipe(mocha({
			reporter: 'list'
		}))
        .on('error', gutil.log);
});

gulp.task('watch-tests', function() {
    gulp.watch([gulpConfig.sourceJs, gulpConfig.sourceTests], ['tests']);    
});



gulp.task('default', ['build'], function() {
});

function clean(path, done) {
    del(path).then(function() {
       done(); 
    });
}


