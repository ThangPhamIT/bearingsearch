const path = require('path');
const BUILD_DIR = path.join(__dirname, 'public/js');

let config = {
	entry: [
		"./public/js/app.js"
	],
	output: {
		path: BUILD_DIR,
		filename: "bundle.js"
	},

	devServer: {
		inline: true,
		port: 80
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