/*
    Webpack is a JavaScript bundler. A "bundler" is a piece of software that
    bundles together multiple files into one, e.g. bundling JS files
    into a single JS file for the client to load.

    webpack.config.js is the configuration file for Webpack
*/

// Dependency that saves transpiled SCSS into a bundled CSS file
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'app-client.jsx'),
    output: {
        filename: path.join('js', 'bitlabiot.js'),
        path: path.join(__dirname, 'src', 'dist')
    },
    module: {
        rules: [
            // Babel transpiles ES6 to ES5, which is then transpiled from JSX to plain JS
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            // ExtractTextPlugin transpiles SCSS to CSS files and bundles them into one CSS file
            {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract({use: ['css-loader', 'sass-loader']})
            },
            { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
            { test: /\.(ttf|eot)$/, loader: 'file-loader' },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: path.join('css', 'bitlabiot.css'),
            allChunks: true
        }),
    ],
};