const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')



module.exports = env => {
    return {
        entry: './src/main.js',
        plugins: [
            new VueLoaderPlugin(),  //将定义过的其它规则复制并应用到 .vue 文件里相应语言的块

            //js动态打包进HTML
            new HtmlWebpackPlugin({
                template:'public/index.html',
                favicon:'public/favicon.ico',
            }),
        ],
        output: {
            filename: '[name].code.js',
            chunkFilename: '[name].bundle.js',//动态导入 分离bundle 比如lodashjs配合注释import(/* webpackChunkName: "lodash" */ 'lodash') 会打包成lodash.bundle.js
            path: path.resolve(__dirname, '../dist')
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js?$/,
                    loader: 'babel-loader',
                    exclude: file => (
                        /node_modules/.test(file) &&
                        !/\.vue\.js/.test(file)
                    )
                },
                {
                    test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'assets/images/'
                        }
                    }
                },
                {
                    //解析器的执行顺序是从下往上(先css-loader再vue-style-loader)
                    test: /\.css$/,
                    use: [
                        process.env.NODE_ENV !== 'production'
                            ? 'vue-style-loader'
                            : MiniCssExtractPlugin.loader,  //prod CSS被提取出来打包
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,  //modules 开关,移动端多页面模式关闭class hash命名
                                // 自定义生成的类名
                                localIdentName: '[local]_[hash:base64:8]'
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                },
            ]
        },
    }
}