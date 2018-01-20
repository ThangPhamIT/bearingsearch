const path = require('path');
const BUILD_DIR = path.join(__dirname, 'public/js');
// output: {
//   path: BUILD_DIR,
//   filename: "bundle.js",
//   publicPath: './'
// },
let config = {
	entry: {
		main: [
			"./public/js/app.js"
		]
	},
	output: {
		path: __dirname,
		filename: "bundle.js"
	},

	devServer: {
		inline: true,
		port: 8080
	},

	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react']
			}
		}]
	}
};

module.exports = config;