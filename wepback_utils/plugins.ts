import  {isProd, getFilename}  from "./utils";

import OptimiseCssAssets from 'optimize-css-assets-webpack-plugin';//cжимает css
import TerserPlugin from 'terser-webpack-plugin';// сжимает js
import HTMLWebpackPlugin from "html-webpack-plugin";
import  {CleanWebpackPlugin} from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer'
import webpack from 'webpack'

const Analyzer = BundleAnalyzerPlugin.BundleAnalyzerPlugin

export const getOptimizations = (): webpack.Configuration['optimization'] =>{
    const config: webpack.Configuration['optimization'] = {
        splitChunks: {
            chunks: "all", //выносит общие либы в отдельный чанк, что бы они не попадали в исходники разных энтрипоинтов (если они есть)
        },
        minimizer: []
    }
    if(isProd){
        config.minimizer = [new OptimiseCssAssets(), new TerserPlugin()] as unknown as never[]
    }
    return config
}

export const getPlugins = () => {
    const initial:  webpack.WebpackPluginInstance[] = [
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
        initial.push(new Analyzer())
    }

    return initial
}
