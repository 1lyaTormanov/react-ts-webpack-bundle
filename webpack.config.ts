import * as path from 'path';
import * as webpack from "webpack";
import  {isDev, getFilename} from "./wepback_utils/utils";
import {getStyleRules, getJsLoaders, getBabelConfig} from "./wepback_utils/rules";
import {getOptimizations, getPlugins} from './wepback_utils/plugins'
import * as devServer from 'webpack-dev-server'
// import HtmlWebpackPlugin from 'html-webpack-plugin'; // сборка приложения в определенный html эндпоинт
// import {CleanWebpackPlugin} from 'clean-webpack-plugin' // чистит output папку после каждого билда
// const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin'); // позволяет копировать статические файлы
// const CssExtract = require('mini-css-extract-plugin');// CssExtract - минимизирует css

const config: webpack.Configuration & { devServer: devServer.Configuration } = {
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

export default config;