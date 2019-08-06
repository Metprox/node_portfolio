const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = require('./paths');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            favicon: `${paths.appSrc}/favicon.ico`,
        }),
        new CopyWebpackPlugin([
            {
                from: `${paths.appAssets}/images/`,
                to: `assets/images/`,
            },
            {
                from: `${paths.appAssets}/fonts/`,
                to: `assets/fonts/`,
            },
            {
                from: `${paths.appAssets}/svg/`,
                to: `assets/svg/`,
            },
        ]),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'md4',
            hashDigest: 'base64',
            hashDigestLength: 8,
        }),
    ],
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
        },
    },
    performance: {
        hints: false,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        modules: ['node_modules'],
        alias: {
            '@': path.resolve(paths.appSrc),
            'react-dom': '@hot-loader/react-dom',
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|jp(g|ge)?|gif|webp)$/,
                use: [
                    {
                        loader: 'cache-loader',
                    },
                    {
                        loader: 'file-loader',
                    },
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'cache-loader',
                    },
                    {
                        loader: '@svgr/webpack',
                    },
                ],
            },
            {
                test: /\.(woff(2)?|eot|ttf)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'cache-loader',
                    },
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
        noParse: /lodash\/lodash.js/,
    },
};
