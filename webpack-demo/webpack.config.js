const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js',
		print: './src/print.js',
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Output Management'
		})
	],
	output: {
		// filename: 'main.js',
		filename: '[name].min.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						// name: '[name].[ext]',
						outputPath: 'images/'
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: 'file-loader',
					options: {
						outputPath: 'fonts/'
					}
				}
			},
			{
				test: /\.(csv|tsv)$/,
				use: [ 'csv-loader' ]
			},
			{
				test: /\.xml$/,
				use: [ 'xml-loader' ]
			}
		]
	}
};