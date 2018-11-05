import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  mode: 'development',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    publicPath: '/'
  },
    entry: {
        index: path.resolve(__dirname, 'src/index.js'),
        widgets: path.resolve(__dirname, 'src/pages/widgets.js'),
        formsGeneral: path.resolve(__dirname, 'src/pages/forms/general.js')
    },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: '[name]_bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
        filename: 'index.html',
      template: 'src/index.html',
      inject: true,
        chunks:['index']
    }),

      // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
        filename:'pages/widgets.html',
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

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })

  ],
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
        test: /\.(ttf|otf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif|png)$/,
        loader: 'file-loader'
      }
    ]
  }
}
