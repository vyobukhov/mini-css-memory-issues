const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');
const fs = require('fs-extra');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const { readdirSync } = require('fs');

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const getEntries = () => {
  const entries = {};

  const generatedEntries = getDirectories('generatedSrc/entries');

  generatedEntries.forEach(entryName => {
    entries[entryName] = `./generatedSrc/entries/${entryName}`;
  });

  return entries;
};

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    app: './src/app',
    ...getEntries()
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { hmr: false } },
          // { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: false } },
          { loader: 'postcss-loader', options: { plugins: () => [require('autoprefixer')] } },
          { loader: 'sass-loader', options: { sourceMap: false } }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new webpack.DefinePlugin({
      ENUM: require('./generatedSrc/enums.js')
    }),
    new WebpackBar()
  ]
};
