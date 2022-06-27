const  {isProd, getFilename}  = require("./utils");

const OptimiseCssAssets = require('optimize-css-assets-webpack-plugin');//cжимает css
const TerserPlugin = require('terser-webpack-plugin');// сжимает js
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')


const getOptimizations = () => {
    const config = {
        splitChunks: {
            chunks: "all", //выносит общие либы в отдельный чанк, что бы они не попадали в исходники разных энтрипоинтов (если они есть)
        }
    }
    if(isProd){
        config.minimizer = [new OptimiseCssAssets(), new TerserPlugin()]
    }
    return config
}

const getPlugins = () => {
    const initial = [
        new HTMLWebpackPlugin({
            template: './public/index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, 'src/favicon.ico'),
        //             to: path.resolve(__dirname, 'dist')
        //         }
        //     ]
        // }),
        new MiniCssExtractPlugin({
            filename: getFilename('css')
        })
    ]

    if (isProd) {
        initial.push(new WebpackBundleAnalyzer())
    }

    return initial
}

module.exports = {getOptimizations,getPlugins}

