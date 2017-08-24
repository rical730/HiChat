// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  _app: path.join(__dirname, "src"),
  _public: path.join(__dirname, "public")
};

module.exports = {
  //webpack-dev-server only fires in CLI
  devtool: "#eval",

  devServer: {
    contentBase: path.resolve(PATHS._public),
    inline: true,
    hot: true
  },
  entry: {
    main: path.join(PATHS._app, "js/index.js"),
    vendors1: [
      "react",
      "react-dom",
      "material-ui",
      "react-router-dom",
      "redux",
      "react-redux"
    ],
    vendors2: ["history", "socket.io-client"]
  },
  output: {
    path: path.resolve(PATHS._public),
    filename: "js/[name].js",
    chunkFilename: "js/[name].js"
  },
  resolve: {
    modules: [PATHS._app, "node_modules"], //以前的版本是root，第二个参数必须带上，各种包模块的默认参数
    alias: {
      js: "js"
      // css: "less"
    },
    extensions: [".js", ".jsx"] //以前的版本第一个可以为空
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendors2", "vendors1", "loadfirst"],
      minChunks: 3 //The minimum number of chunks which need to contain a module before it's moved into the commons chunk.
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunk: ["loadfirst", "vendors1", "vendors2", "main"],
      inject: true
    })
  ]
};
