const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const uglify = require('uglifyjs-webpack-plugin')
const autoprefixer = require('autoprefixer')
const cleanWebpackPlugin = require('clean-webpack-plugin')

const config = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, './src/js/Index.js'),
    list: path.resolve(__dirname, './src/js/List.js'),
    detail: path.resolve(__dirname, './src/js/Detail.js')
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'js/[name]-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        query: {
          presets: ['latest']
        }
      },
      {
        test: /\.tpl$/,
        loader: 'ejs-loader'
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          'css-loader',
           {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')];
              }
            }
           },
          'stylus-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|icon|gif)$/i,
        use: [
          'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new uglify(),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      title: 'mi - home',
      chunksSortMode: 'manual',
      chunks: ['index'],
      excludeChunks: ['node_modules'],
      hash: true
    }),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'list.html',
      template: path.resolve(__dirname, 'src/list.html'),
      title: 'mi - list',
      chunksSortMode: 'manual',
      chunks: ['list'],
      excludeChunks: ['node_modules'],
      hash: true,
    }),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'detail.html',
      template: path.resolve(__dirname, 'src/detail.html'),
      title: 'mi - detail',
      chunksSortMode: 'manual',
      chunks: ['detail'],
      excludeChunks: ['node_modules'],
      hash: true
    }),
    new cleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist/js', 'dist/*.html']
    })
  ],
  devServer: {
    host: 'localhost',
    port: 3456,
    open: true,
    watchOptions: {
      ignored: /node_modules/
    }
  }
}

module.exports = config;