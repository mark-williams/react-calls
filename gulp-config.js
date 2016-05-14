var assetsPath = './build/assets/';
var src = './src/client/';

var gulpConfig = {
	assets: assetsPath,
	sourceJs: './src/client/**/*.js',
	sourceTests: src + 'tests/**/*.js',
	index: src + 'index.html'
}

module.exports = gulpConfig; 