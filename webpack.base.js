//webpack.base.js 文件
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin'); //静态文件处理


process.cwd()

/**
 * 类型推导
 * @type {import('webpack').Configuration} 
 */
const config = {
    optimization: {
        minimize: false,//这个选项是不压缩代码 会导致文件过大的警告 可用于测试
    },
    mode: "production",//定义一个模式 不然会报错
    entry: path.resolve(process.cwd(), './src/main.ts'),//入口
    output: {
        path: path.join(process.cwd(), './dist'), //打包目录
        filename: 'js/[name].[contenthash:14].js', //打包后的文件名
        clean: true,//每次打包时清除之前文件夹
        // publicPath: '/',//配置的前置目录 可以视情况配置 在开发环境下应该默认不配置
    },
    resolve: {
        alias: {
            '@': path.resolve(process.cwd(), './src'), //配置别名
            vue$: 'vue/dist/vue.runtime.esm-bundler.js',//针对vue
        },
        extensions: ['.js', '.ts', '.vue', '.json'], //文件名后缀
    },
    plugins: [
        //处理html模板
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), './src/public/index.html'),
            title: "Webpack Vue Template",//注入的标题
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(process.cwd(), './src/public'),//当前工作路径是在dist文件夹内，搜易这里的from就是项目目录/public文件夹内。（dist和public是同级的）
                to: path.resolve('./test/'),//放到output文件夹下，也就是当前工作文件夹dist内
                globOptions: {
                    dot: true,
                    gitignore: false,
                    ignore: [ // 配置不用copy的文件
                        '**/index.html',
                    ]
                }
            }]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.vue$/, use: 'vue-loader',
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true, //关闭类型监察
                            // configFile: path.resolve(process.cwd(), 'tsconfig.json'),//读取配置文件
                            appendTsSuffixTo: ['\\.vue$'], //给vue文件添加后缀
                        },
                    },
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                //相对路径 webpack 会默认引用
                //绝对路径则会 找不到 會被 webpack 拷貝
                test: /\.(png|jpe?g|gif|webp|svif)(\?.*)?$/,
                type: 'asset',//默认8kb一下的会转换为base64
                generator: {
                    filename: 'img/[name][ext][query]'
                }
            },
            {
                // 处理字体文件
                test: /\.(woff2?|eot|otf|ttf)(\?.*)?$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024,//20kb一下hi被转换成base64
                    }
                },
                generator: {
                    filename: 'fonts/[name][ext][query]',
                }
            },
            {
                //处理视频，音频
                test: /\.(mp4|webm|mp3|ogg|wav|flac|acc|rmvb)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'movie/[name][ext][query]',
                }
            },
        ],
    },

}

module.exports = config;