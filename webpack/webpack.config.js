const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // next two lines, to avoid node_modules from being bundled in its entirety
    target: 'web',
    entry: {
        demo: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html",
            inject: 'body'
        })
    ],
    optimization: {
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}`
        },
        splitChunks: {
            cacheGroups: {
                vendors: {
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
                test: /\.css$/,
                use: [
                    {
                        loader: 'constructable-style-loader',
                        options: {
                            // purge: true,
                            content: ['**/*.js'],
                            safelist: ['white-listed']
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    }
};
