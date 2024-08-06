process.env._MODE = 'production';

const path = require('path');
const { merge } = require('webpack-merge');
//webpack分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const baseConfig = require('./webpack.base');
const config = merge(baseConfig, {
    output: {
        path: path.resolve('dist'),
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: `chunk-vendors`,
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                vue: {
                    name: `chunk-vue`,
                    test: /[\\/]node_modules[\\/]vue[\\/]/,
                    priority: 1,
                    chunks: 'initial'
                },
                common: {
                    name: `chunk-common`,
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
        },
        minimizer: [
            // 可以使用 `...` 语法扩展现有的 minimizer
            new CssMinimizerPlugin(),
            // 如果需要添加 terser-webpack-plugin，在这里加入它
            // new TerserPlugin(),
        ],
    },
    plugins: [
        // new CleanWebpackPlugin(), // 如果需要清除文件可以在这里加入
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new BundleAnalyzerPlugin()
    ],
});
``

module.exports = config;