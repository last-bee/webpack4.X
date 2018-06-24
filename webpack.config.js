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
 */

const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
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
        filename:`${name}.html`
    }))
})
module.exports = {
    entry:Object.assign({},entryJs,{}),
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'./js/[name].js',
    },
    module:{
        rules:[
            {    
                test: /\.js$/,    
                include: ['src/'],  
                loader: 'babel-loader'    
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    },{
                        loader:'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                              path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                            }
                        }
                    }
                   
                ]
            },{
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:10000,
                        outputPath:'images/'
                    }
                }]
            },{
                test:/\.(htm|html)$/i,
                use:['html-withimg-loader']
            },{
                test:/\.less$/i,
                use:[{
                    loader:'style-loader'
                },{
                    loader:'css-loader'
                },
                'postcss-loader'
                ,{
                    loader:'less-loader'
                }]
            }
        ]
    },
    plugins:[
        ...entryHtmlPlugin,
        new cleanWebpackPlugin(["dist"]),
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        compress:true,
        port:'8080'
    },
}