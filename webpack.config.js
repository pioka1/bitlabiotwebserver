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
    entry: path.join(__dirname, 'src', 'app-client.js'),
    output: {
        filename: path.join('js', 'bitlabiot.js'),
        path: path.join(__dirname, 'src', 'public')
    },
    module: {
        rules: [
            // Babel transpiles ES6 to ES5, which is then transpiled from JSX to plain JS
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            // ExtractTextPlugin transpiles SCSS to CSS files and bundles them into one CSS file
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({use: ['css-loader', 'sass-loader']})
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: path.join('css', 'bitlabiot.css'),
            allChunks: true
        })
    ]
};