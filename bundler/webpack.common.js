const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    plugins:
    [
        new CopyWebpackPlugin([ { from: 'static' } ]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        })
    ],
    entry: {
        index: './src/index.js'
      },
    output:
    {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    module:
    {
        rules:
        [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'images/',
                            name: '[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(woff2|woff|otf|eot|ttf)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use:
                [
                    'html-loader'
                ]
            }
        ]
    }
}