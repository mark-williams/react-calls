module.exports = {
  //context: __dirname + "/src/client/",
  entry: __dirname + '/src/client/index.js',

  output: {
    filename: "index.js",
    path: __dirname + "/build/assets/scripts",
  },

  module: {
  	loaders: [
  		{
  			test: /\.js?$/,
  			exclude: /node-modules/,
  			loader: 'babel',
  			query: {
  				presets: ['es2015', 'react']
  			}
  		}
  	]
  }
}