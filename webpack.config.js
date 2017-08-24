// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  _app: path.join(__dirname, "src"),
  _public: path.join(__dirname, "public")
};

module.exports = {
  devtool: "#cheap-source-map",

  entry: {
    main: path.resolve(__dirname, "./src/js/index.js"),
    vendors1: [
      "react",
      "react-dom",
      "material-ui",
      "react-router-dom",
      "redux",
      "react-redux"
    ],
    vendors2: ["history", "socket.io-client"] //只用到了client，所以就不是打包完整的socket.io？打包完整的就会出错，因为fs？
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "js/[name].js"
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
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: "css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]"
      //   })
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      // Don't beautify output (enable for neater output)
      beautify: false,
      // Eliminate comments
      comments: false,
      compress: {
        //supresses warnings, usually from module minification
        warnings: false,
        // Drop `console` statements
        drop_console: true
      }
    }),
    // new ExtractTextPlugin("css/[name].css"),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendors2", "vendors1", "loadfirst"],
      minChunks: 3 //The minimum number of chunks which need to contain a module before it's moved into the commons chunk.
    }),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunk: ["loadfirst", "vendors1", "vendors2", "main"],
      inject: true
    })
  ]
};
