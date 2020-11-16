const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = env => {
    let pro__base_config = {
        // devtool:'source-map',//开启将会生成map文件
        mode: 'production',
        output:{
           // publicPath: '../../',
        },
        plugins: [
            new CleanWebpackPlugin(),//自动清除output下面的目录
            
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),

            //打包CSS
            new MiniCssExtractPlugin({
                filename:`assets/css/[name].style.css`,
                chunkFilename:`assets/css/[name].css`
            }),

            //new TerserJSPlugin({}), //压缩JS 开启css分离压缩后JS压缩也要指定
            new OptimizeCSSAssetsPlugin({}), //压缩css
        ],
        module: {
            rules: [
                {
                    //解析器的执行顺序是从下往上(先css-loader再style-loader)
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                esModule: false,
                                modules:{
                                    auto:false,//modules 开关,移动端多页面模式关闭class hash命名
                                    localIdentName: '[local]_[hash:base64:8]',// 自定义生成的类名
                                }
                            }
                        },
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,                    
                        'css-loader',
                        'less-loader'
                    ]
                },
                {
                    test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit:1024*100,//大于100K 自动调用fileloader
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'assets/images/'
                        }
                    }
                }
            ]
        },

        //代码分离 防止多入口重复打包bundle
        optimization: {
            splitChunks: {
                minChunks: 2,  //模块至少使用次数
                cacheGroups: {
                    vendor: {
                        name: 'vendor',
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'all',
                        priority: 2,  //2>0  nodulesmodules里的模块将优先打包进vendor
                    },
                    commons: {
                        name: "commons",   //async异步代码分割 initial同步代码分割 all同步异步分割都开启
                        chunks: "all",
                        minSize: 30000,         //字节 引入的文件大于30kb才进行分割    
                        priority: 0,   //优先级，先打包到哪个组里面，值越大，优先级越高
                    }
                }
            }
        }
    }

    if (env && env.analyzer) {  
        pro__base_config.plugins.push(new BundleAnalyzerPlugin()) //打包体积分析

        pro__base_config.plugins.push(new ManifestPlugin())  //展示源代码和打包代码映射关系
    }


    return merge(common(env), pro__base_config)  //合并配置


}