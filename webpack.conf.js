const path = require("path");
const { merge } = require('webpack-merge');
const WebpackBar = require('webpackbar');
const { VueLoaderPlugin } = require('vue-loader')
const ROOT_PATH = path.resolve(process.cwd());
const APP_PATH = `${ROOT_PATH}/src`;
const rules = require("./webpack.rules");

const publicPath = "/";

module.exports = function(webpackConf) {
  const conf = {
    mode: "production",
    entry: "./src/index.js",
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
      vue: "Vue"
    },
    // 默认import的后缀名
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".vue"],
      modules: ["node_modules", APP_PATH],
      alias: {
        src: APP_PATH,
      },
    },
    plugins: [
      // make sure to include the plugin!
      new VueLoaderPlugin(),
      new WebpackBar()
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: [{ loader: "babel-loader" }],
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
          ],
        },
        ...rules,
      ],
    },
  };
  return webpackConf ? merge(conf, webpackConf) : conf;
};
