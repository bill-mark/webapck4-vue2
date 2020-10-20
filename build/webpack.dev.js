const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ip = require('ip');

let port = '8088'

module.exports = env => {
  let dev_base_config = {
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
      rules: [
        {
          //解析器的执行顺序是从下往上(先css-loader再style-loader)
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                esModule: false,
                modules: {
                  auto: false,//modules 开关,移动端多页面模式关闭class hash命名
                  localIdentName: '[local]_[hash:base64:8]',// 自定义生成的类名
                }
              }
            },
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader'
          ]
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
        }
      ]
    },
    plugins:[

      //运行成功，输出信息
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [
            `You application is running here http://${ip.address()}:${port} \r\nYou can also open local address http://localhost:${port}`,
          ],
          clearConsole: true,
        },
      }),
    ],

    devServer: {
      host:'0.0.0.0',
      port: port,
      noInfo: true,//关闭打印运行信息
      open:false,//打开窗口
      openPage: 'index.html',
      proxy: {
        'api': {
          target: 'http://localhost:3000',
          secure: false, // 如果是https接口，需要配置这个参数
          changeOrigin: true,
          pathRewrite: { '^api': '' },
        },
      },
    }
  }
  return merge(common(env), dev_base_config)
}