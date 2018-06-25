'use strict'
let {entryHtmlPlugin,entryJs,moduleLoader,resolveObj} = require('./webpack.base.config')
const path = require('path')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    entry:entryJs,
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'./js/[name].js',
    },
    resolve: resolveObj,
    module:moduleLoader,
    plugins:[
        ...entryHtmlPlugin,
        new cleanWebpackPlugin(["../dist"]),
        new webpack.DefinePlugin({
            'process.env': 'production'
        }), 
        new webpack.BannerPlugin('@author liubiao @Email lastbee@163.com'),
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, '../static'),
              to: './static',
              ignore: ['.*']
            }
        ])
    ],
    watchOptions:{
        poll:2000,
        aggregateTimeout:500, 
        ignored:/node_modules/
    }
}