const TerserPlugin = require("terser-webpack-plugin");
const circular = require("circular-dependency-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  entry: { server: "./src/index.ts" },
  externals: [nodeExternals()],
  output: {
    path: path.resolve(process.cwd(), "dist"),
  },
  watch: true,
  target: "node",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimizer: [],
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [new circular(), new NodemonPlugin(), new CleanWebpackPlugin()],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
};
