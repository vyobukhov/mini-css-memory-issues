const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');
const fs = require('fs-extra');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

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
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: devMode ? false : {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: 'single'
  },
  resolve: {
    extensions: ['.mjs', '.jsx', '.js', '.json'],
    alias: {
      '@generatedSrc': path.resolve(__dirname, 'generatedSrc'),
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'generatedSrc')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: [
              devMode && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          !devMode && { loader: MiniCssExtractPlugin.loader },
          devMode && { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: false } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          },
          { loader: 'sass-loader', options: { sourceMap: false } }
        ].filter(Boolean)
      }
    ]
  },
  devServer: {
    port: 8000,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: {
      disableDotRule: true
    },
    client: {
      host: 'localhost',
      port: 8000
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[fullhash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[chunkhash].css',
      experimentalUseImportModule: true, // Setting this to false will cause a memory leak
      ignoreOrder: true
    }),
    new webpack.DefinePlugin({
      ENUM: require('./generatedSrc/enums.js'),
      'process.env.FAST_REFRESH': JSON.stringify(process.env.FAST_REFRESH)
    }),
    devMode && new webpack.HotModuleReplacementPlugin(),
    devMode && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new WebpackBar()
  ].filter(Boolean)
};
