const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const { merge } = require('webpack-merge')
const config = require('./webpack.config.js')

module.exports = merge(config, {
	mode: 'development',

	cache: false,

	devtool: 'inline-source-map',

	devServer: {
		devMiddleware: {
			writeToDisk: true,
		},
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		compress: true,
		port: process.env.PORT_SERVER,
		client: {
			logging: 'none',
		},
		hot: true,
	},

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
})
