let MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      {pattern: 'src/**/*.test.js', watched: false}
      // {pattern: 'test-context.js', watched: false}
    ],
    reporters: ['progress', 'junit'],
    port: 9877,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless_Custom'],
    customLaunchers: {
      ChromeHeadless_Custom: {
        base: 'Chrome',
        flags: ['--headless', '--disable-gpu', '--remote-debugging-port=9222']
      }
    },
    // autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    // concurrency: Infinity,
    preprocessors: {
      'src/**/*.test.js': ['webpack']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
          {
            test: /\.scss$/, use: [
              MiniCssExtractPlugin.loader,
              'css-loader?sourceMap',
              'sass-loader?sourceMap'
            ]
          },
          {test: /\.(svg)$/, use: 'raw-loader'},
        ]
      },
    },
    webpackMiddleware: {
      stats: 'errors-only'
    }
    // webpackServer: {
    //   noInfo: true
    // }
  });
};
