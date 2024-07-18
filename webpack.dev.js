//webpack.dev.js文件 与 webpack.prod.js 文件一致
const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');

/**
 * 类型推导
 * @type {import('webpack').Configuration} 
 */
const config = {
    mode: 'development',
    // mode: 'production',//生产环境配置
    devServer: {
        open: true,
        historyApiFallback: true,// 所有404页面指向index.html,
        devMiddleware: {
            stats: 'errors-only', // 只在发生错误时输出
        }
    },
};
module.exports = merge(baseConfig, config);