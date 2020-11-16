module.exports = {
    plugins:[
      '@babel/plugin-proposal-class-properties', //支持class
    ],
    presets: [
      [
        "@babel/preset-env",
        {
          "corejs": "3", // 指定core-js的版本，2或者3，这里我们用最新版3
          "useBuiltIns": "usage", // usage是最佳实践，会按需把core-js和regenerator引入（所谓按需就是按下面的target和编译的js用到的es6语法来判断）
          "targets": {
            "browsers": [
              "> 1%",
              "last 2 versions",
              "not ie <= 8"
            ]
          }
        },
      ]
    ],
  };