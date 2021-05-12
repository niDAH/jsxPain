const fs = require('fs');
const path = require("path");

var includedPaths = [
  fs.realpathSync('./src'),
  fs.realpathSync('./src/shared'),
];

console.log("includedPaths", includedPaths);

module.exports = function(_env, argv) {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;

  console.log('isDevelopment', isDevelopment); // DEBUG

  return {
    devtool: isDevelopment && "cheap-module-source-map",
    entry: "./src/App.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "assets/js/[name].[contenthash:8].js",
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          exclude: /node_modules/,
          include: includedPaths,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development"
            }
          }
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
    }
  };
};
