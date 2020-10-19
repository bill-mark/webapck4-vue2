const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = env => {
  let dev_base_config = {
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
      contentBase: './dist',
      port: 8087,
    }
  }
  return merge(common(env), dev_base_config)
}