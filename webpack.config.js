const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin'); // сборка приложения в определенный html эндпоинт
const {CleanWebpackPlugin} = require('clean-webpack-plugin');// чистит output папку после каждого билда
// const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin'); // позволяет копировать статические файлы
// const CssExtract = require('mini-css-extract-plugin');// CssExtract - минимизирует css
const {isDev, getFilename, ignoreDepsPath} = require("./wepback_utils/utils");
const {getStyleRules, getJsLoaders, getBabelConfig} = require("./wepback_utils/rules");
const {getOptimizations, getPlugins} = require('./wepback_utils/plugins')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.tsx'],
    },
    output: {
        filename: getFilename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: getOptimizations(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : 'inline-source-map',
    plugins: getPlugins(),
    module: {
        rules: [
            getStyleRules({pattern: /\.s[ac]ss$/, loader: 'sass-loader'}),
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: getJsLoaders()
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: getBabelConfig('@babel/preset-typescript')
                },
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: getBabelConfig('@babel/preset-react')
                }
            }
        ]
    }
}