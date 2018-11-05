import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import TerserPlugin from 'terser-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  mode: 'production',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  devtool: 'source-map',
    entry: {
        index: path.resolve(__dirname, 'src/index.js'),
        widgets: path.resolve(__dirname, 'src/pages/general.js'),
        formsGeneral: path.resolve(__dirname, 'src/pages/forms/forms.js')
    },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),

    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, 'dist/index.html'),
        template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: false, // selectors logic depends on attributes
        useShortDoctype: true,
        removeEmptyAttributes: false, // selectors logic depends on attributes
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
        chunks: ['index']
    }),

      new HtmlWebpackPlugin({
          filename:path.resolve(__dirname, 'pages/widgets.html'),
          template: 'src/pages/widgets.html',
          inject: true,
          chunks:['widgets']
      }),


      // Create HTML file that includes reference to bundled JS.
      new HtmlWebpackPlugin({
          filename:'pages/forms/general.html',
          template: 'src/pages/forms/general.html',
          inject: true,
          chunks:['formsGeneral']
      }),


    new CopyWebpackPlugin([
      {from:'src/img',to: path.resolve(__dirname, 'dist/img/')}
    ]),
  ],

  // replacement of CommonChunks plugin
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          ecma: 8,
          output: {
            comments: false
          },
          compress: {
            ecma: 8,
            dead_code: true,
            drop_console:false
          },
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },

  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
        ]
      },
      {
        test: /\.scss$/, use: [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'sass-loader?sourceMap'
        ]
      },
      {test: /\.(html|svg)$/, use: 'raw-loader'},
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|otf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif)$/,
        loader: 'file-loader'
      }
    ]
  }
};
