/* eslint-disable */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@containers': path.resolve(__dirname, 'src/containers/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@icons': path.resolve(__dirname, 'src/assets/icons/'),
      '@logos': path.resolve(__dirname, 'src/assets/logos/'),
    }
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      }, {
        test: /\.(css|s[ac]ss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset'
      }, {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[ext]',
              outputPath: "./assets/fonts/",
              publicPath: "./src/assets/fonts"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devServer: {
    historyApiFallback: true,
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true
  }
}