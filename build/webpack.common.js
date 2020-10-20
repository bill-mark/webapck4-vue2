const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const join = (...dir) => path.join(__dirname, ...dir);


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
            path: path.resolve(__dirname, '../dist'),
            
        },
        resolve: {
            extensions: ['.vue', '.js', '.json'],
            alias: {
              '@': join('../src'),  //@方式引入资源
            },
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
            ]
        },
    }
}