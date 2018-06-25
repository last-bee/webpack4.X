/**
 * @author liubiao  2018-06-23 8:55
 * @desc webpack4.X的多页面配置
 * @param  htmlPlugin 创建html入口文件
 * @param  babel      es6转成es5
 * @param  style css url  css转换 背景图片引入
 * @param  postcss 兼容性前缀
 * @param  less    less转换
 * @param  html-withimg 图片引入
 * @param  cleanWebpackPlugin 清除dist
 * @param  webpack-dev-server 热加载
 * @param  copy-webpack-plugin copy资源
 */

const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const bannerPlugin = require('banner-webpack-plugin')
const webpack = require('webpack')
const glob = require('glob')
let entryHtmlPlugin = []
let entryJs = {}
glob.sync(path.resolve(__dirname,'./src/entry','**/*.js')).forEach((item) => {
    let name = item.substring(item.lastIndexOf('/')+1,item.lastIndexOf('.'))
    entryJs[name] = item
    entryHtmlPlugin.push(new htmlPlugin({
        minify:{
            removeAttributeQuotes:true
        },
        hash:true,
        template:`./src/${name}.html`,
        chunks: [name],
        chunksSortMode: 'manual',
        filename:`${name}.html`
    }))
})
module.exports = {
    entry:Object.assign({},entryJs,{}),
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'./js/[name].js',
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    plugins:[
        ...entryHtmlPlugin,
        new cleanWebpackPlugin(["dist"]),
        // new webpack.bannerPlugin(' @author liubiao @Email lastbee@163.com!')
        // new copyWebpackPlugin([{
        //     from:__dirname+'/src/public',
        //     to:'./public'
        // }])
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        compress:true,
        port:'8080'
    },
    watchOptions:{
        poll:2000,
        aggregateTimeout:500, 
        ignored:/node_modules/
    }
}