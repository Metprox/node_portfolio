const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

const paths = require('./paths');
const base = require('./webpack.config.base.js');

module.exports = merge(base, {
    entry: {
        vendor: ['react', 'react-dom'],
        app: paths.appIndexJs,
    },
    mode: 'production',
    output: {
        filename: '[chunkhash]__[name].js',
        path: paths.appBuild,
        publicPath: '/',
    },
    plugins: [
        // new UglifyJSPlugin({
        //     parallel: true,
        //     cache: true,
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new OptimizeCssAssetsPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer()],
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(paths.appSrc),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                include: [path.resolve(paths.appSrc)],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            modules: false,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
});
