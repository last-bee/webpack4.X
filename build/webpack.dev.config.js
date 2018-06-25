'use strict'
let {entryHtmlPlugin,entryJs,moduleLoader,resolveObj} = require('./webpack.base.config')
const path = require('path')
const webpack = require('webpack')
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry:entryJs,
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'./js/[name].js',
    },
    resolve: resolveObj,
    module:moduleLoader,
    plugins:[
        ...entryHtmlPlugin,
        new webpack.DefinePlugin({
            'process.env': 'development'
        }), 
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        compress:true,
        port:'8080'
    },
}