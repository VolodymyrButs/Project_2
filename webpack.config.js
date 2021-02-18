const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const buildPath = path.resolve(__dirname, "dist");

module.exports = {
  devtool: "source-map",

  entry: {
    index: "./src/page-index/main.js",
    login: "./src/page-login/main.js",
    registration: "./src/page-registration/main.js",
  },

  output: {
    filename: "[name].[hash:20].js",
    path: buildPath,
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/page-index/tmpl.html",
      inject: "body",
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/page-login/tmpl.html",
      inject: "body",
      chunks: ["login"],
      filename: "login.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/page-registration/tmpl.html",
      inject: "body",
      chunks: ["registration"],
      filename: "registration.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
};
