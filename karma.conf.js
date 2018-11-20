// let MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'https://unpkg.com/chai@4.2.0/chai.js',
      {pattern: 'test/**/*.test.js', type: 'module', watched: false}
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
        flags: []
      }
    },
    // autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    // concurrency: Infinity,
    webpackMiddleware: {
      stats: 'errors-only'
    }
  });
};
